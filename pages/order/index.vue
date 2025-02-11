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
              {{ selectedStatusOrder.status }}
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
                class="block px-4 py-2 hover:bg-gray-100"
                @click="selectStatusOrder(statusorder)"
              >
                {{ statusorder.status }}
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
          {{ order.shipment_address }} {{ order.shipment_province }} {{ order.shipment_district }}  {{ order.shipment_sub_district }}  {{ order.shipment_zip_code }}
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
                  class="w-[120px] p-[6px] px-4 border-[1px] rounded-[5px] bg-yellow-50 border-yellow-400 text-center font-medium"
                  @click="toggleMenu(order.id)"
                >
                  รอการชำระ
                </div>
                <div
                  v-else-if="order.status === 'กำลังจัดส่ง'"
                  class="w-[120px] p-[6px] px-4 border-[1px] rounded-[5px] bg-orange-50 border-orange-400 text-center font-medium"
                  @click="toggleMenu(order.id)"
                >
                  กำลังจัดส่ง
                </div>
                <div
                  v-else-if="order.status === 'shipped'"
                  class="w-[120px] p-[6px] px-4 border-[1px] rounded-[5px] bg-green-50 border-green-400 text-center font-medium"
                  @click="toggleMenu(order.id)"
                >
                  {{ order.status }}
                </div>
                <div
                  v-else
                  class="w-[120px] p-[6px] px-4 border-[1px] rounded-[5px] bg-red-50 border-red-600 text-center font-medium"
                  @click="toggleMenu(order.id)"
                >
                  ชำระล้มเหลว
                </div>
                <div>
                  <ul
                    class="absolute bg-white border-[1px] rounded-[20px] border-gray-400 shadow-xl py-3 w-[140px] h-[110px] -translate-x-[70px] flex flex-col gap-2 mt-[1px]"
                    v-show="isMenuVisible[order.id]"
                  >
                    <li
                      class="h-[25%] hover:bg-slate-300 flex items-center justify-center cursor-pointer"
                      @click="changeStatus(order.id, 'pending')"
                      :class="{ 'bg-gray-200': order.status === 'pending' }"
                      v-if="order.status !== 'pending'"
                    >
                      รอการชำระ
                    </li>
                    <li
                      class="h-[25%] hover:bg-slate-300 flex items-center justify-center cursor-pointer"
                      @click="changeStatus(order.id, 'กำลังจัดส่ง')"
                      :class="{ 'bg-gray-200': order.status === 'กำลังจัดส่ง' }"
                      v-if="order.status !== 'กำลังจัดส่ง'"
                    >
                      กำลังจัดส่ง
                    </li>
                    <li
                      class="h-[25%] text-[14px] hover:bg-slate-300 flex items-center justify-center cursor-pointer"
                      @click="changeStatus(order.id, 'shipped')"
                      :class="{ 'bg-gray-200': order.status === 'shipped' }"
                      v-if="order.status !== 'shipped'"
                    >
                      จัดส่งเรียบร้อย
                    </li>
                    <li
                      class="h-[25%] text-[14px] hover:bg-slate-300 flex items-center justify-center cursor-pointer"
                      @click="changeStatus(order.id, 'ชำระล้มเหลว')"
                      :class="{ 'bg-gray-200': order.status === 'ชำระล้มเหลว' }"
                      v-if="order.status !== 'ชำระล้มเหลว'"
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
        <div v-else class="absolute left-[600px] top-[200px]">
          <div
            class="float-right inline-block h-96 w-96 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          >
            <span
              class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
              >Loading...</span
            >
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
  const order = orders.value.find((order) => order.id === orderId); // Find the order by ID

  if (order) {
    if (order.status === status) {
      Swal.fire("ไม่สามารถเปลี่ยนสถานะ", "สถานะนี้ได้ถูกตั้งไว้แล้ว", "info");
      return; // Do nothing if the status is the same
    }

    Swal.fire({
      title: "ยืนยันการเปลี่ยนสถานะ",
      text: `คุณต้องการเปลี่ยนสถานะเป็น "${status}" ใช่หรือไม่?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Update status locally first
        order.status = status;
        toggleMenu(orderId); // Close the dropdown menu

        // Call the API to update the status on the server
        await updatestatus(orderId, order); // Make the server request to update the status

        Swal.fire("สำเร็จ!", `สถานะถูกเปลี่ยนเป็น "${status}" แล้ว`, "success");
      }
    });
  }
};

// Filter configuration
const filters = ref({
  startDate: "",
  endDate: "",
  searchTerm: "", // คำค้นหา
});

// Selected status order
const selectedStatusOrder = ref<StatusOrder>({
  id: 1,
  status: "ทั้งหมด",
});

// List of status orders
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

// Function to select a status order
const selectStatusOrder = (statusorder: StatusOrder) => {
  selectedStatusOrder.value = statusorder;
};

const loading = ref(false);
const search = ref<string>("");
const size = ref(8); // ทำให้เป็น ref
const currentPage = ref(1); // ตั้งค่า currentPage เริ่มต้นที่ 1
const orders = ref<Order[]>([]);
const paginate = ref<{ Total: number }>({ Total: 0 });
const Category = ref();

const getOrderList = async () => {
  loading.value = true;
  const param: Params = {
    page: currentPage.value, // ใช้ .value ในการเข้าถึง currentPage
    size: size.value, // ใช้ .value ในการเข้าถึง size
    search: search.value || "", // ใช้ค่าป้องกันถ้า search เป็น null หรือ undefined
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
  };

  getOrderList(); // รีเฟรชข้อมูลเมื่อเปลี่ยนหน้า
};

const status = ref<UpdateStatusOrder>({
  id: 0,
  status: "",
});

const updatestatus = async (orderId: number, order: any) => {
  await service.order
    .updateStatusOrder(orderId, order)
    .then((resp: any) => {
      const data = resp.data;

      const orderstatus: UpdateStatusOrder = {
        id: data.id,
        status: data.status,
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

onMounted(async () => {
  await getOrderList();
});
</script>

<style></style>
