
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
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">

        <div className="grid grid-cols-2 gap-7 sm:grid-cols-4">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="text-xl font-bold text-white">
              Studio<span className="text-gray-400">Space</span>
            </Link>

            <p className="mt-2 max-w-xs text-xs leading-5 text-gray-400">
              Find the perfect creative space for your next big idea.
              Discover, book, and create with StudioSpace.
            </p>

            <div className="mt-3 flex gap-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-xs font-bold text-white hover:bg-white hover:text-gray-950">
                f
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-xs font-bold text-white hover:bg-white hover:text-gray-950">
                IG
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-xs font-bold text-white hover:bg-white hover:text-gray-950">
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
                  <Link href={link.href} className="hover:text-white">
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
                  <Link href={link.href} className="hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">
              Get In Touch
            </h3>

            <div className="space-y-2 text-xs text-gray-400">
              <p>✉ support@studiospace.com</p>
              <p>⌖ Dhaka, Bangladesh</p>
            </div>

            <Link
              href="/contact"
              className="mt-3 inline-block rounded-md bg-white px-4 py-2 text-xs font-semibold text-gray-950 hover:bg-gray-200"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-7 flex flex-col items-center justify-between gap-3 border-t border-gray-800 pt-4 text-center text-xs text-gray-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} StudioSpace. All rights reserved.
          </p>

          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms & Conditions
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
