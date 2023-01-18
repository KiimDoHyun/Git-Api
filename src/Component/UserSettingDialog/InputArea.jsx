import { IconButton, Input } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";

const InputArea = ({ onSubmit }) => {
    return (
        <>
            <h4>Add User</h4>
            <InputAreaForm onSubmit={onSubmit}>
                <Input sx={{ m: 1, width: "80%" }} />
                <IconButton type="submit" style={{ width: "10%" }}>
                    <AddIcon />
                </IconButton>
            </InputAreaForm>
        </>
    );
};

const InputAreaForm = styled.form`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

export default React.memo(InputArea);
