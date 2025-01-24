<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// ลงทะเบียน Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const chartCanvas = ref(null); // อ้างอิงถึง <canvas>
let chartInstance = null;

const data = {
  labels: ["รอชำระ", "กำลังจัดส่ง", "จัดส่งแล้ว", "ชำระล้มเหลว"],
  datasets: [
    {
      data: [25, 35, 20, 5], // ค่าของแต่ละสถานะ
      backgroundColor: [
        "rgba(54, 162, 235, 0.7)", // สีของสถานะที่ 2
        "rgba(255, 206, 86, 0.7)", // สีของสถานะที่ 3
        "rgba(75, 192, 192, 0.7)", // สีของสถานะที่ 4
        "rgba(255, 99, 132, 0.7)", // สีของสถานะที่ 1
      ],
    },
  ],
};

onMounted(() => {
  if (chartCanvas.value) {
    chartInstance = new Chart(chartCanvas.value, {
      type: "doughnut", // ชนิดของแผนภูมิ
      data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top", // ตำแหน่งของ legend
          },
        },
      },
    });
  }
});

onUnmounted(() => {
  // ทำลายอินสแตนซ์เมื่อ component ถูกถอด
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>

<style scoped>
div {
  width: 100%;
  max-width: 400px; /* จำกัดขนาดของแผนภูมิ */
  margin: auto;
}
canvas {
  display: block;
}
</style>
