<template>
  <div class="my-3">
    <!-- Desktop -->
    <div class="flex justify-center w-full gap-2 max-xl:hidden">
      <!-- Search -->
      <div class="w-[50%]">
        <div
          class="flex justify-center items-center rounded-[100px] h-[40px] hover:bg-[#765798]/50 hover:text-white w-[50px] absolute cursor-pointer"
        >
          <i class="fa-solid fa-magnifying-glass text-[20px]"></i>
        </div>
        <input
          type="text"
          class="w-[90%] h-[40px] rounded-full ml-[1px] pl-[60px] pr-[20px] border-none outline-none bg-[#2B1E28]/50 text-white placeholder-white"
          placeholder="พิมชื่อสินค้าที่ต้องการค้นหา"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
