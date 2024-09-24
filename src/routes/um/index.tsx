import { component$ } from "@builder.io/qwik";
import CircleMenu from "~/components/menus/circleMenu";

export default component$(() => {
  return (
    <div class="flex items-center justify-center">
      <CircleMenu />
    </div>
  );
});
