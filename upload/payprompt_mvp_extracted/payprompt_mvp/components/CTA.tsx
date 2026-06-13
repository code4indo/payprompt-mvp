"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Ready to Stop Chasing Payments?
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Join 2,000+ freelancers who get paid faster with AI. Start free — no credit card required.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard" className="btn-primary flex items-center justify-center gap-2 text-lg px-8 py-4">
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          14-day free trial. Cancel anytime. No credit card required.
        </p>
      </div>
    </section>
  );
}
