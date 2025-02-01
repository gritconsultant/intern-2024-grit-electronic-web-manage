<template>
  <div class="defaultpages flex flex-col gap-3 p-6 bg-gray-50">
    <!-- Header Section -->
    <div
      class="flex justify-between items-center bg-white p-5 rounded-lg shadow-md"
    >
      <h1 class="text-2xl font-bold text-gray-800">รายการคำร้องขอคืนสินค้า</h1>
    </div>

    <!-- Search and Filter Section -->
    <div class="flex justify-between items-center gap-4 mt-2">
      <div class="flex gap-4 flex-1 items-end h-full">
        <!-- Search Bar -->
        <div class="relative w-[30%]">
          <input
            type="search"
            class="w-full h-10 pl-12 pr-4 rounded-full border border-orange-400 focus:ring-2 focus:ring-orange-500 outline-none text-gray-800"
            placeholder="ค้นหาคำร้องขอคืนสินค้า"
            v-model="filters.searchTerm"
          />
          <i
            class="fa-solid fa-magnifying-glass absolute left-4 top-2 text-gray-500 text-lg"
          ></i>
        </div>

        <!-- Date Filters -->
        <div class="flex items-center space-x-4">
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

        <!-- Status Filter -->
        <div class="relative group h-10">
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
              {{ selectedStatusRefund.status }}
            </div>
          </div>

          <!-- Dropdown Menu -->
          <div
            class="absolute bg-white rounded-lg border shadow w-44 z-10 hidden group-hover:block"
          >
            <ul class="py-2 text-sm text-gray-700">
              <li
                v-for="(statusrefund, i) in Statusrefund"
                :key="i"
                class="block px-4 py-2 hover:bg-gray-100"
                @click="selectStatusRefund(statusrefund)"
              >
                {{ statusrefund.status }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Table -->
    <div
      class="flex flex-col justify-between w-full h-[90%] pt-2 bg-white rounded-lg py-2 dropshadowbox"
    >
      <table class="flex flex-col px-8 gap-2 w-full">
        <thead class="w-full">
          <tr
            class="flex gap-5 border-b-[2px] pb-[4px] pt-[8px] border-gray-400"
          >
            <th class="w-[10%] text-start pl-2">หมายเลขคำร้อง</th>
            <th class="w-[10%] text-start pl-2">หมายเลขคำสั่งซื้อ</th>
            <th class="w-[15%] text-start pl-2">วัน/เวลา</th>
            <th class="w-[15%]">ลูกค้า</th>
            <th class="w-[15%]">จำนวนรวม</th>
            <th class="w-[15%]">ราคารวม</th>
            <th class="w-[15%]">สถานะคำร้อง</th>
            <th class="w-[5%]"></th>
          </tr>
        </thead>
        <tbody
          class="w-full"
          v-for="(order, index) in paginatedOrders"
          :key="index"
        >
          <tr class="flex gap-5 pb-2 border-b-[1px]">
            <th
              class="w-[10%] text-start pl-2 text-[15px] font-medium truncate"
            >
              {{ order.order_id }}
            </th>
            <th
              class="w-[10%] text-start pl-2 text-[15px] font-medium truncate"
            >
              {{ order.order_id }}
            </th>
            <th
              class="w-[15%] text-start pl-2 text-[15px] font-medium truncate"
            >
              {{ order.created_at }}
            </th>
            <th class="w-[15%] text-[15px] font-medium truncate"></th>
            <th class="w-[15%] text-[15px] font-medium truncate">
              {{ order.items.reduce((sum, item) => sum + item.quantity, 0) }}
            </th>
            <th class="w-[15%] text-[15px] font-medium truncate">
              {{ order.total_amount }}
            </th>
            <th class="w-[15%] text-[15px] font-medium truncate">
              <div class="flex flex-col items-center cursor-pointer">
                <div
                  v-if="order.status === 'รอการตรวจสอบ'"
                  class="w-[150px] p-[1px] px-2 border-[1px] rounded-[5px] bg-yellow-50 border-yellow-400"
                  @click="toggleMenu(order.order_id)"
                >
                  {{ order.status }}
                </div>
                <div
                  v-else-if="order.status === 'อนุมัติการคืนสินค้า'"
                  class="w-[150px] p-[1px] px-2 border-[1px] rounded-[5px] bg-orange-50 border-orange-400"
                  @click="toggleMenu(order.order_id)"
                >
                  {{ order.status }}
                </div>
                <div
                  v-else-if="order.status === 'การคืนเงินเสร็จสิ้น'"
                  class="w-[150px] p-[1px] px-2 border-[1px] rounded-[5px] bg-green-50 border-green-400"
                  @click="toggleMenu(order.order_id)"
                >
                  {{ order.status }}
                </div>
                <div
                  v-else
                  class="w-[150px] p-[1px] px-2 border-[1px] rounded-[5px] bg-red-50 border-red-600"
                  @click="toggleMenu(order.order_id)"
                >
                  {{ order.status }}
                </div>
                <div>
                  <ul
                    class="absolute bg-white border-[1px] rounded-[20px] border-gray-400 dropshadowbottomsub p-[1px] w-[140px] h-[120px] -translate-x-[70px]"
                    v-show="isMenuVisible[order.order_id]"
                  >
                    <li
                      class="h-[25%] hover:bg-slate-300 rounded-t-[19px] flex items-center justify-center"
                      @click="changeStatus(order.order_id, 'รอการตรวจสอบ')"
                      :class="{
                        'bg-gray-200': order.status === 'รอการตรวจสอบ',
                      }"
                    >
                      รอการตรวจสอบ
                    </li>
                    <li
                      class="h-[25%] hover:bg-slate-300 flex items-center justify-center"
                      @click="
                        changeStatus(order.order_id, 'อนุมัติการคืนสินค้า')
                      "
                      :class="{
                        'bg-gray-200': order.status === 'อนุมัติการคืนสินค้า',
                      }"
                    >
                      อนุมัติการคืนสินค้า
                    </li>
                    <li
                      class="h-[25%] text-[14px] hover:bg-slate-300 flex items-center justify-center"
                      @click="
                        changeStatus(order.order_id, 'การคืนเงินเสร็จสิ้น')
                      "
                      :class="{
                        'bg-gray-200': order.status === 'การคืนเงินเสร็จสิ้น',
                      }"
                    >
                      การคืนเงินเสร็จสิ้น
                    </li>
                    <li
                      class="h-[25%] text-[14px] hover:bg-slate-300 rounded-b-[19px] flex items-center justify-center"
                      @click="
                        changeStatus(order.order_id, 'ไม่อนุมัติการคืนสินค้า')
                      "
                      :class="{
                        'bg-gray-200':
                          order.status === 'ไม่อนุมัติการคืนสินค้า',
                      }"
                    >
                      ไม่อนุมัติการคืนสินค้า
                    </li>
                  </ul>
                </div>
              </div>
            </th>
            <th class="w-[5%] flex items-center justify-center">
              <NuxtLink
                to="/refund/[id]"
                class="flex items-center place-content-center justify-center rounded-[5px] h-[20px] w-[25px]"
              >
                <i class="fa-regular fa-eye text-[15px]"></i>
              </NuxtLink>
            </th>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <!-- Pagination -->
      <div class="flex justify-between items-center mt-5">
        <p class="text-sm text-gray-600">สินค้า {{}} จาก {{}}</p>
        <div class="flex gap-2">
          <button
            :disabled="currentPage === 1"
            class="px-3 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
          >
            ก่อนหน้า
          </button>
          <button
            class="px-3 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Order, StatusRefund } from "~/models/order.model";
