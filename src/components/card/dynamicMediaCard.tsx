import { component$, $ } from "@builder.io/qwik";
import "~/styles/components/card/dynamicMediaCard.css";
import { TDynamicMediaCard } from "~/types/components/card/dynamicMediaCard.type";

export default component$((props: TDynamicMediaCard) => {
  const openYouTubeVideo = $((videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
  });

  return (
    <div class="flex h-auto w-full flex-col items-center justify-center gap-5 overflow-hidden rounded-lg bg-gradient-to-b from-[#FE3E3E] to-[#982525] p-4 shadow-lg transition-all duration-300 hover:shadow-xl md:h-5/6 md:w-4/5 md:p-6 lg:w-3/5">
      <div class="relative mb-4 mt-4 h-48 w-full sm:h-56 md:mb-6 md:mt-10 md:h-64">
        {[
          { thumbnail: props.thumbnail0, videoId: props.videoId0 },
          { thumbnail: props.thumbnail1, videoId: props.videoId1 },
          { thumbnail: props.thumbnail2, videoId: props.videoId2 },
        ].map(({ thumbnail, videoId }, index) => (
          <img
            key={index}
            src={thumbnail}
            alt={`Media content ${index + 1}`}
            class={`card-image absolute cursor-pointer rounded-lg shadow-md ${
              index === 0
                ? "left-0 top-0 h-full w-3/4 object-cover md:w-2/3 lg:w-3/4"
                : index === 1
                  ? "right-0 top-1/4 h-3/4 w-1/2 object-cover md:w-2/5 lg:w-1/2"
                  : "bottom-0 right-1/4 h-2/3 w-2/5 object-cover md:w-1/3 lg:w-2/5"
            }`}
            style={{
              transform: `rotate(${index === 0 ? "-3deg" : index === 1 ? "2deg" : "-2deg"}) translateY(${index === 0 ? "0px" : index === 1 ? "10px" : "5px"})`,
              animation: `float${index + 1} 4s ease-in-out infinite`,
            }}
            onClick$={() => openYouTubeVideo(videoId)}
          />
        ))}
      </div>
      <div class="custom-scroll h-auto w-full overflow-auto rounded-lg border border-gray-300 bg-white p-2 shadow-lg md:h-1/3">
        <div class="h-full w-full p-4">
          <h2 class="mb-2 text-2xl font-bold text-black sm:text-3xl md:text-4xl">
            <span class="text-red-600">YouTube</span> Service Platform
          </h2>
          <br />
          <p class="mb-4 text-base font-medium text-gray-600 sm:text-lg">
            지금 바로 검색을 시작해보세요. 당신만의 유튜브 탐색 도우미가 되어
            드립니다.
          </p>
        </div>
      </div>
    </div>
  );
});
