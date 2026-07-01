# Aravind Reddy M — Data Analyst Portfolio

A premium, clean, and minimalistic personal portfolio built using React, TailwindCSS, Recharts, and Framer Motion. 

Live preview includes analytical project catalogs, interactive charts, and technical competencies categorized by tools and methodologies.

---

## 🚀 Key Features

* **Minimalist Aesthetics:** Solid Slate/Zinc base palette with flat blue accents, structured grids, and crisp borders.
* **Interactive Data Visualisation:** Dynamic Recharts displays (Bar, Line, and Area charts) built into the project catalog drawer to showcase actual dataset metrics.
* **SVG Skill Icons:** Technical capabilities mapped to real SVG brand logos (Python, MySQL, Postgres, Git, Docker, Linux, etc.) alongside custom clean SVGs for Excel and Power BI.
* **Space Particle Canvas:** Subtle background animation using React Three Fiber, featuring white star points and a soft blue glow.
* **Responsive Layout:** Designed to scale fluidly from mobile to large screens without viewport overflow.
* **Robust DevTools Compatibility:** Built-in React DevTools global hook interceptor to prevent semver parsing errors.

---

## 🛠️ Tech Stack

* **Frontend:** React 19, TailwindCSS, Framer Motion
* **Visuals & Charts:** Recharts, React Three Fiber (R3F), Lucide Icons
* **Hosting Configuration:** `.npmrc` configuration included to bypass peer dependency warnings automatically.

---

## 💻 Getting Started

### 1. Install Dependencies
Ensure you have Node.js installed, then run the install command inside the `frontend` folder:
```bash
cd frontend && npm install
```

### 2. Start the Development Server
Run the start script to launch the app locally on [http://localhost:3000](http://localhost:3000):
```bash
npm start
```

### 3. Deploying to Vercel
Ensure you set the **Root Directory** setting to `frontend` inside your Vercel project configuration, or set the **Output Directory** to `frontend/build`.
