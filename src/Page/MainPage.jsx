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
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getIssueApi, getRepoApi } from "../Api/git";
import useAxios from "../Hook/useAxios";
import { rc_repo_repoList } from "../Store/repo";
import SearchIcon from "@mui/icons-material/Search";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSnackbar } from "notistack";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveIcon from "@mui/icons-material/Save";

const ID_SAVED_AREA = "SAVED_AREA";
const ID_SEARCH_RESULT_AREA = "SEARCH_RESULT_AREA";
const ID_DELETE_AREA = "DELETE_AREA";

const MainPage = () => {
    const [getRepoResult, getSearchRepo] = useAxios(getRepoApi);
    const [getIssueResult, getIssueRepo] = useAxios(getIssueApi);

    // 검색 결과
    const [repoSearchResult, setRepoSearchResult] = useState([]);

    const [currentDetailRepo, setCurrentDetailRepo] = useState(null);

    const [selectedRepoName, setSelectedRepoName] = useState("");
    const [selectedRepoURL, setSelectedRepoURL] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [searchPage, setSearchPage] = useState(1);

    const [searchIssuePage, setSearchIssuePage] = useState(1);
    const [searchIssueUser, setSearchIssueUser] = useState("");
    const [searchIssueRepo, setSearchIssueRepo] = useState("");

    const [openDialog, setOpenDialog] = useState(false);

    // 저장된 repo 리스트
    const [repoList, setRepoList] = useRecoilState(rc_repo_repoList);

    // Repo 조회 page
    const onChangeSearchPage = useCallback((_, value) => {
        setSearchPage(value);
    }, []);

    // Repo 조회 page
    const onChangeIssuePage = useCallback((_, value) => {
        setSearchIssuePage(value);
    }, []);

    const onSubmit = useCallback((e) => {
        e.preventDefault();

        // 입력값
        const inputValue = e.target[0].value;
        setSearchValue(inputValue);
        setSearchPage(1);
        // 조회
        // 조회하면 1페이지로 시작한다.
        // getSearchRepo({ searchParams: inputValue, page: searchPage });
    }, []);

    const onClickAdd = useCallback(
        (item) => {
            if (repoList.length === 4) {
                alert("더이상 추가할 수 없습니다.");
                return;
            }

            if (window.confirm("추가하시겠습니까?")) {
                setRepoList((prev) => [...prev, item]);
            }
        },
        [repoList, setRepoList]
    );

    const onClickDelete = useCallback((item) => {
        if (window.confirm("제거하시겠습니까?")) {
            setRepoList((prev) =>
                prev.filter((filterItem) => filterItem.id !== item.id)
            );
        }
    }, []);

    // 저장된 리스트 클릭
    /*
    클릭했을때 이슈를 조회하는것으로 우선 구현함
    */
    const onClickDetail = useCallback((item) => {
        console.log("item: ", item);
        const user = item.owner.login;
        const repo = item.name;
        setCurrentDetailRepo(item);

        setSearchIssueUser(user);
        setSearchIssueRepo(repo);
        setSelectedRepoName(repo);
        setSearchIssuePage(1);

        setSelectedRepoURL(item.html_url);

        setOpenDialog(true);
    }, []);

    const onClickIssueList = useCallback(() => {
        console.log("selectedRepoURL: ", selectedRepoURL);
        if (window.confirm("해당 저장소로 이동하시겠습니까?")) {
            window.open(selectedRepoURL);
        }
    }, [selectedRepoURL]);

    // 저장, 삭제가 발생하면 localStorage의 데이터를 수정한다.
    useEffect(() => {
        const data = JSON.stringify(repoList);
        window.localStorage.setItem("repoList", data);
    }, [repoList]);

    // Repo 조회
    useEffect(() => {
        if (!searchValue) return;

        // search!
        getSearchRepo({ searchParams: searchValue, page: searchPage });
    }, [searchPage, searchValue]);

    // Issue 조회
    useEffect(() => {
        if (!openDialog || !searchIssueUser || !searchIssueRepo) return;

        getIssueRepo({
            user: searchIssueUser,
            repo: searchIssueRepo,
            page: searchIssuePage,
        });
    }, [openDialog, searchIssuePage, searchIssueUser, searchIssueRepo]);

    //
    /*
    이슈개수 정보는 해당 Repo 에 존재함
    
    저장된 Repo 정보는 변하지 않기 때문에

    새로 조회하는 과정이 필요할 듯

    이슈 조회는 현재 Open 상태 이슈만 가져옴 -> 테스트 완료
    open_issues_count
     */
    const issuePageCount = useMemo(() => {
        if (!currentDetailRepo) return 0;

        return Math.ceil(currentDetailRepo.open_issues_count / 30);
    }, [currentDetailRepo]);

    const pageCount = useMemo(() => {
        if (!getRepoResult.data) return 0;

        return Math.ceil(getRepoResult.data.total_count / 30);
    }, [getRepoResult]);

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

    useEffect(() => {
        if (getRepoResult.data) {
            // setRepoSearchResult(getRepoResult.data.items);
            // 조회 영역의 중복 데이터 제거
            // 드래드그앤 드롭이벤트와 중복해서 발생중임
            setRepoSearchResult(
                getRepoResult.data.items.filter(
                    (filterItem) =>
                        !repoList.find(
                            (findItem) => findItem.id === filterItem.id
                        )
                )
            );
        } else {
            setRepoSearchResult([]);
        }
    }, [repoList, getRepoResult]);

    // 삭제영역
    const [showDeleteArea, setShowDeleteArea] = useState(false);
    const [showSaveArea, setShowSaveArea] = useState(false);
    const onDragStart = useCallback((e) => {
        // onDragEnd에서 사용하기 위해 현재 정보를 저장한다.
        dragInfo.current.start = e;

        const {
            source: { droppableId },
        } = e;

        // 저장 영역에서 드래그를 하는 경우 제거 영역을 표시해준다.
        if (droppableId === ID_SAVED_AREA) {
            setShowDeleteArea(true);
            console.log("저장영역에서 시작");
        }
        // 조회 영역에서 드래그를 하는 경우 저장 영역을 표시해 준다.
        else {
            setShowSaveArea(true);
            console.log("조회영역에서 시작");
        }
    }, []);
    const onDragEnd = useCallback(
        (e) => {
            const startID = dragInfo.current.start.source.droppableId;
            const endID = e.destination.droppableId;

            console.log("getRepoResult: ", getRepoResult);

            // 이동 체크
            const { type, msg } = checkMovement(startID, endID);

            switch (type) {
                case "ERROR":
                    enqueueSnackbar(msg, { variant: "warning" });
                    break;
                case "SAVE":
                    if (repoList.length === 4) {
                        enqueueSnackbar("최대 4개까지 저장 가능합니다.", {
                            variant: "warning",
                        });
                        break;
                    }
                    const listData = getRepoResult["data"]["items"] || [];
                    const target = listData.find(
                        (findItem) => String(findItem.id) === e.draggableId
                    );
                    const copySavedData1 = [...repoList];
                    copySavedData1.splice(e.destination.index, 0, target);

                    setRepoList(copySavedData1);

                    setRepoSearchResult((prevSearchData) =>
                        prevSearchData.filter(
                            (filterItem) =>
                                String(filterItem.id) !== e.draggableId
                        )
                    );
                    enqueueSnackbar(msg, { variant: "success" });
                    break;

                case "DELETE":
                    console.log("e: ", e);
                    console.log("repoList: ", repoList);
                    setRepoList((prevSavedData) =>
                        prevSavedData.filter(
                            (filterItem) =>
                                String(filterItem.id) !== e.draggableId
                        )
                    );
                    enqueueSnackbar(msg, { variant: "error" });
                    break;

                case "REORDER":
                    if (
                        dragInfo.current.start.source.index ===
                        e.destination.index
                    ) {
                        break;
                    }
                    const copySavedData2 = [...repoList];
                    const target2 =
                        copySavedData2[dragInfo.current.start.source.index];

                    copySavedData2.splice(
                        dragInfo.current.start.source.index,
                        1
                    );
                    copySavedData2.splice(e.destination.index, 0, target2);

                    setRepoList(copySavedData2);
                    enqueueSnackbar(msg, { variant: "info" });
                    break;

                default:
                    enqueueSnackbar(msg, { variant: "info" });
                    break;
            }
            setShowDeleteArea(false);
            setShowSaveArea(false);
        },
        [enqueueSnackbar, checkMovement, repoList, getRepoResult.data]
    );

    return (
        <MainPageBlock>
            <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <SavedAreaBlock>
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
                </SavedAreaBlock>

                <RepoListAreaBlock>
                    <div className="searchArea">
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
                    </div>
                    {/* Repo 조회 결과 영역 */}
                    <Droppable droppableId={ID_SEARCH_RESULT_AREA}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="repoListArea"
                            >
                                {repoSearchResult.map((item, idx) => (
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
                                            // <Paper
                                            //     elevation={1}
                                            //     className="repoItem"
                                            //     ref={provided.innerRef}
                                            //     {...provided.dragHandleProps}
                                            //     {...provided.draggableProps}
                                            // >
                                            //     <ListItem>
                                            //         <ListItemText
                                            //             primary={item.name}
                                            //             secondary={
                                            //                 item.owner.login
                                            //             }
                                            //         />
                                            //     </ListItem>
                                            // </Paper>
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
                            count={pageCount}
                            onChange={onChangeSearchPage}
                        />
                    </div>
                </RepoListAreaBlock>

                {/* 특정 데이터 Issue 영역 */}
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <div>
                        <List>
                            {getIssueResult.data?.map((item, idx) => (
                                <ListItem key={idx}>
                                    {/* <ListItemText>{selectedRepoName}</ListItemText> */}
                                    {/* <ListItemText
                                    primary={item.title}
                                    secondary={item.body}
                                /> */}
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
                </Dialog>
            </DragDropContext>
        </MainPageBlock>
    );
};

const MainPageBlock = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;

    // 강제 색 변경
    .css-q0jhri-MuiInputBase-root-MuiInput-root:after {
        border-bottom: 2px solid black;
    }

    .repoItem {
        width: 400px;
        height: 100px;

        text-align: left;
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
const RepoListAreaBlock = styled.div`
    padding: 10px;
    box-sizing: border-box;

    flex: 6;
    background-color: #f6f8fa;

    display: grid;
    grid-template-rows: 50px 1fr 50px;

    gap: 10px;

    .searchArea {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
    }

    .searchArea form {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
    }

    .repoListArea {
        display: grid;
        gap: 10px;
        grid-template-columns: 1fr 1fr 1fr;
        overflow: scroll;
    }

    .pagerArea {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
export default MainPage;
