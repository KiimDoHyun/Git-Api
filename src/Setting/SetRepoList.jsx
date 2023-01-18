import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { getLocalStorage, setLocalStorage } from "../Common/common";
import { rc_repo_savedRepoList } from "../Store/repo";
import { rc_user_user, rc_user_userList } from "../Store/user";

const SetRepoList = () => {
    const setRepoList = useSetRecoilState(rc_repo_savedRepoList);
    const setCurrentUser = useSetRecoilState(rc_user_user);
    const setUserList = useSetRecoilState(rc_user_userList);

    // localStorage에 저장된 repoList를 Recoil에 저장한다.
    useEffect(() => {
        const currentUser = getLocalStorage("currentUser");

        if (!currentUser) {
            setLocalStorage("currentUser", "user1");
            setLocalStorage("user1_repoList", []);
            setLocalStorage("userList", ["user1"]);
        }

        const data = getLocalStorage(`${currentUser}_repoList`);

        const userList = getLocalStorage("userList");

        setRepoList(data || []);
        setCurrentUser(currentUser || ["user1"]);
        setUserList(userList);
    }, [setRepoList, setCurrentUser, setUserList]);

    return <></>;
};

export default React.memo(SetRepoList);
