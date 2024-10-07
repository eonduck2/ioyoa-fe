import THttpMethod from "~/types/http/httpMethod.type";

const HttpMethod: Record<string, THttpMethod> = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
  OPTIONS: "OPTIONS",
  HEAD: "HEAD",
};

export default HttpMethod;
