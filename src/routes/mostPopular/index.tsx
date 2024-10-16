import {
  component$,
  useSignal,
  useTask$,
  useComputed$,
} from "@builder.io/qwik";
import SideBar from "~/components/menus/side/sideBar";
import fetcher from "~/modules/fetching/fetcher";
import urlGeneratorWithPort from "~/modules/url/urlGeneratorWithPort";
import envLoader from "~/modules/env/envLoader";
import { EnvList } from "~/shared/env/envList.static";
import HttpMethod from "~/shared/http/methods/httpMethods.static";
import ytApiUrlGenerator from "~/modules/url/api/ytApiUrlGenerator";
import requestTypes from "~/yt/apiRequestTypes/requestTypes.static";
import trendIndexVideos from "~/yt/videos/trendIndexVideos.static";
import mime from "mime";
import {
  TYouTubeVideo,
  TPopularSearch,
} from "~/types/route/mostPopular/index.type";

export default component$(() => {
  const trendingVideos = useSignal<TYouTubeVideo[]>([]);
  const popularSearches = useSignal<TPopularSearch[]>([]);
  const currentPage = useSignal(1);
  const isLoading = useSignal(true);
  const videosPerPage = 9;

  useTask$(async () => {
    try {
      isLoading.value = true;

      // Fetch trending videos
      const mainServerResponse = await fetcher(
        urlGeneratorWithPort(envLoader(EnvList.PUBLIC_EP_MAIN)),
        {
          method: HttpMethod.POST,
          body: JSON.stringify({ serverType: "videos" }),
          headers: { "Content-Type": mime.getType("json") as string },
        },
      );
      const mainServer = await mainServerResponse.json();

      const youtubeDataResponse = await fetcher(
        urlGeneratorWithPort(mainServer.route),
        {
          method: HttpMethod.POST,
          body: JSON.stringify({
            url: ytApiUrlGenerator(requestTypes.videos, trendIndexVideos),
          }),
          headers: { "Content-Type": mime.getType("json") as string },
        },
      );

      const youtubeData = await youtubeDataResponse.json();
      trendingVideos.value = youtubeData.items;

      // Fetch popular searches
      const redisServerResponse = await fetcher(
        urlGeneratorWithPort(envLoader(EnvList.PUBLIC_EP_MAIN)),
        {
          method: HttpMethod.POST,
          body: JSON.stringify({ serverType: "redis" }),
          headers: { "Content-Type": mime.getType("json") as string },
        },
      );
      const redisServer = await redisServerResponse.json();

      const redisDataResponse = await fetcher(
        urlGeneratorWithPort(redisServer.route),
        {
          method: HttpMethod.POST,
        },
      );

      const redisData = await redisDataResponse.json();
      popularSearches.value = redisData
        .sort((a: TPopularSearch, b: TPopularSearch) => b.Score - a.Score)
        .slice(0, 5);
    } catch (error) {
    } finally {
      isLoading.value = false;
    }
  });

  const paginatedVideos = useComputed$(() => {
    const startIndex = (currentPage.value - 1) * videosPerPage;
    return trendingVideos.value.slice(startIndex, startIndex + videosPerPage);
  });

  const totalPages = useComputed$(() =>
    Math.ceil(trendingVideos.value.length / videosPerPage),
  );

  // Define formatDate function
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div class="flex h-screen overflow-hidden bg-gray-100">
      <div class="hidden w-1/6 xl:block">
        <SideBar />
      </div>
      <main class="flex-1 overflow-y-auto overflow-x-hidden">
        <div class="container mx-auto px-4 py-8">
          <h1 class="mb-8 text-3xl font-bold text-red-600">Trending</h1>
          <div class="grid gap-8 md:grid-cols-3">
            <div class="md:col-span-2">
              <h2 class="mb-4 text-2xl font-semibold">
                📈 인기 급상승 비디오(#50)
              </h2>
              {isLoading.value ? (
                <div class="flex h-64 items-center justify-center">
                  <p>Loading...</p>
                </div>
              ) : trendingVideos.value.length === 0 ? (
                <div class="flex h-64 items-center justify-center">
                  <p>No trending videos available.</p>
                </div>
              ) : (
                <>
                  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {paginatedVideos.value.map((video) => {
                      const thumbnailUrl =
                        video.snippet.thumbnails.maxres?.url ||
                        video.snippet.thumbnails.high?.url ||
                        video.snippet.thumbnails.medium?.url ||
                        ""; // 기본값 설정

                      return (
                        <div
                          key={video.id}
                          class="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg"
                          onClick$={() => {
                            const videoUrl = `https://www.youtube.com/watch?v=${video.id}`;
                            window.open(videoUrl, "_blank"); // 새 탭에서 열기
                          }}
                        >
                          <img
                            src={thumbnailUrl}
                            alt={video.snippet.title}
                            class="h-48 w-full object-cover"
                            width={1280}
                            height={720}
                          />
                          <div class="p-4">
                            <h3 class="mb-2 line-clamp-2 text-lg font-semibold text-gray-800">
                              {video.snippet.title}
                            </h3>
                            <p class="text-sm text-gray-600">
                              {video.snippet.channelTitle}
                            </p>
                            <div class="mt-2 flex items-center text-xs text-gray-500">
                              <span>
                                {Number(
                                  video.statistics.viewCount,
                                ).toLocaleString()}{" "}
                                views
                              </span>
                              <span class="mx-2">•</span>
                              <span>
                                {formatDate(video.snippet.publishedAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {totalPages.value > 1 && (
                    <div class="mt-6 flex justify-center">
                      {Array.from({ length: totalPages.value }, (_, i) => (
                        <button
                          key={i}
                          onClick$={() => (currentPage.value = i + 1)}
                          class={`mx-1 rounded px-3 py-1 ${
                            currentPage.value === i + 1
                              ? "bg-red-600 text-white"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
            <div class="lg:col-span-1">
              <div class="sticky top-4">
                <h2 class="mb-4 text-2xl font-semibold">인기 검색어</h2>
                <div class="mb-4 flex items-center rounded-lg bg-gray-300 p-3 shadow-lg">
                  <div class="flex h-full w-20 items-center justify-center">
                    <span class="font-bold text-gray-700">순위</span>
                  </div>
                  <div class="flex h-full w-16 items-center justify-center">
                    <span class="font-bold text-gray-700">검색어</span>
                  </div>
                  <div class="flex h-full w-80 items-center justify-end">
                    <span class="font-bold text-gray-700">검색 횟수</span>
                  </div>
                </div>
                <ul class="space-y-2 bg-white p-4 shadow-md">
                  {popularSearches.value.map((search, index) => (
                    <li
                      key={search.Member}
                      class="flex items-center justify-between border-b border-gray-200 py-2 last:border-b-0"
                    >
                      <span
                        class={`flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200 text-lg font-bold text-gray-700 text-gray-800`}
                      >
                        {index + 1}
                      </span>
                      <span class="mx-4 flex-1 text-lg font-semibold text-gray-800">
                        {search.Member}
                      </span>
                      <span class="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-600">
                        {search.Score}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
});
