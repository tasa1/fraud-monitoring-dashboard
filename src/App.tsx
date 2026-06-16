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
    </div>
  );
}

export default App;
