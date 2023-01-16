import { useSnackbar } from "notistack";
import React, { useCallback, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const ID_SAVED_AREA = "SAVED_AREA";
const ID_SEARCH_RESULT_AREA = "SEARCH_RESULT_AREA";
const ID_DELETE_AREA = "DELETE_AREA";

const TestDnDPage = () => {
    // 스낵바 관련
    /*
    드래그앤 드롭으로 특정 이벤트가 발동될 때 단순 alert 대신 스낵바로 변경
    */

    // const aa = useSnackbar();
    const { enqueueSnackbar } = useSnackbar();

    const dragInfo = useRef({ start: null, end: null });

    const [showDeleteArea, setShowDeleteArea] = useState(false);

    const [savedData, setSavedData] = useState([
        {
            id: "1_1",
            name: "Repo_blue",
        },
        {
            id: "1_2",
            name: "Repo_red",
        },
    ]);

    const [searchData, setSearchData] = useState([
        {
            id: "2_1",
            name: "search_red",
        },
        {
            id: "2_2",
            name: "search_blue",
        },
        {
            id: "2_3",
            name: "search_green",
        },
        {
            id: "2_4",
            name: "search_yellow",
        },
        {
            id: "2_5",
            name: "search_black",
        },
        {
            id: "2_6",
            name: "search_gray",
        },
    ]);

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
        }

        return { type, msg };
    }, []);

    const onDragStart = useCallback((e) => {
        // onDragEnd에서 사용하기 위해 현재 정보를 저장한다.
        dragInfo.current.start = e;

        const {
            source: { droppableId },
        } = e;

        // 만약 저장 영역에서 드래그를 하는 경우 제거 영역을 표시해준다.
        if (droppableId === ID_SAVED_AREA) {
            setShowDeleteArea(true);
            console.log("저장영역에서 시작");
        } else {
            console.log("조회영역에서 시작");
        }
    }, []);

    const onDragEnd = useCallback(
        (e) => {
            const startID = dragInfo.current.start.source.droppableId;
            const endID = e.destination.droppableId;

            // 이동 체크
            const { type, msg } = checkMovement(startID, endID);

            switch (type) {
                case "ERROR":
                    enqueueSnackbar(msg, { variant: "warning" });
                    break;
                case "SAVE":
                    if (savedData.length === 4) {
                        enqueueSnackbar("최대 4개까지 저장 가능합니다.", {
                            variant: "warning",
                        });
                        break;
                    }
                    const target = searchData.find(
                        (findItem) => findItem.id === e.draggableId
                    );
                    const copySavedData1 = [...savedData];
                    copySavedData1.splice(e.destination.index, 0, target);

                    setSavedData(copySavedData1);

                    setSearchData((prevSearchData) =>
                        prevSearchData.filter(
                            (filterItem) => filterItem.id !== e.draggableId
                        )
                    );
                    enqueueSnackbar(msg, { variant: "success" });
                    break;

                case "DELETE":
                    setSavedData((prevSavedData) =>
                        prevSavedData.filter(
                            (filterItem) => filterItem.id !== e.draggableId
                        )
                    );
                    enqueueSnackbar(msg, { variant: "error" });
                    break;

                case "REORDER":
                    const copySavedData2 = [...savedData];
                    const target2 =
                        copySavedData2[dragInfo.current.start.source.index];

                    copySavedData2.splice(
                        dragInfo.current.start.source.index,
                        1
                    );
                    copySavedData2.splice(e.destination.index, 0, target2);

                    setSavedData(copySavedData2);
                    enqueueSnackbar(msg, { variant: "info" });
                    break;
            }
            setShowDeleteArea(false);
        },
        [enqueueSnackbar, checkMovement, savedData, searchData]
    );

    return (
        <TestDnDPageBlock>
            <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                {/* Drop 이 가능한 영역 
                DND가 일어날 영역의 고유 ID가 필요하다.

                드래드앤 드롭 이벤트가 종료되어도 클릭 이벤트는 발생하지 않는다
                */}
                <Droppable droppableId={ID_SAVED_AREA}>
                    {(provided, snapshot) => {
                        // console.log("provided: ", provided);
                        // console.log("snapshot: ", snapshot);
                        return (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="Area1"
                            >
                                <h1>저장된 영역</h1>
                                {savedData.map((item, idx) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={idx}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                                onClick={() =>
                                                    console.log("클릭")
                                                }
                                                className="box"
                                            >
                                                <div>{item.name}</div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        );
                    }}
                </Droppable>
                <Droppable droppableId={ID_SEARCH_RESULT_AREA}>
                    {(provided, snapshot) => {
                        // console.log("provided: ", provided);
                        // console.log("snapshot: ", snapshot);
                        return (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="Area2"
                            >
                                <h1>조회된 영역</h1>
                                {searchData.map((item, idx) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={idx}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                                onClick={() =>
                                                    console.log("클릭")
                                                }
                                                className="box"
                                            >
                                                <div>{item.name}</div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        );
                    }}
                </Droppable>
                <Droppable droppableId={ID_DELETE_AREA}>
                    {(provided, snapshot) => (
                        <div
                            className={`deleteArea ${
                                showDeleteArea ? "deleteArea_active" : ""
                            }`}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <h1>DELETE ITEM</h1>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                {/* <div className="Area2">
                    <div className="box" />
                    <div className="box" />
                </div> */}
            </DragDropContext>

            {/* <Snackbar open={true}>
                <Alert severity="success">성공쓰</Alert>
            </Snackbar> */}
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

    .Area1 {
        flex: 1;

    }
    .Area2 {
        flex: 4;

    }
    .Area1,
    .Area2 {
        border: 1px solid;
        padding: 20px;
        box-sizing: border-box;
    }

    .box {
        width: 100%;
        height: 100px;
        background-color: blue;
        margin-bottom: 20px;

        display: flex;
        color: white;
        justify-content: center;
        align-items: center;
    }

    .deleteArea {
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;

        z-index: 10;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 50%;
        height: 200px;
        background-color: #d759598f;


        transition: 0.2s;

        pointer-event: none;
        // opacity: 1;
        opacity: 0;

        border
    }

    .deleteArea h1{
        position: absolute;
        top: -80px;
        color: red;
        pointer-event: none;
    }


    .deleteArea_active {
        opacity: 1;
    }
`;
export default TestDnDPage;
