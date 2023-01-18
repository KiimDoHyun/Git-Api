import { Button, Tooltip } from "@mui/material";
import React from "react";
import styled from "styled-components";

const ButtonArea = ({ onClickOK, onClose }) => {
    return (
        <ButtonAreaBlock>
            <Tooltip title="사용자 변경을 적용합니다.">
                <Button onClick={onClickOK}>Apply</Button>
            </Tooltip>
            <Tooltip title="사용자 변경을 적용하지 않습니다.">
                <Button onClick={onClose}>Close</Button>
            </Tooltip>
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
