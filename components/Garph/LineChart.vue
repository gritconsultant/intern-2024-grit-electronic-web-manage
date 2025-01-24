<template>
  <div
    class="flex justify-center items-center w-full h-[350px]  rounded-lg p-4"
  >
    <div class="w-[950px] h-[350px]">
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
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              font: {
                size: 16,
              },
            },
          },
          tooltip: {
            backgroundColor: "rgba(0,0,0,0.7)",
            titleFont: {
              size: 14,
            },
            bodyFont: {
              size: 12,
            },
            cornerRadius: 6,
          },
        },
        scales: {
          x: {
            ticks: {
              font: {
                size: 14,
              },
              color: "#374151",
            },
            grid: {
              color: "#E5E7EB",
            },
          },
          y: {
            ticks: {
              font: {
                size: 14,
              },
              color: "#374151",
              callback: (value) => `$${value}`, // แสดงค่าพร้อมสัญลักษณ์ดอลลาร์
            },
            grid: {
              color: "#E5E7EB",
            },
          },
        },
      },
    });
  }
};

// สร้างกราฟเมื่อ Mounted และอัปเดตเมื่อข้อมูลเปลี่ยน
onMounted(createChart);
watch(() => props.salesDataLine, createChart, { deep: true });
</script>

<style>
/* เพิ่มการปรับแต่งสไตล์ */
.drop-shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.rounded-lg {
  border-radius: 12px;
}
</style>
