import { Card, CardContent, Tooltip, Typography } from "@mui/material";
import React, { useMemo } from "react";

const CommonListItem = ({
    provided,
    snapshot,
    onMouseDown,
    userImage,
    title,
    content,
    onClick,
    tooltipTitle,
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
        <Tooltip title={tooltipTitle}>
            <Card
                className={
                    snapshot?.isDragging
                        ? "repoItem draggingRepoItem"
                        : "repoItem"
                }
                {...providedProps}
                onMouseDown={onMouseDown}
                onClick={onClick}
            >
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography
                        variant="body2"
                        component="div"
                        className="userInfo"
                        color="text.secondary"
                    >
                        <img
                            className="userImage"
                            src={userImage}
                            alt="userImage"
                        />
                        {content}
                    </Typography>
                </CardContent>
            </Card>
        </Tooltip>
    );
};

export default React.memo(CommonListItem);
