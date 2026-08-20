import Link from "next/link";
import React from "react";

export function SocialLinks() {
  return (
    <div className="flex space-x-4">
      <a href="https://youtube.com" className="hover:text-white transition-colors" aria-label="YouTube">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.163c-.272-.98-1.09-1.755-2.07-2.013C19.6 3.65 12 3.65 12 3.65s-7.6 0-9.428.5C1.59 4.4 1 5.18 1 6.16 1 8.07 1 12 1 12s0 3.93.5 5.84c.27.98 1.09 1.76 2.07 2.01 1.83.5 9.43.5 9.43.5s7.6 0 9.428-.5c.98-.25 1.79-1.03 2.07-2.01.5-1.9.5-5.84.5-5.84s0-3.93-.5-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      </a>
      <a href="https://instagram.com" className="hover:text-white transition-colors" aria-label="Instagram">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      </a>
      <a href="https://facebook.com" className="hover:text-white transition-colors" aria-label="Facebook">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
        </svg>
      </a>
    </div>
  );
}

export function FooterLinks() {
  const categories = [
    { name: "Beranda", path: "/" },
    { name: "Kesehatan", path: "/?category=kesehatan" },
    { name: "Otomotif", path: "/?category=otomotif" },
    { name: "Politik", path: "/?category=politik" },
    { name: "Olahraga", path: "/?category=olahraga" },
    { name: "Nasional", path: "/?category=nasional" },
    { name: "Internasional", path: "/?category=internasional" },
  ];

  return (
    <>
      <div className="md:col-span-2">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-100 mb-4">
          Telusuri
        </h4>
        <ul className="space-y-2.5 text-sm">
          {categories.map((cat) => (
            <li key={cat.name}>
              <Link href={cat.path} className="hover:text-white transition-colors">
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="md:col-span-2">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-100 mb-4">
          Bantuan
        </h4>
        <ul className="space-y-2.5 text-sm">
          <li>
            <a href="#" className="hover:text-white transition-colors">Kontak Kami</a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">Laporan Pembajakan</a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">Kebijakan</a>
          </li>
        </ul>
      </div>
    </>
  );
}
