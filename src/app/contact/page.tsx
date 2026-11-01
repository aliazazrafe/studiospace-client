
"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() ||
        !form.subject.trim() || !form.message.trim()) {
      return;
    }

    setSubmitted(true);

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: "✉",
      title: "Email Us",
      value: "support@studiospace.com",
      description: "Send us your questions anytime.",
    },
    {
      icon: "☎",
      title: "Call Us",
      value: "+880 1XXX-XXXXXX",
      description: "Contact our support team.",
    },
    {
      icon: "⌖",
      title: "Our Location",
      value: "Dhaka, Bangladesh",
      description: "Serving creative communities.",
    },
  ];

  const faqs = [
    {
      question: "How can I book a studio?",
      answer:
        "Visit our Explore Studios page, choose a studio and follow the booking process.",
    },
    {
      question: "How can I list my studio?",
      answer:
        "Create an account and visit the Add Studio page to submit your studio information.",
    },
    {
      question: "Can I cancel my booking?",
      answer:
        "You can manage your bookings from the My Bookings page. Cancellation rules may depend on the booking policy.",
    },
    {
      question: "How can I get support?",
      answer:
        "You can contact our team using the contact form or the contact information on this page.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Hero Section */}
      <section className="bg-gray-950 px-5 py-20 text-center text-white sm:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-400">
            Get In Touch
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            Contact Us
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-300">
            Have a question, suggestion or need help? We would love to
            hear from you. Get in touch with the StudioSpace team.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
            Contact Information
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            We'd Love to Hear From You
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contactInfo.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-200 bg-white p-7 text-center transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl">
                {item.icon}
              </div>

              <h3 className="mt-5 text-lg font-bold">
                {item.title}
              </h3>

              <p className="mt-2 break-words text-sm font-semibold text-gray-800">
                {item.value}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-gray-50 px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">

          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
              Send a Message
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Let's Start a Conversation
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              Whether you are a creator looking for a studio or a studio
              owner wanting to list your space, our team is here to help.
              Send us a message and let us know how we can assist you.
            </p>

            <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="font-bold">Our Support Hours</h3>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">Saturday - Thursday</span>
                  <span className="font-semibold">9 AM - 6 PM</span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">Friday</span>
                  <span className="font-semibold">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="text-2xl font-bold">
              Send Us a Message
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Fill out the form below.
            </p>

            {submitted && (
              <div className="mt-5 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                Thank you! Your message has been received in this demo.
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Full Name
                </label>

                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-900"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Email Address
                </label>

                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  placeholder="example@email.com"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-900"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Subject
                </label>

                <select
                  required
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-gray-900"
                >
                  <option value="">Select a subject</option>
                  <option value="Booking Support">Booking Support</option>
                  <option value="Studio Listing">Studio Listing</option>
                  <option value="Payment Issue">Payment Issue</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Your Message
                </label>

                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Write your message here..."
                  className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-900"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-700"
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
            Help Center
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-gray-200 bg-white p-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {faq.question}

                <span className="text-xl text-gray-500 transition group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gray-950 px-5 py-16 text-center text-white sm:px-8">
        <h2 className="text-3xl font-bold">
          Ready to Explore StudioSpace?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-400">
          Find the perfect creative space for your next project.
          Start exploring today.
        </p>

        <Link
          href="/studios"
          className="mt-7 inline-flex rounded-lg bg-white px-7 py-3.5 text-sm font-semibold text-gray-950 transition hover:bg-gray-200"
        >
          Explore Studios →
        </Link>
      </section>

    </main>
  );
}
