import { component$, useSignal, PropFunction } from "@builder.io/qwik";
import { Input, Button } from "flowbite-qwik";
import { IconSearchOutline } from "flowbite-qwik-icons";

type InputWithBtnProps = {
  name: string;
  placeholder?: string;
  onSubmit$?: PropFunction<() => void>;
};

export default component$<InputWithBtnProps>(
  ({ name, placeholder = "Search...", onSubmit$ }) => {
    const val = useSignal("");

    return (
      <div class="w-1/2 p-3">
        <Input
          name={name}
          bind:value={val}
          placeholder={placeholder}
          size="lg"
          prefix={
            <IconSearchOutline class="h-5 w-5 text-gray-500 dark:text-gray-400" />
          }
          suffix={
            <Button type="submit" onClick$={onSubmit$}>
              Search
            </Button>
          }
        />
      </div>
    );
  },
);
