<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
    <!-- Update selector position and shape -->
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
    chartCanvas.value.width = 500;
    chartCanvas.value.height = 500;

    // สร้างสีสำหรับ backgroundColor โดยการใช้ฟังก์ชัน
    const generateColors = (count: number) => {
      const colors = [];
      const baseColors = [
        "#EF4444", "#3B82F6", "#FBBF24", "#10B981", "#8B5CF6",
        "#F472B6", "#6B7280", "#9333EA", "#F59E0B", "#34D399", // เพิ่มสีที่สามารถใช้
      ];
      
      for (let i = 0; i < count; i++) {
        colors.push(baseColors[i % baseColors.length]);
      }
      return colors;
    };

    // จำนวนสีจะถูกกำหนดตามจำนวนข้อมูลที่ส่งมา
    const salesDataCount = Object.keys(props.salesData).length;
    const chartColors = generateColors(salesDataCount);

    chartInstance = new ChartJS(chartCanvas.value, {
      type: "doughnut",
      data: {
        labels: Object.keys(props.salesData),
        datasets: [
          {
            label: "ยอดขาย",
            data: Object.values(props.salesData),
            backgroundColor: chartColors, // ใช้สีที่ถูกคำนวณ
            hoverOffset: 10,
            
          },
        ],
      },
      options: {
        responsive: true,
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
  width: 700px; /* เพิ่มขนาด max-width ให้ใหญ่ขึ้น */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 50px; /* เพิ่มระยะห่างด้านบน */
  height: 650px; /* เพิ่มความสูง */
}


canvas {
  width: 100%;
  height: auto;
  max-width: 500px; /* Adjusted for better fit */
  z-index: 1; /* Make sure canvas stays behind */
}

.month-selector {
  position: absolute;
  top: 0px; /* ปรับระยะห่างจากด้านบน */
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 2px; /* ลดขนาด padding */
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px; /* ลดขนาด width */
  box-shadow: 0px 0px 2px rgb(190, 190, 190);
}

select {
  font-size: 1em; /* ลดขนาดตัวอักษร */
  padding: 8px; /* ลดขนาด padding ใน select */
  border: none;
  outline: none;
  background-color: #ffffff;
  text-align: center; /* จัดข้อความใน select ให้ตรงกลาง */
  height: 35px; /* ลดความสูง */
  display: inline-block;
  border-radius: 5px;
  width: 100%;
  color: rgb(1, 1, 1);
}

option {
  text-align: center; /* จัดข้อความใน option ให้ตรงกลาง */
}

</style>
