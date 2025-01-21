<template>
  <div class="defaultpages flex flex-col gap-2">
    <div class="flex items-center justify-between h-[5%] pl-[35px]">
      <h1 class="text-[25px] font-bold">ธนาคาร</h1>
    </div>
    <div class="w-full h-full p-5">
      <!-- Preview image -->
      <div class="flex justify-center items-center w-full h-[50%]">
        <!-- กรอบแสดงรูป -->
        <div
          class="bg-slate-50 dropshadowbottomsub w-[400px] h-[400px] rounded-[5px] flex justify-center items-center"
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            alt="Preview"
            class="w-[400px] h-[400px] rounded-[5px] object-cover"
          />
          <span v-else class="text-gray-500">ไม่มีรูปที่เลือก</span>
        </div>
        <!-- Input file -->
        <div class="flex items-end h-full">
          <div class="flex flex-col pl-8">
            <!-- ปุ่มรีเซ็ตรูป -->
            <button
              v-if="imageUrl"
              @click="clearImage"
              class="mb-2 px-4 py-2 w-[100px] bg-red-500 text-white rounded-[5px] hover:bg-red-600"
            >
              ลบรูปภาพ
            </button>
            <input
              type="file"
              ref="fileInput"
              @change="onFileChange"
              accept="image/*"
            />
          </div>
        </div>
      </div>
      <div class="text-[20px] font-bold mt-2 flex justify-center pr-[330px]">
        คิวอาร์โค้ด
      </div>
      <div
        class="w-full h-[45%] p-8 px-[100px] flex flex-col gap-16 items-center"
      >
        <div class="w-[72%]">
          <div class="flex flex-col gap-2">
            <div class="flex gap-8">
              <span class="text-[20px] font-bold pl-[57px]">ชื่อธนาคาร</span>
              <div>-------------------------------</div>
            </div>
            <input
              type="text"
              class="bg-white dropshadowbottomsub w-[350px] ml-[180px] rounded-[5px] px-2"
            />
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex gap-8">
              <span class="text-[20px] font-bold">หมายเลขธนาคาร</span>
              <div>-------------------------------</div>
            </div>
            <input
              type="text"
              class="bg-white dropshadowbottomsub w-[350px] ml-[180px] rounded-[5px] px-2"
            />
          </div>
        </div>
        <div class="flex justify-center mr-[310px] gap-28">
            <button
              class="border-2 p-2 rounded-[5px] font-semibold text-white bg-red-500"
            >
              ยกเลิก
            </button>
          <button class="border-2 p-2 rounded-[5px] font-semibold bg-green-500">
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// ใช้ ref เพื่อเก็บ URL ของรูปภาพ
const imageUrl = ref<string | null>(null);

// ใช้ ref สำหรับ input file
const fileInput = ref<HTMLInputElement | null>(null);

// ฟังก์ชันจัดการเมื่อมีการเลือกไฟล์
const onFileChange = (event: Event) => {
  // ตรวจสอบว่า target เป็น HTMLInputElement
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0]; // รับไฟล์ที่เลือก (ตรวจสอบว่า files ไม่ใช่ null)

  if (file) {
    const reader = new FileReader();

    // อ่านไฟล์และแปลงเป็น Data URL
    reader.onload = (e) => {
      imageUrl.value = e.target?.result as string; // แปลงผลลัพธ์เป็น string
    };

    reader.readAsDataURL(file); // อ่านไฟล์
  }
};

// ฟังก์ชันลบรูปภาพ
const clearImage = () => {
  imageUrl.value = null; // รีเซ็ต URL ของรูปภาพ

  // รีเซ็ต input file
  if (fileInput.value) {
    fileInput.value.value = ""; // รีเซ็ตค่า value ของ input
  }
};
</script>

<style scoped></style>
