"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Freelance Designer",
    content: "I used to spend 3 hours every week chasing payments. PayPrompt reduced that to zero. My DSO went from 45 days to 18 days in the first month.",
    rating: 5,
    avatar: "SC",
  },
  {
    name: "Marcus Johnson",
    role: "Agency Owner",
    content: "We have 40+ clients. Before PayPrompt, we had $80K in overdue invoices. Now we are at $12K. The AI knows exactly when to send reminders without annoying clients.",
    rating: 5,
    avatar: "MJ",
  },
  {
    name: "Elena Rodriguez",
    role: "Solo Developer",
    content: "The payment prediction feature is scary accurate. It told me Client X would pay late, and they did. I sent an early reminder and got paid on time.",
    rating: 5,
    avatar: "ER",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Loved by Freelancers Worldwide
          </h2>
          <p className="text-lg text-gray-600">
            Do not just take our word for it. Here is what our users say.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div key={index} className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <Quote className="w-8 h-8 text-primary-200 mb-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-warning-400 text-warning-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">{t.content}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
