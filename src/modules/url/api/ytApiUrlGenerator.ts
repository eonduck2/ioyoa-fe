import urlJoin from "url-join";
import envLoader from "~/modules/env/envLoader";
import { EnvList } from "~/shared/env/envList.static";

/**
 * * 유튜브 메인 URL 로딩 -> 전달받은 파라미터 (객체 형식의 타입 정의) -> 유튜브 키 조합
 */
export default (apiType: string, params: Record<string, string>) => {
  const __YT_URL_FOR_JOIN = urlJoin(
    envLoader(EnvList.PUBLIC_YT_MAIN_API_URL),
    `${apiType}?`,
  );

  const __YT_API_KEY = envLoader(EnvList.PUBLIC_YT_API_KEY_SUB);

  params.key = __YT_API_KEY;

  const queryParams = new URLSearchParams(params);

  return __YT_URL_FOR_JOIN + queryParams.toString().replace(/%2C/g, ",");
};
