import {
  component$,
  useSignal,
  useTask$,
  $,
  useVisibleTask$,
} from "@builder.io/qwik";
import "./circleMenu.css";

export default component$(() => {
  const isOpen = useSignal(false);
  const menuRef = useSignal<HTMLDivElement>();

  useTask$(({ track }) => {
    track(() => isOpen.value);

    if (menuRef.value) {
      const items = menuRef.value.querySelectorAll(".menu-item");
      if (isOpen.value) {
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("visible");
          }, index * 100);
        });
      } else {
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.remove("visible");
          }, index * 100);
        });
      }
    }
  });

  useVisibleTask$(({ cleanup }) => {
    const clickOutsideHandler = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".menu-container")) {
        isOpen.value = false;
      }
    };

    document.addEventListener("click", clickOutsideHandler);

    cleanup(() => {
      document.removeEventListener("click", clickOutsideHandler);
    });
  });

  const toggleMenu = $(() => {
    isOpen.value = !isOpen.value;
  });

  return (
    <div class="menu-container">
      <div class="menu-button" onClick$={toggleMenu}>
        <span style="font-size: 24px;">+</span>
      </div>
      <div ref={menuRef} class={`menu-items ${isOpen.value ? "active" : ""}`}>
        {menuItems.map((item, index) => (
          <a key={index} href={item.href} class="menu-item">
            <span class="icon">{item.icon}</span>
            <span class="label">{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
});
