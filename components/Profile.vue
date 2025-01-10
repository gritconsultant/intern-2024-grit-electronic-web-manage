<template>
  <div class="flex justify-end pt-1 pr-[17px] rounded-[30px] bg-black">
    <!-- Proflie -->
    <div class="flex justify gap-2 pr-[5px] mt-[5px]">
      <!-- bell -->
      <div class="ml-2">
        <i
          class="fa-solid fa-circle ml-[15px] mt-[4px] absolute p-[2px] text-center text-[6px] text-[#EC5B3D] bg-[#EC5B3D]/50 rounded-full"
        ></i>
        <i class="fa-solid fa-bell cursor-pointer text-3xl text-[#EAA04B]"></i>
      </div>
      <div class="w-[150px] h-[40px] rounded-full bg-[#F68D44]">
        <div class="flex gap-2">
          <i class="fa-solid fa-user m-1 text-l rounded-full p-2 bg-white"></i>
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
</template>

<script lang="ts" setup></script>

<style></style>
