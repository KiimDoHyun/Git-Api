import {
    Button,
    Checkbox,
    Dialog,
    Divider,
    IconButton,
    Input,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
    rc_user_showSetUserModal,
    rc_user_user,
    rc_user_userList,
} from "../Store/user";
import DeleteIcon from "@mui/icons-material/Delete";
import { rc_repo_savedRepoList } from "../Store/repo";
import { useSnackbar } from "notistack";
import AddIcon from "@mui/icons-material/Add";
const UserSettingDialog = () => {
    const { enqueueSnackbar } = useSnackbar();
    // 사용자 Dialog 활성화 여부
    const [showSetUserModal, setShowSetUserModal] = useRecoilState(
        rc_user_showSetUserModal
    );
    const setRepoList = useSetRecoilState(rc_repo_savedRepoList);

    // 사용자 변경, 사용자 추가, 사용자 삭제

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
                    variant: "error",
                });
                return;
            }

            if (userList.find((findItem) => findItem === inputValue)) {
                enqueueSnackbar("이미 등록된 사용자입니다.", {
                    variant: "error",
                });
                return;
            }

            if (!inputValue) {
                enqueueSnackbar("등록할 사용자명을 입력하세요", {
                    variant: "error",
                });
                return;
            }

            setUserList((prevUserList) => [...prevUserList, inputValue]);
            window.localStorage.setItem(`${inputValue}_repoList`, "[]");
            window.localStorage.setItem(`userList`, [...userList, inputValue]);
            e.target[0].value = "";
        },
        [userList]
    );

    // 적용하기
    const onClickOK = useCallback(() => {
        // 사용자를 변경한다.
        setCurrentUser(selectedUser);
        window.localStorage.setItem(`currentUser`, selectedUser);

        const data = JSON.parse(
            window.localStorage.getItem(`${selectedUser}_repoList`)
        );

        setRepoList(data || []);
        setShowSetUserModal(false);
        enqueueSnackbar("사용자가 변경되었습니다.", { variant: "success" });
    }, [selectedUser]);

    // 닫기
    const onClose = useCallback(() => {
        setShowSetUserModal(false);
    }, []);

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
                    <h4>CurrentUser</h4>
                    <Typography variant="h5" color="text.secondary">
                        {currentUser}
                    </Typography>
                    <Divider />
                    <h4>Add User</h4>
                    <form onSubmit={onSubmit}>
                        <Input sx={{ m: 1, width: "80%" }} />
                        <IconButton type="submit" style={{ width: "10%" }}>
                            <AddIcon />
                        </IconButton>
                    </form>
                    <Divider />
                    <h4>User List</h4>
                    <List>
                        {userList.map((item, idx) => (
                            <ListItem
                                key={`${item}${idx}`}
                                secondaryAction={
                                    <IconButton
                                        onClick={() => onClickDelete(item)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                                disablePadding
                            >
                                <ListItemButton
                                    onClick={() => onClickList(item)}
                                >
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={item === selectedUser}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{
                                                "aria-labelledby": `${item}${idx}`,
                                            }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        id={`${item}${idx}`}
                                        primary={item}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <div className="buttonArea">
                        <Button onClick={onClickOK}>적용하기</Button>
                        <Button onClick={onClose}>닫기</Button>
                    </div>
                </UserSettingDialogBlock>
            </Dialog>
        </>
    );
};

const UserSettingDialogBlock = styled.div`
    width: 500px;
    padding: 10px;
    box-sizing: border-box;

    form {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .buttonArea {
        margin-top: 10px;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }
`;
export default UserSettingDialog;
