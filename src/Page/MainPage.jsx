import {
    Box,
    Button,
    Card,
    Dialog,
    Input,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    Pagination,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getIssueApi, getRepoApi } from "../Api/git";
import useAxios from "../Hook/useAxios";
import { rc_repo_repoList } from "../Store/repo";

const MainPage = () => {
    const [getRepoResult, getSearchRepo] = useAxios(getRepoApi);
    const [getIssueResult, getIssueRepo] = useAxios(getIssueApi);

    const [currentDetailRepo, setCurrentDetailRepo] = useState(null);

    const [selectedRepoName, setSelectedRepoName] = useState("");
    const [selectedRepoURL, setSelectedRepoURL] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [searchPage, setSearchPage] = useState(1);

    const [searchIssuePage, setSearchIssuePage] = useState(1);
    const [searchIssueUser, setSearchIssueUser] = useState("");
    const [searchIssueRepo, setSearchIssueRepo] = useState("");

    const [openDialog, setOpenDialog] = useState(false);

    // 저장된 repo 리스트
    const [repoList, setRepoList] = useRecoilState(rc_repo_repoList);

    // Repo 조회 page
    const onChangeSearchPage = useCallback((_, value) => {
        setSearchPage(value);
    }, []);

    // Repo 조회 page
    const onChangeIssuePage = useCallback((_, value) => {
        setSearchIssuePage(value);
    }, []);

    const onSubmit = useCallback((e) => {
        e.preventDefault();

        // 입력값
        const inputValue = e.target[0].value;
        setSearchValue(inputValue);
        setSearchPage(1);
        // 조회
        // 조회하면 1페이지로 시작한다.
        // getSearchRepo({ searchParams: inputValue, page: searchPage });
    }, []);

    const onClickAdd = useCallback(
        (item) => {
            if (repoList.length === 4) {
                alert("더이상 추가할 수 없습니다.");
                return;
            }

            if (window.confirm("추가하시겠습니까?")) {
                setRepoList((prev) => [...prev, item]);
            }
        },
        [repoList, setRepoList]
    );

    const onClickDelete = useCallback((item) => {
        if (window.confirm("제거하시겠습니까?")) {
            setRepoList((prev) =>
                prev.filter((filterItem) => filterItem.id !== item.id)
            );
        }
    }, []);

    // 저장된 리스트 클릭
    /*
    클릭했을때 이슈를 조회하는것으로 우선 구현함
    */
    const onClickDetail = useCallback((item) => {
        console.log("item: ", item);
        const user = item.owner.login;
        const repo = item.name;
        setCurrentDetailRepo(item);

        setSearchIssueUser(user);
        setSearchIssueRepo(repo);
        setSelectedRepoName(repo);
        setSearchIssuePage(1);

        setSelectedRepoURL(item.html_url);

        setOpenDialog(true);
    }, []);

    const onClickIssueList = useCallback(() => {
        console.log("selectedRepoURL: ", selectedRepoURL);
        if (window.confirm("해당 저장소로 이동하시겠습니까?")) {
            window.open(selectedRepoURL);
        }
    }, [selectedRepoURL]);

    // 저장, 삭제가 발생하면 localStorage의 데이터를 수정한다.
    useEffect(() => {
        const data = JSON.stringify(repoList);
        window.localStorage.setItem("repoList", data);
    }, [repoList]);

    // Repo 조회
    useEffect(() => {
        if (!searchValue) return;

        // search!
        getSearchRepo({ searchParams: searchValue, page: searchPage });
    }, [searchPage, searchValue]);

    // Issue 조회
    useEffect(() => {
        if (!openDialog || !searchIssueUser || !searchIssueRepo) return;

        getIssueRepo({
            user: searchIssueUser,
            repo: searchIssueRepo,
            page: searchIssuePage,
        });
    }, [openDialog, searchIssuePage, searchIssueUser, searchIssueRepo]);

    //
    /*
    이슈개수 정보는 해당 Repo 에 존재함
    
    저장된 Repo 정보는 변하지 않기 때문에

    새로 조회하는 과정이 필요할 듯

    이슈 조회는 현재 Open 상태 이슈만 가져옴 -> 테스트 완료
    open_issues_count
     */
    const issuePageCount = useMemo(() => {
        if (!currentDetailRepo) return 0;

        return Math.ceil(currentDetailRepo.open_issues_count / 30);
    }, [currentDetailRepo]);

    const pageCount = useMemo(() => {
        if (!getRepoResult.data) return 0;

        return Math.ceil(getRepoResult.data.total_count / 30);
    }, [getRepoResult]);

    useEffect(() => {
        console.log("getIssueResult: ", getIssueResult);
    }, [getIssueResult]);

    return (
        <MainPageBlock>
            <SavedAreaBlock>
                {/* Repo 조회 결과 영역 */}
                <h2>My Repo List</h2>
                {repoList.map((item, idx) => (
                    <Box key={idx}>
                        <Card variant="outlined">
                            {item.name}
                            <Button onClick={() => onClickDetail(item)}>
                                자세히
                            </Button>
                            <Button onClick={() => onClickDelete(item)}>
                                제거하기
                            </Button>
                        </Card>
                    </Box>
                ))}
            </SavedAreaBlock>
            <RepoListAreaBlock>
                <div className="searchArea">
                    <form onSubmit={onSubmit}>
                        <InputLabel htmlFor="searchRepo">검색</InputLabel>
                        <Input id="searchRepo" name="searchRepo" type="text" />
                        <Button variant="contained" type="submit">
                            Hi
                        </Button>
                    </form>
                </div>
                <div className="repoListArea">
                    {getRepoResult.data?.items.map((item, idx) => (
                        <Box key={idx}>
                            <Card variant="outlined">
                                {item.name}
                                <Button onClick={() => onClickAdd(item)}>
                                    추가하기
                                </Button>
                            </Card>
                        </Box>
                    ))}
                </div>
                <div className="pagerArea">
                    <Pagination
                        page={searchPage}
                        count={pageCount}
                        onChange={onChangeSearchPage}
                    />
                </div>
            </RepoListAreaBlock>

            {/* 특정 데이터 Issue 영역 */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <div>
                    <List>
                        {getIssueResult.data?.map((item, idx) => (
                            <ListItem key={idx}>
                                {/* <ListItemText>{selectedRepoName}</ListItemText> */}
                                {/* <ListItemText
                                    primary={item.title}
                                    secondary={item.body}
                                /> */}
                                <ListItemText
                                    primary={selectedRepoName}
                                    secondary={item.title}
                                />
                                <ListItemText onClick={onClickIssueList}>
                                    자세히
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                    <Pagination
                        page={searchIssuePage}
                        count={issuePageCount}
                        onChange={onChangeIssuePage}
                    />
                </div>
            </Dialog>
        </MainPageBlock>
    );
};

const MainPageBlock = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
`;

const SavedAreaBlock = styled.div`
    padding: 10px;
    box-sizing: border-box;

    flex: 1;

    text-align: left;

    h2 {
        padding-left: 16px;
    }
`;
const RepoListAreaBlock = styled.div`
    padding: 10px;
    box-sizing: border-box;

    flex: 4;
    background-color: #d7d7d7;

    display: grid;
    grid-template-rows: 50px 1fr 50px;

    gap: 10px;

    .searchArea {
        width: 100%;
        height: 50px;
        background-color: skyblue;
    }

    .repoListArea {
        display: grid;
        gap: 10px;
        grid-template-columns: 1fr 1fr;
        overflow: scroll;
    }

    .pagerArea {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
export default MainPage;
