<template>
  <div class="flex justify-center items-center w-full h-[400px] rounded-lg p-4 bg-white drop-shadow-md">
    <div class="w-[950px] h-[350px]">
      <!-- Select dropdown to choose the period (Day, Month, Year) -->
      <div class="mb-4 flex justify-center">
        <select v-model="selectedPeriod" @change="updateChartData" class="border p-2 rounded-md">
          <option value="day">Day</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>

      <!-- Canvas for Chart.js -->
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// ลงทะเบียนโมดูล
ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

// Props รับข้อมูลที่กรองแล้ว
const props = defineProps<{
  salesData: Record<string, { label: string[]; value: number[] }>; // ออกแบบให้รับข้อมูลแบบนี้
}>();

// Reference ของ Canvas
const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: ChartJS | null = null;

// State สำหรับเลือกช่วงเวลา
const selectedPeriod = ref("day");

// ข้อมูล Labels สำหรับแต่ละช่วงเวลา
const labels = {
  day: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  year: ['2019', '2020', '2021', '2022', '2023'],
};

// ฟังก์ชันอัปเดตข้อมูลกราฟ
const updateChartData = () => {
  // เลือกข้อมูลจาก props.salesData ตามช่วงเวลา
  const data = props.salesData[selectedPeriod.value]?.value;
  const label = props.salesData[selectedPeriod.value]?.label;

  if (!data || !label) {
    console.error('No data found for the selected period:', selectedPeriod.value);
    return;
  }

  // ลบกราฟเก่าก่อนที่จะสร้างใหม่
  if (chartInstance) {
    chartInstance.destroy();
  }

  // สร้างกราฟใหม่
  chartInstance = new ChartJS(chartCanvas.value!, {
    type: 'bar', // กราฟแท่ง
    data: {
      labels: label,
      datasets: [{
        label: 'Sales Data',
        data: data,
        backgroundColor: '#4CAF50',
        borderColor: '#388E3C',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.7)',
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
          title: {
            display: true,
            text: selectedPeriod.value === 'day' ? 'Hour' : selectedPeriod.value === 'month' ? 'Month' : 'Year',
          },
          grid: {
            color: '#E5E7EB',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Sales Count',
          },
          ticks: {
            autoSkip: true,
            font: {
              size: 14,
            },
            color: '#374151',
          },
          grid: {
            color: '#E5E7EB',
          },
        },
      },
    },
  });
};

// สร้างกราฟเมื่อ Mounted
onMounted(() => {
  updateChartData(); // เรียกฟังก์ชันเพื่อสร้างกราฟตอนที่เริ่ม
});

// อัปเดตกราฟเมื่อมีการเปลี่ยนแปลงช่วงเวลา
watch(() => selectedPeriod.value, updateChartData);
</script>

<style scoped>
/* เพิ่มการปรับแต่งสไตล์ */
.drop-shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.rounded-lg {
  border-radius: 12px;
}

select {
  padding: 8px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  background-color: #f8fafc;
}

select:focus {
  border-color: #4CAF50;
}
</style>
