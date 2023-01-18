import React, { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { rc_repo_savedRepoList } from "../Store/repo";
import { rc_drag_showDeleteArea, rc_drag_showSaveArea } from "../Store/drag";
import { useLocation, useNavigate } from "react-router-dom";
import { rc_user_showSetUserModal, rc_user_user } from "../Store/user";
import SidebarHeader from "./Sidebar/SidebarHeader";
import SavedRepoList from "./Sidebar/SavedRepoList";
import DeleteArea from "./Sidebar/DeleteArea";

const SideBar = () => {
    const location = useLocation();

    // 저장된 repo 리스트
    const savedRepoList = useRecoilValue(rc_repo_savedRepoList);

    // 사용자
    const currentUser = useRecoilValue(rc_user_user);

    // 사용자 Dialog 활성화 여부
    const setShowSetUserModal = useSetRecoilState(rc_user_showSetUserModal);

    const showDeleteArea = useRecoilValue(rc_drag_showDeleteArea);
    const showSaveArea = useRecoilValue(rc_drag_showSaveArea);

    const navigate = useNavigate();

    const onClick = useCallback(
        (item) => {
            navigate("/detail", {
                state: item,
            });
        },
        [navigate]
    );

    const onClickSetting = useCallback(() => {
        setShowSetUserModal(true);
    }, [setShowSetUserModal]);

    const onClickHome = useCallback(() => {
        navigate("/");
    }, [navigate]);

    return (
        <SideBarBlock>
            <SidebarHeader
                onClickSetting={onClickSetting}
                onClickHome={onClickHome}
                currentUser={currentUser}
                pathname={location.pathname}
            />
            <ContentsAreaBlock>
                <SavedRepoList
                    showSaveArea={showSaveArea}
                    savedRepoList={savedRepoList}
                    onClick={onClick}
                />

                <DeleteArea showDeleteArea={showDeleteArea} />
            </ContentsAreaBlock>
        </SideBarBlock>
    );
};

const SideBarBlock = styled.div`
    padding: 10px;
    box-sizing: border-box;

    flex: 1;
    // width: 450px;

    text-align: left;
    display: flex;
    flex-direction: column;

    border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const ContentsAreaBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 9;
    position: relative;

    .activeSaveArea {
        border: 2px solid skyblue;
    }

    .activeDeleteArea {
        opacity: 1;
    }

    .activeSaveArea .IconCover,
    .activeDeleteArea .IconCover {
        opacity: 1;
    }

    .IconCover svg {
        fill: white;
    }

    .IconCover {
        position: absolute;
        left: calc(50% - 30px);
        top: -60px;

        width: 50px;
        height: 50px;
        border-radius: 100%;

        display: flex;
        align-items: center;
        justify-content: center;

        transition: 0.3s;
        opacity: 0;
    }
`;

export default SideBar;
