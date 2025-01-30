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
          v-model="category.name"
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
            v-if="category.imageCategory"
            :src="category.imageCategory"
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
import Swal from "sweetalert2";
import type { CategoryCreate, CategoryRes } from "~/models/product.model";
import service from "~/service";

const category = ref<CategoryCreate>({
  name: "",
  is_active: true,
  imageCategory: "",
});

const categoryRes = ref<CategoryRes>({
  id: 0,
  name: "",
  is_active: true,
  imageCategory: "",
});

const addCategory = async () => {
  await service.product
    .createCategory(category.value)
    .then((resp: any) => {
      console.log(resp.data);
      const data = resp.data;
      if (data) {
        Swal.fire({
          title: "เพิ่มสินค้าสำเร็จ",
          text: "เพิ่มสินค้า",
          icon: "success",
        }).then(() => {
          emit("close"); // ปิดฟอร์มหลังจากแสดงสำเร็จ
        });
      }

      const category: CategoryRes = {
        id: data.id,
        name: data.name,
        is_active: data.is_active,
        imageCategory: data.imageCategory,
      };
      categoryRes.value = category;
    })
    .catch((err: any) => {
      if (err.response?.data?.message === "category already exists") {
        Swal.fire({
          title: "ข้อผิดพลาด",
          text: "ชื่อประเภทสินค้านี้มีอยู่แล้ว กรุณาใช้ชื่ออื่น",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      } else {
        console.error(err);
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถเพิ่มประเภทสินค้าได้",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      }
    })
    .finally(() => {});
};

const confirm = () => {
  if (category.value.name.trim() === "") {
    Swal.fire({
      title: "ข้อผิดพลาด",
      text: "กรุณากรอกชื่อประเภทสินค้า",
      icon: "error",
      confirmButtonText: "ตกลง",
    });
    return;
  }
  if (!category.value.imageCategory) {
    Swal.fire({
      title: "ข้อผิดพลาด",
      text: "กรุณาอัพโหลดรูปภาพ",
      icon: "error",
      confirmButtonText: "ตกลง",
    });
    return;
  }

  Swal.fire({
    title: "คุณยืนยันการเพิ่มประเภทหรือไม่?",
    text: "คุณต้องการยืนยันการเพิ่มประเภทสินค้านี้หรือไม่?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await addCategory();
    }
  });
  emit("close");
};

const emit = defineEmits(["close", "addCategory"]);

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
      console.log("Emit close");
      emit("close"); // ส่งอีเวนต์เพื่อปิดฟอร์ม
    }
  });
};

// เพิ่มอีเวนต์ emit

const imageUrl = ref<string | null>(null);

const fileInput = ref<HTMLInputElement | null>(null);

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      // เก็บ URL ของภาพลงใน category.value.imageCategory
      category.value.imageCategory = e.target?.result as string;
      // ตั้งค่า imageUrl ด้วย URL ของไฟล์
      imageUrl.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const clearImage = () => {
  // ตั้งค่า imageUrl และ imageCategory ให้เป็น null หรือค่าว่าง
  imageUrl.value = null;
  category.value.imageCategory = ""; // ทำให้ตัวแปร imageCategory เป็นค่าว่าง
  if (fileInput.value) {
    fileInput.value.value = ""; // เคลียร์ค่าของ input file
  }
};
</script>

<style></style>
