import { Link, Tooltip, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

const OwnerInfo = ({ imgSrc, ownerName, url }) => {
    return (
        <OwnerInfoBlock>
            <div className="imageCover">
                <img src={imgSrc} alt="userImage" />
            </div>

            {/* 저장소 주인 이름 */}
            <Typography gutterBottom variant="h5" component="div">
                {ownerName}
            </Typography>

            {/* 저장소 주인 링크 */}
            <Tooltip title="클릭하면 해당 저장소로 이동합니다.">
                <Link target={"_blank"} href={url} underline="none">
                    Visit Repository
                </Link>
            </Tooltip>
        </OwnerInfoBlock>
    );
};

const OwnerInfoBlock = styled.div`
    height: 100%;

    padding: 10px;
    box-sizing: border-box;

    flex: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    .imageCover {
        width: 300px;
        heigth: 300px;
    }

    .imageCover img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
        border: 1px solid rgba(27, 31, 36, 0.15);
    }
`;
export default OwnerInfo;
