<template>
  <div class="pages">
    <div class="p-5 bg-[90deg, #6A0DAD, #84FFFF]">
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
            class="bg-white w-full p-2 px-5 border-2 border-black border-y-white flex justify-between gap-2"
          >
            <div class="flex gap-5 w-full bg-slate-400">
              <div class="flex flex-col gap-5 w-full">
                <h1 class="header flex">
                  ชื่อ
                  <input
                    type="text"
                    v-model="data.name"
                    class="px-2 ml-[42px] bg-transparent border-none outline-none"
                    maxlength="50"
                  />
                </h1>
                <h1 class="subheader flex">
                  ประเภท
                  <input
                    type="text"
                    v-model="data.name"
                    class="px-2 ml-[8px] bg-transparent border-none outline-none"
                  />
                </h1>
                <span class="flex gap-2"
                  ><h1 class="subheader">ราคา</h1>
                  <input
                    type="text"
                    v-model="data.price"
                    class="px-2 ml-[20px] bg-transparent border-none outline-none"
                    maxlength="8"
                /></span>
              </div>
              <div
                class="flex flex-col items-center bg-[#F7F1FD]/60 rounded-[20px] p-2 w-full font-bold"
              >
                เพิ่มจำนวนสินค้า
                <div class="h-full w-full flex items-center justify-center">
                  <input
                    type="text"
                    class="font-bold text-5xl text-[#765798] text-center bg-transparent border-none outline-none w-[250px] h-[150px]"
                    maxlength="8"
                    placeholder="จำนวน"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- detail -->
        <div class="bg-[#F7F1FD]/60 rounded-[20px] p-5 flex flex-col gap-2">
          <h1 class="header">รายละเอียดสินค้า</h1>
          <div class="w-full">
            <textarea
              name=""
              id=""
              type="text"
              v-model="data.detail"
              class="text-lg h-fill text-wrap truncate p-5 bg-[#F7F1FD]/40 rounded-[26px] w-full"
            ></textarea>
          </div>
        </div>
        <hr class="my-[20px]" />
        <div
          class="p-2 px-5 flex justify-center items-center gap-20  w-full"
        >
          <NuxtLink
            to="/product/[id]"
            class="text-center p-2 bg-[#F11317] w-[100px] font-bold text-white rounded-[20px] drop-shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#ab2a2c]"
            >กลับ</NuxtLink
          >
          <NuxtLink
            to=""
            class="text-center p-2 bg-[#37EBBE] w-[100px] font-bold rounded-[20px] drop-shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#31cca5]"
            >ยืนยัน</NuxtLink
          >
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
    name: "AULA",
    detail:
      "Wried Mechanical KEYBOARDbgfnfdgdfsbsdfhsdfhfsdhhdsfhdfdfsfhdfdcxzcxzcf ",
    price: 1000,
    amount: 8,
    img: "https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/06/Computer/24GS50F-1(1).jpg",
  },
]);
</script>

<style></style>
