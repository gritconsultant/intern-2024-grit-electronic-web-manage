<template>
  <!-- Proflie -->
  <div class="flex justify-center items-center  gap-2 pr-[5px] mt-[5px]">
    <div class="w-[150px] h-[40px] rounded-full bg-[#F68D44]">
      <div class="flex items-center justify-center  gap-2">
        <div class="flex flex-col  ">
          <h1 class="font-bold w-[100px] pl-3">john do</h1>
          <p class="text-[10px] flex justify-end">ตำแหน่ง</p>
        </div>
        <!-- Dropdown -->
        <div class="relative group flex justify-end  ">
          <i class="fa-solid fa-user m-1 text-l rounded-full p-2 bg-white"></i>
          <!-- Dropdown manu -->
          <div
            class="absolute  bg-white rounded-lg border shadow w-44  hidden group-hover:block z-10 mt-[40px] "
          >
            <ul class="py-2 text-sm text-gray-700">
              <li class="block px-4 py-2 hover:bg-gray-100">
                <NuxtLink to="/profile">โปรไฟล์</NuxtLink>
              </li>
              <li class="block px-4 py-2 hover:bg-gray-100">
                ออกจากระบบ
              </li>
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
