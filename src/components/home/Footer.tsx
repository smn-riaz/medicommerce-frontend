import Link from 'next/link'

import Logo from './Logo'

export default function Footer() {
  return (
    <footer className=" text-gray-700 py-10 border-t bg-[#eaf0f3a1]">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

      <Logo />
        <div>
          <Link href="/" className="text-xl font-bold text-primary">
            MediCommerce
          </Link>
          <p className="mt-2 text-sm text-gray-600">
            Trusted online pharmacy for all your health and wellness needs.
          </p>
        </div>

   
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/shop">Shop</Link></li>
            <li><Link href="/contact">About</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-sm">📞 +88017777777</p>
          <p className="text-sm">📧 support@MediCommerce.com</p>
          <p className="text-sm mt-2">🏠 Dhaka, Bangladesh</p>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} MediCommerce. All rights reserved.
      </div>
    </footer>
  )
}
