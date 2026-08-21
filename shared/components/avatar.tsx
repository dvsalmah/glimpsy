import React from "react";

interface AvatarProps {
  name: string;
  className?: string;
}

export function Avatar({ name, className = "w-9 h-9" }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  
  const colors = [
    "bg-red-100 text-red-700",
    "bg-emerald-100 text-emerald-700",
    "bg-blue-100 text-blue-700",
    "bg-amber-100 text-amber-700",
    "bg-purple-100 text-purple-700",
    "bg-indigo-100 text-indigo-700",
  ];
  const color = colors[name.length % colors.length];

  return (
    <div className={`${className} rounded-full flex items-center justify-center font-bold text-xs ${color}`}>
      {initials}
    </div>
  );
}
