import { Tooltip } from "@mui/material";
import React from "react";
import styled from "styled-components";

const CountInfo = ({ title, Icon, count }) => {
    console.log("Icon: ", Icon);
    return (
        <Tooltip title={title}>
            <CountInfoBlock>
                <Icon />
                {count}
            </CountInfoBlock>
        </Tooltip>
    );
};

const CountInfoBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100px;

    test-align: left;
`;
export default React.memo(CountInfo);
