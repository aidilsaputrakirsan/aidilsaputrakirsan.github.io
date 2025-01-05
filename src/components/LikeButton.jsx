// src/components/LikeButton.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [likeCount, setLikeCount] = useState(0); // Menyimpan jumlah like yang sudah diberikan
  const [message, setMessage] = useState(''); // Untuk pesan setelah like

  // URL backend Express.js
  const BACKEND_URL = 'https://aidilsaputrakirsan-github-io.vercel.app/api/likes.js'; // Ganti jika berbeda
  const MAX_LIKES = 3; // Batas maksimal like per perangkat

  useEffect(() => {
    // Mengambil jumlah like saat komponen di-mount
    fetchLikes();

    // Mengecek jumlah like yang sudah diberikan dari localStorage
    const storedLikeCount = parseInt(localStorage.getItem('likeCount'), 10) || 0;
    setLikeCount(storedLikeCount);
  }, []);

  const fetchLikes = async () => {
    try {
      const response = await axios.get(BACKEND_URL);
      setLikes(response.data.likes);
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  const handleLike = async () => {
    if (likeCount >= MAX_LIKES) return;

    try {
      const response = await axios.post(BACKEND_URL);
      setLikes(response.data.likes);
      const newLikeCount = likeCount + 1;
      setLikeCount(newLikeCount);
      localStorage.setItem('likeCount', newLikeCount.toString());

      // Menampilkan pesan terima kasih
      setMessage('Thank you for your support!');

      // Menghapus pesan setelah beberapa detik
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error adding like:', error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <motion.button
        onClick={handleLike}
        className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
          likeCount >= MAX_LIKES
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-white dark:bg-black font-bold text-black dark:text-white hover:bg-[#388E3C] dark:hover:bg-[#FF5722]'

        }`}
        disabled={likeCount >= MAX_LIKES}
        whileTap={{ scale: 0.95 }}
        data-tooltip-id="like-tooltip"
        data-tooltip-content={
          likeCount >= MAX_LIKES
            ? 'You have reached the like limit'
            : 'Click to support my work!'
        }
      >
        <span role="img" aria-label="like">
          ❤️
        </span>
        <span>{likes}</span>
      </motion.button>
      
      {/* Tooltip */}
      <Tooltip id="like-tooltip" place="top" effect="solid" />

      {/* Pesan Terima Kasih */}
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-green-500"
        >
          {message}
        </motion.p>
      )}

      {/* Ajakan Bertindak */}
      {!message && (
        <p className="mt-2 text-sm text-gray-300 dark:text-gray-700">
          If you appreciate my website, please give a like!
        </p>
      )}
    </div>
  );
};

export default LikeButton;
