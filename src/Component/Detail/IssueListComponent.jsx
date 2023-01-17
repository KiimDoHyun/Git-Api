import {
    CircularProgress,
    Pagination,
    Skeleton,
    Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { getIssueApi } from "../../Api/git";
import useAxios from "../../Hook/useAxios";
import IssueListItem from "./IssueListItem";

const IssueListComponent = ({ ownerName, repoName, open_issues_count }) => {
    const [getIssueResult, getIssue] = useAxios(getIssueApi);

    // 검색 Page
    const [searchPage, setSearchPage] = useState(1);

    // Issue Pagination onChange 이벤트
    const onChangeSearchPage = useCallback(
        (_, value) => {
            setSearchPage(value);

            getIssue({ user: ownerName, repo: repoName, page: value });
        },
        [ownerName, repoName]
    );

    // Issue 클릭
    const onClick = useCallback((html_url) => {
        window.open(html_url, "_blank");
    }, []);

    useEffect(() => {
        getIssue({ user: ownerName, repo: repoName, page: 1 });
        setSearchPage(1);
    }, [ownerName, repoName]);

    return (
        <IssueListComponentBlock>
            {getIssueResult.isLoading && (
                <div className="loading">
                    <div className="loadingContent">
                        <CircularProgress />
                    </div>
                </div>
            )}
            <div className="issueList">
                {getIssueResult.data && getIssueResult.data.length > 0 ? (
                    getIssueResult.data.map((item) => (
                        <IssueListItem
                            key={item.id}
                            title={"클릭하면 해당 Issue 페이지로 이동합니다."}
                            onClick={() => onClick(item.html_url)}
                            repoName={repoName}
                            issueTitle={item.title}
                            labels={item.labels}
                            userImage={item.user.avatar_url}
                            userName={item.user.login}
                        />
                    ))
                ) : (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        component="div"
                        className="noData"
                    >
                        No Issues
                    </Typography>
                )}
            </div>
            <div className="pagerArea">
                <Pagination
                    page={searchPage}
                    count={Math.ceil(open_issues_count / 30)}
                    onChange={onChangeSearchPage}
                />
            </div>
        </IssueListComponentBlock>
    );
};

const IssueListComponentBlock = styled.div`
    height: 100%;

    padding: 10px;
    box-sizing: border-box;

    flex: 3;

    display: grid;
    grid-template-rows: 1fr 50px;
    gap: 10px;
    position: relative;

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

    .loading {
        position: absolute;
        width: 100%;
        height: 100%;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .loadingContent {
        width: 100px;
        height: 80px;

        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #85858547;

        border-radius: 10%;
    }

    .noData {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
export default IssueListComponent;
