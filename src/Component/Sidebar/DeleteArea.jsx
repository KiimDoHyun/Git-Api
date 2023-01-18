import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { ID_DELETE_AREA } from "../../Common/common";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const DeleteArea = ({ showDeleteArea }) => {
    return (
        <Droppable droppableId={ID_DELETE_AREA}>
            {(provided, snapshot) => (
                <DeleteAreaBlock
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
                </DeleteAreaBlock>
            )}
        </Droppable>
    );
};

const DeleteAreaBlock = styled.div`
    position: relative;

    transition: 0.3s;
    height: 200px;
    opacity: 0;

    border: 2px solid tomato;
    padding: 10px;
    box-sizing: border-box;

    .deleteIcon {
        background-color: tomato;
    }
`;
export default React.memo(DeleteArea);
