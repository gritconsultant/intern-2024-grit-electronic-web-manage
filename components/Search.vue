<template>
  <div class="flex justify-center " >
      <!-- Search -->
      <div class="w-[100%]">
        <div
          class="flex justify-center items-center rounded-[100px] h-[40px] hover:bg-[#F68D44]  hover:text-[#FFD700] w-[50px] absolute cursor-pointer"
        >
          <i class="fa-solid fa-magnifying-glass text-[20px]"></i>
        </div>
        <input
          type="search "
          class="w-[100%] h-[40px] rounded-full ml-[1px] pl-[50px] pr-[20px] outline-none border-[1px] border-orange-400  focus:ring-1 focus:ring-orange-600 "
          placeholder="พิมชื่อสิ่งที่ต้องการค้นหา"
        />
      </div>
    </div>
</template>

<script setup lang="ts">

defineProps({
  modelValue: String,
}); 
</script>

<style scoped></style>
