import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { rc_repo_savedRepoList } from "../Store/repo";
import { rc_user_user } from "../Store/user";

const SetRepoList = () => {
    const setRepoList = useSetRecoilState(rc_repo_savedRepoList);
    const setCurrentUser = useSetRecoilState(rc_user_user);

    // localStorage에 저장된 repoList를 Recoil에 저장한다.
    useEffect(() => {
        const currentUser = window.localStorage.getItem("currentUser");
        setCurrentUser(currentUser);

        const data = JSON.parse(
            window.localStorage.getItem(`${currentUser}_repoList`)
        );

        setRepoList(data || []);
    }, [setRepoList]);

    return <></>;
};

export default React.memo(SetRepoList);
