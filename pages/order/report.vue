<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <!-- Header -->
    <div class="bg-white p-6 rounded-lg shadow-md mb-6">
      <h1 class="text-3xl font-semibold text-gray-700">รายงานการขาย</h1>
      <p class="text-gray-500 mt-2">กราฟเปรียบเทียบยอดขายสินค้า 5 ประเภท</p>
    </div>

    <!-- Chart Container -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <!-- Use ref to bind the canvas element -->
      <canvas ref="salesChart" width="400" height="200"></canvas>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

// Register Chart.js components
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

// Create a reference for the canvas
const salesChart = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  // Ensure canvas element is available
  if (!salesChart.value) {
    console.error('Canvas element not found');
    return;
  }

  // Get context of the canvas
  const ctx = salesChart.value.getContext('2d'); // We now ensure it is the correct context (2d)
  if (!ctx) {
    console.error('Unable to get 2d context for the canvas');
    return;
  }

  const labels = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม'];
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'เครื่องดื่ม',
        data: [120, 150, 170, 140, 160],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
      {
        label: 'ขนมขบเคี้ยว',
        data: [100, 110, 130, 125, 140],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
      },
      {
        label: 'ผลไม้สด',
        data: [90, 80, 100, 95, 110],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
      },
      {
        label: 'ผลิตภัณฑ์นม',
        data: [70, 60, 75, 80, 85],
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        tension: 0.4,
      },
      {
        label: 'สินค้าอื่น ๆ',
        data: [50, 65, 60, 70, 75],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'ยอดขายสินค้า 5 ประเภท',
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'เดือน',
          },
        },
        y: {
          title: {
            display: true,
            text: 'ยอดขาย (บาท)',
          },
        },
      },
    },
  };

  // Render the chart using the context of the canvas
  new Chart(ctx, config);
});
</script>

<style scoped>
/* Customize styles if needed */
</style>
