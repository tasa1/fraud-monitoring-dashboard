<<<<<<< HEAD
import { useState } from "react";
import { useOrders } from "./hooks/useOrders";
import { OrderTable } from "./components/OrderTable";
import type { Order } from "./types/order";

function App() {
  const { orders, loading, error } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

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
          <p className="text-slate-500 text-sm">読み込み中...</p>
        )}

        {error && (
          <p className="text-red-600 text-sm">
            データの取得に失敗しました: {error}
          </p>
        )}

        {!loading && !error && (
          <>
            <p className="text-sm text-slate-500 mb-3">
              全{orders.length}件
            </p>
            <OrderTable orders={orders} onRowClick={setSelectedOrder} />
          </>
        )}

        {/* 詳細表示は仮実装。Day5でモーダル化して承認/拒否ボタンを追加する */}
        {selectedOrder && (
          <div className="mt-4 p-4 bg-white border border-slate-200 rounded-lg text-sm text-slate-600">
            選択中: {selectedOrder.orderNumber}（詳細モーダルはDay5で実装予定）
          </div>
        )}
      </main>
=======
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./lib/firebase";

function App() {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkConnection() {
      try {
        const snapshot = await getDocs(collection(db, "orders"));
        setCount(snapshot.size);
      } catch (e) {
        setError(e instanceof Error ? e.message : "unknown error");
      }
    }
    checkConnection();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Fraud Monitoring Dashboard
        </h1>
        <p className="text-slate-500">
          {error
            ? `接続エラー: ${error}`
            : count === null
            ? "Firestoreに接続中..."
            : `Firestore接続OK。orders件数: ${count}`}
        </p>
      </div>
>>>>>>> a22e7cf159bd6aa7384ed2ab3c9205f4fe542547
    </div>
  );
}

export default App;
