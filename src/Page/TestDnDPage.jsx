import React, { useCallback, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const ID_1 = "ID_1";
const ID_2 = "ID_2";

const TestDnDPage = () => {
    /*
    정상적인 이동에 해당하는 경우

    1. 조회된 영역에서 저장된 영역으로 이동하는 경우 (저장하기 기능에 해당한다.)
    2. 저장된 영역에서 제거 영역으로 이동하는 경우 (삭제하기 기능에 해당한다.)
    3. 저장된 영역에서 저장된 영역으로 이동하는 경우 (+ 순서 변경에 해당한다.)
    */
    const dragInfo = useRef({ start: null, end: null });

    const onDragStart = useCallback((e) => {
        dragInfo.current.start = e;
    }, []);

    const onDragEnd = useCallback((e) => {
        console.log("onDragEnd: ", e);
    }, []);

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
    return (
        <TestDnDPageBlock>
            <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                {/* Drop 이 가능한 영역 
                DND가 일어날 영역의 고유 ID가 필요하다.

                드래드앤 드롭 이벤트가 종료되어도 클릭 이벤트는 발생하지 않는다
                */}
                <Droppable droppableId={ID_1}>
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
                <Droppable droppableId={ID_2}>
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
                {/* <div className="Area2">
                    <div className="box" />
                    <div className="box" />
                </div> */}
            </DragDropContext>
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

        display: flex;
        color: white;
        justify-content: center;
        align-items: center;
    }
`;
export default TestDnDPage;
