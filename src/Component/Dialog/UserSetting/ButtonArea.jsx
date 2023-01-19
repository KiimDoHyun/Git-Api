import { Button, Tooltip } from "@mui/material";
import React from "react";
import styled from "styled-components";

const ButtonArea = ({ onClickOK, onClose, ApplyTitle, CloseTitle }) => {
    return (
        <ButtonAreaBlock>
            {onClickOK && (
                <Tooltip title={ApplyTitle}>
                    <Button onClick={onClickOK}>Apply</Button>
                </Tooltip>
            )}
            {onClose && (
                <Tooltip title={CloseTitle}>
                    <Button onClick={onClose}>Close</Button>
                </Tooltip>
            )}
        </ButtonAreaBlock>
    );
};

const ButtonAreaBlock = styled.div`
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`;
export default React.memo(ButtonArea);
