<template>
  <div class="defaultpages p-5 px-10">
    <div
      class="flex items-center h-[10%] pl-[35px] mb-5 bg-white rounded-lg dropshadowbox"
    >
      <h1 class="text-[25px] font-bold">แดชบอร์ด</h1>
    </div>

    <div class="flex gap-2 bg-slate-200 w-full h-[87%]">
      <div class="flex justify-center items-center w-[50%] bg-slate-400 ">
        <div class="grid grid-cols-2 gap-4 h-[90%] w-[90%]  bg-slate-500">
          <div
            class="w-[90%] h-full border-[1px] bg-gradient-to-t bg-white dropshadowbox rounded-[5px] px-3 py-2"
          >
            <div class="flex gap-5 h-full text-[#4CAF50]">
              <div class="flex flex-col gap-4">
                <h1 class="font-semibold">ยอดขายรวม</h1>
                <i class="fa-solid fa-coins text-[60px] pl-5"></i>
              </div>
              <div
                class="w-[50%] flex items-center justify-center text-[60px] font-medium pt-3 pl-8"
              >
                00000
              </div>
            </div>
          </div>
          <div
            class="w-[22%] h-full border-[1px] bg-gradient-to-t bg-white dropshadowbox rounded-[5px] px-3 py-2"
          >
            <div class="flex gap-5 h-full text-[#007BFF]">
              <div class="flex flex-col gap-4">
                <h1 class="font-semibold">ยอดคำสั่งซื้อ</h1>

                <i class="fa-solid fa-cart-shopping text-[60px] pl-5"></i>
              </div>
              <div
                class="w-[50%] flex items-center justify-center text-[60px] font-medium pt-3 pl-8"
              >
                00000
              </div>
            </div>
          </div>
          <div
            class="w-[22%] h-full border-[1px] bg-gradient-to-t bg-white dropshadowbox rounded-[5px] px-3 py-2"
          >
            <div class="flex gap-5 h-full text-[#DC3545]">
              <div class="flex flex-col gap-4">
                <h1 class="font-semibold">การคืนสินค้า</h1>
                <i class="fa-solid fa-arrows-rotate text-[60px] pl-5"></i>
              </div>
              <div
                class="w-[50%] flex items-center justify-center text-[60px] font-medium pl-10 pt-3"
              >
                00000
              </div>
            </div>
          </div>
          <div
            class="w-[22%] h-full border-[1px] bg-gradient-to-t bg-white dropshadowbox rounded-[5px] px-3 py-2"
          >
            <div class="flex gap-5 h-full text-[#FF9800]">
              <div class="flex flex-col gap-4">
                <h1 class="font-semibold">บัญชีลูกค้ารวม</h1>
                <i class="fa-solid fa-users text-[60px] pl-5"></i>
              </div>
              <div
                class="w-[50%] flex items-center justify-center text-[60px] font-medium pl-7 pt-3"
              >
                00000
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex items-center justify-center w-[50%] bg-white rounded-[5px] dropshadowbox p-2"
      >
        <div class="container mx-auto px-4 py-8">
          <h1 class="text-2xl font-bold mb-6">การขายแต่ละประเภท</h1>
          <!-- ส่งข้อมูล salesData ไปยัง PieChart -->
          <GarphPieChart :salesData="salesData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// ข้อมูลการขาย
const salesData = {
  อาหาร: 120,
  เครื่องดื่ม: 80,
  สมุนไพร: 150,
  ผ้าและเครื่องดื่ม: 60,
  ของใช้และของตกแต่ง: 90,
};
</script>

<style></style>
