<template>
 <div class="flex justify-center items-center gap-2">
          <div class="h-[250px] w-[350px] rounded-[7px] rounded-t-[11px] bg-white">
            <header
              class="flex justify-between rounded-[10px]  px-2 text-white h-[50px] bg-[#1D89EA]"
            >
              <i
                class="fa-solid fa-comment-dots bg-[#3B414F] p-[3px] rounded-full text-white text-[8px] ml-[326px] mt-[2px] absolute cursor-pointer"
              ></i>

              <i
                class="fa-solid fa-trash-can bg-white text-center  p-[3px] rounded-full w-[14px] text-[#EC5B3D] text-[8px] ml-[326px] mt-[34px] absolute cursor-pointer"
              ></i>
              <div class="flex flex-col gap-2 w-full">
                <b class="text-[12px]">John Do</b>
                <u class="text-[10px]">สร้างเมื่อ</u>
              </div>
              <div class="flex flex-col items-center w-full">
                <b>0</b>
                <div
                  class="flex justify-center items-center gap-1 w-[45px] rounded-[10px] text-[#D78D33]"
                >
                  <i class="fa-solid fa-star text-[12px]"></i>
                </div>
              </div>
            </header>
            <!-- photo -->
            <div class="p-2">
              <div class="flex justify-center items-center gap-2">
                <img
                  class="h-[70px] w-[70px] object-cover border-[1px] rounded-[10px] border-black"
                  :src="product.img"
                  alt=""
                />
                <img
                  class="h-[70px] w-[70px] object-cover border-[1px] rounded-[10px] border-black"
                  :src="product.img"
                  alt=""
                />
                <img
                  class="h-[70px] w-[70px] object-cover border-[1px] rounded-[10px] border-black"
                  :src="product.img"
                  alt=""
                />
                <img
                  class="h-[70px] w-[70px] object-cover border-[1px] rounded-[10px] border-black"
                  :src="product.img"
                  alt=""
                />
              </div>
            </div>
            <!-- comment -->
            <div
              class="text-[10px] font-semibold p-2 h-[114px] w-full rounded-[6px] bg-[#1D89EA]/50"
            >
              <div class="h-[102px] w-[335px] truncate text-wrap">
                {{ product.detail }}
              </div>
            </div>
          </div>
        </div>
</template>

<script lang="ts" setup>
import type { Product } from "~/models/product.model";

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true,
  },
});

</script>

<style>

</style>