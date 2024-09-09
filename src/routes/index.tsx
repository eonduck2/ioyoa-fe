import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Pagination } from "flowbite-qwik";

export default component$(() => {
  const response = useSignal("");
  const currentPage = useSignal(1);

  useTask$(async () => {
    try {
      console.log("Fetching data...");
      const res = await fetch("http://localhost:8082/");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      response.value = data.message;
      console.log("Response received:", response.value);
    } catch (error) {
      console.error("Error fetching data:", error);
      response.value = "Failed to fetch data.";
    }
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
        {response.value ? <p>{response.value}</p> : <p>Loading...</p>}
      </div>
      <div class="flex gap-3 p-3 text-center">
        <Pagination totalPages={100} currentPage={currentPage} />
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
