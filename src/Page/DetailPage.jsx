import {
    Card,
    CardContent,
    Chip,
    Divider,
    Link,
    Pagination,
    Tooltip,
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

    // Issue 클릭
    const onClick = useCallback(({ html_url }) => {
        window.open(html_url, "_blank");
    }, []);

    useEffect(() => {
        const { state } = location;
        const user = state.owner.login;
        const repo = state.name;

        getIssue({ user, repo, page: 1 });
        setSearchPage(1);
    }, [location]);

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
                <Tooltip title="클릭하면 해당 저장소로 이동합니다.">
                    <Link
                        target={"_blank"}
                        href={location.state.owner.html_url}
                        underline="none"
                    >
                        Visit Repository
                    </Link>
                </Tooltip>
            </div>
            <Divider orientation="vertical" />
            <div className="issue">
                <div className="issueList">
                    {getIssueResult.data?.map((item) => (
                        <Tooltip
                            key={item.id}
                            title="클릭하면 해당 Issue 페이지로 이동합니다."
                        >
                            <Card
                                className="repoItem"
                                onClick={() => onClick(item)}
                            >
                                <CardContent>
                                    {/* Repo 명 */}
                                    <Typography
                                        gutterBottom
                                        variant="h4"
                                        component="div"
                                    >
                                        {location.state.name}
                                    </Typography>

                                    {/* 이슈 제목 */}
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                    >
                                        {item.title}
                                    </Typography>

                                    {/* 이슈 라벨 */}
                                    <div className="issueLabel">
                                        {item.labels.map((item, idx) => (
                                            <Chip
                                                key={idx}
                                                label={item.name}
                                                style={{
                                                    backgroundColor: `#${item.color}`,
                                                }}
                                            />
                                        ))}
                                    </div>
                                    {/* <Card */}

                                    {/* 이슈 생성자 */}
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        component="div"
                                        className="issueWriter"
                                    >
                                        <img
                                            src={item.user.avatar_url}
                                            alt="issueWriter"
                                        />
                                        {item.user.login}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Tooltip>
                    ))}
                </div>
                <div className="pagerArea">
                    <Pagination
                        page={searchPage}
                        count={Math.ceil(location.state.open_issues_count / 30)}
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
        cursor: pointer;

        box-sizing: border-box;
        border: 2px solid #fff0;

        transition: 0.2s;
    }

    .repoItem:hover {
        border: 2px solid darkseagreen;
    }

    .issueWriter {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .issueWriter img {
        width: 20px;
        height: 20px;
        border-radius: 100%;
    }

    .issueLabel {
        margin: 10px 0;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
`;
export default DetailPage;
