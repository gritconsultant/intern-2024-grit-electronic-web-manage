<template>
  <div class="p-1 w-full">
    <div class="pages">
      <div class="" v-for="(data, i) in products" :key="i">
        <div class="flex gap-2 h-[600px]">
          <div class="w-[300px] bg-white">
            <div>
              <img src="" alt="">
            </div>
          </div>
          <div class="w-full bg-white">2</div>
        </div>
        <hr class="my-[20px]" />
        <div class="p-2 px-5 flex justify-center items-center gap-20 w-full">
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
    name: "โน๊ตบุ๊ค Asus TUF Gaming A16 FA608WV-QT069WF Jaeger Gray",
    detail:
      "Asus TUF Gaming A16 มีคุณสมบัติที่น่าประทับใจ มาพร้อมโปรเซสเซอร์ AMD Ryzen AI 9 HX 370 และNVIDIA GeForce RTX 40 Series จึงเล่นเกมล่าสุดหรือทำให้เวิร์กโฟลว์ของคุณลื่นไหล ไม่สะดุด",
    Specs:
      " CPU:AMD Ryzen AI 9 HX 370  Graphics:NVIDIA GeForce RTX 4060 Laptop RAM:16GB LPDDR5X SSD:c1TB NVMe PCIe 4.0 ",
    price: 1000,
    amount: 0,
    img: "https://media-cdn.bnn.in.th/425404/asus-tuf-gaming-a16-fa608wv-qt069wf-jaeger-gray-1.jpg",
  },
]);
</script>

<style></style>
