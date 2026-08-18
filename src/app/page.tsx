import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Collaboration from "@/components/Collaboration";
import HowWeWork from "@/components/HowWeWork";
import WhyChooseUs from "@/components/WhyChooseUs";
import RoyaltyModel from "@/components/RoyaltyModel";
import CaseStudies from "@/components/CaseStudies";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Collaboration />
        <HowWeWork />
        <WhyChooseUs />
        <RoyaltyModel />
        <CaseStudies />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
