<template>
  <div>
    <!-- Desktop -->
    <div class="bg-[#2B1E28] p-[20px] w-[250px] h-screen rounded-tr-[30px] max-lg:hidden">
      <div>
        <NuxtLink to="/">
          <img
            class="object-cover"
            src="https://img2.pic.in.th/pic/logo_manage.png"
            alt=""
          />
        </NuxtLink>
      </div>
      <hr class="hr mt-[15px]" />
      <div class="flex flex-col">
        <!-- menu -->
        <div v-for="(data, i) in page" :key="i" class="mt-10">
          <NuxtLink :to="data.path" class="">
            <div
              class="flex gap-2 justify-start pl-[30px] p-2 rounded-[100px] text-xl text-[#EAA04B] hover:bg-[#FFEAEA] hover:text-[#240E1F] delay-75"
            >
              <i :class="data.icon" class="text-[30px]"> </i>
              <div class="mt-[5px]">
                {{ data.name }}
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
     <!-- Ipad -->
     <div class="bg-[#2B1E28] p-[20px] w-[85px] h-screen rounded-tr-[30px] lg:hidden max-sm:hidden">
      <div>
        <NuxtLink to="/">
          <img
            class="object-cover "
            src="https://sv1.img.in.th/iRCpEw.png"
            alt=""
          />
        </NuxtLink>
      </div>
      <hr class="hr" />
      <div class="flex flex-col">
        <!-- menu -->
        <div v-for="(data, i) in page" :key="i" class="mt-2">
          <NuxtLink :to="data.path">
            <div
              class="flex gap-2 justify-center items-center   p-2 rounded-[100px] h-[45px] text-xl text-[#EAA04B] hover:bg-[#FFEAEA] hover:text-[#240E1F] delay-75"
            >
              <i :class="data.icon" class="text-[25px]"> </i>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <!-- Mobile -->
    <div class="bg-[#1C67AA] p-1 w-[60px] m-2  rounded-full  sm:hidden">
      <div>
        <NuxtLink to="/">
          <img
            class="object-cover bg-[#2B1E28] rounded-full p-1 flex justify-center items-center pr-[6px] "
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
    path: "product",
    name: "สินค้า",
    active: true,
    icon: "fa-solid fa-cart-shopping",
  },
  {
    path: "/",
    name: "รายงานการขาย",
    active: true,
    icon: "fa-solid fa-cart-shopping",
  },
  {
    path: "product",
    name: "คืนสินค้า",
    active: true,
    icon: "fa-solid fa-cart-shopping",
  },
  {
    path: "product",
    name: "รายละเอียด",
    active: true,
    icon: "fa-solid fa-cart-shopping",
  },
  {
    path: "product",
    name: "ช่วยเหลือ",
    active: true,
    icon: "fa-solid fa-cart-shopping",
  },
]);
</script>

<style></style>
