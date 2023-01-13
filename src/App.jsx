import logo from "./logo.svg";
import "./App.css";
import { Button, FormGroup, Input, InputLabel, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import useAxios from "./Hook/useAxios";
import { searchRepoApi } from "./Api/git";
function App() {
    const [searchRepoValue, setSearchRepoValue] = useState("");
    const [searchRepoResult, getSearchRepo] = useAxios(searchRepoApi);

    const onChangeSearchRepo = useCallback(({ target: { value } }) => {
        setSearchRepoValue(value);
    }, []);

    const onClickSearchRepo = useCallback(() => {
        getSearchRepo(searchRepoValue);
    }, [searchRepoValue]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();

        // 입력값
        const inputValue = e.target[0].value;
        getSearchRepo(inputValue);
    }, []);

    useEffect(() => {
        console.log("searchRepoResult:", searchRepoResult);
    }, [searchRepoResult]);

    return (
        <div className="App">
            <div className="searchArea">
                <form onSubmit={onSubmit}>
                    <InputLabel htmlFor="searchRepo">검색</InputLabel>
                    <Input id="searchRepo" name="searchRepo" type="text" />
                    <Button variant="contained" type="submit">
                        Hi
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default App;
