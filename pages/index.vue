<template>
  <div class="p-2 w-screen h-screen">
    <div class="pages">
      <div class="flex justify-between gap-2">
        <!-- Search -->
        <div>
          <div
            class="flex justify-center items-center rounded-[100px] h-[40px] bg-white hover:bg-[#765798]/50 w-[60px] absolute cursor-pointer"
          >
            <i class="fa-solid fa-magnifying-glass text-[20px]"></i>
          </div>
          <input
            type="text"
            class="w-[900px] h-[40px] rounded-full pl-[70px] pr-[20px] border-none outline-none bg-white/50 text-white placeholder-white"
            placeholder="พิมชื่อสินค้าที่ต้องการค้นหา"
          />
        </div>
        <div class="flex gap-2">
          <i
            class="fa-solid fa-bell cursor-pointer text-4xl text-[#EAA04B]"
          ></i>
          <div class="w-[150px] h-[40px] rounded-full  bg-[#B1737E]">
            <div class="flex gap-2">
              <i class="fa-solid fa-user m-1 text-l rounded-full p-2 bg-white"></i>
              <div class="flex flex-col  ">
                <h1 class="font-bold w-[80px] ">john        do</h1>
                <p class="text-[10px] flex justify-end">ตำแหน่ง</p>
              </div>
              <i class="fa-solid fa-ellipsis-vertical flex justify-center items-center cursor-pointer "></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
