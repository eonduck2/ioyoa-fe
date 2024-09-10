import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import envLoader from "~/modules/env/envLoader";
import fetcher from "~/modules/fetching/fetcher";
import mainUrlGenerator from "~/modules/url/mainUrlGenerator";
import urlGeneratorWithPort from "~/modules/url/urlGeneratorWithPort";
import { envList } from "~/shared/env/envList.static";

export default component$(() => {
  const response = useSignal("");

  useTask$(async () => {
    console.log(urlGeneratorWithPort(envList.EP_MAIN));

    const res = await fetcher("http://localhost:8080/");
    const data = await res.json();
    response.value = data.message;
  });

  return (
    <>
      <div>{response.value}</div>
      <div>{envLoader(envList.PUBLIC_BUILDER_API_KEY)}</div>
    </>
  );
});
