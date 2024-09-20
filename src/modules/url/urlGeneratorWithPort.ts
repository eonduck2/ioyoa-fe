import envLoader from "../env/envLoader";
import { EnvList } from "~/shared/env/envList.static";

export default (path: string): string =>
  envLoader(EnvList.PUBLIC_MAIN_URL) + path;
