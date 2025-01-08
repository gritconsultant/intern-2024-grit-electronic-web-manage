<template>
  <div class="mt-2 ">
    <!-- Desktop -->
    <div
      class="flex justify-center w-full gap-2 max-xl:hidden delay-150"
    >
      <!-- Search -->
      <div class="w-[70%] ">
        <div
          class="flex justify-center items-center rounded-[100px] h-[40px]  hover:bg-[#765798]/50 hover:text-white w-[50px] absolute cursor-pointer"
        >
          <i class="fa-solid fa-magnifying-glass text-[20px]"></i>
        </div>
        <input
          type="text"
          class="w-[90%] h-[40px] rounded-full ml-[1px] pl-[60px] pr-[20px] border-none outline-none bg-[#2B1E28]/50  text-white placeholder-white"
          placeholder="พิมชื่อสินค้าที่ต้องการค้นหา"
        />
      </div>
      <!-- Proflie -->
      <div class="flex gap-2">
        <!-- bell -->
        <div class="ml-2">
          <i
            class="fa-solid fa-circle ml-[15px] mt-[4px] absolute p-[2px] text-center text-[6px] text-[#EC5B3D] bg-[#EC5B3D]/50 rounded-full"
          ></i>
          <i
            class="fa-solid fa-bell cursor-pointer text-3xl text-[#EAA04B]"
          ></i>
        </div>
        <div class="w-[150px] h-[40px] rounded-full bg-[#B1737E]">
          <div class="flex gap-2">
            <i
              class="fa-solid fa-user m-1 text-l rounded-full p-2 bg-white"
            ></i>
            <div class="flex flex-col">
              <h1 class="font-bold w-[80px]">john do</h1>
              <p class="text-[10px] flex justify-end">ตำแหน่ง</p>
            </div>
            <i
              class="fa-solid fa-ellipsis-vertical flex justify-center items-center cursor-pointer"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <!-- Ipad -->
    <div
      class="flex justify-center w-full gap-2  xl:hidden max-sm:hidden delay-150"
    >
      <!-- Search -->
      <div class="w-[40%]">
        <div
          class="flex justify-center items-center rounded-[100px] h-[40px]  hover:bg-[#765798]/50 hover:text-white w-[50px] absolute cursor-pointer"
        >
          <i class="fa-solid fa-magnifying-glass text-[20px]"></i>
        </div>
        <input
          type="text"
          class="w-full h-[40px] rounded-full pl-[60px] pr-[20px] border-none outline-none bg-[#2B1E28]/50 text-white placeholder-white"
          placeholder="พิมชื่อสินค้าที่ต้องการค้นหา"
        />
      </div>
      <!-- Proflie -->
      <div class="flex gap-2">
        <!-- bell -->
        <div class="ml-2">
          <i
            class="fa-solid fa-circle ml-[15px] mt-[4px] absolute p-[2px] text-center text-[6px] text-[#EC5B3D] bg-[#EC5B3D]/50 rounded-full"
          ></i>
          <i
            class="fa-solid fa-bell cursor-pointer text-3xl text-[#EAA04B]"
          ></i>
        </div>
        <div class="w-[150px] h-[40px] rounded-full bg-[#B1737E]">
          <div class="flex gap-2">
            <i
              class="fa-solid fa-user m-1 text-l rounded-full p-2 bg-white"
            ></i>
            <div class="flex flex-col">
              <h1 class="font-bold w-[80px]">john do</h1>
              <p class="text-[10px] flex justify-end">ตำแหน่ง</p>
            </div>
            <i
              class="fa-solid fa-ellipsis-vertical flex justify-center items-center cursor-pointer"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <!-- mobile -->
    <div
      class="flex justify-center w-full mt-2 pl-[70px] gap-2  xl:hidden sm:hidden delay-150"
    >
      <!-- Search -->
      <div class="w-[50%]k">
        <div
          class="flex justify-center items-center rounded-[100px] h-[40px]  hover:bg-[#765798]/50 hover:text-white w-[50px] absolute cursor-pointer"
        >
          <i class="fa-solid fa-magnifying-glass text-[20px]"></i>
        </div>
        <input
          type="text"
          class="w-full h-[40px] rounded-full pl-[60px] pr-[20px] border-none outline-none bg-[#2B1E28]/50 text-white placeholder-white"
          placeholder="พิมชื่อสินค้าที่ต้องการค้นหา"
        />
      </div>
      <!-- Proflie -->
      <div class="flex gap-2">
        <!-- bell -->
        <div class="ml-2">
          <i
            class="fa-solid fa-circle ml-[15px] mt-[4px] absolute p-[2px] text-center text-[6px] text-[#EC5B3D] bg-[#EC5B3D]/50 rounded-full"
          ></i>
          <i
            class="fa-solid fa-bell cursor-pointer text-3xl text-[#EAA04B]"
          ></i>
        </div>
        <div class=" rounded-full bg-[#B1737E]">
          <div class="flex gap-2">
            <i
              class="fa-solid fa-user m-1 text-l rounded-full p-2 bg-white"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
