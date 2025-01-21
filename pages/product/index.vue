<template>
  <div class="defaultpages flex flex-col gap-2">
    <div class="flex items-center justify-between h-[5%] pl-[35px]">
      <h1 class="text-[25px] font-bold">รายการสินค้า</h1>
    </div>
    <div class="flex justify-between px-[25px]">
      <div class="flex gap-2 w-[80%]">
        <div class="w-[40%]">
          <Search />
        </div>
        <!-- filter category -->
        <div class=" ">
          <div class="relative group h-full">
            <div
              class="flex items-center p-[2px] rounded-full w-[200px] bg-[#EAA04B] h-full"
            >
              <button
                class="bg-[#F68D44] rounded-full flex justify-center items-center pt-[3px] w-[35px] h-full cursor-pointer"
                type="button"
              >
                <i class="fa-solid fa-filter text-[20px]"></i>
              </button>
              <div
                class="flex justify-center items-center font-bold text-[14px] w-[80%] pr-[] "
              >
                {{ selectedCategory.name }}
              </div>
            </div>
            <!-- Dropdown manu -->
            <div
              class="absolute bg-white rounded-lg border shadow w-44 z-10 hidden group-hover:block"
            >
              <ul class="py-2 text-sm text-gray-700">
                <li
                  class="block px-4 py-2 hover:bg-gray-100"
                  v-for="(category, i) in categories"
                  :key="i"
                  @click="selectCategory(category)"
                >
                  {{ category.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="pr-[50px]">
        <NuxtLink to="/product/create">
          <div
            class="flex items-center justify-center border-[1px] border-[#FFD652]/50 bg-[#F68D44] text-[20px] font-semibold rounded-[5px] h-full px-3 cursor-pointer dropshadowbutton"
          >
            เพิ่มสินค้า
          </div>
        </NuxtLink>
      </div>
    </div>
    <div class="w-full h-[90%] mt-2 pt-2 bg-white">
      <table class="flex flex-col px-8 gap-2 w-ful">
        <thead class="w-full">
          <tr class="flex gap-2">
            <th class="w-[40%]">สินค้า</th>
            <th class="w-[15%]">ประเภท</th>
            <th class="w-[15%]">ราคา</th>
            <th class="w-[15%]">จำนวน</th>
            <th class="w-[15%]">สถานะสินค้า</th>
            <th class="w-[5%]"></th>
          </tr>
        </thead>
        <tbody class="w-full">
          <tr
            class="flex gap-2 py-2 border-b-[1px]"
            v-for="(product, index) in filteredProducts"
            :key="index"
          >
            <th
              class="w-[40%] truncate flex gap-2 justify-between border-r-[2px]"
            >
              <div class="w-full flex justify-center">
                <img
                  :src="product.img"
                  alt=""
                  class="w-[80px] h-[80px] object-cover border-2 border-black rounded-[5px]"
                />
              </div>
              <div class="w-full flex justify-start">{{ product.name }}</div>
            </th>
            <th class="w-[15%] truncate border-r-[2px]">
              {{ product.categoryId }}
            </th>
            <th class="w-[15%] truncate border-r-[2px]">{{ product.price }}</th>
            <th class="w-[15%] truncate border-r-[2px]">
              {{ product.amount }}
            </th>
            <th
              class="w-[15%] flex items-center justify-center truncate border-r-[2px]"
            >
              <label class="relative inline-flex items-center cursor-pointer">
                <!-- Checkbox -->
                <input type="checkbox" class="sr-only peer" />
                <!-- Toggle Switch Background -->
                <div
                  class="w-11 h-6 bg-orange-200 peer-focus:outline-none peer-focus:ring-[1px] peer-focus:ring-orange-600/70 rounded-full peer-checked:bg-orange-500 transition-colors"
                ></div>
                <!-- Toggle Knob -->
                <div
                  class="absolute w-5 h-5 bg-orange-400 rounded-full left-[2px] top-[2px] peer-checked:translate-x-5 transition-transform"
                ></div>
              </label>
            </th>
            <th class="w-[5%] flex items-center justify-center">
              <div class="flex flex-col justify-center">
                <button @click="toggleMenu(product.id)">
                  <i class="fa-solid fa-bars"></i>
                </button>
                <div>
                  <ul
                    class="absolute bg-white border-[1px] rounded-[20px] border-gray-400 dropshadowbottomsub p-[1px] w-[140px] h-[80px] -translate-x-[90px]"
                    v-if="isMenuVisible[product.id]"
                  >
                    <li
                      class="h-[50%] hover:bg-slate-300 rounded-t-[19px] flex items-center justify-center"
                    >
                      <NuxtLink to="/product/[id]"> รายะเอียดสินค้า </NuxtLink>
                    </li>
                    <li
                      class="h-[50%] hover:bg-slate-300 rounded-b-[19px] flex items-center justify-center"
                    >
                      ลบสินค้า
                    </li>
                  </ul>
                </div>
              </div>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import type { Category, Product } from "~/models/product.model";

const isMenuVisible = ref<Record<number, boolean>>({}); // เก็บสถานะการแสดงผลเมนูแยกตาม ID

// ฟังก์ชันสำหรับสลับการแสดงผลของเมนู
const toggleMenu = (productId: number) => {
  // ปิดเมนูทั้งหมดก่อน แล้วค่อยเปิดเมนูใหม่
  isMenuVisible.value = {
    ...isMenuVisible.value,
    [productId]: !isMenuVisible.value[productId],
  };
};
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
  {
    id: 2,
    name: "มะขามคลุกบ๊วย 4 รส",
    detail: "มะขามแกะเปลือก ปรุงรสด้วย นำ้ตาล พริก เกลือ และผงบ๊วย",
    price: 62,
    amount: 13,
    img: "https://halal.co.th/storages/products/343928.png",
    categoryId: 1,
  },
  {
    id: 3,
    name: "เลมอนอบแห้ง รสน้ำผึ้ง",
    detail: "เลมอนอบแห้ง ผสมด้วย ผงน้ำผึ้ง",
    price: 59,
    amount: 10,
    img: "https://halal.co.th/storages/products/390694.jpg",
    categoryId: 2,
  },
  {
    id: 4,
    name: "เผือกกรอบไส้เสาวรส",
    detail: "บริษัท สวนผึ้งหวาน จำกัด เผือกกรอบไส้เสาวรส",
    price: 58,
    amount: 20,
    img: "https://halal.co.th/storages/products/680694.jpg",
    categoryId: 3,
  },
  {
    id: 5,
    name: "กระเป๋าผ้า",
    detail: "กระเป๋าผ้าลายดอกไม้สีสันสดใส",
    price: 250,
    amount: 5,
    img: "https://example.com/bag.png",
    categoryId: 4,
  },
  {
    id: 6,
    name: "แจกันเซรามิก",
    detail: "แจกันเซรามิกสำหรับตกแต่งบ้าน",
    price: 500,
    amount: 3,
    img: "https://example.com/vase.png",
    categoryId: 5,
  },
]);

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

const filteredProducts = computed(() => {
  if (selectedCategory.value.id === 1) {
    // หมวดหมู่ "ทั้งหมด" (id = 1)
    return products.value;
  }
  // กรองสินค้าตามหมวดหมู่ที่เลือก
  return products.value.filter(product => product.categoryId === selectedCategory.value.id);
});
</script>

<style></style>
