import ky from "ky";
import { THttpOptions } from "~/types/modules/fetching/fetcher.type";
import thrower from "../throw/thrower.module";

export default async (
  url: string,
  options?: THttpOptions,
): Promise<Response> => {
  try {
    const response = await ky(url, { ...options });

    if (!response.ok) {
      thrower;
    }

    return response;
  } catch (error) {
    throw error;
  }
};
