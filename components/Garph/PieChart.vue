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

    const salesValues = Object.values(props.salesData);
    const salesLabels = Object.keys(props.salesData);

    // เปลี่ยนค่าที่เป็น 0 เป็น 1 เพื่อให้แสดงในกราฟ
    const chartData = salesValues.map((value) => (value === 0 ? 5 : value));

    // สร้างสีสำหรับแต่ละหมวดหมู่
    const chartColors = generateColors(salesLabels.length);

    // ตรวจสอบว่ามีข้อมูลที่เป็น 0 หรือไม่
    const allZero = salesValues.every((value) => value === 0);

    // สร้างกราฟ
    chartInstance = new ChartJS(chartCanvas.value, {
      type: "doughnut",
      data: {
        labels: salesLabels,
        datasets: [
          {
            label: "ยอดขาย",
            data: allZero ? [1] : chartData, // ถ้ามีแต่ 0 ให้ใส่แค่ 1 เพื่อให้แสดงกราฟ
            backgroundColor: allZero ? ["#d3d3d3"] : chartColors, // ใช้สีเทา ถ้ามีแต่ 0
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "50%",
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || "";
                const value = props.salesData[label] ?? 0;
                // ถ้าค่าเป็น 0 จะแสดงว่า "ไม่มีข้อมูล" ใน tooltip
                return value === 0
                  ? `${label}: ไม่มีข้อมูล`
                  : `${label}: ${value}`;
              },
            },
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
