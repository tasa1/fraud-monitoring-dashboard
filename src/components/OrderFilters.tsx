import type { OrderStatus } from "../types/order";

export type StatusFilter = OrderStatus | "all";

interface OrderFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (value: StatusFilter) => void;
}

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "pending", label: "要確認" },
  { value: "approved", label: "承認済み" },
  { value: "rejected", label: "拒否" },
];

export function OrderFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: OrderFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="顧客名または注文番号で検索"
        className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
      />
      <select
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value as StatusFilter)}
        className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
