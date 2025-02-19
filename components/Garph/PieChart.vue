<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script lang="ts" setup>
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
const selectedMonth = ref(""); // Initially empty, will be set to selected month
const months = ref([
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
]);

// Set the current month as default selected
const getCurrentMonth = () => {
  const monthsInThai = months.value;
  const currentMonthIndex = new Date().getMonth(); // 0 = มกราคม, 1 = กุมภาพันธ์, ...
  return monthsInThai[currentMonthIndex];
};

selectedMonth.value = getCurrentMonth();

// Chart data
let chartInstance: ChartJS | null = null;


onMounted(() => {
  if (chartCanvas.value) {
    chartCanvas.value.width = 500;
    chartCanvas.value.height = 500;

    // ฟังก์ชันสำหรับสร้างสี
    const generateColors = (count: number) => {
      const colors = [];
      const baseColors = [
        "#EF4444",
        "#3B82F6",
        "#FBBF24",
        "#10B981",
        "#8B5CF6",
        "#F472B6",
        "#6B7280",
        "#9333EA",
        "#F59E0B",
        "#34D399",
      ];

      for (let i = 0; i < count; i++) {
        colors.push(baseColors[i % baseColors.length]);
      }
      return colors;
    };

    const salesDataCount = Object.keys(props.salesData).length;

    // ถ้าไม่มีข้อมูล
    if (salesDataCount === 0) {
      chartInstance = new ChartJS(chartCanvas.value, {
        type: "doughnut",
        data: {
          labels: ["ไม่มีข้อมูล"], // ใช้ข้อความแสดงว่าไม่มีข้อมูล
          datasets: [
            {
              label: "ยอดขาย",
              data: [1], // ใส่ข้อมูลขั้นต่ำ เพื่อให้แสดงกราฟเป็นวง
              backgroundColor: ["#d3d3d3"], // สีเทา
              hoverOffset: 10,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "50%",
        },
      });
    } else {
      // กรณีมีข้อมูล
      const chartColors = generateColors(salesDataCount);
      chartInstance = new ChartJS(chartCanvas.value, {
        type: "doughnut",
        data: {
          labels: Object.keys(props.salesData),
          datasets: [
            {
              label: "ยอดขาย",
              data: Object.values(props.salesData),
              backgroundColor: chartColors,
              hoverOffset: 10,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "50%",
        },
      });
    }
  }
});


</script>

<style scoped>
.chart-container {
  position: relative;
  width: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 50px;
  height: 650px;
}

canvas {
  width: 100%;
  height: auto;
  max-width: 500px;
  z-index: 1;
}

</style>
