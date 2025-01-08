<template>
  <div class="defaultpages">
    <div class="pages ">
      <Profile/>
      <hr class="hrpages" />
      <!-- Body -->
      <div
        class="w-[100%] h-[91%] flex gap-2 p-2 max-xl:flex-col max-sm:h-[85%]"
      >
        <!-- 1 -->
        <div class="w-[40%] max-xl:w-[100%] max-xl:h-[30%] flex flex-col gap-2">
          <!-- รายงาน -->
          <div class="bg-white w-full h-[65%] p-5 max-xl:h-[100%] roundedmain">
            <h1
              class="textmain xl:text-[20px] md:text-[18px] sm:text-[12px] max-sm:text-[10px] font-bold pl-2 truncate"
            >
              รายงานการขายประจำเดือน
            </h1>
            <hr
              class="my-2 border-[#2B1E28] border-[2px] max-md:border-[1px] rounded-full"
            />
            <!-- card -->
            <div class="grid grid-cols-2 max-xl:grid-cols-4 h-[90%] gap-2">
              <!-- 1 -->
              <div
                class="xl:h-[100%] md:h-[80%] sm:h-[90%] max-sm:h-[90%] w-[100%] p-1 rounded-[20px] dropshadowbottom bg-[#EEEEEE]"
              >
                <div class="h-full flex flex-col">
                  <div class="flex gap-2 bg">
                    <i 
                      class="fa-solid fa-dollar-sign flex justify-center p-2 text-white text-sm sm:text-base md:text-lg w-[30px] sm:w-[40px] md:w-[50px] rounded-full bg-[#593D53]"
                    ></i>
                    <h1
                      class="textmain xl:text-[20px] md:text-[14px] sm:text-[10px] max-sm:text-[8px] font-bold flex items-center"
                    >
                      ยอดการขาย
                    </h1>
                  </div>
                  <div class="h-[100%] flex justify-center items-center">
                    <span
                      class="textmain font-semibold h-[50%] xl:text-[70px] md:text-[40px] sm:text-[25px] max-sm:text-[20px]"
                      >0000</span
                    >
                  </div>
                </div>
              </div>
              <!-- 2 -->
              <div
                class="xl:h-[100%] md:h-[80%] sm:h-[90%] max-sm:h-[90%] w-[100%] p-1 rounded-[20px] dropshadowbottom bg-[#EEEEEE]"
              >
                <div class="h-full flex flex-col">
                  <div class="flex gap-2 bg">
                    <i
                      class="fa-solid fa-dollar-sign flex justify-center p-2 text-white text-sm sm:text-base md:text-lg w-[30px] sm:w-[40px] md:w-[50px] rounded-full bg-[#593D53]"
                    ></i>
                    <h1
                      class="textmain xl:text-[20px] md:text-[14px] sm:text-[10px] max-sm:text-[8px] font-bold flex items-center"
                    >
                      คำสั่งซื้อ
                    </h1>
                  </div>
                  <div class="h-[100%] flex justify-center items-center">
                    <span
                      class="textmain font-semibold h-[50%] xl:text-[70px] md:text-[40px] sm:text-[25px] max-sm:text-[20px]"
                      >0000</span
                    >
                  </div>
                </div>
              </div>
              <!-- 3 -->
              <div
                class="xl:h-[100%] md:h-[80%] sm:h-[90%] max-sm:h-[90%] w-[100%] p-1 rounded-[20px] dropshadowbottom bg-[#EEEEEE]"
              >
                <div class="h-full flex flex-col">
                  <div class="flex gap-2 bg">
                    <i
                      class="fa-solid fa-dollar-sign flex justify-center p-2 text-white text-sm sm:text-base md:text-lg w-[30px] sm:w-[40px] md:w-[50px] rounded-full bg-[#593D53]"
                    ></i>
                    <h1
                      class="textmain xl:text-[20px] md:text-[14px] sm:text-[10px] max-sm:text-[8px] font-bold flex items-center truncate"
                    >
                      จำนวนการคืนและยกเลิกสินค้า
                    </h1>
                  </div>
                  <div class="h-[100%] flex justify-center items-center">
                    <span
                      class="textmain font-semibold h-[50%] xl:text-[70px] md:text-[40px] sm:text-[25px] max-sm:text-[20px]"
                      >0000</span
                    >
                  </div>
                </div>
              </div>
              <!-- 4 -->
              <div
                class="xl:h-[100%] md:h-[80%] sm:h-[90%] max-sm:h-[90%] w-[100%] p-1 rounded-[20px] dropshadowbottom bg-[#EEEEEE]"
              >
                <div class="h-full flex flex-col">
                  <div class="flex gap-2 bg">
                    <i
                      class="fa-solid fa-dollar-sign flex justify-center p-2 text-white text-sm sm:text-base md:text-lg w-[30px] sm:w-[40px] md:w-[50px] rounded-full bg-[#593D53]"
                    ></i>
                    <h1
                      class="textmain xl:text-[20px] md:text-[14px] sm:text-[10px] max-sm:text-[8px] font-bold flex items-center truncate"
                    >
                      คำสั่งชื้อสำเร็จ
                    </h1>
                  </div>
                  <div class="h-[100%] flex justify-center items-center">
                    <span
                      class="textmain font-semibold h-[50%] xl:text-[70px] md:text-[40px] sm:text-[25px] max-sm:text-[20px]"
                      >0000</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- ยอดการขาย -->
          <div class="bg-white w-full h-[40%] p-2 max-xl:hidden roundedmain">
            <h1
              class="flex justify-center rounded-full xl:text-[15px] md:text-[12px] sm:text-[8px] max-sm:text-[6px] text-white font-bold p-1 w-[140px] bg-[#593D53] drop-shadow-md"
            >
              สรุปยอดการขาย
            </h1>
            <div class="flex justify-between gap-2 h-[90%] p-1">
              <div class="bg-slate-500 w-full h-full">1</div>
              <div class="bg-slate-600 w-full h-full">2</div>
            </div>
          </div>
        </div>
        <!-- Desktop -->
        <!-- 2 -->
        <div class="w-[60%] flex flex-col gap-2 max-xl:hidden">
          <!-- กราฟ -->
          <div class="bg-white w-full h-[45%] roundedmain">
            <div class="flex flex-col gap-2 h-full p-1">
              <div class="flex justify-between">
                <h1
                  class="flex justify-center items-center rounded-full xl:text-[15px] md:text-[12px] sm:text-[8px] max-sm:text-[6px] text-white font-bold p-1 w-[180px] bg-[#593D53] drop-shadow-md"
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
          <!-- คำสั่งซื้อล่าสุด -->
          <div class="bg-white w-full p-2 h-[55%] roundedmain">
            <div class="flex flex-col gap-2">
              <div class="flex justify-between">
                <h1
                  class="flex justify-center rounded-full text-white font-bold p-1 w-[140px] bg-[#593D53] drop-shadow-md"
                >
                  คำสั่งซื้อล่าสุด
                </h1>
                <h2 class="textmain font-bold pr-2 mt-[6px]">ทั้งหมด</h2>
              </div>
              <div class="flex flex-col gap-2 px-2">
                <!-- Header -->
                <div class="flex flex-col gap-2">
                  <div class="flex gap-2 w-full">
                    <h6 class="bg-slate-200 w-[20%]">หมายเลขคำสั่งซื้อ</h6>
                    <h6 class="bg-slate-200 text-center w-[20%]">วันที่</h6>
                    <h6 class="bg-slate-200 text-center w-[20%]">ชื่อสินค้า</h6>
                    <h6 class="bg-slate-200 text-center w-[20%]">ประเภท</h6>
                    <h6 class="bg-slate-200 text-center w-[20%]">จำนวนรวม</h6>
                    <h6 class="bg-slate-200 text-center w-[20%]">ราคารวม</h6>
                  </div>
                  <hr />
                </div>
                <!-- Body -->
                <div class="flex flex-col">
                  <div class="flex gap-2">
                    <h6 class="w-[20%] truncate">#หมายเลขคำสั่งซื้อ</h6>
                    <h6 class="text-center w-[20%]">--/--/--</h6>
                    <h6 class="text-center w-[20%] truncate">
                      --------------------------------
                    </h6>
                    <h6 class="text-center w-[20%] truncate">ประเภท</h6>
                    <h6 class="text-center w-[20%] truncate">จำนวนรวม</h6>
                    <div class="flex justify-center w-[20%]">
                      <div class="text-center w-[80%] ml-[25px] truncate">
                        00000000
                      </div>
                      <i
                        class="fa-solid fa-ellipsis-vertical ml-[20px] cursor-pointer bg-slate-600 mt-1"
                      ></i>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Ipad -->
        <div
          class="bg-slate-700 flex flex-col gap-2 w-[100%] h-[70%] xl:hidden max-sm:hidden"
        >
          <div class="flex justify-between w-full gap-2 h-[60%]">
            <!-- ยอดขาย -->
            <div class="bg-white w-full p-2 h-[100%] roundedmain">
              <h1
                class="flex justify-center rounded-full xl:text-[15px] md:text-[12px] sm:text-[11px] max-sm:text-[6px] text-white font-bold p-1 w-[140px] md:w-[120px] max-sm:w-[100px] bg-[#593D53] drop-shadow-md"
              >
                สรุปยอดการขาย
              </h1>
              <div class="flex flex-col gap-2 h-[90%] p-1">
                <div class="bg-slate-500 w-full h-full">1</div>
                <div class="bg-slate-600 w-full h-full">2</div>
              </div>
            </div>
            <!-- คำสั่งซื้อล่าสุด -->
            <div class="bg-white roundedmain w-full p-2 h-[100%]">
              <div class="flex justify-between mb-[5px]">
                <h1
                  class="flex justify-center rounded-full xl:text-[15px] md:text-[12px] sm:text-[11px] max-sm:text-[6px] text-white font-bold p-1 w-[140px] md:w-[100px] bg-[#593D53] drop-shadow-md"
                >
                  คำสั่งซื้อล่าสุด
                </h1>
                <h2
                  class="textmain xl:text-[15px] md:text-[12px] sm:text-[11px] max-sm:text-[6px] font-bold pr-2 mt-[6px]"
                >
                  ทั้งหมด
                </h2>
              </div>
              <div class="flex flex-col gap-2 px-2">
                <!-- Header -->
                <div class="flex flex-col gap-2">
                  <div class="flex gap-2 w-full">
                    <h6 class="bg-slate-200 w-[50%] truncate">
                      หมายเลขคำสั่งซื้อ
                    </h6>
                    <h6 class="bg-slate-200 text-center w-[50%] truncate">
                      วันที่
                    </h6>
                  </div>
                  <hr />
                </div>
                <!-- Body -->
                <div class="flex flex-col">
                  <div class="flex gap-2">
                    <h6 class="w-[50%] truncate">#หมายเลขคำสั่งซื้อ</h6>
                    <div class="flex justify-between w-[50%]">
                      <h6 class="text-center w-[70%] ml-[40px] truncate">
                        --/--/----
                      </h6>
                      <i
                        class="fa-solid fa-ellipsis-vertical cursor-pointer ml-[20px] mt-1"
                      ></i>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </div>
          <div class="h-[40%]">
            <div class="bg-white w-full p-2 h-[100%] roundedmain">
              <div class="flex flex-col gap-2 h-full p-1">
                <div class="flex justify-between">
                  <h1
                    class="flex justify-center items-center rounded-full xl:text-[15px] md:text-[12px] sm:text-[11px] max-sm:text-[6px] text-white font-bold p-1 w-[180px] bg-[#593D53] drop-shadow-md"
                  >
                    สรุปการขายประจำปี
                  </h1>
                  <div
                    class="flex gap-5 xl:text-[20px] md:text-[18px] sm:text-[14px] max-sm:text-[6px]"
                  >
                    <h2 class="textmain font-bold">ยอดขายรวม</h2>
                    ------
                    <p class="textmain font-bold mt-[3px]">บาท</p>
                  </div>
                  <div
                    class="flex justify-center p-2 gap-2 rounded-full w-[120px] xl:text-[15px] md:text-[12px] sm:text-[11px] max-sm:text-[6px] bg-[#878787]"
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
