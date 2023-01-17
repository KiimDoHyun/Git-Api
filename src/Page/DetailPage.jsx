import { Divider } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const DetailPage = () => {
    const location = useLocation();

    /*
    필수
    선택된 Repo의 issue가 보여야 한다.

    각 issue는 제목, repo 명이 필수로 보여져야 한다

    issue의 내용이 길 수 있으니 높이는 가변으로 한다.
    */

    console.log("location: ", location);
    return (
        <DetailPageBlock>
            <div className="ownerInfo">
                {/* 저장소 주인 이미지 */}
                <div>
                    <img
                        src={location.state.owner.avatar_url}
                        alt="userImage"
                    />
                </div>
                {/* 저장소 주인 이름 */}
                <div>{location.state.owner.login}</div>
                {/* 저장소 주인 링크 */}
                <div>
                    <a
                        target={"_blank"}
                        href={location.state.owner.html_url}
                        rel="noreferrer"
                    >
                        Visit Repository
                    </a>
                </div>
            </div>
            <Divider orientation="vertical" />
            <div className="issue"></div>
        </DetailPageBlock>
    );
};

const DetailPageBlock = styled.div`
    padding: 10px;
    box-sizing: border-box;

    flex: 6;
    background-color: #f6f8fa;

    display: flex;

    gap: 5px;

    .issue,
    .ownerInfo {
        height: 100%;

        padding: 10px;
        box-sizing: border-box;
    }

    .ownerInfo {
        flex: 1;
        // border: 1px solid lightgreen;
    }

    .issue {
        flex: 3;
        // border: 1px solid gray;
    }
`;
export default DetailPage;
