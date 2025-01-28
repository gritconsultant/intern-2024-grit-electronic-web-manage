<template>
  <!-- Desktop -->
  <div
    class="w-[220px] h-full border-r-[1px] bg-white border-gray-400 "
  >
    <div class="flex flex-col">
      <!-- menu -->
      <div
        class="flex flex-col gap-2 mt-1 pl-[30px] text-gray-600 text-[15px] mr-5"
      >
        <NuxtLink
          to="/"
          class="flex gap-2"
          :class="{ 'text-orange-500': route.path === '/' }"
        >
          <div>
            <i class="fa-solid fa-chart-pie"></i>
          </div>
          <span class="ml-[5px]">แดชบอร์ด</span>
        </NuxtLink>

        <!-- DropdownProduct -->
          <div class="flex gap-2 text-[15px]">
            <NuxtLink
              to="/order"
              :class="{
                'text-orange-500':
                  route.path === '/order' ||
                  route.path === '/order/[id]' ,
              }"
            >
              <div class="flex gap-2 text-[15px]">
                <div>
                  <i class="fa-solid fa-cart-shopping"></i>
                </div>
                <span class="ml-[5px]">จัดการคำสั่งซื้อ</span>
              </div>
            </NuxtLink>
        </div>

        <!-- DropdownProduct -->

          <div class="flex gap-2 text-[15px]">
            <NuxtLink
              to="/refund"
              :class="{
                'text-orange-500':
                  route.path === '/refund' ||
                  route.path === '/refund/[id]' ,
              }"
            >
              <div class="flex gap-2 text-[14px]">
                <div>
                  <i class="fa-solid fa-arrows-rotate"></i>
                </div>
                <span class="ml-[8px]"> คำร้องคืนสินค้า</span>
              </div>
            </NuxtLink>
        </div>

        <!-- DropdownProduct -->
        <div class="relative group">
          <div
            class="flex gap-2 text-[14px]"
            @click="toggleDropdown('dropdown1')"
          >
            <div
              class="flex gap-2"
              :class="{
                'text-orange-500':
                  route.path === '/product' ||
                  route.path === '/product/[id]' ||
                  route.path === '/product/category' ||
                  route.path === '/product/create',
              }"
            >
              <div>
                <i class="fa-solid fa-gear"></i>
              </div>
              <span class="ml-[6px]">จัดการผลิตภัณฑ์</span>
            </div>
            <i
              :class="{
                'fa-solid fa-caret-down': dropdownState === 'dropdown1',
                'fa-solid fa-caret-right': dropdownState !== 'dropdown1',
              }"
              class="text-[12px] flex items-center"
            ></i>
          </div>
          <!-- Dropdown menu -->
          <div
            v-show="dropdownState === 'dropdown1'"
            class="bg-white rounded-lg border shadow w-[145px] mt-2"
          >
            <ul class="py-2 text-gray-700">
              <NuxtLink to="/product">
                <li
                  class="block px-4 py-2 text-[15px] hover:bg-gray-100"
                  :class="{
                    'text-orange-500': route.path === '/product',
                  }"
                >
                  สินค้า
                </li>
              </NuxtLink>
              <NuxtLink to="/prrduct/category">
                <li
                  class="block px-4 py-2 text-[15px] hover:bg-gray-100"
                  :class="{
                    'text-orange-500': route.path === '/prrduct/category',
                  }"
                >
                  ประเภทสินค้า
                </li>
              </NuxtLink>
            </ul>
          </div>
        </div>

        <!-- DropdowUser -->
        <div class="relative group ">
          <div
            class="flex gap-2 text-[15px]"
            @click="toggleDropdown('dropdown2')"
          >
            <div
              class="flex gap-2"
              :class="{
                'text-orange-500':
                  route.path === '/manages_user/customer' ||
                  route.path === '/manages_user/customer/1' ||
                  route.path === '/manages_user/admin',
              }"
            >
              <div>
                <i class="fa-solid fa-gear"></i>
              </div>
              <span class="ml-[6px]">ผู้ใช้งาน</span>
            </div>
            <i
              :class="{
                'fa-solid fa-caret-down': dropdownState === 'dropdown2',
                'fa-solid fa-caret-right': dropdownState !== 'dropdown2',
              }"
              class="text-[12px] flex items-center ml-[45px]"
            ></i>
          </div>
          <!-- Dropdown menu -->
          <div
            v-show="dropdownState === 'dropdown2'"
            class="bg-white rounded-lg border shadow w-[145px] mt-2"
          >
            <ul class="py-2 text-gray-700">
              <NuxtLink to="/manages_user/customer">
                <li
                  class="block px-4 py-2 text-[15px] hover:bg-gray-100"
                  :class="{
                    'text-orange-500': route.path === '/manages_user/customer',
                  }"
                >
                  ลูกค้า
                </li>
              </NuxtLink>
              <NuxtLink to="/manages_user/admin">
                <li
                  class="block px-4 py-2 text-[15px] hover:bg-gray-100"
                  :class="{
                    'text-orange-500': route.path === '/manages_user/admin',
                  }"
                >
                  เจ้าหน้าที่ดูแล
                </li>
              </NuxtLink>
            </ul>
          </div>
        </div>

        <!-- Dropdownmenage -->
        <div class="relative group">
          <div
            class="flex gap-2 text-[15px]"
            @click="toggleDropdown('dropdown3')"
          >
            <div
              class="flex gap-2"
              :class="{
                'text-orange-500':
                  route.path === '/manages/bank' ||
                  route.path === '/manages/banner',
              }"
            >
              <div>
                <i class="fa-solid fa-gear"></i>
              </div>
              <span class="ml-[6px]">จัดการทั่วไป</span>
            </div>
            <i
              :class="{
                'fa-solid fa-caret-down': dropdownState === 'dropdown3',
                'fa-solid fa-caret-right': dropdownState !== 'dropdown3',
              }"
              class="text-[12px] flex items-center ml-[19px]"
            ></i>
          </div>
          <!-- Dropdown menu -->
          <div
            v-show="dropdownState === 'dropdown3'"
            class="bg-white rounded-lg border shadow w-[145px] mt-2"
          >
            <ul class="py-2 text-gray-700">
              <NuxtLink to="/manages/bank">
                <li
                  class="block px-4 py-2 text-[15px] hover:bg-gray-100"
                  :class="{
                    'text-orange-500': route.path === '/manages/bank',
                  }"
                >
                  ธนาคาร
                </li>
              </NuxtLink>
              <NuxtLink to="/manages/banner">
                <li
                  class="block px-4 py-2 text-[15px] hover:bg-gray-100"
                  :class="{
                    'text-orange-500': route.path === '/manages/banner',
                  }"
                >
                  แบนเนอร์
                </li>
              </NuxtLink>
            </ul>
          </div>
        </div>

        <!-- Dropdownreport -->
        <div class="relative group">
          <div
            class="flex gap-2 text-[15px]"
            @click="toggleDropdown('dropdown4')"
          >
            <div
              class="flex gap-2"
              :class="{
                'text-orange-500':
                  route.path === '/order/report' ||
                  route.path === '/refund/report',
              }"
            >
              <div>
                <i class="fa-solid fa-gear"></i>
              </div>
              <span class="ml-[6px]">รายงาน</span>
            </div>
            <i
              :class="{
                'fa-solid fa-caret-down': dropdownState === 'dropdown2',
                'fa-solid fa-caret-right': dropdownState !== 'dropdown2',
              }"
              class="text-[12px] flex items-center ml-[48.5px]"
            ></i>
          </div>
          <!-- Dropdown menu -->
          <div
            v-show="dropdownState === 'dropdown4'"
            class="bg-white rounded-lg border shadow w-[145px] mt-2"
          >
            <ul class="py-2 text-gray-700">
              <NuxtLink to="/order/report">
                <li
                  class="block px-4 py-2 text-[15px] hover:bg-gray-100"
                  :class="{
                    'text-orange-500': route.path === '/order/report',
                  }"
                >
                  รายงานการขาย
                </li>
              </NuxtLink>
              <NuxtLink to="/refund/report">
                <li
                  class="block px-4 py-2 text-[15px] hover:bg-gray-100"
                  :class="{
                    'text-orange-500': route.path === '/refund/report',
                  }"
                >
                  รายงานการคืนสิน
                </li>
              </NuxtLink>
            </ul>
          </div>
        </div>

        <NuxtLink
          to="/logs"
          class="flex gap-2"
          :class="{
            'text-orange-500': route.path === '/logs',
          }"
        >
          <div>
            <i class="fa-regular fa-clock"></i>
          </div>
          <span class="text-[15px] ml-[6px]">บันทึกของระบบ</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const dropdownState = ref<string | null>(null);

const toggleDropdown = (dropdown: string) => {
  dropdownState.value = dropdownState.value === dropdown ? null : dropdown;
};
</script>

<style></style>
