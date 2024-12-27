<template>
  <div class="flex gap-5 w-full text-black/70">
    <div
      class="pages"
    >
      <div class="p-2 flex justify-start gap-5 pr-[10px]">
         <!-- selector -->
         <div class="bg-[#765798] rounded-[50px] flex gap-[2px] p-2 text-white">
          <i class="fa-solid fa-filter mt-[15px]"></i>
          <select name="" id="" class="bg-[#765798]">
            <option value="\">ทั้งหมด</option>
          </select>
        </div>
        <NuxtLink to="/product/create" class=" buttonpages bg-white hover:bg-slate-200 "> เพิ่มสินค้า </NuxtLink>
      </div>
      <!-- product -->
      <div class="w-full p-2 flex justify-center bg-black">
        <NuxtLink to="/product/[id]" class="grid grid-cols-5 gap-2">
          <div
            v-for="(item, i) in products"
            :key="i"
            class="transition ease-in-out delay-150 hover:-translate-y-2 hover:scale-102 hover:bg-black/10 rounded-[10px] p-2"
          >
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
