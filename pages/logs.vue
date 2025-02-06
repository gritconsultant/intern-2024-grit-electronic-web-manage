<template>
  <div class="defaultpages flex flex-col gap-4 p-6">
    <div
      class="flex items-center justify-between pl-[10px] bg-white dropshadowbox rounded-lg h-[8%]"
    >
      <h1 class="text-2xl font-bold">รายงานการทำงาน</h1>
    </div>
    <div>
      <!-- ส่วนตัวกรอง -->
      <div class="flex items-center gap-4">
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

    <div
      class="bg-white pt-2 py-2 flex flex-col justify-between rounded-lg dropshadowbox h-[90%]"
    >
      <!-- ตาราง Logs -->
      <table class="flex flex-col px-8 gap-2 w-full ">
        <thead class="w-full">
          <tr class="flex gap-5 border-b-[2px] border-gray-400 pb-[8px] pt-[8px]">
            <th class="w-[20%] text-start">วัน</th>
            <th class="w-[80%] text-start">รายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          <!-- แสดงข้อมูลที่ผ่านการกรอง -->
          <tr
            v-for="(log, index) in paginatedLogs"
            :key="index"
            class="flex gap-5 py-[8px] border-b-[1px]"
          >
            <td class="w-[20%]">{{ log.date }}</td>
            <td class="w-[80%]">{{ log.details }}</td>
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
      <!-- Pagination -->
      <div class="flex justify-between items-center p-4">
        <div class="text-sm text-gray-600">
          <!-- แสดงข้อมูลจาก (หน้า) และจำนวนทั้งหมด -->
          แสดง
          {{}} ถึง
          {{}}
          จากทั้งหมด {{ filteredLogs.length }} รายการ
        </div>
        <div class="flex gap-2">
          <!-- ปุ่มก่อนหน้า -->
          <button
            :disabled="currentPage === 1"
            @click="currentPage--"
            class="px-3 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
          >
            ก่อนหน้า
          </button>
          <span class="flex items-center px-2"> หน้า {{ currentPage }} </span>

          <!-- ปุ่มถัดไป -->
          <button
            :disabled="currentPage === totalPages"
            @click="currentPage++"
            class="px-3 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>

    <!-- แสดงข้อมูลเกี่ยวกับการแบ่งหน้า -->
    <!-- <div class="flex justify-between items-center mt-4 text-sm text-gray-700">
      <div>
        <span>ข้อมูลทั้งหมด: {{ filteredLogs.length }} รายการ</span>
      </div>
      <div>
        <span>หน้า {{ currentPage }} จาก {{ totalPages }}</span>
      </div>
      <div>
        <span>แสดงข้อมูล {{ startItem }} ถึง {{ endItem }}</span>
      </div>
    </div> -->

    <!-- ปุ่มเปลี่ยนหน้า -->
    <!-- <div class="flex justify-between mt-4">
      <button
        :disabled="currentPage === 1"
        @click="currentPage--"
        class="bg-orange-500 text-white p-2 rounded"
      >
        ก่อนหน้า
      </button>
      <button
        :disabled="currentPage === totalPages"
        @click="currentPage++"
        class="bg-orange-500 text-white p-2 rounded"
      >
        ถัดไป
      </button>
    </div> -->
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

// ตั้งค่าการแบ่งหน้า
const currentPage = ref(1);
const logsPerPage = 10;

// คำนวณข้อมูลที่แสดงในแต่ละหน้า
const paginatedLogs = computed(() => {
  const start = (currentPage.value - 1) * logsPerPage;
  const end = currentPage.value * logsPerPage;
  return filteredLogs.value.slice(start, end);
});

// คำนวณจำนวนหน้า
const totalPages = computed(() => {
  return Math.ceil(filteredLogs.value.length / logsPerPage);
});

// คำนวณข้อมูลที่แสดง
const startItem = computed(() => {
  return (currentPage.value - 1) * logsPerPage + 1;
});

const endItem = computed(() => {
  return Math.min(currentPage.value * logsPerPage, filteredLogs.value.length);
});
</script>

<style scoped>
/* ปรับปรุงสไตล์ของปุ่มสำหรับการเปลี่ยนหน้า */
button:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
}
</style>
