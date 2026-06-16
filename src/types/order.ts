// 注文のステータス
// pending: 要確認, approved: 承認済み, rejected: 拒否
export type OrderStatus = "pending" | "approved" | "rejected";

export interface Order {
  id: string; // Firestoreのドキュメントid
  orderNumber: string; // 注文番号（表示用）
  customerName: string;
  customerEmail: string;
  amount: number; // 注文金額（円）
  riskScore: number; // 0〜100のリスクスコア
  status: OrderStatus;
  paymentMethod: string;
  createdAt: number; // unix timestamp(ms)
}
