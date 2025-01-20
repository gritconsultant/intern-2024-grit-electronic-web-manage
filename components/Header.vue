<template>
  <div class=" flex justify-between items-center h-[60px]  border-b-[1px] border-gray-400 bg-white ">
    <div class="w-[180px] ml-[20px]">
      <NuxtLink to="/">
        <img
          class="object-cover h-[53px] w-full flex justify-center bg-left dropshadowbottom "
          src="https://bangkokbrands.com/wp-content/uploads/2023/06/Bangkok-brand-site-logo.png"
          alt=""
        />
      </NuxtLink>
    </div>
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
