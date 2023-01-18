import { Dialog, Divider } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
    rc_user_showSetUserModal,
    rc_user_user,
    rc_user_userList,
} from "../Store/user";
import { rc_repo_savedRepoList } from "../Store/repo";
import { useSnackbar } from "notistack";
import TitleArea from "./UserSettingDialog/TitleArea";
import InputArea from "./UserSettingDialog/InputArea";
import UserListArea from "./UserSettingDialog/UserListArea";
import ButtonArea from "./UserSettingDialog/ButtonArea";
import { useNavigate } from "react-router-dom";
const UserSettingDialog = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    // 사용자 Dialog 활성화 여부
    const [showSetUserModal, setShowSetUserModal] = useRecoilState(
        rc_user_showSetUserModal
    );

    // 사용자 리스트 set
    const setRepoList = useSetRecoilState(rc_repo_savedRepoList);

    // 현재 사용자
    const [currentUser, setCurrentUser] = useRecoilState(rc_user_user);

    // 선택된 사용자
    const [selectedUser, setSelectedUser] = useState("");

    // 사용자 리스트
    const [userList, setUserList] = useRecoilState(rc_user_userList);

    // 새로운 사용자 추가
    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            const inputValue = e.target[0].value;

            if (userList.length === 5) {
                enqueueSnackbar("사용자는 5명 까지 등록 가능합니다.", {
                    variant: "warning",
                });
                return;
            }

            if (userList.find((findItem) => findItem === inputValue)) {
                enqueueSnackbar("이미 등록된 사용자입니다.", {
                    variant: "warning",
                });
                return;
            }

            if (!inputValue) {
                enqueueSnackbar("등록할 사용자명을 입력하세요", {
                    variant: "warning",
                });
                return;
            }

            setUserList((prevUserList) => [...prevUserList, inputValue]);
            window.localStorage.setItem(`${inputValue}_repoList`, "[]");
            window.localStorage.setItem(`userList`, [...userList, inputValue]);
            e.target[0].value = "";
            enqueueSnackbar("새로운 사용자를 등록했습니다.", {
                variant: "success",
            });
        },
        [userList]
    );

    // 적용하기
    const onClickOK = useCallback(() => {
        if (selectedUser === currentUser) {
            setShowSetUserModal(false);
            return;
        }
        // 사용자를 변경한다.
        setCurrentUser(selectedUser);
        window.localStorage.setItem(`currentUser`, selectedUser);

        const data = JSON.parse(
            window.localStorage.getItem(`${selectedUser}_repoList`)
        );

        setRepoList(data || []);
        setShowSetUserModal(false);
        enqueueSnackbar("사용자가 변경되었습니다.", { variant: "success" });
        navigate("/");
    }, [currentUser, selectedUser]);

    // 닫기
    const onClose = useCallback(() => {
        setShowSetUserModal(false);
        setSelectedUser(currentUser);
    }, [currentUser]);

    // 사용자 리스트 선택
    const onClickList = useCallback((item) => {
        setSelectedUser(item);
    }, []);

    // 사용자 리스트 제거
    const onClickDelete = useCallback(
        (item) => {
            if (item === selectedUser) {
                enqueueSnackbar("현재 선택된 사용자는 삭제할 수 없습니다.", {
                    variant: "error",
                });
                return;
            }

            if (window.confirm("삭제하시겠습니까?")) {
                setUserList((prevUserList) =>
                    prevUserList.filter((filterItem) => filterItem !== item)
                );
                window.localStorage.removeItem(`${item}_repoList`);
            }
        },
        [selectedUser]
    );

    useEffect(() => {
        setSelectedUser(currentUser);
    }, [currentUser]);
    return (
        <>
            <Dialog open={showSetUserModal} onClose={onClose}>
                <UserSettingDialogBlock>
                    <TitleArea currentUser={currentUser} />

                    <Divider />

                    <InputArea onSubmit={onSubmit} />

                    <Divider />

                    <UserListArea
                        userList={userList}
                        selectedUser={selectedUser}
                        onClickDelete={onClickDelete}
                        onClickList={onClickList}
                    />

                    <Divider />

                    <ButtonArea onClickOK={onClickOK} onClose={onClose} />
                </UserSettingDialogBlock>
            </Dialog>
        </>
    );
};

const UserSettingDialogBlock = styled.div`
    width: 500px;
    padding: 10px;
    box-sizing: border-box;
`;
export default UserSettingDialog;
