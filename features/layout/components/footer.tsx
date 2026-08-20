import Link from "next/link";
import React from "react";
import { NewsletterForm } from "../../../shared/components/newsletterForm";
import { FooterLinks, SocialLinks } from "../../../shared/components/footerLinks";

export function Footer() {
  return (
    <footer className="w-full bg-footer-bg text-muted-foreground border-t border-border font-sans">
      <div className="max-w-7xl mx-auto px-12 md:px-18 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4 flex flex-col justify-between gap-6">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-4">
                <img src="/logo.svg" className="w-10 h-10 lg:w-17 lg:h-17 brightness-0 invert" alt="Logo" />
                <span className="text-xl lg:text-2xl font-bold tracking-tight text-primary-foreground">
                  Berita Kini
                </span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-sm">
                © {new Date().getFullYear()} Berita Kini. All Rights Reserved.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground mb-3">
                Ikuti Kami
              </h4>
              <SocialLinks />
            </div>
          </div>
          <FooterLinks />
          <div className="md:col-span-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground mb-4">
              Berlangganan Berita Terbaru
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Dapatkan berita terhangat langsung di email Anda setiap hari.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </footer>
  );
}
