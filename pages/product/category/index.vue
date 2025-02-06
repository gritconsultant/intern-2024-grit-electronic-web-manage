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
            v-model="search"
            @keyup.enter="getCategorylist"
          />
          <i
            class="fa-solid fa-magnifying-glass absolute left-4 top-2 text-gray-500 text-lg"
          ></i>
        </div>
      </div>
    </div>

    <!-- Table Section -->
    <div
      class="bg-white flex flex-col justify-between h-[90%] rounded-lg px-6 w-full dropshadowbox"
    >
      <table class="w-full text-left h-[90%]">
        <thead class="w-full text-gray-800">
          <tr class="flex gap-2  border-b-[2px] pb-[4px] pt-[4px]">
            <th class="px-4 py-2 w-[25%]">รูปประเภท</th>
            <th class="px-4 py-2 w-[25%]">ชื่อประเภท</th>
            <th class="px-4 py-2 w-[25%]">จำนวน</th>
            <th class="px-4 py-2 w-[25%]">การจัดการ</th>
          </tr>
        </thead>
        <tbody class="w-full" v-if="!loading">
          <tr
            v-for="(category, index) in categories"
            :key="index"
            class="border-b flex gap-2 hover:bg-gray-50"
          >
            <td class="flex items-center gap-4 px-4 py-2 w-[25%]">
              <img
                src=""
                alt="รูปประเภท"
                class="w-16 h-16 object-cover rounded-lg border"
              />
            </td>
            <td class="px-4 py-2 w-[25%] flex items-center ">{{ category.name }}</td>
            <td class="px-4 py-2 text-orange-500 font-bold w-[25%] flex items-center">-</td>
            <td class="px-4 py-2 w-[25%] flex gap-4 items-center justify-start ">
              <button>
                <i
                  @click="openEditCategory(category.id)"
                  class="fa-solid fa-pen-to-square text-orange-400 text-xl"
                ></i>
              </button>
              <button>
                <i
                  @click="confirmDeleteCategory(category.id)"
                  class="fa-solid fa-trash text-red-600 text-xl"
                ></i>
              </button>
            </td>
          </tr>
        </tbody>
        <div v-else class="absolute left-[600px] top-[200px]">
          <div
            class="float-right inline-block h-96 w-96 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          >
            <span
              class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
              >Loading...</span
            >
          </div>
        </div>
      </table>

      <!-- Pagination -->
      <div class="flex justify-between items-center m-5">
        <div class="text-sm text-gray-600">
          <!-- แสดงข้อมูลจาก (หน้า) และจำนวนทั้งหมด -->
          แสดง {{ (page - 1) * size + 1 }} ถึง
          {{ Math.min(page * size) }}
          จากทั้งหมด {{ paginate.Total }} รายการ
        </div>
        <div class="flex gap-2">
          <!-- ปุ่มก่อนหน้า -->
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
          >
            ก่อนหน้า
          </button>

          <span class="flex items-center px-2">หน้า {{ currentPage }}</span>

          <!-- ปุ่มถัดไป -->
          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage * size >= paginate.Total"
            class="px-3 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>

    <!-- AddCategory Component -->
    <AddCategory
      v-if="showAddCategory"
      @close="closeForm"
      class="absolute top-[200px] left-[700px]"
    />
    <EditCategory
      v-if="showEditCategory && selectedCategoryId !== null"
      :categoryId="selectedCategoryId"
      @categoryUpdated="handleCategoryUpdate"
      @close="closeForm"
      class="absolute top-[200px] left-[700px]"
    />
  </div>
</template>

<script lang="ts" setup>
import Swal from "sweetalert2";
import type { Params } from "~/models/client.model";
import type { Category } from "~/models/product.model";
import service from "~/service";

// ฟังก์ชันอัปเดตข้อมูลประเภทสินค้าที่ถูกแก้ไข
const categoryUpdated = (updatedCategory: Category) => {
  // ค้นหาประเภทสินค้าที่มี id ตรงกับข้อมูลที่อัปเดต
  const index = categories.value.findIndex(
    (category) => category.id === updatedCategory.id
  );
  if (index !== -1) {
    categories.value[index] = updatedCategory; // แทนที่ข้อมูลประเภทสินค้าตัวเก่าด้วยข้อมูลที่อัปเดต
  }
};

const loading = ref(false);
const search = ref<string>("");
const currentPage = ref(1); // ตั้งค่า currentPage เริ่มต้นที่ 1
const page = ref(1); // ทำให้เป็น ref
const size = ref(6); // ทำให้เป็น ref
const categories = ref<Category[]>([]);
const paginate = ref<{ Total: number }>({ Total: 0 });
const Category = ref();

const getCategorylist = async () => {
  loading.value = true;
  const param: Params = {
    page: currentPage.value, // ใช้ .value ในการเข้าถึง currentPage
    size: size.value, // ใช้ .value ในการเข้าถึง size
    search: search.value || "", // ใช้ค่าป้องกันถ้า search เป็น null หรือ undefined
    category : Category.value,
  };
  await service.product
    .getCategoryList(param)
    .then((resp: any) => {
      const data = resp.data.data;
      paginate.value = resp.data.paginate;
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
    .finally(() => {
      loading.value = false;
    });
};

const changePage = (page: number) => {
  currentPage.value = page;
  getCategorylist(); // รีเฟรชข้อมูลเมื่อเปลี่ยนหน้า
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

const openEditCategory = (id: number | null) => {
  if (!id) {
    console.error("Error: No category ID provided.");
    return;
  }
  selectedCategoryId.value = id;
  showEditCategory.value = true;
};

const closeForm = () => {
  console.log("Form closed");
  showAddCategory.value = false;
  showEditCategory.value = false;
};

// เมื่อมีการอัปเดตประเภทสินค้า จะเรียกฟังก์ชัน categoryUpdated
const handleCategoryUpdate = (updatedCategory: Category) => {
  categoryUpdated(updatedCategory);
};

const confirmDeleteCategory = async (id: number) => {
  // Show the confirmation dialog
  const result = await Swal.fire({
    title: "คุณแน่ใจหรือไม่?", // ข้อความในกล่องยืนยัน
    text: "คุณต้องการลบประเภทสินค้านี้หรือไม่?", // ข้อความเสริมในกล่อง
    icon: "warning", // ไอคอนเตือน
    showCancelButton: true, // แสดงปุ่มยกเลิก
    confirmButtonText: "ยืนยัน", // ข้อความปุ่มยืนยัน
    cancelButtonText: "ยกเลิก", // ข้อความปุ่มยกเลิก
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

watch(
  () => [size.value],
  async () => {
    await getCategorylist();
  }
);

onMounted(async () => {
  await getCategorylist();
});
</script>

<style scoped>
/* Add styles if necessary */
</style>
