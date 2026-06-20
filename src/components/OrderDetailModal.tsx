import { useState } from "react";
import type { Order, OrderStatus } from "../types/order";
import { StatusBadge } from "./StatusBadge";
import { RiskScoreBadge } from "./RiskScoreBadge";
import { formatCurrency, formatDate } from "../lib/format";
import { useUpdateOrderStatus } from "../hooks/useUpdateOrderStatus";

interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
}

export function OrderDetailModal({ order, onClose }: OrderDetailModalProps) {
  const { updateStatus, updating, error } = useUpdateOrderStatus();
  // 直前にどちらのボタンを押したかを覚えておき、ボタンごとにローディング表示を分ける
  const [pendingAction, setPendingAction] = useState<OrderStatus | null>(null);

  async function handleUpdate(status: OrderStatus) {
    setPendingAction(status);
    try {
      await updateStatus(order.id, status);
      onClose();
    } catch {
      // エラー内容はuseUpdateOrderStatus側のerrorで表示する.
    } finally {
      setPendingAction(null);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              {order.orderNumber}
            </h2>
            <p className="text-sm text-slate-500">{order.customerName}</p>
          </div>
          <StatusBadge status={order.status} />
        </div>

        <dl className="space-y-2 text-sm mb-6">
          <div className="flex justify-between">
            <dt className="text-slate-500">メールアドレス</dt>
            <dd className="text-slate-800">{order.customerEmail}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">金額</dt>
            <dd className="text-slate-800">{formatCurrency(order.amount)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">決済方法</dt>
            <dd className="text-slate-800">{order.paymentMethod}</dd>
          </div>
          <div className="flex justify-between items-center">
            <dt className="text-slate-500">リスクスコア</dt>
            <dd>
              <RiskScoreBadge score={order.riskScore} />
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">注文日時</dt>
            <dd className="text-slate-800">{formatDate(order.createdAt)}</dd>
          </div>
        </dl>

        {error && (
          <p className="text-red-600 text-sm mb-3">{error}</p>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => handleUpdate("approved")}
            disabled={updating}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {pendingAction === "approved" ? "処理中..." : "承認"}
          </button>
          <button
            onClick={() => handleUpdate("rejected")}
            disabled={updating}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {pendingAction === "rejected" ? "処理中..." : "拒否"}
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-3 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          閉じる
        </button>
      </div>
    </div>
  );
}
