<template>
  <div>
    <div class="relative group">
      <div
        class="flex items-center p-[2px] gap-2 rounded-full w-[200px] bg-[#EAA04B]"
      >
        <button
          class="bg-[#F68D44] rounded-full flex justify-center items-center pt-[3px] w-[30px] h-[30px] cursor-pointer"
          type="button"
        >
          <i class="fa-solid fa-filter text-[20px]"></i>
        </button>
        <div class="flex justify-center items-center font-bold text-[14px] w-[75%]">
          {{ selectedCategory.name }}
        </div>
      </div>
      <!-- Dropdown manu -->
      <div
        class="absolute bg-white rounded-lg border shadow w-44 z-10 hidden group-hover:block"
      >
        <ul class="py-2 text-sm text-gray-700">
          <li class="block px-4 py-2 hover:bg-gray-100"
          v-for="(category, i) in categories" :key="i"
           @click="selectCategory(category)"
          >{{ category.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Category } from '~/models/product.model';


// สร้างตัวแปรสำหรับหมวดหมู่ที่เลือก
const selectedCategory = ref<Category>({
  id: 1,
  name: 'ทั้งหมด'
});


const categories = ref<Category[]>([
  {
    id: 1,
    name: 'ทั้งหมด',
  },
  {
    id: 2,
    name: 'อาหาร',
  },
  {
    id: 3,
    name: 'เครื่องดื่ม',
  },
  {
    id: 4,
    name: 'สมุนไพร',
  },
  {
    id: 5,
    name: 'ผ้าและเครื่องดื่ม',
  },
  {
    id: 6,
    name: 'ของใช้และของตกแต่ง',
  },
]);

// ฟังก์ชันเพื่อเลือกหมวดหมู่
const selectCategory = (category: Category) => {
  selectedCategory.value = category;
};
</script>


<style></style>
