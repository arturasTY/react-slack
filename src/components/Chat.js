import React from "react";
import styled from "styled-components";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";
import { selectRoomId } from "../redux/ChannelSlice";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from "./Message";
import { useRef } from "react";
import { useEffect } from "react";

const ChatContainer = styled.div`
  margin-top: 60px;
  height: calc(100vh - 140px);
  overflow-y: scroll;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    margin-right: 3px;
  }
`;
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  > p {
    margin-left: 3px;
  }
`;

const ChatMessages = styled.div`
  padding: 1em;
`;

const ChatBottom = styled.div`
  padding-bottom: 100px;
`;

function Chat() {
  const roomId = useSelector(selectRoomId);
  const chatRef = useRef(null);
  const [channelDetails] = useDocument(
    roomId && db.collection("channels").doc(roomId)
  );
  const channelName = channelDetails?.data().name;
  const [channelMessages, loading] = useCollection(
    roomId &&
      db
        .collection("channels")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomId, loading]);

  return (
    <ChatContainer>
      <ChatHeader>
        <HeaderLeft>
          <h4>
            <strong>#{channelName}</strong>
          </h4>
          <StarBorderIcon />
        </HeaderLeft>
        <HeaderRight>
          <HelpOutlineIcon />
          <p>Details</p>
        </HeaderRight>
      </ChatHeader>
      <ChatMessages>
        {channelMessages?.docs.map((doc) => {
          const { message, timestamp, user, userAvatar } = doc.data();
          return (
            <Message
              key={doc.id}
              message={message}
              timestamp={timestamp}
              user={user}
              userAvatar={userAvatar}
            />
          );
        })}
        <ChatBottom ref={chatRef} />
      </ChatMessages>
      <ChatInput
        channelName={channelName}
        channelId={roomId}
        chatRef={chatRef}
      />
    </ChatContainer>
  );
}

export default Chat;
