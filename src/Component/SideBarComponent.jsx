import React from "react";
import styled from "styled-components";

const SideBarComponent = () => {
    return (
        <SideBarComponentBlock>
            <div className="headerArea">
                <h2>My Repo List</h2>
            </div>
            <div className="contentsArea"></div>
        </SideBarComponentBlock>
    );
};

const SideBarComponentBlock = styled.div`
    padding: 10px;
    box-sizing: border-box;

    flex: 1;
    // width: 450px;

    text-align: left;
    display: flex;
    flex-direction: column;

    border-right: 1px solid rgba(0, 0, 0, 0.12);

    .headerArea {
        padding-left: 16px;
        flex: 1;
    }

    .contentsArea {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 9;
        position: relative;
    }

    .showArea {
        border: 2px solid #fff0;
        padding: 10px;
        box-sizing: border-box;

        min-height: 300px;
        min-width: 424px;
    }

    .activeSaveArea {
        border: 2px solid skyblue;
    }

    .showArea .repoItem {
        margin-bottom: 10px;
    }
    .deleteArea {
        // background-color: tomato;
        position: relative;

        transition: 0.3s;
        height: 200px;
        opacity: 0;

        border: 2px solid tomato;
        padding: 10px;
        box-sizing: border-box;
    }

    .IconCover {
        position: absolute;
        left: calc(50% - 30px);
        top: -60px;

        width: 50px;
        height: 50px;
        border-radius: 100%;

        display: flex;
        align-items: center;
        justify-content: center;

        transition: 0.3s;
        opacity: 0;
    }

    .saveIcon {
        background-color: skyblue;
    }
    .deleteIcon {
        background-color: tomato;
    }

    .activeDeleteArea {
        opacity: 1;
    }

    .activeSaveArea .IconCover,
    .activeDeleteArea .IconCover {
        opacity: 1;
    }

    .IconCover svg {
        fill: white;
    }
`;
export default SideBarComponent;
