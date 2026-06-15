"use client";

import { Check, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying PayPrompt",
    features: [
      "5 invoices/month",
      "Basic email reminders",
      "1 integration (Stripe/PayPal)",
      "7-day reminder history",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For serious freelancers",
    features: [
      "Unlimited invoices",
      "AI smart reminders",
      "2 integrations",
      "Multi-language support",
      "Payment prediction",
      "30-day analytics",
      "Priority email support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Agency",
    price: "$49",
    period: "/month",
    description: "For teams and agencies",
    features: [
      "Everything in Pro",
      "5 team members",
      "API access",
      "White-label emails",
      "Custom workflows",
      "90-day analytics",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Simple Pricing, No Surprises
          </h2>
          <p className="text-lg text-gray-600">
            Start free. Upgrade when you are ready. Cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? "bg-gray-900 text-white shadow-2xl scale-105"
                  : "bg-gray-50 border border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p
                  className={`text-sm ${
                    plan.popular ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span
                  className={`text-sm ${
                    plan.popular ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        plan.popular ? "text-emerald-400" : "text-emerald-500"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        plan.popular ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href="/signup">
                <Button
                  className={`w-full py-6 text-base font-semibold ${
                    plan.popular
                      ? "bg-white text-gray-900 hover:bg-gray-100"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white"
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
