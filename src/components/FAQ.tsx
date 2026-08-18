"use client";

import { useState } from "react";
import styles from "./FAQ.module.css";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How do we split the money? Isn't that complicated?",
    answer: "Nope. It's simple.\n\nWe agree upfront on:\n→ What counts as money (recurring payments? one-time sales? both?)\n→ What percentage we get (usually 5-10%, you pick)\n→ How often we check (every month)\n→ When we get paid (30 days later)\n\nYou send us your numbers each month. We trust you. Honest? Most founders are super honest about this. (No one wants to cheat the person who helped build their company.)\n\nWe're not spying on you constantly. We just trust you and check the numbers."
  },
  {
    question: "What if I want to sell the company?",
    answer: "Good question. Here's how it works:\n\nIF SOMEONE BUYS YOUR COMPANY:\n→ We get one final payment\n→ How much? We figure it out based on what we'd make in future years or a percentage of what someone paid you (we negotiate)\n→ You sell. We both get paid. Done.\n\nIF YOU GO PUBLIC (IPO):\n→ The royalty deal ends (you're too big for this now)\n→ We get a final payment or we might stay as partners with a small piece (optional)\n\nIF YOU KILL THE PRODUCT OR CHANGE IT COMPLETELY:\n→ We talk honestly\n→ If it dies, our deal dies\n→ If you change it, we renegotiate\n\nBOTTOM LINE: We want you to win, no matter what. We won't make it hard or expensive for you to leave. That's real partnership."
  },
  {
    question: "What if the product flops and makes no money?",
    answer: "Then we both lose money. That's the risk. We're betting on you to succeed.\n\nBUT—this is exactly why we work so hard to help you:\n→ We test ideas with real customers first (not just build)\n→ We change things based on what the data shows us\n→ We help you change direction if we have to\n→ We stay with you and figure it out together\n\nIf something's not working, we solve it. We don't run away and pretend we weren't involved. Real talk? Partnership makes us better partners. Better partners = more successful products. So you should actually fail LESS with us, not more."
  },
  {
    question: "Can I see examples of partnerships you've done?",
    answer: "Absolutely. During our first call, we'll share:\n→ Case studies of companies using this model\n→ Redacted financials (where permissible)\n→ Founder testimonials about the experience\n→ Details about how it actually worked\n\nYou want proof this isn't a scam. Fair. We got burned once too. That's why we structure it this way."
  },
  {
    question: "What if we disagree on strategy?",
    answer: "Then we have a conversation.\n\nWe bring our perspective (based on 100+ projects). You bring yours (based on knowing your customer). We hash it out.\n\nSometimes you're right. Sometimes we're right. Sometimes it's both. Decision-making happens together because we're in it together. That's actually a feature, not a bug. It keeps us from building the wrong thing."
  },
  {
    question: "Can we do partial royalty? Like 3% instead of 7%?",
    answer: "Sure. Let's negotiate.\n\nLower royalty = higher upfront cost (makes sense).\n\nWe might do:\n→ $70k + 3% royalty (lower risk share, more cash from you)\n→ $40k + 8% royalty (higher risk share, lower cash from you)\n→ $55k + 5% royalty (middle ground)\n\nWe figure out what works for both of us. Every deal is custom."
  },
  {
    question: "What if you get hit by a bus?",
    answer: "We've built culture for this:\n→ No single-person dependencies\n→ All code is documented\n→ All knowledge is shared\n→ Another team member can take over immediately\n\nWe have contingency plans because we're a real company. You're not betting on one person. You're betting on a team.\n\nPlus—if something happens to us, we work with you to transition to another dev team smoothly (even though that costs us our royalty share)."
  },
  {
    question: "Who owns what?",
    answer: "YOU OWN EVERYTHING.\n\n→ The code is yours\n→ The product is yours\n→ Your data is yours\n→ Your customers are yours\n\nWe don't lock you in or hold anything hostage. We don't take ownership or a piece of your company. We just get paid a percentage when you make money. That's the whole deal. (This is why it actually works—you stay in charge.)"
  },
  {
    question: "What's the typical timeline for royalty payments to be worth it for you?",
    answer: "Usually 3-5 years.\n\nThat's why we pick partners carefully. We're betting on you to grow.\n\nIf you grow fast: We make money fast.\nIf you grow slow: We make money slow.\nIf you don't grow: Neither of us benefit.\n\nThis is literally the most aligned incentive structure possible. We don't benefit from dragging things out. We benefit from you succeeding, period."
  },
  {
    question: "Can I switch from Partnership to Traditional (or vice versa) later?",
    answer: "Conversation required, but usually yes.\n\nPARTNERSHIP → TRADITIONAL:\n'We're established now. We want to own everything outright.'\n→ We negotiate a buyout of future royalties. You pay a lump sum, royalty ends.\n\nTRADITIONAL → PARTNERSHIP:\n'We want you to stay invested in our growth.'\n→ We renegotiate the terms. You get some upside for Phase 2.\n\nBOTH OPTIONS WORK. We're flexible because the partnership is real."
  },
  {
    question: "What if you want out?",
    answer: "Then we talk.\n\nIf the partnership isn't working, we're honest about it.\n\n→ You're not delivering, metrics are stuck? We say so.\n→ The product isn't scalable? We tell you.\n→ You're making decisions that scare us? We discuss it.\n\nEither we fix it together, or we part ways professionally. No drama. No surprise abandonment. If it's not working, we figure out a transition plan. That's what partners do."
  },
  {
    question: "Is this really better than just hiring full-time devs?",
    answer: "Different, not better. Different situations:\n\nHIRE FULL-TIME IF:\n→ You have capital to pay salaries ($80k-120k/year + benefits)\n→ You want full-time dev cycles on your product\n→ You need someone in-office (or full-time remote)\n→ Long-term team building is the goal\n\nPARTNER WITH US IF:\n→ Capital is tight early (startup survival mode)\n→ You want strategic help, not just code\n→ You want experienced insight from day one\n→ You want someone invested in success, not just a paycheck\n\nIDEAL: Do both. Partner with us for the core product, hire a junior full-time dev as you scale. By year 3, you have both + we're still invested partners. The models complement each other."
  },
  {
    question: "What makes us different from other 'partnership' agencies?",
    answer: "We actually follow through.\n\nMost agencies SAY they're partners but:\n→ Disappear after launch\n→ Charge double for post-launch changes\n→ Blame you when it's slow\n→ Move on to the next client\n\nWe LITERALLY can't do that. We don't get paid unless you succeed. That's the difference. It's not philosophy. It's economics. We're aligned with you. Period."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section id="faq" className={`section ${styles.faqSection}`}>
      <div className="glow-bg glow-purple" style={{ bottom: "10%", left: "40%" }}></div>

      <div className="container">
        <div className="section-header">
          <span className="badge">FAQ</span>
          <h2 className="section-title gradient-text">
            Partnership & Collaboration <br />Frequently Asked Questions
          </h2>
        </div>

        <div className={styles.faqList}>
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className={`${styles.faqItem} ${activeIndex === index ? styles.faqItemActive : ""}`}
            >
              <button 
                className={styles.questionButton} 
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeIndex === index}
              >
                <span>{faq.question}</span>
                <span className={styles.arrowIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </span>
              </button>
              
              <div className={styles.answerWrapper}>
                <div className={styles.answerContent}>
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
