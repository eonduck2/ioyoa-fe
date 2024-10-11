import { component$ } from "@builder.io/qwik";
import "~/styles/components/card/dynamicMediaCard.css";
import { TDynamicMediaCard } from "~/types/components/card/dynamicMediaCard.type";

export default component$((props: TDynamicMediaCard) => {
  return (
    <div class="mx-auto h-5/6 w-3/5 overflow-hidden rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
      <div class="relative mb-6 mt-10 h-64">
        {[
          {
            size: 400,
            rotate: "-3deg",
            translateY: "0px",
            animationName: "float1",
          },
          {
            size: 380,
            rotate: "2deg",
            translateY: "10px",
            animationName: "float2",
          },
          {
            size: 360,
            rotate: "-2deg",
            translateY: "5px",
            animationName: "float3",
          },
        ].map((img, index) => (
          <img
            key={index}
            src={props.thumbnail}
            alt={`Media content ${index + 1}`}
            class={`card-image absolute rounded-lg shadow-md ${
              index === 0
                ? "left-0 top-0 h-full w-3/4 object-cover"
                : index === 1
                  ? "right-0 top-1/4 h-3/4 w-1/2 object-cover"
                  : "bottom-0 right-1/4 h-2/3 w-2/5 object-cover"
            }`}
            style={{
              transform: `rotate(${img.rotate}) translateY(${img.translateY})`,
              animation: `${img.animationName} 4s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
      <div class="mt-7 h-1/3 w-full rounded-lg border border-gray-300 bg-white p-2 shadow-lg">
        <div class="h-full w-full rounded-lg border-2 border-blue-400 p-4">
          <h2 class="mb-2 text-4xl font-bold text-black">
            <span class="text-red-600">YouTube</span> 검색 유틸리티
          </h2>
          <p class="mb-4 text-lg text-gray-600">ㅎㅇ</p>
        </div>
      </div>
    </div>
  );
});
