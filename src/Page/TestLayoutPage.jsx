import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Pagination,
    Paper,
    Tooltip,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
const TestLayoutPage = () => {
    const [list, setList] = useState([1, 2, 3]);
    const listRef = useRef([]);

    useEffect(() => {
        listRef.current = list;
    }, [list]);

    const check = useCallback(() => {
        console.log("listRef: ", listRef);
    }, []);
    return (
        <TestLayoutPageBlock>
            <div className="savedList">
                <button onClick={() => setList(list.concat(99))}>ADD</button>
                <button onClick={check}>Check</button>
                <h2>Saved Repo List</h2>
                <div>
                    <List>
                        <ListItem>
                            <ListItemButton>
                                <ListItemText
                                    primary="HeaderArea"
                                    secondary="Name of Repository"
                                />
                                <ListItemIcon>
                                    <Tooltip title="삭제하기">
                                        <DeleteForeverIcon />
                                    </Tooltip>
                                    <Tooltip title="자세히">
                                        <ArrowRightAltIcon />
                                    </Tooltip>
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="HeaderArea"
                                secondary="Name of Repository"
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="HeaderArea"
                                secondary="Name of Repository"
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="HeaderArea"
                                secondary="Name of Repository"
                            />
                        </ListItem>
                    </List>
                </div>
            </div>
            <div className="contents">
                <div className="searchArea"></div>
                <div className="repoListArea">
                    <Paper elevation={1} className="repoItem">
                        <h2>hi</h2>
                    </Paper>
                    <Paper elevation={1} className="repoItem">
                        <h2>hi</h2>
                    </Paper>
                    <Paper elevation={1} className="repoItem">
                        <h2>hi</h2>
                    </Paper>
                    <Paper elevation={1} className="repoItem">
                        <h2>hi</h2>
                    </Paper>
                    <Paper elevation={1} className="repoItem">
                        <h2>hi</h2>
                    </Paper>
                    <Paper elevation={1} className="repoItem">
                        <h2>hi</h2>
                    </Paper>
                    <Paper elevation={1} className="repoItem">
                        <h2>hi</h2>
                    </Paper>{" "}
                    <Paper elevation={1} className="repoItem">
                        <h2>hi</h2>
                    </Paper>{" "}
                    <Paper elevation={1} className="repoItem">
                        <h2>hi</h2>
                    </Paper>{" "}
                    <Paper elevation={1} className="repoItem">
                        <h2>hi</h2>
                    </Paper>{" "}
                    <Paper elevation={1} className="repoItem">
                        <h2>hi</h2>
                    </Paper>{" "}
                    <Paper elevation={1} className="repoItem">
                        <h2>hi</h2>
                    </Paper>{" "}
                    <Paper elevation={1} className="repoItem">
                        <h2>hi</h2>
                    </Paper>{" "}
                    <Paper elevation={1} className="repoItem">
                        <h2>hi</h2>
                    </Paper>{" "}
                    <Paper elevation={1} className="repoItem">
                        <h2>hi</h2>
                    </Paper>{" "}
                    <Paper elevation={1} className="repoItem">
                        <h2>hi</h2>
                    </Paper>{" "}
                    <Paper elevation={1} className="repoItem">
                        <h2>hi</h2>
                    </Paper>
                    <Paper elevation={1} className="repoItem">
                        <h2>hi</h2>
                    </Paper>
                    <Paper elevation={1} className="repoItem">
                        <h2>hi</h2>
                    </Paper>
                    <Paper elevation={1} className="repoItem">
                        <h2>hi</h2>
                    </Paper>
                    <Paper elevation={1} className="repoItem">
                        <h2>hi</h2>
                    </Paper>
                    <Paper elevation={1} className="repoItem">
                        <h2>hi</h2>
                    </Paper>
                    <Paper elevation={1} className="repoItem">
                        <h2>hi</h2>
                    </Paper>
                    <Paper elevation={1} className="repoItem">
                        <h2>hi</h2>
                    </Paper>
                    <Paper elevation={1} className="repoItem">
                        <h2>hi</h2>
                    </Paper>
                    <Paper elevation={1} className="repoItem">
                        <h2>bye</h2>
                    </Paper>
                </div>
                <div className="pagerArea">
                    <Pagination count={30} />
                </div>
            </div>
        </TestLayoutPageBlock>
    );
};

const TestLayoutPageBlock = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;

    .savedList,
    .contents,
    .repoListArea {
        padding: 10px;
        box-sizing: border-box;
    }

    .savedList {
        flex: 1;

        text-align: left;
    }

    .savedList h2 {
        padding-left: 16px;
    }

    .contents {
        flex: 4;
        background-color: #d7d7d7;

        display: grid;
        grid-template-rows: 50px 1fr 50px;

        gap: 10px;
    }

    .searchArea {
        width: 100%;
        height: 50px;
        background-color: blue;
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
export default TestLayoutPage;
