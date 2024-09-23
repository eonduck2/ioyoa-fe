import { component$, useSignal } from "@builder.io/qwik";
import { Select } from "flowbite-qwik";

export default component$(() => {
  const selected = useSignal("");
  const countries = [
    { value: "us", name: "United States" },
    { value: "ca", name: "Canada" },
    { value: "fr", name: "France" },
  ];

  return (
    <>
      <div class="flex w-20 flex-col gap-3 p-3">
        <Select
          bind:value={selected}
          options={countries}
          underline
          placeholder="Choose a country"
          label="Underline"
        />
      </div>
    </>
  );
});
