<template>
  <div class="p-2 w-full">
    <div class="pages">
      <!-- Header -->
      <div class="flex justify-between gap-2">
        <!-- Search -->
        <div>
          <div
            class="flex justify-center items-center rounded-[100px] h-[40px] bg-white hover:bg-[#765798]/50 w-[60px] absolute cursor-pointer"
          >
            <i class="fa-solid fa-magnifying-glass text-[20px]"></i>
          </div>
          <input
            type="text"
            class="w-[900px] h-[40px] rounded-full pl-[70px] pr-[20px] border-none outline-none bg-white/50 text-white placeholder-white"
            placeholder="พิมชื่อสินค้าที่ต้องการค้นหา"
          />
        </div>
        <div class="flex gap-2">
          <i
            class="fa-solid fa-bell cursor-pointer text-4xl text-[#EAA04B]"
          ></i>
          <div class="w-[150px] h-[40px] rounded-full bg-[#B1737E]">
            <div class="flex gap-2">
              <i
                class="fa-solid fa-user m-1 text-l rounded-full p-2 bg-white"
              ></i>
              <div class="flex flex-col">
                <h1 class="font-bold w-[80px]">john do</h1>
                <p class="text-[10px] flex justify-end">ตำแหน่ง</p>
              </div>
              <i
                class="fa-solid fa-ellipsis-vertical flex justify-center items-center cursor-pointer"
              ></i>
            </div>
          </div>
        </div>
      </div>
      <hr
        class="mt-[30px] mb-[15px] border-[#2B1E28] border-[2px] rounded-full"
      />
      <!-- Body -->
      <div>
        <div class="flex gap-2">
          <!-- selector -->
          <div
            class="flex gap-2 justify-center rounded-full p-2 w-[140px] cursor-pointer drop-shadow-lg text-white bg-[#2B1E28]"
          >
            <i class="fa-solid fa-filter mt-[5px]"></i>
            <div>คอมพิวเตอร์</div>
          </div>
          <!-- addproduct -->
          <div
            class="flex justify-center items-center w-[40px] rounded-full drop-shadow-lg cursor-pointer bg-[#B1737E]"
          >
            <i class="fa-solid fa-plus text-[30px]"></i>
          </div>
        </div>
        <!-- Caedproduct -->
        <div class="mt-[3px] grid grid-cols-5 max-lg:grid-cols-3 max-sm:grid  ">
          <div v-for="(item, i) in products" :key="i">
            <NuxtLink to="/product/[id].vue">
              <CardProduct :product="item" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from "~/models/product.model";

const products = ref<Product[]>([
  {
    id: 1,
    name: "โน๊ตบุ๊ค Asus TUF Gaming A16 FA608WV-QT069WF Jaeger Gray",
    detail:
      "Wried Mechanical KEYBOARDbgfnfdgdfsbsdfhsdfhfsdhhdsfhdfdfsfhdfdcxzcxzcf ",
    Specs: "",
    price: 1000,
    amount: 0,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },
  {
    id: 2,
    name: "โน๊ตบุ๊ค Asus TUF Gaming A16 FA608WV-QT069WF Jaeger Gray",
    detail: "Wried Mechanical KEYBOARD ",
    Specs: "",
    price: 2000,
    amount: 3,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },
  {
    id: 3,
    name: "โน๊ตบุ๊ค Asus TUF Gaming A16 FA608WV-QT069WF Jaeger Gray",
    detail: "Wried Mechanical KEYBOARD ",
    price: 3000,
    Specs: "",
    amount: 10,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },
  {
    id: 4,
    name: "โน๊ตบุ๊ค Asus TUF Gaming A16 FA608WV-QT069WF Jaeger Gray",
    detail: "Wried Mechanical KEYBOARD ",
    price: 4000,
    Specs: "",
    amount: 20,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },
  {
    id: 1,
    name: "โน๊ตบุ๊ค Asus TUF Gaming A16 FA608WV-QT069WF Jaeger Gray",
    detail:
      "Wried Mechanical KEYBOARDbgfnfdgdfsbsdfhsdfhfsdhhdsfhdfdfsfhdfdcxzcxzcf ",
    price: 1000,
    Specs: "",
    amount: 0,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },
  {
    id: 2,
    name: "โน๊ตบุ๊ค Asus TUF Gaming A16 FA608WV-QT069WF Jaeger Gray",
    detail: "Wried Mechanical KEYBOARD ",
    price: 2000,
    Specs: "",
    amount: 3,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },
  {
    id: 3,
    name: "AULA",
    detail: "Wried Mechanical KEYBOARD ",
    price: 3000,
    Specs: "",
    amount: 10,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },

  {
    id: 4,
    name: "โน๊ตบุ๊ค Asus TUF Gaming A16 FA608WV-QT069WF Jaeger Gray",
    detail: "Wried Mechanical KEYBOARD ",
    Specs: "",
    price: 4000,
    amount: 20,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },
  {
    id: 3,
    name: "AULA",
    detail: "Wried Mechanical KEYBOARD ",
    Specs: "",
    price: 3000,
    amount: 10,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },

  {
    id: 4,
    name: "โน๊ตบุ๊ค Asus TUF Gaming A16 FA608WV-QT069WF Jaeger Gray",
    detail: "Wried Mechanical KEYBOARD ",
    Specs: "",
    price: 4000,
    amount: 20,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },
]);
</script>

<style></style>
