"use client";

import PageHeader from "../../components/SiteHeader";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader />

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#15385E] mb-3">
            Contact Us
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about Alberta post-secondary institutions or how to
            use this app? We’re here to help.
          </p>
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-2xl p-6 border shadow-sm mb-10">
          <h2 className="text-xl font-semibold text-[#15385E] mb-2">
            About This App
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            This platform helps students explore publicly funded post-secondary
            institutions in Alberta. Applications are completed through the
            official Alberta government website. This app does not process or
            store applications.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl p-6 border shadow-sm mb-10">
          <h2 className="text-xl font-semibold text-[#15385E] mb-6">
            Send Us a Message
          </h2>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-lg border
                           focus:outline-none focus:ring-2 focus:ring-[#4BAE53]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border
                           focus:outline-none focus:ring-2 focus:ring-[#4BAE53]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Write your message here..."
                className="w-full px-4 py-3 rounded-lg border
                           focus:outline-none focus:ring-2 focus:ring-[#4BAE53]"
              />
            </div>

            <button
              type="submit"
              disabled
              className="w-full py-3 rounded-lg bg-[#4BAE53]
                         text-white cursor-not-allowed"
            >
              Submit
            </button>
          </form>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl p-6 border shadow-sm">
          <h2 className="text-xl font-semibold text-[#15385E] mb-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 text-sm text-gray-600">
            <p>
              <strong>Is this ApplyAlberta?</strong><br />
              No. This app helps you explore institutions. You will be redirected
              to the official Alberta website to apply.
            </p>

            <p>
              <strong>Where do I apply?</strong><br />
              Applications are completed through the Alberta account sign-in
              page.
            </p>

            <p>
              <strong>Can I apply to multiple institutions?</strong><br />
              Yes. ApplyAlberta allows you to apply to more than one institution.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
