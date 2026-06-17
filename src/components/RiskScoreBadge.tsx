interface RiskScoreBadgeProps {
  score: number;
}

function getRiskLevel(score: number): { className: string } {
  if (score >= 70) {
    return { className: "bg-red-50 text-red-700 ring-red-600/20" };
  }
  if (score >= 40) {
    return { className: "bg-amber-50 text-amber-700 ring-amber-600/20" };
  }
  return { className: "bg-slate-50 text-slate-600 ring-slate-500/20" };
}

export function RiskScoreBadge({ score }: RiskScoreBadgeProps) {
  const { className } = getRiskLevel(score);
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ring-inset ${className}`}
    >
      {score}
    </span>
  );
}
