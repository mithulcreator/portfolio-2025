# TailwindCSS Setup Checklist (Vite + React)

## 1. Install Tailwind and Dependencies
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 2. Configure `tailwind.config.js`
Make sure the `content` array includes all your source files:
```js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 3. Import Tailwind in Your CSS
In your main CSS file (e.g., `src/index.css` or `src/main.css`):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 4. Restart the Dev Server
After installing and configuring Tailwind, always restart your dev server:
```bash
npm run dev
```

## 5. Common Pitfalls & Solutions
- **No Tailwind styles?**
  - Check the `content` array in `tailwind.config.js`.
  - Make sure your CSS file with Tailwind imports is actually imported in your app (e.g., in `main.jsx`).
  - Restart the dev server after changes.
- **Custom classes not working?**
  - Make sure you use valid Tailwind class names.
  - Check for typos in class names.
- **File extensions or paths wrong?**
  - Only files matching the `content` glob will be scanned for classes.

## 6. Example File Imports
In `src/main.jsx`:
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // <-- Make sure this is imported
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## 7. Useful Links
- [TailwindCSS Docs](https://tailwindcss.com/docs/installation)
- [Vite + React + Tailwind Guide](https://tailwindcss.com/docs/guides/vite)

---

**Keep this checklist handy for every new project!** 