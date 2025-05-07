import Link from 'next/link'

import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-[#eaf0f3a1] dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10 border-t border-gray-300 dark:border-gray-700">
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
            <Link href="/contact" className="hover:text-primary transition-colors">About</Link>
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
    </div>
  
    {/* Footer Bottom */}
    <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
      &copy; {new Date().getFullYear()} <span className="font-semibold">MediCommerce</span>. All rights reserved.
    </div>
  </footer>
  
  )
}
