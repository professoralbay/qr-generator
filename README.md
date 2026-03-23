# QR Code Generator

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

> A clean QR code generator supporting 6 content types with custom colors, sizes and PNG download.

---

## 🔴 Live Demo

**[👉 View Live Demo](https://professoralbay.github.io/qr-generator)**

---

## 🎬 Demo

![Demo](https://github.com/professoralbay/qr-generator/blob/main/Animation%20(1).gif)

---

## ✨ Features

- 🔗 **6 types** — URL, Text, Email, Phone, WiFi, vCard
- 🎨 **Custom colors** — foreground & background
- 📐 **4 sizes** — 200px to 500px
- ⬇️ **Download PNG**
- ⎘ **Copy to clipboard**
- ⚡ **Live preview** — generates as you type

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Structure |
| CSS3 | Minimal design |
| JavaScript | QR logic, download, clipboard |
| api.qrserver.com | QR generation (free) |
| Canvas API | PNG export |

---

## 📁 Project Structure

```
qr-generator/
├── index.html
├── screenshot.gif
└── README.md
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/professoralbay/qr-generator.git
open index.html
```

---

## 🧩 Challenges & How I Solved Them

**1. 6 QR string formats**
Each type has its own spec. `buildContent()` builds the correct string per type.

**2. Debounce**
300ms debounce prevents excess API calls while typing.

**3. PNG download**
Remote image drawn to hidden `<canvas>` → `toDataURL()` → download link.

---

## 📄 License

MIT

*Made by [Akın Üner](https://github.com/professoralbay)*
