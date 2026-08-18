"use client";

import styles from "./Services.module.css";

interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  isShowstopper?: boolean;
}

const servicesData: ServiceItem[] = [
  {
    id: "web-dev",
    icon: "🚀",
    title: "WEB DEVELOPMENT",
    tagline: "The Showstopper",
    description: "Your website is the first thing people see. Make it amazing. We don't build websites that just look pretty. We build websites that turn visitors into paying customers.",
    features: [
      "Built to make people buy",
      "Works great on phones and computers",
      "Super fast loading (people leave slow websites)",
      "So easy to use it feels like magic"
    ],
    isShowstopper: true
  },
  {
    id: "software-dev",
    icon: "⚡",
    title: "SOFTWARE DEVELOPMENT",
    tagline: "Your Secret Weapon",
    description: "Custom software gives you a real advantage. Basic tools give basic results. We build exactly what YOUR business needs to win.",
    features: [
      "Built for how YOU work, not the other way around",
      "Grows with you as you get bigger",
      "Code that stays good as time goes on",
      "No messy or broken code left behind"
    ]
  },
  {
    id: "cloud-infra",
    icon: "☁️",
    title: "CLOUD INFRASTRUCTURE",
    tagline: "Rock-Solid Reliability",
    description: "Your systems should work smoothly, even when you grow fast. We set up cloud systems that grow with you. Automatically handles more traffic. Costs stay fair. Backups are automatic.",
    features: [
      "Works 99.99% of the time (we promise)",
      "Super fast everywhere in the world",
      "Costs are predictable, no surprise bills",
      "Easy switch from old systems"
    ]
  },
  {
    id: "cyber",
    icon: "🔒",
    title: "CYBERSECURITY",
    tagline: "Sleep Better at Night",
    description: "Hackers are everywhere. We keep them out. We don't just fix problems—we think like hackers to stop them before they start.",
    features: [
      "We test your system like a real hacker would",
      "Watch 24/7 for attacks and stop them fast",
      "Keep you safe from laws (GDPR, ISO, HIPAA)",
      "Train your team to spot bad actors"
    ]
  },
  {
    id: "support",
    icon: "🛠️",
    title: "SUPPORT & MAINTENANCE",
    tagline: "Always There When You Need Us",
    description: "Something breaks at 3 AM? We're already fixing it. No waiting. No confusing help. Just real people who get it.",
    features: [
      "We answer in 15 minutes or less (all day, every day)",
      "We fix problems before they break",
      "No long wait times or stuck tickets",
      "We teach you how everything works"
    ]
  },
  {
    id: "hosting",
    icon: "🌐",
    title: "HOSTING SOLUTIONS",
    tagline: "Fast & Reliable",
    description: "Your website's home needs to be rock-solid. Super fast. Built to last. Works when you need it.",
    features: [
      "Built just for you (not a template for everyone)",
      "Protected from hackers trying to attack (included free)",
      "Auto backups so you never lose data",
      "Fair prices, no hidden charges"
    ]
  },
  {
    id: "consulting",
    icon: "📊",
    title: "CONSULTING & STRATEGY",
    tagline: "Clear Answers to Tech Questions",
    description: "Confused about what tech you actually need? We help you figure it out. Technology should help your business, not be the problem. We make sure your tech matches your goals.",
    features: [
      "Plans for changing your tech setup",
      "Making your tools work better together",
      "Finding the right vendors and deals",
      "Ways to cut costs (we save clients 40% or more)"
    ]
  }
];

export default function Services() {
  return (
    <section id="services" className={`section ${styles.servicesSection}`}>
      <div className="glow-bg glow-emerald" style={{ top: "10%" }}></div>

      <div className="container">
        <div className="section-header">
          <span className="badge">SERVICES</span>
          <h2 className="section-title gradient-text">
            We Solve Digital Chaos. <br />Think of Us as Your Tech Fixers.
          </h2>
        </div>
        
        <p className={styles.introCopy}>
          Every business we work with had the same problem: Messy systems. Slow response times. 
          Security nightmares. Vendors who don't speak their language. <br />
          <strong>We don't just fix problems—we architect solutions that scale with your ambitions.</strong>
        </p>

        <div className={styles.grid}>
          {servicesData.map((service) => (
            <div 
              key={service.id} 
              className={`${styles.card} ${service.isShowstopper ? styles.cardShowstopper : ""}`}
            >
              <div className={styles.iconWrapper}>
                <span>{service.icon}</span>
              </div>
              <h3 className={styles.title}>{service.title}</h3>
              <div className={styles.tagline}>{service.tagline}</div>
              <p className={service.description}>{service.description}</p>
              
              <ul className={styles.featureList}>
                {service.features.map((feature, i) => (
                  <li key={i} className={styles.featureItem}>
                    <span className={styles.arrow}>→</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
