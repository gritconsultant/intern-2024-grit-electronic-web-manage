<template>
  <div class="defaultpages">
    <div class="pages">
      <!-- Header -->

      <hr class="hrpages" />
      <Search />

      <div class="flex gap-2 p-1 h-[90%] w-full bg-slate-600">
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
          <hr class="hrpages" />
          <div class="bg-slate-600 h-[90%]">
            <!-- Head -->
            <div class="w-full">
              <div class="flex gap-2 bg-slate-500">
                <h1 class="w-[15%] bg-slate-400">หมายเลขคำสั่งซื้อ</h1>
                <h1 class="w-[15%] text-center bg-slate-400">วันที่</h1>
                <h1 class="w-[15%] text-center bg-slate-400">
                  ชื่อผู้สั่งซื้อ
                </h1>
                <h1 class="w-[15%] text-center bg-slate-400">ชื่อสินค้า</h1>
                <h1 class="w-[15%] text-center bg-slate-400">จำนวนรวม</h1>
                <h1 class="w-[15%] text-center bg-slate-400">ราคารวม</h1>
                <h1 class="w-[15%] text-center bg-slate-400">หมายเหตุ</h1>
              </div>
              <hr class="border-[#2B1E28] border-[2px] rounded-full my-1" />
            </div>
          </div>
          <!-- paginages -->
          <div></div>
        </div>
        <div class="flex flex-col gap-2 h-full w-[20%]">
          <!-- ยอดรวมคำสั่งซื้อ -->
          <div class="bg-white w-full h-[40%] roundedmain">1</div>
          <!-- ยอดรวมแต่ละประเภท -->
          <div class="bg-white w-full h-[60%] roundedmain">2</div>
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
]);
</script>

<style></style>
