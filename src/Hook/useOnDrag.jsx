import { useSnackbar } from "notistack";
import { useCallback, useRef } from "react";
import { useSetRecoilState } from "recoil";
import {
    ID_DELETE_AREA,
    ID_SAVED_AREA,
    ID_SEARCH_RESULT_AREA,
} from "../Common/common";
import { rc_drag_showDeleteArea, rc_drag_showSaveArea } from "../Store/drag";
import { rc_repo_savedRepoList } from "../Store/repo";

const useOnDrag = () => {
    const dragInfo = useRef({ start: null, end: null });
    const { enqueueSnackbar } = useSnackbar();

    // 저장할 타겟
    const saveTargetRef = useRef({});

    // 저장, 삭제 영역 표시
    const setShowDeleteArea = useSetRecoilState(rc_drag_showDeleteArea);
    const setShowSaveArea = useSetRecoilState(rc_drag_showSaveArea);

    // 저장된 repo 리스트 set
    const setSavedRepoList = useSetRecoilState(rc_repo_savedRepoList);

    /*
    정상적인 이동에 해당하는 경우

    1. 조회된 영역에서 저장된 영역으로 이동하는 경우 (저장하기 기능에 해당한다.)
    2. 저장된 영역에서 제거 영역으로 이동하는 경우 (삭제하기 기능에 해당한다.)
    3. 저장된 영역에서 저장된 영역으로 이동하는 경우 (+ 순서 변경에 해당한다.)
    */
    // 이동 체크
    const checkMovement = useCallback((start, end) => {
        let type = "ERROR";
        let msg = "";

        // 에러
        if (start === ID_SEARCH_RESULT_AREA && end === ID_SEARCH_RESULT_AREA) {
            type = "ERROR";
            msg = "조회된 데이터의 순서는 변경할 수 없습니다.";
        } else if (start === ID_SAVED_AREA && end === ID_SEARCH_RESULT_AREA) {
            type = "ERROR";
            msg = "이미 저장된 데이터를 조회 영역으로 이동할 수 없습니다.";
        }
        // 정상 이동
        // 1번 경우에 해당함
        else if (start === ID_SEARCH_RESULT_AREA && end === ID_SAVED_AREA) {
            type = "SAVE";
            msg = "데이터가 저장되었습니다.";
        }
        // 2번 경우에 해당함
        else if (start === ID_SAVED_AREA && end === ID_DELETE_AREA) {
            type = "DELETE";
            msg = "데이터가 제거되었습니다.";
        }
        // 3번 경우에 해당함
        else if (start === ID_SAVED_AREA && end === ID_SAVED_AREA) {
            type = "REORDER";
            msg = "데이터의 순서가 변경되었습니다.";
        } else {
            type = "ERROR";
            msg = "잘못된 이동입니다.";
        }

        return { type, msg };
    }, []);

    const onDragStart = useCallback(
        (e) => {
            // onDragEnd에서 사용하기 위해 현재 정보를 저장한다.
            dragInfo.current.start = e;
            // console.log("e: ", e);

            const {
                source: { droppableId },
            } = e;

            // 저장 영역에서 드래그를 하는 경우 제거 영역을 표시해준다.
            if (droppableId === ID_SAVED_AREA) {
                setShowDeleteArea(true);
            }
            // 조회 영역에서 드래그를 하는 경우 저장 영역을 표시해 준다.
            else {
                setShowSaveArea(true);
            }
        },
        [setShowDeleteArea, setShowSaveArea]
    );

    const onDragEnd = useCallback(
        (e) => {
            if (!e.destination) return;
            const startID = dragInfo.current.start.source.droppableId;
            const endID = e.destination.droppableId;
            const dragItemId = e.draggableId;
            const dragStartIndex = dragInfo.current.start.source.index;
            const dragEndIndex = e.destination.index;

            // 이동 체크
            const { type, msg } = checkMovement(startID, endID);

            switch (type) {
                case "ERROR":
                    enqueueSnackbar(msg, { variant: "warning" });
                    break;
                case "SAVE":
                    setSavedRepoList((prevSavedRepoList) => {
                        const copy = [...prevSavedRepoList];
                        if (prevSavedRepoList.length === 4) {
                            enqueueSnackbar("최대 4개까지 저장 가능합니다.", {
                                variant: "warning",
                            });
                            return prevSavedRepoList;
                        } else {
                            copy.splice(
                                e.destination.index,
                                0,
                                saveTargetRef.current
                            );
                            enqueueSnackbar(msg, { variant: "success" });
                            return copy;
                        }
                    });
                    break;

                case "DELETE":
                    //저장된 리스트의 제거는 SavedList의 setter만 있어도 가능하다.
                    setSavedRepoList((prevSavedData) =>
                        prevSavedData.filter(
                            (filterItem) => String(filterItem.id) !== dragItemId
                        )
                    );
                    enqueueSnackbar(msg, { variant: "error" });
                    break;

                case "REORDER":
                    //저장된 리스트의 순서변경은 SavedList의 setter만 있어도 가능하다.
                    if (dragStartIndex === dragEndIndex) {
                        break;
                    }

                    setSavedRepoList((prevSavedData) => {
                        const copySavedData2 = [...prevSavedData];
                        const target2 = copySavedData2[dragStartIndex];
                        copySavedData2.splice(dragStartIndex, 1);
                        copySavedData2.splice(dragEndIndex, 0, target2);

                        return copySavedData2;
                    });
                    enqueueSnackbar(msg, { variant: "info" });
                    break;

                default:
                    enqueueSnackbar(msg, { variant: "info" });
                    break;
            }
            setShowDeleteArea(false);
            setShowSaveArea(false);
        },
        [
            enqueueSnackbar,
            checkMovement,
            setSavedRepoList,
            setShowDeleteArea,
            setShowSaveArea,
        ]
    );

    return [saveTargetRef, onDragStart, onDragEnd];
};

export default useOnDrag;
