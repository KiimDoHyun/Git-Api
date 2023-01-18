import { Pagination } from "@mui/material";
import React from "react";
import styled from "styled-components";

const PageArea = ({ page, count, onChange }) => {
    return (
        <PageAreaBlock>
            <Pagination
                page={page}
                count={Math.ceil(count / 30)}
                onChange={onChange}
            />
        </PageAreaBlock>
    );
};

const PageAreaBlock = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export default React.memo(PageArea);