import Swal from "sweetalert2";

// ตัวแปรสำหรับกรองข้อมูล
const filters = ref({
  startDate: "",
  endDate: "",
  searchTerm: "", // คำค้นหา
});

// ตัวแปรที่เก็บสถานะการแสดงเมนูของคำสั่งซื้อแต่ละรายการ
const isMenuVisible = ref<Record<number, boolean>>({});

// ฟังก์ชันที่ใช้สำหรับเปิด/ปิดเมนูของคำสั่งซื้อ
const toggleMenu = (orderId: number) => {
  // เปิด/ปิดเมนูคำสั่งซื้อ โดยปิดทุกเมนูที่เหลือก่อน
  isMenuVisible.value = {
    ...Object.fromEntries(
      Object.keys(isMenuVisible.value).map((key) => [key, false])
    ), // ปิดเมนูทั้งหมด
    [orderId]: !isMenuVisible.value[orderId], // เปิด/ปิดเมนูคำสั่งซื้อที่เลือก
  };
};

// ฟังก์ชันสำหรับเปลี่ยนสถานะของคำสั่งซื้อ
const changeStatus = (orderId: number, status: string) => {
  const order = orders.find((order) => order.order_id === orderId);

  if (order) {
    if (order.status === status) {
      Swal.fire("ไม่สามารถเปลี่ยนสถานะ", "สถานะนี้ได้ถูกตั้งไว้แล้ว", "info");
      return;
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
        order.status = status; // เปลี่ยนสถานะ
        toggleMenu(orderId); // ปิดเมนู
        Swal.fire("สำเร็จ!", `สถานะถูกเปลี่ยนเป็น "${status}" แล้ว`, "success");
      }
    });
  }
};

