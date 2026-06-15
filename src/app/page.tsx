import Navbar from "@/components/payprompt/Navbar";
import Hero from "@/components/payprompt/Hero";
import Features from "@/components/payprompt/Features";
import HowItWorks from "@/components/payprompt/HowItWorks";
import Stats from "@/components/payprompt/Stats";
import Testimonials from "@/components/payprompt/Testimonials";
import Pricing from "@/components/payprompt/Pricing";
import CTA from "@/components/payprompt/CTA";
import Footer from "@/components/payprompt/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
