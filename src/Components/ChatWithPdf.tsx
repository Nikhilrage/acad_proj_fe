import axios from "axios";
import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import LoaderComp from "../atoms/LoaderComp";

const ChatWithPdf = () => {
  const [inputOnFocus, setInputOnFocus] = useState<boolean>(false);
  const [response, setResponse] = useState<any>("");
  const [userPrompt, setUserprompt] = useState<string>("");
  const [showClearFileBtn, setShowClearFileBtn] = useState<any>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const getResponse = async () => {
    try {
      setShowLoader(true);
      if (!userPrompt) {
        alert("Enter your prompt");
        return;
      }
      if (!showClearFileBtn) {
        alert("Upload a file to continue chat");
        return;
      }
      const payload: any = {};
      if (userPrompt) {
        payload["user_prompt"] = userPrompt;
        setResponse("");
        setUserprompt("");
      }

      // Send a POST request to the '/upload_file' endpoint
      const response = await axios.post(
        "http://127.0.0.1:5000/get_response_for_user_prompt",
        payload
      );

      // Handle the response from the backend
      console.log("Response from backend:", response.data);
      if (response?.data?.output_text) {
        setResponse(response?.data?.output_text);
      }
    } catch (error) {
      console.error("Error uploading PDF file:", error);
      // Handle errors here
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <>
      <LoaderComp isLoading={showLoader} />
      <div
        style={{
          height: "100vh",
          display: "flex",
          background:
            "linear-gradient(to bottom right, rgba(42, 2, 65, 1) 0%, rgba(42, 2, 65, 2) 100%, rgba(42, 2, 65, 0.5) 100%)",
        }}
      >
        <div style={{ width: "25%", height: "100%" }}>
          <ChatWithPdfSidebar
            showClearFileBtn={showClearFileBtn}
            setShowClearFileBtn={setShowClearFileBtn}
          />
        </div>
        <div style={{ height: "100%", width: "75%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
              height: "90%",
              rowGap: 30,
              padding: "50px 40px",
            }}
          >
            <div
              style={{
                color: "#A62694",
                fontSize: 48,
                fontWeight: 700,
                textAlign: "center",
                width: "100%",
              }}
            >
              Chat With Your Uploaded PDF👇🏻
            </div>
            <div
              style={{
                margin: "1px auto",

                width: "80%",
              }}
            >
              <div
                style={{
                  paddingLeft: "10px",
                  color: "#A894B6",
                  fontSize: 12,
                  paddingBottom: 6,
                }}
              >
                Ask a Question from the PDF Files
              </div>
              <div style={{ position: "relative" }}>
                <input
                  value={userPrompt}
                  onFocus={() => setInputOnFocus(true)}
                  onBlur={() => setInputOnFocus(false)}
                  onChange={(e) => setUserprompt(e.target.value)}
                  placeholder={"Enter Your prompt"}
                  style={{
                    width: "100%",
                    height: "50px",
                    borderRadius: "20px",
                    paddingLeft: "30px",
                    paddingRight: "50px",
                    background: "#A894B6",
                    outline: "none",
                    border: inputOnFocus ? "2px solid #A62694" : "none",
                    fontSize: 18,
                    color: "#A62694",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 10,
                    right: "-65px",
                  }}
                >
                  <FiSend
                    style={{
                      fontSize: "25px",
                      cursor: showClearFileBtn ? "pointer" : "not-allowed",
                      background: "#A894B6",
                      opacity: showClearFileBtn ? 1 : 0.3,
                    }}
                    onClick={getResponse}
                  />
                </div>
              </div>
            </div>
            {!response && (
              <div
                style={{
                  color: "#A894B6",
                  width: "90%",
                  flexGrow: 1,
                  overflowY: "auto",
                }}
              >
                {`Response:  ${response}`}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWithPdf;

const ChatWithPdfSidebar = ({ showClearFileBtn, setShowClearFileBtn }: any) => {
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const uploadPDF = async () => {
    try {
      setShowLoader(true);
      const formData = new FormData();
      formData.append("file", uploadedFile);

      // Send a POST request to the '/upload_file' endpoint
      const response = await axios.post(
        "http://127.0.0.1:5000/upload_file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle the response from the backend
      console.log("Response from backend:", response.data);
      if (response?.data?.message === "pdf text stored in FIASS index") {
        setShowClearFileBtn(true);
      }
      return response.data;
    } catch (error) {
      console.error("Error uploading PDF file:", error);
      // Handle errors here
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <>
      <LoaderComp isLoading={showLoader} />
      <div
        style={{
          borderRight: "2px solid #A62694",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          rowGap: 15,
          justifyContent: "center",
          padding: "3px 20px",
        }}
      >
        <div
          style={{
            wordBreak: "break-word",
            fontSize: 16,
            fontWeight: 600,
            color: "#A62694",
          }}
        >
          Upload your PDF Files and Click on the Submit & Process Button
        </div>
        <div
          style={{
            background: "#A894B6",
            width: "80%",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            rowGap: "20px",
            position: "relative",
            padding: "10px 20px",
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#A62694",
            }}
          >
            {showClearFileBtn ? (
              <div>Uploaded file</div>
            ) : (
              <div>Drag and drop files here</div>
            )}
            <div style={{ fontSize: 12, fontWeight: 400, paddingTop: "20px" }}>
              {showClearFileBtn ? (
                <span>{uploadedFile.name}</span>
              ) : (
                "Limit: 200mb"
              )}
            </div>
          </div>
          {showClearFileBtn && (
            <button
              onClick={() => {
                setUploadedFile(null);
                setShowClearFileBtn(false);
              }}
              style={{
                fontWeight: 400,
                fontSize: "16px",
                backgroundColor: "#A894B6",
                color: "#A62694",
                border: "2px solid #A62694",
                borderRadius: "10px",
                padding: "15px 20px",
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              Clear
            </button>
          )}
          {!showClearFileBtn && (
            <>
              <button
                style={{
                  fontWeight: 400,
                  fontSize: "16px",
                  backgroundColor: "#A894B6",
                  color: "#A62694",
                  border: "2px solid #A62694",
                  borderRadius: "10px",
                  padding: "15px 20px",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                }}
              >
                Browse files
              </button>
              <input
                type={"file"}
                accept=".pdf"
                onChange={(event: any) => {
                  const file = event.target.files[0];
                  setUploadedFile(file);
                  file?.name &&
                    alert(`${file?.name}  File Uploaded successfully`);
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  // width: "150px",
                  opacity: 0,
                  cursor: "pointer",
                }}
              />
            </>
          )}
        </div>
        {!showClearFileBtn && (
          <button
            onClick={uploadPDF}
            style={{
              fontWeight: 400,
              fontSize: "16px",
              backgroundColor: "rgb(43, 44, 54)",
              color: "#fff",
              border: "1px solid rgba(250, 250, 250, 0.2)",
              borderRadius: "10px",
              padding: "10px",
              whiteSpace: "nowrap",
              marginRight: 30,
              cursor: "pointer",
            }}
          >
            {"Submit"}
          </button>
        )}
      </div>
    </>
  );
};
