<template>
  <div class="defaultpages flex flex-col gap-4 p-6 bg-gray-50">
    <div
      class="flex justify-between items-center bg-white p-5 rounded-lg dropshadowbox"
    >
      <h1 class="text-2xl font-bold text-gray-800">รายงานการคืนสินค้า</h1>
    </div>

    <div class="flex justify-between p-5 rounded-lg h-[8%]">
      <div class="flex gap-8 mb-6">
        <!-- Filter Section -->
        <div class="space-x-4">
          <label for="year" class="font-semibold "
            >เลือกปี:</label
          >
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
          <label for="month" class="font-semibold "
            >เลือกเดือน:</label
          >
          <select
            id="month"
            v-model="selectedMonth"
            class="border px-4 py-2 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
          >
            <option v-for="month in months" :key="month" :value="month">
              {{ month }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div
      class="flex flex-col justify-between bg-white p-5 rounded-lg dropshadowbox h-full w-full"
    >
      <!-- Sales Table -->
      <table class="w-full">
        <thead class="w-full">
          <tr
            class="flex gap-5 border-b-[2px] border-gray-400 pb-[8px] pt-[8px]"
          >
            <th class="w-[11%]">หมายเลขคืนสินค้า</th>
            <th class="w-[11%]">หมายเลขคำสั่งซื้อ</th>
            <th class="w-[11%]">ชื่อผู้ซื้อ</th>
            <th class="w-[15%]">รายการสินค้า</th>
            <th class="w-[11%]">จำนวน</th>
            <th class="w-[11%]">ราคา</th>
            <th class="w-[11%]">ยอดรวม</th>
            <th class="w-[11%]">วันที่</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in filteredOrders"
            :key="order.id"
            class="hover:bg-orange-50"
          >
            <td class="w-[11%] text-center">{{ order.id }}</td>
            <td class="w-[11%] text-center">{{ order.id }}</td>
            <td class="w-[11%]">{{ order.buyer.name }}</td>
            <td class="w-[15%]">{{ order.items.join(", ") }}</td>
            <td class="w-[11%] text-center">{{ order.quantity }}</td>
            <td class="w-[11%] text-right">
              {{ order.price | currency }}
            </td>
            <td class="w-[11%] text-right">
              {{ order.total | currency }}
            </td>
            <td class="w-[11%]">{{ order.date }}</td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <div class="flex justify-between items-center">
        <div class="text-sm text-gray-600">
          <!-- แสดงข้อมูลจาก (หน้า) และจำนวนทั้งหมด -->
          แสดง
          {{}} ถึง
          {{}}
          จากทั้งหมด {{}} รายการ
        </div>
        <div class="flex gap-2">
          <!-- ปุ่มก่อนหน้า -->
          <button
            class="px-3 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
          >
            ก่อนหน้า
          </button>

          <span class="flex items-center px-2"> หน้า {{ currentPage }} </span>

          <!-- ปุ่มถัดไป -->
          <button
            class="px-3 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// ตัวเลือกตัวกรอง
const years = [2023, 2024, 2025];
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

// ข้อมูลคำสั่งซื้อ
const orders = [
  {
    id: "ORD001",
    buyer: { name: "ลูกค้ากลุ่ม A" },
    items: ["สินค้า 1", "สินค้า 2"],
    quantity: 3,
    price: 110,
    total: 300,
    date: "2024-01-15",
  },
  {
    id: "ORD002",
    buyer: { name: "ลูกค้ากลุ่ม B" },
    items: ["สินค้า 3"],
    quantity: 1,
    price: 150,
    total: 150,
    date: "2024-02-03",
  },
  // เพิ่มข้อมูลคำสั่งซื้อที่นี่
];

const selectedYear = ref(2024);
const selectedMonth = ref("กุมภาพันธ์");
const selectedBuyer = ref(null);

// ฟังก์ชันคำนวณยอดรวม
const currency = (value) => {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  }).format(value);
};

// ฟิลเตอร์คำสั่งซื้อ
const filteredOrders = computed(() => {
  return orders.filter((order) => {
    const orderDate = new Date(order.date);
    const year = orderDate.getFullYear();
    const month = orderDate.getMonth() + 1; // เดือนใน JS เริ่มที่ 0
    return (
      selectedYear.value === year &&
      months[selectedMonth.value - 1] === months[month - 1] &&
      (selectedBuyer.value ? order.buyer.id === selectedBuyer.value : true)
    );
  });
});
</script>

<style scoped>
/* สไตล์เพิ่มเติมสำหรับสีส้ม */
</style>
