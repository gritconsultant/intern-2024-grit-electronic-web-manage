<template>
  <div class="defaultpages flex flex-col gap-2">
    <div class="flex items-center justify-between h-[8%] pl-[35px]">
      <h1 class="text-[25px] font-bold">รายการคำสั่งซื้อ</h1>
      <div class="flex justify-end mr-[30px] rounded-[5px] w-[70%]">
        <div class="flex justify-end gap-5 w-full">
          <div class="flex items-end w-[50%]">
            <Search v-model="filters.searchTerm" />
          </div>
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
          <div class="flex items-end">
            <!-- filter order -->
            <div class="relative group h-[70%]">
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
                  class="flex justify-center items-center font-bold text-[14px] w-[80%] pr-[10px]"
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
    </div>

    <div class="w-full h-[90%] pt-2 bg-white dropshadowtop">
      <table class="flex flex-col px-8 gap-2 w-full">
        <thead class="w-full">
          <tr
            class="flex gap-5 border-b-[2px] pb-[4px] pt-[8px] border-gray-400"
          >
            <th class="w-[10%] text-start pl-2">หมายเลขคำสั่งซื้อ</th>
            <th class="w-[12%] text-start pl-2">วัน/เวลา</th>
            <th class="w-[15%] text-start pl-2">ลูกค้า</th>
            <th class="w-[20%] text-start pl-2">ที่อยู่</th>
            <th class="w-[10%] text-start pl-2">ราคารวม</th>
            <th class="w-[10%] text-start pl-2">จำนวนรวม</th>
            <th class="w-[10%]">สถานะคำสั่งซื้อ</th>
            <th class="w-[3%] text-start pl-2"></th>
          </tr>
        </thead>
        <tbody
          class="w-full"
          v-for="(order, index) in filteredOrder"
          :key="index"
        >
          <tr class="flex gap-5 pb-2 border-b-[1px]">
            <th
              class="w-[10%] text-start pl-2 truncate text-[15px] font-medium"
            >
              {{ order.order_id }}
            </th>
            <th
              class="w-[12%] text-[15px] text-start pl-2 font-medium truncate"
            >
              {{ order.created_at }}
            </th>
            <th
              class="w-[15%] text-[15px] text-start pl-2 font-medium truncate"
            >
              {{ order.customer.username }}
            </th>
            <th
              class="w-[20%] text-[15px] text-start pl-2 font-medium truncate"
            >
              ที่อยู่{{}}
            </th>
            <th
              class="w-[10%] text-[15px] text-start pl-2 font-medium truncate"
            >
              {{ order.total_amount }}
            </th>
            <th
              class="w-[10%] text-[15px] text-start pl-2 font-medium truncate"
            >
              {{}}
            </th>
            <th
              class="w-[10%] text-[15px] font-medium flex items-center justify-center"
            >
              <div class="flex flex-col items-center cursor-pointer">
                <!-- ส่วนแสดงสถานะ -->
                <div
                  class="w-[120px] p-[1px] px-2 border-[1px] rounded-[5px]"
                  @click="toggleMenu(order.order_id)"
                >
                  {{ order.status }}
                </div>

                <!-- เมนูเลือกสถานะ -->
                <div>
                  <ul
                    class="absolute bg-white border-[1px] rounded-[20px] border-gray-400 dropshadowbottomsub p-[1px] w-[140px] h-[120px] -translate-x-[70px]"
                    v-show="isMenuVisible[order.order_id]"
                  >
                    <!-- ตรวจสอบว่าไม่ใช่สถานะปัจจุบัน -->
                    <li
                      class="h-[25%] hover:bg-slate-300 rounded-t-[19px] flex items-center justify-center"
                      @click="changeStatus(order.order_id, 'รอการชำระ')"
                      :class="{ 'bg-gray-200': order.status === 'รอการชำระ' }"
                      :disabled="order.status === 'รอการชำระ'"
                    >
                      รอการชำระ
                    </li>
                    <li
                      class="h-[25%] hover:bg-slate-300 flex items-center justify-center"
                      @click="changeStatus(order.order_id, 'กำลังจัดส่ง')"
                      :class="{ 'bg-gray-200': order.status === 'กำลังจัดส่ง' }"
                      :disabled="order.status === 'กำลังจัดส่ง'"
                    >
                      กำลังจัดส่ง
                    </li>
                    <li
                      class="h-[25%] text-[14px] hover:bg-slate-300 flex items-center justify-center"
                      @click="changeStatus(order.order_id, 'จัดส่งเรียบร้อย')"
                      :class="{
                        'bg-gray-200': order.status === 'จัดส่งเรียบร้อย',
                      }"
                      :disabled="order.status === 'จัดส่งเรียบร้อย'"
                    >
                      จัดส่งเรียบร้อย
                    </li>
                    <li
                      class="h-[25%] text-[14px] hover:bg-slate-300 rounded-b-[19px] flex items-center justify-center"
                      @click="changeStatus(order.order_id, 'ชำระล้มเหลว')"
                      :class="{ 'bg-gray-200': order.status === 'ชำระล้มเหลว' }"
                      :disabled="order.status === 'ชำระล้มเหลว'"
                    >
                      ชำระล้มเหลว
                    </li>
                  </ul>
                </div>
              </div>
            </th>
            <th class="w-[3%] flex items-center justify-center">
              <NuxtLink
                to="/order/[id]"
                class="flex items-center place-content-center justify-center rounded-[5px] h-[20px] w-[25px]"
              >
                <i class="fa-regular fa-eye text-[15px]"></i>
              </NuxtLink>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Order, StatusOrder } from "~/models/order.model";
