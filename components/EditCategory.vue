<template>
  <div
    class="bg-white shadow-md rounded-lg p-8 h-[650px] max-w-3xl mx-auto dropshadowboxabsolute"
  >
    <div class="flex items-center justify-between mb-10">
      <h1 class="text-4xl font-bold text-gray-800">แก้ไขประเภทสินค้า</h1>
    </div>
    <div class="flex flex-col gap-6">
      <!-- ชื่อประเภทสินค้า -->
      <div class="flex flex-col gap-2">
        <label for="category-name" class="text-lg font-medium text-gray-700">
          ชื่อประเภทสินค้า
        </label>
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
          <label for="upload-file" class="text-lg font-medium text-gray-700">
            อัพโหลดรูปภาพ
          </label>
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
                v-if="category.imageCategory"
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
          บันทึก
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Swal from "sweetalert2";
import type { CategoryUpdate, CategoryRes } from "~/models/product.model";
import service from "~/service";

const route = useRoute();

const category = ref<CategoryUpdate>({
  id: 0,
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

const emit = defineEmits(["close", "addCategory"]);

const props = defineProps({
  categoryId: {
    type: Number,
    required: true,
  },
});

const getCategoryById = async () => {
  console.log("categoryId from prop:", props.categoryId);
  console.log("Route Params ID:", route.params.id);
  const categoryId = props.categoryId || route.params.id;
  if (!categoryId) {
    console.error("Error: No category ID provided.");
    return;
  }
  await service.product
    .getCategoryById(categoryId)
    .then((resp: any) => {
      console.log(resp.data);
      const data = resp.data.data;
      if (data) {
        category.value = {
          id: data.id,
          name: data.name,
          is_active: data.is_active,
          imageCategory: data.imageCategory?.description || "",
        };
        if (category.value.imageCategory) {
          imageUrl.value = category.value.imageCategory;
        }
      }
    })
    .catch((err: any) => {
      console.log(err.response);
    })
    .finally(() => {});
};

const updateCategory = async () => {
  console.log("Category data before update:", category.value);
  await service.product
    .updateCategory(props.categoryId, category.value)
    .then((resp: any) => {
      console.log(resp.data);
      const data = resp.data;
      if (data) {
        Swal.fire({
          title: "แก้ไขประเภทสินค้าสำเร็จ",
          text: "ข้อมูลประเภทสินค้าของคุณถูกอัปเดตแล้ว",
          icon: "success",
        }).then(() => {
          emit("close"); // ปิดฟอร์มหลังจากแสดงสำเร็จ
        });
      }

      const temp: CategoryRes = {
        id: data.id,
        name: data.name,
        is_active: data.is_active,
        imageCategory: data.imageCategory,
      };
      categoryRes.value = temp;
    })
    .catch((err: any) => {
      console.log(err.response);
    })
    .finally(() => {});
};

const confirm = () => {
  Swal.fire({
    title: "คุณยืนยันการแก้ไขข้อมูลประเภทนี้หรือไม่?",
    text: "คุณต้องการยืนยันการแก้ไขข้อมูลประเภทสินค้านี้หรือไม่?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await updateCategory();
    }
  });
  emit("close");
};

const confirmCancel = () => {
  console.log("Data to be sent for update:", category.value);
  Swal.fire({
    title: "คุณแน่ใจหรือไม่?",
    text: "คุณต้องการยกเลิกการเพิ่มประเภทสินค้านี้หรือไม่?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    if (result.isConfirmed) {
      // Emit close หลังจากกดยืนยัน
      emit("close");
    }
  });
};

const imageUrl = ref<string | null>(null);

const fileInput = ref<HTMLInputElement | null>(null);

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      category.value.imageCategory = e.target?.result as string;
      imageUrl.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const clearImage = () => {
  imageUrl.value = null;
  category.value.imageCategory = ""; // ลบค่าของ imageCategory
  if (fileInput.value) {
    fileInput.value.value = ""; // ลบค่าใน input file
  }
};


onMounted(() => {
  // ดึงข้อมูลเมื่อ component ถูกโหลด
  console.log("Route Params ID at mounted:", route.params.id);
  getCategoryById();
});
</script>
