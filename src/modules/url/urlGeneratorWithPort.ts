import envLoader from "../env/envLoader";
import { envList } from "~/shared/env/envList.static";

export default (path: string): string => envLoader(envList.MAIN_URL) + path;
