import React from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

//Styled Components
const HeaderContainer = styled.div`
  background-color: var(--slack-color);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px 15px;
  position: fixed;
  width: 100%;
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-right: 30px;
  > .MuiSvgIcon-root {
    margin-left: auto;
  }
`;

const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: #421f44;
  text-align: center;
  display: flex;
  align-items: center;
  padding: 0 10px;
  color: grey;
  border: 1px solid grey;
  > input {
    background: none;
    border: 0;
    outline: 0;
    color: white;
    text-align: center;
    min-width: 30vw;
    padding: 5px;
  }
  > .MuiSvgIcon-root {
    width: 0.9em;
    height: 0.9em;
  }
`;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  justify-content: flex-end;
  > .MuiSvgIcon-root {
    cursor: pointer;
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  opacity: 1;
  :hover {
    opacity: 0.8;
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderAvatar />
        <QueryBuilderIcon />
      </HeaderLeft>
      <HeaderSearch>
        <SearchIcon />
        <input placeholder="Search Slack" />
      </HeaderSearch>
      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;
