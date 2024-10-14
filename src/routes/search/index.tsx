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
import SearchResult from "~/components/search/searchResult";

export default component$(() => {
  const searchQuery = useSignal("");
  const searchType = useSignal("channel");
  const searchTask = useSignal(false);
  const searchResult = useSignal(null);
  const hasSearched = useSignal(false);

  const handleSearch = $((e: Event) => {
    e.preventDefault();
    searchTask.value = true;
    hasSearched.value = true;
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
      } finally {
        searchTask.value = false;
      }
    }
  });

  const handleLoadMore$ = $(async () => {
    console.log("더 많은 결과 로드");
  });

  return (
    <div class="flex h-screen overflow-hidden">
      <div class="w-1/6">
        <SideBar />
      </div>
      <main
        class={`flex w-5/6 flex-1 flex-col overflow-hidden ${
          hasSearched.value ? "justify-start" : "justify-center"
        } items-center`}
      >
        <div
          class={`mx-auto w-full max-w-md transition-all duration-300 ${
            hasSearched.value ? "mb-4" : "mb-0"
          }`}
        >
          {!hasSearched.value && (
            <h1
              class={`mb-8 text-center text-4xl font-bold text-red-600 transition-all duration-300`}
            >
              YouTube <span class="text-black">Search</span>
            </h1>
          )}

          {/* Search Form */}
          <form preventdefault:submit onSubmit$={handleSearch} class="w-full">
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
        </div>

        {/* Search Results */}
        {hasSearched.value && (
          <div class="flex-1 overflow-y-auto px-4">
            {searchResult.value && (
              <SearchResult
                searchResult={searchResult.value}
                onLoadMore$={handleLoadMore$}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
});
