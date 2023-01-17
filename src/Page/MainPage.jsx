import React from "react";
import styled from "styled-components";
import SearchComponent from "../Component/Main/SearchComponent";
import SearchRepoListComponent from "../Component/Main/SearchRepoListComponent";

const MainPage = ({ saveTargetRef }) => {
    return (
        <MainPageBlock>
            {/* 검색 영역 */}
            <SearchComponent />

            {/* Repo 조회 결과 영역 */}
            <SearchRepoListComponent saveTargetRef={saveTargetRef} />
        </MainPageBlock>
    );
};

const MainPageBlock = styled.div`
    padding: 10px;
    box-sizing: border-box;

    flex: 6;
    background-color: #f6f8fa;

    display: grid;
    grid-template-rows: 50px 1fr 50px;

    gap: 10px;

    .repoListArea {
        display: grid;
        gap: 10px;
        grid-template-columns: 1fr 1fr 1fr;
        overflow: scroll;

        border-top: 1px solid rgba(0, 0, 0, 0.12);
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);

        padding: 10px;
        box-sizing: border-box;
    }

    .pagerArea {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const SavedAreaBlock = styled.div`
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
const RepoListAreaBlock = styled.div``;
export default MainPage;
