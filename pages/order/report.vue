<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <!-- Header -->
    <div class="bg-white p-4 rounded-lg shadow-md mb-6">
      <h1 class="text-2xl font-semibold text-gray-700">รายงานการขาย</h1>
      <p class="text-gray-500 mt-2">สรุปข้อมูลการขายของคุณ</p>
    </div>

    <!-- Filters -->
    <div
      class="flex flex-wrap items-center gap-4 bg-white p-4 rounded-lg shadow-md mb-6"
    >
      <div>
        <label class="text-sm font-medium text-gray-600">วันที่เริ่มต้น</label>
        <input
          type="date"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label class="text-sm font-medium text-gray-600">วันที่สิ้นสุด</label>
        <input
          type="date"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button
        class="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 focus:outline-none"
      >
        ค้นหา
      </button>
    </div>

    <!-- Sales Table -->
    <div class="bg-white rounded-lg shadow-md overflow-x-auto">
      <table class="table-auto w-full text-left border-collapse">
        <thead class="bg-gray-200">
          <tr>
            <th class="px-4 py-2 border-b">วันที่</th>
            <th class="px-4 py-2 border-b">รายการสินค้า</th>
            <th class="px-4 py-2 border-b">จำนวน</th>
            <th class="px-4 py-2 border-b">ราคา (บาท)</th>
            <th class="px-4 py-2 border-b">ยอดรวม (บาท)</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-gray-100">
            <td class="px-4 py-2 border-b">2025-01-01</td>
            <td class="px-4 py-2 border-b">น้ำดื่ม</td>
            <td class="px-4 py-2 border-b">10</td>
            <td class="px-4 py-2 border-b">10</td>
            <td class="px-4 py-2 border-b">100</td>
          </tr>
          <tr class="hover:bg-gray-100">
            <td class="px-4 py-2 border-b">2025-01-02</td>
            <td class="px-4 py-2 border-b">ขนมปัง</td>
            <td class="px-4 py-2 border-b">5</td>
            <td class="px-4 py-2 border-b">20</td>
            <td class="px-4 py-2 border-b">100</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