// กำหนดค่าเริ่มต้นให้ selectedStatusRefund
const selectedStatusRefund = ref<StatusRefund>({
  id: 1,
  status: "ทั้งหมด",
});

// รายการสถานะการคืนสินค้า
const Statusrefund = ref<StatusRefund[]>([
  { id: 1, status: "ทั้งหมด" },
  { id: 2, status: "รอการตรวจสอบ" },
  { id: 3, status: "อนุมัติการคืนสินค้า" },
  { id: 4, status: "การคืนเงินเสร็จสิ้น" },
  { id: 5, status: "ไม่อนุมัติการคืนสินค้า" },
]);

// ฟังก์ชันสำหรับเลือกสถานะการคืนสินค้า
const selectStatusRefund = (statusrefund: StatusRefund) => {
  selectedStatusRefund.value = statusrefund;
};

// ฟิลเตอร์คำสั่งซื้อ (Orders) ตามวันที่และสถานะ
const filteredOrders = computed(() => {
  let result = orders;

  if (selectedStatusRefund.value && selectedStatusRefund.value.id !== 1) {
    result = result.filter(
      (order) => order.status === selectedStatusRefund.value.status
    );
  }

  const startDate = filters.value.startDate
    ? new Date(filters.value.startDate)
    : null;
  const endDate = filters.value.endDate
    ? new Date(filters.value.endDate)
    : null;

  result = result.filter((order) => {
    const orderDate = new Date(order.created_at);
    return (
      (!startDate || orderDate >= startDate) &&
      (!endDate || orderDate <= endDate)
    );
  });

  return result;
});

// ตัวแปรสำหรับแบ่งหน้า
const currentPage = ref(1);
const itemsPerPage = 15; // จำนวนคำสั่งซื้อที่จะแสดงในแต่ละหน้า

// ฟังก์ชันสำหรับแบ่งหน้า
const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = currentPage.value * itemsPerPage;
  return filteredOrders.value.slice(start, end);
});

// คำนวณจำนวนหน้าทั้งหมด
const totalPages = computed(() => {
  return Math.ceil(filteredOrders.value.length / itemsPerPage);
});

