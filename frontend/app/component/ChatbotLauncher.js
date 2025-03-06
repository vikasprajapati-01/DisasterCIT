"use client";

import { useState } from "react";
import Chatbot from "./Chatbot";
import styles from './ChatbotLauncher.module.css'; 

import { FaCommentDots } from "react-icons/fa";

export default function ChatbotLauncher() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <div>
      {isChatOpen && (
        <div className={styles.chatbotContainer}>
          <Chatbot />
        </div>
      )}

      <div onClick={toggleChat} className={styles.chatbotButton}>
        <FaCommentDots className="text-3xl" /> 
      </div>
    </div>
  );
}
