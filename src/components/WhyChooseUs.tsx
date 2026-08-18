"use client";

import styles from "./WhyChooseUs.module.css";

interface WhyItem {
  icon: string;
  title: string;
  desc: string;
  isHighlighted?: boolean;
}

const whyData: WhyItem[] = [
  {
    icon: "📈",
    title: "Experience Counts",
    desc: "Our team has built solutions for everyone from scrappy startups to Fortune 500 companies. We know what works. We know what fails. We've made every mistake so you don't have to."
  },
  {
    icon: "🤝",
    title: "We Actually Care",
    desc: "Your success is our bonus check. (We align with fixed-price, performance-based models.) No 'more hours billed = more profit' trap. When you win, we win. When you suffer, we feel it.",
    isHighlighted: true
  },
  {
    icon: "💎",
    title: "Transparency Is Oxygen",
    desc: "No surprise invoices. No secret meetings. No vendor lock-in clauses hiding in the fine print. Your code is yours. Your data is yours. We'll help you leave if you want to. (You won't.)"
  },
  {
    icon: "⚡",
    title: "Speed Without Sacrifice",
    desc: "Fast doesn't mean sloppy. We move quick because we know what we're doing. Tested. Documented. Production-ready. Delivered when we said we would."
  },
  {
    icon: "🛠️",
    title: "The Tech Doesn't Matter (Except It Does)",
    desc: "We pick the right tool for your problem, not the trendy tool we learned last month. React? Django? Node? AWS? GCP? We know them all. We'll pick what serves YOU best."
  }
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className={`section ${styles.whySection}`}>
      <div className="glow-bg glow-purple" style={{ bottom: "10%", right: "5%" }}></div>

      <div className="container">
        <div className="section-header">
          <span className="badge">WHY CHOOSE US</span>
          <h2 className="section-title gradient-text">
            We're Not Like The Others <br />(And We Can Prove It)
          </h2>
        </div>

        <div className={styles.grid}>
          {whyData.map((item, index) => (
            <div 
              key={index} 
              className={`${styles.card} ${item.isHighlighted ? styles.cardHighlight : ""}`}
            >
              <div className={styles.icon}>{item.icon}</div>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.desc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
