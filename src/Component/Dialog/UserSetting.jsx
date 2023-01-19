import { Dialog, DialogContent, Divider } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
    rc_user_showSetUserModal,
    rc_user_user,
    rc_user_userList,
} from "../../Store/user";
import { rc_repo_savedRepoList } from "../../Store/repo";
import { useSnackbar } from "notistack";
import TitleArea from "./UserSetting/TitleArea";
import InputArea from "./UserSetting/InputArea";
import UserListArea from "./UserSetting/UserListArea";
import ButtonArea from "./UserSetting/ButtonArea";
import { useNavigate } from "react-router-dom";
import {
    getLocalStorage,
    removeLocalStorage,
    setLocalStorage,
} from "../../Common/common";
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

    // 사용자 추가하기전 입력값 체크
    const checkValue = useCallback(
        (input) => {
            let check = true;

            // 최대 등록 개수 초과
            if (userList.length === 5) {
                enqueueSnackbar("사용자는 5명 까지 등록 가능합니다.", {
                    variant: "warning",
                });
                check = false;
            }

            // 중복 사용자 등록
            if (userList.find((findItem) => findItem === input)) {
                enqueueSnackbar("이미 등록된 사용자입니다.", {
                    variant: "warning",
                });
                check = false;
            }

            // 빈 입력값
            if (!input) {
                enqueueSnackbar("등록할 사용자명을 입력하세요", {
                    variant: "warning",
                });
                check = false;
            }

            return check;
        },
        [userList, enqueueSnackbar]
    );

    // 새로운 사용자 추가
    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            const inputValue = e.target[0].value;

            // 사용자 입력값 체크
            const inputCheckResult = checkValue(inputValue);
            if (!inputCheckResult) return;

            // 기존 사용자 배열, localStorage 업데이트
            setUserList((prevUserList) => [...prevUserList, inputValue]);
            setLocalStorage(`${inputValue}_repoList`, []);
            setLocalStorage(`userList`, [...userList, inputValue]);

            // 입력값 초기화
            e.target[0].value = "";

            // 메세지
            enqueueSnackbar("새로운 사용자를 등록했습니다.", {
                variant: "success",
            });
        },
        [userList, enqueueSnackbar, setUserList, checkValue]
    );

    // 적용하기
    const onClickOK = useCallback(() => {
        if (selectedUser === currentUser) {
            setShowSetUserModal(false);
            return;
        }
        // 사용자를 변경한다.
        setCurrentUser(selectedUser);

        // localStorage의 현재 사용자 정보를 변경한다.
        setLocalStorage(`currentUser`, selectedUser);

        // 선택된 사용자의 RepoList 를 가져온다.
        // 없는 경우 빈 배열로 할당한다.
        const data = getLocalStorage(`${selectedUser}_repoList`);

        setRepoList(data || []);
        setShowSetUserModal(false);
        enqueueSnackbar("사용자가 변경되었습니다.", { variant: "success" });
        navigate("/");
    }, [
        currentUser,
        selectedUser,
        enqueueSnackbar,
        navigate,
        setCurrentUser,
        setRepoList,
        setShowSetUserModal,
    ]);

    // 닫기
    const onClose = useCallback(() => {
        setShowSetUserModal(false);
        setSelectedUser(currentUser);
    }, [currentUser, setShowSetUserModal]);

    // 사용자 리스트 선택
    const onClickList = useCallback((item) => {
        setSelectedUser(item);
    }, []);

    // 사용자 리스트 제거
    const onClickDelete = useCallback(
        (item) => {
            if (item === selectedUser) {
                enqueueSnackbar("현재 선택된 사용자는 삭제할 수 없습니다.", {
                    variant: "warning",
                });
                return;
            }

            if (window.confirm("삭제하시겠습니까?")) {
                setUserList((prevUserList) => {
                    const delResult = prevUserList.filter(
                        (filterItem) => filterItem !== item
                    );

                    setLocalStorage(`userList`, delResult);
                    return delResult;
                });
                removeLocalStorage(`${item}_repoList`);
                enqueueSnackbar("사용자가 제거되었습니다.", {
                    variant: "error",
                });
            }
        },
        [selectedUser, enqueueSnackbar, setUserList]
    );

    useEffect(() => {
        setSelectedUser(currentUser);
    }, [currentUser]);
    return (
        <>
            <Dialog open={showSetUserModal} onClose={onClose}>
                <TitleArea />
                <Divider />

                <DialogContent>
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
                </DialogContent>
            </Dialog>
        </>
    );
};
export default UserSettingDialog;