
"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialForm: ContactForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
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

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (
    field: keyof ContactForm,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (submitted) {
      setSubmitted(false);
    }
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setSubmitted(false);

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.subject.trim() ||
      !form.message.trim()
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (form.message.trim().length < 10) {
      toast.warning(
        "Please write a message of at least 10 characters."
      );
      return;
    }

    toast.info("Contact form is in demo mode.", {
      description:
        "Your message has not been sent. Backend integration is coming soon.",
    });

    setSubmitted(true);
    setForm(initialForm);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-white text-gray-900">
      {/* Hero Section */}
      <section className="bg-gray-950 px-4 py-14 text-center text-white sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 sm:text-sm sm:tracking-[0.25em]">
            Get In Touch
          </p>

          <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Contact Us
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-300 sm:mt-5 sm:text-base sm:leading-8">
            Have a question, suggestion or need help? We would
            love to hear from you. Get in touch with the
            StudioSpace team.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8 text-center sm:mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500 sm:text-sm sm:tracking-[0.2em]">
            Contact Information
          </p>

          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            We&apos;d Love to Hear From You
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {contactInfo.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-200 bg-white p-5 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl sm:h-14 sm:w-14">
                {item.icon}
              </div>

              <h3 className="mt-4 text-base font-bold sm:mt-5 sm:text-lg">
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

      {/* Contact Form Section */}
      <section className="bg-gray-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500 sm:text-sm sm:tracking-[0.2em]">
              Send a Message
            </p>

            <h2 className="mt-3 text-2xl font-bold sm:text-3xl lg:text-4xl">
              Let&apos;s Start a Conversation
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600 sm:mt-6 sm:text-base sm:leading-8">
              Whether you are a creator looking for a studio
              or a studio owner wanting to list your space,
              our team is here to help. Send us a message
              and let us know how we can assist you.
            </p>

            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 sm:mt-8 sm:p-6">
              <h3 className="font-bold">
                Our Support Hours
              </h3>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex flex-col justify-between gap-1 min-[400px]:flex-row min-[400px]:gap-3">
                  <span className="text-gray-500">
                    Saturday - Thursday
                  </span>
                  <span className="font-semibold">
                    9 AM - 6 PM
                  </span>
                </div>

                <div className="flex flex-col justify-between gap-1 min-[400px]:flex-row min-[400px]:gap-3">
                  <span className="text-gray-500">
                    Friday
                  </span>
                  <span className="font-semibold">
                    Closed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7 md:p-8">
            <h3 className="text-xl font-bold sm:text-2xl">
              Send Us a Message
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Fill out the form below.
            </p>

            {submitted && (
              <div
                role="status"
                className="mt-5 rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700 sm:p-4"
              >
                This form was submitted in demo mode.
                No message was sent. Backend integration
                is coming soon.
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-5 space-y-4 sm:mt-6 sm:space-y-5"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm font-semibold"
                >
                  Full Name
                </label>

                <input
                  id="contact-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    updateField("name", e.target.value)
                  }
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-sm font-semibold"
                >
                  Email Address
                </label>

                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    updateField("email", e.target.value)
                  }
                  placeholder="example@email.com"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-sm font-semibold"
                >
                  Subject
                </label>

                <select
                  id="contact-subject"
                  required
                  value={form.subject}
                  onChange={(e) =>
                    updateField("subject", e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                >
                  <option value="">
                    Select a subject
                  </option>
                  <option value="Booking Support">
                    Booking Support
                  </option>
                  <option value="Studio Listing">
                    Studio Listing
                  </option>
                  <option value="Payment Issue">
                    Payment Issue
                  </option>
                  <option value="General Inquiry">
                    General Inquiry
                  </option>
                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-semibold"
                >
                  Your Message
                </label>

                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    updateField("message", e.target.value)
                  }
                  placeholder="Write your message here..."
                  className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full rounded-lg bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-700 active:scale-[0.99]"
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500 sm:text-sm sm:tracking-[0.2em]">
            Help Center
          </p>

          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-gray-200 bg-white p-4 sm:p-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold sm:text-base">
                <span>{faq.question}</span>

                <span className="shrink-0 text-xl text-gray-500 transition group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-3 text-sm leading-7 text-gray-600 sm:mt-4">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gray-950 px-4 py-12 text-center text-white sm:px-6 sm:py-16 lg:px-8">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Ready to Explore StudioSpace?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
          Find the perfect creative space for your next
          project. Start exploring today.
        </p>

        <Link
          href="/studios"
          className="mt-6 inline-flex w-full max-w-xs items-center justify-center rounded-lg bg-white px-7 py-3.5 text-sm font-semibold text-gray-950 transition hover:bg-gray-200 sm:mt-7 sm:w-auto"
        >
          Explore Studios →
        </Link>
      </section>
    </main>
  );
}
