<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Pie Chart Example</h1>
    <div class="bg-white p-6 shadow-lg rounded-lg">
      <!-- Canvas สำหรับแสดงกราฟ -->
      <canvas ref="chartCanvas" class="h-96"></canvas>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import {
  Chart as ChartJS,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";

// ลงทะเบียนโมดูลของ Chart.js
ChartJS.register(PieController, ArcElement, Tooltip, Legend);

// ใช้ ref สำหรับอ้างถึง <canvas>
const chartCanvas = ref<HTMLCanvasElement | null>(null);

// ข้อมูลการขาย
const salesData = {
  "Product A": 120,
  "Product B": 80,
  "Product C": 150,
  "Product D": 60,
  "Product E": 90,
};

// ข้อมูลของ Pie Chart
const chartData = {
  labels: Object.keys(salesData), // ใช้ชื่อสินค้าเป็น labels
  datasets: [
    {
      label: "Sales Data",
      data: Object.values(salesData), // ใช้ยอดขายเป็น data
      backgroundColor: ["#EF4444", "#3B82F6", "#FBBF24", "#10B981", "#8B5CF6"], // กำหนดสีให้แต่ละส่วน
      hoverOffset: 10,
    },
  ],
};

// ตัวเลือกเพิ่มเติมสำหรับกราฟ
const chartOptions: ChartOptions<"pie"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top", // แสดง Legend ด้านบน
    },
    tooltip: {
      enabled: true, // เปิดใช้งาน Tooltip
    },
  },
};

// ฟังก์ชันสร้างกราฟเมื่อ Mounted
onMounted(() => {
  if (chartCanvas.value) {
    new ChartJS(chartCanvas.value, {
      type: "pie", // ประเภทของกราฟ
      data: chartData, // ข้อมูลของกราฟ
      options: chartOptions, // ตัวเลือกที่กำหนดไว้
    });
  }
});
</script>

<style>
canvas {
  display: block;
  max-width: 100%;
  max-height: 100%;
}
</style>
