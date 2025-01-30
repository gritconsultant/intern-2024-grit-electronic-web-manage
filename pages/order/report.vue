<template>
  <div class="container mx-auto p-12">
    <!-- ฟอร์มเลือกปีและเดือน -->
    <div class="mb-12 flex justify-between items-center space-x-12">
      <div class="flex items-center space-x-10">
        <label for="year" class="text-2xl font-bold text-gray-900">เลือกปี</label>
        <select v-model="selectedYear" id="year" class="px-10 py-5 border-2 border-gray-300 rounded-lg shadow-xl focus:outline-none focus:ring-4 focus:ring-gold-500 text-xl">
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>

      <div class="flex items-center space-x-10">
        <label for="month" class="text-2xl font-bold text-gray-900">เลือกเดือน</label>
        <select v-model="selectedMonth" id="month" class="px-10 py-5 border-2 border-gray-300 rounded-lg shadow-xl focus:outline-none focus:ring-4 focus:ring-gold-500 text-xl">
          <option v-for="(month, index) in months" :key="index" :value="index + 1">{{ month }}</option>
        </select>
      </div>
    </div>

    <!-- ตารางรายงานการขาย -->
    <div class="overflow-x-auto bg-gradient-to-r from-black to-gray-900 rounded-xl shadow-2xl p-8">
      <table class="min-w-full table-auto text-white">
        <thead class="bg-gradient-to-r from-gold-600 to-orange-500 text-gray-800 text-xl font-semibold">
          <tr>
            <th class="py-6 px-12">เลขที่คำสั่งซื้อ</th>
            <th class="py-6 px-12">ชื่อผู้ซื้อ</th>
            <th class="py-6 px-12 text-center">จำนวนสินค้า</th>
            <th class="py-6 px-12 text-right">ยอดรวม</th>
            <th class="py-6 px-12 text-center">วันที่ขาย</th>
          </tr>
        </thead>
        <tbody class="text-lg">
          <tr v-for="(order, index) in filteredOrders" :key="index" class="hover:bg-orange-100 transition-all">
            <td class="py-4 px-12 border-b">{{ order.orderId }}</td>
            <td class="py-4 px-12 border-b">{{ order.customerName }}</td>
            <td class="py-4 px-12 border-b text-center">{{ order.totalQuantity }}</td>
            <td class="py-4 px-12 border-b text-right">{{ order.totalAmount | currency }}</td>
            <td class="py-4 px-12 border-b text-center">{{ order.saleDate | formatDate }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- การแสดงผลรวมยอด -->
    <div class="mt-12 flex justify-between items-center text-white">
      <div class="text-3xl font-bold">ผลรวมยอดขาย:</div>
      <div class="text-4xl font-semibold text-gold-500">{{ totalSales | currency }}</div>
    </div>

    <!-- กราฟสถิติ (ตัวอย่างการแสดงกราฟ) -->
    <div class="mt-12">
      <canvas id="salesChart"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Chart from 'chart.js/auto';  // การใช้กราฟจาก Chart.js

const years = [2021, 2022, 2023, 2024];
const months = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

const selectedYear = ref(2023);
const selectedMonth = ref(1);

const orders = [
  { orderId: 'ORD001', customerName: 'นายสมชาย', totalQuantity: 5, totalAmount: 250000000, saleDate: '2023-01-15' },
  { orderId: 'ORD002', customerName: 'นางสาวสวย', totalQuantity: 2, totalAmount: 100000000, saleDate: '2023-01-16' },
  { orderId: 'ORD003', customerName: 'นายพิทักษ์', totalQuantity: 3, totalAmount: 150000000, saleDate: '2023-02-10' },
  { orderId: 'ORD004', customerName: 'นางสาวฝน', totalQuantity: 8, totalAmount: 400000000, saleDate: '2023-02-11' },
  // ข้อมูลคำสั่งซื้อที่แท้จริง
];

const filteredOrders = computed(() => {
  return orders.filter(order => {
    const orderDate = new Date(order.saleDate);
    return orderDate.getFullYear() === selectedYear.value && orderDate.getMonth() + 1 === selectedMonth.value;
  });
});

const totalSales = computed(() => {
  return filteredOrders.value.reduce((sum, order) => sum + order.totalAmount, 0);
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('th-TH');
};

// ฟังก์ชันแปลงยอดเงินให้เป็นรูปแบบเงิน
const currency = (value) => {
  return value.toLocaleString('th-TH', { style: 'currency', currency: 'THB' });
};

// กราฟการแสดงข้อมูล
onMounted(() => {
  const ctx = document.getElementById('salesChart');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: months,
      datasets: [{
        label: 'ยอดขายต่อเดือน',
        data: orders.map(order => order.totalAmount),
        backgroundColor: '#FF6347',
        borderColor: '#FF4500',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return 'ยอดรวม: ' + tooltipItem.raw.toLocaleString('th-TH', { style: 'currency', currency: 'THB' });
            }
          }
        }
      }
    }
  });
});
</script>

<style scoped>
/* การเพิ่มฟอนต์และสีทอง */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}

.bg-gradient-to-r {
  background-image: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 100%);
}

.text-gold-500 {
  color: #FFD700;
}

table th, table td {
  border-left: 1px solid #444;
  border-top: 1px solid #444;
}

table th:first-child, table td:first-child {
  border-left: none;
}

table tr:hover {
  background-color: #ff9e40;
}

select:focus {
  border-color: #FF6347;
  box-shadow: 0 0 10px rgba(255, 99, 71, 0.6);
}
</style>
