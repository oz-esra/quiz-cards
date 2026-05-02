# 🧠 EduFlash — Akıllı Flashcard Quiz WEB Uygulaması

> Gerçek zamanlı API entegrasyonu ile interaktif quiz deneyimi

![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-4-646cff?style=flat-square&logo=vite)
![API](https://img.shields.io/badge/Open%20Trivia%20DB-API-00b09b?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 🎯 Proje Hakkında

EduFlash, [Open Trivia Database](https://opentdb.com/) API'sini kullanan interaktif bir quiz uygulamasıdır. 23+ kategoride, 3 farklı zorluk seviyesinde binlerce soruya erişim sağlar.

## ✨ Özellikler

- **🌐 Gerçek Zamanlı API** — Open Trivia DB REST API entegrasyonu
- **📂 23+ Kategori** — Bilim, Tarih, Spor, Teknoloji ve daha fazlası
- **🎯 3 Zorluk Seviyesi** — Kolay, Orta, Zor
- **📊 Anlık Skorlama** — Cevap bazlı anlık geri bildirim
- **📋 Detaylı Sonuç** — Quiz sonunda tüm cevapların özeti
- **📱 Responsive Tasarım** — Mobil ve masaüstü uyumlu
- **⚡ Sıfır API Key** — Kayıt gerektirmez

## 🛠 Teknolojiler

| Teknoloji | Kullanım Amacı |
|-----------|---------------|
| React 18 | UI Component yapısı |
| Vite | Build tool & geliştirme sunucusu |
| Custom Hooks | API state yönetimi (`useTriviaAPI`) |
| CSS Variables | Tema yönetimi |
| Open Trivia DB API | Soru veritabanı |

## 🚀 Kurulum

```bash
# Repoyu klonla
git clone https://github.com/KULLANICI_ADIN/eduflash.git
cd eduflash

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Uygulama `http://localhost:5173` adresinde çalışacak.

## 📁 Proje Yapısı

```
eduflash/
├── src/
│   ├── components/
│   │   ├── CategorySelector.jsx   # Quiz ayar ekranı
│   │   ├── FlashCard.jsx          # Soru & şık kartı
│   │   ├── ScoreBoard.jsx         # Sonuç ekranı
│   │   └── ProgressBar.jsx        # İlerleme göstergesi
│   ├── hooks/
│   │   └── useTriviaAPI.js        # API call custom hook
│   ├── App.jsx                    # Ana uygulama & state yönetimi
│   ├── main.jsx                   # React root
│   └── index.css                  # Global stiller & CSS değişkenleri
├── index.html
├── vite.config.js
└── package.json
```

## 📡 API Kullanımı

```javascript
// Kategori listesi
GET https://opentdb.com/api_category.php

// Sorular
GET https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple
```

## 📸 Ekran Görüntüleri

| Setup | Quiz | Sonuç |
|-------|------|-------|
| Kategori & zorluk seçimi | Animasyonlu soru kartları | Detaylı cevap özeti |

## 🤝 Katkıda Bulunma

Pull request'ler memnuniyetle karşılanır! Büyük değişiklikler için önce bir issue açın.


