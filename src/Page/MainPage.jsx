import React from "react";
import styled from "styled-components";
import SearchArea from "../Component/Main/SearchArea";
import SearchRepoListArea from "../Component/Main/SearchRepoListArea";

const MainPage = ({ saveTargetRef }) => {
    return (
        <MainPageBlock>
            {/* 검색 영역 */}
            <SearchArea />

            {/* Repo 조회 결과 영역 */}
            <SearchRepoListArea saveTargetRef={saveTargetRef} />
        </MainPageBlock>
    );
};

const MainPageBlock = styled.div`
    padding: 10px;
    box-sizing: border-box;

    flex: 6;
    background-color: #f6f8fa;

    display: grid;
    grid-template-rows: 50px 1fr;

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
`;
export default MainPage;
