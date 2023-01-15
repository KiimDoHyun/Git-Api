import React from "react";
import styled from "styled-components";

const TestDnDPage = () => {
    return (
        <TestDnDPageBlock>
            <div className="Area1">
                <div className="box" />
                <div className="box" />
                <div className="box" />
                <div className="box" />
            </div>
            <div className="Area2">
                <div className="box" />
                <div className="box" />
            </div>
        </TestDnDPageBlock>
    );
};

const TestDnDPageBlock = styled.div`
    width: 100vw;
    height: 100vh;

    padding: 50px;

    box-sizing: border-box;

    display: flex;

    gap: 20px;

    .Area1,
    .Area2 {
        flex: 1;

        border: 1px solid;
        padding: 20px;
        box-sizing: border-box;
    }

    .box {
        width: 100%;
        height: 100px;
        background-color: blue;
        margin-bottom: 20px;
    }
`;
export default TestDnDPage;
