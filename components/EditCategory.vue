<template>
  <div
    v-if="props.showAddCategory"
    class="bg-white shadow-md rounded-lg p-8 h-[650px] max-w-3xl mx-auto dropshadowboxabsolute"
  >
    <div class="flex items-center justify-between mb-10">
      <h1 class="text-4xl font-bold text-gray-800">{{ formTitle }}</h1>
    </div>
    <div class="flex flex-col gap-6">
      <!-- ชื่อประเภทสินค้า -->
      <div class="flex flex-col gap-2">
        <label for="category-name" class="text-lg font-medium text-gray-700">ชื่อประเภทสินค้า</label>
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
          <label for="upload-file" class="text-lg font-medium text-gray-700">อัพโหลดรูปภาพ</label>
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
        <div class="flex justify-center items-center w-64 h-64 border-2 border-dashed border-gray-300 rounded-md overflow-hidden">
          <img
            v-if="imageUrl && imageUrl !== ''"
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
          @click="confirmUpdate"
          class="px-6 py-3 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition"
        >
          ยืนยัน
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, defineProps, watch } from 'vue';
import Swal from 'sweetalert2';

// รับค่า props จาก parent
const props = defineProps({
  showAddCategory: { type: Boolean, required: true },
  category: {
    type: Object as () => { name: string; image: string } | null,
    default: null,
  },
});

const emit = defineEmits(["close", "updateCategory"]);

// สถานะต่างๆ ที่ใช้ในการเพิ่มและแก้ไข
const categoryName = ref<string>(props.category?.name || "");
const imageUrl = ref<string>(props.category?.image || "");
const fileInput = ref<HTMLInputElement | null>(null);

// สำหรับการตั้งชื่อฟอร์มให้แสดงผลตามสถานะ
const formTitle = props.category ? 'แก้ไขประเภทสินค้า' : 'เพิ่มประเภทสินค้า';

// ตรวจสอบการเปลี่ยนแปลงรูปภาพ
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

// ลบรูปภาพ
const clearImage = () => {
  imageUrl.value = ""; // เปลี่ยนจาก null เป็นค่าว่าง
  if (fileInput.value) {
    fileInput.value.value = ""; // รีเซ็ต input file
  }
};

// ฟังก์ชันยืนยันการยกเลิก
const confirmCancel = () => {
  Swal.fire({
    title: "คุณแน่ใจหรือไม่?",
    text: "คุณต้องการยกเลิกการเพิ่ม/แก้ไขประเภทสินค้านี้หรือไม่?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    if (result.isConfirmed) {
      emit("close");
    }
  });
};

// ฟังก์ชันยืนยันการอัปเดต
const confirmUpdate = () => {
  if (!categoryName.value.trim()) {
    Swal.fire({
      title: "ข้อผิดพลาด",
      text: "กรุณากรอกชื่อประเภทสินค้า",
      icon: "error",
      confirmButtonText: "ตกลง",
    });
    return;
  }

  if (!imageUrl.value || imageUrl.value.trim() === "") {
    Swal.fire({
      title: "ข้อผิดพลาด",
      text: "กรุณาอัพโหลดรูปภาพ",
      icon: "error",
      confirmButtonText: "ตกลง",
    });
    return;
  }

  Swal.fire({
    title: props.category ? "ยืนยันการแก้ไขประเภทสินค้า?" : "ยืนยันการเพิ่มประเภทสินค้า?",
    text: props.category ? "คุณต้องการอัปเดตข้อมูลประเภทสินค้านี้หรือไม่?" : "คุณต้องการเพิ่มข้อมูลประเภทสินค้านี้หรือไม่?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    if (result.isConfirmed) {
      emit("updateCategory", {
        name: categoryName.value,
        image: imageUrl.value,
      });
      emit("close");
    }
  });
};

// ตรวจสอบการเปลี่ยนแปลงของ props หากเป็นการแก้ไข
watch(() => props.category, (newCategory) => {
  if (newCategory) {
    categoryName.value = newCategory.name;
    imageUrl.value = newCategory.image;
  }
});
</script>

<style scoped>
/* Add styles if necessary */
</style>
