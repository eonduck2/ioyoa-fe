import { component$, useSignal } from "@builder.io/qwik";
import { Select } from "flowbite-qwik";
import type { TSelectUnderlineProps } from "~/types/components/select/selectUnderline.type";

export default component$<TSelectUnderlineProps>(({ name, options }) => {
  const selected = useSignal("");

  return (
    <div class="flex w-1/2 flex-col gap-3 p-3">
      <Select name={name} bind:value={selected} options={options} underline />
    </div>
  );
});
