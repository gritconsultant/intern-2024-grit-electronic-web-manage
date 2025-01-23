<template>
  <div
    class="bg-white shadow-md rounded-lg p-8 h-[650px] max-w-3xl mx-auto dropshadowboxabsolute"
  >
    <div class="flex items-center justify-between mb-10">
      <h1 class="text-4xl font-bold text-gray-800">เพิ่มประเภทสินค้า</h1>
    </div>
    <div class="flex flex-col gap-6">
      <!-- ชื่อประเภทสินค้า -->
      <div class="flex flex-col gap-2">
        <label for="category-name" class="text-lg font-medium text-gray-700"
          >ชื่อประเภทสินค้า</label
        >
        <input
          type="text"
          id="category-name"
          v-model="categoryName"
          class="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full p-3 text-gray-700"
          placeholder="กรอกชื่อประเภทสินค้า"
        />
      </div>

      <!-- อัพโหลดไฟล์และแสดงภาพ -->
      <div class="flex flex-col gap-4 md:flex-row items-center justify-between">
        <div class="flex flex-col items-start gap-2">
          <label for="upload-file" class="text-lg font-medium text-gray-700"
            >อัพโหลดรูปภาพ</label
          >
          <div class="flex items-end h-full">
            <div class="flex flex-col gap-5 pl-8">
              <input
                type="file"
                ref="fileInput"
                @change="onFileChange"
                accept="image/*"
                class="w-full md:w-64 file:rounded-md file:border-0 file:bg-blue-500 file:text-white file:px-4 file:py-2 file:cursor-pointer"
              />
              <button
                v-if="imageUrl"
                @click="clearImage"
                class="mb-2 px-4 py-2 w-[100px] bg-red-500 text-white rounded-[5px] hover:bg-red-600"
              >
                ลบรูปภาพ
              </button>
            </div>
          </div>
        </div>
        <div
          class="flex justify-center items-center w-64 h-64 border-2 border-dashed border-gray-300 rounded-md overflow-hidden"
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            alt="Preview"
            class="w-[400px] h-[400px] rounded-[5px] object-cover"
          />
          <span v-else class="text-gray-500">ไม่มีรูปที่เลือก</span>
        </div>
      </div>

      <!-- ปุ่มยืนยันและยกเลิก -->
      <div class="flex justify-center gap-6 mt-6">
        <button
          @click="confirmCancel"
          class="px-6 py-3 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 transition"
        >
          ยกเลิก
        </button>
        <button
          @click="confirm"
          class="px-6 py-3 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition"
        >
          ยืนยัน
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from "vue";
import Swal from "sweetalert2";

// เพิ่มอีเวนต์ emit
const emit = defineEmits(["close", "addCategory"]);

const imageUrl = ref<string | null>(null);
const categoryName = ref<string>("");

const fileInput = ref<HTMLInputElement | null>(null);

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageUrl.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const clearImage = () => {
  imageUrl.value = null;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const confirmCancel = () => {
  Swal.fire({
    title: "คุณแน่ใจหรือไม่?",
    text: "คุณต้องการยกเลิกการเพิ่มประเภทสินค้านี้หรือไม่?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    if (result.isConfirmed) {
      emit("close"); // ส่งอีเวนต์ปิดฟอร์ม
    }
  });
};

const confirm = () => {
  if (categoryName.value.trim() === "") {
    Swal.fire({
      title: "ข้อผิดพลาด",
      text: "กรุณากรอกชื่อประเภทสินค้า",
      icon: "error",
      confirmButtonText: "ตกลง",
    });
    return;
  }
  if (!imageUrl.value) {
    Swal.fire({
      title: "ข้อผิดพลาด",
      text: "กรุณาอัพโหลดรูปภาพ",
      icon: "error",
      confirmButtonText: "ตกลง",
    });
    return;
  }

  Swal.fire({
    title: "คุณแน่ใจหรือไม่?",
    text: "คุณต้องการยืนยันการเพิ่มประเภทสินค้านี้หรือไม่?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    if (result.isConfirmed) {
      // เพิ่ม console.log เพื่อดูว่าข้อมูลถูกต้องหรือไม่
      console.log("ส่งข้อมูลประเภทสินค้าไปยัง parent:", {
        name: categoryName.value,
        image: imageUrl.value,
      });
      emit("addCategory", { name: categoryName.value, image: imageUrl.value }); // ส่งข้อมูลประเภทสินค้า
      emit("close"); // ปิดฟอร์ม
    }
  });
};
</script>

<style></style>
