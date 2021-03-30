import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { authentication, provider } from "../firebase";

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #222;
  color: white;
  > img {
    height: 80px;
  }
  > h2 {
    margin: 30px 0;
  }
`;

function Login() {
  const signIn = (e) => {
    e.preventDefault();
    authentication.signInWithPopup(provider).catch((error) => {
      alert(error.message);
    });
  };
  return (
    <LoginContainer>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Slack_Technologies_Logo.svg/1280px-Slack_Technologies_Logo.svg.png"
        alt="logo"
      />
      <h2>Sign in to your workspace</h2>
      <Button variant="contained" color="primary" onClick={signIn}>
        Sign in with Google
      </Button>
    </LoginContainer>
  );
}

export default Login;