import Swal from "sweetalert2";

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

const changeStatus = (orderId: number, status: string) => {
  // Find the order by ID
  const order = orders.find((order) => order.order_id === orderId);

  if (order) {
    // Check if the new status is different from the current one
    if (order.status === status) {
      Swal.fire("ไม่สามารถเปลี่ยนสถานะ", "สถานะนี้ได้ถูกตั้งไว้แล้ว", "info");
      return; // Stop execution if the status is the same
    }

    Swal.fire({
      title: "ยืนยันการเปลี่ยนสถานะ",
      text: `คุณต้องการเปลี่ยนสถานะเป็น "${status}" ใช่หรือไม่?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        order.status = status; // Update status
        toggleMenu(orderId); // Close menu
        Swal.fire("สำเร็จ!", `สถานะถูกเปลี่ยนเป็น "${status}" แล้ว`, "success");
      }
    });
  }
};

const filters = ref({
  startDate: "",
  endDate: "",
  searchTerm: "", // คำค้นหา
});

// สร้างตัวแปรสำหรับหมวดหมู่ที่เลือก
const selectedStatusOrder = ref<StatusOrder>({
  id: 1,
  status: "ทั้งหมด",
});

const Statusorders = ref<StatusOrder[]>([
  {
    id: 1,
    status: "ทั้งหมด",
  },
  {
    id: 2,
    status: "รอการชำระ",
  },
  {
    id: 3,
    status: "กำลังจัดส่ง",
  },
  {
    id: 4,
    status: "จัดส่งแล้ว",
  },
  {
    id: 5,
    status: "ชำระล้มเหลว",
  },
]);

// ฟังก์ชันเพื่อเลือกหมวดหมู่
const selectStatusOrder = (statusorder: StatusOrder) => {
  selectedStatusOrder.value = statusorder;
};

const filteredOrder = computed(() => {
  let filteredOrders = orders;

  // Filter by status
  if (selectedStatusOrder.value.id !== 1) {
    filteredOrders = filteredOrders.filter(
      (order) => order.status === selectedStatusOrder.value.status
    );
  }

  // Filter by start date
  if (filters.value.startDate) {
    filteredOrders = filteredOrders.filter(
      (order) => new Date(order.created_at) >= new Date(filters.value.startDate)
    );
  }

  // Filter by end date
  if (filters.value.endDate) {
    filteredOrders = filteredOrders.filter(
      (order) => new Date(order.created_at) <= new Date(filters.value.endDate)
    );
  }

  if (filters.value.searchTerm) {
    const term = filters.value.searchTerm.toLowerCase();

    filteredOrders = filteredOrders.filter((order) => {
      return (
        order.order_id.toString().includes(term) || // ตรวจสอบ order_id
        (order.customer.username &&
          order.customer.username.toLowerCase().includes(term)) || // ตรวจสอบ username
        (order.customer.email &&
          order.customer.email.toLowerCase().includes(term)) // ตรวจสอบ email
      );
    });
    console.log("Search Term:", filters.value.searchTerm);
    console.log("Filtered Orders:", filteredOrders);
  }

  return filteredOrders;
});

const orders = <Order[]>[
  {
    order_id: 12346,
    customer: {
      user_id: 102,
      username: "alice_smith",
      email: "alice_smith@example.com",
    },
    total_amount: 800,
    currency: "USD",
    status: "รอการชำระ",
    created_at: "2024-12-16T09:00:00Z",
    payment_status: "pending",
    items: [
      {
        product_id: 203,
        product_name: "Tablet Y",
        quantity: 1,
        price: 800,
      },
    ],
  },
  {
    order_id: 12347,
    customer: {
      user_id: 103,
      username: "bob_brown",
      email: "bob_brown@example.com",
    },
    total_amount: 1500,
    currency: "USD",
    status: "กำลังจัดส่ง",
    created_at: "2024-12-17T10:30:00Z",
    payment_status: "paid",
    items: [
      {
        product_id: 204,
        product_name: "Gaming Laptop Z",
        quantity: 1,
        price: 1500,
      },
    ],
  },
  {
    order_id: 12348,
    customer: {
      user_id: 104,
      username: "charlie_johnson",
      email: "charlie_johnson@example.com",
    },
    total_amount: 300,
    currency: "USD",
    status: "จักส่งเรียบร้อย",
    created_at: "2024-12-18T11:00:00Z",
    payment_status: "paid",
    items: [
      {
        product_id: 205,
        product_name: "Smartwatch W",
        quantity: 1,
        price: 300,
      },
    ],
  },
  {
    order_id: 12349,
    customer: {
      user_id: 105,
      username: "david_white",
      email: "david_white@example.com",
    },
    total_amount: 2000,
    currency: "USD",
    status: "ชำระล้มเหลว",
    created_at: "2024-12-19T12:15:00Z",
    payment_status: "failed",
    items: [
      {
        product_id: 206,
        product_name: "Desktop PC X",
        quantity: 1,
        price: 2000,
      },
    ],
  },
  {
    order_id: 12350,
    customer: {
      user_id: 106,
      username: "emily_clark",
      email: "emily_clark@example.com",
    },
    total_amount: 150,
    currency: "USD",
    status: "กำลังจัดส่ง",
    created_at: "2024-12-20T13:45:00Z",
    payment_status: "paid",
    items: [
      {
        product_id: 207,
        product_name: "Bluetooth Speaker",
        quantity: 1,
        price: 150,
      },
    ],
  },
  {
    order_id: 12351,
    customer: {
      user_id: 107,
      username: "frank_harris",
      email: "frank_harris@example.com",
    },
    total_amount: 450,
    currency: "USD",
    status: "รอการชำระ",
    created_at: "2024-12-21T14:30:00Z",
    payment_status: "pending",
    items: [
      {
        product_id: 208,
        product_name: "4K Monitor",
        quantity: 1,
        price: 450,
      },
    ],
  },
  {
    order_id: 12352,
    customer: {
      user_id: 108,
      username: "grace_miller",
      email: "grace_miller@example.com",
    },
    total_amount: 2500,
    currency: "USD",
    status: "จักส่งเรียบร้อย",
    created_at: "2024-12-22T15:00:00Z",
    payment_status: "paid",
    items: [
      {
        product_id: 209,
        product_name: "High-End Camera",
        quantity: 1,
        price: 2500,
      },
    ],
  },
  {
    order_id: 12353,
    customer: {
      user_id: 109,
      username: "harry_adams",
      email: "harry_adams@example.com",
    },
    total_amount: 600,
    currency: "USD",
    status: "ชำระล้มเหลว",
    created_at: "2024-12-23T16:00:00Z",
    payment_status: "failed",
    items: [
      {
        product_id: 210,
        product_name: "VR Headset",
        quantity: 1,
        price: 600,
      },
    ],
  },
  {
    order_id: 12354,
    customer: {
      user_id: 110,
      username: "isabel_james",
      email: "isabel_james@example.com",
    },
    total_amount: 1200,
    currency: "USD",
    status: "รอการชำระ",
    created_at: "2024-12-24T17:30:00Z",
    payment_status: "pending",
    items: [
      {
        product_id: 211,
        product_name: "Drone X",
        quantity: 1,
        price: 1200,
      },
    ],
  },
  {
    order_id: 12355,
    customer: {
      user_id: 111,
      username: "julia_scott",
      email: "julia_scott@example.com",
    },
    total_amount: 3000,
    currency: "USD",
    status: "กำลังจัดส่ง",
    created_at: "2024-12-25T18:00:00Z",
    payment_status: "paid",
    items: [
      {
        product_id: 212,
        product_name: "Gaming PC Ultimate",
        quantity: 1,
        price: 3000,
      },
    ],
  },
  {
    order_id: 12356,
    customer: {
      user_id: 112,
      username: "luke_wilson",
      email: "luke_wilson@example.com",
    },
    total_amount: 800,
    currency: "USD",
    status: "รอการชำระ",
    created_at: "2024-12-26T19:15:00Z",
    payment_status: "pending",
    items: [
      {
        product_id: 213,
        product_name: "Smart TV",
        quantity: 1,
        price: 800,
      },
    ],
  },
  {
    order_id: 12357,
    customer: {
      user_id: 113,
      username: "mia_king",
      email: "mia_king@example.com",
    },
    total_amount: 1200,
    currency: "USD",
    status: "จักส่งเรียบร้อย",
    created_at: "2024-12-27T20:00:00Z",
    payment_status: "paid",
    items: [
      {
        product_id: 214,
        product_name: "Laptop Pro",
        quantity: 1,
        price: 1200,
      },
    ],
  },
  {
    order_id: 12358,
    customer: {
      user_id: 114,
      username: "sophia_baker",
      email: "sophia_baker@example.com",
    },
    total_amount: 950,
    currency: "USD",
    status: "กำลังจัดส่ง",
    created_at: "2024-12-28T21:30:00Z",
    payment_status: "paid",
    items: [
      {
        product_id: 215,
        product_name: "Wireless Charger",
        quantity: 1,
        price: 950,
      },
    ],
  },
  {
    order_id: 12359,
    customer: {
      user_id: 115,
      username: "noah_taylor",
      email: "noah_taylor@example.com",
    },
    total_amount: 500,
    currency: "USD",
    status: "ชำระล้มเหลว",
    created_at: "2024-12-29T22:15:00Z",
    payment_status: "failed",
    items: [
      {
        product_id: 216,
        product_name: "Fitness Tracker",
        quantity: 1,
        price: 500,
      },
    ],
  },
  {
    order_id: 12360,
    customer: {
      user_id: 116,
      username: "olivia_morris",
      email: "olivia_morris@example.com",
    },
    total_amount: 1750,
    currency: "USD",
    status: "รอการชำระ",
    created_at: "2024-12-30T23:00:00Z",
    payment_status: "pending",
    items: [
      {
        product_id: 217,
        product_name: "Smartphone Y",
        quantity: 1,
        price: 1750,
      },
    ],
  },
  {
    order_id: 12361,
    customer: {
      user_id: 117,
      username: "ella_jackson",
      email: "ella_jackson@example.com",
    },
    total_amount: 650,
    currency: "USD",
    status: "กำลังจัดส่ง",
    created_at: "2024-12-31T00:30:00Z",
    payment_status: "paid",
    items: [
      {
        product_id: 218,
        product_name: "Noise Cancelling Earbuds",
        quantity: 1,
        price: 650,
      },
    ],
  },
  {
    order_id: 12362,
    customer: {
      user_id: 118,
      username: "james_brown",
      email: "james_brown@example.com",
    },
    total_amount: 2200,
    currency: "USD",
    status: "จักส่งเรียบร้อย",
    created_at: "2025-01-01T01:15:00Z",
    payment_status: "paid",
    items: [
      {
        product_id: 219,
        product_name: "High-Performance Desktop",
        quantity: 1,
        price: 2200,
      },
    ],
  },
  {
    order_id: 12363,
    customer: {
      user_id: 119,
      username: "lucas_lee",
      email: "lucas_lee@example.com",
    },
    total_amount: 950,
    currency: "USD",
    status: "ชำระล้มเหลว",
    created_at: "2025-01-02T02:00:00Z",
    payment_status: "failed",
    items: [
      {
        product_id: 220,
        product_name: "Smart Home Hub",
        quantity: 1,
        price: 950,
      },
    ],
  },
];
</script>

<style></style>
