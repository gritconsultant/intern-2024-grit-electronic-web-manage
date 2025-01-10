<template>
   <div class="defaultpages">
    <div class="pages">
      <!-- Header -->

      <hr class="hrpages" />
      <Search />

      <div class="flex gap-2 p-1 h-[92%] w-full bg-slate-600">
        <!-- รายการคำสั่งซื้อ -->
        <div class="p-2 h-full w-[80%] roundedmain bg-white">
          <div class="flex justify-between">
            <haeder class="textmain font-bold text-[20px]"
              >รายงานคำสั่งซื้อ</haeder
            >
            <div
              class="flex justify-center p-2 gap-2 rounded-full w-[120px] bg-[#878787]"
            >
              <i class="fa-solid fa-calendar-days"></i>
              <select name="" id="">
                <option value="">2023</option>
                <option value="">2022</option>
                <option value="">2021</option>
              </select>
            </div>
          </div>
          <div class="h-[90%] mt-2">
            <!-- Head -->
            <div class="w-full">
              <div class="flex gap-2">
                <h1 class="w-[15%]">หมายเลขคำสั่งซื้อ</h1>
                <h1 class="w-[15%] text-center">วัน/เวลา/สั่งซื้อ</h1>
                <h1 class="w-[15%] text-center">วัน/เวลา/คืนหรือยกเลิก</h1>
                <h1 class="w-[15%] text-center">ชื่อผู้สั่งซื้อ</h1>
                <h1 class="w-[15%] text-center">สินค้า</h1>
                <h1 class="w-[15%] text-center">ราคารวม</h1>
                <h1 class="w-[15%] text-center">หมายเหตุ</h1>
              </div>
              <hr class="border-[#2B1E28] border-[2px] rounded-full" />
            </div>
            <NuxtLink to="/product_return/[id]">
              <div
                class="w-full py-[4px] hover:bg-[#1C67AA]/20 border-b-[2px] border-[#2B1E28]"
                v-for="(order, data) in order"
                :key="data"
              >
                <div class="flex gap-2">
                  <h1 class="w-[15%] border-r-[2px] border-[#2B1E28]/50">
                    #{{ order.order_id }}
                  </h1>
                  <h1
                    class="w-[15%] text-center border-r-[2px] border-[#2B1E28]/50"
                  >
                    {{ order.created_at }}
                  </h1>
                  <h1
                    class="w-[15%] text-center border-r-[2px] border-[#2B1E28]/50"
                  >
                    {{ order.customer.username }}
                  </h1>
                  <h1
                    class="w-[15%] text-center border-r-[2px] border-[#2B1E28]/50"
                  >
                    {{}}
                  </h1>
                  <h1
                    class="w-[15%] text-center border-r-[2px] border-[#2B1E28]/50"
                  >
                    {{ order.total_amount }}
                  </h1>
                  <h1
                    class="w-[15%] text-center border-r-[2px] border-[#2B1E28]/50"
                  >
                    {{}}
                  </h1>
                  <div class="w-[15%] flex justify-between text-cente">
                    <h1 class="w-[85%] text-start truncate l-[10px]">
                      หมายเหตุ
                    </h1>
                    <NuxtLink to="/order/[id]">
                      <i class="fa-solid fa-ellipsis-vertical"></i>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
          <!-- paginate -->
          <div class="bg-slate-500 mt-2">paginate</div>
        </div>
        <div class="flex flex-col gap-2 h-full w-[20%]">
          <!-- ยอดรวมคำสั่งซื้อ -->
          <div class="bg-white w-full h-[40%] p-2 roundedmain">
            <h1 class="text-[20px] text-center font-bold">ววมทั้งหมด</h1>
            <hr class="hrpages ">
            <div class="bg-slate-500 flex items-center place-content-center h-[85%] ">
              graph
            </div>
          </div>
          <!-- ยอดรวมแต่ละประเภท -->
          <div class="bg-white w-full h-[60%] p-2 roundedmain">
            <h1 class="text-[20px] text-center font-bold">ประเภท</h1>
            <hr class="hrpages ">
            <div class="bg-slate-500 flex items-center place-content-center h-[85%] ">
              graph
            </div>
          </div>
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

<style>

</style>