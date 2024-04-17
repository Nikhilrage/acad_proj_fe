import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.css";
import hp_img_2 from "../assets/Images/hp_img_2.png";
import hp_img_3 from "../assets/Images/hp_img_3.jpeg";
import download from "../assets/Images/download.png";

const btnStyles = {
  borderRadius: "20px",
  width: "200px",
  height: "50px",

  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer",
};

const Homepage = () => {
  const navigate = useNavigate();

  const [text, setTexts] = useState();

  const onClickFn = (pathName: string) => {
    navigate(pathName);
  };

  return (
    <div
      style={{
        height: "100vh",
        background:
          "linear-gradient(to bottom right, rgba(42, 2, 65, 1) 0%, rgba(42, 2, 65, 2) 100%, rgba(42, 2, 65, 0.5) 100%)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1px 40px",
      }}
    >
      <div
        style={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          rowGap: 30,
        }}
      >
        <div style={{ color: "#FCFCFB", fontSize: "5rem", fontWeight: 800 }}>
          Chat Bot
        </div>
        <div style={{}}>
          <RenderTextHeading text="Our Digital Companion for Understanding and Nurturing Mental Well-being, in Every Byte." />
          <br />
        </div>
        <div style={{ display: "flex", columnGap: 30 }}>
          <BtnOptions
            label={"Chat with Pdf"}
            styles={{ background: "#A62694", border: "none", outline: "none" }}
            onClick={() => onClickFn("/chat_with_pdf")}
          />
          <BtnOptions
            label={"Go to Chatbot"}
            styles={{
              border: "2px solid #A62694",
              background: "#170126",
              color: "#A62694",
            }}
            onClick={() => onClickFn("/chat_bot")}
          />
        </div>
      </div>
      <div
        style={{
          maxWidth: "50%",
          width: "50%",
          // height: "100%",
          // marginTop: "auto",
          alignSelf: "center",
        }}
      >
        <img src={download} width={"100%"} style={{ objectFit: "contain" }} />
      </div>
    </div>
  );
};

export default Homepage;

const RenderTextHeading = ({ text }: any) => {
  const [displayedText, setDisplayedText] = useState<any>([]);

  useEffect(() => {
    let currentText = "";
    let intervalId: any;

    const displayText = () => {
      intervalId = setInterval(() => {
        // Add one more character to the displayed text
        currentText = text.slice(0, currentText.length + 1);
        setDisplayedText(currentText);

        // Stop when all characters are displayed
        if (currentText === text) {
          clearInterval(intervalId);
        }
      }, 100); // Adjust the interval duration as needed
    };

    displayText();

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <div
      style={{
        color: "#A894B6",
        fontSize: "1.8rem",
        fontWeight: 600,
        whiteSpace: "wrap",
      }}
    >
      {displayedText}
      {/* {text} */}
    </div>
  );
};

const BtnOptions = ({ label, styles, onClick }: any) => {
  return (
    <button
      onClick={onClick}
      style={{
        boxShadow: "0px 4px 6px 0px rgba(29, 74, 67, 0.15)",
        ...styles,
        ...btnStyles,
      }}
    >
      {label}
    </button>
  );
};
