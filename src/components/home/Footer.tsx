import Link from 'next/link'

import Logo from './Logo'

export default function Footer() {
  return (
   <footer className="bg-background text-gray-700 dark:text-gray-300 py-10 border-t border-gray-300 dark:border-gray-700">
  <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
    {/* Logo and About */}
    <div>
      <Logo />
      <Link href="/" className="block mt-2 text-2xl font-bold text-primary dark:text-white">
        MediCommerce
      </Link>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-xs">
        Trusted online pharmacy for all your health and wellness needs.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-white">Quick Links</h4>
      <ul className="space-y-2 text-sm">
        <li>
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        </li>
        <li>
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </li>
      </ul>
    </div>

    {/* Contact Info */}
    <div>
      <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-white">Contact</h4>
      <ul className="text-sm space-y-1">
        <li>📞 +88017777777</li>
        <li>📧 support@MediCommerce.com</li>
        <li className="mt-1">🏠 Dhaka, Bangladesh</li>
      </ul>
    </div>

    {/* Subscribe Section */}
    <div>
      <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-white">Subscribe</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        Get updates on new products and special offers.
      </p>
      <form className="flex flex-col sm:flex-row items-center gap-2">
        <input
          type="email"
          placeholder="Your email"
          className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-600"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white text-sm rounded-md hover:bg-primary/90 transition-colors"
        >
          Subscribe
        </button>
      </form>
    </div>
  </div>

  {/* Footer Bottom */}
  <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
    &copy; {new Date().getFullYear()} <span className="font-semibold">MediCommerce</span>. All rights reserved.
  </div>
</footer>

  
  )
}
