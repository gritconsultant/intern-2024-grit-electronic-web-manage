<template>
  <div class="defaultpages flex flex-col gap-2">
    <div class="flex items-center justify-between h-[8%] pl-[35px]">
      <h1 class="text-[20px] font-bold">รายการคำรองขอคืนสินค้า</h1>
      <div class="mr-5">
        <!-- ส่วนตัวกรอง -->
        <div class="flex items-center space-x-4">
          <!-- วันที่เริ่มต้น -->
          <div>
            <label
              for="startDate"
              class="block text-sm font-medium text-black mb-1"
              >วันที่เริ่มต้น</label
            >
            <input
              type="date"
              id="startDate"
              v-model="filters.startDate"
              class="p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none h-[30px]"
            />
          </div>

          <!-- วันที่สิ้นสุด -->
          <div>
            <label
              for="endDate"
              class="block text-sm font-medium text-black mb-1"
              >วันที่สิ้นสุด</label
            >
            <input
              type="date"
              id="endDate"
              v-model="filters.endDate"
              class="p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none h-[30px]"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full h-[90%] pt-2 bg-white">
      <table class="flex flex-col px-8 gap-2 w-full">
        <thead class="w-full">
          <tr class="flex gap-2">
            <th class="w-[15%] text-start">หมายเลขคำสั่งซื้อ</th>
            <th class="w-[15%]">วัน/เวลา</th>
            <th class="w-[15%]">ลูกค้า</th>
            <th class="w-[15%]">จำนวนรวม</th>
            <th class="w-[15%]">ราคารวม</th>
            <th class="w-[15%]">สถานะการจัดส่ง</th>
            <th class="w-[5%]"></th>
          </tr>
        </thead>
        <tbody class="w-full" v-for="(order, index) in filteredOrders" :key="index">
          <tr class="flex gap-2 py-2 border-b-[1px]">
            <th class="w-[15%] text-start truncate">
              {{ order.order_id }}
            </th>
            <th class="w-[15%] truncate">{{ order.created_at }}</th>
            <th class="w-[15%] truncate">{{ order.customer.username }}</th>
            <th class="w-[15%] truncate">{{ order.items.reduce((sum, item) => sum + item.quantity, 0) }}</th>
            <th class="w-[15%] truncate">{{ order.total_amount }}</th>
            <th class="w-[15%] truncate">
              <div
                class="bg-white cursor-pointer border-[1px] rounded-[5px]"
                @click="store.orderstatus = !store.orderstatus"
              >
                รอจัดส่ง
                <div v-if="store.orderstatus" class="flex justify-center">
                  <PopupOrderstatus />
                </div>
              </div>
            </th>
            <th class="w-[5%] flex items-center justify-center">
              <NuxtLink
                to="/refund/[id]"
                class="flex items-center place-content-center justify-center rounded-[5px] h-[20px] w-[25px] hover:bg-slate-500"
              >
                <i class="fa-solid fa-bars"></i>
              </NuxtLink>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Order } from "~/models/order.model";
import { useIndexStore } from "~/store/main";
import { ref, computed } from "vue";

const store = useIndexStore();

const filters = ref({
  startDate: "",
  endDate: "",
});

// ฟิลเตอร์คำสั่งซื้อ (Orders) ตามวันที่
const filteredOrders = computed(() => {
  return orders.filter(order => {
    const orderDate = new Date(order.created_at);
    const startDate = filters.value.startDate ? new Date(filters.value.startDate) : null;
    const endDate = filters.value.endDate ? new Date(filters.value.endDate) : null;

    return (
      (!startDate || orderDate >= startDate) &&
      (!endDate || orderDate <= endDate)
    );
  });
});

