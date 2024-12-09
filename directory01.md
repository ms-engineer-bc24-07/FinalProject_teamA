### ディレクトリ構成
my-closet-app/
├── app.py
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── auth.py
│   │   │   ├── items.py
│   │   │   └── recommendations.py
│   │   ├── models/
│   │   │   ├── init.py
│   │   │   ├── clothes.py
│   │   │   ├── user.py
│   │   │   └── item_model.py
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── ai_recommender.py
│   │   │   ├── color_matcher.py
│   │   │   ├── image_service.py
│   │   │   └── google_vision_api.py
│   │   ├── static/
│   │   ├── temp/
│   │   ├── templates/
│   │   └── config.py
│   ├── tests/
|   |   └── ai_recommend_test.py
│   ├── utils/
│   │   └── db.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── public/
│   │   ├── images/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Wardrobe/
│   │   │   │  ├── ImageUpload.tsx
│   │   │   │  ├── Camera.tsx
│   │   │   │  ├── ItemForm.tsx
│   │   │   │  └── ItemList.tsx
|   |   |   ├── Home/
|   |   |   |   ├── Home1/
|   |   │   │   │   ├── MessageBox.tsx
|   |   │   │   │   └── Header.tsx
|   |   │   │   └── Home2/
|   |   │   │       ├── OutfitList.tsx
|   |   │   │       ├── Buttons.tsx
|   |   │   │       └── Header.tsx
│   │   │   └── Layout/
|   |   │   └── Common/
|   |   |       ├── Footer.tsx
|   |   |       └── Icon.tsx
│   │   ├── pages/
│   │   │   ├── api/
│   │   │   ├── index.tsx
│   │   │   └── wardrobe.tsx
│   │   ├── webcam/
│   │   │   ├── App.css
│   │   │   ├── App.test.tsx
│   │   │   ├── App.tsx
│   │   │   ├── index.css
│   │   │   ├── index.tsx
│   │   │   ├── logo.svg
│   │   │   ├── react-app-env.d.ts
│   │   │   ├── reportWebVitals.ts
│   │   │   └── setupTests.ts
│   │   ├── pictures/
│   │   ├── styles/
|   |   |   ├── Home1.module.css
|   |   |   ├── Home2.module.css
|   |   |   ├── Buttons.module.css
|   |   |   ├── Footer.module.css
|   |   |   ├── Header.module.css
|   |   |   └── globals.css
│   │   ├── utils/
│   │   └── services/
│   │       └── imageAnalyzer.js
│   ├── next.config.js
│   ├── package.json
│   └── Dockerfile
│
├── database/
│   ├── migrations/
│   ├── schema.sql
│   └── Dockerfile
│
├── infrastructure/
│   ├── docker-compose.yml
│   ├── aws/
│   └── scripts/
│       └── deploy.sh
│
├── .gitignore
├── README.md
└── LICENSE