// ฟังก์ชันสำหรับเปลี่ยนหน้า
const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const orders = <Order[]>[
  {
    order_id: 12346,
    total_amount: 500,
    currency: "USD",
    status: "รอการตรวจสอบ",
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
    order_id: 12347,
    customer: {
      user_id: 103,
      username: "john_doe",
      email: "john_doe@example.com",
    },
    total_amount: 300,
    currency: "USD",
    status: "รอการตรวจสอบ",
    created_at: "2024-12-19T09:00:00Z",
    payment_status: "unpaid",
    items: [
      {
        product_id: 204,
        product_name: "Smartphone X",
        quantity: 1,
        price: 300,
      },
    ],
  },
  {
    order_id: 12348,
    customer: {
      user_id: 104,
      username: "alice_wong",
      email: "alice_wong@example.com",
    },
    total_amount: 750,
    currency: "USD",
    status: "อนุมัติการคืนสินค้า",
    created_at: "2024-12-20T09:00:00Z",
    payment_status: "unpaid",
    items: [
      {
        product_id: 205,
        product_name: "Laptop Z",
        quantity: 1,
        price: 750,
      },
    ],
  },
  {
    order_id: 12349,
    customer: {
      user_id: 105,
      username: "bob_lee",
      email: "bob_lee@example.com",
    },
    total_amount: 400,
    currency: "USD",
    status: "การคืนเงินเสร็จสิ้น",
    created_at: "2024-12-21T09:00:00Z",
    payment_status: "unpaid",
    items: [
      {
        product_id: 206,
        product_name: "Tablet P",
        quantity: 1,
        price: 400,
      },
    ],
  },
  {
    order_id: 12350,
    customer: {
      user_id: 106,
      username: "carol_jones",
      email: "carol_jones@example.com",
    },
    total_amount: 200,
    currency: "USD",
    status: "ไม่อนุมัติการคืนสินค้า",
    created_at: "2024-12-22T09:00:00Z",
    payment_status: "unpaid",
    items: [
      {
        product_id: 207,
        product_name: "Wireless Headphones",
        quantity: 1,
        price: 200,
      },
    ],
  },
  {
    order_id: 12351,
    customer: {
      user_id: 107,
      username: "emma_white",
      email: "emma_white@example.com",
    },
    total_amount: 550,
    currency: "USD",
    status: "รอพิจารณา",
    created_at: "2024-12-23T09:00:00Z",
    payment_status: "unpaid",
    items: [
      {
        product_id: 208,
        product_name: "4K TV",
        quantity: 1,
        price: 550,
      },
    ],
  },
  {
    order_id: 12352,
    customer: {
      user_id: 108,
      username: "david_brown",
      email: "david_brown@example.com",
    },
    total_amount: 180,
    currency: "USD",
    status: "รอการตรวจสอบ",
    created_at: "2024-12-24T09:00:00Z",
    payment_status: "unpaid",
    items: [
      {
        product_id: 209,
        product_name: "Bluetooth Speaker",
        quantity: 1,
        price: 180,
      },
    ],
  },
  {
    order_id: 12353,
    customer: {
      user_id: 109,
      username: "lucas_smith",
      email: "lucas_smith@example.com",
    },
    total_amount: 400,
    currency: "USD",
    status: "อนุมัติการคืนสินค้า",
    created_at: "2024-12-25T09:00:00Z",
    payment_status: "unpaid",
    items: [
      {
        product_id: 210,
        product_name: "Gaming Console",
        quantity: 1,
        price: 400,
      },
    ],
  },
  {
    order_id: 12354,
    customer: {
      user_id: 110,
      username: "joshua_lee",
      email: "joshua_lee@example.com",
    },
    total_amount: 150,
    currency: "USD",
    status: "การคืนเงินเสร็จสิ้น",
    created_at: "2024-12-26T09:00:00Z",
    payment_status: "unpaid",
    items: [
      {
        product_id: 211,
        product_name: "Smartphone Charger",
        quantity: 2,
        price: 75,
      },
    ],
  },
  {
    order_id: 12355,
    customer: {
      user_id: 111,
      username: "michael_jones",
      email: "michael_jones@example.com",
    },
    total_amount: 450,
    currency: "USD",
    status: "ไม่อนุมัติการคืนสินค้า",
    created_at: "2024-12-27T09:00:00Z",
    payment_status: "unpaid",
    items: [
      {
        product_id: 212,
        product_name: "Gaming Laptop",
        quantity: 1,
        price: 450,
      },
    ],
  },
  {
    order_id: 12356,
    customer: {
      user_id: 112,
      username: "susan_clark",
      email: "susan_clark@example.com",
    },
    total_amount: 600,
    currency: "USD",
    status: "รอพิจารณา",
    created_at: "2024-12-28T09:00:00Z",
    payment_status: "unpaid",
    items: [
      {
        product_id: 213,
        product_name: "Digital Camera",
        quantity: 1,
        price: 600,
      },
    ],
  },
  {
    order_id: 12357,
    customer: {
      user_id: 113,
      username: "olivia_harris",
      email: "olivia_harris@example.com",
    },
    total_amount: 220,
    currency: "USD",
    status: "รอการตรวจสอบ",
    created_at: "2024-12-29T09:00:00Z",
    payment_status: "unpaid",
    items: [
      {
        product_id: 214,
        product_name: "Wireless Mouse",
        quantity: 2,
        price: 110,
      },
    ],
  },
  {
    order_id: 12358,
    customer: {
      user_id: 114,
      username: "matthew_garcia",
      email: "matthew_garcia@example.com",
    },
    total_amount: 550,
    currency: "USD",
    status: "อนุมัติการคืนสินค้า",
    created_at: "2024-12-30T09:00:00Z",
    payment_status: "unpaid",
    items: [
      {
        product_id: 215,
        product_name: "Smartwatch Z",
        quantity: 1,
        price: 550,
      },
    ],
  },
  {
    order_id: 12359,
    customer: {
      user_id: 115,
      username: "isabella_king",
      email: "isabella_king@example.com",
    },
    total_amount: 350,
    currency: "USD",
    status: "การคืนเงินเสร็จสิ้น",
    created_at: "2025-01-02T09:00:00Z",
    payment_status: "unpaid",
    items: [
      {
        product_id: 216,
        product_name: "Bluetooth Earbuds",
        quantity: 1,
        price: 350,
      },
    ],
  },
  {
    order_id: 12360,
    customer: {
      user_id: 116,
      username: "noah_martinez",
      email: "noah_martinez@example.com",
    },
    total_amount: 500,
    currency: "USD",
    status: "รอพิจารณา",
    created_at: "2025-01-03T09:00:00Z",
    payment_status: "unpaid",
    items: [
      {
        product_id: 217,
        product_name: "Smartphone Case",
        quantity: 2,
        price: 250,
      },
    ],
  },
  {
    order_id: 12361,
    customer: {
      user_id: 117,
      username: "mia_rodriguez",
      email: "mia_rodriguez@example.com",
    },
    total_amount: 600,
    currency: "USD",
    status: "รอการตรวจสอบ",
    created_at: "2025-01-04T09:00:00Z",
    payment_status: "unpaid",
    items: [
      {
        product_id: 218,
        product_name: "Smartwatch",
        quantity: 1,
        price: 600,
      },
    ],
  },
  {
    order_id: 12362,
    customer: {
      user_id: 118,
      username: "lily_gonzalez",
      email: "lily_gonzalez@example.com",
    },
    total_amount: 800,
    currency: "USD",
    status: "อนุมัติการคืนสินค้า",
    created_at: "2025-01-05T09:00:00Z",
    payment_status: "unpaid",
    items: [
      {
        product_id: 219,
        product_name: "Gaming Headset",
        quantity: 1,
        price: 800,
      },
    ],
  },
  {
    order_id: 12363,
    customer: {
      user_id: 119,
      username: "jackson_williams",
      email: "jackson_williams@example.com",
    },
    total_amount: 400,
    currency: "USD",
    status: "การคืนเงินเสร็จสิ้น",
    created_at: "2025-01-06T09:00:00Z",
    payment_status: "unpaid",
    items: [
      {
        product_id: 220,
        product_name: "Laptop Sleeve",
        quantity: 1,
        price: 400,
      },
    ],
  },
  {
    order_id: 12364,
    customer: {
      user_id: 120,
      username: "ella_johnson",
      email: "ella_johnson@example.com",
    },
    total_amount: 350,
    currency: "USD",
    status: "ไม่อนุมัติการคืนสินค้า",
    created_at: "2025-01-07T09:00:00Z",
    payment_status: "unpaid",
    items: [
      {
        product_id: 221,
        product_name: "Portable Charger",
        quantity: 2,
        price: 175,
      },
    ],
  },
  {
    order_id: 12365,
    customer: {
      user_id: 121,
      username: "ethan_smith",
      email: "ethan_smith@example.com",
    },
    total_amount: 900,
    currency: "USD",
    status: "รอพิจารณา",
    created_at: "2025-01-08T09:00:00Z",
    payment_status: "unpaid",
    items: [
      {
        product_id: 222,
        product_name: "Bluetooth Speaker Pro",
        quantity: 1,
        price: 900,
      },
    ],
  },
  {
    order_id: 12366,
    customer: {
      user_id: 122,
      username: "lucas_miller",
      email: "lucas_miller@example.com",
    },
    total_amount: 450,
    currency: "USD",
    status: "รอการตรวจสอบ",
    created_at: "2025-01-09T09:00:00Z",
    payment_status: "unpaid",
    items: [
      {
        product_id: 223,
        product_name: "Wireless Mouse",
        quantity: 1,
        price: 450,
      },
    ],
  },
  {
    order_id: 12367,
    customer: {
      user_id: 123,
      username: "sophia_martinez",
      email: "sophia_martinez@example.com",
    },
    total_amount: 500,
    currency: "USD",
    status: "อนุมัติการคืนสินค้า",
    created_at: "2025-01-10T09:00:00Z",
    payment_status: "unpaid",
    items: [
      {
        product_id: 224,
        product_name: "Smartphone Screen Protector",
        quantity: 1,
        price: 500,
      },
    ],
  },
  {
    order_id: 12368,
    customer: {
      user_id: 124,
      username: "oliver_thomas",
      email: "oliver_thomas@example.com",
    },
    total_amount: 320,
    currency: "USD",
    status: "การคืนเงินเสร็จสิ้น",
    created_at: "2025-01-11T09:00:00Z",
    payment_status: "unpaid",
    items: [
      {
        product_id: 225,
        product_name: "Laptop Stand",
        quantity: 2,
        price: 160,
      },
    ],
  },
  {
    order_id: 12369,
    customer: {
      user_id: 125,
      username: "madison_white",
      email: "madison_white@example.com",
    },
    total_amount: 700,
    currency: "USD",
    status: "ไม่อนุมัติการคืนสินค้า",
    created_at: "2025-01-12T09:00:00Z",
    payment_status: "unpaid",
    items: [
      {
        product_id: 226,
        product_name: "Drone Camera",
        quantity: 1,
        price: 700,
      },
    ],
  },
];
</script>

<style scoped></style>
