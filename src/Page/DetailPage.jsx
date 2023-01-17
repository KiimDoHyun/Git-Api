import {
    Card,
    CardContent,
    Divider,
    Link,
    Pagination,
    Typography,
} from "@mui/material";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getIssueApi } from "../Api/git";
import useAxios from "../Hook/useAxios";

const DetailPage = () => {
    const location = useLocation();

    const [getIssueResult, getIssue] = useAxios(getIssueApi);

    // 검색 Page
    const [searchPage, setSearchPage] = useState(-1);

    // Issue Pagination onChange 이벤트
    const onChangeSearchPage = useCallback(
        (_, value) => {
            setSearchPage(value);

            const { state } = location;
            const user = state.owner.login;
            const repo = state.name;

            getIssue({ user, repo, page: value });
        },
        [location]
    );
    /*
    필수
    선택된 Repo의 issue가 보여야 한다.

    각 issue는 제목, repo 명이 필수로 보여져야 한다

    issue의 내용이 길 수 있으니 높이는 가변으로 한다.
    */
    useEffect(() => {
        const { state } = location;
        const user = state.owner.login;
        const repo = state.name;

        getIssue({ user, repo, page: 1 });
        setSearchPage(1);
    }, [location]);

    console.log("getIssueResult: ", getIssueResult);

    return (
        <DetailPageBlock>
            <div className="ownerInfo">
                {/* 저장소 주인 이미지 */}
                <div className="imageCover">
                    <img
                        src={location.state.owner.avatar_url}
                        alt="userImage"
                    />
                </div>

                {/* 저장소 주인 이름 */}
                <Typography gutterBottom variant="h5" component="div">
                    {location.state.owner.login}
                </Typography>

                {/* 저장소 주인 링크 */}
                <Link
                    target={"_blank"}
                    href={location.state.owner.html_url}
                    underline="none"
                >
                    Visit Repository
                </Link>
            </div>
            <Divider orientation="vertical" />
            <div className="issue">
                <div className="issueList">
                    {getIssueResult.data?.map((item) => (
                        <Card className="repoItem" key={item.id}>
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h4"
                                    component="div"
                                >
                                    {location.state.name}
                                </Typography>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    {item.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {item.user.login}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="pagerArea">
                    <Pagination
                        page={searchPage}
                        count={40}
                        onChange={onChangeSearchPage}
                    />
                </div>
            </div>
        </DetailPageBlock>
    );
};

const DetailPageBlock = styled.div`
    padding: 10px;
    box-sizing: border-box;

    flex: 6;
    background-color: #f6f8fa;

    display: flex;

    gap: 5px;

    .issue,
    .ownerInfo {
        height: 100%;

        padding: 10px;
        box-sizing: border-box;
    }

    .ownerInfo {
        flex: 1;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }

    .imageCover {
        width: 300px;
        heigth: 300px;
    }

    .imageCover img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
        border: 1px solid rgba(27, 31, 36, 0.15);
    }

    .issue {
        flex: 3;

        display: grid;
        grid-template-rows: 1fr 50px;
        gap: 10px;
    }

    .issueList {
        width: 100%;
        flex: 9;
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);

        overflow: scroll;

        padding: 10px 0;
        box-sizing: border-box;
    }

    .pagerArea {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .repoItem {
        width: 100%;
        height: auto;

        margin-bottom: 10px;
    }
`;
export default DetailPage;
