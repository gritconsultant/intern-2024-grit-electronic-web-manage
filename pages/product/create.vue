<template>
  <div class="pages h-full">
    <!-- ข้อมูลทั่วไปและปุ่ม -->
    <div class="flex gap-5">
      <!-- photo -->
      <div
        class="p-2 bg-[#F7F1FD]/30 w-[200px] h-[440px] rounded-[28px] flex flex-col gap-2"
      >
        <img src="" alt="" class="photo h-[100px] bg-white/50" />

        <form
          action="/upload"
          method="POST"
          enctype="multipart/form-data"
          class="bg-white h-[100px] photo text-center place-content-center rounded-[20px]"
        >
          <!-- ซ่อน input file จริงๆ -->
          <input
            type="file"
            name="files[]"
            id="fileInput"
            style="display: none"
            multiple
          />
          <!-- ปุ่มที่เป็นไอคอน -->
          <label for="fileInput" class="cursor-pointe]">
            <i class="fa-solid fa-plus text-5xl"></i>
          </label>
        </form>
      </div>
      <div class="w-full p-2 px-5 flex flex-col gap-5">
        <div class="flex gap-5 w-full bg-slate-400">
          <div class="flex flex-col gap-5 w-full">
            <h1 class="header flex">
              ชื่อ
              <input
                type="text"
                class="px-2 ml-[42px] bg-transparent border-none outline-none"
                maxlength="50"
              />
            </h1>
            <h1 class="subheader flex">
              ประเภท
              <input
                type="text"
                class="px-2 ml-[8px] bg-transparent border-none outline-none"
              />
            </h1>
            <span class="flex gap-2"
              ><h1 class="subheader">ราคา</h1>
              <input
                type="text"
                class="px-2 ml-[20px] bg-transparent border-none outline-none"
                maxlength="8"
            /></span>
          </div>
          <div
            class="flex flex-col items-center bg-[#F7F1FD]/60 rounded-[20px] p-2 w-full font-bold"
          >
            เพิ่มจำนวนสินค้า
            <div class="h-full w-full flex items-center justify-center">
              <input
                type="text"
                class="font-bold text-5xl text-[#765798] text-center bg-transparent border-none outline-none w-[250px] h-[150px]"
                maxlength="8"
                placeholder="จำนวน"
              />
            </div>
          </div>
        </div>
        <!-- detail -->
        <div class="bg-[#F7F1FD]/60 rounded-[20px] p-5 flex flex-col gap-2">
          <h1 class="header">รายละเอียดสินค้า (จำนวนตัวอักษร)</h1>
          <div class="w-full">
            <textarea
              name=""
              id=""
              type="text"
              class="text-lg h-fill text-wrap truncate p-5 bg-[#F7F1FD]/40 rounded-[26px] w-full"
              placeholder="รายละเอียดสินค่า ไม่เกิน 5000 ตัวอักษร"
              maxlength="5000"
            ></textarea>
          </div>
        </div>
      </div>
    </div>

    <hr class="my-[20px]" />
    <div class="p-2 px-5 flex justify-center items-center gap-20 w-full">
      <NuxtLink
        to="/product"
        class="text-center p-2 bg-[#F11317] w-[100px] font-bold text-white rounded-[20px] drop-shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#ab2a2c]"
        >กลับ</NuxtLink
      >
      <NuxtLink
        to=""
        class="text-center p-2 bg-[#37EBBE] w-[100px] font-bold rounded-[20px] drop-shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#31cca5]"
        >ยืนยัน</NuxtLink
      >
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
