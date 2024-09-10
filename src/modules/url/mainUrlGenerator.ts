import urlJoin from "url-join";
import envLoader from "../env/envLoader";
import { envList } from "~/shared/env/envList.static";

export default (...paths: string[]): string =>
  urlJoin(envLoader(envList.MAIN_URL), ...paths);
