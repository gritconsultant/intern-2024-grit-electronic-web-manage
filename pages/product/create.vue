<template>
  <div class="defaultpages">
    <div class="flex items-center justify-between h-[5%] my-5 pl-[35px]">
      <h1 class="text-[40px] font-bold">เพิ่มสินค้า</h1>
    </div>
    <div class="mx-[100px] mr-[30%] flex flex-col gap-10 h-full">
      <div class="text-[25px] font-semibold flex">
        <label for="">ชื่อสินค้า</label>
        <input type="text" class="rounded-[5px] w-[80%] ml-[100px]" />
      </div>
      <div class="flex gap-10">
        <div class="flex gap-[31px] w-[70%]">
          <div class="flex flex-col gap-5 w-[50%]">
            <label for="" class="text-[25px] font-semibold">ประเภทสินค้า</label>
            <label for="" class="text-[25px] font-semibold">ราคา</label>
          </div>
          <div class="flex flex-col gap-8 w-full">
            <select name="" id="" class="w-[95%] h-full rounded-[5px]"></select>
            <input type="text" id="" class="w-[95%] h-full rounded-[5px]" />
          </div>
        </div>
        <div class="flex gap-[31px] w-[70%]">
          <div class="flex flex-col gap-5 w-[50%]">
            <label for="" class="text-[25px] font-semibold">สถานะสินค้า</label>
            <label for="" class="text-[25px] font-semibold">จำนวน</label>
          </div>
          <div class="flex flex-col gap-8 w-full">
            <label class="relative inline-flex items-center cursor-pointer">
              <!-- Checkbox -->
              <input type="checkbox" class="sr-only peer" />
              <!-- Toggle Switch Background -->
              <div
                class="w-[30%] h-[30px] bg-orange-200 peer-focus:outline-none peer-focus:ring-[1px] peer-focus:ring-orange-600/70 rounded-full peer-checked:bg-orange-500 transition-colors"
              ></div>
              <!-- Toggle Knob -->
              <div
                class="absolute w-[8%] h-[26px] bg-orange-400 rounded-full left-[2px] top-[2px] peer-checked:translate-x-[69px] transition-transform"
              ></div>
            </label>
          </div>
        </div>
      </div>
      <div class="flex gap-[69px]">
        <h3 class="text-[25px] font-semibold">รายละเอียด</h3>
        <textarea class="rounded-[5px] w-[80%]"></textarea>
      </div>
      <div class="flex flex-col gap-5">
        <h3 class="text-[25px] font-semibold">รูปสินค้า</h3>
        <div class="flex gap-5 pl-[200px]">
          <div>
            <input type="file" />
          </div>
          <div class="bg-slate-900 w-[300px] h-[300px] rounded-[5px]">
            <img
              src="https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/02/Product/msi-thin-a15-b7vf-044th-gaming-notebook-front-left-view.jpg"
              alt=""
              class="object-cover flex place-content-center rounded-[5px]"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-center gap-28">
        <button class="border-2 p-2 rounded-[5px] bg-red-600">ยกเลิก</button>
        <button class="border-2 p-2 rounded-[5px] bg-green-600">ยืนยัน</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
