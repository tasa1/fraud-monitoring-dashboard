import { useMemo, useState } from "react";
import { useOrders } from "./hooks/useOrders";
import { OrderTable } from "./components/OrderTable";
import { OrderFilters } from "./components/OrderFilters";
import type { StatusFilter } from "./components/OrderFilters";
import { OrderDetailModal } from "./components/OrderDetailModal";
import { filterOrders } from "./lib/filterOrders";
import type { Order } from "./types/order";

function App() {
  const { orders, loading, error } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  // 検索文字列・ステータスフィルタが変わった時だけ再計算する
  const filteredOrders = useMemo(
    () => filterOrders(orders, searchQuery, statusFilter),
    [orders, searchQuery, statusFilter]
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <h1 className="text-xl font-bold text-slate-800">
            Fraud Monitoring Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            注文の不正リスクを確認し、承認・拒否を判断する管理画面
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {loading && (
          <div className="space-y-3">
            <div className="h-10 bg-slate-200 rounded-lg animate-pulse w-full sm:w-2/3" />
            <div className="h-64 bg-slate-200 rounded-lg animate-pulse" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm font-medium">
              データの取得に失敗しました
            </p>
            <p className="text-red-600 text-xs mt-1">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <OrderFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
            />
            <p className="text-sm text-slate-500 mb-3">
              全{orders.length}件中 {filteredOrders.length}件を表示
            </p>
            <OrderTable orders={filteredOrders} onRowClick={setSelectedOrder} />
          </>
        )}

        {/* 行クリック時に詳細モーダルを表示。承認/拒否を押すとFirestoreが更新される */}
        {selectedOrder && (
          <OrderDetailModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
