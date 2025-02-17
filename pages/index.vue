<template>
  <div class="defaultpages p-8 space-y-6">
    <!-- Header -->
    <div class="flex items-center h-[10%] px-12 bg-white rounded-lg shadow-md">
      <h1 class="text-3xl font-bold">แดชบอร์ด</h1>
    </div>

    <div class="flex gap-8 w-full h-[87%]">
      <!-- Statistics Section -->
      <div
        class="grid grid-cols-2 gap-8 w-[50%]"
        v-for="(dashboards, index) in dashboard"
        :key="index"
      >
        <div
          class="flex flex-col items-center justify-center p-6 rounded-xl shadow-lg bg-white border border-gray-200 text-green-500"
        >
          <i class="fa-solid fa-coins text-8xl"></i>
          <h2 class="font-semibold text-lg mt-2">ยอดขายรวม</h2>
          <p class="text-4xl font-bold mt-5">{{ dashboards.totalsale }}</p>
        </div>

        <div
          class="flex flex-col items-center justify-center p-6 rounded-xl shadow-lg bg-white border border-gray-200 text-blue-500"
        >
          <i class="fa-solid fa-cart-shopping text-8xl"></i>
          <h2 class="font-semibold text-lg mt-2">ยอดคำสั่งซื้อ</h2>
          <p class="text-4xl font-bold mt-5">{{ dashboards.totalorder }}</p>
        </div>

        <div
          class="flex flex-col items-center justify-center p-6 rounded-xl shadow-lg bg-white border border-gray-200 text-red-500"
        >
          <i class="fa-solid fa-ban text-8xl"></i>
          <h2 class="font-semibold text-lg mt-2">ยกเลิกสินค้า</h2>
          <p class="text-4xl font-bold mt-5">{{ dashboards.totalcancelled }}</p>
        </div>

        <div
          class="flex flex-col items-center justify-center p-6 rounded-xl shadow-lg bg-white border border-gray-200 text-orange-500"
        >
          <i class="fa-solid fa-users text-8xl"></i>
          <h2 class="font-semibold text-lg mt-2">บัญชีลูกค้ารวม</h2>
          <p class="text-4xl font-bold mt-5">{{ dashboards.totaluser }}</p>
        </div>
      </div>

      <!-- Chart Section -->
      <div
        class="bg-white rounded-xl shadow-lg flex flex-col items-center w-[50%] p-8 border border-gray-200"
      >
        <h1 class="text-xl font-bold mb-4">การขายแต่ละประเภท</h1>
        <GarphPieChart :salesData="salesData" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Dashboard } from "~/models/report.model";
import service from "~/service";


const loading = ref(false);
const dashboard = ref<Dashboard[]>([]); // ใช้ ref สำหรับ array

const getDashboard = () => {
  service.report
    .getDashBoard()
    .then((resp: any) => {
      const data = resp.data?.data;

      console.log(" API Response:", data); // เช็ค API Response

      if (data) {
        const dashboardData: Dashboard = {
          totalsale: data.totalsale,
          totalorder: data.totalorder,
          totaluser: data.totaluser,
          totalcancelled: data.totalcancelled,
        };

        // อัปเดตค่าที่ dashboard.value (เป็น array ของ Dashboard)
        dashboard.value = [dashboardData]; // ใช้ .value กับ ref

        console.log(dashboard.value); // แสดงผล dashboard ที่ได้
      }
    })
    .catch((error: any) => {
      console.log(error.respontse); // เพิ่มข้อความผิดพลาดที่ชัดเจน
    })
    .finally(() => {
      // เมื่อโหลดข้อมูลเสร็จ
    });
};

// ข้อมูลการขาย
const salesData = {
  อาหาร: 120,
  เครื่องดื่ม: 80,
  สมุนไพร: 150,
  ผ้าและเครื่องดื่ม: 60,
  ของใช้และของตกแต่ง: 90,
};

onMounted(async () => {
  await getDashboard();
});
</script>

<style></style>
