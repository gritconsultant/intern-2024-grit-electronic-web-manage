<template>
  <div class="flex gap-1 bg-[#ffffff]">
      <Sidebar />
    <div class="flex flex-col gap-1 w-screen h-screen  bg">
      <profile/>
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
