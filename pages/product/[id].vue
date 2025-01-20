<template>
  <div class="defaultpages p-5">
    <div class="">
      <div class="h-[5%]">
        <h1 class="text-[25px] font-bold">Product #{{}}</h1>
      </div>
      <div class="flex flex-col gap-10">
        <div
          v-for="(product, i) in products"
          :key="i"
          class="flex gap-5 mt-[20px]"
        >
          <div>
            <img
              :src="product.img"
              alt=""
              class="h-[350px] W-[350PX] border-2 border-black"
            />
          </div>
          <div class="flex flex-col justify-between gap-5">
            <div class="flex flex-col gap-5">
              <div class="text-[20px] flex flex-col gap-2">
                <span class="font-semibold">ชื่อ</span>
                <input
                  type="text"
                  name=""
                  id=""
                  :placeholder="product.name"
                  class="w-[500px] h-[60px] pl-5 text-wrap placeholder:text-black rounded-[5px]"
                />
              </div>
              <div class="text-[20px] font-semibold flex gap-5 justify-between">
                <div class="flex flex-col gap-2 w-full">
                  <span>ประเภท</span>
                  <select name="" id="" class="w-full">
                    <option value=""></option>
                  </select>
                </div>
                <div class="flex flex-col gap-2 w-full">
                  <span>ราคา</span>
                  <div class="bg-white w-full h-full pl-2">
                    {{ product.price }}
                  </div>
                </div>
              </div>
              <div class="flex gap-2 text-[20px]">
                <span class="font-semibold">จำนวนสินค้า</span>
                <div class="bg-white w-[24%] h-full pl-2">
                  {{ product.price }}
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-5">
              <div class="flex gap-5">
                <span class="text-[15px] font-semibold">สร้างเมื่อ</span>
                <span> asdASD{{}}</span>
              </div>
              <div class="flex gap-4">
                <span class="text-[15px] font-semibold">แก้ไขเมื่อ</span>
                <span>esfdsafafqf</span>
              </div>
            </div>
          </div>
          <!-- star -->
          <div class="bg-yellow-200/50 text-center w-[30%]">star</div>
          <div class="w-[15%] flex flex-col gap-5">
            <h4 class="text-[20px] text-center font-semibold">สถานะสินค้า</h4>
            <div class="flex flex-col gap-10 justify-center items-center">
              <label class="relative inline-flex items-center cursor-pointer">
                <!-- Checkbox -->
                <input type="checkbox" class="sr-only peer" />
                <!-- Toggle Switch Background -->
                <div
                  class="w-28 h-12 bg-orange-200 peer-focus:outline-none peer-focus:ring-[1px] peer-focus:ring-orange-600/70 rounded-full peer-checked:bg-orange-500 transition-colors"
                ></div>
                <!-- Toggle Knob -->
                <div
                  class="absolute w-11 h-11 bg-orange-400 rounded-full left-[2px] top-[2px] peer-checked:translate-x-16 transition-transform"
                ></div>
              </label>
              <div class="flex flex-col gap-5">
                <button
                  class="bg-[#F68D44] w-[100px] h-[40px] rounded-[5px] hover:bg-yellow-500 text-[18px] font-semibold dropshadowbutton"
                >
                  แก้ไขสินค้า
                </button>
                <button
                  class="bg-[#F68D44] w-[100px] h-[40px] rounded-[5px] hover:bg-red-500 text-[18px] font-semibold dropshadowbutton"
                >
                  ลบสินค้า
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- รายละเอียดสินค้า -->
        <div>
          <h3 class="text-[22px] font-semibold">รายละเอียด</h3>
          <textarea class="rounded-[5px] w-[100%] p-5"></textarea>
        </div>
      </div>
      <!-- รีวิว -->
      <div class="mt-10 h-fi;">
        <h3 class="text-[22px] font-semibold">รีวิวจากลูกค้า</h3>
        <div class="bg-white h-full  w-full">
      das
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
    name: "มะขาม 4 รส",
    detail: "มะขาม 4 รส มะขามคลุก (บ้านมะขาม) โดยบริษัทสวนผึ้ง จำกัด",
    price: 62,
    amount: 10,
    img: "https://th-test-11.slatic.net/p/2b0d5f80a00b77d2c6490b09a053a1c0.png",
    categoryId: 1,
  },
]);
</script>

<style></style>
