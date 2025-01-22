<template>
  <div class="flex flex-col h-screen  bg-slate-300/10     ">
    <Header />
    <div class="flex h-full   ">
      <Sidebar />
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
