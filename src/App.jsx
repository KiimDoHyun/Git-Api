import "./App.css";
import {
    Box,
    Button,
    Card,
    Input,
    InputLabel,
    Pagination,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import useAxios from "./Hook/useAxios";
import { searchRepoApi } from "./Api/git";
import SetRepoList from "./Setting/SetRepoList";
function App() {
    const [searchRepoResult, getSearchRepo] = useAxios(searchRepoApi);
    const [searchValue, setSearchValue] = useState("");
    const [searchPage, setSearchPage] = useState(1);

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

    useEffect(() => {
        // 에러가 발생한다면?
        // 데이터는 안보일 것이다.
    }, [searchRepoResult]);

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
        <div className="App">
            <SetRepoList />
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
                        <Card variant="outlined">{item.name}</Card>
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
            </div>
        </div>
    );
}

export default App;
