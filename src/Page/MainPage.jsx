import {
    Box,
    Button,
    Card,
    Input,
    InputLabel,
    Pagination,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { searchRepoApi } from "../Api/git";
import useAxios from "../Hook/useAxios";
import { rc_repo_repoList } from "../Store/repo";

const MainPage = () => {
    const [searchRepoResult, getSearchRepo] = useAxios(searchRepoApi);
    const [searchValue, setSearchValue] = useState("");
    const [searchPage, setSearchPage] = useState(1);

    // 저장된 repo 리스트
    const [repoList, setRepoList] = useRecoilState(rc_repo_repoList);

    const onChangeSearchPage = useCallback((_, value) => {
        setSearchPage(value);
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

    // 저장, 삭제가 발생하면 localStorage의 데이터를 수정한다.
    useEffect(() => {
        const data = JSON.stringify(repoList);
        window.localStorage.setItem("repoList", data);
    }, [repoList]);

    useEffect(() => {
        if (!searchValue) return;

        // search!
        getSearchRepo({ searchParams: searchValue, page: searchPage });
    }, [searchPage, searchValue]);

    const pageCount = useMemo(() => {
        if (!searchRepoResult.data) return 0;

        return Math.ceil(searchRepoResult.data.total_count / 30);
    }, [searchRepoResult]);

    return (
        <div>
            <div className="searchArea">
                <form onSubmit={onSubmit}>
                    <InputLabel htmlFor="searchRepo">검색</InputLabel>
                    <Input id="searchRepo" name="searchRepo" type="text" />
                    <Button variant="contained" type="submit">
                        Hi
                    </Button>
                </form>
            </div>
            <div className="searchResultCountArea">
                {searchRepoResult.data?.total_count || 0} 건
            </div>
            {searchRepoResult.isLoading && (
                <div className="loadingArea">Loading...</div>
            )}
            {searchRepoResult.error && <div className="errorArea">Error!</div>}
            <h1>조회된 데이터</h1>
            <div className="searchResultArea">
                {searchRepoResult.data?.items.map((item, idx) => (
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
            <Pagination
                page={searchPage}
                count={pageCount}
                onChange={onChangeSearchPage}
            />
            {/*  저장된 데이터 */}
            <div>
                <h1>저장된 데이터</h1>
                <div>
                    {repoList.map((item, idx) => (
                        <Box key={idx}>
                            <Card variant="outlined">
                                {item.name}
                                <Button onClick={() => onClickDelete(item)}>
                                    제거하기
                                </Button>
                            </Card>
                        </Box>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
