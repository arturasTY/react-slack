import React, { useEffect, useCallback } from "react";
import CloseIcon from "@material-ui/icons/Close";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useDispatch } from "react-redux";
import { closeAddChannel } from "../redux/ChannelSlice";
import styled from "styled-components";
import { db } from "../firebase";
import firebase from "firebase";

//Styled components
const ModalContainer = styled.div`
  background: white;
  color: #222;
  box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.15);
  position: fixed;
  flex-direction: column;
  padding: 30px;
  border-radius: 6px;
  width: 480px;
  z-index: 10000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  visibility: visible;
  opacity: 1;
  transition: all 0.3s;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  > h2 {
    font-weight: 700;
  }
  p {
    font-size: 14px;
    margin-top: 15px;
    color: #666;
  }
  .MuiSvgIcon-root {
    color: #666;
    cursor: pointer;
  }
`;
const ModalForm = styled.form`
  margin-top: 30px;
`;
const InputBlock = styled.div`
  margin-bottom: 20px;
  position: relative;
  > label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 8px;
    span {
      font-weight: 300;
    }
  }
  > input {
    width: 100%;
    outline: none;
    border: 1px solid #666;
    border-radius: 4px;
    padding: 0 12px 0 22px;
    height: 36px;
    &:nth-child(2) {
      padding-left: 10px;
    }
  }
  span.hashtag {
    position: absolute;
    top: 32px;
    left: 10px;
    color: #666;
    opacity: 0.8;
  }
`;
const HasTwoCols = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #666;
    font-size: 12px;
  }
  button {
    background-color: #ddd;
    color: inherit;
    font-weight: 700;
    border: 0;
    outline: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
  }
  .MuiSvgIcon-root {
    width: 0.75em;
    height: 0.75em;
    margin-right: 3px;
  }
`;
const CloseButton = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const EscKey = styled.span`
  font-size: 0.7em;
  color: #999;
`;

function Modal() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    db.collection("channels").add({
      name: data.get("channelName"),
      description: data.get("channelDesc"),
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    //Close Add Channel Modal after 1sec
    setTimeout(() => {
      dispatch(closeAddChannel());
    }, 500);
  };

  const handleEscapeKey = useCallback((e) => {
    if (e.keyCode === 27) {
      dispatch(closeAddChannel());
    }
  }, []);

  //add/remove keydown event from document
  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey, false);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey, false);
    };
  }, []);

  return (
    <ModalContainer>
      <ModalHeader>
        <div>
          <h2>Create a channel</h2>
          <p>
            Channels are where your team communicates. They're best when
            organised around a topic - #marketing, for example.
          </p>
        </div>
        <CloseButton onClick={() => dispatch(closeAddChannel())}>
          <CloseIcon />
          <EscKey>esc</EscKey>
        </CloseButton>
      </ModalHeader>
      <ModalForm onSubmit={handleSubmit}>
        <InputBlock>
          <label>Name</label>
          <span className="hashtag">#</span>
          <input
            type="text"
            name="channelName"
            placeholder="e.g. plan-budget"
            required
          />
        </InputBlock>
        <InputBlock>
          <label>
            Description <span>(optional)</span>
          </label>
          <input type="text" name="channelDesc" />
        </InputBlock>
        <HasTwoCols>
          <a href="empty">
            <InfoOutlinedIcon /> Learn more
          </a>
          <button type="submit">Create</button>
        </HasTwoCols>
      </ModalForm>
    </ModalContainer>
  );
}

export default Modal;
