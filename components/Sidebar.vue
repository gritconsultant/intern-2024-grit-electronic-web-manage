<template>
  <div>
    <!-- Desktop -->
    <div
      class="bg-[#EAA04B] w-[220px] h-screen rounded-tr-[30px] max-xl:hidden duration-700"
    >
      <div
        class="p-[5px] bg-[#7A4711]/60 rounded-tr-[30px] hover:bg-[#7A4711]"
      >
        <NuxtLink to="/">
          <img
            class="object-cover h-[53px] w-full flex justify-center bg-left"
            src="https://bangkokbrands.com/wp-content/uploads/2023/06/Bangkok-brand-site-logo.png"
            alt=""
          />
        </NuxtLink>
      </div>
      <div class="flex flex-col">
        <!-- menu -->
        <div v-for="(data, i) in page" :key="i" class="mt-1 pr-2">
          <NuxtLink :to="data.path" class="">
            <div
              class="flex gap-2 justify-start pl-[30px] p-2 rounded-r-[100px] font-bold text-[12px] text-[#712900] hover:bg-[#7A4711] hover:text-[#FFD700] duration-700"
            >
              <i :class="data.icon" class="text-[25px]"> </i>
              <div class="mt-[5px]">
                {{ data.name }}
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <!-- Ipad -->
    <div
      class="bg-[#EAA04B] w-[65px] h-screen rounded-tr-[30px] xl:hidden duration-700 max-sm:hidden"
    >
      <div class="p-[5px] bg-[#7A4711]/60 rounded-tr-[30px] hover:bg-[#7A4711]">
        <NuxtLink to="/">
          <img
            class="object-cover"
            src="/images/Logo2.ico"
            alt=""
          />
        </NuxtLink>
      </div>
      <div class="flex flex-col">
        <!-- menu -->
        <div v-for="(data, i) in page" :key="i" class="mt-2 pr-1">
          <NuxtLink :to="data.path">
            <div
              class="flex gap-2 justify-center items-center  p-2 rounded-r-[100px] h-[45px] text-xl text-[#712900] hover:bg-[#7A4711] hover:text-[#FFD700]"
            >
              <i :class="data.icon" class="text-[25px]"> </i>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <!-- Mobile -->
    <div
      class=" bg-[#EAA04B] flex justify-center items-center p-1 w-[50px] ml-[5px] mt-[1px] rounded-full sm:hidden duration-700 absolute"
    >
      <div>
        <NuxtLink to="/">
          <img
            class="object-cover"
            src="/images/Logo2.ico"
            alt=""
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Pages } from "~/models/page.model";

const page = ref<Pages[]>([
  {
    path: "report_page",
    name: "รายงาน",
    active: true,
    icon: "fa-solid fa-cart-shopping",
  },
  {
    path: "order",
    name: "รายการคำสั่งซื้อ",
    active: true,
    icon: "fa-solid fa-cart-shopping",
  },
  {
    path: "product_return",
    name: "รายการคำขอคืนสินค้า",
    active: true,
    icon: "fa-solid fa-cart-shopping",
  },
  {
    path: "product",
    name: "สินค้า",
    active: true,
    icon: "fa-solid fa-cart-shopping",
  },
  {
    path: "logs",
    name: "รายละเอียดการทำงาน ",
    active: true,
    icon: "fa-solid fa-cart-shopping",
  },
  {
    path: "manages_user",
    name: "จัดการผู้ใช้งาน",
    active: true,
    icon: "fa-solid fa-cart-shopping",
  },
  {
    path: "manages",
    name: "จัดการทั่วไป",
    active: true,
    icon: "fa-solid fa-cart-shopping",
  },
  {
    path: "ex",
    name: "ทดลอง",
    active: true,
    icon: "fa-solid fa-cart-shopping",
  },
]);
</script>

<style></style>
