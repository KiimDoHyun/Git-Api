import { IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
const SidebarHeader = ({
    onClickSetting,
    onClickHome,
    currentUser,
    pathname,
}) => {
    return (
        <SidebarHeaderBlock>
            <div className="titleArea">
                <h2>My Repo List</h2>
                <Tooltip title="사용자 설정창을 활성화 합니다.">
                    <IconButton onClick={onClickSetting}>
                        <SettingsIcon />
                    </IconButton>
                </Tooltip>

                {pathname !== "/" && (
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
            <div className="subArea">
                <Tooltip title="현재 사용자 입니다.">
                    <Typography
                        variant="body1"
                        component="div"
                        className="userName"
                        color="text.secondary"
                    >
                        <PersonIcon />
                        {currentUser}
                    </Typography>
                </Tooltip>
            </div>
        </SidebarHeaderBlock>
    );
};

const SidebarHeaderBlock = styled.div`
    padding: 0 15px;

    .titleArea {
        flex: 1;

        display: flex;
        align-items: center;
        gap: 10px;
    }
    .subArea {
        display: flex;
        align-items: center;
    }

    .homeIcon {
        margin-left: auto;
    }

    .userName {
        display: flex;
        align-items: center;
        gap: 10px;
    }
`;
export default React.memo(SidebarHeader);
