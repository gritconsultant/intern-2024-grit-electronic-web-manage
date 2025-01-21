<template>
  <div class="defaultpages flex flex-col gap-2">
    <div class="flex items-center justify-between h-[8%] pl-[35px]">
      <h1 class="text-[20px] font-bold">รายการคำสั่งซื้อ</h1>
      <div
        class="flex justify-center mr-[40px] border-2 rounded-[5px] bg-white/50 w-[310px]"
      >
         <!-- filter order -->
         <div class=" ">
          <div class="relative group h-full">
            <div
              class="flex items-center p-[2px] rounded-full w-[200px] bg-[#EAA04B] h-full"
            >
              <button
                class="bg-[#F68D44] rounded-full flex justify-center items-center pt-[3px] w-[35px] h-full cursor-pointer"
                type="button"
              >
                <i class="fa-solid fa-filter text-[20px]"></i>
              </button>
              <div
                class="flex justify-center items-center font-bold text-[14px] w-[80%] pr-[10px] "
              >
                {{ selectedStatusOrder.status }}
              </div>
            </div>
            <!-- Dropdown manu -->
            <div
              class="absolute bg-white rounded-lg border shadow w-44 z-10 hidden group-hover:block"
            >
              <ul class="py-2 text-sm text-gray-700">
                <li
                  class="block px-4 py-2 hover:bg-gray-100"
                  v-for="(statusorder, i) in Statusorders"
                  :key="i"
                  @click="selectStatusOrder(statusorder)"
                >
                  {{ statusorder.status }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-[90%] pt-2 bg-white">
      <table class="flex flex-col px-8 gap-2 w-ful">
        <thead class="w-full">
          <tr class="flex gap-2">
            <th class="w-[15%] text-start">หมายเลขคำสั่งซื้อ</th>
            <th class="w-[15%]">วัน/เวลา</th>
            <th class="w-[15%]">ลูกค้า</th>
            <th class="w-[15%]">ราคารวม</th>
            <th class="w-[15%]">จำนวนรวม</th>
            <th class="w-[15%]">สถานะคำสั่งซื้อ</th>
            <th class="w-[5%]"></th>
          </tr>
        </thead>
        <tbody class="w-full" v-for="(order, data) in filteredOrder" :key="data">
          <tr class="flex gap-2 py-2 border-b-[1px]">
            <th class="w-[15%] text-start truncate">
              {{ order.order_id }}
            </th>
            <th class="w-[15%] truncate">{{ order.created_at }}</th>
            <th class="w-[15%] truncate">{{ order.customer.username }}</th>
            <th class="w-[15%] truncate">{{ order.total_amount }}</th>
            <th class="w-[15%] truncate">{{}}</th>
            <th class="w-[15%] flex items-center justify-center">
              <div class="flex flex-col items-center cursor-pointer">
                <div
                  class="p-[1px] px-2 border-[1px] rounded-[5px]"
                  @click="toggleMenu(order.order_id)"
                >
                  {{ order.status }}
                </div>
                <div>
                  <ul
                    class="absolute bg-white border-[1px] rounded-[20px] border-gray-400 dropshadowbottomsub p-[1px] w-[140px] h-[120px] -translate-x-[70px]"
                    v-if="isMenuVisible[order.order_id]"
                  >
                    <li
                      class="h-[25%] hover:bg-slate-300 rounded-t-[19px] flex items-center justify-center"
                      @click="changeStatus(order.order_id, 'รอการชำระ')"
                    >
                      รอการชำระ
                    </li>
                    <li
                      class="h-[25%] hover:bg-slate-300 flex items-center justify-center"
                      @click="changeStatus(order.order_id, 'กำลังจัดส่ง')"
                    >
                      กำลังจัดส่ง
                    </li>
                    <li
                      class="h-[25%] text-[14px] hover:bg-slate-300 flex items-center justify-center"
                      @click="changeStatus(order.order_id, 'จัดส่งเรียบร้อย')"
                    >
                      จัดส่งเรียบร้อย
                    </li>
                    <li
                      class="h-[25%] text-[14px] hover:bg-slate-300 rounded-b-[19px] flex items-center justify-center"
                      @click="changeStatus(order.order_id, 'ชำระล้มเหลว')"
                    >
                      ชำระล้มเหลว
                    </li>
                  </ul>
                </div>
              </div>
            </th>
            <th class="w-[5%] flex items-center justify-center">
              <NuxtLink
                to="/order/[id]"
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
import { ref, computed } from "vue";
import type { Order, StatusOrder } from "~/models/order.model";;

const isMenuVisible = ref<Record<number, boolean>>({}); // Store visibility state per order

// Toggle the visibility of the menu for a specific order
const toggleMenu = (orderId: number) => {
  // Toggle the menu visibility, close all other menus before opening the new one
  isMenuVisible.value = {
    ...Object.fromEntries(
      Object.keys(isMenuVisible.value).map((key) => [key, false])
    ), // Close all menus
    [orderId]: !isMenuVisible.value[orderId], // Toggle current order's menu
  };
};

// Update the status of the order
const changeStatus = (orderId: number, status: string) => {
  const order = orders.find((order) => order.order_id === orderId);
  if (order) {
    order.status = status; // Change the status of the order
    toggleMenu(orderId); // Close the dropdown menu after selection
  }
};

const orders = <Order[]>([
  {
      "order_id": 12345,
      "customer": {
        "user_id": 101,
        "username": "john_doe",
        "email": "john_doe@example.com"
      },
      "total_amount": 1250,
      "currency": "USD",
      "status": "รอชำระ",
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
      "order_id": 12345,
      "customer": {
        "user_id": 101,
        "username": "john_doe",
        "email": "john_doe@example.com"
      },
      "total_amount": 1250,
      "currency": "USD",
      "status": "กำลังจัดส่ง",
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
]);

// สร้างตัวแปรสำหรับหมวดหมู่ที่เลือก
const selectedStatusOrder = ref<StatusOrder>({
  id: 1,
  status: 'ทั้งหมด'
});



const Statusorders = ref<StatusOrder[]>([
  {
    id: 1,
    status: 'ทั้งหมด',
  },
  {
    id: 2,
    status: 'รอชำระ',
  },
  {
    id: 3,
    status: 'กำลังจัดส่ง',
  },
  {
    id: 4,
    status: 'จัดส่งแล้ว',
  },
  {
    id: 5,
    status: 'ชำระล้มเหลว',
  },
]);

// ฟังก์ชันเพื่อเลือกหมวดหมู่
const selectStatusOrder = (statusorder: StatusOrder) => {
  selectedStatusOrder.value = statusorder;
};

const filteredOrder = computed(() => {
  if (selectedStatusOrder.value.id === 1) {
    return orders; // ใช้ orders ได้เลย เพราะมันไม่ใช่ ref
  }
  return orders.filter(order => order.status === selectedStatusOrder.value.status); // เปลี่ยนเป็น `.status` เพื่อให้ตรงกับการเปรียบเทียบค่า
});

</script>

<style></style>
