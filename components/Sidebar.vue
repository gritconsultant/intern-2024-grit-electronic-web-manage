<template>
  <!-- Desktop -->
  <div
    class="w-[200px] h-screen  border-r-[1px] bg-white border-gray-400 max-xl:hidden duration-700"
  >
    <div class="flex flex-col">
      <!-- menu -->
      <div
        class="flex flex-col gap-2 mt-1 pl-[30px] text-gray-600 text-[15px] mr-5"
      >
        <NuxtLink
          to="/"
          class="flex gap-2"
          :class="{ 'text-blue-500': route.path === '/' }"
        >
          <div>
            <i class="fa-solid fa-chart-pie"></i>
          </div>
          <span class="  ">แดชบอร์ด</span>
        </NuxtLink>
        <NuxtLink
          to="/order"
          class="flex gap-2"
          :class="{ 'text-blue-500': route.path === '/order' }"
        >
          <div>
            <i class="fa-solid fa-cart-shopping"></i>
          </div>
          <span class="">รายการคำสั่งซื้อ</span>
        </NuxtLink>
        <NuxtLink
          to="/refund"
          class="flex gap-2"
          :class="{ 'text-blue-500': route.path === '/refund' }"
        >
          <div>
            <i class="fa-solid fa-arrow-rotate-left"></i>
          </div>
          <span class="">รายการคืนสินค้า</span>
        </NuxtLink>
        <!-- DropdownProduct -->
        <div class="relative group">
          <div class="flex gap-2 text-[15px]">
            <i class="fa-solid fa-boxes-stacked"></i>
            <span class="">ผลิตภัณฑ์</span>
            <i class="fa-solid fa-caret-down text-[12px] flex items-end"></i>
          </div>
          <!-- Dropdown manu -->
          <div
            class="bg-white rounded-lg border shadow w-44 hidden group-hover:block"
          >
            <ul class="py-2 text-sm text-gray-700">
              <li class="block px-4 py-2 hover:bg-gray-100">
                <NuxtLink to="/product">ผลิตภัณฑ์</NuxtLink>
              </li>
              <li class="block px-4 py-2 hover:bg-gray-100">
                <NuxtLink to="/product/category">ประเภทผลิตภัณฑ์</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <!-- DropdowUser -->
        <div class="relative group">
          <div class="flex gap-2 text-[15px]">
            <i class="fa-solid fa-users-line"></i>
            <span class="">ผู้ใช้งาน</span>
            <i class="fa-solid fa-caret-down text-[12px] flex items-end"></i>
          </div>
          <!-- Dropdown manu -->
          <div
            class="bg-white rounded-lg border shadow w-44 hidden group-hover:block"
          >
            <ul class="py-2 text-sm text-gray-700">
              <li class="block px-4 py-2 hover:bg-gray-100">
                <NuxtLink to="/profile">ลูกค้า</NuxtLink>
              </li>
              <li class="block px-4 py-2 hover:bg-gray-100">เจ้าหน้าที่ดูแล</li>
            </ul>
          </div>
        </div>
        <!-- DropdowManages -->
        <div class="relative group">
          <div class="flex gap-2 text-[15px]">
            <i class="fa-solid fa-gear"></i>
            <span class="">จัดการทั่วไป</span>
            <i class="fa-solid fa-caret-down text-[12px] flex items-end"></i>
          </div>
          <!-- Dropdown manu -->
          <div
            class="bg-white rounded-lg border shadow w-44 hidden group-hover:block"
          >
            <ul class="py-2 text-sm text-gray-700">
              <li class="block px-4 py-2 hover:bg-gray-100">
                <NuxtLink to="/profile">ธนาคาร</NuxtLink>
              </li>
              <li class="block px-4 py-2 hover:bg-gray-100">แบรนด์เดอร์</li>
            </ul>
          </div>
        </div>
        <NuxtLink to="logs" class="flex gap-2">
          <div>
            <i class="fa-regular fa-clock"></i>
          </div>
          <span class="">รายงานการทำงาน</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router"; // ใช้สำหรับตรวจสอบ path

const route = useRoute();
</script>

<style></style>
