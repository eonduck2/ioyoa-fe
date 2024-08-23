import { component$, useTask$, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  // 상태 관리
  const state = useStore({ response: "" });

  // 비동기 요청을 위한 useTask$ 사용
  useTask$(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const res = await fetch("http://localhost:8080/");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const text = await res.json(); // 문자열 응답을 처리
        state.response = text; // 응답을 상태에 저장
        console.log(state.response);
      } catch (error) {
        console.error("Error fetching data:", error);
        state.response = "Failed to fetch data."; // 에러 메시지 상태 업데이트
      }
    };

    fetchData(); // 비동기 요청 수행
  });

  return (
    <>
      <h1>Hi 👋</h1>
      <div>
        Can't wait to see what you build with Qwik!
        <br />
        Happy coding.
      </div>
      <div>
        <h2>Server Response:</h2>
        <p>{state.response}</p> {/* 서버 응답 표시 */}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
