import { Button } from "@mui/material";
import React from "react";
import styled from "styled-components";

const ButtonArea = ({ onClickOK, onClose }) => {
    return (
        <ButtonAreaBlock>
            <Button onClick={onClickOK}>적용하기</Button>
            <Button onClick={onClose}>닫기</Button>
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
