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
          <!-- Binding searchQuery -->
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
            v-for="(product, index) in filteredProducts"
            :key="index"
            class="flex gap-2 py-2 border-b-[1px]"
          >
            <!-- หมายเลขประเภท -->
            <th class="w-[30%] truncate flex gap-5">
              <div class="w-full flex justify-center">
                <img
                  :src="product.image"
                  alt="รูปสินค้า"
                  class="border-[1px] border-black w-[100px] h-[100px] rounded-full"
                />
              </div>
              <div class="w-full">{{ index + 1 }}</div>
            </th>

            <!-- ชื่อประเภท -->
            <th class="w-[15%] truncate">{{ product.name }}</th>

            <!-- จำนวน (mock data, ปรับได้ตามต้องการ) -->
            <th class="w-[15%] truncate">-</th>

            <!-- ปุ่มแก้ไขและลบสินค้า -->
            <th class="w-[35%] flex items-center justify-end truncate">
              <!-- ปุ่มแก้ไข -->
              <button
                @click="editProduct(index)"
                class="bg-[#F68D44] w-[100px] h-[40px] rounded-[5px] hover:bg-blue-500 text-[18px] font-semibold dropshadowbutton mr-2"
              >
                แก้ไขสินค้า
              </button>

              <!-- ปุ่มลบสินค้า -->
              <button
                @click="removeProduct(index)"
                class="bg-[#F68D44] w-[100px] h-[40px] rounded-[5px] hover:bg-red-500 text-[18px] font-semibold dropshadowbutton"
              >
                ลบสินค้า
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
      @addProduct="addProduct"
      class="absolute top-[200px] left-[700px]"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

// ตัวแปร state
const showAddCategory = ref(false);
const products = ref<{ name: string; image: string }[]>([]);
const searchQuery = ref<string>(""); // ตัวแปรสำหรับเก็บคำค้นหา

// ฟังก์ชันปิดฟอร์ม
const closeForm = () => {
  showAddCategory.value = false;
};

// ฟังก์ชันเพิ่มสินค้า
const addProduct = (product: { name: string; image: string }) => {
  console.log("เพิ่มสินค้าใน parent:", product);
  products.value.push(product);
  closeForm();
};

// ฟังก์ชันลบสินค้า
const removeProduct = (index: number) => {
  products.value.splice(index, 1);
};

// ฟังก์ชันแก้ไขสินค้า
const editProduct = (index: number) => {
  const product = products.value[index];
  console.log("กำลังแก้ไขสินค้า", product);
  // เพิ่มฟังก์ชันการแก้ไข เช่น เปิด modal หรือ form สำหรับแก้ไข
};

// Computed property สำหรับกรองสินค้า
const filteredProducts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  return products.value.filter((product) =>
    product.name.toLowerCase().includes(query)
  );
});
</script>
