<template>
  <div class="defaultpages  p-5">
    <div class="h-[8%] flex justify-between">
      <!-- แสดง Customer ID -->
      <h1 class="text-[28px] font-bold">ลูกค้า #{{ customerId }}</h1>
      <button
        @click="showResetForm = true"
        class="flex items-center justify-center border-[1px] border-[#FFD652]/50 bg-[#F68D44] text-[20px] font-semibold rounded-[5px] h-[60%] px-3 cursor-pointer dropshadowbutton mr-[50px]"
      >
        เปลี่ยนรหัสผ่าน
      </button>
    </div>

    <!-- Password Reset Confirmation -->
    <div
      v-if="showConfirmDialog"
      class="min-h-screen bg-black/50  flex items-center justify-center fixed inset-0 z-50"
    >
      <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold text-center text-gray-700 mb-6">
          คุณแน่ใจหรือไม่ว่าต้องการเปลี่ยนรหัสผ่าน?
        </h2>
        <div class="flex justify-between">
          <button
            @click="handleConfirm"
            class="w-[48%] py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            ยืนยัน
          </button>
          <button
            @click="showConfirmDialog = false"
            class="w-[48%] py-2 px-4 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>

    <!-- Password Reset Form -->
    <div
      v-if="showResetForm"
      class="min-h-screen bg-black/50 flex items-center justify-center fixed inset-0 z-40"
    >
      <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold text-center text-gray-700 mb-6">
          เปลี่ยนรหัสผ่านของลูกค้า
        </h2>

        <form class="">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-600"
              >อีเมลของคุณ</label
            >
            <input
              type="email"
              id="email"
              v-model="email"
              disabled
              class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="อีเมลของคุณ"
            />
          </div>

          <div class="mb-4">
            <label
              for="phonenumber"
              class="block text-sm font-medium text-gray-600"
              >รหัสผ่านใหม่</label
            >
            <input
              type="tel"
              id="phonenumber"
              v-model="phonenumber"
              disabled
              class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="หมายเลขโทรศัพท์ของคุณ"
            />
          </div>

          <button
            type="button"
            @click="showConfirmDialog = true"
            class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            ยืนยันการเปลี่ยนรหัสผ่าน
          </button>
        </form>

        <p v-if="message" class="mt-4 text-center text-sm text-gray-600">
          {{ message }}
        </p>
      </div>
    </div>

    <!-- Customer Info and Orders -->
    <div class="w-full h-[90%] flex justify-between gap-5">
      <div
        class="bg-white h-[45%] w-[30%] p-4 rounded-[5px] dropshadowbottomsub"
      >
        <div class="flex justify-center">
          <div class="border-2 border-black rounded-[5px] px-2 py-[3px]">
            <i class="fa-solid fa-user"></i>
          </div>
        </div>
        <div class="flex flex-col gap-5 mt-8 h-[80%]">
          <div class="flex gap-2">
            <span class="text-[20px] font-semibold">ชื่อ</span>
            <div class="text-[20px] pl-[39px] w-full">John Do</div>
          </div>
          <div class="flex gap-2">
            <span class="text-[20px] font-semibold">อีเมล</span>
            <div class="text-[20px] pl-[20px] w-full">{{ email }}</div>
          </div>
          <div class="flex gap-2">
            <span class="text-[20px] font-semibold">เบอร์</span>
            <div class="text-[20px] pl-[20px] w-full">{{ phonenumber }}</div>
          </div>
          <div class="flex flex-col gap-2 h-full">
            <span class="text-[20px] font-semibold">ที่อยู่</span>
            <div class="text-[20px] px-8 h-full text-wrap w-full">
              บ้านเลขที่ 123 หมู่ที่ 4 ตำบลในเมือง อำเภอเมือง จังหวัดอุบลราชธานี
              34000
            </div>
          </div>
        </div>
      </div>

      <div
        class="bg-white h-[90%] p-5 w-[70%] rounded-[5px] dropshadowbottomsub"
      >
        <h2 class="text-[20px] font-semibold">รายการคำสั่งซื้อ</h2>
        <div class="h-[90%] mt-[8px] ">
          <table class="flex flex-col px-8 gap-2 w-full h-full">
            <thead class="w-full h-[5%]">
              <tr class="flex gap-2 border-y-[1px] p-[2px]">
                <th class="w-[15%] text-start">หมายเลขคำสั่งซื้อ</th>
                <th class="w-[15%]">ราคารวม</th>
                <th class="w-[30%]">สถานะคำสั่งซื้อ</th>
                <th class="w-[15%]">เวลา</th>
                <th class="w-[20%]"></th>
              </tr>
            </thead>
            <tbody class="w-full h-[90%] text-[15px] overflow-auto">
              <tr
                v-for="order in orders"
                :key="order.id"
                class="flex gap-2 py-[1px] border-b-[1px] "
              >
                <th class="w-[15%] font-medium truncate">{{ order.id }}</th>
                <th class="w-[15%] font-medium truncate">{{ order.totalPrice }} ฿</th>
                <th class="w-[30%] font-medium truncate">{{ order.status }}</th>
                <th class="w-[15%] font-medium truncate">{{ order.orderTime }}</th>
                <th class="w-[20%] flex justify-end truncate">
                  <NuxtLink to="/order/[id]">
                    <i class="fa-regular fa-eye text-[20px]"></i>
                  </NuxtLink>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex justify-between text-[20px] font-semibold">
          <span>รวมทั้งหมด</span>
          <div class="flex gap-5 pr-[3  0px]" >
            <span>{{ orders.length }} คำสั่งซื้อ</span>
            <span> จำนวน {{ totalAmount }} บาท</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// ข้อมูลลูกค้า
