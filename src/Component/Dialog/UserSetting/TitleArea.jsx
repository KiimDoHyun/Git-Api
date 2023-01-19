import { DialogTitle, Tooltip } from "@mui/material";
import React from "react";
import InfoIcon from "@mui/icons-material/Info";

const style = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};
const TitleArea = () => {
    return (
        <>
            <DialogTitle style={style}>
                User Manager
                <Tooltip
                    arrow
                    title={`사용자 변경은 Apply를 눌러야 최종 적용 됩니다.`}
                    placement="right"
                >
                    <InfoIcon />
                </Tooltip>
            </DialogTitle>
        </>
    );
};

export default React.memo(TitleArea);
