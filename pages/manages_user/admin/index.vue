<template>
  <div class="defaultpages flex flex-col gap-4 p-6 bg-gray-50">
    <!-- Header Section -->
    <div
      class="flex items-center justify-between bg-white rounded-lg dropshadowbox pl-[10px] h-[10%]"
    >
      <h1 class="text-[25px] font-bold">รายการบัญชีผู้ดูแล</h1>

      <!-- Add Admin Button -->
      <div class="mr-12">
        <div
          @click="toggleModal('add')"
          class="flex items-center justify-center border-[1px] border-[#FFD652]/50 bg-[#F68D44] text-[20px] font-semibold rounded-[5px] h-full px-3 cursor-pointer dropshadowbutton"
        >
          เพิ่มบัญชีผู้ดูแล
        </div>
      </div>
    </div>

    <!-- Search and Add Admin Section -->
    <div class="flex justify-between gap-2 w-full">
      <!-- Search Box -->
      <div class="w-[40%]">
        <!-- Search Bar -->
        <div class="relative w-full">
          <input
            type="search"
            class="w-full h-10 pl-12 pr-4 rounded-full border border-orange-400 focus:ring-2 focus:ring-orange-500 outline-none text-gray-800"
            placeholder="ค้นหาสินค้า"
            v-model="search"
            @keyup.enter="getAdminlist"
          />
          <i
            class="fa-solid fa-magnifying-glass absolute left-4 top-2 text-gray-500 text-lg"
          ></i>
        </div>
      </div>
    </div>

    <!-- Admin Table Section -->
    <div
      class="flex flex-col justify-between w-full h-[90%] mt-2 pt-2 bg-white rounded-lg dropshadowbox"
    >
      <table class="flex flex-col px-8 gap-2 w-full">
        <thead class="w-full">
          <tr
            class="flex gap-2 border-b-[2px] border-gray-400 pb-[8px] pt-[8px]"
          >
            <th class="w-[15%] text-start">หมายเลขผู้ใช้งาน</th>
            <th class="w-[15%]">ชื่อ</th>
            <th class="w-[30%]">อีเมล</th>
            <th class="w-[38%]"></th>
          </tr>
        </thead>
        <tbody class="w-full" v-if="!loading">
          <tr
            v-for="(admin, index) in admins"
            :key="index"
            class="flex gap-2 py-[8px] border-b-[1px]"
          >
            <th class="w-[15%] truncate text-start">
              {{ admin.id }}
            </th>
            <th class="w-[15%] truncate">{{ admin.name }}</th>
            <th class="w-[30%] truncate">{{ admin.email }}</th>
            <th class="w-[38%] flex justify-end gap-5 truncate">
              <i
                @click="openEditAdmin(admin.id)"
                class="fa-solid fa-pen-to-square text-[20px] text-orange-400 cursor-pointer"
              >
              </i>
              <i
                @click="confirmDeleteAdmin(admin.id)"
                class="fa-solid fa-trash cursor-pointer text-red-600 text-[20px]"
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

    <AddAdmin :show="showAddAdmin" @close="toggleModal('add', false)" />
    <EditAdmin
      v-if="showEditAdmin && selectedAdminId !== null"
      :adminId="selectedAdminId"
      @adminUpdated="handleAdminUpdate"
      @close="closeForm"
    />
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import type { Params } from "~/models/client.model";
import type { Admin } from "~/models/user.model"; // ใช้ AdminUpdate
import service from "~/service";

const route = useRoute();

const loading = ref(false);
const search = ref<string>("");
const page = ref(1); // ทำให้เป็น ref
const size = ref(6); // ทำให้เป็น ref
const paginate = ref<{ Total: number }>({ Total: 0 });
const admins = ref<Admin[]>([]);
const currentPage = ref(1); // ตั้งค่า currentPage เริ่มต้นที่ 1
const Category = ref();

