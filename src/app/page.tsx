import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowWeWork from "@/components/HowWeWork";
import WhyChooseUs from "@/components/WhyChooseUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MotionLayer from "@/components/MotionLayer";
import SignalStrip from "@/components/SignalStrip";
import VideoReveal from "@/components/VideoReveal";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Lil Gaints",
  url: "https://lillgiants.com",
  logo: "https://lillgiants.com/favicon.ico",
  description: "Lil Gaints builds bespoke websites, digital products, and growth-focused technology for ambitious businesses.",
  sameAs: ["https://www.linkedin.com/company/lil-gaints"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mysuru",
    addressCountry: "IN",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <MotionLayer />
      <Navbar />
      <main>
        <Hero />
        <SignalStrip />
        <Services />
        <HowWeWork />
        <WhyChooseUs />
        <Contact />
        <VideoReveal />
      </main>
      <Footer />
    </>
  );
}
