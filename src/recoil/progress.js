import { atom } from "recoil";

export const Progress = atom({
  key: "progress", //고유값이어야함
  default: 1,
});
