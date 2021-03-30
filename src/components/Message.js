import React from "react";
import styled from "styled-components";
import moment from "moment";

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  > img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    object-fit: cover;
  }
`;
const MessageInfo = styled.div`
  margin-left: 10px;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  > h3 {
    margin-right: 5px;
  }
  > span {
    opacity: 0.5;
    font-size: 0.8em;
  }
`;

function Message({ message, timestamp, user, userAvatar }) {
  return (
    <MessageContainer>
      <img src={userAvatar} alt="User profile" />
      <MessageInfo>
        <UserInfo>
          <h3>{user}</h3>
          <span>
            {moment(timestamp?.toDate().toUTCString()).format("HH:mm")}
          </span>
        </UserInfo>
        <p>{message}</p>
      </MessageInfo>
    </MessageContainer>
  );
}

export default Message;
