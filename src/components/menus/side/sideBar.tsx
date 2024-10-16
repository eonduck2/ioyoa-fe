import {
  IconHomeOutline,
  IconVideoCameraOutline,
  IconSearchOutline,
  IconFireOutline,
  IconMapPinOutline,
  IconBrainOutline,
} from "flowbite-qwik-icons";
import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <div class="flex">
        <aside class="sidebar">
          <a href="/" class="sidebar-item">
            <IconHomeOutline class="mr-3 h-5 w-5" />홈
          </a>

          <a href="/search" class="sidebar-item">
            <IconSearchOutline class="mr-3 h-5 w-5" />
            검색
          </a>

          <a href="/mostPopular" class="sidebar-item">
            <IconFireOutline class="mr-3 h-5 w-5" />
            인기
          </a>

          <div class="sidebar-item">
            <IconVideoCameraOutline class="mr-3 h-5 w-5" />
            상영관
          </div>

          <div class="sidebar-item">
            <IconMapPinOutline class="mr-3 h-5 w-5" />
            Picker
          </div>

          <div class="sidebar-item">
            <IconBrainOutline class="mr-3 h-5 w-5" />
            Jammer
          </div>
        </aside>
      </div>
    </>
  );
});
