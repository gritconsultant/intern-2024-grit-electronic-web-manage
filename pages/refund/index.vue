<template>
  <div class="defaultpages flex flex-col gap-2">
    <div class="flex items-center justify-between h-[5%] pl-[35px]">
      <h1 class="text-[20px] font-bold">รายการคำรองขอคืนสินค้า</h1>
      <div
        class="flex justify-center mr-[40px] border-2 rounded-[5px] bg-white/50 w-[310px]"
      >
        <DropdownPaymentstatus />
        <DropdownStatusorder />
      </div>
    </div>
    <div class="w-full h-[90%] pt-2 bg-white">
      <table class="flex flex-col px-8 gap-2 w-ful">
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
        <tbody class="w-full" v-for="(order, data) in orders" :key="data">
          <tr class="flex gap-2 py-2 border-b-[1px]">
            <th class="w-[15%] text-start truncate">
              {{ order.order_id }}
            </th>
            <th class="w-[15%] truncate">{{ order.created_at }}</th>
            <th class="w-[15%] truncate">{{ order.customer.username }}</th>
            <th class="w-[15%] truncate">{{}}</th>
            <th class="w-[15%] truncate">{{ order.total_amount }}</th>
            <th class="w-[15%] truncate">
              <div
                class="bg-white cursor-pointer border-[1px] rounded-[5px]"
                @click="store.orderstatus = !store.orderstatus"
              >
                รอจัดส่ง {{}}
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

const store = useIndexStore();

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
    items: [
      {
        product_id: 203,
        product_name: "Smartwatch Y",
        quantity: 2,
        price: 250,
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
    updated_at: "2024-12-19T10:00:00Z",
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
    items: [
      {
        product_id: 203,
        product_name: "Smartwatch Y",
        quantity: 2,
        price: 250,
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
    updated_at: "2024-12-19T10:00:00Z",
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
    items: [
      {
        product_id: 203,
        product_name: "Smartwatch Y",
        quantity: 2,
        price: 250,
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
    updated_at: "2024-12-19T10:00:00Z",
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
    items: [
      {
        product_id: 203,
        product_name: "Smartwatch Y",
        quantity: 2,
        price: 250,
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
    updated_at: "2024-12-19T10:00:00Z",
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
    items: [
      {
        product_id: 203,
        product_name: "Smartwatch Y",
        quantity: 2,
        price: 250,
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
    updated_at: "2024-12-19T10:00:00Z",
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
    items: [
      {
        product_id: 203,
        product_name: "Smartwatch Y",
        quantity: 2,
        price: 250,
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
    updated_at: "2024-12-19T10:00:00Z",
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
    items: [
      {
        product_id: 203,
        product_name: "Smartwatch Y",
        quantity: 2,
        price: 250,
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
    updated_at: "2024-12-19T10:00:00Z",
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
    ],
  },
];
</script>

<style></style>
