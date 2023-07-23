import { useNavigate } from 'react-router-dom';
import MainImage from "../assets/images/MainImage.svg";
import { Container, ButtonWrap } from "../styles/style";
import LoginBar from "../assets/images/LoginBar.svg";
import LogoutBar from "../assets/images/LogoutBar.svg";
import Title from "../assets/images/Title.svg";
import Making from "../assets/images/Making.svg";
import supabase from "../supabase";
import { useUserAction } from "../actions/userAction";
import { useCallback } from "react";

interface MainProps { }

const Main: React.FC<MainProps> = () => {
  const { user, signOut } = useUserAction();
  const navigate = useNavigate();

  const signOutUser = useCallback(() => {
    signOut();
    navigate("/");
  }, [signOut, navigate]);

  return (
    <>
      <Container>
        <img src={Title} alt="메인 타이틀" />
        <br />
        <img src={MainImage} alt="메인 로고" />
        <ButtonWrap>
          {user ? (
            <>
              <img src={Making} onClick={() => navigate("/card")} />
              <img src={LogoutBar} onClick={signOutUser} />
            </>
          ) : (
            <img src={LoginBar} onClick={() => navigate("/login")} />
          )}
        </ButtonWrap>
      </Container>
    </>
  )
}

export default Main
