```mermaid
flowchart LR
subgraph Frontend
UI[React Native (TypeScript)]
UI --> UIlib[UI Library<br/>(React Native Paper / NativeBase)]
end
subgraph Backend
API[NestJS (TypeScript)]
end
subgraph DB_Auth
DB[Supabase / PostgreSQL]
Auth[Supabase Auth<br/>(Email+Pass / OAuth Google & Apple)]
end
subgraph External
PA[Amazon PA-API v5]
BD[OpenBD API]
AI[OpenAI API]
end
subgraph CI_CD
GH[GitHub Actions]
Expo[Expo Publish]
Vercel[Vercel]
end
subgraph Testing
FE_T[Jest + RN Testing Library]
BE_T[Jest + Supertest]
end

    UI --> API
    API --> DB
    API --> Auth
    API --> PA
    API --> BD
    API --> AI
    GH --> Expo
    GH --> Vercel
    UI --> FE_T
    API --> BE_T
```
