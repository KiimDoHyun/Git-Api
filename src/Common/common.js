export const ID_SAVED_AREA = "SAVED_AREA";
export const ID_SEARCH_RESULT_AREA = "SEARCH_RESULT_AREA";
export const ID_DELETE_AREA = "DELETE_AREA";

// LocalStorage 관련
// 제거
export const removeLocalStorage = (localStorageName = "") => {
    window.localStorage.removeItem(localStorageName);
};

// 저장
export const setLocalStorage = (localStorageName, item) => {
    if (!localStorageName || !item) {
        console.warn("저장할 아이템과 이름은 필수입력값입니다.");
        return;
    }
    window.localStorage.setItem(localStorageName, JSON.stringify(item));
};

// 조회
export const getLocalStorage = (localStorageName = "") => {
    if (!localStorageName) return "";

    return JSON.parse(window.localStorage.getItem(localStorageName));
};
