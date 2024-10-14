import { component$, useSignal, useStyles$, $ } from "@builder.io/qwik";
import { IconSearchOutline } from "flowbite-qwik-icons";
import SideBar from "~/components/menus/side/sideBar";
import "../../styles/routes/search/index.css";

export default component$(() => {
  const searchQuery = useSignal("");

  const handleSearch = $((e: Event) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery.value);
  });

  return (
    <>
      <div class="flex overflow-x-hidden">
        <SideBar />
        <main class="main-content flex h-screen w-screen flex-col items-center justify-center">
          <h1 class="mb-8 text-4xl font-bold text-red-600">
            YouTube <span class="text-black">Search</span>
          </h1>
          <form onSubmit$={handleSearch} class="w-full max-w-md">
            <div class="flex items-center border-b border-red-500 py-2">
              <input
                type="text"
                class="input"
                placeholder="검색어를 입력하세요"
                value={searchQuery.value}
                onInput$={(e) =>
                  (searchQuery.value = (e.target as HTMLInputElement).value)
                }
              />
              <button type="submit" class="button">
                <IconSearchOutline class="mr-1 h-4 w-4" />
                검색
              </button>
            </div>
          </form>
          <p class="mt-4 text-gray-600">인기 검색어: 음악, 요리, 여행, 기술</p>
        </main>
      </div>
    </>
  );
});
