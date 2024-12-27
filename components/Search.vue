<template>
  <div class="w-2/4">
    <div class="flex justify-between gap-5 h-[60px]">
      <div class="bg-white w-full rounded-[50px] relative pl-[1px]">
        <div
          class="flex items-center justify-center rounded-[100px] border-2 bg-[#765798]/20 hover:bg-[#765798]/50 h-full w-[60px] absolute cursor-pointer"
        >
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <input
          class="w-full pl-[70PX] pr-[10px] rounded-[50px] h-full border-none outline-none"
          type="search"
          key="name"
          placeholder="ค้นหารายการสินค้าที่ต้องการ"
        />
      </div>
       <!-- warn -->
       <div class="flex items-center pt-[2px]">
          <i class="fa-solid fa-bell text-yellow-400 text-3xl"></i>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>
