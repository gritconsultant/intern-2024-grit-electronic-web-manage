<template>
  <div class="defaultpages flex flex-col gap-6 p-6">
    <!-- Header -->
    <div
      class="flex justify-between items-center bg-white p-5 rounded-lg border-[1px] drop-shadow-lg"
    >
      <h1 class="text-2xl font-bold text-gray-800">รายงานการขายสินค้า</h1>
    </div>

    <!-- Filter Section -->
    <div class="flex gap-16 p-2 rounded-lg">
      <div class="">
        <label for="year" class="font-semibold">เลือกปี:</label>
        <select
          id="year"
          v-model="selectedYear"
          class="border px-4 py-2 dropshadowboxabsolut focus:ring-orange-500 focus:border-orange-500"
        >
          <option v-for="year in years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>

      <div class="">
        <label for="month" class="font-semibold">เลือกเดือน:</label>
        <select
          id="month"
          v-model="month"
          class="border px-4 py-2 rounded-md dropshadowboxabsolut focus:ring-orange-500 focus:border-orange-500"
        >
          <option
            v-for="(monthName, index) in months"
            :key="index"
            :value="monthName"
          >
            {{ monthName }}
          </option>
        </select>
      </div>
    </div>

    <!-- Sales Table -->
    <div
      class="bg-white py-3 p-4 rounded-lg dropshadowbox h-[80%] flex flex-col justify-between"
    >
      <table class="w-full">
        <thead class="w-full">
          <tr class="border-b-2 mb-[8px] mt-[8px] w-full">
            <th class="w-[15%] text-start pl-8">หมายเลขคำสั่งซื้อ</th>
            <th class="w-[15%] text-start">วันที่สั่งซื้อ</th>
            <th class="w-[15%] text-start">ชื่อผู้ซื้อ</th>
            <th class="w-[15%] text-start">จำนวน</th>
            <th class="w-[15%] text-start">ราคา</th>
            <th class="w-[5%] text-start">สินค้า</th>
          </tr>
        </thead>
        <tbody v-if="!loading">
          <tr
            v-for="(report, index) in salereport"
            :key="index"
            class="border-b hover:bg-orange-50 text-[15px] font-medium"
          >
            <td class="py-3 pl-10 w-[15%] text-start">
              {{ report.order_id }}
            </td>
            <td class="py-3 w-[15%] text-start">
              {{ formatDate(report.created_at) }}
            </td>
            <td class="py-3 w-[15%] text-start">
              {{ report.firstname }}
            </td>
            <td class="py-3 w-[15%] text-start">
              {{ report.total_amount }}
            </td>
            <td class="py-3 w-[15%] text-start">
              {{ report.total_price }}
            </td>
            <td class="py-3 w-[5%] text-start pl-4">
              <i
                v-if="popupVisible[report.order_id] === true"
                class="fa-solid fa-caret-down cursor-pointer"
                @click="togglePopup(report.order_id)"
              ></i>
              <i
                v-else
                class="fa-solid fa-caret-up cursor-pointer"
                @click="togglePopup(report.order_id)"
              ></i>

              <!-- dropdown detail product -->
              <div
                v-show="popupVisible[report.order_id]"
                class=" h-[138px] bg-white border-b-[1px] border-r-[1px] border-l-[1px] drop-shadow-lg border-gray-300  w-[98%] absolute -translate-x-[1541px] translate-y-[13px]"
              >
                <div class="p-3 h-full">
                  <!-- เนื้อหาของ dropdown -->
                  <p class="font-medium text-[15px]">รายละเอียดของสินค้า</p>
                  <div class=" w-full h-[80%] p-2 flex gap-4 ">
                    <div
                      class="bg-white border-[1px] border-gray-400 p-[1px] px-2 rounded-lg h-[28px] flex justify-center items-center gap-5"
                      v-for="(product, index) in report.products"
                      :key="index"
                    >
                      <div>{{ product.product_name }}</div>
                      <div>{{ product.total_product_amount }} ชิ้น</div>
                      <div>{{ product.price }} บาท</div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <!-- <tr v-if="salereport.length === 0">
            <td colspan="6" class="absolute left-[700px] top-[300px]">
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
            </td>
          </tr> -->
        </tbody>
        <div v-else class="absolute left-[750px] top-[300px]">
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
      </table>

      <!-- Pagination -->
      <div class="flex justify-between items-center p-5 rounded-lg">
        <div class="text-sm text-gray-600">
          <div class="text-sm text-gray-600">
            แสดง {{ (currentPage - 1) * size + 1 }} ถึง
            {{ Math.min(currentPage * size, paginate.Total) }}
            จากทั้งหมด {{ paginate.Total }} รายการ
          </div>
        </div>
        <div class="flex gap-2">
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
          >
            ก่อนหน้า
          </button>
          <span class="flex items-center px-2">หน้า {{ currentPage }}</span>
          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage >= Math.ceil(paginate.Total / size)"
            class="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import service from "~/service";
