import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { rc_repo_repoList } from "../Store/repo";

const SetRepoList = () => {
    const setRepoList = useSetRecoilState(rc_repo_repoList);

    // localStorage에 저장된 repoList를 Recoil에 저장한다.
    useEffect(() => {
        const data = JSON.parse(window.localStorage.getItem("repoList"));
        setRepoList(data || []);
    }, [setRepoList]);

    return <></>;
};

export default React.memo(SetRepoList);
