
import Link from "next/link";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

const hostLinks = [
  { name: "Add Your Studio", href: "/add-studio" },
  { name: "My Listings", href: "/my-listings" },
  { name: "My Bookings", href: "/my-bookings" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4 sm:gap-7">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="/"
              className="text-xl font-bold text-white"
            >
              Studio<span className="text-gray-400">Space</span>
            </Link>

            <p className="mt-2 max-w-xs text-xs leading-5 text-gray-400">
              Find the perfect creative space for your next big idea.
              Discover, book, and create with StudioSpace.
            </p>

            <div className="mt-3 flex gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-xs font-bold text-white transition hover:bg-white hover:text-gray-950"
              >
                f
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-xs font-bold text-white transition hover:bg-white hover:text-gray-950"
              >
                IG
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-xs font-bold text-white transition hover:bg-white hover:text-gray-950"
              >
                in
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-2 text-xs text-gray-400">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="transition hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hosts */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">
              For Hosts
            </h3>

            <ul className="space-y-2 text-xs text-gray-400">
              {hostLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="transition hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="mb-3 text-sm font-semibold text-white">
              Get In Touch
            </h3>

            <div className="space-y-2 text-xs text-gray-400">
              <p className="break-all">
                ✉ support@studiospace.com
              </p>
              <p>⌖ Dhaka, Bangladesh</p>
            </div>

            <Link
              href="/contact"
              className="mt-3 inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-xs font-semibold text-gray-950 transition hover:bg-gray-200"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-5 text-center sm:flex-row sm:text-left">

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} StudioSpace. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-gray-500">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy Policy
            </Link>

            <Link href="/terms" className="transition hover:text-white">
              Terms & Conditions
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
