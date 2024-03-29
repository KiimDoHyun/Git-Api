import React, { useCallback, useEffect } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ID_SEARCH_RESULT_AREA, setLocalStorage } from "../../Common/common";
import {
    rc_repo_savedRepoList,
    rc_repo_searchRepoList,
    rc_repo_searchRepoList_pageCount,
    rc_user_RepoInfo,
    rc_user_showRepoInfoDialog,
    re_repo_searchPage,
    re_repo_searchPageIsLoading,
} from "../../Store/repo";
import { rc_user_user } from "../../Store/user";
import CommonListItem from "../Common/CommonListItem";
import Loading from "../Common/Loading";
import NoData from "../Common/NoData";
import PageArea from "../Common/PageArea";

const SearchRepoListArea = ({ saveTargetRef }) => {
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

    const setShowRepoInfoDialog = useSetRecoilState(rc_user_showRepoInfoDialog);
    const setRepoInfo = useSetRecoilState(rc_user_RepoInfo);

    // 아이템 onClick 이벤트
    const onClickItem = useCallback(
        (item) => {
            setShowRepoInfoDialog(true);
            setRepoInfo(item);
        },
        [setShowRepoInfoDialog, setRepoInfo]
    );

    // 아이템 onMouseDown 이벤트
    const onMouseDown = useCallback(
        (item) => {
            saveTargetRef.current = item;
        },
        [saveTargetRef]
    );

    // Repo Pagination onChange 이벤트
    const onChangeSearchPage = useCallback(
        (_, value) => {
            setSearchPage(value);
        },
        [setSearchPage]
    );

    // 현재 사용자
    const currentUser = useRecoilValue(rc_user_user);

    useEffect(() => {
        if (!currentUser) return;

        setLocalStorage(`${currentUser}_repoList`, savedRepoList);
    }, [currentUser, savedRepoList]);

    return (
        <SearchRepoListAreaBlock
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
                            searchRepoList.map(
                                (item, idx) =>
                                    !savedRepoList.find(
                                        (findItem) => findItem.id === item.id
                                    ) && (
                                        <Draggable
                                            key={item.id}
                                            draggableId={String(item.id)}
                                            index={idx}
                                        >
                                            {(provided, snapshotDG) => (
                                                <CommonListItem
                                                    provided={provided}
                                                    snapshot={snapshotDG}
                                                    tooltipTitle={
                                                        "드래그해서 저장할 수 있습니다."
                                                    }
                                                    onMouseDown={onMouseDown(
                                                        item
                                                    )}
                                                    onClick={() =>
                                                        onClickItem(item)
                                                    }
                                                    userImage={
                                                        item.owner.avatar_url
                                                    }
                                                    title={item.name}
                                                    content={item.owner.login}
                                                />
                                            )}
                                        </Draggable>
                                    )
                            )
                        ) : (
                            <NoData text={"No Results"} />
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <PageArea
                page={searchPage}
                count={searchRepoListPageCount}
                onChange={onChangeSearchPage}
            />
        </SearchRepoListAreaBlock>
    );
};

const SearchRepoListAreaBlock = styled.div`
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
export default SearchRepoListArea;
