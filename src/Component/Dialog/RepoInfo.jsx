import { Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getLanguagesApi } from "../../Api/git";
import useAxios from "../../Hook/useAxios";
import { rc_user_RepoInfo, rc_user_showRepoInfoDialog } from "../../Store/repo";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import AdjustOutlinedIcon from "@mui/icons-material/AdjustOutlined";
import OwnerInfo from "../Detail/OwnerInfo";
import Repo from "./RepoInfo/Repo";
import LanguageChart from "./RepoInfo/LanguageChart";
import ButtonArea from "./UserSetting/ButtonArea";
import CountInfo from "./RepoInfo/CountInfo";

const RepoInfo = () => {
    // Dialog 활성화 변수
    const [showRepoInfoDialog, setShowRepoInfoDialog] = useRecoilState(
        rc_user_showRepoInfoDialog
    );

    // 클릭된 Repo 정보
    const [repoInfo, setRepoInfo] = useRecoilState(rc_user_RepoInfo);

    // Repo Language 조회
    const [getLanguagesResult, getLanguages] = useAxios(getLanguagesApi);

    // 닫기
    const onClose = useCallback(() => {
        setShowRepoInfoDialog(false);
        setRepoInfo(null);
    }, [setShowRepoInfoDialog, setRepoInfo]);

    useEffect(() => {
        if (!repoInfo) return;

        getLanguages({ user: repoInfo.owner.login, repo: repoInfo.name });
    }, [repoInfo, getLanguages]);

    if (!repoInfo) return null;

    return (
        <>
            <Dialog open={showRepoInfoDialog} onClose={onClose} maxWidth={"lg"}>
                <DialogTitle>Repo Information</DialogTitle>
                <Divider />
                <DialogContent>
                    <DialogContainer>
                        {/* 왼쪽 영역 */}
                        <div className="leftArea">
                            {/* User 정보 */}
                            <OwnerInfo
                                imgSrc={repoInfo.owner.avatar_url}
                                ownerName={repoInfo.owner.login}
                                url={repoInfo.html_url}
                            />

                            {/* Count */}
                            <CountInfo
                                title={"starts"}
                                IconComponet={() => <StarOutlineIcon />}
                                count={repoInfo.stargazers_count}
                            />
                            <CountInfo
                                title={"watching"}
                                IconComponet={() => <VisibilityOutlinedIcon />}
                                count={repoInfo.watchers_count}
                            />
                            <CountInfo
                                title={"forks"}
                                IconComponet={() => <AccountTreeOutlinedIcon />}
                                count={repoInfo.forks_count}
                            />
                            <CountInfo
                                title={"issues"}
                                IconComponet={() => <AdjustOutlinedIcon />}
                                count={repoInfo.open_issues_count}
                            />
                        </div>

                        {/* 오른쪽 영역 */}
                        <div className="rightArea">
                            {/* 저장소 정보 */}
                            <Repo
                                name={repoInfo.name}
                                topics={repoInfo.topics}
                                description={repoInfo.description}
                            />
                            {/* 차트 */}
                            <LanguageChart
                                getLanguagesResult={getLanguagesResult}
                            />
                        </div>
                    </DialogContainer>
                    <Divider />
                    <ButtonArea onClose={onClose} />
                </DialogContent>
            </Dialog>
        </>
    );
};

const DialogContainer = styled.div`
    display: flex;
    gap: 20px;

    padding-bottom: 20px;

    max-height: 600px;

    .leftArea,
    .rightArea {
        width: 400px;
        flex: 1;

        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
    }

    .rightArea {
        overflow: scroll;
    }
`;

export default RepoInfo;
