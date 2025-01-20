<template>
  <div class="flex justify-center " >
      <!-- Search -->
      <div class="w-[100%]">
        <div
          class="flex justify-center items-center rounded-[100px] h-[40px] hover:bg-[#7A4711] hover:text-[#FFD700] w-[50px] absolute cursor-pointer"
        >
          <i class="fa-solid fa-magnifying-glass text-[20px]"></i>
        </div>
        <input
          type="search "
          class="w-[100%] h-[40px] rounded-[5px] ml-[1px] pl-[60px] pr-[20px] border-none outline-none bg-[#7A4711]/50 text-white placeholder-white"
          placeholder="พิมชื่อสิ่งที่ต้องการค้นหา"
        />
      </div>
    </div>
</template>

<script setup lang="ts">


const listorder = async () => {
  
}
</script>

<style scoped></style>
