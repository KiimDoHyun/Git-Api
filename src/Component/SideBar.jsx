import React, { useCallback } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ID_DELETE_AREA, ID_SAVED_AREA } from "../Common/common";
import { rc_repo_savedRepoList } from "../Store/repo";
import SaveIcon from "@mui/icons-material/Save";
import {
    Button,
    Card,
    CardContent,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";
import { rc_drag_showDeleteArea, rc_drag_showSaveArea } from "../Store/drag";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useLocation, useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import CommonListItem from "./Common/CommonListItem";
const SideBar = () => {
    const location = useLocation();

    // 저장된 repo 리스트
    const savedRepoList = useRecoilValue(rc_repo_savedRepoList);

    const showDeleteArea = useRecoilValue(rc_drag_showDeleteArea);
    const showSaveArea = useRecoilValue(rc_drag_showSaveArea);

    const navigate = useNavigate();

    const onClick = useCallback(
        (item) => {
            navigate("/detail", {
                state: item,
            });
        },
        [navigate]
    );

    const onClickHome = useCallback(() => {
        navigate("/");
    }, []);

    return (
        <SideBarBlock>
            <div className="headerArea">
                <h2>My Repo List</h2>
                <Tooltip title="설정화면을 활성화 합니다.">
                    <IconButton>
                        <SettingsIcon />
                    </IconButton>
                </Tooltip>

                {location.pathname !== "/" && (
                    <Tooltip
                        title="메인 화면으로 이동합니다."
                        className="homeIcon"
                    >
                        <IconButton onClick={onClickHome}>
                            <HomeIcon color="primary" />
                        </IconButton>
                    </Tooltip>
                )}
            </div>
            <div className="contentsArea">
                <Droppable droppableId={ID_SAVED_AREA}>
                    {(provided) => (
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
                                    {(provided, snapshotDG) => (
                                        <CommonListItem
                                            provided={provided}
                                            snapshot={snapshotDG}
                                            onClick={() => onClick(item)}
                                            title={item.name}
                                            content={item.owner.login}
                                        />
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
        </SideBarBlock>
    );
};

const SideBarBlock = styled.div`
    padding: 10px;
    box-sizing: border-box;

    flex: 1;
    // width: 450px;

    text-align: left;
    display: flex;
    flex-direction: column;

    border-right: 1px solid rgba(0, 0, 0, 0.12);

    .headerArea {
        padding: 0 15px;
        flex: 1;

        display: flex;
        align-items: center;
        gap: 10px;
    }

    .homeIcon {
        margin-left: auto;
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
        pointer-events: none;
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
export default SideBar;
