<template>
  <div v-if="isClient">
    <!-- คอมโพเนนต์ที่ต้องเรนเดอร์หลังจากโหลดข้อมูลจากไคลเอนต์ -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isClient = ref(false);

onMounted(() => {
  isClient.value = true;  // ตั้งค่าหลังจากคอมโพเนนต์ถูก mount
});
</script>