const email = ref("john_Do@gamil.com");
const phonenumber = ref("0123456789");
const message = ref("");
const showResetForm = ref(false);
const showConfirmDialog = ref(false);

// ข้อมูลคำสั่งซื้อ
const orders = ref([
  {
    id: 123,
    totalPrice: 2500,
    status: "กำลังจัดส่ง",
    orderTime: "2025-01-23 12:00",
  },
  {
    id: 124,
    totalPrice: 1500,
    status: "รอการชำระเงิน",
    orderTime: "2025-01-22 10:30",
  },
  {
    id: 123,
    totalPrice: 2500,
    status: "กำลังจัดส่ง",
    orderTime: "2025-01-23 12:00",
  },
  {
    id: 124,
    totalPrice: 1500,
    status: "รอการชำระเงิน",
    orderTime: "2025-01-22 10:30",
  },
  {
    id: 123,
    totalPrice: 2500,
    status: "กำลังจัดส่ง",
    orderTime: "2025-01-23 12:00",
  },
  {
    id: 124,
    totalPrice: 1500,
    status: "รอการชำระเงิน",
    orderTime: "2025-01-22 10:30",
  },
  {
    id: 123,
    totalPrice: 2500,
    status: "กำลังจัดส่ง",
    orderTime: "2025-01-23 12:00",
  },
  {
    id: 124,
    totalPrice: 1500,
    status: "รอการชำระเงิน",
    orderTime: "2025-01-22 10:30",
  },
  {
    id: 123,
    totalPrice: 2500,
    status: "กำลังจัดส่ง",
    orderTime: "2025-01-23 12:00",
  },
  {
    id: 124,
    totalPrice: 1500,
    status: "รอการชำระเงิน",
    orderTime: "2025-01-22 10:30",
  },
  {
    id: 123,
    totalPrice: 2500,
    status: "กำลังจัดส่ง",
    orderTime: "2025-01-23 12:00",
  },
  {
    id: 124,
    totalPrice: 1500,
    status: "รอการชำระเงิน",
    orderTime: "2025-01-22 10:30",
  },
  {
    id: 123,
    totalPrice: 2500,
    status: "กำลังจัดส่ง",
    orderTime: "2025-01-23 12:00",
  },
  {
    id: 124,
    totalPrice: 1500,
    status: "รอการชำระเงิน",
    orderTime: "2025-01-22 10:30",
  },
  {
    id: 123,
    totalPrice: 2500,
    status: "กำลังจัดส่ง",
    orderTime: "2025-01-23 12:00",
  },
  {
    id: 124,
    totalPrice: 1500,
    status: "รอการชำระเงิน",
    orderTime: "2025-01-22 10:30",
  },
  {
    id: 123,
    totalPrice: 2500,
    status: "กำลังจัดส่ง",
    orderTime: "2025-01-23 12:00",
  },
  {
    id: 124,
    totalPrice: 1500,
    status: "รอการชำระเงิน",
    orderTime: "2025-01-22 10:30",
  },
  {
    id: 123,
    totalPrice: 2500,
    status: "กำลังจัดส่ง",
    orderTime: "2025-01-23 12:00",
  },
  {
    id: 124,
    totalPrice: 1500,
    status: "รอการชำระเงิน",
    orderTime: "2025-01-22 10:30",
  },
  {
    id: 123,
    totalPrice: 2500,
    status: "กำลังจัดส่ง",
    orderTime: "2025-01-23 12:00",
  },
  {
    id: 124,
    totalPrice: 1500,
    status: "รอการชำระเงิน",
    orderTime: "2025-01-22 10:30",
  },
  {
    id: 123,
    totalPrice: 2500,
    status: "กำลังจัดส่ง",
    orderTime: "2025-01-23 12:00",
  },
  {
    id: 124,
    totalPrice: 1500,
    status: "รอการชำระเงิน",
    orderTime: "2025-01-22 10:30",
  },
  {
    id: 123,
    totalPrice: 2500,
    status: "กำลังจัดส่ง",
    orderTime: "2025-01-23 12:00",
  },
  {
    id: 124,
    totalPrice: 1500,
    status: "รอการชำระเงิน",
    orderTime: "2025-01-22 10:30",
  },
]);

// ฟังก์ชันยืนยันการเปลี่ยนรหัสผ่าน
const handleConfirm = () => {
  message.value = "รหัสผ่านถูกเปลี่ยนเรียบร้อยแล้ว!";
  showResetForm.value = false; // ปิดฟอร์มการเปลี่ยนรหัส
  setTimeout(() => {
    showConfirmDialog.value = false; // ปิดการยืนยัน
  }, 500);
};

// ข้อมูล customerId
const customerId = ref("");

// ฟังก์ชันดึงข้อมูล customerId จาก API
const fetchCustomerId = async () => {
  try {
    const response = await fetch("https://api.example.com/getCustomerId");
    const data = await response.json();
    customerId.value = data.id; // สมมุติว่า API ส่งข้อมูล customerId
  } catch (error) {
    console.error("ไม่สามารถดึงข้อมูลลูกค้าได้", error);
  }
};

// คำนวณจำนวนเงินรวมทั้งหมด
const totalAmount = ref(0);

const calculateTotalAmount = () => {
  totalAmount.value = orders.value.reduce(
    (sum, order) => sum + order.totalPrice,
    0
  );
};

// เรียกฟังก์ชันเมื่อคำสั่งซื้อเปลี่ยนแปลง
onMounted(() => {
  calculateTotalAmount();
});
</script>

<style scoped>
/* Optional custom styles */
</style>
