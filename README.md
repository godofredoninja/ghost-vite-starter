# Ghost Vite Starter 🚀

_A fast and modern starter theme for Ghost CMS, powered by Vite._

Ghost Vite Starter is a **lightweight, fast, and modern** starter theme for **Ghost CMS**, built with **Vite** for optimized development and performance.

## ⚡ Features

- 🚀 **Lightning-fast development** with Vite
- 🎨 **Tailwind CSS** for modern styling
- ⚙️ **Optimized build process** for production-ready themes
- 🔄 **Live reload** for instant previews
- 🛂 **Efficient dependency management** with pnpm
- 📁 **Organized folder structure** for easy customization
- 🛠 **ESLint & Prettier** for clean and maintainable code

---

## 👥 Installation

Make sure you have **pnpm** installed globally:

```sh
npm install -g pnpm
```

Then, clone the repository and install dependencies:

```sh
git clone https://github.com/godofredoninja/ghost-vite-starter.git
cd ghost-vite-starter
pnpm install
```

---

## 🚀 Development

1️⃣ Start your local **Ghost instance**:

```sh
ghost start
```

2️⃣ Run **Vite** for hot reloading and instant preview:

```sh
pnpm run dev
```

3️⃣ Open your browser and go to:

```
http://localhost:2368
```

Now, every change in `.hbs`, `.js`, or `.css` files will reflect instantly in your Ghost theme! 🎉

---

## 🛂 Build for Production

To generate the final optimized theme, run:

```sh
pnpm run build
```

This will create a `.zip` file inside `dist/` ready to upload to **Ghost**.

---

## 📁 Folder Structure

```
ghost-vite-starter/
│── assets/        # Static assets (images, fonts, etc.)
│── src/           # Source files
│   ├── css/       # Styles (Tailwind/PostCSS)
│   ├── js/        # JavaScript files
│   ├── templates/ # Handlebars templates
│── dist/          # Built theme (for production)
│── package.json   # Project metadata & dependencies
│── vite.config.ts # Vite configuration
└── README.md      # Documentation
```

---

## 🛠 Tech Stack

- **Ghost CMS** – The best open-source publishing platform
- **Vite** – Ultra-fast frontend tooling
- **Tailwind CSS** – Utility-first CSS framework
- **PostCSS** – For CSS transformations
- **TypeScript** – Safer JavaScript
- **ESLint & Prettier** – Code quality & formatting

---

## 🖍 License

This project is licensed under the **MIT License**.
Feel free to use, modify, and contribute!

---

## 👤 Contributing

Want to improve **Ghost Vite Starter**?
Fork the repo, make your changes, and open a **pull request**! 🚀

```sh
git clone https://github.com/godofredoninja/ghost-vite-starter.git

cd ghost-vite-starter

pnpm install
```

---

## 📢 Support

If you like this project, please ⭐ **star** this repo on GitHub!
For issues or suggestions, [open an issue](https://github.com/godofredoninja/ghost-vite-starter/issues).

---

🔗 **Official Ghost Documentation:** [Ghost.org](https://ghost.org/docs/)
🔗 **Vite Documentation:** [ViteJS.dev](https://vitejs.dev/)

---

Made with ❤️ by [GodoFredo](https://godofredo.ninja).
