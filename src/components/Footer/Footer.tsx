import React from "react";
import { Phone, MapPin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <div>
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">

            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold">
                  S
                </div>
                <span className="text-lg font-semibold">ShopMart</span>
              </div>

              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Your one-stop destination for the latest technology, fashion,
                and lifestyle products. Quality guaranteed with fast shipping
                and excellent customer service.
              </p>
              <ul className="space-y-3 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>123 Shop Street, October City, DC 12345</span>
                </li>

                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>(+20) 01093333333</span>
                </li>

                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>support@shopmart.com</span>
                </li>
              </ul>
            </div>

            {/* SHOP */}
            <div>
              <h4 className="font-semibold mb-4">SHOP</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-black">
                    Electronics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Fashion
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Home & Garden
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Sports
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Deals
                  </a>
                </li>
              </ul>
            </div>

            {/* CUSTOMER SERVICE */}
            <div>
              <h4 className="font-semibold mb-4">CUSTOMER SERVICE</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-black">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Track Your Order
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Returns & Exchanges
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Size Guide
                  </a>
                </li>
              </ul>
            </div>

            {/* ABOUT */}
            <div>
              <h4 className="font-semibold mb-4">ABOUT</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-black">
                    About ShopMart
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Investor Relations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Sustainability
                  </a>
                </li>
              </ul>
            </div>

            {/* POLICIES */}
            <div>
              <h4 className="font-semibold mb-4">POLICIES</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-black">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Shipping Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Refund Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom  */}
        <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ShopMart. All rights reserved.
        </div>
      </footer>{" "}
    </div>
  );
}
