<template>
  <div class="defaultpages">
    <div class="flex items-center justify-between h-[5%] pl-[35px]">
      <h1 class="text-[20px] font-bold">รายการคำสั่งซื้อ</h1>
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
            <th class="w-[15%] text-start bg-slate-400">หมายเลขคำสั่งซื้อ</th>
            <th class="w-[15%] bg-slate-400">วัน/เวลา</th>
            <th class="w-[15%] bg-slate-400">ลูกค้า</th>
            <th class="w-[15%] bg-slate-400">ราคารวม</th>
            <th class="w-[15%] bg-slate-400">จำนวนรวม</th>
            <th class="w-[15%] bg-slate-400">สถานะการชำระเงิน</th>
            <th class="w-[15%] bg-slate-400">สถานะการจัดส่ง</th>
            <th class="w-[5%] bg-slate-400"></th>
          </tr>
        </thead>
        <tbody class="w-full">
          <tr class="flex gap-2">
            <th class="w-[15%] text-start bg-slate-400 truncate">
              หมายเลขคำสั่งซื้อ
            </th>
            <th class="w-[15%] bg-slate-400 truncate">วัน/เวลา</th>
            <th class="w-[15%] bg-slate-400 truncate">ลูกค้า</th>
            <th class="w-[15%] bg-slate-400 truncate">ราคารวม</th>
            <th class="w-[15%] bg-slate-400 truncate">จำนวนรวม</th>
            <th class="w-[15%] bg-slate-400 truncate">สถานะการชำระเงิน</th>
            <th class="w-[15%] bg-slate-400 truncate">สถานะการจัดส่ง</th>
            <th class="w-[5%] bg-slate-400">
              <i class="fa-solid fa-bars  rounded-[5px] border-[1px] border-slate-400  w-[25px] hover:bg-slate-200 hover:border-slate-600 "></i>
            </th>
          </tr>
        </tbody>
      </table>
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
]);
</script>

<style></style>
