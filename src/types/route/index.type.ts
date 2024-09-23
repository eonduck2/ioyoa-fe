export type TRouteIndexVideoItem = {
  id: string; // id 속성 추가
  snippet: {
    title: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
};
