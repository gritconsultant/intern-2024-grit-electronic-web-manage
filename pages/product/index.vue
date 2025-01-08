<template>
  <div class="defaultpages ">
    <div class="pages">
      <!-- Header -->
    <Search />
      <hr
        class="hrpages"
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
        <div class="mt-[3px] grid grid-cols-5 max-lg:grid-cols-3 max-md:gri max-sm:grid-col-1  ">
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
