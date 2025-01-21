<template>
  <div class="defaultpages flex flex-col gap-2">
    <div class="flex items-center justify-between h-[5%] pl-[35px]">
      <h1 class="text-[25px] font-bold">ประเภทสินค้า</h1>
    </div>
    <div class="flex justify-between px-[25px]">
      <div class="flex gap-2 w-[80%] ">
        <div class="w-[40%] ">
          <Search />
        </div>
      </div>
      <div class="pr-[50px]">
        <NuxtLink to="/product/category/create">
          <div
            class="flex items-center justify-center border-[1px] border-[#FFD652]/50 bg-[#F68D44] text-[20px] font-semibold rounded-[5px] h-full px-3 cursor-pointer dropshadowbutton"
          >
            เพิ่มประเภทสินค้า
          </div>
        </NuxtLink>
      </div>
    </div>
    <div class="w-full h-[90%] mt-2 pt-2 bg-white">
      <table class="flex flex-col px-8 gap-2 w-ful">
        <thead class="w-full">
          <tr class="flex gap-2">
            <th class="w-[30%] text-end pr-[70px] ">หมายเลขประเภท</th>
            <th class="w-[15%]">ชื่อประเภท</th>
            <th class="w-[15%]">จำนวน</th>
            <th class="w-[35%]  "></th>
          </tr>
        </thead>
        <tbody class="w-full">
          <tr class="flex gap-2 py-2 border-b-[1px]">
            <th class="w-[30%]  truncate flex gap-5">
              <div class="w-full flex justify-center  ">
                <img src="https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/01/Product/zowie-xl2546x-24-5-tn-fhd-gaming-monitor-240hz-front-view.jpg" alt="" 
                class="border-[1px] border-black w-[100px] h-[100px] rounded-full ">
              </div>
              <div class=" w-full">1</div>
            </th>
            <th class="w-[15%] truncate">2</th>
            <th class="w-[15%] truncate">3</th>
            <th class="w-[35%] flex items-center justify-end truncate">
              <button
                  class="bg-[#F68D44] w-[100px] h-[40px] rounded-[5px] hover:bg-red-500 text-[18px] font-semibold dropshadowbutton"
                >
                  ลบสินค้า
                </button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
