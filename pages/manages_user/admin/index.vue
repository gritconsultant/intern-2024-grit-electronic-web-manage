<template>
  <div class="defaultpages flex flex-col gap-2 p-6 bg-gray-50">
    <!-- Header Section -->
    <div
      class="flex items-center justify-between bg-white rounded-lg border-[1px] drop-shadow-lg pl-[10px] h-[10%]"
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
    <div class="flex justify-between gap-2 w-full mt-8">
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
            <th class="w-[20%] text-start">หมายเลขผู้ใช้งาน</th>
            <th class="w-[20%]">ชื่อ</th>
            <th class="w-[30%]">อีเมล</th>
            <th class="w-[30%]">การจัดการ</th>
          </tr>
        </thead>
        <tbody class="w-full" v-if="!loading">
          <tr
            v-for="(admin, index) in admins"
            :key="index"
            class="flex gap-2 py-[8px] border-b-[1px]"
          >
            <th class="w-[20%] truncate text-start">
              {{ admin.id }}
            </th>
            <th class="w-[20%] truncate">{{ admin.name }}</th>
            <th class="w-[30%] truncate">{{ admin.email }}</th>
            <th class="w-[30%] flex justify-center gap-8 truncate">
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
          <tr v-if="admins.length === 0">
            <td colspan="6" class="absolute left-[700px] top-[300px] text-[30px]  py-4 text-gray-500">
              ไม่มีข้อมูล
            </td>
          </tr>
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

    <AddAdmin :show="showAddAdmin" @close="toggleModal('add', false)" @adminAdded="handleAdminAdded" />
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
import { useIndexStore } from "~/store/main"

definePageMeta({
  middleware: "auth",
});

const store = useIndexStore();


const route = useRoute();

const loading = ref(false);
const search = ref<string>("");
const page = ref(1); // ทำให้เป็น ref
const size = ref(12); // ทำให้เป็น ref
const paginate = ref<{ Total: number }>({ Total: 0 });
const admins = ref<Admin[]>([]);
const currentPage = ref(1); // ตั้งค่า currentPage เริ่มต้นที่ 1
const Category = ref();

const getAdminlist = async () => {
  loading.value = true;
  const param: Params = {
    page: currentPage.value,
    size: size.value,
    search: search.value || "",
    category: Category.value,
  };

  await service.user
    .getAdmintList(param)
    .then((resp: any) => {
      console.log("Response from API:", resp); // แสดงข้อมูลตอบกลับจาก API
      const data = resp.data.data;
      paginate.value = resp.data.paginate;
      const adminlist: Admin[] = [];
      for (let i = 0; i < data.length; i++) {
        const a = data[i];
        if (!a.id || typeof a.id !== "number") {
          console.error("Invalid admin data:", a);
          continue;
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
  const totalPages = Math.ceil(paginate.value.Total / size.value);
  if (pageNumber < 1 || pageNumber > totalPages) return;

  currentPage.value = pageNumber;
  getAdminlist(); // รีเฟรชข้อมูลเมื่อหน้าเปลี่ยน
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

const handleAdminAdded = async (newAdmin: Admin) => {
  admins.value.push(newAdmin); // เพิ่ม admin ใหม่ใน list
  // ใช้ window.location.reload() เพื่อรีเฟรชหน้า
  window.location.reload(); 
};

const handleAdminUpdate = async (updatedAdmin: Admin) => {
  const index = admins.value.findIndex(admin => admin.id === updatedAdmin.id);
  if (index !== -1) {
    admins.value[index] = updatedAdmin; // อัปเดตข้อมูล admin
    // รีเฟรชหน้าหลังจากอัปเดต
    window.location.reload();
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
      window.location.reload(); // รีเฟรชทั้งหน้า
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
  if (route.params.id) {
    const adminId = route.params.id; // เข้าถึงค่า adminId จาก params
    console.log("Admin ID from route:", adminId);
  }
});

</script>

<style scoped>
/* เพิ่มสไตล์ตามต้องการ */
</style>
