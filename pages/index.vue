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
            <div class="flex flex-col gap-2 h-full p-1">
              <div class="flex justify-between">
                <h1
                  class="flex justify-center rounded-full text-white font-bold p-1 w-[200px] bg-[#593D53] drop-shadow-md"
                >
                  สรุปการขายประจำปี
                </h1>
                <div class="flex gap-5">
                  <h2 class="textmain text-xl font-bold">ยอดขายรวม</h2>
                  ------
                  <p class="textmain font-bold mt-[3px]">บาท</p>
                </div>
                <div
                  class="flex justify-center p-2 gap-2 rounded-full w-[120px] bg-[#878787]"
                >
                  <i class="fa-solid fa-calendar-days"></i>
                  <select name="" id="">
                    <option value="">2023</option>
                    <option value="">2022</option>
                    <option value="">2021</option>
                  </select>
                </div>
              </div>
              <div class="h-full bg-slate-400">garph</div>
            </div>
          </div>
          <!-- คำสั่งซื้อ -->
          <div
            class="w-full h-[350px] p-2 rounded-[20px] drop-shadow-md bg-white"
          >
            <div class="flex flex-col gap-2">
              <div class="flex justify-between">
                <h1
                  class="flex justify-center rounded-full text-white font-bold p-1 w-[140px] bg-[#593D53] drop-shadow-md"
                >
                  คำสั่งซื้อล่าสุด
                </h1>
                <h2 class="textmain font-bold pr-2 mt-[6px]">ทั้งหมด</h2>
              </div>
              <div class="flex flex-col gap-2 px-2" >
                <!-- Header -->
                <div class="flex flex-col gap-2">
                  <div class="flex gap-2">

                    <h6 class="bg-slate-200 w-[130px]">หมายเลขคำสั่งซื้อ</h6>
                    <h6 class="bg-slate-200 text-center w-[100px]">วันที่</h6>
                    <h6 class="bg-slate-200 text-center w-[100px]">ชื่อสินค้า</h6>
                    <h6 class="bg-slate-200 text-center w-[100px]">ประเภท</h6>
                    <h6 class="bg-slate-200 text-center w-[100px]">จำนวนรวม</h6>
                    <h6 class="bg-slate-200 text-center w-[100px]">ราคารวม</h6>
                  </div>
                  <hr>
                </div>
                <!-- Body -->
                <div class="flex flex-col">
                  <div class="flex gap-2">
                    <h6 class=" w-[130px]">#หมายเลขคำสั่งซื้อ</h6>
                    <h6 class=" text-center w-[100px]">วันที่</h6>
                    <h6 class=" text-center w-[100px]">ชื่อสินค้า</h6>
                    <h6 class=" text-center w-[100px]">ประเภท</h6>
                    <h6 class=" text-center w-[100px]">จำนวนรวม</h6>
                    <h6 class=" text-center w-[100px]">ราคารวม</h6>
                    <i class="fa-solid fa-ellipsis-vertical cursor-pointer mt-1"></i>
                  </div>
                  <hr>
                </div>
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
