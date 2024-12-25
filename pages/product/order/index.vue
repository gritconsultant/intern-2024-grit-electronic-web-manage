<template>
  <div class="w-full px-5">
    <div
      class="bg-[#765798]/60 w-full p-5 rounded-[20px] h-full flex flex-col gap-5"
    >
      <!-- search -->
      <div class="flex justify-between gap-5">
        <div class="bg-white p-2 w-full rounded-[50px] flex gap-5">
          <i class="fa-solid fa-magnifying-glass mt-[14px] pl-2"></i>
          <input
            class="w-full h-[40px]"
            type="search"
            key="name"
            placeholder="ค้นหารายการสินค้าที่ต้องการ"
          />
        </div>
        <!-- selector -->
        <div class="bg-[#765798] rounded-[50px] flex gap-[2px] p-2 text-white">
          <i class="fa-solid fa-filter mt-[15px]"></i>
          <select name="" id="" class="bg-[#765798]">
            <option value="\">ทั้งหมด</option>
          </select>
        </div>
        <!-- warn -->
        <div class="flex items-center">
          <i class="fa-solid fa-bell text-yellow-400"></i>
        </div>
      </div>

      <!-- Order -->
      <div
        class="p-5 bg-white rounded-[20px] text-black/70 flex flex-col gap-1 h-full"
      >
        <div class="flex justify-between">
          <h1 class="subheader">คำสั่งซื้อล่าสุด</h1>
          <p class="mt-[5px]">ทั้งหมด</p>
        </div>
        <div class="flex flex-col gap-2 h-full">
          <!-- Header Order -->
          <div
            class="flex gap-3 py-[2px] border-2 border-white border-b-black text-xs"
          >
            <div class="">หมายเลขคำสั่งซื้อ</div>
            <div class="w-[130px] text-center">วันที่</div>
            <div class="w-[130px] text-center">ชำระเงิน</div>
            <div class="w-[130px] text-center">สถานะ</div>
            <div class="w-[130px] text-center">ราคารวม</div>
            <div class="w-[130px] text-center">วิธีการชำระ</div>
            <div class="w-[240px] px-2">
              <span>หมายเเหตุ</span>
            </div>
          </div>
          <!-- Detail -->
          <div
            v-for="(data, order) in order"
            :key="order"
            class="flex gap-3 py-[2px] border-[1px] border-white border-b-black/40 text-xs"
          >
            <div class="w-[90px] bg-slate-400">#{{ data.order_id  }}</div>
            <div class="w-[130px] text-center bg-slate-400">
              {{ data.created_at }}
            </div>
            <div class="w-[130px] text-center bg-slate-300">
              {{ data.created_at }}
            </div>
            <div class="w-[130px] text-center bg-slate-200">
              {{ data.status }}
            </div>
            <div class="w-[130px] text-center bg-slate-400">
              {{ data.payment_status  }}
            </div>
            <div class="w-[130px] text-center bg-slate-300"></div>
            <div class="w-[240px] px-2 flex justify-between bg-slate-400">
              <span class="w-full truncate">หมายเเหตุ</span>
              <NuxtLink to="">
                <i class="fa-solid fa-ellipsis mt-[5px]"></i>
              </NuxtLink>
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
      "order_id": 12345,
      "customer": {
        "user_id": 101,
        "username": "john_doe",
        "email": "john_doe@example.com"
      },
      "total_amount": 1250,
      "currency": "USD",
      "status": "delivered",
      "created_at": "2024-12-15T08:30:00Z",
      "payment_status": "paid",
      "items": [
        {
          "product_id": 201,
          "product_name": "Smartphone X Pro",
          "quantity": 1,
          "price": 1000
        },
        {
          "product_id": 202,
          "product_name": "Wireless Headphones",
          "quantity": 1,
          "price": 250
        }
      ]
    },
    {
      "order_id": 12346,
      "customer": {
        "user_id": 102,
        "username": "jane_smith",
        "email": "jane_smith@example.com"
      },
      "total_amount": 500,
      "currency": "USD",
      "status": "pending",
      "created_at": "2024-12-18T09:00:00Z",
      "payment_status": "unpaid",
      "items": [
        {
          "product_id": 203,
          "product_name": "Smartwatch Y",
          "quantity": 2,
          "price": 250
        }
      ]
    }

]);
</script>

<style></style>
