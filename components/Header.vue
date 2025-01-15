<template>
  <div class="">
    <div class="flex justify-end gap-2">
      <div class="pt-[8px]">
        <Notification />
      </div>
      <Profile />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useIndexStore } from "~/store/main";

const store = useIndexStore();
</script>

<style></style>
