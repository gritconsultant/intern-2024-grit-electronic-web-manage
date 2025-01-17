<template>
  <div>
    <div class="relative group flex justify-center   ">
      <div
        class="flex  p-[2px] gap-2  w-[150px] "
      >
        <div class="flex justify-center items-center gap-[2px] font-bold text-[14px] pt-[3px] w-full h-[30px] ">
          {{selectedStatus.status }}
          <i class="fa-solid fa-caret-down text-[12px] pt-[5px]"></i>
        </div>
      </div>
      <!-- Dropdown manu -->
      <div
        class="absolute bg-white rounded-lg border shadow w-[150px] z-10 hidden group-hover:block mt-[30px]"
      >
        <ul class="py-2 text-sm text-gray-700">
          <li class="block px-4 py-2 hover:bg-gray-100"
          v-for="(status, data) in statusorders" :key="data"
           @click="selectStatus(status)"
          >{{  status.status  }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { StatusOrder } from '~/models/order.model';



// สร้างตัวแปรสำหรับหมวดหมู่ที่เลือก
const selectedStatus = ref<StatusOrder>({
  id: 1,
  status: 'StatusOrder'
});

const statusorders = ref<StatusOrder[]>([
  {
    id: 1,
    status: 'StatusOrder'
  },
  {
    id: 2,
    status: 'Pending'
  },
  {
    id: 3,
    status: 'Confirmed'
  },
  {
    id: 4,
    status: 'Delivered'
  }
]);

// ฟังก์ชันเพื่อเลือกหมวดหมู่
const selectStatus = (status: StatusOrder) => {
  selectedStatus.value = status;
};


</script>



<style>

</style>