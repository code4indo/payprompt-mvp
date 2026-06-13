"use client";

import { Upload, Settings, Send, TrendingUp } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Upload,
    title: "Connect Your Invoices",
    description:
      "Import from Stripe, PayPal, QuickBooks, or upload a CSV. PayPrompt automatically detects invoice details, due dates, and client info.",
  },
  {
    step: "02",
    icon: Settings,
    title: "Set Your Rules",
    description:
      "Choose your reminder schedule, tone (polite/firm/professional), and escalation path. Or let AI optimize based on your client patterns.",
  },
  {
    step: "03",
    icon: Send,
    title: "AI Takes Over",
    description:
      "PayPrompt sends perfectly timed, personalized reminders. Each message is unique — no two clients get the same template.",
  },
  {
    step: "04",
    icon: TrendingUp,
    title: "Watch DSO Drop",
    description:
      "Track Days Sales Outstanding, payment velocity, and cash flow forecasts in real-time. Average user sees 40% faster payments in 30 days.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            From Invoice to Payment in 4 Steps
          </h2>
          <p className="text-lg text-gray-600">
            Set it up once. Let AI handle the rest forever.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div key={index} className="relative">
              <div className="text-6xl font-extrabold text-gray-100 absolute -top-4 -left-2 select-none">
                {item.step}
              </div>
              <div className="relative pt-8">
                <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-600/20">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
