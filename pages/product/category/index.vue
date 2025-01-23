<template>
  <div class="defaultpages flex flex-col gap-2">
    <!-- ส่วนหัว -->
    <div class="flex items-center justify-between h-[5%] pl-[35px]">
      <h1 class="text-[25px] font-bold">ประเภทสินค้า</h1>
    </div>

    <!-- ส่วนค้นหาและปุ่มเพิ่ม -->
    <div class="flex justify-between px-[25px]">
      <div class="flex gap-2 w-[80%]">
        <div class="w-[40%]">
          <Search v-model="searchQuery" />
        </div>
      </div>
      <div class="pr-[50px]">
        <div
          @click="showAddCategory = true"
          class="flex items-center justify-center border-[1px] border-[#FFD652]/50 bg-[#F68D44] text-[20px] font-semibold rounded-[5px] h-full px-3 cursor-pointer dropshadowbutton"
        >
          เพิ่มประเภทสินค้า
        </div>
      </div>
    </div>

    <!-- ตาราง -->
    <div class="w-full h-[90%] mt-2 pt-2 bg-white">
      <table class="flex flex-col px-8 gap-2 w-ful">
        <thead class="w-full">
          <tr class="flex gap-2">
            <th class="w-[30%] text-end pr-[70px]">หมายเลขประเภท</th>
            <th class="w-[15%]">ชื่อประเภท</th>
            <th class="w-[15%]">จำนวน</th>
            <th class="w-[35%]"></th>
          </tr>
        </thead>
        <tbody class="w-full">
          <tr
            v-for="(category, index) in filteredCategories"
            :key="index"
            class="flex gap-2 py-2 border-b-[1px]"
          >
            <!-- หมายเลขประเภท -->
            <th class="w-[30%] truncate flex gap-5">
              <div class="w-full flex justify-center">
                <img
                  :src="category.image"
                  alt="รูปประเภท"
                  class="border-[1px] border-black w-[80px] h-[80px] rounded-full"
                />
              </div>
              <div class="w-full">{{ index + 1 }}</div>
            </th>

            <!-- ชื่อประเภท -->
            <th class="w-[15%] truncate">{{ category.name }}</th>

            <!-- จำนวน (mock data, ปรับได้ตามต้องการ) -->
            <th class="w-[15%] truncate">-</th>

            <!-- ปุ่มแก้ไขและลบประเภท -->
            <th class="w-[35%] flex gap-5 items-center justify-end truncate">
              <!-- ปุ่มแก้ไข -->
              <button @click="editCategory(index)" class="">
                <i
                  class="fa-solid fa-pen-to-square text-[30px] text-orange-400"
                ></i>
              </button>

              <!-- ปุ่มลบประเภท -->
              <button @click="removeCategory(index)" class=" ">
                <i class="fa-solid fa-trash text-[30px] text-red-600"></i>
              </button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- เรียกใช้ AddCategory -->
    <AddCategory
      v-if="showAddCategory"
      @close="closeForm"
      @addCategory="addCategory"
      class="absolute top-[200px] left-[700px]"
    />

    <!-- เรียกใช้ EditCategory -->
    <!-- <EditCategory
      v-if="editMode && editIndex !== null && editIndex >= 0 && editIndex < categories.length"
      :category="categories[editIndex]"
      @close="closeForm"
      @updateCategory="updateCategory"
    /> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

// ตัวแปร state
const showAddCategory = ref(false);
const categories = ref<{ name: string; image: any }[]>([]);
const searchQuery = ref<string>(""); // ตัวแปรสำหรับเก็บคำค้นหา

const closeForm = () => {
  showAddCategory.value = false;
  editMode.value = false;
  editIndex.value = null;
};

// ฟังก์ชันเพิ่มประเภทสินค้า
const addCategory = (category: { name: string; image: string }) => {
  categories.value.push(category);
  closeForm();
};

// ฟังก์ชันลบประเภทสินค้า
const removeCategory = (index: number) => {
  categories.value.splice(index, 1);
};

const editMode = ref(false);
const editIndex = ref<number | null>(null);

// ฟังก์ชันแก้ไขประเภทสินค้า
const editCategory = (index: number) => {
  if (index >= 0 && index < categories.value.length) {
    editMode.value = true;
    editIndex.value = index;
  } else {
    console.error("Invalid index for editing:", index);
  }
};

// ฟังก์ชันอัปเดตประเภทสินค้า
const updateCategory = (updatedCategory: { name: string; image: string }) => {
  if (
    editIndex.value !== null &&
    editIndex.value >= 0 &&
    editIndex.value < categories.value.length
  ) {
    categories.value[editIndex.value] = updatedCategory;
    closeForm();
  } else {
    console.error("Invalid editIndex:", editIndex.value);
  }
};

// Computed property สำหรับกรองประเภทสินค้า
const filteredCategories = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  return categories.value.filter((category) =>
    category.name.toLowerCase().includes(query)
  );
});
</script>

<style scoped>
/* Add styles if necessary */
</style>
