import { User } from "@supabase/supabase-js";
import { atom, selector } from "recoil";
import supabase from "../supabase";

export namespace UserState {
  export const ACCESS_TOKEN_LOCAL_STORAGE_KEY = "accessToken";
  export const REFRESH_TOKEN_LOCAL_STORAGE_KEY = "refreshToken";

  export const accessToken = atom({
    key: "UserState.accessToken",
    default: localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY) || undefined,
  });

  export const refreshToken = atom({
    key: "UserState.refreshToken",
    default: localStorage.getItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY) || undefined,
  });

  export const user = selector({
    key: "UserState.user",
    get: async ({ get }) => {
      const token = get(accessToken);
      if (!token) {
        return undefined;
      }
      const { data } = await supabase.auth.getUser(token);
      return data.user || undefined;
    }
  });
}