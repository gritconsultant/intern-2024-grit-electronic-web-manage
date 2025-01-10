<template>
  <div>
    <!-- Desktop -->
    <div
      class="bg-[#EAA04B] w-[240px] h-screen rounded-tr-[30px] max-xl:hidden duration-700"
    >
      <div
        class="p-[10px] bg-[#7A4711]/60 rounded-tr-[30px] hover:bg-[#7A4711]"
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
              class="flex gap-2 justify-start pl-[30px] p-2 rounded-r-[100px] font-bold text-[15px] text-[#712900] hover:bg-[#7A4711] hover:text-white duration-700"
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
      class="bg-[#2B1E28] p-[20px] w-[85px] h-screen rounded-tr-[30px] xl:hidden duration-700 max-sm:hidden"
    >
      <div>
        <NuxtLink to="/">
          <img
            class="object-cover"
            src="https://sv1.img.in.th/iRCpEw.png"
            alt=""
          />
        </NuxtLink>
      </div>
      <hr class="hr mt-2" />
      <div class="flex flex-col">
        <!-- menu -->
        <div v-for="(data, i) in page" :key="i" class="mt-2">
          <NuxtLink :to="data.path">
            <div
              class="flex gap-2 justify-center items-center p-2 rounded-[100px] h-[45px] text-xl text-[#EAA04B] hover:bg-[#FFEAEA] hover:text-[#240E1F]"
            >
              <i :class="data.icon" class="text-[25px]"> </i>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <!-- Mobile -->
    <div
      class="bg-[#1C67AA] p-1 w-[60px] ml-[20px] mt-[10px] rounded-full sm:hidden duration-700 absolute"
    >
      <div>
        <NuxtLink to="/">
          <img
            class="object-cover bg-[#2B1E28] rounded-full p-1 flex justify-center items-center pr-[6px]"
            src="https://sv1.img.in.th/iRCpEw.png"
            alt=""
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { data } from "autoprefixer";
import type { Pages } from "~/models/page.model";

const page = ref<Pages[]>([
  {
    path: "order",
    name: "คำสั่งซื้อ",
    active: true,
    icon: "fa-solid fa-cart-shopping",
  },
  {
    path: "order",
    name: "รายงานการขาย",
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
    path: "product_return",
    name: "คืน/ยกเลิกสินค้า",
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
    path: "user",
    name: "จัดการผู้ใช้งาน",
    active: true,
    icon: "fa-solid fa-cart-shopping",
  },
]);
</script>

<style></style>
