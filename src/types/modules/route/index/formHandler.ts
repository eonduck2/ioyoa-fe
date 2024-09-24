import { $ } from "@builder.io/qwik";
import urlGeneratorWithPort from "~/modules/url/urlGeneratorWithPort";

export const formHandler = $((e: Event, formActionValue: string) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;

  const query =
    (form.querySelector('input[name="searchQuery"]') as HTMLInputElement)
      ?.value || "";
  const category =
    (form.querySelector('select[name="searchCategory"]') as HTMLSelectElement)
      ?.value || "";

  const searchParams = new URLSearchParams();
  if (query) searchParams.append("query", query);
  if (category) searchParams.append("category", category);

  const url = `${urlGeneratorWithPort(formActionValue)}?${searchParams.toString()}`;

  window.location.href = url;
});
