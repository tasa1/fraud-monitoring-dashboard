import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { OrderStatus } from "../types/order";

interface UseUpdateOrderStatusResult {
  updateStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  updating: boolean;
  error: string | null;
}

/**
 * 注文1件のステータスをFirestore上で更新するフック。
 * 一覧側はonSnapshotで監視しているため、更新が成功すれば
 * 一覧の表示も自動的に反映される。
 */
export function useUpdateOrderStatus(): UseUpdateOrderStatusResult {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function updateStatus(orderId: string, status: OrderStatus) {
    setUpdating(true);
    setError(null);
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status });
    } catch (e) {
      setError(e instanceof Error ? e.message : "更新に失敗しました");
      throw e;
    } finally {
      setUpdating(false);
    }
  }

  return { updateStatus, updating, error };
}
