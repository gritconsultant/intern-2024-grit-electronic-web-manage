<template>
  <div class="defaultpages flex flex-col gap-2">
    <div class="flex items-center justify-between h-[8%] pl-[35px]">
      <h1 class="text-[25px] font-bold">รายการคำร้องขอคืนสินค้า</h1>
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
                  {{ selectedStatusRefund.status }}
                </div>
              </div>
              <!-- Dropdown manu -->
              <div
                class="absolute bg-white rounded-lg border shadow w-44 z-10 hidden group-hover:block"
              >
                <ul class="py-2 text-sm text-gray-700">
                  <li
                    class="block px-4 py-2 hover:bg-gray-100"
                    v-for="(statusrefund, i) in Statusrefund"
                    :key="i"
                    @click="selectStatusRefund(statusrefund)"
                  >
                    {{ statusrefund.status }}
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
        <thead class="w-full border-b-[2px] pb-[4px] pt-[8px] border-gray-400">
          <tr class="flex gap-2">
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
          v-for="(order, index) in filteredOrders"
          :key="index"
        >
          <tr class="flex gap-2 py-2 border-b-[1px]">
            <th class="w-[10%] text-start pl-2 truncate">
              {{ order.order_id }}
            </th>
            <th class="w-[10%] text-start pl-2 truncate">
              {{ order.order_id }}
            </th>
            <th class="w-[15%] text-start pl-2 truncate">
              {{ order.created_at }}
            </th>
            <th class="w-[15%] truncate">{{ order.customer.username }}</th>
            <th class="w-[15%] truncate">
              {{ order.items.reduce((sum, item) => sum + item.quantity, 0) }}
            </th>
            <th class="w-[15%] truncate">{{ order.total_amount }}</th>
            <th class="w-[15%] truncate">
              <div class="flex flex-col items-center cursor-pointer">
                <div
                  class="p-[1px] px-2 w-[180px] border-[1px] rounded-[5px]"
                  @click="toggleMenu(order.order_id)"
                >
                  {{ order.status }}
                </div>
              </div>
            </th>
            <th class="w-[5%] flex items-center justify-center">
              <NuxtLink
                to="/refund/[id]"
                class="flex items-center place-content-center justify-center rounded-[5px] h-[20px] w-[25px]"
              >
                <i class="fa-regular fa-eye text-[20px]"></i>
              </NuxtLink>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Order, StatusRefund } from "~/models/order.model";

const filters = ref({
  startDate: "",
  endDate: "",
  searchTerm: "", // คำค้นหา
});

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

// กำหนดค่าเริ่มต้นให้ selectedStatusRefund
const selectedStatusRefund = ref<StatusRefund>({
  id: 1, // หรือค่าที่เหมาะสมกับสถานะเริ่มต้น
  status: "ทั้งหมด", // ค่าตามที่ต้องการ
});

// สมมติว่า Statusrefund เป็นอาเรย์ของ StatusRefund ที่มีคีย์ 'status' ในแต่ละออบเจ็กต์
const Statusrefund = ref<StatusRefund[]>([
  { id: 1, status: "รอการตรวจสอบ" },
  { id: 2, status: "อนุมัติการคืนสินค้า" },
  { id: 3, status: "การคืนเงินเสร็จสิ้น" },
  { id: 4, status: "ไม่อนุมัติการคืนสินค้า" },
]);

// ฟังก์ชันสำหรับการเลือก
const selectStatusRefund = (statusrefund: StatusRefund) => {
  selectedStatusRefund.value = statusrefund;
};

// ฟิลเตอร์คำสั่งซื้อ (Orders) ตามวันที่และสถานะ
const filteredOrders = computed(() => {
  let result = orders;

  // ฟิลเตอร์ตามสถานะ
  if (selectedStatusRefund.value && selectedStatusRefund.value.id !== 1) {
    result = result.filter(
      (order) => order.status === selectedStatusRefund.value.status
    );
  }

  // ฟิลเตอร์ตามวันที่เริ่มต้นและวันที่สิ้นสุด
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

  // ฟิลเตอร์ตามคำค้นหา
  if (filters.value.searchTerm) {
    const term = filters.value.searchTerm.toLowerCase();
    result = result.filter((order) => {
      return (
        order.order_id.toString().includes(term) || // ตรวจสอบ order_id
        (order.customer.username &&
          order.customer.username.toLowerCase().includes(term)) || // ตรวจสอบ username
        (order.customer.email &&
          order.customer.email.toLowerCase().includes(term)) // ตรวจสอบ email
      );
    });
  }

  return result;
});

const orders = <Order[]>[
  {
    order_id: 12346,
    customer: {
      user_id: 102,
      username: "jane_smith",
      email: "jane_smith@example.com",
    },
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
