<template>
  <div class="p-2 w-full h-[740px]">
    <div class="pages">
      <!-- Header -->
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
          <div class="w-[150px] h-[40px] rounded-full bg-[#B1737E]">
            <div class="flex gap-2">
              <i
                class="fa-solid fa-user m-1 text-l rounded-full p-2 bg-white"
              ></i>
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
      <hr
        class="mt-[30px] mb-[15px] border-[#2B1E28] border-[2px] rounded-full"
      />
      <!-- Body -->
      <div class="flex gap-2 w-full">
        <div class="flex flex-col gap-3 w-2/4">
          <!-- รายงาน -->
          <div
            class="w-full h-[350px] p-2 rounded-[20px] drop-shadow-md bg-white"
          >
            <h1 class="textmain text-lg font-bold pl-2">
              รายงานการขายประจำเดือน
            </h1>
            <hr class="my-2 border-[#2B1E28] border-[2px] rounded-full" />
            <!-- card -->
            <div class="grid grid-cols-2 gap-4">
              <div class="p-2 rounded-[20px] drop-shadow-md mx-2 bg-[#EEEEEE]">
                <div class="flex gap-2">
                  <i
                    class="fa-solid fa-dollar-sign flex justify-center p-2 text-white text-base w-[40px] rounded-full bg-[#593D53]"
                  ></i>
                  <h1
                    class="textmain text-base font-bold text flex items-center"
                  >
                    ยอดการขาย
                  </h1>
                </div>
                <span
                  class="textmain text-[50px] font-semibold flex items-center place-content-center"
                  >0</span
                >
              </div>
              <div class="p-2 rounded-[20px] drop-shadow-md mx-2 bg-[#EEEEEE]">
                <div class="flex gap-2">
                  <i
                    class="fa-solid fa-dollar-sign flex justify-center p-2 text-white text-base w-[40px] rounded-full bg-[#593D53]"
                  ></i>
                  <h1
                    class="textmain text-base font-bold text flex items-center"
                  >
                    คำสั่งซื้อ
                  </h1>
                </div>
                <span
                  class="textmain text-[50px] font-semibold flex items-center place-content-center"
                  >0</span
                >
              </div>
              <div class="p-2 rounded-[20px] drop-shadow-md mx-2 bg-[#EEEEEE]">
                <div class="flex gap-2">
                  <i
                    class="fa-solid fa-dollar-sign flex justify-center p-2 text-white text-base w-[40px] rounded-full bg-[#593D53]"
                  ></i>
                  <h1
                    class="textmain text-[10px] font-bold text flex items-center"
                  >
                    จำนวนการคืนและยกเลิกสินค้า
                  </h1>
                </div>
                <span
                  class="textmain text-[50px] font-semibold flex items-center place-content-center"
                  >0</span
                >
              </div>
              <div class="p-2 rounded-[20px] drop-shadow-md mx-2 bg-[#EEEEEE]">
                <div class="flex gap-2">
                  <i
                    class="fa-solid fa-dollar-sign flex justify-center p-2 text-white text-base w-[40px] rounded-full bg-[#593D53]"
                  ></i>
                  <h1
                    class="textmain text-base font-bold text flex items-center"
                  >
                    คำสั่งชื้อสำเร็จ
                  </h1>
                </div>
                <span
                  class="textmain text-[50px] font-semibold flex items-center place-content-center bg"
                  >0</span
                >
              </div>
            </div>
          </div>
          <!-- สรุป -->
          <div
            class="w-full h-[230px] p-2 rounded-[20px] drop-shadow-md bg-white flex flex-col gap-2"
          >
            <h1
              class="flex justify-center rounded-full text-white font-bold p-1 w-[140px] bg-[#593D53] drop-shadow-md"
            >
              สรุปยอดการขาย
            </h1>
            <div class="flex justify-between gap-2 h-full p-1">
              <div class="bg-slate-500 w-full h-full">1</div>
              <div class="bg-slate-600 w-full h-full">2</div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-3 w-3/4">
          <!-- กราฟ -->
          <div
            class="w-full h-[230px] p-2 rounded-[20px] drop-shadow-md bg-white"
          >
            2
          </div>
          <!-- คำสั่งซื้อ -->
          <div
            class="w-full h-[350px] p-2 rounded-[20px] drop-shadow-md bg-white"
          >
            1
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
