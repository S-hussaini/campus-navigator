import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { allowedDomains, allowedInstitutions } from "@/data/allowedDomains";

function normalizeText(text) {
  return String(text || "").replace(/\s+/g, " ").trim();
}

function normalizeForMatch(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getHostname(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function isAllowedUrl(url) {
  const hostname = getHostname(url);
  return allowedDomains.some(
    (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
  );
}

function guessInstitutionFromUrl(url) {
  const hostname = getHostname(url);

  const match = allowedInstitutions.find(
    (school) =>
      hostname === school.domain || hostname.endsWith(`.${school.domain}`)
  );

  return match ? match.name : hostname || "Official institution website";
}

function findInstitutionMatch(query) {
  const q = normalizeForMatch(query);

  return allowedInstitutions.find((school) => {
    const schoolName = normalizeForMatch(school.name);
    const schoolDomain = normalizeForMatch(
      school.domain.replace(".ca", "").replace(".edu", "")
    );

    return q === schoolName || q === schoolDomain;
  });
}

function findInstitutionMention(query) {
  const q = normalizeForMatch(query);

  return allowedInstitutions.find((school) => {
    const schoolName = normalizeForMatch(school.name);
    const schoolDomain = normalizeForMatch(
      school.domain.replace(".ca", "").replace(".edu", "")
    );

    return q.includes(schoolName) || q.includes(schoolDomain);
  });
}

function buildDirectInstitutionResult(match) {
  return {
    title: match.name,
    institution: match.name,
    url: match.homepage,
    content: `Official homepage for ${match.name}. You can explore programs, admissions, tuition, scholarships, and student services here.`,
    sourceType: "direct-official"
  };
}

function expandQuery(userQuery) {
  const q = ` ${normalizeForMatch(userQuery)} `;
  let expanded = userQuery;

  const replacements = [
    { short: " sd ", full: " software development " },
    { short: " cs ", full: " computer science " },
    { short: " it ", full: " information technology " },
    { short: " bba ", full: " business administration " },
    { short: " eng ", full: " engineering " },
    { short: " acct ", full: " accounting " }
  ];

  for (const item of replacements) {
    if (q.includes(item.short)) {
      expanded += item.full;
    }
  }

  return normalizeText(expanded);
}

function shouldAddAlberta(query) {
  const q = normalizeForMatch(query);

  if (q.includes("alberta")) return false;
  if (findInstitutionMention(query)) return false;

  return true;
}

function buildPrimaryDuckDuckGoQuery(userQuery) {
  const institution = findInstitutionMention(userQuery);

  if (institution) {
    return `${userQuery} site:${institution.domain}`;
  }

  const baseQuery = shouldAddAlberta(userQuery)
    ? `${userQuery} Alberta`
    : userQuery;

  const siteQuery = allowedDomains.map((d) => `site:${d}`).join(" OR ");
  return `${baseQuery} (${siteQuery})`;
}

function buildFallbackDuckDuckGoQuery(userQuery) {
  const institution = findInstitutionMention(userQuery);

  if (institution) {
    return `${userQuery} program admissions site:${institution.domain}`;
  }

  const baseQuery = shouldAddAlberta(userQuery)
    ? `${userQuery} Alberta`
    : userQuery;

  return `${baseQuery} post secondary programs`;
}

function scoreResult(result, userQuery) {
  const title = normalizeText(result.title).toLowerCase();
  const content = normalizeText(result.content).toLowerCase();
  const url = String(result.url || "").toLowerCase();
  const query = normalizeText(userQuery).toLowerCase();

  let score = 0;

  if (title.includes(query)) score += 10;
  if (content.includes(query)) score += 6;

  const queryWords = query.split(" ").filter(Boolean);

  for (const word of queryWords) {
    if (title.includes(word)) score += 3;
    if (content.includes(word)) score += 2;
    if (url.includes(word)) score += 2;
  }

  let pathname = "/";
  try {
    pathname = new URL(result.url).pathname || "/";
  } catch {}

  if (pathname === "/" || pathname === "") {
    score -= 8;
  }

  const boostWords = [
    "program",
    "programs",
    "course",
    "courses",
    "admission",
    "admissions",
    "academic",
    "academics",
    "study",
    "degree",
    "diploma",
    "certificate",
    "tuition",
    "scholarship",
    "international",
    "software",
    "development"
  ];

  for (const word of boostWords) {
    if (url.includes(word)) score += 3;
    if (title.includes(word)) score += 2;
    if (content.includes(word)) score += 1;
  }

  return score;
}

async function fetchDuckDuckGoHtml(query) {
  const ddgUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;

  const response = await fetch(ddgUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      "Accept":
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "no-cache",
      "Pragma": "no-cache"
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`DuckDuckGo search failed with status ${response.status}`);
  }

  return response.text();
}

function parseDuckDuckGoResults(html) {
  const $ = cheerio.load(html);
  const results = [];

  $(".result").each((_, el) => {
    const title = normalizeText($(el).find(".result__title").text());
    const snippet = normalizeText($(el).find(".result__snippet").text());
    const href = $(el).find(".result__title a").attr("href");

    if (!href) return;

    let finalUrl = href;

    try {
      const parsed = new URL(href, "https://html.duckduckgo.com");
      const uddg = parsed.searchParams.get("uddg");

      if (uddg) {
        finalUrl = decodeURIComponent(uddg);
      } else if (href.startsWith("//")) {
        finalUrl = `https:${href}`;
      } else if (!/^https?:\/\//i.test(href)) {
        return;
      }
    } catch {
      return;
    }

    if (!isAllowedUrl(finalUrl)) return;

    results.push({
      title: title || "Official result",
      url: finalUrl,
      institution: guessInstitutionFromUrl(finalUrl),
      content: snippet || "Official institution page",
      sourceType: "duckduckgo-official"
    });
  });

  const seen = new Set();

  return results.filter((item) => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}

async function searchDuckDuckGoHtml(query) {
  const html = await fetchDuckDuckGoHtml(query);
  return parseDuckDuckGoResults(html);
}

function buildAnswer(query, results) {
  if (!results.length) {
    return `I couldn’t find a strong official result for "${query}" from the approved Alberta institution websites. Try using a more specific program name, school name, or keywords like admission, tuition, diploma, degree, scholarship, or international student.`;
  }

  const institutions = [...new Set(results.slice(0, 4).map((r) => r.institution))];

  return `I found official results from ${institutions.join(", ")}. The top matches below are the most relevant pages for your search.`;
}

function buildInstitutionFallbackResult(match, userQuery) {
  return {
    title: `${match.name} Programs`,
    institution: match.name,
    url: match.homepage,
    content: `I could not get stable live search results for "${userQuery}" right now, but this is the official ${match.name} website where you can browse programs, admissions, and student information.`,
    sourceType: "fallback-official"
  };
}

export async function POST(req) {
  try {
    const body = await req.json();
    const userQuery = normalizeText(body?.query);

    if (!userQuery) {
      return NextResponse.json(
        { error: "Query is required." },
        { status: 400 }
      );
    }

    const exactInstitution = findInstitutionMatch(userQuery);

    if (exactInstitution) {
      const result = buildDirectInstitutionResult(exactInstitution);

      return NextResponse.json({
        query: userQuery,
        answer: `I found the official website for ${exactInstitution.name}. You can explore programs, admissions, tuition, scholarships, and student services there.`,
        results: [result]
      });
    }

    const expandedQuery = expandQuery(userQuery);
    const primaryQuery = buildPrimaryDuckDuckGoQuery(expandedQuery);

    let rawResults = [];
    try {
      rawResults = await searchDuckDuckGoHtml(primaryQuery);
    } catch {
      rawResults = [];
    }

    if (!rawResults.length) {
      const fallbackQuery = buildFallbackDuckDuckGoQuery(expandedQuery);

      try {
        rawResults = await searchDuckDuckGoHtml(fallbackQuery);
      } catch {
        rawResults = [];
      }
    }

    const rankedResults = rawResults
      .map((result) => ({
        ...result,
        rankScore: scoreResult(result, expandedQuery)
      }))
      .sort((a, b) => b.rankScore - a.rankScore)
      .slice(0, 8)
      .map(({ rankScore, ...rest }) => rest);

    if (!rankedResults.length) {
      const institutionMention = findInstitutionMention(userQuery);

      if (institutionMention) {
        return NextResponse.json({
          query: userQuery,
          answer: `I couldn’t get stable live search results for "${userQuery}" right now, but I found the official ${institutionMention.name} website below.`,
          results: [buildInstitutionFallbackResult(institutionMention, userQuery)]
        });
      }
    }

    const answer = buildAnswer(userQuery, rankedResults);

    return NextResponse.json({
      query: userQuery,
      answer,
      results: rankedResults
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Search failed.",
        details: error.message || "Unknown error"
      },
      { status: 500 }
    );
  }
}