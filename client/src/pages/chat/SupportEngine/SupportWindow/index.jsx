import React, { useState } from "react";

import styles from "../styles.module.css";


import ChatEngine from "./ChatEngine";

const SupportWindow = (props) => {
  return (
    <div
      className={`transition-5 ${styles.supportWindow}`}
      style={{
        opacity: props.visible ? "1" : "0",
      }}>
      <ChatEngine />
    </div>
  );
};

export default SupportWindow;
