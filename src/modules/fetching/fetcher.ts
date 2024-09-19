import ky from "ky";
import type { THttpOptions } from "~/types/modules/fetching/fetcher.type";
import thrower from "../throw/thrower";

export default async (
  url: string,
  options?: THttpOptions,
): Promise<Response> => {
  const response = await ky(url, { ...options });

  if (!response.ok) {
    thrower();
  }

  return response;
};
