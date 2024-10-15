import { component$, useSignal } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";

interface SearchResultProps {
  searchResult: any;
  onLoadMore$: PropFunction<() => Promise<void>>;
  isLoadingMore: boolean;
  hasMoreResults: boolean;
}

export default component$((props: SearchResultProps) => {
  if (!props.searchResult || !props.searchResult.pageInfo) {
    return <div class="p-4">검색 결과가 없습니다.</div>;
  }

  const { totalResults } = props.searchResult.pageInfo;
  const items = props.searchResult.items || [];

  return (
    <div class="p-4">
      <h2 class="mb-4 text-xl font-bold">검색 결과: {totalResults}개</h2>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item: any) => (
          <div
            key={item.id.channelId}
            class="overflow-hidden rounded-lg border shadow-lg"
          >
            <div class="w-full">
              <img
                src={item.snippet.thumbnails.high.url}
                alt={item.snippet.title}
                class="h-48 w-full object-cover"
                width={800}
                height={800}
              />
            </div>
            <div class="p-4">
              <h3 class="mb-2 text-lg font-bold">{item.snippet.title}</h3>
              <p class="mb-2 text-sm text-gray-600">
                {item.snippet.channelTitle}
              </p>
              <p class="text-xs text-gray-500">
                가입일: &nbsp;
                {new Date(item.snippet.publishTime).toLocaleDateString()}
              </p>
              <p class="mt-2 line-clamp-2 text-sm">
                {item.snippet.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {props.hasMoreResults && (
        <div class="mt-4 text-center">
          <button
            onClick$={props.onLoadMore$}
            class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
            disabled={props.isLoadingMore}
          >
            {props.isLoadingMore ? "로딩 중..." : "더 보기"}
          </button>
        </div>
      )}
    </div>
  );
});
