import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Order } from "../types/order";

interface UseOrdersResult {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

/**
 * Firestoreの"orders"コレクションをリアルタイムに監視して取得するフック。
 * onSnapshotを使うため、他のクライアントがステータスを更新した場合も
 * 画面を再読み込みせずに自動で反映される。
 */
export function useOrders(): UseOrdersResult {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const result: Order[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            orderNumber: data.orderNumber,
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            amount: data.amount,
            riskScore: data.riskScore,
            status: data.status,
            paymentMethod: data.paymentMethod,
            createdAt: data.createdAt,
          };
        });
        setOrders(result);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    // クリーンアップ：コンポーネントが破棄されたら監視を解除
    return () => unsubscribe();
  }, []);

  return { orders, loading, error };
}
