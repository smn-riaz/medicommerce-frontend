"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/auth";
import { Badge } from "../ui/badge";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCart, totalQuantitySelector } from "@/redux/features/cartSlice";
import { protectedRoutes } from "@/constants";
import { HoverNavbarCategory } from "./HoverNavbarCategory";
import { ProfileDropDown } from "./ProfileDropDown";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const totalQuantity = useAppSelector(totalQuantitySelector);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, setUser, setIsLoading } = useUser();

  const handleLogOut = () => {
    setUser(null);
    logout();
    dispatch(clearCart());
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <nav className="w-[95vw] bg-secondary border-b rounded-md shadow-sm fixed top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-primary flex items-center gap-2"
        >
          <Logo />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>

          <Link
            href="/about"
            className={`hover:text-primary transition ${
              pathname === "/about" ? "text-primary font-semibold" : ""
            }`}
          >
            About
          </Link>

          <Link
            href="/shop"
            className={`hover:text-primary transition ${
              pathname === "/shop" ? "text-primary font-semibold" : ""
            }`}
          >
            Medicines
          </Link>

          <Link
            href="/#bestselling"
            className="hover:text-primary transition"
          >
            Hotshots
          </Link>

          <HoverNavbarCategory />

          <Link
            href="/contact"
            className={`hover:text-primary transition ${
              pathname === "/contact" ? "text-primary font-semibold" : ""
            }`}
          >
            Contact
          </Link>

          {user?.role && (
            <Link
              href={`/${user?.role}`}
              className="hover:text-primary transition"
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/cart"
            className={`flex items-center gap-1 ${
              pathname === "/cart" ? "text-primary font-semibold" : ""
            }`}
          >
            <ShoppingCart className="w-6 h-6 hover:text-primary transition" />
            {totalQuantity > 0 && (
              <sup>
                <Button className="rounded-full bg-accent-content text-white cursor-pointer w-[30px] h-[30px]">
                  {totalQuantity}
                </Button>
              </sup>
            )}
          </Link>

          {user?.email ? (
            <ProfileDropDown user={user} handleLogOut={handleLogOut} />
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}

          <ThemeToggle />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Content */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-background border-t z-50">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-primary transition"
          >
            Home
          </Link>

          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-1 hover:text-primary transition ${
              pathname === "/about" ? "text-primary font-semibold" : ""
            }`}
          >
            About
          </Link>

          <Link
            href="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-1 hover:text-primary transition ${
              pathname === "/shop" ? "text-primary font-semibold" : ""
            }`}
          >
            Medicines
          </Link>

          <Link
            href="/#bestselling"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-primary transition"
          >
            Hotshots
          </Link>

          <div className="block py-1">
            <HoverNavbarCategory />
          </div>

          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-1 hover:text-primary transition ${
              pathname === "/contact" ? "text-primary font-semibold" : ""
            }`}
          >
            Contact
          </Link>

          {user?.role && (
            <Link
              href={`/${user?.role}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-primary transition"
            >
              Dashboard
            </Link>
          )}

          <Link
            href="/cart"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-1 hover:text-primary  items-center justify-between transition ${
              pathname === "/cart" ? "text-primary font-semibold" : ""
            }`}
          >
            <div className="flex">
              <span>Cart</span>
            {totalQuantity > 0 && (
              <span className="ml-2 bg-accent-content text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {totalQuantity}
              </span>
            )}
            </div>
          </Link>

          {user?.name && (
            <div className="block py-1">
              <Badge>{user.name.toUpperCase()}</Badge>
            </div>
          )}

          <hr className="my-2" />

          {user?.email ? (
            <button
              onClick={() => {
                handleLogOut();
                setMobileMenuOpen(false);
              }}
              className="block py-1 text-left w-full text-amber-600 font-medium hover:underline"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-primary transition"
            >
              Login
            </Link>
          )}

          <div className="pt-2">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
