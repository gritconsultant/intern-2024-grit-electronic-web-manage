<template>
  <div class="defaultpages">
    <div class="flex items-center h-[5%] pl-[35px]">
      <h1 class="text-[20px] font-bold">แดชบอร์ด</h1>
    </div>
    <div class="flex gap-[90px] justify-center w-full h-[15%]">
      <div
        class="w-[20%] h-full border-[1px] bg-gradient-to-t from-slate-300 to bg-slate-200 rounded-[5px]"
      ></div>
      <div
        class="w-[20%] h-full border-[1px] bg-gradient-to-t from-slate-300 to bg-slate-200 rounded-[5px]"
      ></div>
      <div
        class="w-[20%] h-full border-[1px] bg-gradient-to-t from-slate-300 to bg-slate-200 rounded-[5px]"
      ></div>
      <div
        class="w-[20%] h-full border-[1px] bg-gradient-to-t from-slate-300 to bg-slate-200 rounded-[5px]"
      ></div>
    </div>
    <div class="flex justify-between gap-5 w-full h-[45%] p-5 bg-slate-200">
      <div class="flex items-center justify-center w-[40%]">
        <i class="fa-solid fa-chart-pie text-[300px]"></i>
      </div>
      <div class="flex items-center justify-center w-[55%]">
        <i class="fa-solid fa-chart-simple text-[300px]"></i>
      </div>
    </div>
    <div class=" w-full h-[30%] bg-slate-300">
      <div class="flex justify-between p-2">
        <span class="text-[20px] font-bold">คำสั่งซื้อ</span>
        <NuxtLink to="order" class="flex gap-2">
          <span> ทั้งหมด </span>
          <div>
            <i class="fa-solid fa-angles-right"></i>
          </div>
        </NuxtLink>
      </div>
      <table class="flex flex-col gap-2  p-2 w-full">
        <thead class="w-full bg-slate-500" >
          <tr class="flex gap-2">
            <th class="w-[15%] flex justify-start">หมายเลขคำสั่งซื้อ</th>
            <th class="w-[15%]">วัน/เวลา</th>
            <th class="w-[15%]">ลูกค้า</th>
            <th class="w-[15%]">ราคารวม</th>
            <th class="w-[15%]">สถานะการชำระ</th>
            <th class="w-[15%]">สถานะคำสั่งซื้อ</th>
          </tr>
        </thead>
        <tbody class="w-full bg-slate-500">
          <tr class="flex gap-2">
            <th class="w-[15%] flex justify-start">หมายเลขคำสั่งซื้อ</th>
            <th class="w-[15%]">วัน/เวลา</th>
            <th class="w-[15%]">ลูกค้า</th>
            <th class="w-[15%]">ราคารวม</th>
            <th class="w-[15%]">สถานะการชำระ</th>
            <th class="w-[15%]">สถานะคำสั่งซื้อ</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
