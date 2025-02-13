<template>
  <div class="defaultpages flex flex-col gap-6 p-6">
    <!-- Header -->
    <div
      class="flex justify-between items-center bg-white p-5 rounded-lg dropshadowbox"
    >
      <h1 class="text-2xl font-bold text-gray-800">รายงานการขายสินค้า</h1>
    </div>

    <!-- Filter Section -->
    <div class="flex gap-6 p-2 rounded-lg">
      <div class="space-x-4">
        <label for="year" class="font-semibold">เลือกปี:</label>
        <select
          id="year"
          v-model="selectedYear"
          class="border px-4 py-2 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
        >
          <option v-for="year in years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>

      <div class="space-x-4">
        <label for="month" class="font-semibold">เลือกเดือน:</label>
        <select
          id="month"
          v-model="month"
          class="border px-4 py-2 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
        >
          <option
            v-for="(monthName, index) in months"
            :key="index"
            :value="monthName"
          >
            {{ monthName }}
          </option>
        </select>
      </div>
    </div>

    <!-- Sales Table -->
    <div
      class="bg-white p-4 rounded-lg dropshadowbox h-[80%] flex flex-col justify-between"
    >
      <table class="w-full">
        <thead class="w-full">
          <tr class="border-b-2 mb-[8px] mt-[8px] w-full">
            <th class="text-center">หมายเลขคำสั่งซื้อ</th>
            <th class="text-center">ชื่อผู้ซื้อ</th>
            <th class="text-center">รายการสินค้า</th>
            <th class="text-center r">จำนวน</th>
            <th class="text-center">ราคา</th>
            <th class="text-center">ยอดรวม</th>
            <th class="text-center">วันที่สั่งซื้อ</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(report, index) in salereport"
            :key="index"
            class="border-b hover:bg-orange-50 text-[15px] font-medium"
          >
            <td class="p-4 text-center">{{ report.OrderID }}</td>
            <td class="p-4 text-center">{{ report.UserName }}</td>
            <td class="p-4 text-center">{{ report.ProductName }}</td>
            <td class="p-4 text-center">{{ report.Amount }}</td>
            <td class="p-4 text-center">{{ report.Price }}</td>
            <td class="p-4 text-center">{{ report.TotalPrice }}</td>
            <td class="p-4 text-center">{{ formatDate(report.Created_at) }}</td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <div class="flex justify-between items-center p-5 rounded-lg">
        <div class="text-sm text-gray-600">
          แสดง {{ (currentPage - 1) * size + 1 }} ถึง
          {{ Math.min(currentPage * size, paginate.Total) }}
          จากทั้งหมด {{ paginate.Total }} รายการ
        </div>
        <div class="flex gap-2">
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            ก่อนหน้า
          </button>
          <span class="flex items-center px-2">หน้า {{ currentPage }}</span>
          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage >= Math.ceil(paginate.Total / size)"
            class="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import service from "~/service";
import type { ParamsReport, SaleReport } from "../../models/report.model";

const size = ref(8); // ทำให้เป็น ref
const currentPage = ref(1); // ตั้งค่า currentPage เริ่มต้นที่ 1
const paginate = ref<{ Total: number }>({ Total: 0 });

const months = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];
const currentMonthIndex = new Date().getMonth(); // ได้ค่า 0-11
const month = ref(months[currentMonthIndex]); // ตอนนี้ months ถูกประกาศแล้ว

const currentYear = new Date().getFullYear();
const years = ref<number[]>(
  Array.from({ length: 5 }, (_, i) => currentYear - 2 + i)
); // ใช้ ref
const selectedYear = ref<number>(currentYear); // ตั้งค่าให้เป็นปี 2025

const salereport = ref<SaleReport[]>([]);

const getSaleReport = async () => {
  const param: ParamsReport = {
    page: currentPage.value, // ใช้ .value ในการเข้าถึง currentPage
    size: size.value, // ใช้ .value ในการเข้าถึง size
    month: month.value, //
    year: selectedYear.value, // ใช้ .value ในการเข้า����ง selectedYear
  };

  console.log("Sending param:", param); // ตรวจสอบค่า param ที่ส่งไป
  await service.report
    .getSaleReport(param)
    .then((resp: any) => {
      const data = resp.data.data;
      paginate.value = resp.data.paginate;

      const reportsale: SaleReport[] = [];
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const s = data[i];
        const report: SaleReport = {
          OrderID: s.OrderID,
          UserName: s.UserName,
          ProductName: s.ProductName,
          Amount: s.Amount,
          Price: s.Price,
          TotalPrice: s.TotalPrice,
          Created_at: s.Created_at,
        };
        reportsale.push(report);
      }
      salereport.value = reportsale;
    })
    .catch((error: any) => {
      console.error("Error fetching order data:", error);
    })
    .finally(() => {});
};

// ฟังก์ชันที่ใช้ในการเปลี่ยนหน้า
const changePage = (pageNumber: number) => {
  const totalPages = Math.ceil(paginate.value.Total / size.value); // คำนวณจำนวนหน้าทั้งหมด
  if (pageNumber < 1 || pageNumber > totalPages) {
    return; // ถ้าหน้าเกินขอบเขตให้ไม่ทำอะไร
  }

  currentPage.value = pageNumber; // เปลี่ยนหน้า

  // ส่งค่า param สำหรับการเรียกข้อมูลใหม่
  const param: ParamsReport = {
    page: currentPage.value, // ใช้ .value ในการเข้าถึง currentPage
    size: size.value, // ใช้ .value ในการเข้าถึง size
    month: month.value, //
    year: selectedYear.value,
  };

  getSaleReport(); // รีเฟรชข้อมูลเมื่อเปลี่ยนหน้า
};

const formatDate = (dateInput: string | number) => {
  let date: Date;

  if (typeof dateInput === "string") {
    date = new Date(dateInput); // ถ้าเป็น ISO string
  } else {
    date = new Date(dateInput * 1000); // ถ้าเป็น Unix timestamp
  }

  if (isNaN(date.getTime())) return "Invalid Date"; // ตรวจสอบค่า

  return date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const selectedMonth = ref("");

// Watch สำหรับปี
watch(selectedYear, (newYear) => {
  console.log("📅 ปีที่เลือก:", newYear);
  getSaleReport(); // โหลดข้อมูลใหม่เมื่อเปลี่ยนปี
});

// Watch สำหรับเดือน
watch(month, (newMonth) => {
  console.log("📅 เดือนที่เลือก:", newMonth);
  getSaleReport(); // โหลดข้อมูลใหม่เมื่อเปลี่ยนเดือน
});


onMounted(async () => {
  await getSaleReport();
});
</script>

<style scoped>
/* สไตล์เพิ่มเติมสำหรับสีส้ม */
</style>
