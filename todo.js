// 할 일 삭제 안되고, 페이지 새로고침시 데이터 유지 안됨

// 필요한 HTML 요소들을 선택합니다.
// TODO: 필요한 HTML 요소들을 선택하여 변수에 할당하세요.
// 힌트:
// - document.querySelector()를 사용하여 'ul.list' 선택
// - document.getElementById()를 사용하여 'btnAdd'와 'task' 선택
const list = document.querySelector("ul.list");
const btnAdd = document.getElementById("addBtn");
const task = document.querySelector("#task");

// 초기 할 일 목록을 설정합니다.
let listTask = [
  // TODO: 초기 할 일 목록을 추가하세요.
  // 힌트: 각 할 일은 { content: "할 일 내용", status: "doing" } 형태의 객체입니다.
  {
    content: "할일쓰 1",
    status: "doing",
  },
  {
    content: "완료쓰 1",
    status: "complete",
  },
];

// 이 부분 수정
// 로컬 스토리지에서 저장된 할 일 목록을 불러옵니다.
// TODO: 로컬 스토리지에서 'listTask' 키로 저장된 데이터를 불러와 파싱하세요.
// 힌트:
// - localStorage.getItem('listTask')를 사용하여 데이터를 불러옵니다.
// - JSON.parse()를 사용하여 문자열을 객체로 변환합니다.
// - 불러온 데이터가 있을 경우에만 listTask를 업데이트합니다.
let listTaskData = localStorage.getItem("listTask");
if (listTaskData) {
  listTask = JSON.parse(listTaskData);
}
// 할 일 목록을 로컬 스토리지에 저장하는 함수입니다.
function saveLocalStorage() {
  // TODO: listTask를 JSON 문자열로 변환하여 로컬 스토리지에 저장하세요.
  // 힌트:
  // - JSON.stringify()를 사용하여 listTask를 문자열로 변환합니다.
  // - localStorage.setItem()을 사용하여 'listTask' 키로 데이터를 저장합니다.
  localStorage.setItem("listTask", JSON.stringify(listTask));
}

// '추가' 버튼 클릭 시 실행되는 함수입니다.
// TODO: '추가' 버튼에 클릭 이벤트 리스너를 추가하세요.
// 힌트: btnAdd.onclick = function(event) { ... }를 사용하세요.
// 함수 내부 구현:
btnAdd.addEventListener("click", (e) => {
  // 1. event.preventDefault()를 호출하여 기본 동작을 막습니다.
  e.preventDefault();
  // 2. task 입력 필드의 값을 가져옵니다.
  let content = task.value;
  // 3. 입력 값이 비어있지 않은 경우에만 새로운 할 일을 추가합니다.
  if (content != null) {
    // 4. 새로운 할 일을 listTask 배열의 맨 앞에 추가합니다 (unshift 메서드 사용).
    listTask.unshift({
      content: content,
      status: "doing",
    });
    // 5. addTaskToHTML() 함수를 호출하여 화면을 업데이트합니다.
    addTaskToHTML();
    // 6. 입력 필드를 비웁니다.
    task.value = "";
    // 7. saveLocalStorage() 함수를 호출하여 변경사항을 저장합니다.
    saveLocalStorage();
  }
});
// TODO: 엔터 키 입력 시 새 할 일을 추가하는 기능을 구현하세요.
// 뭔가 문제가 있어...
// 힌트:
// - task 요소에 'keypress' 이벤트 리스너를 추가합니다.
task.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    // - 눌린 키가 'Enter'인 경우에만 새 할 일을 추가하는 로직을 실행합니다.
    let content = task.value;
    if (content != "") {
      listTask.unshift({
        content: content,
        status: "doing",
      });
      addTaskToHTML();
      task.value = "";
      saveLocalStorage();
    }
  }
});
// - 위의 '추가' 버튼 클릭 시 실행되는 로직과 유사한 steps를 따릅니다.

// 할 일 목록을 화면에 표시하는 함수입니다.
function addTaskToHTML() {
  // TODO: 할 일 목록을 화면에 표시하는 로직을 구현하세요.
  // 힌트:
  // 1. list.innerHTML을 비워 기존 목록을 지웁니다.
  list.innerHTML = "";
  // 2. listTask 배열을 순회하며 각 할 일에 대한 HTML 요소를 생성합니다.
  listTask.forEach((task, index) => {
    let createLi = document.createElement("li");
    createLi.className = task.status;
    // 3. 생성한 요소에 클래스, 내용, 이벤트 리스너 등을 추가합니다.
    createLi.innerHTML = `
          <div class="complete-icon" onClick="completedTask(${index})">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <div class="content">${task.content}</div>
          <div class="close-icon" onClick="deleteTask(${index})">
            <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              >
              <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18 17.94 6M18 18 6.06 6"
              />
              </svg>
              </div>
              `;
    // 4. 완성된 요소를 list에 추가합니다.
    list.appendChild(createLi);
  });
}

// 완료 아이콘 클릭 시 할 일의 상태를 변경하는 함수입니다.
function completedTask(index) {
  // TODO: 할 일의 상태를 토글하는 로직을 구현하세요.
  // 힌트:
  // 1. listTask[index].status를 'doing'에서 'complete'로, 또는 그 반대로 변경합니다.
  listTask[index].status =
    listTask[index].status === "doing" ? "complete" : "doing";
  // 2. addTaskToHTML() 함수를 호출하여 화면을 업데이트합니다.
  addTaskToHTML();
  // 3. saveLocalStorage() 함수를 호출하여 변경사항을 저장합니다.
  saveLocalStorage();
}

// 이것도 어렵네
// 삭제 버튼 클릭 시 해당 할 일을 목록에서 제거하는 함수입니다.
function deleteTask(index) {
  // TODO: 할 일을 목록에서 제거하는 로직을 구현하세요.
  // 힌트:
  // 1. filter 메서드를 사용하여 해당 인덱스의 할 일만 제외하고 새 배열을 만듭니다.
  // 2. 새 배열을 listTask에 할당합니다.
  listTask = listTask.filter((_, index1) => {
    return index1 !== index;
  });
  // 3. addTaskToHTML() 함수를 호출하여 화면을 업데이트합니다.
  addTaskToHTML();
  // 4. saveLocalStorage() 함수를 호출하여 변경사항을 저장합니다.
  saveLocalStorage();
}

// 페이지 로드 시 할 일 목록을 화면에 표시합니다.
addTaskToHTML();
