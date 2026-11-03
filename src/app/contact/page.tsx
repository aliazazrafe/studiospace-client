
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { toast } from "sonner";

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactResponse = {
  success?: boolean;
  message?: string;
  contactId?: string;
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

const subjects = [
  "Booking Support",
  "Studio Listing",
  "Payment Issue",
  "General Inquiry",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (
    field: keyof ContactForm,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setSubmitted(false);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSubmitting) return;

    setSubmitted(false);

    const payload: ContactForm = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    };

    if (
      !payload.name ||
      !payload.email ||
      !payload.subject ||
      !payload.message
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (payload.name.length > 100) {
      toast.error("Name must be 100 characters or less.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      payload.email.length > 254 ||
      !emailRegex.test(payload.email)
    ) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (
      payload.message.length < 10 ||
      payload.message.length > 5000
    ) {
      toast.error(
        "Message must contain 10 to 5000 characters."
      );
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      toast.error("Backend API URL is not configured.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${apiUrl.replace(/\/$/, "")}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data: ContactResponse = await response.json();

      if (!response.ok || data.success !== true) {
        throw new Error(
          data.message || "Failed to send message."
        );
      }

      setSubmitted(true);
      setForm(initialForm);

      toast.success(
        data.message || "Message sent successfully!"
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to send your message.";

      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-white text-gray-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Hero Section */}
      <section className="bg-gray-950 px-4 py-14 text-center text-white sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 sm:text-sm">
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
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500 dark:text-slate-400">
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
              className="rounded-2xl border border-gray-200 bg-white p-5 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 sm:p-7"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl dark:bg-slate-800 sm:h-14 sm:w-14">
                {item.icon}
              </div>

              <h3 className="mt-4 text-base font-bold sm:mt-5 sm:text-lg">
                {item.title}
              </h3>

              <p className="mt-2 break-words text-sm font-semibold text-gray-800 dark:text-slate-200">
                {item.value}
              </p>

              <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-gray-50 px-4 py-12 dark:bg-slate-900/50 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500 dark:text-slate-400">
              Send a Message
            </p>

            <h2 className="mt-3 text-2xl font-bold sm:text-3xl lg:text-4xl">
              Let&apos;s Start a Conversation
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-slate-300 sm:mt-6 sm:text-base sm:leading-8">
              Whether you are a creator looking for a studio
              or a studio owner wanting to list your space,
              our team is here to help. Send us a message
              and let us know how we can assist you.
            </p>

            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900 sm:mt-8 sm:p-6">
              <h3 className="font-bold">
                Our Support Hours
              </h3>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex flex-col justify-between gap-1 min-[400px]:flex-row min-[400px]:gap-3">
                  <span className="text-gray-500 dark:text-slate-400">
                    Saturday - Thursday
                  </span>
                  <span className="font-semibold">
                    9 AM - 6 PM
                  </span>
                </div>

                <div className="flex flex-col justify-between gap-1 min-[400px]:flex-row min-[400px]:gap-3">
                  <span className="text-gray-500 dark:text-slate-400">
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
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-7 md:p-8">
            <h3 className="text-xl font-bold sm:text-2xl">
              Send Us a Message
            </h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
              Fill out the form below.
            </p>

            {submitted && (
              <div
                role="status"
                className="mt-5 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-300 sm:p-4"
              >
                Your message has been saved successfully.
                Thank you for contacting StudioSpace!
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-5 space-y-4 sm:mt-6 sm:space-y-5"
            >
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
                  maxLength={100}
                  disabled={isSubmitting}
                  value={form.name}
                  onChange={(event) =>
                    updateField("name", event.target.value)
                  }
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-orange-500 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

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
                  maxLength={254}
                  disabled={isSubmitting}
                  value={form.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                  placeholder="example@email.com"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-orange-500 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

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
                  disabled={isSubmitting}
                  value={form.subject}
                  onChange={(event) =>
                    updateField("subject", event.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-orange-500 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="">
                    Select a subject
                  </option>

                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

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
                  minLength={10}
                  maxLength={5000}
                  disabled={isSubmitting}
                  value={form.message}
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                  placeholder="Write your message here..."
                  className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-orange-500 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-orange-500 dark:hover:bg-orange-600"
              >
                {isSubmitting
                  ? "Sending Message..."
                  : "Send Message →"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500 dark:text-slate-400">
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
              className="group rounded-xl border border-gray-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:p-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold sm:text-base">
                <span>{faq.question}</span>

                <span className="shrink-0 text-xl text-gray-500 transition group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-slate-300 sm:mt-4">
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
