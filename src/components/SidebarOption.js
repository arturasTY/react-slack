import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { openAddChannel } from "../redux/ChannelSlice";
import { enterRoom } from "../redux/ChannelSlice";

//Styled components
const SidebarOptionContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  padding: 12px 15px;
  cursor: pointer;
  transition: all 0.3s;
  :hover {
    background-color: #340e36;
    opacity: 0.8;
  }
  > h3 {
    margin-left: 7px;
    font-weight: 500;
  }
`;
const SidebarOptionChannel = styled.div`
  margin-left: 24px;
  display: flex;
  span {
    margin-right: 5px;
  }
  h4 {
    font-weight: 400;
  }
`;

function SidebarOption({ Icon, title, addChannelOption, id }) {
  const dispatch = useDispatch();

  const addChannel = () => {
    dispatch(openAddChannel());
  };

  const selectChannel = () => {
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
    }
  };

  return (
    <>
      <SidebarOptionContainer
        onClick={addChannelOption ? addChannel : selectChannel}
      >
        {Icon && <Icon fontSize="small" />}
        {Icon ? (
          <h3>{title}</h3>
        ) : (
          <SidebarOptionChannel>
            <span>#</span> <h4>{title}</h4>
          </SidebarOptionChannel>
        )}
      </SidebarOptionContainer>
    </>
  );
}

export default SidebarOption;
