## 1. 프로젝트 실행방법

1. node_modules 설치를 위해 package.json이 있는 위치에서 "npm i"
2. 프로젝트 실행을 위해 "npm start"

## 2. 프로젝트 개발 환경

<ul>
    <li>
        npm : 8.19.2
    </li>
    <li>
        node : 18.12.0
    </li>
    <li>
        react : 18.2.0
    </li>
</ul>

## 3. 주요 추가 설치 라이브러리

<ul>
    <li>
        상태관리 : Recoil
    </li>
    <li>
        디자인 : materialUI, styled-components, notistack
    </li>
    <li>
        차트 : apexcharts
    </li>
    <li>
        드래그앤 드롭 : react-beautiful-dnd
    </li>
</ul>

## 4. 참고

1. 자바스크립트로 구현했습니다.
2. 프로젝트 생성은 cra를 이용했습니다.
3. 비동기 통신은 커스텀 훅으로 관리했습니다. (useAxios)
4. 상태관리는 Recoil을 이용했습니다.
5. 사용자 편의성을 고려, 드래그앤 드롭 이벤트를 이용했습니다.
6. 반응형 디자인은 고려되지 않았습니다.

## 5. 추가 구현사항

1. 4개 Repo를 "사용자"별로 저장하도록 구현했습니다.
    - 사용자는 최대 5명 까지 등록 가능합니다.
    - LocalStorage로 구현했습니다.
2. 조회된 Repo의 상세 정보를 볼 수 있는 Dialog를 추가했습니다.
3. Issue의 Label은 배경색을 계산해서 흰색과 검은색 중 가시성이 좋은 색을 글자색으로 지정하도록 했습니다.
