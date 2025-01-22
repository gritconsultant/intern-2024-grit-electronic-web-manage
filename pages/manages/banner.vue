<template>
  <div class="defaultpages flex flex-col gap-4 p-4">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">แบนเนอร์</h1>
    </div>
    <div class="bg-gray-100 w-full h-full p-5">
      <!-- แสดงรูปภาพในตาราง -->
      <div class="overflow-x-auto">
        <table
          class="min-w-full table-auto bg-white border border-gray-200 rounded-lg shadow-md"
        >
          <thead>
            <tr class="bg-gray-50">
              <th class="px-4 py-2 text-left font-semibold text-gray-900">#</th>
              <th
                class="px-4 py-2 text-left font-semibold w-[80%] text-gray-900"
              >
                รูปภาพ
              </th>
              <th class="px-4 py-2 text-left font-semibold text-gray-900">
                จัดการ
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(url, index) in confirmedImageUrls" :key="index" class="border-b">
              <td class="px-4 py-2">{{ index + 1 }}</td>
              <!-- แสดงลำดับที่ -->
              <td class="px-4 py-2 flex items-center justify-center">
                <img
                  :src="url"
                  alt="Preview"
                  class="w-[90%] h-[200px] object-cover rounded-md"
                />
              </td>
              <td class="px-4 py-2">
                <button
                  @click="() => removeConfirmedImage(index)"
                  class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  ลบ
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Input file -->
      <div class="flex flex-col items-start mt-4">
        <label
          for="fileInput"
          class="px-4 py-2 bg-orange-500 font-semibold rounded-md hover:bg-orange-700 hover:text-white transition cursor-pointer"
        >
          เพิ่มรูปภาพ
        </label>
        <input
          id="fileInput"
          type="file"
          ref="fileInput"
          @change="onFileChange"
          accept="image/*"
          multiple
          class="hidden"
        />
      </div>

      <!-- แสดงรูปภาพที่อัปโหลดใหม่ -->
      <div v-if="imageUrls.length" class="mt-4">
        <h2 class="text-lg font-bold">รูปภาพที่อัปโหลดใหม่</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          <div v-for="(url, index) in imageUrls" :key="index" class="relative">
            <img
              :src="url"
              alt="Preview"
              class="w-full h-[150px] object-cover rounded-md"
            />
            <button
              @click="() => removeImage(index)"
              class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded-md hover:bg-red-600 transition"
            >
              ลบ
            </button>
          </div>
        </div>
      </div>

      <!-- ปุ่มยืนยัน -->
      <div class="flex justify-end mt-4">
        <button
          @click="confirmImages"
          :disabled="!imageUrls.length"
          class="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          ยืนยันการบันทึก
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// ใช้ ref เพื่อเก็บ URL ของรูปภาพที่ยืนยันแล้วและรูปภาพที่อัปโหลดใหม่
const confirmedImageUrls = ref<string[]>([]);
const imageUrls = ref<string[]>([]);

// ใช้ ref สำหรับ input file
const fileInput = ref<HTMLInputElement | null>(null);

// ฟังก์ชันจัดการเมื่อมีการเลือกไฟล์
const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files; // รับไฟล์ที่เลือก

  if (files) {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        // เพิ่ม URL ของรูปภาพที่อัปโหลดไปยังอาร์เรย์
        imageUrls.value.push(e.target?.result as string);
      };
      reader.readAsDataURL(file); // อ่านไฟล์
    });
  }
};

// ฟังก์ชันลบรูปภาพใหม่
const removeImage = (index: number) => imageUrls.value.splice(index, 1); // ลบรูปภาพที่ตำแหน่งที่กำหนด

// ฟังก์ชันลบรูปภาพที่ยืนยันแล้ว
const removeConfirmedImage = (index: number) => confirmedImageUrls.value.splice(index, 1);

// ฟังก์ชันยืนยันรูปภาพใหม่
const confirmImages = () => {
  // ย้ายรูปภาพจาก imageUrls ไปยัง confirmedImageUrls
  confirmedImageUrls.value = [...imageUrls.value, ...confirmedImageUrls.value];
  imageUrls.value = []; // ล้างรูปภาพใหม่หลังยืนยัน
  alert("บันทึกรูปภาพสำเร็จ!");
};
</script>

<style scoped>
/* ทำให้ input type="file" ซ่อน */
input[type="file"] {
  display: none;
}
</style>
