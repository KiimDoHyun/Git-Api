import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { getIssueApi } from "../../Api/git";
import useAxios from "../../Hook/useAxios";
import Loading from "../Common/Loading";
import NoData from "../Common/NoData";
import PageArea from "../Common/PageArea";
import IssueListItem from "./IssueListItem";

const IssueList = ({ ownerName, repoName, open_issues_count }) => {
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
        <IssueListBlock>
            {getIssueResult.isLoading && <Loading />}
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
                    <NoData text={"No Issues"} />
                )}
            </div>
            <PageArea
                page={searchPage}
                count={open_issues_count}
                onChange={onChangeSearchPage}
            />
        </IssueListBlock>
    );
};

const IssueListBlock = styled.div`
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

    .repoItem {
        width: 100%;
        height: auto;

        margin-bottom: 10px;
        cursor: pointer;

        box-sizing: border-box;
        border: 2px solid #fff0;
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
export default IssueList;
