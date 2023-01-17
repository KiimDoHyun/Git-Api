import {
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    Divider,
    Input,
    InputLabel,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Pagination,
    Paper,
    Typography,
} from "@mui/material";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { getIssueApi, getRepoApi } from "../Api/git";
import useAxios from "../Hook/useAxios";
import {
    rc_repo_savedRepoList,
    rc_repo_searchRepoList,
    rc_repo_searchRepoList_pageCount,
    re_repo_searchPage,
} from "../Store/repo";
import SearchIcon from "@mui/icons-material/Search";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSnackbar } from "notistack";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveIcon from "@mui/icons-material/Save";
import SearchComponent from "../Component/Main/SearchComponent";

const ID_SAVED_AREA = "SAVED_AREA";
const ID_SEARCH_RESULT_AREA = "SEARCH_RESULT_AREA";
const ID_DELETE_AREA = "DELETE_AREA";

const MainPage = () => {
    const [searchPage, setSearchPage] = useRecoilState(re_repo_searchPage);

    // 저장된 repo 리스트
    const [savedRepoList, setSavedRepoList] = useRecoilState(
        rc_repo_savedRepoList
    );

    // 조회 결과 리스트
    const searchRepoList = useRecoilValue(rc_repo_searchRepoList);

    // 리스트 조회 결과로 새성되는 Pagination 개수
    const searchRepoListPageCount = useRecoilValue(
        rc_repo_searchRepoList_pageCount
    );

    // Repo 조회 page
    const onChangeSearchPage = useCallback((_, value) => {
        setSearchPage(value);
    }, []);

    // 이슈 조회 page
    // const onChangeIssuePage = useCallback((_, value) => {
    //     setSearchIssuePage(value);
    // }, []);

    // 저장된 리스트 클릭
    /*
    클릭했을때 이슈를 조회하는것으로 우선 구현함
    */
    // const onClickDetail = useCallback((item) => {
    //     console.log("item: ", item);
    //     const user = item.owner.login;
    //     const repo = item.name;
    //     setCurrentDetailRepo(item);

    //     setSearchIssueUser(user);
    //     setSearchIssueRepo(repo);
    //     setSelectedRepoName(repo);
    //     setSearchIssuePage(1);

    //     setSelectedRepoURL(item.html_url);

    //     setOpenDialog(true);
    // }, []);

    // const onClickIssueList = useCallback(() => {
    //     console.log("selectedRepoURL: ", selectedRepoURL);
    //     if (window.confirm("해당 저장소로 이동하시겠습니까?")) {
    //         window.open(selectedRepoURL);
    //     }
    // }, [selectedRepoURL]);

    // 저장, 삭제가 발생하면 localStorage의 데이터를 수정한다.
    useEffect(() => {
        const data = JSON.stringify(savedRepoList);
        window.localStorage.setItem("repoList", data);
    }, [savedRepoList]);

    // Repo 조회
    // useEffect(() => {
    //     if (!searchValue) return;

    //     // search!
    //     getSearchRepo({ searchParams: searchValue, page: searchPage });
    // }, [searchPage, searchValue]);

    // Issue 조회
    // useEffect(() => {
    //     if (!openDialog || !searchIssueUser || !searchIssueRepo) return;

    //     getIssueRepo({
    //         user: searchIssueUser,
    //         repo: searchIssueRepo,
    //         page: searchIssuePage,
    //     });
    // }, [openDialog, searchIssuePage, searchIssueUser, searchIssueRepo]);

    //
    /*
    이슈개수 정보는 해당 Repo 에 존재함
    
    저장된 Repo 정보는 변하지 않기 때문에

    새로 조회하는 과정이 필요할 듯

    이슈 조회는 현재 Open 상태 이슈만 가져옴 -> 테스트 완료
    open_issues_count
     */
    // const issuePageCount = useMemo(() => {
    //     if (!currentDetailRepo) return 0;

    //     return Math.ceil(currentDetailRepo.open_issues_count / 30);
    // }, [currentDetailRepo]);

    // 드래그 관련
    const dragInfo = useRef({ start: null, end: null });
    const { enqueueSnackbar } = useSnackbar();

    /*
    정상적인 이동에 해당하는 경우

    1. 조회된 영역에서 저장된 영역으로 이동하는 경우 (저장하기 기능에 해당한다.)
    2. 저장된 영역에서 제거 영역으로 이동하는 경우 (삭제하기 기능에 해당한다.)
    3. 저장된 영역에서 저장된 영역으로 이동하는 경우 (+ 순서 변경에 해당한다.)
    */
    // 이동 체크
    const checkMovement = useCallback((start, end) => {
        let type = "ERROR";
        let msg = "";

        // 에러
        if (start === ID_SEARCH_RESULT_AREA && end === ID_SEARCH_RESULT_AREA) {
            type = "ERROR";
            msg = "조회된 데이터의 순서는 변경할 수 없습니다.";
        } else if (start === ID_SAVED_AREA && end === ID_SEARCH_RESULT_AREA) {
            type = "ERROR";
            msg = "이미 저장된 데이터를 조회 영역으로 이동할 수 없습니다.";
        }
        // 정상 이동
        // 1번 경우에 해당함
        else if (start === ID_SEARCH_RESULT_AREA && end === ID_SAVED_AREA) {
            type = "SAVE";
            msg = "데이터가 저장되었습니다.";
        }
        // 2번 경우에 해당함
        else if (start === ID_SAVED_AREA && end === ID_DELETE_AREA) {
            type = "DELETE";
            msg = "데이터가 제거되었습니다.";
        }
        // 3번 경우에 해당함
        else if (start === ID_SAVED_AREA && end === ID_SAVED_AREA) {
            type = "REORDER";
            msg = "데이터의 순서가 변경되었습니다.";
        } else {
            type = "ERROR";
            msg = "잘못된 이동입니다.";
        }

        return { type, msg };
    }, []);

    // useEffect(() => {
    //     if (getRepoResult.data) {
    //         // setRepoSearchResult(getRepoResult.data.items);
    //         // 조회 영역의 중복 데이터 제거
    //         // 드래드그앤 드롭이벤트와 중복해서 발생중임
    //         setRepoSearchResult(
    //             getRepoResult.data.items.filter(
    //                 (filterItem) =>
    //                     !repoList.find(
    //                         (findItem) => findItem.id === filterItem.id
    //                     )
    //             )
    //         );
    //     } else {
    //         setRepoSearchResult([]);
    //     }
    // }, [repoList, getRepoResult]);

    // 삭제영역
    const [showDeleteArea, setShowDeleteArea] = useState(false);
    const [showSaveArea, setShowSaveArea] = useState(false);
    // const onDragStart = useCallback((e) => {
    //     // onDragEnd에서 사용하기 위해 현재 정보를 저장한다.
    //     dragInfo.current.start = e;

    //     const {
    //         source: { droppableId },
    //     } = e;

    //     // 저장 영역에서 드래그를 하는 경우 제거 영역을 표시해준다.
    //     if (droppableId === ID_SAVED_AREA) {
    //         setShowDeleteArea(true);
    //         console.log("저장영역에서 시작");
    //     }
    //     // 조회 영역에서 드래그를 하는 경우 저장 영역을 표시해 준다.
    //     else {
    //         setShowSaveArea(true);
    //         console.log("조회영역에서 시작");
    //     }
    // }, []);

    // const onDragEnd = useCallback(
    //     (e) => {
    //         const startID = dragInfo.current.start.source.droppableId;
    //         const endID = e.destination.droppableId;

    //         console.log("getRepoResult: ", getRepoResult);

    //         // 이동 체크
    //         const { type, msg } = checkMovement(startID, endID);

    //         switch (type) {
    //             case "ERROR":
    //                 enqueueSnackbar(msg, { variant: "warning" });
    //                 break;
    //             case "SAVE":
    //                 if (repoList.length === 4) {
    //                     enqueueSnackbar("최대 4개까지 저장 가능합니다.", {
    //                         variant: "warning",
    //                     });
    //                     break;
    //                 }
    //                 const listData = getRepoResult["data"]["items"] || [];
    //                 const target = listData.find(
    //                     (findItem) => String(findItem.id) === e.draggableId
    //                 );
    //                 const copySavedData1 = [...repoList];
    //                 copySavedData1.splice(e.destination.index, 0, target);

    //                 setRepoList(copySavedData1);

    //                 setRepoSearchResult((prevSearchData) =>
    //                     prevSearchData.filter(
    //                         (filterItem) =>
    //                             String(filterItem.id) !== e.draggableId
    //                     )
    //                 );
    //                 enqueueSnackbar(msg, { variant: "success" });
    //                 break;

    //             case "DELETE":
    //                 console.log("e: ", e);
    //                 console.log("repoList: ", repoList);
    //                 setRepoList((prevSavedData) =>
    //                     prevSavedData.filter(
    //                         (filterItem) =>
    //                             String(filterItem.id) !== e.draggableId
    //                     )
    //                 );
    //                 enqueueSnackbar(msg, { variant: "error" });
    //                 break;

    //             case "REORDER":
    //                 if (
    //                     dragInfo.current.start.source.index ===
    //                     e.destination.index
    //                 ) {
    //                     break;
    //                 }
    //                 const copySavedData2 = [...repoList];
    //                 const target2 =
    //                     copySavedData2[dragInfo.current.start.source.index];

    //                 copySavedData2.splice(
    //                     dragInfo.current.start.source.index,
    //                     1
    //                 );
    //                 copySavedData2.splice(e.destination.index, 0, target2);

    //                 setRepoList(copySavedData2);
    //                 enqueueSnackbar(msg, { variant: "info" });
    //                 break;

    //             default:
    //                 enqueueSnackbar(msg, { variant: "info" });
    //                 break;
    //         }
    //         setShowDeleteArea(false);
    //         setShowSaveArea(false);
    //     },
    //     [enqueueSnackbar, checkMovement, repoList, getRepoResult.data]
    // );

    return (
        <MainPageBlock>
            {/* <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}> */}
            {/* <SavedAreaBlock>
                    <div className="headerArea">
                        <h2>My Repo List</h2>
                    </div>
                    <div className="contentsArea">
                        <Droppable droppableId={ID_SAVED_AREA}>
                            {(provided, snapshot) => (
                                <div
                                    className={
                                        showSaveArea
                                            ? "showArea activeSaveArea"
                                            : "showArea"
                                    }
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <div className="IconCover saveIcon">
                                        <SaveIcon />
                                    </div>
                                    {repoList.map((item, idx) => (
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
                                                    onClick={() => alert("1")}
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
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <Divider />
                        <Droppable droppableId={ID_DELETE_AREA}>
                            {(provided, snapshot) => (
                                <div
                                    className={
                                        showDeleteArea
                                            ? "deleteArea activeDeleteArea"
                                            : "deleteArea"
                                    }
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {provided.placeholder}
                                    <div className="IconCover deleteIcon">
                                        <DeleteForeverIcon />
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    </div>
                </SavedAreaBlock> */}

            {/* <RepoListAreaBlock> */}

            <SearchComponent />
            {/* <div className="searchArea">
                    <form onSubmit={onSubmit}>
                        <InputLabel htmlFor="searchRepo"></InputLabel>
                        <Input
                            id="searchRepo"
                            placeholder="Repo Name"
                            name="searchRepo"
                            type="text"
                        />
                        <Button
                            variant="text"
                            type="submit"
                            size="small"
                            color="inherit"
                        >
                            <SearchIcon />
                        </Button>
                    </form>
                    <Typography variant="body2" color="text.secondary">
                        Result:{" "}
                        {getRepoResult.data
                            ? getRepoResult.data.total_count
                            : 0}
                    </Typography>
                </div> */}
            {/* Repo 조회 결과 영역 */}
            <Droppable droppableId={ID_SEARCH_RESULT_AREA}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="repoListArea"
                    >
                        {searchRepoList.map((item, idx) => (
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
                        ))}
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
            {/* </RepoListAreaBlock> */}

            {/* 특정 데이터 Issue 영역 */}
            {/* <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <div>
                    <List>
                        {getIssueResult.data?.map((item, idx) => (
                            <ListItem key={idx}>
                                <ListItemText
                                    primary={selectedRepoName}
                                    secondary={item.title}
                                />
                                <ListItemText onClick={onClickIssueList}>
                                    자세히
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                    <Pagination
                        page={searchIssuePage}
                        count={issuePageCount}
                        onChange={onChangeIssuePage}
                    />
                </div>
            </Dialog> */}
            {/* </DragDropContext> */}
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
