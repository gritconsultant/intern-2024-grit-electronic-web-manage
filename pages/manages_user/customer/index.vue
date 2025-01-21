<template>
  <div class="defaultpages  flex flex-col gap-2">
    <div class="flex items-center justify-between h-[10%] pl-[35px]">
      <h1 class="text-[25px] font-bold">รายการบัญชีลูกค้า</h1>
    </div>
    <div class="flex gap-2 w-[80%] pl-[35px]">
      <div class="w-[40%] ">
        <Search />
      </div>
    </div>
    <div class="w-full h-[90%] mt-5 pt-2 bg-white">
      <table class="flex flex-col px-8 gap-2 w-ful">
        <thead class="w-full">
          <tr class="flex gap-2">
            <th class="w-[15%] ">หมายเลขผู้ใช้งาน</th>
            <th class="w-[15%] ">ชื่อ</th>
            <th class="w-[30%] ">อีเมล</th>
            <th class="w-[15%] ">จำนวนคำสั่งซื้อ</th>
            <th class="w-[20%] "></th>
          </tr>
        </thead>
        <tbody class="w-full">
          <tr class="flex gap-2 py-[1px] border-b-[1px]">
            <th
              class="w-[15%]  truncate flex gap-2 justify-between border-r-[2px]"
            >
            </th>
            <th class="w-[15%]  truncate border-r-[2px]">2</th>
            <th class="w-[30%]  truncate border-r-[2px]">3</th>
            <th class="w-[15%]  truncate border-r-[2px]">4</th>
            <th
              class="w-[20%]  flex  justify-end truncate]"
            >
              <NuxtLink to="/manages_user/customer/[id] ">
                <i class="fa-regular fa-eye text-[20px] "></i>
              </NuxtLink>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
