import { useEffect, useRef, useState } from "react";
import { useCallback } from "react";

// body,
const useAxios = (initialApi) => {
    const [state, setState] = useState({
        apiResponse: null,
        data: null,
        error: null,
        isLoading: false,
    });
    const body = useRef(null);
    const requestApi = useRef(initialApi);

    //  사용자가 호출할 함수
    const getData = useCallback((body_input) => {
        body.current = body_input;
        setState((prev) => ({
            ...prev,
            isLoading: true,
        }));
    }, []);

    // 데이터를 가져올 함수
    const callApi = useCallback(async () => {
        const requestApi_real = requestApi.current;
        if (!requestApi_real) {
            console.warn("호출할 api 가 정의되지 않았습니다.");
            return;
        }

        let data = null;
        let error = null;
        let _apiResponse = null;
        try {
            const apiResponse = await requestApi_real(body.current);
            /*
                200번대 응답 (성공)인 경우 data에 값이 할당
                400번대 응답 (실패)인 경우 error에 값이 할당
            */
            data = apiResponse.data;
            _apiResponse = apiResponse;
        } catch (e) {
            error = e.response;
            // console.error("[Axios Error]: ", e);
        } finally {
            setState({
                apiResponse: _apiResponse,
                data,
                error,
                isLoading: false,
            });
        }
    }, []);

    // 초기 api 호출 함수를 변경하는 용도
    const changeApi = useCallback(
        (inputApi) => (requestApi.current = inputApi),
        []
    );

    useEffect(() => {
        if (state.isLoading) {
            callApi();
        }
    }, [state, callApi]);

    return [state, getData, changeApi];
};

export default useAxios;
