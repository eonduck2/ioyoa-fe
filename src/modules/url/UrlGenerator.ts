import urlJoin from "url-join";

export default (...paths: string[]): string => urlJoin(...paths);
