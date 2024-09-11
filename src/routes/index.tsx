import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import envLoader from "~/modules/env/envLoader";
import fetcher from "~/modules/fetching/fetcher";
import urlGeneratorWithPort from "~/modules/url/urlGeneratorWithPort";
import { envList } from "~/shared/env/envList.static";

export default component$(() => {
  const response = useSignal("");

  useTask$(async () => {
    const res = await fetcher(
      urlGeneratorWithPort(envLoader(envList.PUBLIC_EP_MAIN)),
    );
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
