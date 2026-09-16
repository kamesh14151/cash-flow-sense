import type { StressState } from "../../lib/types";

interface Props {
  value: number;
  state: StressState;
  size?: number;
}

const STATE_COLORS: Record<StressState, string> = {
  Stable: "#3F7957",
  "Seasonal Dip": "#536B87",
  "Emerging Stress": "#B47720",
  "Structural Decline": "#B64C3D",
};

/** SVG arc gauge for the RSI score. Pure SVG — no third-party gauge library needed. */
export function RSIGauge({ value, state, size = 180 }: Props) {
  const R = size / 2 - 16;
  const cx = size / 2;
  const cy = size / 2 + 10;
  const startAngle = -210;
  const endAngle = 30;
  const totalArc = endAngle - startAngle; // 240°

  function polar(angleDeg: number, r: number) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  function arcPath(fromDeg: number, toDeg: number, r: number) {
    const s = polar(fromDeg, r);
    const e = polar(toDeg, r);
    const large = toDeg - fromDeg > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
  }

  const fillAngle = startAngle + (value / 100) * totalArc;
  const color = STATE_COLORS[state];

  // Zone markers
  const zones = [
    { from: startAngle, to: startAngle + totalArc * 0.3, color: "#3F7957" },
    { from: startAngle + totalArc * 0.3, to: startAngle + totalArc * 0.5, color: "#536B87" },
    { from: startAngle + totalArc * 0.5, to: startAngle + totalArc * 0.7, color: "#B47720" },
    { from: startAngle + totalArc * 0.7, to: endAngle, color: "#B64C3D" },
  ];

  const tickAngles = [startAngle, startAngle + totalArc * 0.3, startAngle + totalArc * 0.5, startAngle + totalArc * 0.7, endAngle];
  const tickLabels = ["0", "30", "50", "70", "100"];

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size * 0.75} viewBox={`0 0 ${size} ${size * 0.75}`}>
        {/* Background arc */}
        <path
          d={arcPath(startAngle, endAngle, R)}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={12}
          strokeLinecap="round"
        />

        {/* Zone arcs (thin, behind) */}
        {zones.map((z, i) => (
          <path
            key={i}
            d={arcPath(z.from, z.to, R)}
            fill="none"
            stroke={z.color}
            strokeWidth={4}
            strokeLinecap="butt"
            opacity={0.25}
          />
        ))}

        {/* Fill arc */}
        <path
          d={arcPath(startAngle, fillAngle, R)}
          fill="none"
          stroke={color}
          strokeWidth={12}
          strokeLinecap="round"
          style={{ transition: "all 0.6s ease" }}
        />

        {/* Tick marks */}
        {tickAngles.map((a, i) => {
          const outer = polar(a, R + 18);
          const inner = polar(a, R + 10);
          const label = polar(a, R + 26);
          return (
            <g key={i}>
              <line
                x1={inner.x} y1={inner.y}
                x2={outer.x} y2={outer.y}
                stroke="var(--color-muted-foreground)"
                strokeWidth={1}
                opacity={0.5}
              />
              <text
                x={label.x}
                y={label.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={8}
                fill="var(--color-muted-foreground)"
                opacity={0.7}
              >
                {tickLabels[i]}
              </text>
            </g>
          );
        })}

        {/* Center value */}
        <text
          x={cx}
          y={cy - 8}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={36}
          fontWeight={700}
          fill={color}
          fontFamily="Inter, system-ui, sans-serif"
        >
          {value}
        </text>
        <text
          x={cx}
          y={cy + 18}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={10}
          fill="var(--color-muted-foreground)"
          fontFamily="Inter, system-ui, sans-serif"
        >
          / 100
        </text>
      </svg>

      {/* State label */}
      <div className="text-center">
        <p className="text-[13px] font-semibold" style={{ color }}>
          {state}
        </p>
        <p className="text-[11px] text-muted-foreground mt-0.5">Repayment Stress Index</p>
      </div>
    </div>
  );
}
