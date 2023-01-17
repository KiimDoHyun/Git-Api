import { Card, CardContent, Pagination, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { ID_SEARCH_RESULT_AREA } from "../../Common/common";
import useOnDrag from "../../Hook/useOnDrag";
import {
    rc_repo_savedRepoList,
    rc_repo_searchRepoList,
    rc_repo_searchRepoList_pageCount,
    re_repo_searchPage,
} from "../../Store/repo";

const SearchRepoListComponent = ({ saveTargetRef }) => {
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
        <>
            <Droppable droppableId={ID_SEARCH_RESULT_AREA}>
                {(provided, snapshot) => (
                    <SearchRepoListComponentBlock
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {searchRepoList.map((item, idx) => {
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
                                        {(provided) => (
                                            <Card
                                                className="repoItem"
                                                ref={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                                onMouseDown={() =>
                                                    onMouseDown(item)
                                                }
                                            >
                                                <CardContent>
                                                    <Typography
                                                        gutterBottom
                                                        variant="h5"
                                                        component="div"
                                                    >
                                                        {item.name}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        {item.owner.login}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        )}
                                    </Draggable>
                                );
                            }
                        })}
                        {provided.placeholder}
                    </SearchRepoListComponentBlock>
                )}
            </Droppable>
            <div className="pagerArea">
                <Pagination
                    page={searchPage}
                    count={searchRepoListPageCount}
                    onChange={onChangeSearchPage}
                />
            </div>
        </>
    );
};

const SearchRepoListComponentBlock = styled.div`
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr 1fr;
    overflow: scroll;

    border-top: 1px solid rgba(0, 0, 0, 0.12);
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);

    padding: 10px;
    box-sizing: border-box;
`;
export default SearchRepoListComponent;
