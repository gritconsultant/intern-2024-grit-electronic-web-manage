<template>
  <div class="defaultpages flex flex-col gap-2 p-6 bg-gray-50">
    <!-- Header Section -->
    <div
      class="flex items-center justify-between h-[10%] bg-white pl-[10px] rounded-lg dropshadowbox"
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
            <th class="w-[10%] text-start">หมายเลขผู้ใช้งาน</th>
            <th class="w-[15%]">ชื่อ</th>
            <th class="w-[30%]">อีเมล</th>
            <th class="w-[15%]">จำนวนคำสั่งซื้อ</th>
            <th class="w-[25%]"></th>
          </tr>
        </thead>
        <tbody class="w-full text-[15px]" v-if="!loading">
          <tr
            v-for="(customer, index) in customers"
            :key="index"
            class="flex gap-5 py-[8px] border-b-[1px]"
          >
            <th class="w-[10%] font-medium truncate flex gap-2 justify-between">
              {{ customer.id }}
            </th>
            <th class="w-[15%] font-medium flex truncate">
              {{ customer.username }}
            </th>
            <th class="w-[30%] font-medium truncate">
              {{ customer.email }}
            </th>
            <th class="w-[15%] font-medium truncate"></th>
            <th class="w-[25%] font-medium flex justify-end truncate">
              <i
                class="fa-regular fa-eye text-[20px] cursor-pointer"
                @click="openEditCustomer(customer.id)"
              ></i>
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


const loading = ref(false);
const search = ref("");
const currentPage = ref(1);
const size = ref(10);
const customers = ref<Customer[]>([]);

const paginate = ref<{ Total: number }>({ Total: 0 });

const getCustomerlist = async () => {
  loading.value = true;
  const param: Params = {
    page: currentPage.value,
    size: size.value,
    search: search.value || "",
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
