import React from "react";
import { useRef } from "react";
import styled from "styled-components";
import { authentication, db } from "../firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

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
  const [user] = useAuthState(authentication);
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
        user: user.displayName,
        userAvatar: user.photoURL,
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
