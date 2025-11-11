import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Zap } from "lucide-react"; // Lucide icons for clean design

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 dark:bg-base-300 border-t border-base-300 dark:border-base-content/10 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* 1. Logo / Site Name & Short Description (Assignment Requirement) */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link
              to="/"
              className="flex items-center space-x-2 text-2xl font-extrabold text-gray-800 dark:text-white tracking-tight"
            >
              <Zap className="h-6 w-6 text-cyan-600" />
              <p className="text-gray-600">
                Bill<span className="text-cyan-600">Manager</span>
              </p>
            </Link>
            <p className="text-sm text-base-content/70">
              A smart, secure solution for viewing, managing, and paying all
              your monthly utility bills in one place. Simplify your finances.
            </p>
          </div>

          {/* 2. Useful Links (Assignment Requirement) */}
          <div>
            <h3 className="text-lg font-semibold text-base-content mb-4 border-b-2 border-cyan-600/50 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-base-content/70">
              <li>
                <Link to="/" className="hover:text-cyan-600 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/bills" className="hover:text-cyan-600 transition">
                  All Bills
                </Link>
              </li>
              <li>
                <Link
                  to="/my-pay-bills"
                  className="hover:text-cyan-600 transition"
                >
                  My Paid Bills
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-cyan-600 transition">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Legal & Resources (Standard Footer Content) */}
          <div>
            <h3 className="text-lg font-semibold text-base-content mb-4 border-b-2 border-cyan-600/50 inline-block">
              Resources
            </h3>
            <ul className="space-y-2 text-sm text-base-content/70">
              <li>
                <a href="#" className="hover:text-cyan-600 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-600 transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-600 transition">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* 4. Contact Information (Enhancement) */}
          <div>
            <h3 className="text-lg font-semibold text-base-content mb-4 border-b-2 border-cyan-600/50 inline-block">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-base-content/70">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-cyan-600" />
                <span>support@billmanager.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-cyan-600" />
                <span>+880 1XXXXXXXXX</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-cyan-600 mt-1" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Section (Assignment Requirement) */}
      <div className="border-t border-base-300 dark:border-base-content/10 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-base-content/60">
            &copy; {currentYear} BillManager. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
