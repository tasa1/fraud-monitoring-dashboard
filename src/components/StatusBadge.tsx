import type { OrderStatus } from "../types/order";

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending: {
    label: "要確認",
    className: "bg-amber-100 text-amber-800 ring-amber-600/20",
  },
  approved: {
    label: "承認済み",
    className: "bg-emerald-100 text-emerald-800 ring-emerald-600/20",
  },
  rejected: {
    label: "拒否",
    className: "bg-red-100 text-red-800 ring-red-600/20",
  },
};

interface StatusBadgeProps {
  status: OrderStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${config.className}`}
    >
      {config.label}
    </span>
  );
}
