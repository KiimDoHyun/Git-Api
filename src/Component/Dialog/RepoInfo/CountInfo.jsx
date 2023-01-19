import { Tooltip } from "@mui/material";
import React from "react";
import styled from "styled-components";

const CountInfo = ({ title, IconComponet, count }) => {
    return (
        <Tooltip title={title} placement="right">
            <CountInfoBlock>
                <div className="icon">
                    <IconComponet />
                </div>
                <div className="text">{count}</div>
            </CountInfoBlock>
        </Tooltip>
    );
};

const CountInfoBlock = styled.div`
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100px;

    test-align: left;

    > div {
        flex: 1;
    }
`;
export default React.memo(CountInfo);
