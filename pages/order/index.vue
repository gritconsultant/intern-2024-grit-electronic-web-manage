<template>
  <div class="defaultpages flex flex-col gap-3 p-6 bg-gray-50">
    <!-- Header Section -->
    <div
      class="flex justify-between items-center bg-white p-5 rounded-lg shadow-md"
    >
      <h1 class="text-2xl font-bold text-gray-800">รายการคำสั่งซื้อ</h1>
    </div>

    <!-- Search and Filter Section -->
    <div class="flex justify-between items-center gap-4 mt-2">
      <div class="flex gap-4 flex-1 items-end h-full">
        <!-- Search Bar -->
        <div class="relative w-[30%]">
          <input
            type="search"
            class="w-full h-10 pl-12 pr-4 rounded-full border border-orange-400 focus:ring-2 focus:ring-orange-500 outline-none text-gray-800"
            placeholder="ค้นหาคำสั่งซื้อ"
            v-model="search"
            @keyup.enter="getOrderList"
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
              v-model="start"
              type="date"
              id="startDate"
              class="p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none h-[40px]"
            />
          </div>
          <div>
            <label
              for="endDate"
              class="block text-sm font-medium text-black mb-1"
              >วันที่สิ้นสุด</label
            >
            <input
              v-model="end"
              type="date"
              id="endDate"
              class="p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none h-[40px]"
            />
          </div>
        </div>

        <!-- Status Filter -->
        <div class=" ">
          <label for=""  class="block text-sm font-medium text-black mb-1">สถานะคำสั่งซื้อ</label>
          <div class="relative group h-10">
          <div
            class="flex items-center gap-2 w-[150px] px-2 h-10 bg-orange-400 text-white rounded-full shadow hover:bg-orange-600"
          >
            <div
              class="flex justify-center items-center font-bold text-[14px] w-[80%] pr-[10px]"
            >
              {{ selectedStatusOrder.name }}
            </div>
            <div class="mt-[2px] ">
              <i class="fa-solid fa-filter"></i>
            </div>
          </div>

          <!-- Dropdown Menu -->
          <div
            class="absolute bg-white rounded-lg border shadow w-44 z-10 hidden group-hover:block"
          >
            <ul class="py-2 text-sm text-gray-700">
              <li
                v-for="(statusorder, i) in Statusorders"
                :key="i"
                class="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                @click="selectStatusOrder(statusorder)"
              >
                {{ statusorder.name }}
              </li>
            </ul>
          </div>
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
            class="flex gap-5 border-b-[2px] pb-[8px] pt-[8px] border-gray-400"
          >
            <th class="w-[10%] text-start pl-2">หมายเลขคำสั่งซื้อ</th>
            <th class="w-[12%] text-start pl-2">วัน/เวลา</th>
            <th class="w-[10%] text-start pl-2">ลูกค้า</th>
            <th class="w-[25%] text-start pl-2">ที่อยู่</th>
            <th class="w-[10%] text-start pl-2">ราคารวม</th>
            <th class="w-[10%] text-start pl-2">จำนวนรวม</th>
            <th class="w-[10%]">สถานะคำสั่งซื้อ</th>
            <th class="w-[3%] text-start pl-2"></th>
          </tr>
        </thead>
        <tbody class="w-full" v-if="!loading">
          <tr
            class="flex gap-5 border-b-[1px] py-3"
            v-for="(order, index) in orders"
            :key="index"
          >
            <th
              class="w-[10%] text-start pl-2 truncate text-[15px] font-medium"
            >
              {{ order.id }}
            </th>
            <th
              class="w-[12%] text-[15px] text-start pl-2 font-medium truncate"
            >
              {{ formatDate(order.created_at) }}
            </th>
            <th
              class="w-[10%] text-[15px] text-start pl-2 font-medium truncate"
            >
              {{ order.firstname }} {{ order.lastname }}
            </th>
            <th
              class="w-[25%] text-[15px] text-start pl-2 font-medium truncate"
            >
              {{ order.shipment_address }} {{ order.shipment_province }}
              {{ order.shipment_district }} {{ order.shipment_sub_district }}
              {{ order.shipment_zip_code }}
            </th>
            <th
              class="w-[10%] text-[15px] text-start pl-2 font-medium truncate"
            >
              {{ order.total_price }}
            </th>
            <th
              class="w-[10%] text-[15px] text-start pl-2 font-medium truncate"
            >
              {{ order.total_amount }} ชิ้น
            </th>
            <th
              class="w-[10%] text-[15px] font-medium flex items-center justify-center"
            >
              <div class="flex flex-col items-center cursor-pointer">
                <div
                  v-if="order.status === 'pending'"
                  class="w-[125px] p-[6px] px-4 border-[1px] rounded-[5px] bg-yellow-50 border-yellow-400 text-center font-medium"
                  @click="toggleMenu(order.id)"
                >
                  รอการชำระ
                </div>
                <div
                  v-else-if="order.status === 'paid'"
                  class="w-[125px] p-[6px] px-4 border-[1px] rounded-[5px] bg-blue-30 border-blue-400 text-center font-medium"
                  @click="toggleMenu(order.id)"
                >
                  ชำระเงินแล้ว
                </div>
                <div
                  v-else-if="order.status === 'prepare'"
                  class="w-[125px] p-[6px] px-4 border-[1px] rounded-[5px] bg-slate-50 border-slate-400 text-center font-medium"
                  @click="toggleMenu(order.id)"
                >
                  เตรียมสินค้า
                </div>
                <div
                  v-else-if="order.status === 'ship'"
                  class="w-[125px] p-[6px] px-4 border-[1px] rounded-[5px] bg-orange-50 border-orange-400 text-center font-medium"
                  @click="toggleMenu(order.id)"
                >
                  กำลังจัดส่ง
                </div>
                <div
                  v-else-if="order.status === 'success'"
                  class="w-[125px] p-[6px] px-4 border-[1px] rounded-[5px] bg-green-50 border-green-400 text-center font-medium"
                  @click="toggleMenu(order.id)"
                >
                  จัดส่งเรียบร้อย
                </div>
                <div
                  v-else-if="order.status === 'cancelled'"
                  class="w-[125px] p-[6px] px-4 border-[1px] rounded-[5px] bg-red-50 border-red-400 text-center font-medium"
                  @click="toggleMenu(order.id)"
                >
                  ยกเลิก
                </div>
                <div
                  v-else
                  class="w-[125px] p-[6px] px-4 border-[1px] rounded-[5px] bg-red-50 border-red-600 text-center font-medium"
                  @click="toggleMenu(order.id)"
                >
                  ชำระล้มเหลว
                </div>
                <div>
                  <ul
                    class="absolute bg-white border-[1px] rounded-[20px] border-gray-400 shadow-xl py-3 w-[140px] -translate-x-[70px] flex flex-col gap-2 mt-[1px]"
                    v-show="isMenuVisible[order.id]"
                  >
                    <li
                      class="h-[25%] hover:bg-slate-300 flex items-center justify-center cursor-pointer"
                      @click="changeStatus(order.id, 'prepare')"
                      :class="{ 'bg-gray-200': order.status === 'prepare' }"
                      v-if="order.status !== 'prepare'"
                    >
                      เตรียมสินค้า
                    </li>
                    <li
                      class="h-[25%] hover:bg-slate-300 flex items-center justify-center cursor-pointer"
                      @click="changeStatus(order.id, 'ship')"
                      :class="{ 'bg-gray-200': order.status === 'ship' }"
                      v-if="order.status !== 'ship'"
                    >
                      กำลังจัดส่ง
                    </li>
                    <li
                      class="h-[25%] text-[14px] hover:bg-slate-300 flex items-center justify-center cursor-pointer"
                      @click="changeStatus(order.id, 'failed')"
                      :class="{ 'bg-gray-200': order.status === 'failed' }"
                      v-if="order.status !== 'failed'"
                    >
                      ชำระล้มเหลว
                    </li>
                  </ul>
                </div>
              </div>
            </th>
            <th class="w-[3%] flex items-center justify-center">
              <NuxtLink
                :to="`/order/${order.id}`"
                class="flex items-center place-content-center justify-center rounded-[5px] h-[20px] w-[25px]"
              >
                <i class="fa-regular fa-eye text-[15px]"></i>
              </NuxtLink>
            </th>
          </tr>
          <!-- <tr v-if="orders.length === 0">
            <td colspan="6" class="absolute left-[700px] top-[300px]">
             
            </td>
          </tr> -->
        </tbody>
        <div v-else class="absolute left-[850px] top-[300px]">
          <svg
            aria-hidden="true"
            class="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>

        <!-- Popup Tracking Number -->
        <div
          v-if="popupVisible"
          class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div class="bg-white p-5 rounded shadow-lg">
            <h3 class="text-lg font-bold flex justify-center mb-2">
              กรอกเลขพัสดุ
            </h3>
            <input
              type="text"
              v-model="trackingNumber"
              class="border p-2 w-full rounded-lg"
              placeholder="ใส่เลขพัสดุ"
            />
            <div class="flex justify-center mt-4">
              <button
                @click="confirmTracking"
                class="bg-blue-500 w-[60px] text-white p-2 rounded"
              >
                ยืนยัน
              </button>
              <button
                @click="popupVisible = false"
                class="ml-2 bg-gray-300 w-[60px] p-2 rounded"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      </table>

      <!-- Pagination -->
      <div class="flex justify-between items-center m-5">
        <div class="text-sm text-gray-600">
          <!-- แสดงข้อมูลจาก (หน้า) และจำนวนทั้งหมด -->
          แสดง {{ (currentPage - 1) * size + 1 }} ถึง
          {{ Math.min(currentPage * size, paginate.Total) }}
          จากทั้งหมด {{ paginate.Total }} รายการ
        </div>
        <div class="flex gap-2">
          <!-- ปุ่มก่อนหน้า -->
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
          >
            ก่อนหน้า
          </button>

          <span class="flex items-center px-2">หน้า {{ currentPage }}</span>

          <!-- ปุ่มถัดไป -->
          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage >= Math.ceil(paginate.Total / size)"
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
import type {
  UpdateStatusOrder,
  Order,
  StatusOrder,
} from "~/models/order.model";
import Swal from "sweetalert2";
import type { Params } from "~/models/order.model";
import service from "~/service";

