"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_path: window.location.pathname,
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      const response = await fetch("https://script.google.com/macros/s/1pnde7XsAHeUN92oBOOIAQ-vo2oJnRtbRY8qtWQz3Se27ky0DUuIyvUMN/exec", {
        method: "POST",
        mode: "cors", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitted(true);
        if (window.gtag) {
          window.gtag("event", "conversion", {
            event_category: "waitlist",
            event_label: "email_capture",
            value: 1,
          });
        }
      } else {
        console.error("Failed to submit");
      }
    } catch (err) {
      console.error("Error submitting email:", err);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black px-6 py-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-semibold leading-tight mb-4 tracking-tight">
            PMAssist — Your AI Copilot for Product Managers
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Automate the boring stuff. Get AI to plan your sprints, track tasks, and manage updates while you focus on product strategy.
          </p>
        </header>

        <section className="mb-20 bg-gray-100 border border-gray-300 rounded-xl p-6 shadow-sm">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold mb-2">🎬 Watch the Demo</h2>
            <p className="text-gray-600 mb-4">See how PMAssist transforms your workflow in less than 3 minutes.</p>
            <div className="aspect-video w-full max-w-3xl mx-auto">
              <iframe
                className="rounded-xl w-full h-full"
                src="https://www.youtube.com/embed/diz_1O6MgL8"
                title="PMAssist Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>

        <section className="mb-20 border border-gray-300 rounded-xl p-6 shadow-sm bg-white text-center">
          <h2 className="text-2xl font-semibold mb-4">🚀 Join the Waitlist</h2>
          <p className="text-gray-600 mb-6">Get early access and be the first to experience the future of product management.</p>
          {submitted ? (
            <p className="text-green-600 text-xl font-medium">✅ You're on the waitlist!</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black w-full"
                required
              />
              <button
                type="submit"
                className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium w-full sm:w-auto"
              >
                Join Now
              </button>
            </form>
          )}
        </section>

        <footer className="text-sm text-gray-500 text-center mt-10">
          © 2025 PMAssist. Made with ❤️ for PMs.
        </footer>
      </div>
    </main>
  );
}
