"use client";

import { ArrowRight, Play, TrendingUp, Clock, Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full text-emerald-700 text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              Trusted by 2,000+ freelancers
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Stop Chasing Payments.{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Start Getting Paid.
              </span>
            </h1>

            <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
              AI-powered invoice reminders that know exactly when and how to
              follow up. Reduce your Days Sales Outstanding by 40% — on
              autopilot.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 text-lg px-8 py-6"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 text-lg px-8 py-6 border-gray-200"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-500" />
                Setup in 2 minutes
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                No credit card required
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-3xl" />
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-2 text-xs text-gray-400 font-mono">
                  PayPrompt Dashboard
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">
                      Outstanding Invoices
                    </p>
                    <p className="text-2xl font-bold text-gray-900">$24,580</p>
                  </div>
                  <div className="px-3 py-1 bg-amber-500/10 text-amber-600 rounded-full text-sm font-medium">
                    12 overdue
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      client: "Acme Corp",
                      amount: "$5,200",
                      status: "overdue",
                      days: 7,
                    },
                    {
                      client: "TechStart Inc",
                      amount: "$3,800",
                      status: "due",
                      days: 2,
                    },
                    {
                      client: "Design Studio",
                      amount: "$2,100",
                      status: "paid",
                      days: 0,
                    },
                  ].map((inv, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            inv.status === "overdue"
                              ? "bg-red-500"
                              : inv.status === "due"
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                          }`}
                        />
                        <div>
                          <p className="font-medium text-sm">{inv.client}</p>
                          <p className="text-xs text-gray-500">
                            {inv.days === 0
                              ? "Paid today"
                              : `${inv.days} days ${inv.status}`}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold text-sm">
                        {inv.amount}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                  <p className="text-sm text-emerald-700">
                    <span className="font-semibold">AI Action:</span> Sending
                    polite reminder to Acme Corp in 2 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
