import React, { useState } from "react";
import { LuBot } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import LoaderComp from "../atoms/LoaderComp";

const ChatBot = () => {
  const [chatConversation, setChatConversation] = useState<any[]>([]);
  const [value, setValue] = useState("");
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const handleChange = (event: any) => {
    setValue(event.target.value);
    // Auto-adjust the height of the textarea based on content
    event.target.style.height = "auto";
    event.target.style.height = `${Math.min(event.target.scrollHeight, 200)}px`;
  };

  const handleChat = async () => {
    if (!value) {
      return;
    }
    setChatConversation((prevConversation) => [
      ...prevConversation,
      { role: "user", msg: value },
    ]);
    setValue("");

    try {
      setShowLoader(true);

      const res: any = await axios.get(
        `http://127.0.0.3:3000/get?msg=${value}`
      );

      if (res?.data?.length) {
        setTimeout(() => {
          setChatConversation((prevConversation) => [
            ...prevConversation,
            { role: "bot", msg: res?.data[0] },
          ]);
        }, 0);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <>
      <LoaderComp isLoading={showLoader} />
      <div
        style={{
          background:
            "linear-gradient(to bottom right, rgba(42, 2, 65, 1) 0%, rgba(42, 2, 65, 2) 100%, rgba(42, 2, 65, 0.5) 100%)",
          display: "flex",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
          }}
        >
          <div
            style={{
              color: "#A62694",
              textAlign: "center",
              fontSize: 24,
              fontWeight: 500,
              padding: "20px 1px ",
            }}
          >
            Mental Health Analysis Chat Bot
          </div>
          <div
            style={{
              flexGrow: 1,
              overflowY: "scroll",
              color: "#fff",
              padding: "30px 40px 30px 30px",
            }}
          >
            {chatConversation.length !== 0 &&
              chatConversation?.map((chat: any, index: number) => (
                <div key={index}>
                  <div style={{ paddingBottom: "5px" }}>
                    <UserMsg msg={chat?.msg} role={chat?.role} />
                  </div>
                </div>
              ))}
          </div>
          <div
            style={{
              margin: "30px 40px 30px 30px",
              position: "relative",
            }}
          >
            <textarea
              value={value}
              onChange={handleChange}
              placeholder={"Enter Your message"}
              style={{
                width: "100%",
                height: "50px",
                maxHeight: "70px",
                overflowY: "auto",
                resize: "none",
                border: "1px solid #ccc",
                padding: "5px",
                outline: "none",
                borderRadius: "10px",
                background: "#A894B6",
              }}
              rows={5} // Set the number of visible rows
            />
            <div style={{ position: "absolute", bottom: "5px", right: 1 }}>
              <button
                onClick={handleChat}
                style={{
                  padding: "10px 20px",
                  borderRadius: "15px",
                  outline: "none",
                  border: "2px solid #A62694",
                  background: "#A894B6",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;

const UserMsg = ({ msg, role }: { msg: string; role: string }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: role === "bot" ? "row" : "row-reverse",
          alignItems: "start",
          justifyContent: role === "bot" ? "start" : "end",
          columnGap: 10,
          marginLeft: "5px",
        }}
      >
        <div
          style={{
            background: "#A62694",
            padding: "5px 10px",
            borderRadius: 25,
          }}
        >
          {role !== "bot" ? (
            <FaRegUser style={{ fontSize: 16 }} />
          ) : (
            <LuBot style={{ fontSize: 16 }} />
          )}
        </div>
        <div
          style={{
            background: "green",
            borderRadius: "20px",
            padding: "10px 20px 10px 20px",
            maxWidth: "40%",
          }}
        >
          {msg}
        </div>
      </div>
    </>
  );
};
