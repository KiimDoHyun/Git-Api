import { Divider } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import IssueList from "../Component/Detail/IssueList";
import OwnerInfo from "../Component/Detail/OwnerInfo";

const DetailPage = () => {
    const location = useLocation();

    const {
        state: {
            name,
            open_issues_count,
            owner: { avatar_url, login, html_url },
        },
    } = location;

    return (
        <DetailPageBlock>
            <OwnerInfo imgSrc={avatar_url} ownerName={login} url={html_url} />

            <Divider orientation="vertical" />

            <IssueList
                ownerName={login}
                repoName={name}
                open_issues_count={open_issues_count}
            />
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
`;
export default DetailPage;
