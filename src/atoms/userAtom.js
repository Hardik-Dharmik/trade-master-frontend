import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: window.localStorage.getItem("user"),
});

export const tokenState = atom({
  key: "tokenState",
  default: window.localStorage.getItem("token"),
});