import type { ParamsReport, SaleReport } from "../../models/report.model";

import { useIndexStore } from "~/store/main";

definePageMeta({
  middleware: "auth",
});

const store = useIndexStore();

const size = ref(10); // ทำให้เป็น ref
const currentPage = ref(1); // ตั้งค่า currentPage เริ่มต้นที่ 1
const paginate = ref<{ Total: number }>({ Total: 0 });
const loading = ref(false);

const months = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];
const currentMonthIndex = new Date().getMonth(); // ได้ค่า 0-11
const month = ref(months[currentMonthIndex]); // ตอนนี้ months ถูกประกาศแล้ว

const currentYear = new Date().getFullYear();
const years = ref<number[]>(
  Array.from({ length: 5 }, (_, i) => currentYear - 2 + i)
); // ใช้ ref
const selectedYear = ref<number>(currentYear); // ตั้งค่าให้เป็นปี 2025

const salereport = ref<SaleReport[]>([]);

const getSaleReport = async () => {
  loading.value = true;
  const param: ParamsReport = {
    page: currentPage.value, // ใช้ .value ในการเข้าถึง currentPage
    size: size.value, // ใช้ .value ในการเข้าถึง size
    month: month.value, //
    year: selectedYear.value, // ใช้ .value ในการเข้า����ง selectedYear
  };

  console.log("Sending param:", param); // ตรวจสอบค่า param ที่ส่งไป
  await service.report
    .getSaleReport(param)
    .then((resp: any) => {
      const data = resp.data.data;
      paginate.value = resp.data.paginate;

      // ตรวจสอบค่าของ Total ถ้ามีข้อมูล
      if (paginate.value.Total === 0) {
        salereport.value = []; // หากไม่มีข้อมูลให้รีเซ็ตผลลัพธ์
      } else {
        const reportsale: SaleReport[] = [];
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          const s = data[i];
          const report: SaleReport = {
            order_id: s.order_id,
            username: s.username,
            firstname: s.firstname,
            lastname: s.lastname,
            total_amount: s.total_amount,
            total_price: s.total_price,
            created_at: s.created_at,
            products: s.products
              ? s.products.map((product: any) => ({
                  product_name: product.product_name,
                  price: product.price,
                  total_product_amount: product.total_product_amount,
                }))
              : [],
          };
          reportsale.push(report);
        }
        salereport.value = reportsale;
      }
    })
    .catch((error: any) => {
      console.error("Error fetching order data:", error);
    })
    .finally(() => {
      loading.value = false;
    });
};

// ฟังก์ชันที่ใช้ในการเปลี่ยนหน้า
const changePage = (pageNumber: number) => {
  const totalPages =
    paginate.value.Total > 0 ? Math.ceil(paginate.value.Total / size.value) : 1;

  if (pageNumber < 1 || pageNumber > totalPages) {
    return;
  }

  currentPage.value = pageNumber;

  // ลองตรวจสอบค่าของ currentPage และ paginate.Total ก่อนที่จะเรียก getSaleReport
  console.log("เปลี่ยนหน้าเป็นหน้า:", currentPage.value);
  console.log("Total ที่มีทั้งหมด:", paginate.value.Total);

  getSaleReport();
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

const popupVisible = reactive<{ [key: number]: boolean }>({});

const togglePopup = (orderId: number) => {
  // ถ้า orderId ที่คลิกเปิดอยู่แล้ว จะปิด
  if (popupVisible[orderId]) {
    popupVisible[orderId] = false;
  } else {
    // ปิดทุกตัวก่อน แล้วเปิดตัวใหม่
    for (const key in popupVisible) {
      popupVisible[key] = false; // ปิดทุก orderId
    }
    popupVisible[orderId] = true; // เปิดตัวใหม่
  }
};

console.log(popupVisible);

watch(selectedYear, async (newYear) => {
  console.log("📅 ปีที่เลือก:", newYear);
  currentPage.value = 1;
  await getSaleReport(); // ใช้ await เพื่อให้ข้อมูลถูกโหลดเสร็จ
});

watch(month, async (newMonth) => {
  console.log("📅 เดือนที่เลือก:", newMonth);
  currentPage.value = 1;
  await getSaleReport(); // ใช้ await เพื่อให้ข้อมูลถูกโหลดเสร็จ
});

console.log("Total:", paginate.value.Total);

onMounted(async () => {
  await getSaleReport();
});
</script>

<style scoped></style>
