import { component$ } from "@builder.io/qwik";
import "~/styles/components/card/dynamicMediaCard.css";
import { TDynamicMediaCard } from "~/types/components/card/dynamicMediaCard.type";

export default component$((props: TDynamicMediaCard) => {
  return (
    <div class="mx-auto h-5/6 w-3/5 overflow-hidden rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
      <div class="relative mb-6 mt-10 h-64">
        {/* 각 썸네일에 대한 이미지 설정 */}
        {[props.thumbnail0, props.thumbnail1, props.thumbnail2].map(
          (thumbnail, index) => (
            <img
              key={index}
              src={thumbnail}
              alt={`Media content ${index + 1}`}
              class={`card-image absolute rounded-lg shadow-md ${
                index === 0
                  ? "left-0 top-0 h-full w-3/4 object-cover"
                  : index === 1
                    ? "right-0 top-1/4 h-3/4 w-1/2 object-cover"
                    : "bottom-0 right-1/4 h-2/3 w-2/5 object-cover"
              }`}
              style={{
                transform: `rotate(${index === 0 ? "-3deg" : index === 1 ? "2deg" : "-2deg"}) translateY(${index === 0 ? "0px" : index === 1 ? "10px" : "5px"})`,
                animation: `float${index + 1} 4s ease-in-out infinite`,
              }}
            />
          ),
        )}
      </div>
      <div class="custom-scroll mt-7 h-1/3 w-full overflow-auto rounded-lg border border-gray-300 bg-white p-2 shadow-lg">
        <div class="h-full w-full  p-4">
          <h2 class="mb-2 text-4xl font-bold text-black">
            <span class="text-red-600">YouTube</span> Service Platform
          </h2>
          <br />
          <p class="mb-4 text-lg text-gray-600">
            지금 바로 검색을 시작해보세요. 당신만의 유튜브 탐색 도우미가 되어
            드립니다.
          </p>
        </div>
      </div>
    </div>
  );
});
