<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
    <!-- ใส่ selector ในวงกลม -->
    <div class="month-selector">
      <select v-model="selectedMonth" @change="updateChart">
        <option v-for="(month, index) in months" :key="index" :value="month">
          {{ month }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import {
  Chart as ChartJS,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register modules
ChartJS.register(DoughnutController, ArcElement, Tooltip, Legend);

// Props to receive salesData
const props = defineProps<{
  salesData: Record<string, number>;
}>();

// Local states
const chartCanvas = ref<HTMLCanvasElement | null>(null);
const selectedMonth = ref("January"); // Initial month
const months = ref([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]);

// Chart data
let chartInstance: ChartJS | null = null;

// Function to update the chart with sales data for the selected month
const updateChart = () => {
  if (chartInstance && chartCanvas.value) {
    chartInstance.data.labels = Object.keys(props.salesData);
    chartInstance.data.datasets[0].data = Object.values(props.salesData);
    chartInstance.update();
  }
};

onMounted(() => {
  if (chartCanvas.value) {
    chartCanvas.value.width = 600;
    chartCanvas.value.height = 600;

    chartInstance = new ChartJS(chartCanvas.value, {
      type: "doughnut",
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
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        cutout: "50%", // เพิ่มรูตรงกลาง
      },
    });
  }
});

// Watch for changes to the selected month and update the chart accordingly
watch(selectedMonth, () => {
  updateChart();
});
</script>

<style scoped>
.chart-container {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

canvas {
  width: 600px;
  height: 600px;
}

.month-selector {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100; /* ตั้งค่าให้ selector อยู่เหนือกราฟ */
  background-color: rgba(
    255,
    255,
    255,
    0.7
  ); /* เพิ่มพื้นหลังให้ selector เห็นชัดขึ้น */
  padding: 20px;
  border-radius: 50%; /* เปลี่ยนให้เป็นวงกลม */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
}

select {
  font-size: 1.2em;
  padding: 10px; /* เพิ่ม padding */
  border: none;
  outline: none;
  background-color: orange;
  text-align: center; /* กำหนดความกว้างให้มากขึ้น */
  height: 250px; /* ปรับความสูงให้เหมาะสม */
  display: inline-block; /* ใช้ inline-block เพื่อให้สามารถปรับขนาดได้ */
  margin-top: 33px;
  border-radius: 100%;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  min-width: 250px; /* เพิ่ม min-width ให้มีความยืดหยุ่น */
  max-width: 100%; /* ใช้ max-width 100% เพื่อให้มันปรับตามพื้นที่ */
}
.dropdown {
  position: absolute;
  top: 100%; /* แสดงผลทันทีด้านล่างของ custom-select */
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  max-height: 200px;
  overflow-y: auto;
  z-index: 100; /* ให้ dropdown อยู่เหนือเนื้อหาอื่น */
}

.dropdown ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.dropdown li {
  padding: 10px;
  cursor: pointer;
  text-align: center;
  font-size: 1.1em;
}

.dropdown li:hover {
  background-color: #ddd;
}

.custom-select::after {
  content: "▼"; /* ลูกศร */
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5em;
  color: #333;
}
</style>
