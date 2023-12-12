import React, { useState } from "react";

import styles from "./styles.module.css";

const Avatar = (props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={props.style}>
      <div
        className={`transition-3 ${styles.avatarHello}`}
        style={{
          opacity: hovered ? "1" : "0",
        }}>
        Chatbot hỗ trợ
      </div>

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => props.onClick && props.onClick()}
        className={`transition-3 ${styles.chatWithMeButton}`}
        style={{
          border: hovered ? "1px solid #40739e" : "4px solid #487eb0",
        }}
      />
    </div>
  );
};

export default Avatar;
