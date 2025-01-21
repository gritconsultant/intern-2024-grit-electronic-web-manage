<template>
  <div class="defaultpages p-5">
    <div class="h-[8%] flex justify-between">
      <h1 class="text-[28px] font-bold">ลูกค้า #{{}}</h1>
      <button
        class="flex items-center justify-center border-[1px] border-[#FFD652]/50 bg-[#F68D44] text-[20px] font-semibold rounded-[5px] h-[60%] px-3 cursor-pointer dropshadowbutton mr-[50px]"
      >
        เปลี่ยนรหัสผ่าน
      </button>
    </div>
    <div class="w-full h-[90%] flex justify-between gap-5">
      <div
        class="bg-white h-[45%] w-[30%] p-4 rounded-[5px] dropshadowbottomsub"
      >
        <div class="flex justify-center">
          <div class="border-2 border-black rounded-[5px] px-2 py-[3px]">
            <i class="fa-solid fa-user"></i>
          </div>
        </div>
        <div class="flex flex-col gap-8 mt-8 h-[80%]">
          <div class="flex gap-2">
            <span class="text-[20px] font-semibold">ชื่อ</span>
            <div class="text-[20px] pl-[39px] w-full">john Do</div>
          </div>
          <div class="flex gap-2">
            <span class="text-[20px] font-semibold">อีเมล</span>
            <div class="text-[20px] pl-[20px] w-full">john_Do@gamil.com</div>
          </div>
          <div class="flex flex-col gap-2 h-full">
            <span class="text-[20px] font-semibold">ที่อยู่</span>
            <div class="text-[20px] px-8 h-full text-wrap w-full">
              บ้านเลขที่ 123 หมู่ที่ 4 ตำบลในเมือง อำเภอเมือง จังหวัดอุบลราชธานี
              34000
            </div>
          </div>
        </div>
      </div>
      <div
        class="bg-white h-[60%] p-5 w-[70%] rounded-[5px] dropshadowbottomsub"
      >
        <h2 class="text-[20px] font-semibold">รายการคำสั่งซื้อ</h2>
        <div class=" h-[90%] mt-[8px] ">
          <table class="flex flex-col px-8 gap-2 w-ful">
        <thead class="w-full">
          <tr class="flex gap-2 border-y-[1px] p-[2px]">
            <th class="w-[15%] text-start ">หมายเลขคำสั่งซื้อ</th>
            <th class="w-[15%] ">ราคารวม</th>
            <th class="w-[30%] ">สถานะคำสั่งซื้อ</th>
            <th class="w-[15%] ">เวลา</th>
            <th class="w-[20%] "></th>
          </tr>
        </thead>
        <tbody class="w-full">
          <tr class="flex gap-2 py-[1px] border-b-[1px]">
            <th
              class="w-[15%]  truncate flex gap-2 justify-between "
            >
            </th>
            <th class="w-[15%]  truncate ">2</th>
            <th class="w-[30%]  truncate ">3</th>
            <th class="w-[15%]  truncate ">4</th>
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
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
