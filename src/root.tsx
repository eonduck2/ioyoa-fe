import { FlowbiteProvider, FlowbiteProviderHeader } from "flowbite-qwik";

import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { isDev } from "@builder.io/qwik/build";
import { QwikPartytown } from "./components/partytown/partytown";

import "./global.css";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <QwikPartytown forward={["gtag", "dataLayer.push"]} />
        <link rel="icon" href="./public/favicon.ico" />
        <script
          async
          type="text/partytown"
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
        />
        <script
          type="text/partytown"
          dangerouslySetInnerHTML={`
            window.dataLayer = window.dataLayer || [];
            window.gtag = function() {
              dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'G-XXXXXX');
          `}
        />
        {!isDev && (
          <link
            rel="manifest"
            href={`${import.meta.env.BASE_URL}manifest.json`}
          />
        )}
        <FlowbiteProviderHeader />
        <RouterHead />
      </head>
      <body lang="en">
        <FlowbiteProvider theme="blue" toastPosition="top-right">
          <RouterOutlet />
        </FlowbiteProvider>
        {!isDev && <ServiceWorkerRegister />}
      </body>
    </QwikCityProvider>
  );
});
