import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { ID_SAVED_AREA } from "../../Common/common";
import SaveIcon from "@mui/icons-material/Save";
import CommonListItem from "../Common/CommonListItem";
import NoData from "../Common/NoData";

const SavedRepoList = ({ showSaveArea, savedRepoList, onClick }) => {
    return (
        <Droppable droppableId={ID_SAVED_AREA}>
            {(provided) => (
                <SavedRepoListBlock
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
                    {savedRepoList.length > 0 ? (
                        savedRepoList.map((item, idx) => (
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
                        ))
                    ) : (
                        <NoData text="저장된 Repository가 없습니다." />
                    )}
                    {provided.placeholder}
                </SavedRepoListBlock>
            )}
        </Droppable>
    );
};

const SavedRepoListBlock = styled.div`
    border: 2px solid #fff0;
    padding: 10px;
    box-sizing: border-box;

    min-height: 300px;
    min-width: 424px;

    .repoItem {
        margin-bottom: 10px;
    }

    .saveIcon {
        background-color: skyblue;
        pointer-events: none;
    }
`;
export default React.memo(SavedRepoList);
