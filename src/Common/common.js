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

// 배경색에 따른 글자색 조정
// 어두운 배경 -> 흰색
// 밝은 배경 -> 검은색
// 출처: https://gist.github.com/krabs-github/ec56e4f1c12cddf86ae9c551aa9d9e04
export const defineLightOrDark = (backgroundColor) => {
    let r = null;
    let g = null;
    let b = null;
    let hsp = null;

    let color = +(
        "0x" +
        backgroundColor
            .slice(1)
            .replace(backgroundColor.length < 5 && /./g, "$&$&")
    );

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;

    // HSP equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

    // Using the HSP value, determine whether the color is light or dark
    // light
    if (hsp > 127.5) {
        return "black";
    }
    // dark
    else {
        return "white";
    }
};
