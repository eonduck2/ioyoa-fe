import { component$, useTask$, useStore } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import getChannelDetails from "~/modules/channel/getChannelDetails";

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

    // 채널 데이터 저장
    channelData.title = snippet.localized.title;
    channelData.description = snippet.localized.description;
    channelData.customUrl = snippet.customUrl;
    channelData.publishedAt = snippet.publishedAt;
    channelData.thumbnails = snippet.thumbnails;
    channelData.statistics = statistics;
    channelData.relatedPlaylists = contentDetails.relatedPlaylists;
    channelData.country = snippet.country;
    channelData.privacyStatus = status.privacyStatus;
  });

  // 숫자를 포맷팅하는 함수
  const formatNumber = (num: string) => {
    return new Intl.NumberFormat("ko-KR").format(parseInt(num, 10));
  };

  return (
    <div class="mx-auto max-w-2xl p-5">
      {/* 프로필 섹션 */}
      <div class="mb-5 flex items-center gap-5">
        <img
          src={channelData.thumbnails.high.url}
          alt={`${channelData.title} 썸네일`}
          class="h-36 w-36 rounded-full"
        />
        <div class="flex-1">
          <h1 class="text-2xl font-bold">{channelData.title}</h1>
          <p class="text-gray-600">{channelData.country}</p>
          <p class="text-lg font-semibold">
            {formatNumber(channelData.statistics.subscriberCount)} Subscribers
          </p>
          <a
            href={`https://youtube.com/${channelData.customUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            class="text-red-600"
          >
            {channelData.customUrl}
          </a>
        </div>
      </div>

      {/* 설명 섹션 */}
      <div class="mb-5">
        <h2 class="text-xl font-semibold">About the Channel</h2>
        <p class="whitespace-pre-line">{channelData.description}</p>
      </div>

      {/* 통계 섹션 */}
      <div class="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div class="rounded-lg bg-gray-100 p-4 text-center">
          <span class="text-sm text-gray-500">Videos</span>
          <strong class="block text-xl">
            {formatNumber(channelData.statistics.videoCount)}개
          </strong>
        </div>
        <div class="rounded-lg bg-gray-100 p-4 text-center">
          <span class="text-sm text-gray-500">Views</span>
          <strong class="block text-xl">
            {formatNumber(channelData.statistics.viewCount)}회
          </strong>
        </div>
        <div class="rounded-lg bg-gray-100 p-4 text-center">
          <span class="text-sm text-gray-500">Subscribers</span>
          <strong class="block text-xl">
            {formatNumber(channelData.statistics.subscriberCount)}명
          </strong>
        </div>
      </div>

      {/* 재생목록으로 이동 버튼 */}
      <div class="text-center">
        <a
          href={`https://www.youtube.com/playlist?list=${channelData.relatedPlaylists.uploads}`}
          target="_blank"
          class="inline-block rounded-lg bg-red-600 px-4 py-2 text-white"
        >
          View Uploads
        </a>
      </div>
    </div>
  );
});
