<template>
  <div>
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
          },
        ],
      },
    });
  }
});
</script>

<style scoped>
canvas {
  display: block;
  max-width: 100%;
  max-height: 100%;
}
</style>
