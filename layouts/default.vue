<template>
  <div class="flex gap-1">
      <Sidebar />
    <div class="flex flex-col  w-screen h-screen ">
      <Header />
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
