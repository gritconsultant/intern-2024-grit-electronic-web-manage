<template>
  <div class="defaultpages flex flex-col gap-2 p-6 bg-gray-50">
    <!-- Header Section -->
    <div
      class="flex items-center justify-between h-[10%] bg-white pl-[10px] rounded-lg border-[1px] drop-shadow-lg"
    >
      <h1 class="text-[25px] font-bold">รายการบัญชีลูกค้า</h1>
    </div>

    <!-- Search Section -->
    <div class="flex gap-2 w-[80%] mt-8">
      <div class="w-[40%]">
        <!-- Search Bar -->
        <div class="relative w-full">
          <input
            type="search"
            class="w-full h-10 pl-12 pr-4 rounded-full border border-orange-400 focus:ring-2 focus:ring-orange-500 outline-none text-gray-800"
            placeholder="ค้นหาสินค้า"
            v-model="search"
            @keyup.enter="getCustomerlist"
          />
          <i
            class="fa-solid fa-magnifying-glass absolute left-4 top-2 text-gray-500 text-lg"
          ></i>
        </div>
      </div>
    </div>

    <!-- Customer Table Section -->
    <div
      class="w-full h-[90%] mt-2 pt-2 py-2 bg-white dropshadowbox rounded-lg flex flex-col justify-between"
    >
      <table class="flex flex-col px-8 gap-2 w-full">
        <thead class="w-full">
          <tr
            class="flex gap-5 border-b-[2px] border-gray-400 pb-[8px] pt-[8px]"
          >
            <th class="w-[20%] text-start">หมายเลขผู้ใช้งาน</th>
            <th class="w-[20%]">ชื่อ</th>
            <th class="w-[30%]">อีเมล</th>
            <th class="w-[25%]">รายละเอียดเพิ่มเติม</th>
          </tr>
        </thead>
        <tbody class="w-full text-[15px]" v-if="!loading">
          <tr
            v-for="(customer, index) in customers"
            :key="index"
            class="flex gap-5 py-[8px] border-b-[1px]"
          >
            <th class="w-[20%] font-medium truncate flex gap-2">
              {{ customer.id }}
            </th>
            <th class="w-[20%] font-medium flex justify-center truncate">
              {{ customer.firstname }} {{ customer.lastname }}
            </th>
            <th class="w-[30%] font-medium truncate">
              {{ customer.email }}
            </th>
            <th class="w-[25%] font-medium flex justify-center truncate">
              <i
                class="fa-regular fa-eye text-[20px] cursor-pointer"
                @click="openEditCustomer(customer.id)"
              ></i>
            </th>
          </tr>
          <!-- <tr v-if="customers.length === 0">
            <td colspan="6" class="absolute left-[700px] top-[300px] text-[30px]  py-4 text-gray-500">
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
        <div v-else class="absolute left-[800px] top-[300px]">
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

          <span class="flex items-center px-2"> หน้า {{ currentPage }} </span>

          <!-- ปุ่มถัดไป -->
          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage * size >= paginate.Total"
            class="px-3 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>

    <!-- แสดง Popup เมื่อกดปุ่ม -->
    <PopupCustomerDetail
      v-if="showCustomer"
      :customersId="selectedCustomerId ?? 0"
      @close="closeForm"
    />
  </div>
</template>

<script setup lang="ts">
import type { Params } from "~/models/client.model";
import type { Customer } from "~/models/user.model";
import service from "~/service";

import { useIndexStore } from "~/store/main";

definePageMeta({
  middleware: "auth",
});

const store = useIndexStore();

const loading = ref(false);
const search = ref("");
const currentPage = ref(1);
const size = ref(10);
const customers = ref<Customer[]>([]);
const Category = ref();

const paginate = ref<{ Total: number }>({ Total: 0 });

const getCustomerlist = async () => {
  loading.value = true;
  const param: Params = {
    page: currentPage.value,
    size: size.value,
    search: search.value || "",
    category: Category.value,
  };

  try {
    const resp = await service.user.getCustomertList(param);
    const data = resp.data.data;

    console.log("Received data:", data); // ตรวจสอบข้อมูลที่รับมา

    paginate.value = resp.data.paginate;

    const customerlist: Customer[] = [];
    for (let i = 0; i < data.length; i++) {
      const c = data[i];
      const customer: Customer = {
        id: c.id,
        firstname: c.firstname,
        lastname: c.lastname,
        username: c.username,
        password: c.password,
        email: c.email,
        phone: c.phone,
        created_at: c.CreatedAt,
        updated_at: c.UpdatedAt,
      };
      customerlist.push(customer);
    }

    customers.value = customerlist;
  } catch (err) {
    console.error("Error loading customer list:", err);
  } finally {
    loading.value = false;
  }
};

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
    category: Category.value,
  };

  getCustomerlist(); // รีเฟรชข้อมูลเมื่อเปลี่ยนหน้า
};

const showCustomer = ref(false);

const selectedCustomerId = ref<number | null>(null);

const openEditCustomer = (id: number | null) => {
  if (!id) {
    console.error("Error: No Customer ID provided.");
    return;
  }
  selectedCustomerId.value = id;
  showCustomer.value = true; // Show the Popup
};

const closeForm = () => {
  console.log("Form closed");
  showCustomer.value = false;
};

const showEditCustomer = ref(false);

// watch เพื่ออัปเดตเมื่อค่า currentPage, size หรือ search เปลี่ยน
watch(
  [() => currentPage.value, () => size.value, () => search.value],
  async () => {
    await getCustomerlist();
  }
);

onMounted(async () => {
  await getCustomerlist();
});
</script>

<style scoped>
/* เพิ่มสไตล์ที่ต้องการ */
</style>
