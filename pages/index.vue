<template>
  <div class="defaultpages p-5">
    <div class="flex items-center h-[5%] pl-[35px] mb-5">
      <h1 class="text-[25px] font-bold">แดชบอร์ด</h1>
    </div>
    <div class="flex gap-[45px] justify-center w-full h-[15%]">
      <div
        class="w-[22%] h-full border-[1px] bg-gradient-to-t bg-white dropshadowbox rounded-[5px] px-3 py-2"
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
        <div class="flex gap-5 h-full text-[#007BFF]" >
          <div class="flex flex-col gap-4">
            <h1 class="font-semibold">ยอดคำสั่งซื้อ</h1>

            <i class="fa-solid fa-cart-shopping  text-[60px] pl-5"></i>
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
            class="w-[50%] flex items-center justify-center text-[60px] font-medium pl-7
             pt-3"
          >
            00000
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-between gap-5 w-full h-[50%] p-5 px-[35px] my-3">
      <div
        class="flex items-center justify-center w-[35%] bg-white rounded-[5px] dropshadowbox p-2"
      >
        <div class="container mx-auto px-4 py-8">
          <h1 class="text-2xl font-bold mb-6">การขายแต่ละประเภท</h1>
          <!-- ส่งข้อมูล salesData ไปยัง PieChart -->
          <GarphPieChart :salesData="salesData" />
        </div>
      </div>
      <div class="flex flex-col items-center justify-center w-[60%]">
        <div class="bg-white p-2 rounded-[5px] dropshadowbox ">
          <div>
            <label for="year">เลือกปี:</label>
            <select id="year" v-model="selectedYear">
              <option v-for="year in uniqueYears" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
          <GarphLineChart :salesDataLine="filteredData" />
        </div>
      </div>
    </div>
    <div class="w-full h-[60%] px-[35px]">
      <div class="w-full h-full bg-white  dropshadowbox rounded-[5px]">
        <div class="flex justify-between p-2">
          <span class="text-[20px] font-bold">คำสั่งซื้อล่าสุด</span>
          <NuxtLink to="order" class="flex gap-2">
            <span> ทั้งหมด </span>
            <div>
              <i class="fa-solid fa-angles-right"></i>
            </div>
          </NuxtLink>
        </div>
        <table class="flex flex-col gap-2 p-2 w-full">
          <thead class="w-full">
            <tr class="flex gap-2 border-y-[1px] py-2">
              <th class="w-[10%] text-start pl-2">หมายเลขคำสั่งซื้อ</th>
              <th class="w-[15%] text-start pl-2">วัน/เวลา</th>
              <th class="w-[10%] text-start pl-2">ลูกค้า</th>
              <th class="w-[5%] text-start pl-2">ราคารวม</th>
              <th class="w-[20%] text-start pl-2">ที่อยู่</th>
              <th class="w-[15%] text-start pl-2">เบอร์โทรศัพ</th>
              <th class="w-[10%]">สถานะคำสั่งซื้อ</th>
              <th class="w-[10%] text-start pl-2"></th>
            </tr>
          </thead>
          <tbody class="w-full">
            <tr class="flex gap-2">
              <th class="w-[10%] text-start font-medium pl-2 flex justify-start">
                #00000
              </th>
              <th class="w-[15%] font-medium text-start pl-2">--/--/---</th>
              <th class="w-[10%] font-medium truncate text-start pl-2">----</th>
              <th class="w-[5%] font-medium text-start pl-2">------</th>
              <th class="w-[20%] font-medium text-start pl-2">ที่อยู่</th>
              <th class="w-[15%] font-medium text-start pl-2">082-2222-222</th>
              <th class="w-[10%] font-medium ">สถานะคำสั่งซื้อ</th>
              <th class="w-[10%] bg-slate-1400 text-end font-medium pr-5">
                <NuxtLink to="/order/[id]">
                  <i class="fa-regular fa-eye"></i>
                </NuxtLink>
              </th>
            </tr>
          </tbody>
        </table>
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

const salesDataLine = ref([
  { label: "January", value: 120, year: 2023 },
  { label: "February", value: 150, year: 2023 },
  { label: "March", value: 100, year: 2023 },
  { label: "April", value: 80, year: 2023 },
  { label: "May", value: 200, year: 2023 },
  { label: "June", value: 170, year: 2023 },
  { label: "July", value: 1320, year: 2023 },
  { label: "August", value: 190, year: 2023 },
  { label: "September", value: 110, year: 2023 },
  { label: "October", value: 130, year: 2023 },
  { label: "November", value: 160, year: 2023 },
  { label: "December", value: 90, year: 2023 },

  { label: "January", value: 120, year: 2024 },
  { label: "February", value: 150, year: 2024 },
  { label: "March", value: 100, year: 2024 },
  { label: "April", value: 80, year: 2024 },
  { label: "May", value: 200, year: 2024 },
  { label: "June", value: 170, year: 2024 },
  { label: "July", value: 140, year: 2024 },
  { label: "August", value: 190, year: 2024 },
  { label: "September", value: 110, year: 2024 },
  { label: "October", value: 130, year: 2024 },
  { label: "November", value: 160, year: 2024 },
  { label: "December", value: 90, year: 2024 },
]);

const selectedYear = ref(2024);

const uniqueYears = computed(() => {
  return Array.from(new Set(salesDataLine.value.map((data) => data.year)));
});

const filteredData = computed(() => {
  return salesDataLine.value.filter((data) => data.year === selectedYear.value);
});
</script>

<style></style>
