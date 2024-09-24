import {
  component$,
  useSignal,
  useStylesScoped$,
  $,
  useVisibleTask$,
} from "@builder.io/qwik";

export default component$(() => {
  useStylesScoped$(`
      .menu-container {
        position: relative;
        width: 64px;
        height: 64px;
      }
      .menu-button {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: transform 0.3s ease;
      }
      .menu-button:hover {
        transform: scale(1.1);
      }
      .menu-items {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 8px;
        margin-top: 16px;
        perspective: 100px;
      }
      .menu-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 8px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        cursor: pointer;
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateZ(-50px);
      }
      .menu-item:hover {
        background-color: #f0f0f0;
      }
      .menu-item.visible {
        opacity: 1;
        transform: translateZ(0);
      }
      .icon {
        font-size: 24px;
        margin-bottom: 4px;
      }
      .label {
        font-size: 12px;
      }
    `);

  const isHovered = useSignal(false);
  const activeItems = useSignal<boolean[]>([]);

  const menuItems = [
    { icon: "🏠", label: "Home" },
    { icon: "📁", label: "Files" },
    { icon: "⚙️", label: "Settings" },
    { icon: "📞", label: "Contact" },
  ];

  useVisibleTask$(({ track }) => {
    track(() => isHovered.value);

    if (isHovered.value) {
      activeItems.value = new Array(menuItems.length).fill(false);
      const showItem = (index: number) => {
        if (index < menuItems.length) {
          activeItems.value = [
            ...activeItems.value.slice(0, index),
            true,
            ...activeItems.value.slice(index + 1),
          ];
          setTimeout(() => showItem(index + 1), 100);
        }
      };
      showItem(0);
    } else {
      activeItems.value = new Array(menuItems.length).fill(false);
    }
  });

  return (
    <div
      class="menu-container"
      onMouseEnter$={() => (isHovered.value = true)}
      onMouseLeave$={() => (isHovered.value = false)}
    >
      <div class="menu-button">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>
      <div class="menu-items">
        {menuItems.map((item, index) => (
          <div
            key={index}
            class={`menu-item ${activeItems.value[index] ? "visible" : ""}`}
          >
            <span class="icon">{item.icon}</span>
            <span class="label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
});
