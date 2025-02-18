<template>
  <div class="defaultpages flex flex-col gap-4 p-6">
    <div
      class="flex items-center justify-between pl-[10px] bg-white dropshadowbox rounded-lg h-[10%] p-5"
    >
      <h1 class="text-2xl font-bold">บันทึกการทำงานของระบบ</h1>
    </div>
    <div class="flex gap-4 flex-1 items-end h-full">
      <!-- Search Bar -->
      <div class="relative w-[30%] flex">
        <input
          type="search"
          class="w-full h-10 pl-12 pr-4 rounded-full border border-orange-400 focus:ring-2 focus:ring-orange-500 outline-none text-gray-800"
          placeholder="ค้นหาคำสั่งซื้อ"
          v-model="search"
          @keyup.enter="getLogsAdmin"
        />
        <i
          class="fa-solid fa-magnifying-glass absolute left-4 top-2 text-gray-500 text-lg"
        ></i>
      </div>

      <!-- ส่วนตัวกรอง -->
      <div class="flex items-center gap-4">
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
            v-model="start"
            class="p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none h-[30px]"
          />
        </div>

        <!-- วันที่สิ้นสุด -->
        <div>
          <label for="endDate" class="block text-sm font-medium text-black mb-1"
            >วันที่สิ้นสุด</label
          >
          <input
            type="date"
            id="endDate"
            v-model="end"
            class="p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none h-[30px]"
          />
        </div>
      </div>
    </div>

    <div
      class="bg-white pt-2 py-2 p-6 flex flex-col justify-between rounded-lg dropshadowbox h-[90%]"
    >
      <!-- ตาราง Logs -->
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b-[2px] border-gray-400">
            <th class="w-[20%] text-start py-2">วัน</th>
            <th class="w-[20%] text-start py-2">ชื่อ</th>
            <th class="w-[20%] text-start py-2">การกระทำ</th>
            <th class="w-[40%] text-start py-2">รายละเอียด</th>
          </tr>
        </thead>
        <tbody v-if="!loading">
          <tr
            v-for="(logs, index) in logsadmin"
            :key="index"
            class="border-b-[1px] border-gray-400 text-[15px] font-medium"
          >
            <td class="w-[20%] text-start py-3">
              {{ formatDate(logs.created_at) }}
            </td>
            <td class="w-[20%] text-start py-3">
              {{ logs.Admin?.name ?? "-" }}
            </td>
            <td class="w-[20%] text-start py-3">{{ logs.action }}</td>
            <td class="w-[40%] text-start py-3">{{ logs.description }}</td>
          </tr>
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
      <div class="flex justify-between items-center m-5">
        <div class="text-sm text-gray-600">
          <!-- แสดงข้อมูลจาก (หน้า) และจำนวนทั้งหมด -->
          แสดง {{ (currentPage - 1) * size + 1 }} ถึง
          {{ Math.min(currentPage * size, paginate?.Total || 0) }}
          จากทั้งหมด {{ paginate?.Total || 0 }} รายการ
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
import service from "~/service";
import type { LogsAdmin, ParamsLogs } from "~/models/report.model";
import { useIndexStore } from "~/store/main"

definePageMeta({
  middleware: "auth",
});

const store = useIndexStore();


const loading = ref(false);
const search = ref<string>("");
const start = ref(null);
const end = ref(null);
const size = ref(11); // ทำให้เป็น ref
const currentPage = ref(1); // ตั้งค่า currentPage เริ่มต้นที่ 1
const paginate = ref<{ Total: number }>({ Total: 0 });

const logsadmin = ref<LogsAdmin[]>([]);

const getLogsAdmin = async () => {
  loading.value = true;
  // แปลงค่า start และ end เป็น Unix timestamp
  const startTimestamp = start.value
    ? Math.floor(
        new Date(new Date(start.value).setHours(0, 0, 0, 0)).getTime() / 1000
      )
    : null;

  const endTimestamp = end.value
    ? Math.floor(
        new Date(new Date(end.value).setHours(23, 59, 59, 999)).getTime() / 1000
      )
    : null;

  const param: ParamsLogs = {
    page: currentPage.value, // ใช้ .value ในการเข้าถึง currentPage
    size: size.value, // ใช้ .value ในการเข้าถึง size// ใช้ .value ในการเข้า����ง selectedYear
    search: search.value,
    start: startTimestamp,
    end: endTimestamp,
  };
  console.log("Sending param:", param);

  await service.report
    .getListLogs(param)
    .then((resp: any) => {
      const data = resp.data?.data || [];
      // ตรวจสอบว่า paginate มีอยู่ใน resp.data หรือไม่
      if (resp.data?.paginate) {
        paginate.value = resp.data.paginate;
      } else {
        paginate.value = { Total: 0 }; // กำหนดเป็นค่า default ถ้าไม่มีข้อมูล
      }

      const logsAdminData: LogsAdmin[] = [];
      for (let i = 0; i < data.length; i++) {
        const l = data[i];
        const log: LogsAdmin = {
          id: l.id,
          Admin: { id: l.Admin.id, name: l.Admin.name },
          action: l.action,
          description: l.description,
          created_at: l.created_at,
        };
        logsAdminData.push(log); // Add the constructed log to the array
      }
      logsadmin.value = logsAdminData;
    })
    .catch((error: any) => {
      console.error("Error fetching order data:", error);
    })
    .finally(() => {
      loading.value = false;
    });
};

const changePage = async (pageNumber: number) => {
  const totalPages = Math.ceil(paginate.value.Total / size.value); // คำนวณจำนวนหน้าทั้งหมด
  if (pageNumber < 1 || pageNumber > totalPages) {
    return; // ถ้าหน้าเกินขอบเขตให้ไม่ทำอะไร
  }

  currentPage.value = pageNumber; // เปลี่ยนหน้า

  // รีเฟรชข้อมูลเมื่อเปลี่ยนหน้า
  await getLogsAdmin();
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

// เพิ่ม watch สำหรับ start และ end (ให้แสดงข้อมูลใหม่เมื่อเลือกวันที่ใหม่)
watch([start, end], async () => {
  console.log("Start:", start.value, "End:", end.value);
  await getLogsAdmin(); // รีเฟรชข้อมูลทันทีเมื่อเลือกวันที่ใหม่
});

onMounted(async () => {
  await getLogsAdmin();
});
</script>

<style scoped></style>
