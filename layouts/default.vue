<template>
  <div class="flex flex-col bg-gray-100">
    <Header />
    <div class="flex h-screen   ">
      <Sidebar />
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
