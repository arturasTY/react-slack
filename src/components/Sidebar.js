import React from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import SidebarOption from "./SidebarOption";
import CommentIcon from "@material-ui/icons/Comment";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import WebAssetIcon from "@material-ui/icons/WebAsset";
import AppsIcon from "@material-ui/icons/Apps";
import PeopleIcon from "@material-ui/icons/People";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

//Styled components
const SidebarContainer = styled.div`
  background-color: var(--slack-color);
  color: white;
  margin-top: 60px;
  border-top: 1px solid #49274b;
  > hr {
    border: 1px solid #49274b;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #49274b;
  padding: 10px 15px;
  > .MuiSvgIcon-root {
    border-radius: 50%;
    padding: 8px;
    background-color: white;
    color: #49274b;
    font-size: 1.85rem;
    cursor: pointer;
  }
`;

const SidebarInfo = styled.div`
  flex: 1;
  > h2 {
    font-size: 0.9em;
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 5px;
  }
  > h3 {
    display: flex;
    align-items: center;
    font-size: 0.8em;
    font-weight: 400;
  }
  .MuiSvgIcon-root {
    width: 0.7em;
    height: 0.7em;
    color: green;
    margin-right: 2px;
  }
`;

function Sidebar() {
  const [channels, loading, error] = useCollection(db.collection("channels"));

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>Dev Stack</h2>
          <h3>
            <FiberManualRecordIcon /> Arturas Tyvoniak
          </h3>
        </SidebarInfo>
        <CreateIcon />
      </SidebarHeader>
      <SidebarOption Icon={CommentIcon} title="Threads" />
      <SidebarOption
        Icon={AlternateEmailIcon}
        title="Mentions &amp; reactions"
      />
      <SidebarOption Icon={BookmarkBorderIcon} title="Saved items" />
      <SidebarOption Icon={WebAssetIcon} title="Channel browser" />
      <SidebarOption Icon={AppsIcon} title="Apps" />
      <SidebarOption Icon={PeopleIcon} title="People &amp; user groups" />
      <SidebarOption Icon={FileCopyIcon} title="File browser" />
      <SidebarOption Icon={ExpandLessIcon} title="Show less" />
      <hr />
      <SidebarOption Icon={ExpandMoreIcon} title="Show more" />
      <hr />
      <SidebarOption Icon={AddIcon} addChannelOption title="Add channel" />
      {channels?.docs.map((doc) => (
        <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
      ))}
    </SidebarContainer>
  );
}

export default Sidebar;
