export const simpleConfig = (isDarkMode) => ({
    background: {
      color: {
        value: "transparent", // Latar belakang tetap transparan
      },
    },
    particles: {
      number: {
        value: 120, // Jumlah teks koding
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: isDarkMode ? "#FF5722" : "#4CAF50", // Tetap konsisten dengan warna teks koding di mode dark dan light
      },
      shape: {
        type: "char", // Partikel berbentuk karakter
        character: {
          value: [
            "int", "if", "else", "return", "for", "while", "console.log", "main", ";", 
            "class", "const", "let", "function", "=>", "void", "null", "true", "false",
            "import", "export", "new", "delete", "try", "catch", "finally", "throw",
            "{", "}", "(", ")", "[", "]", "=", "==", "===", "+", "-", "*", "/", "%"
          ], // Daftar kata-kata koding lebih lengkap
          font: "monospace", // Font yang konsisten
        },
      },
      opacity: {
        value: { min: 0.3, max: 0.8 }, // Transparansi bervariasi
        random: true,
      },
      size: {
        value: { min: 7, max: 10 }, // Ukuran karakter bervariasi
        random: true,
      },
      move: {
        enable: true,
        speed: 1, // Gerakan lambat untuk efek natural
        direction: "none", // Gerakan acak
        outModes: {
          default: "out", // Partikel keluar layar
        },
        random: true,
        straight: false,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true, // Hover aktif
          mode: ["grab", "attract"], // Kombinasi grab dan attract
        },
        onClick: {
          enable: true, // Klik aktif
          mode: "push", // Tambah partikel baru saat klik
        },
      },
      modes: {
        grab: {
          distance: 150, // Jarak garis saat hover
          links: {
            color: isDarkMode ? "#FF5722" : "#4CAF50", // Warna garis sesuai dengan mode dark/light
            opacity: 0.7, // Transparansi garis hover
          },
        },
        attract: {
          distance: 200, // Jarak efek tarik
          duration: 0.4, // Durasi tarik
          speed: 1, // Kecepatan tarik
        },
        push: {
          quantity: 5, // Jumlah partikel baru saat klik
        },
      },
    },
    detectRetina: true, // Mendukung layar Retina
  });
  