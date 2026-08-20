import React from "react";

export function PromoBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
      <div className="relative bg-gradient-to-r from-[#0DAE91] to-[#00B495] text-primary-foreground rounded-2xl p-8 md:p-12 overflow-hidden shadow-sm flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,white_0%,transparent_60%)]" />

        <div className="flex-1 text-center md:text-left z-10">
          <h3 className="text-xl md:text-3xl font-extrabold leading-tight mb-2">
            Petualangan Edukatif bersama Malang Mbois City Tour!
          </h3>
          <p className="text-sm md:text-base opacity-90 font-medium">
            Petualangan edukatif bersama Malang Mbois City Tour! Jelajahi keindahan kota Malang dengan aman dan menyenangkan.
          </p>
          <button className="mt-6 bg-card text-[#0DAE91] font-bold text-xs px-6 py-3 rounded-lg shadow-sm hover:opacity-90 transition-opacity cursor-pointer">
            Daftar Sekarang
          </button>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/40" />
          <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
          <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/40" />
        </div>
      </div>
    </section>
  );
}
