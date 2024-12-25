<template>
  <div class="flex gap-5 w-full text-black/70">
    <div class="pages" v-for="(data, i) in products" :key="i">
      <!-- ข้อมูลทั่วไปและปุ่ม -->
      <div class="flex gap-5">
        <!-- photo -->
        <div
          class="p-2 bg-[#F7F1FD]/30 w-[300px] rounded-[28px] grid grid-cols-2 gap-2"
        >
          <img :src="data.img" alt="" class="photo" />
          <img :src="data.img" alt="" class="photo" />
          <img :src="data.img" alt="" class="photo" />
          <img :src="data.img" alt="" class="photo" />
        </div>
        <div
          class="bg-white w-full  p-2 px-5 border-2 border-black border-y-white flex justify-between gap-2"
        >
          <div class="flex  gap-5 w-full bg-slate-400">
            <div class="flex flex-col gap-5 w-full">
              <h1 class="header">{{ data.name }}</h1>
              <h1 class="subheader">{{ data.name }}</h1>
              <span>ราคา ฿{{ data.price }}</span>
            </div>
            <div class="flex flex-col items-center  bg-[#F7F1FD]/60 rounded-[20px] p-2 w-full font-bold ">
              สินค้าคงเหลือ
              <div class="h-full w-full flex items-center justify-center  ">
                <i class="font-bold text-2xl text-[#765798]  ">number</i>
              </div>
            </div>
          </div>
          <div class="w-4/6 flex justify-end bg">
            <div
              class="flex flex-col gap-2 bg-[#FFF1E0] w-full h-full rounded-[20px] p-3 px-5"
            >
              <i class="fa-solid fa-star text-[#D78D33]"> จำนวน</i>
              <div class="text-sm font-bold bg-white">5</div>
              <div class="text-sm font-bold">4</div>
              <div class="text-sm font-bold">3</div>
              <div class="text-sm font-bold">2</div>
              <div class="text-sm font-bold">1</div>
            </div>
          </div>
        </div>
        <div class="p-2 px-5 w-[200px] flex flex-col justify-center gap-14">
          <button class="p-2 bg-white w-[100px] border-2 rounded-[20px]">
            ซ่อนสินค้า
          </button>
          <button class="p-2 bg-white w-[100px] border-2 rounded-[20px]">
            แก้ไขสินค้า
          </button>
        </div>
      </div>
      <div></div>
      <hr class="my-[20px]" />
      <!-- commment -->
      <div></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { data } from "autoprefixer";
import type { Product } from "~/models/product.model";

const products = ref<Product[]>([
  {
    id: 1,
    name: "AULA",
    detail:
      "Wried Mechanical KEYBOARDbgfnfdgdfsbsdfhsdfhfsdhhdsfhdfdfsfhdfdcxzcxzcf ",
    price: 1000,
    amount: 0,
    img: "https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/06/Computer/24GS50F-1(1).jpg",
  },
]);
</script>

<style></style>
