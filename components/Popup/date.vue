<template>
  <div class="w-[400px] h-[50px]">
    <label for="date-input" class="absolute text-[10px] font-bold ml-[10px]"
      >เลือกช่วงเวลา</label
    >
    <div class="pt-[12px] flex gap-2">
      <div class="w-[45%]">
        <!-- Date Picker Wrapper -->
        <div class="relative flex items-center bg-[#F68D44] rounded-full">
          <!-- Calendar Icon -->
          <button
            @click="openDatePicker "
            type="button"
            class="flex justify-center items-center w-[40px] h-[30px] cursor-pointer"
          >
            <i
              class="fa-solid fa-calendar-days text-[#712900] text-[18px] pt-[5px]"
            ></i>
          </button>

          <!-- Hidden Date Input -->
          <input
            ref="dateInput"
            type="date"
            id="date-input"
            v-model="selectedDate"
            class="hidden z-10 absolute ml-[200px]"
          />
          <!-- Display selected date -->
          <p class="mt-2 text-[12px] text-center text-[#712900] font-bold">
            วันที่: {{ displayDate || "ยังไม่ได้เลือกวันที่" }}
          </p>
        </div>
      </div>
      <div class="mt-[6px] text-center ">ถึง</div>
      <div class="w-[45%]">
        <!-- Date Picker Wrapper -->
        <div class="relative flex justify-end items-center bg-[#F68D44] rounded-full">
          <!-- Hidden Date Input -->
          <input
            ref="dateInput"
            type="date"
            id="date-input"
            v-model="selectedDate"
            class="hidden"
          />
          <!-- Display selected date -->
          <p class="mt-2 text-[12px] text-center text-[#712900] font-bold">
            วันที่: {{ displayDate || "ยังไม่ได้เลือกวันที่" }}
          </p>
           <!-- Calendar Icon -->
           <button
            @click="openDatePicker"
            type="button"
            class="flex justify-center items-center w-[40px] h-[30px] cursor-pointer"
          >
            <i
              class="fa-solid fa-calendar-days text-[#712900] text-[18px] pt-[5px]"
            ></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
// ตัวแปรเก็บวันที่ที่เลือก
const selectedDate = ref("");

// อ้างอิงถึง input
const dateInput = ref<HTMLInputElement | null>(null);
   
// ฟังก์ชันเปิด Date Picker
const openDatePicker = () => {
  if (dateInput.value) {
    dateInput.value.showPicker(); // เปิด input[type="date"] เมื่อคลิกไอคอน
  }
};

// แปลงวันที่ให้อยู่ในรูปแบบที่อ่านง่าย
const displayDate = computed(() =>
  selectedDate.value
    ? new Date(selectedDate.value).toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : ""
);
</script>

<style>
/* ซ่อนไอคอนปฏิทินใน input type="date" */
input[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
}
</style>
