<template>
  <div class="flex justify-between items-center mt-5">
    <div class="text-sm text-gray-600">
      แสดง {{ (currentPage - 1) * pageSize + 1 }} ถึง
      {{ Math.min(currentPage * pageSize, totalItems) }}
      จากทั้งหมด {{ totalItems }} รายการ
    </div>
    <div class="flex gap-2">
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-3 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        ก่อนหน้า
      </button>

      <span class="flex items-center px-2">หน้า {{ currentPage }}</span>

      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage * pageSize >= totalItems"
        class="px-3 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        ถัดไป
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  currentPage: Number,
  totalItems: Number,
  pageSize: Number,
});

const emit = defineEmits(["pageChange"]);

const changePage = (newPage: number) => {
  if (newPage >= 1 && (newPage - 1) * props.pageSize < props.totalItems) {
    emit("pageChange", newPage); // ส่งค่าไปยังคอมโพเนนต์หลัก
  }
};
</script>
