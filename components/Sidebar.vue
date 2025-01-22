<template>
  <!-- Desktop -->
  <div
    class="w-[200px] h-full border-r-[1px] bg-white border-gray-400 max-xl:hidden duration-700"
  >
    <div class="flex flex-col">
      <!-- menu -->
      <div
        class="flex flex-col gap-2 mt-1 pl-[30px] text-gray-600 text-[15px] mr-5"
      >
        <NuxtLink
          to="/"
          class="flex gap-2"
          :class="{ 'text-orange-500': route.path === '/' }"
        >
          <div>
            <i class="fa-solid fa-chart-pie"></i>
          </div>
          <span class="  ">แดชบอร์ด</span>
        </NuxtLink>
        <NuxtLink
          to="/order"
          class="flex gap-2"
          :class="{
            'text-orange-500':
              route.path === '/order' || route.path === '/order/[id]',
          }"
        >
          <div>
            <i class="fa-solid fa-cart-shopping"></i>
          </div>
          <span class="">รายการคำสั่งซื้อ</span>
        </NuxtLink>
        <NuxtLink
          to="/refund"
          class="flex gap-2"
          :class="{
            'text-orange-500':
              route.path === '/refund' || route.path === '/refund/[id]',
          }"
        >
          <div>
            <i class="fa-solid fa-arrow-rotate-left"></i>
          </div>
          <span class="">รายการคืนสินค้า</span>
        </NuxtLink>
        <!-- DropdownProduct -->
        <div class="relative group">
          <div class="flex gap-2 text-[15px]">
            <NuxtLink
              to="/product"
              :class="{
                'text-orange-500':
                  route.path === '/product' ||
                  route.path === '/product/[id]' ||
                  route.path === '/product/category',
              }"
            >
              <div class="flex gap-2 text-[15px]">
                <i class="fa-solid fa-boxes-stacked"></i>
                <span class="">ผลิตภัณฑ์</span>
              </div>
            </NuxtLink>
            <i class="fa-solid fa-caret-down text-[12px] flex items-center"></i>
          </div>
          <!-- Dropdown manu -->
          <div
            class="bg-white rounded-lg border shadow w-[120px] hidden group-hover:block"
          >
            <ul class="py-2 text-sm text-gray-700">
              <NuxtLink to="/product/category">
                <li class="block px-4 py-2 text-[11px] hover:bg-gray-100">
                  ประเภทผลิตภัณฑ์
                </li>
              </NuxtLink>
            </ul>
          </div>
        </div>
        <!-- DropdowUser -->
        <div class="relative group">
          <div class="flex gap-2 text-[15px]">
            <div
              class="flex gap-2"
              :class="{
                'text-orange-500':
                  route.path === '/manages_user/customer' ||
                  route.path === '/manages_user/admin',
              }"
            >
              <div>
                <i class="fa-solid fa-users-line"></i>
              </div>
              <span class="">ผู้ใช้งาน</span>
            </div>
            <i class="fa-solid fa-caret-down text-[12px] flex items-center"></i>
          </div>
          <!-- Dropdown manu -->
          <div
            class="bg-white rounded-lg border shadow w-[120px] hidden group-hover:block"
          >
            <ul class="py-2 text-sm text-gray-700">
              <NuxtLink to="/manages_user/customer">
                <li class="block px-4 py-2 hover:bg-gray-100">ลูกค้า</li>
              </NuxtLink>
              <NuxtLink to="/manages_user/admin">
                <li class="block px-4 py-2 hover:bg-gray-100">
                  เจ้าหน้าที่ดูแล
                </li>
              </NuxtLink>
            </ul>
          </div>
        </div>
        <!-- DropdowManages -->
        <div class="relative group">
          <div class="flex gap-2 text-[15px]">
            <div class="flex gap-2" 
            :class="{
                'text-orange-500':
                  route.path === '/manages/bank' ||
                  route.path === '/manages/banner',
              }"
            >
              <div > 
                <i class="fa-solid fa-gear"></i>
              </div>
              <span class="">จัดการทั่วไป</span>
            </div>
            <i class="fa-solid fa-caret-down text-[12px] flex items-center"></i>
          </div>
          <!-- Dropdown manu -->
          <div
            class="bg-white rounded-lg border shadow w-[120px] hidden group-hover:block"
          >
            <ul class="py-2 text-sm text-gray-700">
              <NuxtLink to="/manages/bank">
                <li class="block px-4 py-2 hover:bg-gray-100">ธนาคาร</li>
              </NuxtLink>
              <NuxtLink to="/manages/banner">
                <li class="block px-4 py-2 hover:bg-gray-100">แบนเนอร์</li>
              </NuxtLink>
            </ul>
          </div>
        </div>
        <NuxtLink
          to="/logs"
          class="flex gap-2"
          :class="{
            'text-orange-500': route.path === '/logs',
          }"
        >
          <div>
            <i class="fa-regular fa-clock"></i>
          </div>
          <span class="text-[14px]">รายงานการทำงาน</span>
        </NuxtLink>
        <NuxtLink
          to="/order/report"
        >
          <div>
            <i class="fa-regular fa-clock"></i>
          </div>
          <span class="text-[14px]">รายงานการขาย</span>
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
