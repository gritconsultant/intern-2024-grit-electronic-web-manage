<template>
  <div class="defaultpages p-8 space-y-6">
    <!-- Header -->
    <div class="flex items-center h-[10%] px-12 bg-white rounded-lg shadow-md">
      <h1 class="text-3xl font-bold">แดชบอร์ด</h1>
    </div>

    <div class="flex gap-8 w-full h-[87%]" v-if="!loading">
      <!-- Statistics Section -->
      <div
        class="grid grid-cols-2 gap-8 w-[50%]"
        v-for="(dashboards, index) in dashboard"
        :key="index"
      >
        <div
          class="flex flex-col items-center justify-center p-6 rounded-xl shadow-lg bg-white border border-gray-200 text-green-500"
        >
          <i class="fa-solid fa-coins text-8xl"></i>
          <h2 class="font-semibold text-lg mt-2">ยอดขายรวม</h2>
          <p class="text-4xl font-bold mt-5">{{ dashboards.totalsale }}</p>
        </div>

        <div
          class="flex flex-col items-center justify-center p-6 rounded-xl shadow-lg bg-white border border-gray-200 text-blue-500"
        >
          <i class="fa-solid fa-cart-shopping text-8xl"></i>
          <h2 class="font-semibold text-lg mt-2">ยอดคำสั่งซื้อ</h2>
          <p class="text-4xl font-bold mt-5">{{ dashboards.totalorder }}</p>
        </div>

        <div
          class="flex flex-col items-center justify-center p-6 rounded-xl shadow-lg bg-white border border-gray-200 text-red-500"
        >
          <i class="fa-solid fa-ban text-8xl"></i>
          <h2 class="font-semibold text-lg mt-2">ยกเลิกสินค้า</h2>
          <p class="text-4xl font-bold mt-5">{{ dashboards.totalcancelled }}</p>
        </div>

        <div
          class="flex flex-col items-center justify-center p-6 rounded-xl shadow-lg bg-white border border-gray-200 text-orange-500"
        >
          <i class="fa-solid fa-users text-8xl"></i>
          <h2 class="font-semibold text-lg mt-2">บัญชีลูกค้ารวม</h2>
          <p class="text-4xl font-bold mt-5">{{ dashboards.totaluser }}</p>
        </div>
      </div>

      <!-- Chart Section -->
      <div
        v-if="!loading"
        class="bg-white rounded-xl shadow-lg flex flex-col items-center w-[50%] p-8 border border-gray-200"
      >
        <div class="flex justify-between w-full">
          <h1 class="text-xl font-bold w-full flex justify-end pr-8">การขายแต่ละประเภท</h1>
          <div class=" w-[160px] flex justify-end  ">
            <div class="dropshadowbox w-[120px] absolute top-[220px]  right-[50px] ">
              <select v-model="month"  @change="gerdashboardcategory">
                <option
                  v-for="(month, index) in months"
                  :key="index"
                  :value="month"
                >
                  {{ month }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <GarphPieChart :salesData="salesData" />
      </div>
    </div>
    <div v-else class="absolute left-[1000px] top-[500px]">
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
  </div>
</template>

<script lang="ts" setup>
import type {
  Dashboard,
  DashBoardCategory,
  ParamsCategory,
} from "~/models/report.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";

definePageMeta({
  middleware: "auth",
});

const store = useIndexStore();

const loading = ref(false);
const dashboard = ref<Dashboard[]>([]); // ใช้ ref สำหรับ array

const getDashboard = () => {
  loading.value = true;
  service.report
    .getDashBoard()
    .then((resp: any) => {
      const data = resp.data?.data;

      console.log(" API Response:", data); // เช็ค API Response

      if (data) {
        const dashboardData: Dashboard = {
          totalsale: data.totalsale,
          totalorder: data.totalorder,
          totaluser: data.totaluser,
          totalcancelled: data.totalcancelled,
        };

        // อัปเดตค่าที่ dashboard.value (เป็น array ของ Dashboard)
        dashboard.value = [dashboardData]; // ใช้ .value กับ ref

        console.log(dashboard.value); // แสดงผล dashboard ที่ได้
      }
    })
    .catch((error: any) => {
      console.log(error.respontse); // เพิ่มข้อความผิดพลาดที่ชัดเจน
    })
    .finally(() => {
      loading.value = false;
    });
};

const salesData = ref<Record<string, number>>({});

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

const gerdashboardcategory = async () => {
  loading.value = true;
  const param: ParamsCategory = {
    month: month.value,
  };
  console.log(param);

  await service.report
    .getDashBoardCategory(param)
    .then((resp: any) => {
      const data = resp.data.data;
      // แปลงข้อมูลจาก API เป็น salesData สำหรับกราฟ
      salesData.value = data.reduce(
        (acc: Record<string, number>, c: DashBoardCategory) => {
          acc[c.category] = c.total_category_sales;
          return acc;
        },
        {}
      );
    })
    .catch((error: any) => {
      console.log("Error fetching category sales:", error);
    })
    .finally(() => {
      loading.value = false;
    });
};

const isSalesDataLoaded = ref(false);
// Watch salesData and update loading state when data is ready
watch(salesData, (newValue) => {
  if (Object.keys(newValue).length > 0) {
    isSalesDataLoaded.value = true;
  }
});

// ให้มั่นใจว่า getDashboard เรียกและคำนวณข้อมูลเสร็จแล้ว
onMounted(async () => {
  await getDashboard();
  await gerdashboardcategory();
});
</script>

<style>
select {
  font-size: 1em;
  padding: 8px;
  border: none;
  outline: none;
  background-color: #ffffff;
  text-align: center;
  height: 35px;
  display: inline-block;
  border-radius: 5px;
  width: 100%;
  color: rgb(1, 1, 1);
}

option {
  text-align: center;
}
</style>
