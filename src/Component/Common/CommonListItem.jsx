import { Card, CardContent, Typography } from "@mui/material";
import React, { useMemo } from "react";

const CommonListItem = ({
    provided,
    snapshot,
    onMouseDown,
    title,
    content,
    onClick,
}) => {
    const providedProps = useMemo(() => {
        if (!provided) {
            return {};
        }

        return {
            ref: provided.innerRef,
            ...provided.dragHandleProps,
            ...provided.draggableProps,
        };
    }, [provided]);

    return (
        <Card
            className={
                snapshot?.isDragging ? "repoItem draggingRepoItem" : "repoItem"
            }
            {...providedProps}
            onMouseDown={onMouseDown}
            onClick={onClick}
        >
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {content}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default React.memo(CommonListItem);
