import { component$, useSignal, useTask$, $ } from "@builder.io/qwik";
import { IconSearchOutline } from "flowbite-qwik-icons";
import SideBar from "~/components/menus/side/sideBar";
import "../../styles/routes/search/index.css";
import fetcher from "~/modules/fetching/fetcher";
import urlGeneratorWithPort from "~/modules/url/urlGeneratorWithPort";
import envLoader from "~/modules/env/envLoader";
import { EnvList } from "~/shared/env/envList.static";
import HttpMethod from "~/shared/http/methods/httpMethods.static";
import ytApiUrlGenerator from "~/modules/url/api/ytApiUrlGenerator";
import requestTypes from "~/yt/apiRequestTypes/requestTypes.static";
import mime from "mime";
import querySearcher from "~/modules/yt/search/querySearcher";

export default component$(() => {
  const searchQuery = useSignal("");
  const searchType = useSignal("channel");
  const searchTask = useSignal(false);
  const searchResult = useSignal(null);

  const handleSearch = $((e: Event) => {
    e.preventDefault();
    console.log("이종수");
    searchTask.value = true;
  });

  useTask$(async ({ track }) => {
    track(() => searchTask.value);

    if (searchTask.value) {
      try {
        const res = await fetcher(
          urlGeneratorWithPort(envLoader(EnvList.PUBLIC_EP_MAIN)),
        );

        const first_server = await res.json();
        const first_server_route = first_server.route;
        const res_from_sec_srvr = await fetcher(
          urlGeneratorWithPort(first_server_route),
          {
            method: HttpMethod.POST,
            body: JSON.stringify({
              url: ytApiUrlGenerator(
                requestTypes.search,
                querySearcher(searchQuery.value, searchType.value),
              ),
            }),
            headers: { "Content-Type": mime.getType("json") as string },
          },
        );

        const data = await res_from_sec_srvr.json();
        searchResult.value = data;
        console.log("검색 결과:", data);
      } catch (error) {
        console.error("검색 중 오류 발생:", error);
      } finally {
        searchTask.value = false;
      }
    }
  });

  return (
    <>
      <div class="flex overflow-x-hidden">
        <SideBar />
        <main class="main-content flex h-screen w-screen flex-col items-center justify-center">
          <h1 class="mb-8 text-4xl font-bold text-red-600">
            YouTube <span class="text-black">Search</span>
          </h1>
          <form
            preventdefault:submit
            onSubmit$={handleSearch}
            class="w-full max-w-md"
          >
            <div class="flex items-center border-b border-red-500 py-2">
              <select
                bind:value={searchType}
                class="mr-2 cursor-pointer appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="channel">Channel</option>
                <option value="video">Video</option>
                <option value="playlist">Playlist</option>
              </select>
              <input
                type="text"
                class="input flex-grow"
                placeholder="검색어를 입력하세요"
                bind:value={searchQuery}
              />
              <button type="submit" class="button ml-2">
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
