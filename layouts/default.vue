<template>
  <div class="flex gap-1 bg-[#F5F5F5]">
      <Sidebar />
    <div class="flex flex-col  w-screen h-screen ">
      <profile/>
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
