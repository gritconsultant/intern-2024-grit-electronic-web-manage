<template>
  <div class="flex gap-5 w-full text-black/70">
    <div class="bg-[#765798]/60 p-5 w-3/4 rounded-[20px] flex flex-col gap-5">
      <div class="flex gap-5">
        <div class="bg-white rounded-[50px] w-full p-2 flex justify-between">
          <div class="pl-5 w-5/6 bg-slate-400">
            <i class="fa-solid fa-calendar-days"></i>
          </div>
          <div
            class="w-1/6 flex justify-center text-center border-2 rounded-[20px] border-[#765798]"
          >
            <select name="" id="" class="border-white">
              <option value="volvo">ปี</option>
              <option value="volvo">เดือน</option>
              <option value="volvo">สัปาดห์</option>
              <option value="volvo">วัน</option>
            </select>
          </div>
        </div>
        <div class="w-1/8 bg-black flex items-center">
          <i class="fa-solid fa-bell text-yellow-400"></i>
        </div>
      </div>
      <div class="flex gap-5">
        <div class="rounded-[20px] p-2 w-1/4 grid gap-5 bg-white">
          <div class="flex gap-2">
            <div
              class="p-2 rounded-[100px] w-[35px] flex justify-center bg-white"
            >
              <i class="fa-solid fa-comment-dollar"></i>
            </div>
            <span class="bg-slate-500 w-full flex items-center">ชื่อ</span>
          </div>
          <h1 class="text-center font-bold text-lg text-[#8F7FF1] truncate">
            ฿
          </h1>
        </div>
        <div class="rounded-[20px] p-2 w-1/4 grid gap-5 bg-white">
          <div class="flex gap-2">
            <div
              class="p-2 rounded-[100px] w-[35px] flex justify-center bg-white"
            >
              <i class="fa-solid fa-comment-dollar"></i>
            </div>
            <span class="bg-slate-500 w-full flex items-center">ชื่อ</span>
          </div>
          <h1 class="text-center font-bold text-lg text-[#8F7FF1] truncate">
            ฿
          </h1>
        </div>
        <div class="rounded-[20px] p-2 w-1/4 grid gap-5 bg-white">
          <div class="flex gap-2">
            <div
              class="p-2 rounded-[100px] w-[35px] flex justify-center bg-white"
            >
              <i class="fa-solid fa-comment-dollar"></i>
            </div>
            <span class="bg-slate-500 w-full flex items-center">ชื่อ</span>
          </div>
          <h1 class="text-center font-bold text-lg text-[#8F7FF1] truncate">
            ฿
          </h1>
        </div>
        <div class="rounded-[20px] p-2 w-1/4 grid gap-5 bg-white">
          <div class="flex gap-2">
            <div
              class="p-2 rounded-[100px] w-[35px] flex justify-center bg-white"
            >
              <i class="fa-solid fa-comment-dollar"></i>
            </div>
            <span class="bg-slate-500 w-full flex items-center">ชื่อ</span>
          </div>
          <h1 class="text-center font-bold text-lg text-[#8F7FF1] truncate">
            ฿
          </h1>
        </div>
      </div>
      <div class="flex flex-col justify-between gap-5 h-full">
        <!-- graph -->
        <div class="p-5 bg-white rounded-[20px] flex flex-col gap-5 h-5/6">
          <div class="flex justify-between">
            <div class="">
              <h1 class="subheader">สรุปรายได้</h1>
              <span>0000</span>
            </div>
            <div>
              <div>selectorrewrewrwrewrw</div>
              <div class="flex justify-end">selectoryaer</div>
            </div>
          </div>
          <div>grafdsfdfsf</div>
        </div>
        <!-- Order -->
        <div
          class="p-5 bg-white rounded-[20px] text-black/70 flex flex-col gap-1 h-3/6"
        >
          <div class="flex justify-between">
            <h1 class="subheader">คำสั่งซื้อล่าสุด</h1>
            <p class="mt-[5px]">ทั้งหมด</p>
          </div>
          <div class="flex flex-col gap-2 h-full">
            <!-- Header Order -->
            <div
              class="flex gap-2 py-[2px] border-2 border-white border-b-black text-xs"
            >
              <div class="">หมายเลขคำสั่งซื้อ</div>
              <div class="w-[120px] text-center">วันที่</div>
              <div class="w-[100px] text-center">ชำระเงิน</div>
              <div class="w-[100px] text-center">สถานะ</div>
              <div class="w-[100px] text-center">ราคารวม</div>
              <div class="w-[220px] px-2">
                <span>หมายเเหตุ</span>
              </div>
            </div>
            <!-- Detail -->
            <div
              class="flex gap-2 py-[2px] border-[1px] border-white border-b-black/40 text-xs"
            >
              <div class="">หมายเลขคำสั่งซื้อ</div>
              <div class="w-[120px] text-center">วันที่</div>
              <div class="w-[100px] text-center">ชำระเงิน</div>
              <div class="w-[100px] text-center">สถานะ</div>
              <div class="w-[100px] text-center">ราคารวม</div>
              <div class="w-[220px] px-2 flex justify-between">
                <span class="w-full truncate">หมายเเหตุ</span>
                <i class="fa-solid fa-ellipsis mt-[5px]"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-1/4 mr-2 flex flex-col gap-5">
      <div class="bg-[#F7F1FD] rounded-[20px] h-2/6 p-3">
        <h1 class="h1">จำนวนผู้ใช้งาน</h1>
        <div class="my-5 h-[140px] flex flex-col items-center">
          <img
            class="h-[100px] object-cover"
            src="https://cdn-icons-png.flaticon.com/256/33/33887.png"
            alt=""
          />
          <span class="subheader text-[#8F7FF1]">1,2000 คน</span>
        </div>
      </div>
      <div class="bg-[#F7F1FD] rounded-[20px] h-4/6 p-3">
        <h1 class="h1">สรุุปคำสั่งซื้อ</h1>
        <div class=" my-2 h-[350px]  p-3">
          <div class="bg-white h-[200px] flex justify-center items-center">
            graph
          </div>
          <div class=" mt-2 p-2 details grid grid-cols-2 gap-2">
            <div>
              <h1>คำสั่งซื้อสำเร็จแล้ว</h1>
              <div class="flex gap-1">
                <i class="fa-solid fa-circle text-[#319F43] mt-[4px] "></i>
                <span>number</span>
              </div>
            </div>
            <div>
              <h1>คำสั่งซื้อกำลังจัดส่ง</h1>
              <div class="flex gap-1">
                <i class="fa-solid fa-circle text-[#4285F4] mt-[4px] "></i>
                <span>number</span>
              </div>
            </div>
            <div>
              <h1>คำสั่งซื้อที่ต้องจัดส่ง</h1>
              <div class="flex gap-1">
                <i class="fa-solid fa-circle text-[#FABB05] mt-[4px] "></i>
                <span>number</span>
              </div>
            </div>
            <div>
              <h1>คำสั่งซื้อรอการชำระ</h1>
              <div class="flex gap-1">
                <i class="fa-solid fa-circle text-[#FF823F] mt-[4px] "></i>
                <span>number</span>
              </div>
            </div>
            <div>
              <h1>คำสั่งซื้อถูกยกเลิก</h1>
              <div class="flex gap-1">
                <i class="fa-solid fa-circle text-[#FF5D02] mt-[4px] "></i>
                <span>number</span>
              </div>
            </div>
            <div>
              <h1>คำสั่งซื้อถูกส่งคืน</h1>
              <div class="flex gap-1">
                <i class="fa-solid fa-circle text-[#E94235] mt-[4px] "></i>
                <span>number</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
