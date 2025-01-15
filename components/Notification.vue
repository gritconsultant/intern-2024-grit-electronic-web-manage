<template>
  <div>
    <!-- bell -->
    <div class="ml-2">
      <i
        class="fa-solid fa-circle ml-[15px] mt-[4px] absolute p-[2px] text-center text-[6px] text-[#EC5B3D] bg-[#EC5B3D]/50 rounded-full"
      ></i>
      <i
        class="fa-solid fa-bell cursor-pointer text-3xl text-[#EAA04B]"
        @click="store.notification = !store.notification"
      ></i>
      <div v-if="store.notification" class="flex justify-end  " >
        <PopupNotification />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useIndexStore } from "~/store/main";

const store = useIndexStore();

</script>

<style>

</style>