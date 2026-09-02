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

export default function Home() {
  return (
    <>
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
