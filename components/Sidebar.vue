<template>
  <!-- Desktop -->
  <div
    class="w-[220px] h-full border-r-[1px] bg-white border-gray-400 max-xl:hidden duration-700"
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
        <div class="relative group">
          <div class="flex gap-2 text-[15px]">
            <NuxtLink
              to="/product"
              :class="{
                'text-orange-500':
                  route.path === '/order' ||
                  route.path === '/order/[id]' ||
                  route.path === '/order/report',
              }"
            >
              <div class="flex gap-2 text-[15px]">
                <div>
                  <i class="fa-solid fa-cart-shopping"></i>
                </div>
                <span class="ml-[5px]">รายการขาย</span>
              </div>
            </NuxtLink>
            <i class="fa-solid fa-caret-down text-[12px] flex items-center"></i>
          </div>
          <!-- Dropdown manu -->
          <div
            class="bg-white rounded-lg border shadow w-[145px] hidden group-hover:block"
          >
            <ul class="py-2 text-sm text-gray-700">
              <NuxtLink to="/order">
                <li class="block px-4 py-2 text-[15px] hover:bg-gray-100">
                  จัดการคำสั่งซื้อ
                </li>
              </NuxtLink>
              <NuxtLink to="/order/report">
                <li class="block px-4 py-2 text-[15px] hover:bg-gray-100">
                  รายงานการขาย
                </li>
              </NuxtLink>
            </ul>
          </div>
        </div>

        <!-- DropdownProduct -->
        <div class="relative group">
          <div class="flex gap-2 text-[15px]">
            <NuxtLink
              to="/product"
              :class="{
                'text-orange-500':
                  route.path === '/refund' ||
                  route.path === '/refund/[id]' ||
                  route.path === '/refund/report',
              }"
            >
              <div class="flex gap-2 text-[14px]">
                <div>
                  <i class="fa-solid fa-arrows-rotate"></i>
                </div>
                <span class="ml-[8px]">รายการคืนสินค้า</span>
              </div>
            </NuxtLink>
            <i class="fa-solid fa-caret-down text-[12px] flex items-center"></i>
          </div>
          <!-- Dropdown manu -->
          <div
            class="bg-white rounded-lg border shadow w-[145px] hidden group-hover:block"
          >
            <ul class="py-2 text-sm text-gray-700">
              <NuxtLink to="/refund">
                <li class="block px-4 py-2 text-[15px] hover:bg-gray-100">
                  จัดการคำร้อง
                </li>
              </NuxtLink>
              <NuxtLink to="/refund/report">
                <li class="block px-4 py-2 text-[13px] hover:bg-gray-100">
                  รายงานการคืนสินค้า
                </li>
              </NuxtLink>
            </ul>
          </div>
        </div>

        <!-- DropdownProduct -->
        <div class="relative group">
          <div class="flex gap-2 text-[15px]">
            <div
              :class="{
                'text-orange-500':
                  route.path === '/product' ||
                  route.path === '/product/[id]' ||
                  route.path === '/product/category' ||
                  route.path === '/product/create',
              }"
            >
              <div class="flex gap-2 text-[14px]">
                <div>
                  <i class="fa-solid fa-boxes-stacked"></i>
                </div>
                <span class="ml-[5px]">จัดการผลิตภัณฑ์</span>
              </div>
            </div>
            <i class="fa-solid fa-caret-down text-[12px] flex items-center"></i>
          </div>
          <!-- Dropdown manu -->
          <div
            class="bg-white rounded-lg border shadow w-[145px] hidden group-hover:block"
          >
            <ul class="py-2 text-gray-700">
              <NuxtLink to="/product">
                <li class="block px-4 py-2 text-[15px] hover:bg-gray-100">
                  ผลิตภัณฑ์
                </li>
              </NuxtLink>
              <NuxtLink to="/product/category">
                <li class="block px-4 py-2 text-[15px] hover:bg-gray-100">
                  ประเภทผลิตภัณฑ์
                </li>
              </NuxtLink>
            </ul>
          </div>
        </div>

        <!-- DropdowUser -->
        <div class="relative group">
          <div class="flex gap-2 text-[15px]">
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
                <i class="fa-solid fa-users-line"></i>
              </div>
              <span class="ml-[2px]">ผู้ใช้งาน</span>
            </div>
            <i class="fa-solid fa-caret-down text-[12px] flex items-center"></i>
          </div>
          <!-- Dropdown manu -->
          <div
            class="bg-white rounded-lg border shadow w-[145px] hidden group-hover:block"
          >
            <ul class="py-2 text-sm text-gray-700">
              <NuxtLink to="/manages_user/customer">
                <li class="block px-4 py-2 text-[15px] hover:bg-gray-100">
                  ลูกค้า
                </li>
              </NuxtLink>
              <NuxtLink to="/manages_user/admin">
                <li class="block px-4 py-2 text-[15px] hover:bg-gray-100">
                  เจ้าหน้าที่ดูแล
                </li>
              </NuxtLink>
            </ul>
          </div>
        </div>

        <!-- DropdowManages -->
        <div class="relative group">
          <div class="flex gap-2 text-[15px]">
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
            <i class="fa-solid fa-caret-down text-[12px] flex items-center"></i>
          </div>
          <!-- Dropdown manu -->
          <div
            class="bg-white rounded-lg border shadow w-[145px] hidden group-hover:block"
          >
            <ul class="py-2 text-gray-700">
              <NuxtLink to="/manages/bank">
                <li class="block px-4 py-2 text-[15px] hover:bg-gray-100">
                  ธนาคาร
                </li>
              </NuxtLink>
              <NuxtLink to="/manages/banner">
                <li class="block px-4 py-2 text-[15px] hover:bg-gray-100">
                  แบนเนอร์
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
const route = useRoute();
</script>

<style></style>
