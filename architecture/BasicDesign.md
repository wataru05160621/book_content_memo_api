```mermaid
erDiagram
USERS {
UUID id PK
TEXT email
TEXT password_hash
BOOL is_verified
TIMESTAMP created_at
}
BOOKS {
UUID id PK
UUID user_id FK
TEXT isbn
TEXT title
TEXT cover_url
BOOL favorite
TIMESTAMP created_at
}
TOC_ITEMS {
UUID id PK
UUID book_id FK
UUID parent_id FK NULL
TEXT title
INT sort_order
}
COMMENTS {
UUID id PK
UUID toc_item_id FK
UUID user_id FK
TEXT content
TIMESTAMP created_at
}
TAGS {
UUID id PK
UUID user_id FK
TEXT name
}
BOOK_TAGS {
UUID book_id FK
UUID tag_id FK
PK(book_id, tag_id)
}

    USERS ||--o{ BOOKS : owns
    BOOKS ||--o{ TOC_ITEMS : has
    TOC_ITEMS ||--o{ COMMENTS : has
    USERS ||--o{ COMMENTS : writes
    USERS ||--o{ TAGS : creates
    BOOKS }o--o{ TAGS : "tagged with"
```
