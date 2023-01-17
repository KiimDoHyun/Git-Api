import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const DetailPage = () => {
    const location = useLocation();

    return <DetailPageBlock>DetailPage</DetailPageBlock>;
};

const DetailPageBlock = styled.div`
    padding: 10px;
    box-sizing: border-box;

    flex: 6;
    background-color: #f6f8fa;
`;
export default DetailPage;
