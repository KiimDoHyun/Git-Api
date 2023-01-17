import React, { useCallback } from "react";

const useOnDrag = () => {
    const onDragStart = useCallback((e) => {
        console.log("e: ", e);
    }, []);
    const onDragEnd = useCallback((e) => {
        console.log("e: ", e);
    }, []);
    return [onDragStart, onDragEnd];
};

export default useOnDrag;
