<template>
  <div class="defaultpages flex flex-col gap-2">
    <div class="flex items-center justify-between h-[5%] pl-[35px]">
      <h1 class="text-[25px] font-bold">รายการบัญชีผู้ดูแล</h1>
    </div>
    <div class="flex justify-between gap-2 w-[100%] pl-[35px]">
      <div class="w-[30%]">
        <Search />
      </div>
      <div class="mr-12">
        <button
          class="bg-orange-500 h-full px-2 border-[1px] border-orange-400 rounded-[5px] text-[15px] font-semibold"
        >
          เพิ่มบัญชีผู้ดูแล
        </button>
      </div>
    </div>
    <div class="w-full h-[90%] mt-2 pt-2 bg-white">
      <table class="flex flex-col px-8 gap-2 w-ful">
        <thead class="w-full">
          <tr class="flex gap-2">
            <th class="w-[15%] text-start">หมายเลขผู้ใช้งาน</th>
            <th class="w-[15%]">ชื่อ</th>
            <th class="w-[30%]">อีเมล</th>
            <th class="w-[38%]"></th>
          </tr>
        </thead>
        <tbody class="w-full">
          <tr class="flex gap-2 py-[1px] border-b-[1px]">
            <th class="w-[15%] truncate text-start border-r-[2px]"></th>
            <th class="w-[15%] truncate border-r-[2px]">2</th>
            <th class="w-[30%] truncate border-r-[2px]">3</th>
            <th class="w-[38%] flex justify-end gap-5 truncate]">
              <NuxtLink to="/manages_user/admin/[id] ">
                <i
                  class="fa-solid fa-pen-to-square text-[20px] text-orange-400"
                ></i>
              </NuxtLink>
              <div>
                <i
                  class="fa-solid fa-trash cursor-pointer text-red-600 text-[20px]"
                ></i>
              </div>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
