# Madam Fav - Ambient Music Player

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">

A beautiful, ambient music player featuring Taylor Swift's most iconic tracks with a modern glassmorphism UI design. Built to run seamlessly in the background without standard media player clutter.

## 🚀 Live Demos

- **Primary Deployment (Vercel):** https://music-stream-six.vercel.app
- **Secondary Deployment (GitHub Pages):** https://spidey2050.github.io/Music-Stream

## ✨ Features

- 🎵 **Invisible Audio Engine:** YouTube-powered playlist bypassing standard embedding limits.
- ⏱️ **Live Clock:** Real-time localized AM/PM display.
- 🎨 **Glassmorphism UI:** Modern frosted-glass aesthetic (`backdrop-filter`) that complements the background art.
- ▶️ **Custom Controls:** Fully functional Play/Pause, Next, and Previous functions.
- 📊 **Dynamic Progress Bar:** Real-time tracking of song duration.
- 📱 **Responsive Design:** Asymmetrical layout that highlights background artwork and scales gracefully.
- 🌐 **Social Links:** Quick access to Spotify and YouTube.

## 🛠️ Technologies Used

- **HTML5:** Semantic structure.
- **CSS3:** Custom variables, flexbox, CSS cloaking techniques.
- **Vanilla JavaScript:** State management, DOM manipulation, clock logic.
- **YouTube IFrame API:** Background audio playback integration.
- **Google Fonts:** Playfair Display for editorial typography.

## ⚙️ Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Spidey2050/Music-Stream.git
   ```
2. Open the project folder in VS Code.
3. Start a local server (for example, Live Server) to bypass CORS restrictions.
4. Enjoy the music.

## 📂 Project Structure

```plaintext
├── index.html      # Main HTML file with UI structure
├── script.js       # JavaScript for player engine and logic
├── style.css       # Styling, animations, and security cloaking
└── Madam.jpeg      # Dynamic background artwork
```

## 🎨 Customization

- **Edit Playlist:** Modify the `playlist` array inside `script.js` with new 11-character YouTube IDs.
- **Update Social Links:** Replace the placeholder `href` URLs in `index.html`.
- **Change Background:** Replace `Madam.jpeg` with your own image, or update the file path in `style.css`.
- **Adjust Colors:** Modify the CSS variables inside the `:root` selector in `style.css`.

## 📜 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created by [Sayan Bhowmik (Spidey2050)](https://github.com/Spidey2050)
