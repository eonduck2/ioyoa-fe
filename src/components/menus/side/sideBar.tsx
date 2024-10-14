import { IconHomeOutline, IconVideoCameraOutline } from "flowbite-qwik-icons";
import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <div class="flex">
        <aside class="sidebar">
          <Link href="/" class="sidebar-item">
            <IconHomeOutline class="mr-3 h-5 w-5" />홈
          </Link>

          <div class="sidebar-item">
            <div class="mr-3 h-5 w-5" />
            인기
          </div>
          <div class="sidebar-item">
            <div class="mr-3 h-5 w-5" />
            구독
          </div>
          <div class="sidebar-item">
            <IconVideoCameraOutline class="mr-3 h-5 w-5" />
            보관함
          </div>
        </aside>
      </div>
    </>
  );
});