const orders = <Order[]>[
  {
    order_id: 12345,
    customer: {
      user_id: 101,
      username: "john_doe",
      email: "john_doe@example.com",
    },
    total_amount: 1250,
    currency: "USD",
    status: "delivered",
    created_at: "2024-12-15T08:30:00Z",
    updated_at: "2024-12-19T10:00:00Z",
    payment_status: "paid",
    items: [
      { product_id: 201, product_name: "Smartphone X Pro", quantity: 1, price: 1000 },
      { product_id: 202, product_name: "Wireless Headphones", quantity: 1, price: 250 },
    ],
  },
  {
    order_id: 12346,
    customer: {
      user_id: 102,
      username: "jane_smith",
      email: "jane_smith@example.com",
    },
    total_amount: 500,
    currency: "USD",
    status: "pending",
    created_at: "2024-12-18T09:00:00Z",
    payment_status: "unpaid",
    items: [{ product_id: 203, product_name: "Smartwatch Y", quantity: 2, price: 250 }],
  },
  {
    order_id: 12345,
    customer: { user_id: 101, username: "john_doe", email: "john_doe@example.com" },
    total_amount: 1250,
    currency: "USD",
    status: "delivered",
    created_at: "2024-12-15T08:30:00Z",
    updated_at: "2024-12-19T10:00:00Z",
    payment_status: "paid",
    items: [
      { product_id: 201, product_name: "Smartphone X Pro", quantity: 1, price: 1000 },
      { product_id: 202, product_name: "Wireless Headphones", quantity: 1, price: 250 },
    ],
  },
  {
    order_id: 12346,
    customer: { user_id: 102, username: "jane_smith", email: "jane_smith@example.com" },
    total_amount: 500,
    currency: "USD",
    status: "pending",
    created_at: "2024-12-16T09:00:00Z",
    updated_at: "2024-12-20T10:00:00Z",
    payment_status: "unpaid",
    items: [
      { product_id: 203, product_name: "Smartwatch Y", quantity: 2, price: 250 },
    ],
  },
  {
    order_id: 12347,
    customer: { user_id: 103, username: "alice_lee", email: "alice_lee@example.com" },
    total_amount: 800,
    currency: "USD",
    status: "delivered",
    created_at: "2024-12-17T10:00:00Z",
    updated_at: "2024-12-21T11:00:00Z",
    payment_status: "paid",
    items: [
      { product_id: 204, product_name: "Laptop ABC", quantity: 1, price: 800 },
    ],
  },
  {
    order_id: 12348,
    customer: { user_id: 104, username: "bob_martin", email: "bob_martin@example.com" },
    total_amount: 650,
    currency: "USD",
    status: "pending",
    created_at: "2024-12-18T11:00:00Z",
    updated_at: "2024-12-22T12:00:00Z",
    payment_status: "unpaid",
    items: [
      { product_id: 205, product_name: "Smartphone Z Max", quantity: 1, price: 650 },
    ],
  },
  {
    order_id: 12349,
    customer: { user_id: 105, username: "carol_white", email: "carol_white@example.com" },
    total_amount: 1500,
    currency: "USD",
    status: "delivered",
    created_at: "2024-12-19T12:00:00Z",
    updated_at: "2024-12-23T13:00:00Z",
    payment_status: "paid",
    items: [
      { product_id: 206, product_name: "4K TV Ultra", quantity: 1, price: 1500 },
    ],
  },
  {
    order_id: 12350,
    customer: { user_id: 106, username: "david_jones", email: "david_jones@example.com" },
    total_amount: 1200,
    currency: "USD",
    status: "pending",
    created_at: "2024-12-20T13:00:00Z",
    updated_at: "2024-12-24T14:00:00Z",
    payment_status: "unpaid",
    items: [
      { product_id: 207, product_name: "Smartwatch X", quantity: 2, price: 600 },
    ],
  },
  {
    order_id: 12351,
    customer: { user_id: 107, username: "emily_kim", email: "emily_kim@example.com" },
    total_amount: 900,
    currency: "USD",
    status: "delivered",
    created_at: "2024-12-21T14:00:00Z",
    updated_at: "2024-12-25T15:00:00Z",
    payment_status: "paid",
    items: [
      { product_id: 208, product_name: "Wireless Earbuds", quantity: 3, price: 300 },
    ],
  },
  {
    order_id: 12352,
    customer: { user_id: 108, username: "frank_wilson", email: "frank_wilson@example.com" },
    total_amount: 450,
    currency: "USD",
    status: "pending",
    created_at: "2024-12-22T15:00:00Z",
    updated_at: "2024-12-26T16:00:00Z",
    payment_status: "unpaid",
    items: [
      { product_id: 209, product_name: "Bluetooth Speaker", quantity: 1, price: 450 },
    ],
  },
  {
    order_id: 12353,
    customer: { user_id: 109, username: "george_lee", email: "george_lee@example.com" },
    total_amount: 700,
    currency: "USD",
    status: "delivered",
    created_at: "2024-12-23T16:00:00Z",
    updated_at: "2024-12-27T17:00:00Z",
    payment_status: "paid",
    items: [
      { product_id: 210, product_name: "Tablet Pro", quantity: 1, price: 700 },
    ],
  },
  {
    order_id: 12354,
    customer: { user_id: 110, username: "helen_smith", email: "helen_smith@example.com" },
    total_amount: 1100,
    currency: "USD",
    status: "pending",
    created_at: "2024-12-24T17:00:00Z",
    updated_at: "2024-12-28T18:00:00Z",
    payment_status: "unpaid",
    items: [
      { product_id: 211, product_name: "Gaming Console X", quantity: 1, price: 1100 },
    ],
  },
  {
    order_id: 12355,
    customer: { user_id: 111, username: "ivan_taylor", email: "ivan_taylor@example.com" },
    total_amount: 550,
    currency: "USD",
    status: "delivered",
    created_at: "2024-12-25T18:00:00Z",
    updated_at: "2024-12-29T19:00:00Z",
    payment_status: "paid",
    items: [
      { product_id: 212, product_name: "Portable Charger", quantity: 2, price: 275 },
    ],
  },
  {
    order_id: 12356,
    customer: { user_id: 112, username: "julia_morris", email: "julia_morris@example.com" },
    total_amount: 950,
    currency: "USD",
    status: "pending",
    created_at: "2024-12-26T19:00:00Z",
    updated_at: "2024-12-30T20:00:00Z",
    payment_status: "unpaid",
    items: [
      { product_id: 213, product_name: "Smart TV 55inch", quantity: 1, price: 950 },
    ],
  },
  {
    order_id: 12357,
    customer: { user_id: 113, username: "karen_davis", email: "karen_davis@example.com" },
    total_amount: 1300,
    currency: "USD",
    status: "delivered",
    created_at: "2024-12-27T20:00:00Z",
    updated_at: "2024-12-31T21:00:00Z",
    payment_status: "paid",
    items: [
      { product_id: 214, product_name: "Laptop Z", quantity: 1, price: 1300 },
    ],
  },
  {
    order_id: 12358,
    customer: { user_id: 114, username: "lucy_evans", email: "lucy_evans@example.com" },
    total_amount: 850,
    currency: "USD",
    status: "pending",
    created_at: "2024-12-28T21:00:00Z",
    updated_at: "2025-01-01T22:00:00Z",
    payment_status: "unpaid",
    items: [
      { product_id: 215, product_name: "Camera Pro", quantity: 1, price: 850 },
    ],
  },
  // ข้อมูลคำสั่งซื้อเพิ่มเติม
];
</script>

<style scoped></style>
