<template>
  <div class="defaultpages flex flex-col gap-2 p-6 bg-gray-50">
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
    <div class="flex justify-between items-center gap-4 mt-8">
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
          <tr class="flex gap-2 border-b-[2px] pb-[4px] pt-[4px]">
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
                :src="category.image"
                alt="รูปประเภท"
                class="w-16 h-16 object-cover rounded-lg border"
              />
            </td>
            <td class="px-4 py-2 w-[25%] flex items-center">
              {{ category.name }}
            </td>
            <td
              class="px-4 py-2 text-orange-500 font-bold w-[25%] flex items-center"
            >
              {{ category.TotalProduct }}
            </td>
            <td class="px-4 py-2 w-[25%] flex gap-4 items-center justify-start">
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
          <!-- <tr v-if="categories.length === 0">
            <td colspan="6" class="absolute left-[850px] top-[350px]    ">
              <svg
            aria-hidden="true"
            class="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
            </td>
          </tr> -->
        </tbody>
        <div v-else class="absolute left-[850px] top-[350px]">
          <!-- ไม่มีข้อมูล  -->
          <svg
            aria-hidden="true"
            class="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      </table>

      <!-- Pagination -->
      <div class="flex justify-between items-center m-5">
        <div class="text-sm text-gray-600">
          <!-- แสดงข้อมูลจาก (หน้า) และจำนวนทั้งหมด -->
          แสดง {{ (currentPage - 1) * size + 1 }} ถึง
          {{ Math.min(currentPage * size, paginate.Total) }}
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
      @categoryAdded="handleCategoryAdd"
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

import { useIndexStore } from "~/store/main";

definePageMeta({
  middleware: "auth",
});

const store = useIndexStore();

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
    category: Category.value,
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
          image: c.image,
          TotalProduct: c.TotalProduct,
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

const handleCategoryAdd = async (newCategory: Category) => {
  Swal.fire("สำเร็จ!", "ประเภทสินค้าได้ถูกเพิ่มแล้ว", "success").then(() => {
    getCategorylist(); // รีเฟรชข้อมูลหลังจากเพิ่มข้อมูลใหม่
    closeForm(); // ปิดฟอร์มเพิ่มประเภท
  });
};

// เมื่อมีการอัปเดตประเภทสินค้า จะเรียกฟังก์ชัน categoryUpdated
const handleCategoryUpdate = (updatedCategory: Category) => {
  Swal.fire("สำเร็จ!", "ข้อมูลประเภทสินค้าได้รับการอัปเดตแล้ว", "success").then(
    () => {
      getCategorylist(); // เรียก API ใหม่แทนการรีเฟรชหน้า
      closeForm(); // ปิดฟอร์มแก้ไข
    }
  );
};

const confirmDeleteCategory = async (id: number) => {
  // ค้นหาประเภทสินค้าที่ตรงกับ id ที่เลือก
  const category = categories.value.find((cat) => cat.id === id);

  // หากไม่พบประเภทสินค้า หรือมีจำนวนสินค้าต่างจาก 0
  if (category && category.TotalProduct !== 0) {
    // แสดงข้อความเตือนว่าไม่สามารถลบได้
    Swal.fire({
      title: "ไม่สามารถลบประเภทนี้ได้",
      text: "เนื่องจากมีสินค้าภายในประเภทนี้อยู่",
      icon: "error",
    });
    return; // หยุดการทำงานของฟังก์ชัน
  }

  // หากสามารถลบได้
  const result = await Swal.fire({
    title: "คุณแน่ใจหรือไม่?", // ข้อความในกล่องยืนยัน
    text: "คุณต้องการลบประเภทสินค้านี้หรือไม่?", // ข้อความเสริมในกล่อง
    icon: "warning", // ไอคอนเตือน
    showCancelButton: true, // แสดงปุ่มยกเลิก
    confirmButtonText: "ยืนยัน", // ข้อความปุ่มยืนยัน
    cancelButtonText: "ยกเลิก", // ข้อความปุ่มยกเลิก
  });

  // ถ้าได้รับการยืนยันการลบ
  if (result.isConfirmed) {
    try {
      // เรียกฟังก์ชันลบประเภทสินค้า
      await deleteCategory(id);

      // แสดงข้อความสำเร็จหลังจากลบ
      Swal.fire("ลบสำเร็จ!", "ประเภทสินค้าของคุณได้ถูกลบแล้ว", "success").then(
        () => {
          getCategorylist(); // รีเฟรชหน้าหลังจากกด OK
        }
      );
    } catch (error) {
      // ถ้ามีข้อผิดพลาดระหว่างการลบ
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
