<template>
  <div class="defaultpages">
    <div class="pages">
      <!-- Header -->
      <hr class="hrpages" />

      <!-- รายการคำสั่งซื้อ -->
      <div
        class="p-2 h-full w-[100%] roundedmain bg-[#FFFAE9] dropshadowbottomsub"
      >
        <div class="flex justify-between gap-2">
          <h1 class="flex items-center textmain font-bold text-[25px]">
            รายงานการทำงาน
          </h1>
          <PopupDate />
        </div>
        <div class="h-[90%] mt-2">
          <table class="w-full text-[#2B1E28] font-semibold">
            <thead class="border-b-2 border-[#7A4711]">
              <tr class="flex gap-2 w-full">
                <th class="flex justify-start w-[20%]">หมายเลขการทำงาน</th>
                <th class="w-[20%]">วันที่</th>
                <th class="w-[20%]">ชื่อ</th>
                <th class="w-[50%]">รายละเอียด</th>
              </tr>
            </thead>
            <tbody v-for="(orders, data) in order" :key="data">
              <tr class="flex gap-2 hover:bg-[#F68D44]/50 mt-[11px]">
                <td class="w-[20%] truncate">{{ orders.order_id }}</td>
                <td class="w-[20%] text-center truncate">
                  {{ orders.created_at }}
                </td>
                <td class="w-[20%] text-center truncate">
                  {{ orders.customer.username }}
                </td>
                <td class="w-[50%] text-center flex justify-between gap-2">
                  <div class="truncate w-[95%">
                    {{ orders.total_amount }}
                  </div>
                  <div>
                    <i
                      class="fa-solid fa-trash-can text-red-600 hover:text-red-950 hover:translate-x-1 duration-300"
                    ></i>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- paginate -->
        <div class="mt-[5px]">
          <Paginate />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Order } from "~/models/order.model";

const order = ref<Order[]>([
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
    payment_status: "paid",
    items: [
      {
        product_id: 201,
        product_name: "Smartphone X Pro",
        quantity: 1,
        price: 1000,
      },
      {
        product_id: 202,
        product_name: "Wireless Headphones",
        quantity: 1,
        price: 250,
      },
      {
        product_id: 201,
        product_name: "Smartphone X Pro",
        quantity: 1,
        price: 1000,
      },
    ],
  },
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
    payment_status: "paid",
    items: [
      {
        product_id: 201,
        product_name: "Smartphone X Pro",
        quantity: 1,
        price: 1000,
      },
    ],
  },
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
    payment_status: "paid",
    items: [
      {
        product_id: 201,
        product_name: "Smartphone X Pro",
        quantity: 1,
        price: 1000,
      },
      {
        product_id: 202,
        product_name: "Wireless Headphones",
        quantity: 1,
        price: 250,
      },
      {
        product_id: 201,
        product_name: "Smartphone X Pro",
        quantity: 1,
        price: 1000,
      },
    ],
  },
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
    payment_status: "paid",
    items: [
      {
        product_id: 201,
        product_name: "Smartphone X Pro",
        quantity: 1,
        price: 1000,
      },
    ],
  },
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
    payment_status: "paid",
    items: [
      {
        product_id: 201,
        product_name: "Smartphone X Pro",
        quantity: 1,
        price: 1000,
      },
      {
        product_id: 202,
        product_name: "Wireless Headphones",
        quantity: 1,
        price: 250,
      },
      {
        product_id: 201,
        product_name: "Smartphone X Pro",
        quantity: 1,
        price: 1000,
      },
    ],
  },
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
    payment_status: "paid",
    items: [
      {
        product_id: 201,
        product_name: "Smartphone X Pro",
        quantity: 1,
        price: 1000,
      },
    ],
  },
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
    payment_status: "paid",
    items: [
      {
        product_id: 201,
        product_name: "Smartphone X Pro",
        quantity: 1,
        price: 1000,
      },
      {
        product_id: 202,
        product_name: "Wireless Headphones",
        quantity: 1,
        price: 250,
      },
      {
        product_id: 201,
        product_name: "Smartphone X Pro",
        quantity: 1,
        price: 1000,
      },
    ],
  },
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
    payment_status: "paid",
    items: [
      {
        product_id: 201,
        product_name: "Smartphone X Pro",
        quantity: 1,
        price: 1000,
      },
    ],
  },
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
    payment_status: "paid",
    items: [
      {
        product_id: 201,
        product_name: "Smartphone X Pro",
        quantity: 1,
        price: 1000,
      },
      {
        product_id: 202,
        product_name: "Wireless Headphones",
        quantity: 1,
        price: 250,
      },
      {
        product_id: 201,
        product_name: "Smartphone X Pro",
        quantity: 1,
        price: 1000,
      },
    ],
  },
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
    payment_status: "paid",
    items: [
      {
        product_id: 201,
        product_name: "Smartphone X Pro",
        quantity: 1,
        price: 1000,
      },
    ],
  },
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
    payment_status: "paid",
    items: [
      {
        product_id: 201,
        product_name: "Smartphone X Pro",
        quantity: 1,
        price: 1000,
      },
      {
        product_id: 202,
        product_name: "Wireless Headphones",
        quantity: 1,
        price: 250,
      },
      {
        product_id: 201,
        product_name: "Smartphone X Pro",
        quantity: 1,
        price: 1000,
      },
    ],
  },
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
    payment_status: "paid",
    items: [
      {
        product_id: 201,
        product_name: "Smartphone X Pro",
        quantity: 1,
        price: 1000,
      },
    ],
  },
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
    payment_status: "paid",
    items: [
      {
        product_id: 201,
        product_name: "Smartphone X Pro",
        quantity: 1,
        price: 1000,
      },
      {
        product_id: 202,
        product_name: "Wireless Headphones",
        quantity: 1,
        price: 250,
      },
      {
        product_id: 201,
        product_name: "Smartphone X Pro",
        quantity: 1,
        price: 1000,
      },
    ],
  },
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
    payment_status: "paid",
    items: [
      {
        product_id: 201,
        product_name: "Smartphone X Pro",
        quantity: 1,
        price: 1000,
      },
    ],
  },
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
    payment_status: "paid",
    items: [
      {
        product_id: 201,
        product_name: "Smartphone X Pro",
        quantity: 1,
        price: 1000,
      },
      {
        product_id: 202,
        product_name: "Wireless Headphones",
        quantity: 1,
        price: 250,
      },
      {
        product_id: 201,
        product_name: "Smartphone X Pro",
        quantity: 1,
        price: 1000,
      },
    ],
  },
]);
</script>

<style></style>
