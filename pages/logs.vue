<template>
  <div class="defaultpages flex flex-col gap-4 p-4">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">รายงานการทำงาน</h1>
    </div>
    <div>
      <!-- ส่วนตัวกรอง -->
      <div class="flex items-center space-x-4">
        <!-- วันที่เริ่มต้น -->
        <div>
          <label
            for="startDate"
            class="block text-sm font-medium text-black mb-1"
            >วันที่เริ่มต้น</label
          >
          <input
            type="date"
            id="startDate"
            v-model="filters.startDate"
            class="p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none h-[30px]"
          />
        </div>

        <!-- วันที่สิ้นสุด -->
        <div>
          <label for="endDate" class="block text-sm font-medium text-black mb-1"
            >วันที่สิ้นสุด</label
          >
          <input
            type="date"
            id="endDate"
            v-model="filters.endDate"
            class="p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none h-[30px]"
          />
        </div>
      </div>
    </div>
    <div class="bg-white">
      <!-- ตาราง Logs -->
      <table class="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-200 p-2 w-[20%] text-left">วัน</th>
            <th class="border border-gray-200 p-2 text-left">รายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          <!-- แสดงข้อมูลที่ผ่านการกรอง -->
          <tr
            v-for="(log, index) in filteredLogs"
            :key="index"
            class="hover:bg-gray-50"
          >
            <td class="border border-gray-200 p-2">{{ log.date }}</td>
            <td class="border border-gray-200 p-2">{{ log.details }}</td>
          </tr>

          <!-- หากไม่มี Logs -->
          <tr v-if="filteredLogs.length === 0">
            <td
              colspan="3"
              class="border border-gray-200 p-4 text-center text-gray-500"
            >
              ไม่พบ Logs ในช่วงวันที่ที่เลือก
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const filters = ref({
  startDate: "",
  endDate: "",
});

// ข้อมูล Logs ตัวอย่าง (มีวันและรายละเอียด)
const logs = ref([
  {
    date: "2025-01-20",
    details:
      "เพิ่มสินค้าใหม่: สมาร์ทโฟนรุ่น XYZ พร้อมรายละเอียด 128GB, 6GB RAM ลงในระบบ",
  },
  {
    date: "2025-01-21",
    details:
      'เพิ่มประเภทสินค้าใหม่ "เครื่องใช้ไฟฟ้า" สำหรับสินค้าเครื่องทำน้ำอุ่น',
  },
  {
    date: "2025-01-22",
    details:
      'คำสั่งซื้อ #1234 เข้า ระบบ ลูกค้าซื้อ "สมาร์ทโฟนรุ่น XYZ" จำนวน 1 เครื่อง',
  },
  {
    date: "2025-01-23",
    details:
      "เพิ่มสินค้าใหม่: หูฟัง Bluetooth รุ่น ABC พร้อมรายละเอียด 10 ชั่วโมงเล่นเพลงต่อเนื่อง",
  },
  {
    date: "2025-01-24",
    details:
      'เพิ่มประเภทสินค้าใหม่ "อุปกรณ์เสริมมือถือ" สำหรับสินค้าแท่นชาร์จไร้สาย',
  },
  {
    date: "2025-01-25",
    details:
      'คำสั่งซื้อ #5678 เข้า ระบบ ลูกค้าซื้อ "หูฟัง Bluetooth รุ่น ABC" จำนวน 2 เครื่อง',
  },
  {
    date: "2025-01-26",
    details: "ลูกค้าร้องขอคืนสินค้า #1234 เนื่องจากสินค้าชำรุด",
  },
  {
    date: "2025-01-27",
    details:
      'คำสั่งซื้อ #91011 เข้า ระบบ ลูกค้าซื้อ "สมาร์ทโฟนรุ่น ABC" พร้อมเคสและฟิล์มกันรอย',
  },
  {
    date: "2025-01-28",
    details:
      "แก้ไขข้อมูลสินค้า #9876 เพิ่มราคาจาก 5,000 บาท เป็น 5,500 บาท หลังการปรับราคาใหม่",
  },
  {
    date: "2025-01-29",
    details:
      'เพิ่มประเภทสินค้าใหม่ "แฟชั่น" สำหรับสินค้าประเภทเสื้อผ้าและเครื่องประดับ',
  },
  {
    date: "2025-01-30",
    details:
      'คำสั่งซื้อ #1122 เข้า ระบบ ลูกค้าซื้อ "แท่นชาร์จไร้สาย" จำนวน 1 ชิ้น',
  },
  {
    date: "2025-01-31",
    details:
      'แก้ไขข้อมูลสินค้า #1122 เพิ่มฟีเจอร์ "การชาร์จเร็ว" ให้กับแท่นชาร์จไร้สาย',
  },
  {
    date: "2025-02-01",
    details:
      "เพิ่มสินค้าใหม่: เครื่องดูดฝุ่นไร้สายรุ่น 123 พร้อมคุณสมบัติทำความสะอาดล้ำลึก",
  },
  {
    date: "2025-02-02",
    details:
      'เพิ่มประเภทสินค้าใหม่ "เครื่องใช้ในบ้าน" สำหรับสินค้าหมวดเครื่องดูดฝุ่น',
  },
  {
    date: "2025-02-03",
    details: "ลูกค้าร้องขอคืนสินค้า #5678 เนื่องจากสินค้าถูกส่งผิดรุ่น",
  },
  {
    date: "2025-02-04",
    details:
      'คำสั่งซื้อ #3344 เข้า ระบบ ลูกค้าซื้อ "เครื่องดูดฝุ่นไร้สายรุ่น 123" จำนวน 1 เครื่อง',
  },
  {
    date: "2025-02-05",
    details: "แก้ไขข้อมูลสินค้า #1234 ปรับลดราคาจาก 6,000 บาท เป็น 5,500 บาท",
  },
  {
    date: "2025-02-06",
    details:
      'เพิ่มประเภทสินค้าใหม่ "สุขภาพ" สำหรับสินค้าประเภทเครื่องออกกำลังกาย',
  },
  {
    date: "2025-02-07",
    details:
      'คำสั่งซื้อ #7788 เข้า ระบบ ลูกค้าซื้อ "เครื่องออกกำลังกาย" จำนวน 2 ชิ้น',
  },
  {
    date: "2025-02-08",
    details:
      'เพิ่มสินค้าใหม่: ลู่วิ่งไฟฟ้า "ProFit" พร้อมฟีเจอร์ตรวจจับการเผาผลาญแคลอรี่',
  },
]);

// ฟิลเตอร์ Logs ตามวันที่
const filteredLogs = computed(() => {
  if (!filters.value.startDate && !filters.value.endDate) {
    return logs.value;
  }
  return logs.value.filter((log) => {
    const logDate = new Date(log.date);
    const startDate = filters.value.startDate
      ? new Date(filters.value.startDate)
      : null;
    const endDate = filters.value.endDate
      ? new Date(filters.value.endDate)
      : null;

    return (
      (!startDate || logDate >= startDate) && (!endDate || logDate <= endDate)
    );
  });
});
</script>

<style scoped></style>
