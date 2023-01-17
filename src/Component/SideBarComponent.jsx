import React, { useEffect } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ID_DELETE_AREA, ID_SAVED_AREA } from "../Common/common";
import { rc_repo_savedRepoList } from "../Store/repo";
import SaveIcon from "@mui/icons-material/Save";
import { Card, CardContent, Typography } from "@mui/material";
import { rc_drag_showDeleteArea, rc_drag_showSaveArea } from "../Store/drag";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const SideBarComponent = () => {
    // 저장된 repo 리스트
    const savedRepoList = useRecoilValue(rc_repo_savedRepoList);

    // 조회된 타겟 리스트
    useEffect(() => {
        console.log("여기는 사이드");
    });

    const showDeleteArea = useRecoilValue(rc_drag_showDeleteArea);
    const showSaveArea = useRecoilValue(rc_drag_showSaveArea);

    return (
        <SideBarComponentBlock>
            <div className="headerArea">
                <h2>My Repo List</h2>
            </div>
            <div className="contentsArea">
                <Droppable droppableId={ID_SAVED_AREA}>
                    {(provided, snapshot) => (
                        <div
                            className={
                                showSaveArea
                                    ? "saveListArea activeSaveArea"
                                    : "saveListArea"
                            }
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <div className="IconCover saveIcon">
                                <SaveIcon />
                            </div>
                            {savedRepoList.map((item, idx) => (
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
                            <div className="IconCover deleteIcon">
                                <DeleteForeverIcon />
                            </div>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
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

    .saveListArea {
        border: 2px solid #fff0;
        padding: 10px;
        box-sizing: border-box;

        min-height: 300px;
        min-width: 424px;
    }

    .activeSaveArea {
        border: 2px solid skyblue;
    }

    .saveListArea .repoItem {
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
