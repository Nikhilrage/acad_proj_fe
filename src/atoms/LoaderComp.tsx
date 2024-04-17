import React from "react";
import "./LoaderComp.css";
const LoaderComp = ({ isLoading }: any) => {
  if (!isLoading) return null;

  return (
    <div style={styles.overlay}>
      <div className="loader"></div>
    </div>
  );
};

const spinKeyframes = {
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
};

const styles: any = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
};

export default LoaderComp;
