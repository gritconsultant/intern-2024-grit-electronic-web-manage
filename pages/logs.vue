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
            <th class="border border-gray-200 p-2 text-left">#</th>
            <th class="border border-gray-200 p-2 text-left">วัน</th>
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
            <td class="border border-gray-200 p-2">{{ index + 1 }}</td>
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
  { date: '2025-01-20', details: 'เริ่มต้นระบบ' },
  { date: '2025-01-21', details: 'ปรับปรุงฐานข้อมูล' },
  { date: '2025-01-22', details: 'ทดสอบระบบสำรองข้อมูล' },
  { date: '2025-01-23', details: 'อัปเดตซอฟต์แวร์' },
  { date: '2025-01-24', details: 'บันทึกการปิดระบบ' },
]);

// ฟิลเตอร์ Logs ตามวันที่
const filteredLogs = computed(() => {
  if (!filters.value.startDate && !filters.value.endDate) {
    return logs.value
  }
  return logs.value.filter((log) => {
    const logDate = new Date(log.date)
    const startDate = filters.value.startDate ? new Date(filters.value.startDate) : null
    const endDate = filters.value.endDate ? new Date(filters.value.endDate) : null

    return (
      (!startDate || logDate >= startDate) &&
      (!endDate || logDate <= endDate)
    )
  })
});
</script>

<style scoped></style>
