"use client";

import styles from "./About.module.css";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

const teamData: TeamMember[] = [
  {
    name: "Alex Rivera",
    role: "Founder & System Architect",
    bio: "Broke and fixed financial APIs for 8 years. Realized speed is useless without security. Coder, barista, and professional skeptic of 'overnight solutions'."
  },
  {
    name: "Marcus Vance",
    role: "Lead Systems Engineer",
    bio: "Ex-enterprise DevOps lead who grew tired of meetings that could have been commits. Writes Rust, manages clouds, and lives in dark mode."
  },
  {
    name: "Sarah Chen",
    role: "UX & Frontend Engineer",
    bio: "Believes performance is the ultimate UX. If a page load takes longer than 800ms, she considers it a failure. Obsessed with micro-interactions."
  },
  {
    name: "Darnell King",
    role: "Security Analyst",
    bio: "Former white-hat pentester who thinks like a hacker to protect your data. Monitors networks at 3 AM so clients don't have to."
  }
];

export default function About() {
  return (
    <section id="about" className={`section ${styles.aboutSection}`}>
      <div className="glow-bg glow-purple" style={{ top: "10%", left: "40%" }}></div>

      <div className="container">
        <div className="section-header">
          <span className="badge">ABOUT US</span>
          <h2 className="section-title gradient-text">
            The Team That Refuses <br />to Take Shortcuts
          </h2>
        </div>

        <div className={styles.aboutGrid}>
          {/* Founder Story Column */}
          <div className={styles.storyCol}>
            <h3>We started this because we were tired.</h3>
            
            <p className={styles.storyParagraph}>
              Tired of seeing brilliant ideas get destroyed by mediocre execution.
            </p>
            
            <p className={styles.storyParagraph}>
              Tired of vendors who disappear after launch, leaving codebases held together by duct tape.
            </p>
            
            <p className={styles.storyParagraph}>
              Tired of hearing "that's not possible" when we knew it was—just requiring extra care and focus.
            </p>
            
            <p className={styles.storyParagraph}>
              So we built a team of people who actually give a damn. Engineers who code like they are building their own product, leaders who remember what it's like to be bootstrapped, and supporters who stay long after the contract ends.
            </p>
            
            <p className={styles.storyParagraph} style={{ fontWeight: "700", color: "var(--text-primary)" }}>
              We don't win awards. We win trust. And we keep it.
            </p>
          </div>

          {/* Team Column */}
          <div className={styles.teamCol}>
            <p className={styles.teamIntro}>
              <strong>Not your typical agency. No suits. No BS.</strong> <br />
              Just people who built real things, failed spectacularly, learned hard, and came back smarter.
            </p>
            
            <div className={styles.teamGrid}>
              {teamData.map((member, index) => (
                <div key={index} className={styles.memberCard}>
                  <h4 className={styles.memberName}>{member.name}</h4>
                  <div className={styles.memberRole}>{member.role}</div>
                  <p className={member.bio}>{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
