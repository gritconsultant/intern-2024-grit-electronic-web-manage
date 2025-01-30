<template>
  <div class="defaultpages flex flex-col gap-3 p-6 bg-gray-50">
    <!-- Header Section -->
    <div
      class="flex justify-between items-center bg-white p-5 rounded-lg shadow-md"
    >
      <h1 class="text-2xl font-bold text-gray-800">ประเภทสินค้า</h1>
      <div
        @click="showAddCategory = true"
        class="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow cursor-pointer hover:bg-orange-600"
      >
        <i class="fa-solid fa-plus"></i> เพิ่มประเภทสินค้า
      </div>
    </div>

    <!-- Search and Filter Section -->
    <div class="flex justify-between items-center gap-4 mt-2">
      <div class="flex gap-4 flex-1">
        <!-- Search Bar -->
        <div class="relative w-1/2">
          <input
            type="search"
            class="w-full h-10 pl-12 pr-4 rounded-full border border-orange-400 focus:ring-2 focus:ring-orange-500 outline-none text-gray-800"
            placeholder="ค้นหาประเภทสินค้า"
          />
          <i
            class="fa-solid fa-magnifying-glass absolute left-4 top-2 text-gray-500 text-lg"
          ></i>
        </div>
      </div>
    </div>

    <!-- Table Section -->
    <div
      class="bg-white flex flex-col justify-between h-[90%] rounded-lg p-6 w-full dropshadowbox"
    >
      <table class="w-full text-left h-[90%]">
        <thead class="w-full bg-orange-100 rounded-t-lg text-gray-800">
          <tr class="flex gap-2">
            <th class="px-4 py-2 w-[30%]">หมายเลขประเภท</th>
            <th class="px-4 py-2 w-[15%]">ชื่อประเภท</th>
            <th class="px-4 py-2 w-[15%]">จำนวน</th>
            <th class="px-4 py-2 w-[35%]">การจัดการ</th>
          </tr>
        </thead>
        <tbody class="w-full">
          <tr
            v-for="(category, index) in categories"
            :key="index"
            class="border-b flex gap-2 hover:bg-gray-50"
          >
            <td class="flex items-center gap-4 px-4 py-2 w-[30%]">
              <img
                src=""
                alt="รูปประเภท"
                class="w-16 h-16 object-cover rounded-lg border"
              />
            </td>
            <td class="px-4 py-2 w-[15%]">{{ category.name }}</td>
            <td class="px-4 py-2 text-orange-500 font-bold w-[15%]">-</td>
            <td class="px-4 py-2 w-[35%] flex gap-4 items-center justify-end">
              <button>
                <i
                  @click="openEditCategory(category.id)"
                  class="fa-solid fa-pen-to-square text-orange-400 text-xl"
                ></i>
              </button>
              <button>
                <i
                @click="confirmDeleteCategory(category.id)"
                 class="fa-solid fa-trash text-red-600 text-xl"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
    </div>

    <!-- AddCategory Component -->
    <AddCategory
      v-if="showAddCategory"
      @close="closeForm"
      class="absolute top-[200px] left-[700px]"
    />
    <EditCategory
      v-if="showEditCategory"
      :categoryId="selectedCategoryId"
      @close="closeForm"
      class="absolute top-[200px] left-[700px]"
    />
  </div>
</template>

<script lang="ts" setup>
import Swal from "sweetalert2";
import type { Category } from "~/models/product.model";
import service from "~/service";

const categories = ref<Category[]>([]);
const getCategorylist = async () => {
  await service.product
    .getCategoryList()
    .then((resp: any) => {
      const data = resp.data.data;
      const categoryList: Category[] = [];

      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const c = data[i];
        const category: Category = {
          id: c.id,
          name: c.name,
          is_active: c.is_active,
          imageCategory: c.imageCategory,
        };
        categoryList.push(category);
      }
      categories.value = categoryList;
    })
    .catch((error: any) => {
      console.log("Error loading product list:", error.response || error);
    })
    .finally(() => {});
};

const deleteCategory = async (id: number) => {
  await service.product
    .deleteCategory(id)
    .then((resp: any) => {
      const data = resp.data;
      console.log(data);
    })
    .catch((erorr: any) => {
      console.log(erorr.respontse);
    })
    .finally(() => {});
};

// ตัวแปร state
const showAddCategory = ref(false);
const showEditCategory = ref(false);

const selectedCategoryId = ref<number | null>(null);

const openEditCategory = (id: number) => {
  if (id) {
    selectedCategoryId.value = id;
  } else {
    console.error("ID is not valid", id); // ตรวจสอบกรณีที่ id ไม่ถูกต้อง
  }
  showEditCategory.value = true;
};

const closeForm = () => {
  console.log("Form closed");
  showAddCategory.value = false;
  showEditCategory.value = false;
};

const confirmDeleteCategory = async (id: number) => {
  // Show the confirmation dialog
  const result = await Swal.fire({
    title: "คุณแน่ใจหรือไม่?",  // ข้อความในกล่องยืนยัน
    text: "คุณต้องการลบประเภทสินค้านี้หรือไม่?",  // ข้อความเสริมในกล่อง
    icon: "warning",  // ไอคอนเตือน
    showCancelButton: true,  // แสดงปุ่มยกเลิก
    confirmButtonText: "ยืนยัน",  // ข้อความปุ่มยืนยัน
    cancelButtonText: "ยกเลิก",  // ข้อความปุ่มยกเลิก
  });

  // If the user confirms the deletion
  if (result.isConfirmed) {
    try {
      // Call the deleteCategory function to delete the category
      await deleteCategory(id);

      // Show success message after deletion
      Swal.fire("ลบสำเร็จ!", "ประเภทสินค้าของคุณได้ถูกลบแล้ว", "success");
    } catch (error) {
      // If an error occurs during deletion, show error message
      Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถลบประเภทสินค้านี้ได้", "error");
    }
  }
};

onMounted(async () => {
  await getCategorylist();
});
</script>

<style scoped>
/* Add styles if necessary */
</style>
