import React from "react";
import { useRef } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import firebase from "firebase";

const ChatInputContainer = styled.div`
  background-color: #333;
  position: fixed;
  width: calc(100% - 260px);
  bottom: 0;
  height: 80px;
  > form {
    display: flex;
    justify-content: center;
    padding: 20px 0;
    > input {
      border: 1px solid #eee;
      outline: none;
      padding: 1em;
      border-radius: 6px;
      width: 60%;
    }
    > button {
      display: none;
      visibility: hidden;
    }
  }
`;

function ChatInput({ channelName, channelId, chatRef }) {
  const inputValue = useRef(null);
  const sendMessage = (e) => {
    e.preventDefault();
    if (!channelId || !inputValue.current.value) {
      return false;
    }
    if (inputValue.current.value) {
      db.collection("channels").doc(channelId).collection("messages").add({
        message: inputValue.current.value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: "Artis",
        userAvatar:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BODFjZTkwMjItYzRhMS00OWYxLWI3YTUtNWIzOWQ4Yjg4NGZiXkEyXkFqcGdeQXVyMTQ0ODAxNzE@._V1_UX172_CR0,0,172,256_AL_.jpg",
      });
    }
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
    inputValue.current.value = "";
  };
  return (
    <ChatInputContainer>
      <form>
        <input
          ref={inputValue}
          name="newMessage"
          placeholder={`Message #${channelName}`}
        />
        <button type="submit" hidden onClick={sendMessage}>
          Send
        </button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;
