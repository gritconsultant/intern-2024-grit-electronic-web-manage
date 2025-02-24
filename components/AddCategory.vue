<template>
  <div
    class="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center"
  >
    <div
      class="bg-white shadow-md rounded-lg p-8 h-[700px] w-[800px] max-w-3xl mx-auto dropshadowboxabsolute"
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
            class="rounded-md border-gray-300 w-full p-3 text-gray-700 dropshadowboxsub"
            placeholder="กรอกชื่อประเภทสินค้า"
          />
        </div>

        <!-- อัพโหลดไฟล์และแสดงภาพ -->
        <div class="flex flex-col gap-4 items-center justify-between h-[350px]">
          <div class="flex flex-col items-start gap-2 w-full">
            <label for="image-url" class="text-lg font-medium text-gray-700"
              >อัพโหลดรูปภาพ</label
            >
            <div class="flex items-end h-full w-full">
              <div class="flex flex-col gap-5 w-full">
                <input
                  type="text"
                  id="image-url"
                  v-model="category.image"
                  placeholder="กรอก URL รูปภาพ"
                  class="w-full rounded-lg p-3 pl-3 text-gray-700 dropshadowboxsub"
                />
              </div>
            </div>
          </div>
          <div
            class="flex justify-center items-center w-64 h-64 border-2 border-dashed border-gray-300 rounded-md overflow-hidden"
          >
            <img
              v-if="category.image"
              :src="category.image"
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
  </div>
</template>

<script lang="ts" setup>
import Swal from "sweetalert2";
import type { CategoryCreate, CategoryRes } from "~/models/product.model";
import service from "~/service";

const category = ref<CategoryCreate>({
  name: "",
  is_active: true,
  image: "",
});

const categoryRes = ref<CategoryRes>({
  id: 0,
  name: "",
  is_active: true,
  image: "",
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
        image: data.image,
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
      text: "กรุณากรอกชื่อประเภทสินค้าและ URL รูปภาพก่อนบันทึก",
      icon: "error",
      confirmButtonText: "ตกลง",
    });
    return;
  }
  if (!category.value.image) {
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
      await addCategory(); // เรียกฟังก์ชันสำหรับเพิ่มข้อมูลประเภท
      Swal.fire("สำเร็จ!", "ประเภทสินค้าได้ถูกเพิ่มแล้ว", "success").then(
        () => {
          window.location.reload(); // รีเฟรชหน้าหลังจากกด "ตกลง"
        }
      );
    }
  });

  emit("close"); // ปิดฟอร์ม
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
</script>

<style></style>
