"use client";

import { TrendingUp, Users, DollarSign, Clock } from "lucide-react";

const statsData = [
  {
    icon: TrendingUp,
    value: "40%",
    label: "Faster Payments",
    sub: "Average DSO reduction",
  },
  {
    icon: Users,
    value: "2,000+",
    label: "Active Users",
    sub: "Freelancers & agencies",
  },
  {
    icon: DollarSign,
    value: "$12M+",
    label: "Invoices Tracked",
    sub: "And growing daily",
  },
  {
    icon: Clock,
    value: "2 min",
    label: "Setup Time",
    sub: "From signup to first reminder",
  },
];

export default function Stats() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 to-teal-600">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <stat.icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
              <p className="text-3xl sm:text-4xl font-bold mb-1">
                {stat.value}
              </p>
              <p className="font-medium opacity-90">{stat.label}</p>
              <p className="text-sm opacity-70">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
