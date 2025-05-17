```mermaid
requirementDiagram
requirement R0 {
id: R0
text: "読書記録アプリ 要件定義"
}
requirement R1 {
id: R1
text: "認証・ログイン\n• Email+パスワード（パスワードリセット／メール認証）\n• SNSログイン（Google, Apple）"
}
requirement R2 {
id: R2
text: "本棚表示\n• 表紙サムネイル一覧表示"
}
requirement R3 {
id: R3
text: "目次ツリー管理\n• 最大5階層\n• トグルで開閉"
}
requirement R4 {
id: R4
text: "コメント機能\n• テキストのみ\n• 長押しでプレビュー表示"
}
requirement R5 {
id: R5
text: "本の登録\n• ISBN入力 or Web検索（OpenBD, Amazon PA-API）"
}
requirement R6 {
id: R6
text: "お気に入り登録\n• ★アイコン"
}
requirement R7 {
id: R7
text: "タグ／ジャンル管理\n• 多対多タグ付与\n• タグでフィルタリング"
}
requirement R8 {
id: R8
text: "非機能要件\n• パフォーマンス: 200冊対応\n• セキュリティ: JWT＋HTTPS\n• 運用監視: Sentry, Analytics"
}
R1 --> R0
R2 --> R0
R3 --> R0
R4 --> R0
R5 --> R0
R6 --> R0
R7 --> R0
R8 --> R0
```
