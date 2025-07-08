<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-waterfall"
    v-bind="$attrs"
  >
    <title>Waterfall Methodology</title>

    <!-- Step Boxes -->
    <rect x="4" y="4" width="20" height="10" rx="2" />
    <rect x="28" y="22" width="20" height="10" rx="2" />
    <rect x="52" y="40" width="20" height="10" rx="2" />
    <rect x="28" y="58" width="20" height="10" rx="2" />

    <!-- Arrows -->
    <line x1="14" y1="14" x2="38" y2="22" />
    <line x1="38" y1="32" x2="62" y2="40" />
    <line x1="62" y1="50" x2="38" y2="58" />
  </svg>
</template>
