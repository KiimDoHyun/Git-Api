import { Typography } from "@mui/material";
import React from "react";

const TitleArea = ({ currentUser }) => {
    return (
        <>
            <h4>CurrentUser</h4>
            <Typography variant="h5" color="text.secondary">
                {currentUser}
            </Typography>
        </>
    );
};

export default React.memo(TitleArea);
