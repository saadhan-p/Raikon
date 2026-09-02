const signals = [
  "IDEAS OVER SPECS",
  "BUILD WITH INTENT",
  "MOVE WITH CONFIDENCE",
  "TECH THAT EARNS ITS PLACE",
];

// Repeat enough times to cover a 4K screen at least twice over
const repeatedSignals = Array(10).fill(signals).flat();

export default function SignalStrip() {
  return (
    <div className="signal-strip" aria-label="Raikon principles">
      {/* Set a longer duration because the track is now much wider */}
      <div className="signal-track" style={{ animationDuration: '80s' }}>
        {repeatedSignals.map((signal, index) => (
          <span key={`${signal}-${index}`}>{signal}<b>✦</b></span>
        ))}
      </div>
    </div>
  );
}
