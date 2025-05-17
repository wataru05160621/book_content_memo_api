```mermaid
flowchart TB
Login[ログイン画面]
Bookshelf[本棚一覧画面]
BookReg[本登録画面]
TocTree[目次ツリー画面]
CommentDlg[コメント編集ダイアログ]
TagMgmt[タグ管理画面]
Settings[設定画面]

    Login --> Bookshelf
    Bookshelf --> BookReg
    Bookshelf --> TagMgmt
    Bookshelf --> Settings
    Bookshelf --> TocTree
    TocTree --> CommentDlg
    BookReg --> Bookshelf
```
