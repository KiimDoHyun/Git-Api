import { atom } from "recoil";

export const rc_user_user = atom({
    key: "rc_user_user",
    default: "",
});

export const rc_user_userList = atom({
    key: "rc_user_userList",
    default: [],
});

export const rc_user_showSetUserDialog = atom({
    key: "rc_user_showSetUserDialog",
    default: false,
});
