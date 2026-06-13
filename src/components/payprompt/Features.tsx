"use client";

import { Brain, Mail, BarChart3, Globe, Lock, Zap } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Smart Reminders",
    description:
      "AI writes personalized follow-up emails based on client history, tone preference, and payment patterns. No more generic templates.",
    color: "bg-emerald-500",
  },
  {
    icon: Mail,
    title: "Multi-Channel Escalation",
    description:
      "Automatic escalation: Email → SMS → Phone call reminder. Set your own rules and let AI handle the rest.",
    color: "bg-teal-500",
  },
  {
    icon: BarChart3,
    title: "Payment Prediction",
    description:
      "AI analyzes historical data to predict when each client typically pays. Get alerts before invoices become overdue.",
    color: "bg-amber-500",
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description:
      "Send reminders in 30+ languages automatically detected from client location and preferences.",
    color: "bg-emerald-600",
  },
  {
    icon: Lock,
    title: "Bank-Level Security",
    description:
      "SOC 2 Type II certified. Your invoice data is encrypted at rest and in transit. We never store payment credentials.",
    color: "bg-teal-600",
  },
  {
    icon: Zap,
    title: "2-Minute Setup",
    description:
      "Connect Stripe, PayPal, or upload CSV. AI auto-detects invoice patterns and starts working immediately.",
    color: "bg-amber-600",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Get Paid Faster
          </h2>
          <p className="text-lg text-gray-600">
            No more awkward follow-ups. No more forgotten invoices. Just
            intelligent automation that works 24/7.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg hover:border-emerald-200 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
