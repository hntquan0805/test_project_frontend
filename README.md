# Frontend Project

> A user interface built with React + TypeScript + Vite.

---

## Technology Requirements

| Technology | Recommended Version |
|-----------|----------------------|
| [Node.js](https://nodejs.org/) | >= 18.x |
| [npm](https://www.npmjs.com/) / [yarn](https://yarnpkg.com/) | npm >= 9.x |
| [React](https://react.dev/) | ^18.x |
| [TypeScript](https://www.typescriptlang.org/) | ^5.x |
| [Vite](https://vitejs.dev/) | ^6.x |

---

## Installation & Setup

### 1. Clone repository

```bash
git clone https://github.com/hntquan0805/test_project_frontend.git
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file at the root based on the `.env.example` template:

```bash
cp .env.example .env
```

Update the values in `.env` as needed.

### 4. Run development server

```bash
npm run dev
```

The app will be running at: [http://localhost:5173](http://localhost:5173)

### 5. Build for production

```bash
npm run build
```

---

## Project Structure

```
src/
├── assets/        # Images, fonts, static files
├── components/    # Reusable components
├── layouts/       # Layout components
├── pages/         # Application pages
├── services/      # API calls
├── store/         # State management
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
├── App.tsx
├── index.css
└── main.tsx
```

---

## Contributors

| Name | Contact |
|------|---------|
| Ho Ngoc Trung Quan | hntquan0805@gmail.com |

---

> Last updated: March 2026