import type { Order, OrderStatus } from "../types/order";

const statuses: OrderStatus[] = ["pending", "approved", "rejected"];
const paymentMethods = ["クレジットカード", "コンビニ決済", "銀行振込", "QRコード決済"];
const names = [
  "佐藤 太郎", "鈴木 花子", "高橋 健一", "田中 美咲", "渡辺 翔太",
  "伊藤 さくら", "山本 大輔", "中村 陸", "小林 愛", "加藤 拓也",
  "吉田 結衣", "山田 直人", "佐々木 麻衣", "山口 健太", "松本 千尋",
  "井上 大樹", "木村 優子", "林 修平", "清水 美緒", "山崎 隼人",
  "森田 彩", "池田 翼", "橋本 沙織", "石川 雄太", "前田 萌",
];

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateDummyOrders(): Omit<Order, "id">[] {
  return names.map((name, i) => {
    const riskScore = randomBetween(0, 100);
    // リスクスコアが高いほどpending/rejectedになりやすいよう重み付け
    let status: OrderStatus;
    if (riskScore >= 70) {
      status = statuses[randomBetween(0, 1)] === "approved" ? "pending" : statuses[randomBetween(1, 2)];
    } else if (riskScore >= 40) {
      status = "pending";
    } else {
      status = "approved";
    }

    const daysAgo = randomBetween(0, 14);
    const createdAt = Date.now() - daysAgo * 24 * 60 * 60 * 1000;

    return {
      orderNumber: `ORD-${String(2026000 + i).padStart(7, "0")}`,
      customerName: name,
      customerEmail: `user${i + 1}@example.com`,
      amount: randomBetween(1000, 150000),
      riskScore,
      status,
      paymentMethod: paymentMethods[randomBetween(0, paymentMethods.length - 1)],
      createdAt,
    };
  });
}
