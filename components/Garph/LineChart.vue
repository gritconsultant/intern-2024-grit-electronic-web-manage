<template>
  <div
    class="flex justify-center items-center w-full h-[300px]  p-2"
  >
    <div class="w-[800px] h-[300px]   ">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

// ลงทะเบียนโมดูล
ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

// Props รับข้อมูลที่กรองแล้ว
const props = defineProps<{
  salesDataLine: Array<{ label: string; value: number }>;
}>();

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: ChartJS | null = null;

// ฟังก์ชันสร้างกราฟ
const createChart = () => {
  if (chartCanvas.value) {
    if (chartInstance) {
      chartInstance.destroy(); // ลบกราฟเก่า
    }
    chartInstance = new ChartJS(chartCanvas.value, {
      type: "line",
      data: {
        labels: props.salesDataLine.map((data) => data.label), // ใช้เดือนเป็น Labels
        datasets: [
          {
            label: "Sales Data",
            data: props.salesDataLine.map((data) => data.value),
            borderColor: "#3B82F6",
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            pointBackgroundColor: "#1E40AF",
            fill: true,
            tension: 0.4,
          },
        ],
      },
    });
  }
};

// สร้างกราฟเมื่อ Mounted และอัปเดตเมื่อข้อมูลเปลี่ยน
onMounted(createChart);
watch(() => props.salesDataLine, createChart, { deep: true });
</script>

<style>
/* ถ้าต้องการกำหนดขนาดเพิ่มเติม สามารถเพิ่มในส่วนนี้ */
</style>
