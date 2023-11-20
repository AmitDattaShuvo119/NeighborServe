import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const Testing4 = () => {
    const randomWords = ["Hello", "World", "Framer", "Motion", "Animation"];
    const [wordsToShow, setWordsToShow] = useState([]);
  
    useEffect(() => {
      const delay = 1500; // 2 seconds
      const staggerDelay = 0.5; // Adjust the stagger delay between words
  
      let currentIndex = 0;
  
      const interval = setInterval(() => {
        if (currentIndex < randomWords.length) {
          setWordsToShow((prevWords) => [...prevWords, randomWords[currentIndex]]);
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, delay);
  
      return () => clearInterval(interval);
    }, []);
  
    const slideVariants = {
      hidden: { y: -100 },
      visible: { y: 0 },
    };
  
    return (
      <div>
        {wordsToShow.map((word, index) => (
          <motion.div
            key={index}
            initial="hidden"
            animate="visible"
            variants={slideVariants}
            transition={{ delay: index * 0.5 }} // Apply staggered animation
            style={{
              color: "blue",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            {word}
          </motion.div>
        ))}
      </div>
    );
  };

export default Testing4;
