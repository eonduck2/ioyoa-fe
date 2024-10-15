import { component$, useTask$, useStore } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import {
  IconCalendarEditOutline,
  IconVideoCameraOutline,
  IconEyeOutline,
  IconUserAddOutline,
  IconGlobeOutline,
  IconLinkOutline,
  IconSwatchbookOutline,
} from "flowbite-qwik-icons";
import getChannelDetails from "~/modules/channel/getChannelDetails";
import SideBar from "~/components/menus/side/sideBar"; // Import the SideBar component

export default component$(() => {
  const location = useLocation();
  const channelId = location.params.id;
  const channelData = useStore({
    title: "",
    description: "",
    customUrl: "",
    publishedAt: "",
    thumbnails: {
      high: { url: "" },
    },
    statistics: {
      viewCount: "",
      subscriberCount: "",
      videoCount: "",
    },
    relatedPlaylists: { uploads: "" },
    country: "",
    privacyStatus: "",
  });

  useTask$(async () => {
    const data = await getChannelDetails(channelId);
    const snippet = data.items[0].snippet;
    const statistics = data.items[0].statistics;
    const status = data.items[0].status;
    const contentDetails = data.items[0].contentDetails;

    channelData.title = snippet.localized.title;
    channelData.description = snippet.localized.description;
    channelData.customUrl = snippet.customUrl;
    channelData.publishedAt = snippet.publishedAt;
    channelData.thumbnails = snippet.thumbnails;
    channelData.statistics = statistics;
    channelData.relatedPlaylists = contentDetails.relatedPlaylists;
    channelData.country = snippet.country;
    channelData.privacyStatus = status.privacyStatus;

    console.log(channelData.relatedPlaylists.uploads);
  });

  const formatNumber = (num: string) => {
    return new Intl.NumberFormat("ko-KR").format(parseInt(num, 10));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  return (
    <div class="flex h-screen overflow-hidden">
      <div class="hidden w-1/6 xl:block">
        <SideBar /> {/* Include the sidebar here */}
      </div>
      <main class="flex flex-1 flex-col overflow-hidden">
        <div class="mx-auto max-w-4xl p-5">
          <div class="mb-8 overflow-hidden rounded-lg bg-white shadow-lg">
            <div class="relative h-40 bg-gradient-to-r from-green-500 to-red-600">
              <img
                src={channelData.thumbnails.high.url}
                alt={`${channelData.title} thumbnail`}
                class="absolute bottom-0 left-1/2 h-32 w-32 -translate-x-1/2 translate-y-1/2 transform rounded-full border-4 border-white shadow-lg"
              />
            </div>
            <div class="mt-16 p-6 text-center">
              <h1 class="mb-2 text-3xl font-bold text-gray-800">
                {channelData.title}
              </h1>

              <p class="mb-4 flex items-center justify-center text-gray-600">
                <IconGlobeOutline class="mr-2 h-4 w-4" />
                {channelData.country}
              </p>

              <a
                href={`https://youtube.com/${channelData.customUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center text-blue-600 hover:underline"
              >
                <IconLinkOutline class="mr-1 h-4 w-4" />
                {channelData.customUrl}
              </a>
            </div>
          </div>

          <div class="mb-8 grid gap-6 md:grid-cols-2">
            <div class="rounded-lg bg-white p-6 shadow-lg">
              <h2 class="mb-4 text-xl font-semibold text-gray-800">
                채널 설명
              </h2>
              <p class="whitespace-pre-line text-gray-600">
                {channelData.description}
              </p>
            </div>
            <div class="rounded-lg bg-white p-6 shadow-lg">
              <h2 class="mb-4 text-xl font-semibold text-gray-800">
                채널 상세 정보
              </h2>
              <div class="grid grid-cols-2 gap-4">
                <div class="rounded-lg bg-gray-100 p-4 text-center">
                  <IconVideoCameraOutline class="mx-auto mb-2 h-6 w-6 text-red-500" />
                  <span class="text-sm text-gray-500">업로드 영상</span>
                  <strong class="block text-xl text-gray-800">
                    {formatNumber(channelData.statistics.videoCount)}
                  </strong>
                </div>
                <div class="rounded-lg bg-gray-100 p-4 text-center">
                  <IconUserAddOutline class="mx-auto mb-2 h-6 w-6 text-red-500" />
                  <span class="text-sm text-gray-500">구독자</span>
                  <strong class="block text-xl text-gray-800">
                    {formatNumber(channelData.statistics.subscriberCount)}
                  </strong>
                </div>
                <div class="rounded-lg bg-gray-100 p-4 text-center">
                  <IconEyeOutline class="mx-auto mb-2 h-6 w-6 text-red-500" />
                  <span class="text-sm text-gray-500">누적 조회수</span>
                  <strong class="block text-xl text-gray-800">
                    {formatNumber(channelData.statistics.viewCount)}
                  </strong>
                </div>

                <div class="rounded-lg bg-gray-100 p-4 text-center">
                  <IconCalendarEditOutline class="mx-auto mb-2 h-6 w-6 text-red-500" />
                  <span class="text-sm text-gray-500">가입일</span>
                  <strong class="block text-xl text-gray-800">
                    {formatDate(channelData.publishedAt)}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center">
            <a
              href={`https://www.youtube.com/playlist?list=${channelData.relatedPlaylists.uploads}`}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center rounded-lg bg-red-600 px-6 py-3 text-white transition-colors hover:bg-red-700"
            >
              <IconSwatchbookOutline class="mr-2 h-5 w-5" />
              업로드 동영상 보기
            </a>
          </div>
        </div>
      </main>
    </div>
  );
});
