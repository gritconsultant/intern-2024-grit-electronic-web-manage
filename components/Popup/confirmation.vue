<template>
  <div
    v-if="showPopup"
    class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white p-6 rounded shadow-lg w-1/2">
      <h2 class="text-xl font-bold mb-4">รายละเอียดสินค้าที่เลือก</h2>
      <table class="w-full table-auto">
        <thead>
          <tr>
            <th class="border px-2 py-1">ชื่อสินค้า</th>
            <th class="border px-2 py-1">ราคา</th>
            <th class="border px-2 py-1">จำนวน</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, index) in selectedProducts"
            :key="index"
            class="border-t"
          >
            <td class="px-2 py-1">{{ product.name }}</td>
            <td class="px-2 py-1">฿{{ product.price }}</td>
            <td class="px-2 py-1">{{ product.amount }}</td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-between mt-4">
        <button
          @click="confirmSelection"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          ยืนยัน
        </button>
        <button
          @click="closePopup"
          class="bg-gray-500 text-white px-4 py-2 rounded"
        >
          ยกเลิก
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  showPopup: Boolean,
  selectedProducts: Array,
  confirmSelection: Function,
  closePopup: Function,
});
</script>
