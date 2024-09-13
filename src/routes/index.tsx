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

    const first_server = await res.json();
    const res_from_vid_srvr = await fetcher(
      urlGeneratorWithPort(first_server.route),
    );

    const data = await res_from_vid_srvr.json();
    // response.value = data.route;

    console.log(data.items);

    // const test_yt = await fetcher(
    //   "https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&maxResults=10&regionCode=kr&key=AIzaSyAdAHdRseIVBU9_40L103fmzt4NPRF4GzU",
    // );

    // test_yt.json().then((data) => {
    //   console.log(data.items[0].snippet);
    // });
  });

  return (
    <>
      <div>{response.value}</div>
      {/* <div>{envLoader(envList.PUBLIC_BUILDER_API_KEY)}</div> */}
    </>
  );
});
