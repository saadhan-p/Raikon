const signals = [
  "IDEAS OVER SPECS",
  "BUILD WITH INTENT",
  "MOVE WITH CONFIDENCE",
  "TECH THAT EARNS ITS PLACE",
];

export default function SignalStrip() {
  return (
    <div className="signal-strip" aria-label="Raikon principles">
      <div className="signal-track">
        {[...signals, ...signals].map((signal, index) => (
          <span key={`${signal}-${index}`}>{signal}<b>✦</b></span>
        ))}
      </div>
    </div>
  );
}
