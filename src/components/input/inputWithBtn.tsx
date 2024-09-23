import { component$, useSignal } from "@builder.io/qwik";
import { Input, Button } from "flowbite-qwik";
import { IconSearchOutline } from "flowbite-qwik-icons";

export default component$(() => {
  const val = useSignal("");
  return (
    <div class="p-3">
      <Input
        bind:value={val}
        label="First name"
        placeholder="First name"
        size="lg"
        prefix={
          <IconSearchOutline class="h-5 w-5 text-gray-500 dark:text-gray-400" />
        }
        suffix={<Button>Hello</Button>}
      />
    </div>
  );
});
