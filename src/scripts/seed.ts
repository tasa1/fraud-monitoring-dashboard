/**
 * Firestoreにダミーの注文データを投入するスクリプト。
 * 実行前に .env にFirebaseの設定値を入れておくこと。
 *
 * 実行方法:
 *   npx tsx src/scripts/seed.ts
 */
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import * as dotenv from "dotenv";
import { generateDummyOrders } from "../lib/dummyData";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

async function seed() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const orders = generateDummyOrders();

  console.log(`Seeding ${orders.length} orders...`);

  for (const order of orders) {
    await addDoc(collection(db, "orders"), order);
    console.log(`  added: ${order.orderNumber}`);
  }

  console.log("Done.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
