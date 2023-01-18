import { Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

const NoData = ({ text = "No Results" }) => {
    return (
        <NoDataBlock>
            <Typography variant="body2" color="text.secondary">
                {text}
            </Typography>
        </NoDataBlock>
    );
};

const NoDataBlock = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export default React.memo(NoData);