const getAdminlist = async () => {
  loading.value = true;
  const param: Params = {
    page: currentPage.value, // ใช้ .value ในการเข้าถึง currentPage
    size: size.value, // ใช้ .value ในการเข้าถึง size
    search: search.value || "", // ใช้ค่าป้องกันถ้า search เป็น null หรือ undefined
    category: Category.value,
  };

  await service.user
    .getAdmintList(param)
    .then((resp: any) => {
      const data = resp.data.data;
      paginate.value = resp.data.paginate;
      console.log("Data from API:", data); // ตรวจสอบข้อมูลทั้งหมดที่ได้จาก API

      const adminlist: Admin[] = [];
      for (let i = 0; i < data.length; i++) {
        const a = data[i];
        if (!a.id || typeof a.id !== "number") {
          console.error("Invalid admin data:", a); // แสดงข้อมูล admin ที่ไม่มี id ถูกต้อง
          continue; // ข้าม admin ที่ไม่มี id
        }
        const admin: Admin = {
          id: a.id,
          name: a.name,
          email: a.email,
          role: a.role,
          is_active: a.is_active,
          created_at: a.created_at,
          updated_at: a.updated_at,
        };
        adminlist.push(admin);
      }
      admins.value = adminlist;
    })
    .catch((err: any) => {
      console.error("Error fetching admins:", err);
    })
    .finally(() => {
      loading.value = false;
    });
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

  getAdminlist(); // รีเฟรชข้อมูลเมื่อเปลี่ยนหน้า
};

const deleteAdmin = async (id: number) => {
  if (id === undefined || id === null) {
    console.error("ID ของผู้ดูแลไม่ถูกต้อง:", id);
    return;
  }
  await service.user
    .deleteAdmin(id)
    .then((resp: any) => {
      console.log("ลบผู้ดูแลสำเร็จ:", resp.data);
    })
    .catch((error: any) => {
      console.error("ข้อผิดพลาดในการลบผู้ดูแล:", error.response);
    })
    .finally(() => {});
};

const showEditAdmin = ref(false);

const selectedAdminId = ref<number | null>(null);

const openEditAdmin = (id: number | null) => {
  console.log("Selected Admin ID:", id, typeof id);
  if (!id) {
    console.error("Error: No category ID provided.");
    return;
  }
  selectedAdminId.value = id;
  showEditAdmin.value = true;
};

const closeForm = () => {
  console.log("Form closed");
  showEditAdmin.value = false;
};

// เมื่อมีการอัปเดตประเภทสินค้า จะเรียกฟังก์ชัน categoryUpdated
const handleAdminUpdate = (updatedAdmin: Admin) => {
  adminUpdated(updatedAdmin);
};

const adminUpdated = (updatedAdmin: Admin) => {
  // ค้นหาประเภทสินค้าที่มี id ตรงกับข้อมูลที่อัปเดต
  const index = admins.value.findIndex(
    (category) => category.id === updatedAdmin.id
  );
  if (index !== -1) {
    admins.value[index] = updatedAdmin; // แทนที่ข้อมูลประเภทสินค้าตัวเก่าด้วยข้อมูลที่อัปเดต
  }
};

const confirmDeleteAdmin = async (id: number) => {
  if (id === undefined || id === null) {
    Swal.fire("ข้อผิดพลาด", "ไม่พบหมายเลขผู้ดูแลที่ต้องการลบ", "error");
    return;
  }

  const result = await Swal.fire({
    title: "คุณแน่ใจหรือไม่?",
    text: "คุณต้องการลบผู้ดูแลนี้หรือไม่?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  });

  if (result.isConfirmed) {
    try {
      await deleteAdmin(id);
      Swal.fire("ลบสำเร็จ!", "ผู้ดูแลถูกลบแล้ว", "success");
    } catch (error) {
      Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถลบผู้ดูแลได้", "error");
    }
  }
};

const showAddAdmin = ref(false);

const toggleModal = (type: "add", state = true) => {
  if (type === "add") {
    showAddAdmin.value = state;
  }
};

onMounted(async () => {
  await getAdminlist();
  const adminId = route.params.id; // เข้าถึงค่า adminId จาก params
  console.log("Admin ID from route:", adminId); // แสดงค่าใน console เพื่อตรวจสอบว่าได้ค่าถูกต้องหรือไม่
});
</script>

<style scoped>
/* เพิ่มสไตล์ตามต้องการ */
</style>
