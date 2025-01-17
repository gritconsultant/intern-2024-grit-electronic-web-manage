<template>
  <div>
    <div class="relative group flex justify-center  border-r-2 ">
      <div
        class="flex  p-[2px] gap-2  w-[150px]  "
      >
        <div class="flex justify-center items-center gap-[3px] font-bold text-[14px] pt-[3px] w-full h-[30px] ">
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
          v-for="(status, data) in statuspayment" :key="data"
           @click="selectStatus(status)"
          >{{  status.status  }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { PaymentStatus } from '~/models/order.model';


// สร้างตัวแปรสำหรับหมวดหมู่ที่เลือก
const selectedStatus = ref<PaymentStatus>({
  id: 1,
  status: 'PaymentStatus'
});

const statuspayment = ref<PaymentStatus[]>([
  {
    id: 1,
    status: 'PaymentStatus'
  },
  {
    id: 2,
    status: 'Pending'
  },
  {
    id: 3,
    status: 'Paid'
  },
  {
    id: 4,
    status: 'Failed'
  }
]);

// ฟังก์ชันเพื่อเลือกหมวดหมู่
const selectStatus = (status: PaymentStatus) => {
  selectedStatus.value = status;
};


</script>



<style>

</style>