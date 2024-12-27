<template>
  <div>
    <div
      class="w-[200px] h-[300px] border-2 border-[#A6A6A6] p-3 flex flex-col gap-2 rounded-[5px] bg-[#FFFFFF] drop-shadow-lg"
    >
      <div class="flex justify-between">
        <div
          class="flex justify-center rounded-[30px] gap-2 w-[60px] font-semibold text-[#D78D33] bg-[#FFF1E0]"
        >
          <div>
            <i class="fa-solid fa-star"></i>
          </div>
          <p>4</p>
        </div>
        <i class="fa-solid fa-trash-can  text-base cursor-pointer  hover:text-[#E70609]"></i>
      </div>

      <div class="object-cover place-content-center border-2 h-[350px]">
        <img
          src="https://blog.bnn.in.th/wp-content/uploads/2024/03/Acer-Aspire-3-A315-59-32GC.jpg"
          alt=""
        />
      </div>
      <div class="flex justify-between mt-1">
        <div>
          <span class="fontsubheader">{{ product.name }} </span>
        </div>
        <div class="text-indigo-400">฿ {{ product.price }}</div>
      </div>
      <div>
        <span>ยอดขาย {{ product.amount }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/models/product.model";

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true,
  },
});
</script>

<style scoped></style>
