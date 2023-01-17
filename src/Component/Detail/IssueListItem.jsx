import { Card, CardContent, Chip, Tooltip, Typography } from "@mui/material";
import React from "react";

const IssueListItem = ({
    title = "클릭하면 해당 Issue 페이지로 이동합니다.",
    onClick = () => null,
    repoName,
    issueTitle,
    labels,
    userImage,
    userName,
}) => {
    return (
        <Tooltip title={title}>
            <Card className="repoItem" onClick={onClick}>
                <CardContent>
                    {/* Repo 명 */}
                    <Typography gutterBottom variant="h4" component="div">
                        {repoName}
                    </Typography>

                    {/* 이슈 제목 */}
                    <Typography gutterBottom variant="h5" component="div">
                        {issueTitle}
                    </Typography>

                    {/* 이슈 라벨 */}
                    <div className="issueLabel">
                        {labels.map((item, idx) => {
                            const color =
                                item.color === "000000" ? "white" : "black";
                            return (
                                <Chip
                                    key={idx}
                                    label={item.name}
                                    style={{
                                        backgroundColor: `#${item.color}`,
                                        color,
                                    }}
                                />
                            );
                        })}
                    </div>

                    {/* 이슈 생성자 */}
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        component="div"
                        className="issueWriter"
                    >
                        <img src={userImage} alt="issueWriter" />
                        {userName}
                    </Typography>
                </CardContent>
            </Card>
        </Tooltip>
    );
};

export default IssueListItem;
