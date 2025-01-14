<template>
  <div>
  <PopupDate />
   <!-- Dropdown -->
   <div class="relative group">
            <button
              class="flex justify-center items-center cursor-pointer"
              type="button"
            >
              <i class="fa-solid fa-ellipsis-vertical"> </i>
            </button>
          <!-- Dropdown manu -->
          <div
            class="absolute bg-white rounded-lg border shadow w-44 z-10 hidden group-hover:block"
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
</template>

<script lang="ts" setup>
import Paginate from '~/components/Paginate.vue';

</script>

<style>

</style>