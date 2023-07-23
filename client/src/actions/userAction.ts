import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilCallback, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { UserState } from "../state/UserState";
import supabase from "../supabase";

export enum Provider {
  Google = "google",
  Kakao = "kakao",
  Facebook = "facebook"
}

export function useUserAction() {
  const userLoadable = useRecoilValueLoadable(UserState.user);
  const user = useMemo(() => {
    return userLoadable.state === "hasValue" ? userLoadable.contents : undefined;
  }, [userLoadable]);

  const signIn = useRecoilCallback(({ set }) => async ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
    localStorage.setItem(UserState.ACCESS_TOKEN_LOCAL_STORAGE_KEY, accessToken);
    localStorage.setItem(UserState.REFRESH_TOKEN_LOCAL_STORAGE_KEY, refreshToken);
    set(UserState.accessToken, accessToken);
    set(UserState.refreshToken, refreshToken);
    await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
  });

  const signOut = useRecoilCallback(({ reset }) => async () => {
    localStorage.removeItem(UserState.ACCESS_TOKEN_LOCAL_STORAGE_KEY);
    localStorage.removeItem(UserState.REFRESH_TOKEN_LOCAL_STORAGE_KEY);
    reset(UserState.accessToken);
    reset(UserState.refreshToken);
    await supabase.auth.signOut()
  });

  const loginWithSocial = useRecoilCallback(({ set }) => async ({ provider }: { provider: Provider }) => {
    let response = await supabase.auth.signInWithOAuth({
      provider,
      // options: {
      //   redirectTo: "http://localhost:3000"
      // }
    });

    if (response.error || !response.data || !response.data.url) {
      // error
      return;
    }

    // window.open(response.data.url, "_blank");
  });

  return { signIn, signOut, user, loginWithSocial, userLoadable };
}
