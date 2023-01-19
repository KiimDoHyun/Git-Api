import {
    Button,
    Chip,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Link,
    Skeleton,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getLanguagesApi } from "../../Api/git";
import useAxios from "../../Hook/useAxios";
import { rc_user_RepoInfo, rc_user_showRepoInfoDialog } from "../../Store/repo";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import AdjustOutlinedIcon from "@mui/icons-material/AdjustOutlined";
import ReactApexChart from "react-apexcharts";
import Loading from "../Common/Loading";
import OwnerInfo from "../Detail/OwnerInfo";
import Repo from "./RepoInfo/Repo";
import LanguageChart from "./RepoInfo/LanguageChart";
import ButtonArea from "./UserSetting/ButtonArea";

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
    }, [setShowRepoInfoDialog]);

    useEffect(() => {
        if (!repoInfo) return;

        getLanguages({ user: repoInfo.owner.login, repo: repoInfo.name });
    }, [repoInfo]);

    /*
    Repo 명
    Owner 명
    사용 Language -> 원차트?
    토픽
    Repo 주소
    */

    if (!repoInfo) return null;

    return (
        <>
            <Dialog open={showRepoInfoDialog} onClose={onClose} maxWidth={"lg"}>
                <DialogTitle>Repo Information</DialogTitle>
                <Divider />
                <DialogContent>
                    <DialogContainer>
                        <div className="leftArea">
                            <OwnerInfo
                                imgSrc={repoInfo.owner.avatar_url}
                                ownerName={repoInfo.owner.login}
                                url={repoInfo.html_url}
                            />

                            <Tooltip title="stars" placement="right">
                                <div className="itemCountBox">
                                    <div className="icon">
                                        <StarOutlineIcon />
                                    </div>
                                    <div className="text">
                                        {repoInfo.stargazers_count}{" "}
                                    </div>
                                </div>
                            </Tooltip>
                            <Tooltip title="watching" placement="right">
                                <div className="itemCountBox">
                                    <div className="icon">
                                        <VisibilityOutlinedIcon />
                                    </div>
                                    <div className="text">
                                        {repoInfo.watchers_count}
                                    </div>
                                </div>
                            </Tooltip>
                            <Tooltip title="forks" placement="right">
                                <div className="itemCountBox">
                                    <div className="icon">
                                        <AccountTreeOutlinedIcon />{" "}
                                    </div>
                                    <div className="text">
                                        {repoInfo.forks_count}
                                    </div>
                                </div>
                            </Tooltip>
                            <Tooltip title="issues" placement="right">
                                <div className="itemCountBox">
                                    <div className="icon">
                                        <AdjustOutlinedIcon />{" "}
                                    </div>
                                    <div className="text">
                                        {repoInfo.open_issues_count}
                                    </div>
                                </div>
                            </Tooltip>
                        </div>
                        <div className="rightArea">
                            <Repo
                                name={repoInfo.name}
                                topics={repoInfo.topics}
                                description={repoInfo.description}
                            />
                            <LanguageChart
                                getLanguagesResult={getLanguagesResult}
                            />
                        </div>
                    </DialogContainer>
                    <Divider />
                    <ButtonArea onClose={onClose} />
                    {/* <div className="ButtonArea">
                        <Button onClick={onClose}>Close</Button>
                    </div> */}
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

    .userImage {
        width: 200px;
        height: 200px;
    }

    .userImage img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
    }

    .itemCountBox,
    .repoLink,
    .userName {
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .itemCountBox {
        justify-content: space-between;
        width: 100px;

        test-align: left;
    }

    .itemCountBox > div {
        flex: 1;
    }

    .repoTopics > div {
        flex-wrap: wrap;
        row-gap: 5px;
    }
`;

export default RepoInfo;
