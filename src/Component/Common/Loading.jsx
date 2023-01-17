import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Loading = () => {
    return (
        <LoadingBlock>
            <div className="loadingContent">
                <CircularProgress />
            </div>
        </LoadingBlock>
    );
};

const LoadingBlock = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    .loadingContent {
        width: 100px;
        height: 80px;

        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #85858547;

        border-radius: 10%;
    }
`;
export default Loading;
