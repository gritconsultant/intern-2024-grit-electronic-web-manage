<template>
  <div class="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
    <div
    class="bg-white shadow-md rounded-lg p-8 h-[700px] w-[800px]  dropshadowboxabsolute"
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
          class="rounded-md border-gray-300 w-full p-3 text-gray-700 dropshadowboxsub"
          placeholder="กรอกชื่อประเภทสินค้า"
        />
      </div>

      <!-- อัพโหลดไฟล์และแสดงภาพ -->
      <div class="flex flex-col gap-4 items-center justify-between h-[350px]">
        <div class="flex flex-col items-start gap-2 w-full">
          <label for="image-url" class="text-lg font-medium text-gray-700">
            อัพโหลดรูปภาพ
          </label>
          <div class="flex items-enปd h-full w-full">
            <div class="flex flex-col gap-5 w-full">
              <!-- ใช้ input สำหรับ URL -->
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

        <!-- แสดงภาพจาก URL -->
        <div
          class="bg-slate-50 flex justify-center items-center w-64 h-64 border-2 border-dashed border-gray-300 rounded-md overflow-hidden"
        >
          <img
            v-if="category.image && isValidUrl(category.image)"
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
          บันทึก
        </button>
      </div>
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
  image: "",
});

const categoryRes = ref<CategoryRes>({
  id: 0,
  name: "",
  is_active: true,
  image: "",
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
          image: data.image,
        };
        if (category.value.image) {
          imageUrl.value = category.value.image;
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
        image: data.image,
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
      try {
        await updateCategory(); // อัปเดตข้อมูลประเภทสินค้า
        Swal.fire({
          title: "สำเร็จ!",
          text: "ข้อมูลประเภทสินค้าถูกแก้ไขแล้ว",
          icon: "success",
          confirmButtonText: "ตกลง",
        }).then(() => {
          window.location.reload(); // รีเฟรชหน้าหลังจากกด "ตกลง"
        });
      } catch (error) {
        Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถแก้ไขข้อมูลได้", "error");
      }
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

const isValidUrl = (url: string) => {
  const regex = /^(http|https):\/\/[^ "]+$/;
  return regex.test(url);
};

const imageUrl = ref<string | null>(null);

const fileInput = ref<HTMLInputElement | null>(null);

onMounted(() => {
  // ดึงข้อมูลเมื่อ component ถูกโหลด
  console.log("Route Params ID at mounted:", route.params.id);
  getCategoryById();
});
</script>
