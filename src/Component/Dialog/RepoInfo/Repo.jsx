import { Chip, Stack, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Repo = ({ name, topics, description }) => {
    return (
        <>
            <div className="repoName">
                <Typography variant="h4" color="text.primary">
                    {name}
                </Typography>
            </div>
            <RepoTopicsBlock>
                {topics && topics.length > 0 ? (
                    <Stack direction={"row"} spacing={1}>
                        {topics.map((item, idx) => (
                            <Chip label={item} key={idx} />
                        ))}
                    </Stack>
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        No Topics
                    </Typography>
                )}
            </RepoTopicsBlock>
            <RepoDescBlock>{description}</RepoDescBlock>
        </>
    );
};

const RepoTopicsBlock = styled.div`
    > div {
        flex-wrap: wrap;
        row-gap: 5px;
    }
`;

const RepoDescBlock = styled.div`
    width: 400px;
`;
export default React.memo(Repo);
