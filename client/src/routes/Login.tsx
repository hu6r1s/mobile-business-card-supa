import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import supabase from '../supabase';
import Google from "../assets/images/Google.svg";
import Facebook from "../assets/images/Facebook.svg";
import Kakao from "../assets/images/Kakao.svg";
import { Container, ButtonWrap } from "../styles/style";
import MainImage from "../assets/images/MainImage.svg";
import Title from "../assets/images/Title.svg";
import { Provider, useUserAction } from "../actions/userAction";

const Login = () => {
  const {
    user,
    loginWithSocial,
  } = useUserAction();
  const navigate = useNavigate()

  useEffect(() => {
    console.log(user);
  }, [user]);

  // supabase.auth.onAuthStateChange(async (event) => {
  //   if (event !== "SIGNED_OUT") {
  //     navigate("/")
  //   } else {
  //     navigate("/login")
  //   }
  // })
  return (
    <Container>
      <img src={Title} alt="메인 타이틀" />
      <br />
      <img src={MainImage} alt="메인 로고" />
      <ButtonWrap>
        <img src={Google} onClick={() => loginWithSocial({
          provider: Provider.Google
        })} />
        <img src={Kakao} onClick={() => loginWithSocial({
          provider: Provider.Kakao
        })} />
        <img src={Facebook} onClick={() => loginWithSocial({
          provider: Provider.Facebook
        })} />
      </ButtonWrap>
    </Container>
  )
}

export default Login;