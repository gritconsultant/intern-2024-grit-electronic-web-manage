<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import {
  Chart as ChartJS,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// ลงทะเบียนโมดูล
ChartJS.register(PieController, ArcElement, Tooltip, Legend);

// Props รับ salesData
const props = defineProps<{
  salesData: Record<string, number>;
}>();

const chartCanvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (chartCanvas.value) {
    new ChartJS(chartCanvas.value, {
      type: "pie",
      data: {
        labels: Object.keys(props.salesData),
        datasets: [
          {
            label: "Sales",
            data: Object.values(props.salesData),
            backgroundColor: [
              "#EF4444",
              "#3B82F6",
              "#FBBF24",
              "#10B981",
              "#8B5CF6",
            ],
            hoverOffset: 10, // เพิ่มระยะห่างตอน hover
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            labels: {
              font: {
                family: "Arial, sans-serif",
                size: 14,
                weight: "bold",
              },
              color: "#333", // สีของข้อความ Legend
            },
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                const value = tooltipItem.raw;
                return `${tooltipItem.label}: ${value} `;
              },
            },
            backgroundColor: "rgba(0, 0, 0, 0.8)", // สีพื้นหลัง Tooltip
            titleFont: {
              size: 16,
              weight: "bold",
            },
            bodyFont: {
              size: 14,
            },
            padding: 10,
          },
        },
      },
    });
  }
});
</script>

<style scoped>
.chart-container {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
}

canvas {
  display: block;
  max-width: 100%;
  max-height: 100%;
}
</style>
