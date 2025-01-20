<template>
  <div class="defaultpages">
    <div class="flex items-center justify-between h-[5%] my-5 pl-[35px]">
      <h1 class="text-[40px] font-bold">เพิ่มประเภทสินค้า</h1>
    </div>
    <div class="flex flex-col gap-5 mx-20 mt-10">
      <div class="flex gap-10">
        <span class="text-[20px] font-semibold">ชื่อ</span>
        <input type="text" name="" id="" class="rounded-[5px] w-[500px]" />
      </div>
      <div class="flex justify-between w-[570px]">
        <input type="file" name="" id="" class="w-[250px]" />
        <img
          src="https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/01/Product/zowie-xl2546x-24-5-tn-fhd-gaming-monitor-240hz-front-view.jpg"
          alt=""
          class="w-[300px] h-[300px] border-2 border-black rounded-[5px]"
        />
      </div>
      <div class="flex justify-center gap-20 w-[570px]">
        <button class="border-[1px] p-[1px] w-[60px] rounded-[5px] bg-red-600">ยกเลิก</button>
        <button class="border-[1px] p-[1px] w-[60px] rounded-[5px] bg-green-600">ยืนยัน</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
