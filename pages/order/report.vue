<template>
  <div class="defaultpages p-5">
    <!-- Header -->
    <div class="bg-white p-6 rounded-lg shadow-md mb-6">
      <h1 class="text-3xl font-semibold text-gray-700">รายงานการขาย</h1>
    </div>
    <div class="flex gap-[45px] justify-center w-full h-[15%] mb-6">
      <div
        class="w-[22%] h-full border-[1px] bg-gradient-to-t bg-white dropshadowbox rounded-[5px] px-3 py-2"
      >
        <div class="flex gap-5 h-full text-[#4CAF50]">
          <div class="flex flex-col gap-4">
            <h1 class="font-semibold">ยอดขายรวม</h1>
            <i class="fa-solid fa-coins text-[60px] pl-5"></i>
          </div>
          <div
            class="w-[50%] flex items-center justify-center text-[60px] font-medium pt-3 pl-8"
          >
            15154
          </div>
        </div>
      </div>
      <div
        class="w-[22%] h-full border-[1px] bg-gradient-to-t bg-white dropshadowbox rounded-[5px] px-3 py-2"
      >
        <div class="flex gap-5 h-full text-[#007BFF]">
          <div class="flex flex-col gap-4">
            <h1 class="font-semibold">รายรับ</h1>

            <i class="fa-solid fa-cart-shopping text-[60px] pl-5"></i>
          </div>
          <div
            class="w-[50%] flex items-center justify-center text-[60px] font-medium pt-3 pl-8"
          >
            15154
          </div>
        </div>
      </div>
      <div
        class="w-[22%] h-full border-[1px] bg-gradient-to-t bg-white dropshadowbox rounded-[5px] px-3 py-2"
      >
        <div class="flex gap-5 h-full text-[#DC3545]">
          <div class="flex flex-col gap-4">
            <h1 class="font-semibold">รายจ่าย</h1>
            <i class="fa-solid fa-arrows-rotate text-[60px] pl-5"></i>
          </div>
          <div
            class="w-[50%] flex items-center justify-center text-[60px] font-medium pl-10 pt-3"
          >
            15154
          </div>
        </div>
      </div>
      <div
        class="w-[22%] h-full border-[1px] bg-gradient-to-t bg-white dropshadowbox rounded-[5px] px-3 py-2"
      >
        <div class="flex gap-5 h-full text-[#FF9800]">
          <div class="flex flex-col gap-4">
            <h1 class="font-semibold">บัญชีลูกค้ารวม</h1>
            <i class="fa-solid fa-users text-[60px] pl-5"></i>
          </div>
          <div
            class="w-[50%] flex items-center justify-center text-[60px] font-medium pl-7 pt-3"
          >
            15154
          </div>
        </div>
      </div>
    </div>

    <div class="flex gap-5">
      <div class="bg-white rounded-lg dropshadowbox p-5 w-[30%]">
        <h1>เปรียบเทียบสถานะ</h1>
        <GarphStatusChart />
      </div>
      <div class="bg-white rounded-lg dropshadowbox p-5 w-[70%]">
        <div>
          <GarphOrderTimeChart />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
/* Customize styles if needed */
</style>
