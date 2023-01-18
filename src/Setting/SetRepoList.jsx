import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { rc_repo_savedRepoList } from "../Store/repo";
import { rc_user_user, rc_user_userList } from "../Store/user";

const SetRepoList = () => {
    const setRepoList = useSetRecoilState(rc_repo_savedRepoList);
    const setCurrentUser = useSetRecoilState(rc_user_user);
    const setUserList = useSetRecoilState(rc_user_userList);

    // localStorage에 저장된 repoList를 Recoil에 저장한다.
    useEffect(() => {
        const currentUser = window.localStorage.getItem("currentUser");

        if (!currentUser) {
            window.localStorage.setItem("currentUser", "user1");
            window.localStorage.setItem("user1_repoList", "[]");
            window.localStorage.setItem("userList", "user1");
        }

        const data = JSON.parse(
            window.localStorage.getItem(`${currentUser}_repoList`)
        );

        const userList = window.localStorage.getItem("userList");

        setRepoList(data || []);
        setCurrentUser(currentUser || "user1");
        setUserList(userList.split(","));
    }, [setRepoList, setCurrentUser, setUserList]);

    return <></>;
};

export default React.memo(SetRepoList);
