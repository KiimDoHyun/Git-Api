import { Divider } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import IssueListComponent from "../Component/Detail/IssueListComponent";
import OwnerInfoComponent from "../Component/Detail/OwnerInfoComponent";

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
            <OwnerInfoComponent
                imgSrc={avatar_url}
                ownerName={login}
                url={html_url}
            />

            <Divider orientation="vertical" />

            <IssueListComponent
                ownerName={login}
                repoName={name}
                open_issues_count={open_issues_count}
            />
            <div className="issue"></div>
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
