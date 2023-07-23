import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserAction } from "../actions/userAction";
import { GlobalStyles, FrameDiv } from "../styles/layout";
import AppRouter from "./Router";
import { useRecoilValue } from "recoil";
import { UserState } from "../state/UserState";
import supabase from "../supabase";

function App() {
  const {
    signIn,
  } = useUserAction();

  const accessToken = useRecoilValue(UserState.accessToken);
  const refreshToken = useRecoilValue(UserState.refreshToken);

  useEffect(() => {
    const hash: { [key: string]: string } = {};
    window.location.hash.split("#")[1]?.split("&").forEach(item => {
      const [key, value] = item.split("=");
      hash[key] = value;
    });
    const accessToken = hash["access_token"];
    const refreshToken = hash["refresh_token"];
    if (!accessToken || !refreshToken) {
      return;
    }
    signIn({
      accessToken, refreshToken
    });
    window.location.hash = "";
    window.location.reload();
  }, []);

  useEffect(() => {
    if (!accessToken || !refreshToken) {
      return;
    }
    signIn({
      accessToken, refreshToken
    });
  }, [accessToken, refreshToken]);

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setAccessToken("asd" + Math.random());
  //   }, 1000);
  //   return () => clearInterval(id);
  // }, [setAccessToken]);



  return (
    <>
      <GlobalStyles />
      <FrameDiv>
        <AppRouter />
      </FrameDiv>
    </>
  );
}

export default App;
