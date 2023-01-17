import { Pagination, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { ID_SEARCH_RESULT_AREA } from "../../Common/common";
import {
    rc_repo_savedRepoList,
    rc_repo_searchRepoList,
    rc_repo_searchRepoList_pageCount,
    re_repo_searchPage,
    re_repo_searchPageIsLoading,
} from "../../Store/repo";
import CommonListItem from "../Common/CommonListItem";
import Loading from "../Common/Loading";
import NoData from "../Common/NoData";

const SearchRepoList = ({ saveTargetRef }) => {
    // 검색 Page
    const [searchPage, setSearchPage] = useRecoilState(re_repo_searchPage);

    // 저장된 repo 리스트
    const savedRepoList = useRecoilValue(rc_repo_savedRepoList);

    // 조회 결과 리스트
    const searchRepoList = useRecoilValue(rc_repo_searchRepoList);

    // 리스트 조회 결과로 새성되는 Pagination 개수
    const searchRepoListPageCount = useRecoilValue(
        rc_repo_searchRepoList_pageCount
    );

    // 로딩 상태
    const searchPageIsLoading = useRecoilValue(re_repo_searchPageIsLoading);

    // 아이템 onMouseDown 이벤트
    const onMouseDown = useCallback((item) => {
        saveTargetRef.current = item;
    }, []);

    // Repo Pagination onChange 이벤트
    const onChangeSearchPage = useCallback((_, value) => {
        setSearchPage(value);
    }, []);

    useEffect(() => {
        const data = JSON.stringify(savedRepoList);
        window.localStorage.setItem("repoList", data);
    }, [savedRepoList]);

    return (
        <SearchRepoListBlock
            isNoData={searchRepoList.length > 0 ? false : true}
        >
            {/* <Loading /> */}
            {searchPageIsLoading && <Loading />}
            <Droppable droppableId={ID_SEARCH_RESULT_AREA}>
                {(provided) => (
                    <div
                        className="listArea"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {searchRepoList.length > 0 ? (
                            searchRepoList.map((item, idx) => {
                                // 현재 조회된 아이템이 이미 저장된 리스트에 존재한다면 표시하지 않는다.
                                const isDup = savedRepoList.find(
                                    (findItem) => findItem.id === item.id
                                );

                                if (isDup) {
                                    return null;
                                } else {
                                    return (
                                        <Draggable
                                            key={item.id}
                                            draggableId={String(item.id)}
                                            index={idx}
                                        >
                                            {(provided, snapshotDG) => (
                                                <CommonListItem
                                                    provided={provided}
                                                    snapshot={snapshotDG}
                                                    onMouseDown={onMouseDown(
                                                        item
                                                    )}
                                                    title={item.name}
                                                    content={item.owner.login}
                                                />
                                            )}
                                        </Draggable>
                                    );
                                }
                            })
                        ) : (
                            <NoData text={"No Results"} />
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <div className="pagerArea">
                <Pagination
                    page={searchPage}
                    count={searchRepoListPageCount}
                    onChange={onChangeSearchPage}
                />
            </div>
        </SearchRepoListBlock>
    );
};

const SearchRepoListBlock = styled.div`
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 50px;
    gap: 10px;
    position: relative;

    overflow: hidden;

    .listArea {
        ${(props) =>
            props.isNoData
                ? ""
                : "display: grid; gap: 10px; grid-template-columns: 1fr 1fr 1fr;"}

        overflow: scroll;

        border-top: 1px solid rgba(0, 0, 0, 0.12);
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);

        padding: 10px;
        box-sizing: border-box;

        align-content: baseline;
        justify-items: unset;
        row-gap: 20px;
    }
`;
export default SearchRepoList;
