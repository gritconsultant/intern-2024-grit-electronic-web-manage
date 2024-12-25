<template>
  <div class="flex gap-5 w-full text-black/70">
    <div
      class="bg-[#765798]/60 px-5 py-3 w-3/4 rounded-[20px] flex flex-col gap-5"
    >
      <!-- search -->
      <div class="flex justify-between gap-5">
        <div class="bg-white w-full rounded-[50px] flex items-center">
          <div
            class="flex items-center justify-center rounded-[50px] text-white bg-[#765798] h-full w-[60px] bg"
          >
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <input
            class="w-full pl-5 rounded-[50px] h-full"
            type="search"
            key="name"
            placeholder="ค้นหารายการสินค้าที่ต้องการ"
          />
        </div>
        <!-- selector -->
        <div class="bg-[#765798] rounded-[50px] flex gap-[2px] p-2 text-white">
          <i class="fa-solid fa-filter mt-[15px]"></i>
          <select name="" id="" class="bg-[#765798]">
            <option value="\">ทั้งหมด</option>
          </select>
        </div>
        <!-- warn -->
        <div class="flex items-center">
          <i class="fa-solid fa-bell text-yellow-400"></i>
        </div>
      </div>
      <div class="p-2 flex justify-end pr-[10px]">
        <NuxtLink to="" class="buttonproducts"> เพิ่มสินค้า </NuxtLink>
      </div>
      <!-- product -->
      <div class="bg-white w-full p-2 flex justify-center">
        <NuxtLink to="" class="grid grid-cols-4 gap-2">
          <div v-for="(item, i) in products" :key="i">
            <CardProduct :product="item" />
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from "~/models/product.model";

const products = ref<Product[]>([
  {
    id: 1,
    name: "AULA",
    detail:
      "Wried Mechanical KEYBOARDbgfnfdgdfsbsdfhsdfhfsdhhdsfhdfdfsfhdfdcxzcxzcf ",
    price: 1000,
    amount: 0,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },
  {
    id: 2,
    name: "AULA",
    detail: "Wried Mechanical KEYBOARD ",
    price: 2000,
    amount: 3,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },
  {
    id: 3,
    name: "AULA",
    detail: "Wried Mechanical KEYBOARD ",
    price: 3000,
    amount: 10,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },
  {
    id: 4,
    name: "AULA",
    detail: "Wried Mechanical KEYBOARD ",
    price: 4000,
    amount: 20,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },
  {
    id: 1,
    name: "AULA",
    detail:
      "Wried Mechanical KEYBOARDbgfnfdgdfsbsdfhsdfhfsdhhdsfhdfdfsfhdfdcxzcxzcf ",
    price: 1000,
    amount: 0,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },
  {
    id: 2,
    name: "AULA",
    detail: "Wried Mechanical KEYBOARD ",
    price: 2000,
    amount: 3,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },
  {
    id: 3,
    name: "AULA",
    detail: "Wried Mechanical KEYBOARD ",
    price: 3000,
    amount: 10,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },
  {
    id: 4,
    name: "AULA",
    detail: "Wried Mechanical KEYBOARD ",
    price: 4000,
    amount: 20,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },
]);
</script>

<style></style>
