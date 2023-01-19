import {
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

const RepoInfo = () => {
    // Dialog 활성화 변수
    const [showRepoInfoDialog, setShowRepoInfoDialog] = useRecoilState(
        rc_user_showRepoInfoDialog
    );

    // 클릭된 Repo 정보
    const [repoInfo, setRepoInfo] = useRecoilState(rc_user_RepoInfo);

    // Repo Language 조회
    const [getLanguagesResult, getLanguages] = useAxios(getLanguagesApi);

    // 차트 값
    const [series, setSeries] = useState([]);

    // 차트 설정
    const [options, setOptions] = useState({
        chart: {
            width: 300,
            type: "plaryArea",
        },
    });

    console.log("repoInfo: ", repoInfo);
    // 닫기
    const onClose = useCallback(() => {
        setShowRepoInfoDialog(false);
        setRepoInfo(null);
    }, [setShowRepoInfoDialog]);

    useEffect(() => {
        if (!repoInfo) return;

        getLanguages({ user: repoInfo.owner.login, repo: repoInfo.name });
        console.log("repo 명: ", repoInfo.name);
        console.log("repo 주소: ", repoInfo.html_url);
        console.log("repo 설명: ", repoInfo.description);
        console.log("Onwer 명: ", repoInfo.owner.login);
        console.log("Onwer 이미지: ", repoInfo.owner.avatar_url);
        console.log("언어: ", repoInfo.languages_url);
        console.log("토픽: ", repoInfo.topics);
        console.log("이슈 카운트: ", repoInfo.open_issues_count);
        console.log("포크 카운트: ", repoInfo.forks_count);
        console.log("watcher 카운트: ", repoInfo.watchers_count);
        console.log("start 카운트: ", repoInfo.stargazers_count);
    }, [repoInfo]);

    /*
    Repo 명
    Owner 명
    사용 Language -> 원차트?
    토픽
    Repo 주소
    */
    useEffect(() => {
        if (getLanguagesResult.isLoading) return;

        if (getLanguagesResult.data) {
            const { data } = getLanguagesResult;

            const tempSeries = [];
            const tempLabels = [];
            for (const language in data) {
                tempSeries.push(data[language]);
                tempLabels.push(language);
            }

            setSeries(tempSeries.slice(0, 5));
            setOptions({
                chart: {
                    width: 300,
                    type: "pie",
                },
                labels: tempLabels.slice(0, 5),
                fill: {
                    opacity: 1,
                },
                stroke: {
                    width: 1,
                    colors: undefined,
                },
                yaxis: {
                    show: false,
                },
                legend: {
                    position: "bottom",
                },
            });
        }
    }, [getLanguagesResult]);

    useEffect(() => {
        if (!showRepoInfoDialog) {
            setSeries([]);
            setOptions({});
        }
    }, [showRepoInfoDialog]);

    if (!repoInfo) return null;

    return (
        <>
            <Dialog open={showRepoInfoDialog} onClose={onClose} maxWidth={600}>
                <DialogTitle>Repo Information</DialogTitle>
                <Divider />
                <DialogContent>
                    <DialogContainer>
                        <div className="leftArea">
                            <div className="userImage">
                                <img
                                    src={repoInfo.owner.avatar_url}
                                    alt="userImage"
                                />
                            </div>
                            <div className="userName">
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {repoInfo.owner.login}
                                </Typography>
                            </div>
                            <div className="repoLink">
                                <Tooltip title="클릭하면 해당 저장소로 이동합니다.">
                                    <Link
                                        target={"_blank"}
                                        href={repoInfo.html_url}
                                        underline="none"
                                    >
                                        Visit Repository
                                    </Link>
                                </Tooltip>
                            </div>
                            <div className="itemCountBox">
                                <StarOutlineIcon /> {repoInfo.stargazers_count}{" "}
                                stars
                            </div>
                            <Typography variant="body2" color="text.secondary">
                                <VisibilityOutlinedIcon />
                                {repoInfo.stargazers_count} watching
                            </Typography>
                            <div className="itemCountBox">
                                <AccountTreeOutlinedIcon />{" "}
                                {repoInfo.stargazers_count} forks
                            </div>
                            <div className="itemCountBox">
                                <AdjustOutlinedIcon />{" "}
                                {repoInfo.stargazers_count} issues
                            </div>
                        </div>
                        <div className="rightArea">
                            <div className="repoName">
                                <Typography variant="h4" color="text.primary">
                                    {repoInfo.name}
                                </Typography>
                            </div>
                            <div className="repoTopics">
                                <Stack direction={"row"} spacing={1}>
                                    {repoInfo.topics.map((item, idx) => (
                                        <Chip label={item} key={idx} />
                                    ))}
                                </Stack>
                            </div>
                            <div className="repoDesc">
                                {repoInfo.description}
                            </div>
                            <div className="repoLanguages">
                                {getLanguagesResult.isLoading ? (
                                    <Loading />
                                ) : (
                                    <ReactApexChart
                                        options={options}
                                        series={series}
                                        type="pie"
                                    />
                                )}
                            </div>
                        </div>
                    </DialogContainer>
                </DialogContent>
            </Dialog>
        </>
    );
};

const DialogContainer = styled.div`
    display: flex;
    gap: 20px;

    div > div {
        // background-color: lightgray;
    }
    .leftArea,
    .rightArea {
        width: 400px;
        flex: 1;

        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
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

    .repoLanguages {
        position: relative;
        width: 300px;
        height: 300px;
    }

    .repoTopics > div {
        flex-wrap: wrap;
        row-gap: 5px;
    }
`;

export default RepoInfo;
