<template>
  <div class="flex gap-5 w-screen text-black/70">
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
              <h1 class="header">ชื่อ{{ data.name }}</h1>
              <h1 class="subheader">ประเภท{{ data.name }}</h1>
              <span>ราคา ฿{{ data.price }}</span>
            </div>
            <div
              class="flex flex-col items-center bg-[#F7F1FD]/60 rounded-[20px] p-2 w-full font-bold"
            >
              สินค้าคงเหลือ
              <div class="h-full w-full flex items-center justify-center">
                <i class="font-bold text-2xl text-[#765798]">number</i>
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
          <button
            class="p-2 bg-[#F11317] w-[100px] font-bold text-white rounded-[20px] drop-shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#ab2a2c]"
          >
            ซ่อนสินค้า
          </button>
          <NuxtLink
            to="/product/edit/[id]"
            class="p-2 bg-[#37EBBE]  w-[100px] font-bold   rounded-[20px] drop-shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#31cca5]"
            >แก้ไขสินค้า</NuxtLink
          >
        </div>
      </div>
      <!-- detail -->
      <div class="bg-[#F7F1FD]/60 rounded-[20px] p-5 flex flex-col gap-2">
        <h1 class="header">รายละเอียดสินค้า</h1>
        <div
          class="p-5 bg-[#F7F1FD]/40 rounded-[26px] w-full h-[210px] flex justify-between"
        >
          <p class="text-lg w-full h-fill text-wrap truncate">
            dsfasfsdfsafsdfsfasfdsfsdhf,
            mbdhsfjkhdskjfhskafksahfksdsfasfsdfsafsdfsfasfdsfsdhf,
            ksahfksdsfasfsdfsafsdfsfasfdsfsdhf, ksahfks
            dsfasfsdfsafsdfsfasfdsfsdhf, v
            dsfasfsdfsafsdfsfasfdsfsdhf,mbdhsfjkhdskjfhskafksahfks v
            dsfasfsdfsafsdfsfasfdsfsdhf,mbdhsfjkhdskjfhskafksahfksvdsfas
            dsfasfsdfsafsdfsfasfdsfsdhf,mbdhsfjkhdskjfhskafksahfksv
            dsfasfsdfsafsdfsfasfdsfsdhf,mbdhsfjkhdskjfhskafksahfks v v
            dsfasfsdfsafsdfsfasfdsfsdhf,mbdhsfjkhdskjfhskafksahfks
            dsfasfsdfsafsdfsfasfdsfsdhf,mbdhsfjkhdskjfhskafksahfks
            dsfasfsdfsafsdfsfasfdsfsdhf,mbdhsfjkhdskjfhskafksahfks
            dsfasfsdfsafsdfsfasfdsfsdhf,mbdhsfjkhdskjfhskafksahfks
            dsfasfsdfsafsdfsfasfdsfsdhf,mbdhsfjkhdskjfhskafksahfks
            dsfasfsdfsafsdfsfasfdsfsdhf,mbdhsfjkhdskjfhskafksahfksdsfasfsdfsafsdfsfasfdsfsdhf,mbdhsfjkhdskjfhskafksahfks
          </p>
        </div>
      </div>
      <hr class="my-[20px]" />
      <!-- commment -->
      <div class="flex gap-2 place-content-center">
        <!-- cardreview -->
        <div class="w-full flex items-center place-content-center h-full py-5">
          <i
            class="fa-solid fa-circle-chevron-left mt-[8px] text-5xl w-full h-full flex items-center place-content-center cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-white/5 duration-300"
          ></i>
        </div>
        <div class="flex gap-2 place-content-center">
          <div
            class="bg-white border-2 rounded-[5px] p-5 w-[400px] object-cover drop-shadow-lg"
          >
            <div class="flex justify-between">
              <div class="flex flex-col items-center gap-2">
                <h1 class="subheader w-full">ชื่อ</h1>
                <div>createAt</div>
              </div>
              <div class="flex flex-col items-center gap-2 w-2/4">
                <div class="subheader">4</div>
                <div class="icons flex justify-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/256/15853/15853959.png"
                    alt=""
                  />
                  <img
                    src="https://cdn-icons-png.flaticon.com/256/15853/15853959.png"
                    alt=""
                  />
                  <img
                    src="https://cdn-icons-png.flaticon.com/256/15853/15853959.png"
                    alt=""
                  />
                  <img
                    src="https://cdn-icons-png.flaticon.com/256/15853/15853959.png"
                    alt=""
                  />
                  <img
                    src="https://cdn-icons-png.flaticon.com/256/15853/15853959.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <hr class="hr" />
            <div>
              <div class="detail p-2 h-[90px]">details</div>
              <div class="flex justify-center gap-2 p-2">
                <img
                  class="photoreview"
                  src="https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/10/import/angry%20miao/am-rgb-650-white-side-view.jpg"
                  alt=""
                />
                <img
                  class="photoreview"
                  src="https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/10/import/angry%20miao/am-rgb-650-white-top-view(1).jpg"
                  alt=""
                />
                <img
                  class="photoreview"
                  src="https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/10/import/angry%20miao/am-rgb-650-white-front-view(1).jpg"
                  alt=""
                />
                <img
                  class="photoreview"
                  src="https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/10/import/angry%20miao/am-rgb-650-white-top-view(1).jpg"
                  alt=""
                />
              </div>
            </div>
            <div></div>
          </div>
          <div
            class="bg-white border-2 rounded-[5px] p-5 w-[400px] object-cover drop-shadow-lg"
          >
            <div class="flex justify-between">
              <div class="flex flex-col items-center gap-2">
                <h1 class="subheader w-full">ชื่อ</h1>
                <div>createAt</div>
              </div>
              <div class="flex flex-col items-center gap-2 w-2/4">
                <div class="subheader">4</div>
                <div class="icons flex justify-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/256/15853/15853959.png"
                    alt=""
                  />
                  <img
                    src="https://cdn-icons-png.flaticon.com/256/15853/15853959.png"
                    alt=""
                  />
                  <img
                    src="https://cdn-icons-png.flaticon.com/256/15853/15853959.png"
                    alt=""
                  />
                  <img
                    src="https://cdn-icons-png.flaticon.com/256/15853/15853959.png"
                    alt=""
                  />
                  <img
                    src="https://cdn-icons-png.flaticon.com/256/15853/15853959.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <hr class="hr" />
            <div>
              <div class="detail p-2 h-[90px]">details</div>
              <div class="flex justify-center gap-2 p-2">
                <img
                  class="photoreview"
                  src="https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/10/import/angry%20miao/am-rgb-650-white-side-view.jpg"
                  alt=""
                />
                <img
                  class="photoreview"
                  src="https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/10/import/angry%20miao/am-rgb-650-white-top-view(1).jpg"
                  alt=""
                />
                <img
                  class="photoreview"
                  src="https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/10/import/angry%20miao/am-rgb-650-white-front-view(1).jpg"
                  alt=""
                />
                <img
                  class="photoreview"
                  src="https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/10/import/angry%20miao/am-rgb-650-white-top-view(1).jpg"
                  alt=""
                />
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <div class="w-full flex items-center place-content-center h-full py-5">
          <i
            class="fa-solid fa-circle-chevron-right mt-[8px] text-5xl w-full h-full flex items-center place-content-center cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-white/5 duration-300"
          ></i>
        </div>
      </div>
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
