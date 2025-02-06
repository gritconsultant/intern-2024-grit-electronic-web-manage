<template>
  <!-- Proflie -->
  <div class="flex justify-center items-center gap-2 pr-[40px]">
    <div class="w-[40px] h-[40px] rounded-full bg-[#F68D44]">
      <div class="flex items-center justify-center gap-2">
        <!-- Dropdown -->
        <div class="relative group flex justify-end">
          <i class="fa-solid fa-user m-1 text-l rounded-full p-2 bg-white"></i>
          <!-- Dropdown manu -->
          <div
            class="absolute bg-white rounded-lg border shadow w-44 hidden group-hover:block z-10 mt-[40px]"
          >
            <ul class="py-2 text-sm text-gray-700">
              <NuxtLink to="/profile">
                <li class="block px-4 py-2 hover:bg-gray-100">โปรไฟล์</li>
              </NuxtLink>
              <NuxtLink to="/login">
                <li class="block px-4 py-2 hover:bg-gray-100">ออกจากระบบ</li>
              </NuxtLink>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useIndexStore } from "~/store/main";

const store = useIndexStore();
</script>

<style></style>
