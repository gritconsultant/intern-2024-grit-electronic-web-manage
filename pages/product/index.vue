<template>
  <div class="defaultpages flex flex-col gap-2  ">
    <div class="flex items-center justify-between h-[5%] pl-[35px]">
      <h1 class="text-[25px] font-bold">รายการคำรองขอคืนสินค้า</h1>
    </div>
    <div class="flex justify-between px-[25px]">
      <div class="flex gap-2 w-[80%] ">
        <div class="w-[40%] bg-slate-400">
          <Search />
        </div>
        <DropdownCategory />
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
          <tr class="flex gap-2 py-2 border-b-[1px]">
            <th class="w-[40%] truncate">1</th>
            <th class="w-[15%] truncate">2</th>
            <th class="w-[15%] truncate">3</th>
            <th class="w-[15%] truncate">4</th>
            <th class="w-[15%] flex items-center justify-center truncate">
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
                <button @click="toggleMenu">
                  <i class="fa-solid fa-bars"></i>
                </button>
                <div>
                  <ul
                    class=" absolute  bg-white border-[1px] rounded-[20px] border-gray-400 dropshadowbottomsub p-[1px]   w-[140px] h-[80px]  -translate-x-[90px] "
                    v-if="isMenuVisible"
                  >
                    <li class="h-[50%] hover:bg-slate-300 rounded-t-[19px] flex items-center justify-center  " >
                      <NuxtLink to="/product/[id]"> รายะเอียดสินค้า </NuxtLink>
                    </li>
                    <li class="h-[50%] hover:bg-slate-300 rounded-b-[19px] flex items-center justify-center">ลบสินค้า</li>
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
import { ref } from "vue";

const isMenuVisible = ref(false); // สถานะการแสดงผลของเมนู

// ฟังก์ชันสำหรับสลับการแสดงผลของเมนู
const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value;
};
</script>

<style></style>
