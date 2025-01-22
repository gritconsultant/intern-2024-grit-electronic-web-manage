<template>
  <div class="defaultpages p-5">
    <div class="flex items-center h-[5%] pl-[35px]">
      <h1 class="text-[25px] font-bold">แดชบอร์ด</h1>
    </div>
    <div class="flex gap-[90px] justify-center w-full h-[15%]">
      <div
        class="w-[20%] h-full border-[1px] bg-gradient-to-t bg-white dropshadowbox rounded-[5px] px-3 py-2"
      >
        <div class="flex gap-5 h-full">
          <div class="flex flex-col gap-4">
            <h1 class="font-semibold">ยอดขายรวม</h1>
            <i class="fa-solid fa-face-smile text-[50px] pl-5"></i>
          </div>
          <div
            class="w-[50%] flex items-center justify-center text-[50px] font-medium pt-3 pl-8"
          >
            15154
          </div>
        </div>
      </div>
      <div
        class="w-[20%] h-full border-[1px] bg-gradient-to-t bg-white dropshadowbox rounded-[5px] px-3 py-2"
      >
        <div class="flex gap-5 h-full">
          <div class="flex flex-col gap-4">
            <h1 class="font-semibold">คำสั่งซื้อทั้งหมด</h1>
            <i class="fa-solid fa-face-smile text-[50px] pl-5"></i>
          </div>
          <div
            class="w-[50%] flex items-center justify-center text-[50px] font-medium pt-3 pl-8"
          >
            15154
          </div>
        </div>
      </div>
      <div
        class="w-[20%] h-full border-[1px] bg-gradient-to-t bg-white dropshadowbox rounded-[5px] px-3 py-2"
      >
        <div class="flex gap-5 h-full">
          <div class="flex flex-col gap-4">
            <h1 class="font-semibold">คืนสินค้าทั้งหมด</h1>
            <i class="fa-solid fa-face-smile text-[50px] pl-5"></i>
          </div>
          <div
            class="w-[50%] flex items-center justify-center text-[50px] font-medium pt-3"
          >
            15154
          </div>
        </div>
      </div>
      <div
        class="w-[20%] h-full border-[1px] bg-gradient-to-t bg-white dropshadowbox rounded-[5px] px-3 py-2"
      >
        <div class="flex gap-5 h-full">
          <div class="flex flex-col gap-4">
            <h1 class="font-semibold">บัญชีลูกค้าทั้งหมด</h1>
            <i class="fa-solid fa-face-smile text-[50px] pl-5"></i>
          </div>
          <div
            class="w-[50%] flex items-center justify-center text-[50px] font-medium pt-3"
          >
            15154
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-between gap-5 w-full h-[45%] p-5 px-[35px]">
      <div class="flex items-center justify-center w-[40%] bg-white">
        <div class="container mx-auto px-4 py-8">
          <h1 class="text-2xl font-bold mb-6">การขายแต่ละประเภท</h1>
          <!-- ส่งข้อมูล salesData ไปยัง PieChart -->
          <GarphPieChart :salesData="salesData" />
        </div>
      </div>
      <div class="flex flex-col items-center justify-center w-[55%]">
        <div>
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
      <div class="w-full h-full bg-white dropshadowbox rounded-[5px]">
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
              <th class="w-[10%] text-start pl-2 flex justify-start">
                #1111111
              </th>
              <th class="w-[15%] text-start pl-2">11/11/1111 1111111111</th>
              <th class="w-[10%] truncate text-start pl-2">ลูกค้า</th>
              <th class="w-[5%] text-start pl-2">1000000</th>
              <th class="w-[20%] text-start pl-2">ที่อยู่</th>
              <th class="w-[15%] text-start pl-2">082-2222-222</th>
              <th class="w-[10%]">สถานะคำสั่งซื้อ</th>
              <th class="w-[10%] bg-slate-1400 text-end pr-5">
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
