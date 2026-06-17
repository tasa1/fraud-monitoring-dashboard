import type { Order } from "../types/order";
import { StatusBadge } from "./StatusBadge";
import { RiskScoreBadge } from "./RiskScoreBadge";
import { formatCurrency, formatDate } from "../lib/format";

interface OrderTableProps {
  orders: Order[];
  onRowClick: (order: Order) => void;
}

export function OrderTable({ orders, onRowClick }: OrderTableProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        該当する注文が見つかりません。
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
              注文番号
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
              顧客名
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
              金額
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
              リスク
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
              ステータス
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
              注文日時
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-100">
          {orders.map((order) => (
            <tr
              key={order.id}
              onClick={() => onRowClick(order)}
              className="cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <td className="px-4 py-3 text-sm font-medium text-slate-800 whitespace-nowrap">
                {order.orderNumber}
              </td>
              <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">
                {order.customerName}
              </td>
              <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">
                {formatCurrency(order.amount)}
              </td>
              <td className="px-4 py-3 text-sm whitespace-nowrap">
                <RiskScoreBadge score={order.riskScore} />
              </td>
              <td className="px-4 py-3 text-sm whitespace-nowrap">
                <StatusBadge status={order.status} />
              </td>
              <td className="px-4 py-3 text-sm text-slate-500 whitespace-nowrap">
                {formatDate(order.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
