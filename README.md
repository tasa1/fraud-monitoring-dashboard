# Fraud Monitoring Dashboard

不正注文のリスクを確認して、承認・拒否を管理するWebアプリです。

## デモ

https://fraud-monitoring-dashboard.vercel.app/

## 使った技術

- React / TypeScript
- Firebase（Firestore）
- Tailwind CSS
- Vite
- Vercel（デプロイ）

## 機能

- 注文一覧の表示
- 顧客名・注文番号での検索
- ステータスでの絞り込み（要確認・承認済み・拒否）
- 注文詳細の表示
- 承認・拒否ボタンでステータスを更新

## 工夫した点

データの取得にカスタムフック（useOrders）を使い、App.tsxにロジックを書きすぎないようにしました。また検索とフィルタの絞り込み処理はuseMemoを使って、毎回再計算されないようにしました。

## 苦労した点

`.env`ファイルの値の貼り方を間違えていて、Firestoreに接続できないエラーが出続けました。`.env`ファイルをGitにコミットしないよう`.gitignore`に追加する必要があることも、このとき初めて理解しました。

## 起動方法

```bash
# インストール
npm install

# .env.exampleをコピーしてFirebaseの設定値を入力
cp .env.example .env

# ダミーデータの投入
npm run seed

# 開発サーバーの起動
npm run dev
```

## 今後やりたいこと

- ログイン機能（Firebase Authentication）
- 承認・拒否した履歴の記録
- リスクスコアが高い順でのソート