import { useIndexStore } from "~/store/main";

definePageMeta({
  middleware: "auth",
});

const store = useIndexStore();

const isMenuVisible = ref<Record<number, boolean>>({}); // Store visibility state per order
const popupVisible = ref(false);
const trackingNumber = ref("");
const selectedOrderId = ref<number | null>(null);

// Toggle the visibility of the menu for a specific order
const toggleMenu = (orderId: number) => {
  isMenuVisible.value = {
    ...Object.fromEntries(
      Object.keys(isMenuVisible.value).map((key) => [key, false])
    ),
    [orderId]: !isMenuVisible.value[orderId],
  };

  if (!isMenuVisible.value[orderId]) {
    // Reset tracking number and selected order id when closing the menu
    trackingNumber.value = "";
    selectedOrderId.value = null;
  }
};

const changeStatus = async (orderId: number, status: string) => {
  const order = orders.value.find((order) => order.id === orderId);
  if (!order) return;

  if (order.status === status) {
    Swal.fire("ไม่สามารถเปลี่ยนสถานะ", "สถานะนี้ได้ถูกตั้งไว้แล้ว", "info");
    return;
  }

  if (status === "ship") {
    // เปิด popup ให้กรอกเลขพัสดุ
    selectedOrderId.value = orderId;
    popupVisible.value = true;
    return; // ยังไม่อัปเดตสถานะจนกว่าจะกด "ยืนยัน"
  }

  // ถ้าเป็นสถานะอื่น อัปเดตได้เลย
  const result = await Swal.fire({
    title: "ยืนยันการเปลี่ยนสถานะ",
    text: `คุณต้องการเปลี่ยนสถานะเป็น "${status}" ใช่หรือไม่?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  });

  if (result.isConfirmed) {
    order.status = status;
    await updatestatus(orderId, order);
    Swal.fire("สำเร็จ!", "เปลี่ยนสถานะเรียบร้อย", "success");

    // โหลดข้อมูลคำสั่งซื้อใหม่
    getOrderList();
  }
};

const confirmTracking = async () => {
  if (!trackingNumber.value.trim()) {
    Swal.fire("กรุณาใส่เลขพัสดุ", "", "warning");
    return;
  }

  if (selectedOrderId.value !== null) {
    const order = orders.value.find((o) => o.id === selectedOrderId.value);
    if (order) {
      order.tracking_number = trackingNumber.value.trim();
      order.status = "ship"; // ต้องเปลี่ยนเป็น 'ship' แทน 'prepare'

      await updatestatus(selectedOrderId.value, order);
      Swal.fire(
        "สำเร็จ!",
        "บันทึกเลขพัสดุและเปลี่ยนสถานะเรียบร้อย",
        "success"
      ).then(() => {
        window.location.reload(); // รีเฟรชหน้าหลังจากกด OK
      });
    }
  }

  popupVisible.value = false;
  trackingNumber.value = ""; // รีเซ็ตค่า
  // โหลดข้อมูลคำสั่งซื้อใหม่
};

// Selected status order
const selectedStatusOrder = ref<StatusOrder>({
  id: 1,
  name: "ทั้งหมด",
  status: "",
});

// List of status orders
const Statusorders = ref<StatusOrder[]>([
  {
    id: 1,
    name: "ทั้งหมด",
    status: "",
  },
  {
    id: 2,
    name: "รอการชำระ",
    status: "pending",
  },
  {
    id: 3,
    name: "ชำระแล้ว",
    status: "paid",
  },
  {
    id: 4,
    name: "เตรียมสินค้า",
    status: "prepare",
  },
  {
    id: 5,
    name: "กำลังจัดส่ง",
    status: "ship",
  },
  {
    id: 6,
    name: "จัดส่งเรียบร้อย",
    status: "success",
  },
  {
    id: 7,
    name: "ชำระล้มเหลว",
    status: "failed",
  },
  {
    id: 8,
    name: "ยกเลิก",
    status: "cancelled",
  },
]);

const selectStatusOrder = (statusorder: StatusOrder) => {
  selectedStatusOrder.value = { ...statusorder };
  console.log("เลือกสถานะ:", selectedStatusOrder.value);
  getOrderList(); // เรียกฟังก์ชันดึงข้อมูลใหม่พร้อมกับค่า status ที่อัปเดตแล้ว
};

const loading = ref(false);
const search = ref<string>("");
const start = ref(null);
const end = ref(null);
const size = ref(8); // ทำให้เป็น ref
const currentPage = ref(1); // ตั้งค่า currentPage เริ่มต้นที่ 1
const orders = ref<Order[]>([]);
const paginate = ref<{ Total: number }>({ Total: 0 });

const getOrderList = async () => {
  loading.value = true;

  // แปลงค่า start และ end เป็น Unix timestamp
  const startTimestamp = start.value
    ? Math.floor(
        new Date(new Date(start.value).setHours(0, 0, 0, 0)).getTime() / 1000
      )
    : 0;

  const endTimestamp = end.value
    ? Math.floor(
        new Date(new Date(end.value).setHours(23, 59, 59, 999)).getTime() / 1000
      )
    : 0;

  const param: Params = {
    page: currentPage.value, // ใช้ .value ในการเข้าถึง currentPage
    size: size.value, // ใช้ .value ในการเข้าถึง size
    search: search.value || "", // ใช้ค่าป้องกันถ้า search เป็น null หรือ undefined
    status: selectedStatusOrder.value.status,
    start: startTimestamp,
    end: endTimestamp,
  };
  console.log("Sending param:", param); // ตรวจสอบค่า param ที่ส่งไป

  await service.order
    .getOrderlist(param)
    .then((resp: any) => {
      const data = resp.data.data;
      paginate.value = resp.data.paginate; // ตั้งค่าจำนวนทั้งหมดใหม่

      const orderlist: Order[] = [];

      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const r = data[i];
        const order: Order = {
          id: r.id,
          user_id: r.user_id,
          username: r.username,
          status: r.status,
          total_amount: r.total_amount,
          total_price: r.total_price,
          firstname: r.firstname,
          lastname: r.lastname,
          created_at: r.created_at,
          updated_at: r.updated_at,
          shipment_id: r.shipment_id,
          shipment_firstname: r.shipment_firstname,
          shipment_lastname: r.shipment_lastname,
          shipment_address: r.shipment_address,
          shipment_sub_district: r.shipment_sub_district,
          shipment_district: r.shipment_district,
          shipment_province: r.shipment_province,
          shipment_zip_code: r.shipment_zip_code,
          tracking_number: r.tracking_number,
        };
        orderlist.push(order);
      }
      orders.value = orderlist; // Assign the populated order list to orders
    })
    .catch((error: any) => {
      console.error("Error fetching order data:", error);
    })
    .finally(() => {
      loading.value = false;
    });
};

const formatDate = (dateInput: string | number) => {
  let date: Date;

  if (typeof dateInput === "string") {
    date = new Date(dateInput); // ถ้าเป็น ISO string
  } else {
    date = new Date(dateInput * 1000); // ถ้าเป็น Unix timestamp
  }

  if (isNaN(date.getTime())) return "Invalid Date"; // ตรวจสอบค่า

  return date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// ฟังก์ชันที่ใช้ในการเปลี่ยนหน้า
const changePage = (pageNumber: number) => {
  const totalPages = Math.ceil(paginate.value.Total / size.value); // คำนวณจำนวนหน้าทั้งหมด
  if (pageNumber < 1 || pageNumber > totalPages) {
    return; // ถ้าหน้าเกินขอบเขตให้ไม่ทำอะไร
  }

  currentPage.value = pageNumber; // เปลี่ยนหน้า

  // ส่งค่า param สำหรับการเรียกข้อมูลใหม่
  const param: Params = {
    page: currentPage.value,
    size: size.value,
    search: search.value || "",
    status: selectedStatusOrder.value.status,
    start: start.value ?? 0,
    end: end.value ?? 0,
  };

  getOrderList(); // รีเฟรชข้อมูลเมื่อเปลี่ยนหน้า
};

const status = ref<UpdateStatusOrder>({
  id: 0,
  status: "",
  tracking_number: "",
});

const updatestatus = async (orderId: number, order: any) => {
  await service.order
    .updateStatusOrder(orderId, order)
    .then((resp: any) => {
      const data = resp.data;

      const orderstatus: UpdateStatusOrder = {
        id: data.id,
        status: data.status,
        tracking_number: data.tracking_number,
      };
      status.value = orderstatus;
    })
    .catch((error: any) => {
      console.log(error.response);
      Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถอัปเดตคำสั่งซื้อได้", "error");
    })
    .finally(() => {});
};

watch([() => currentPage.value], async () => {
  await getOrderList();
});
// เพิ่ม watch สำหรับ start และ end (ให้แสดงข้อมูลใหม่เมื่อเลือกวันที่ใหม่)
watch([start, end], async () => {
  console.log("Start:", start.value, "End:", end.value);
  await getOrderList();
});

onMounted(async () => {
  await getOrderList();
});
</script>

<style></style>
