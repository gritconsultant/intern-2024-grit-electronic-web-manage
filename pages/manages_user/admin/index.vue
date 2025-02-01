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
    <div class="w-full h-[90%] mt-2 pt-2 bg-white rounded-lg dropshadowbox">
      <table class="flex flex-col px-8 gap-2 w-full">
        <thead class="w-full">
          <tr class="flex gap-2">
            <th class="w-[15%] text-start">หมายเลขผู้ใช้งาน</th>
            <th class="w-[15%]">ชื่อ</th>
            <th class="w-[30%]">อีเมล</th>
            <th class="w-[38%]"></th>
          </tr>
        </thead>
        <tbody class="w-full">
          <tr
            v-for="(admin, index) in admins"
            :key="index"
            class="flex gap-2 py-[1px] border-b-[1px]"
          >
            <th class="w-[15%] truncate text-start border-r-[2px]">
              {{ admin.id }}
            </th>
            <th class="w-[15%] truncate border-r-[2px]">{{ admin.name }}</th>
            <th class="w-[30%] truncate border-r-[2px]">{{ admin.email }}</th>
            <th class="w-[38%] flex justify-end gap-5 truncate">
              <i
                @click="selectAdmin(admin)"
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
      </table>
    </div>

    <!-- Add Admin Modal -->
    <AddAdmin :show="showAddAdmin" @close="toggleModal('add', false)" />

    <!-- Edit Admin Modal -->
    <EditAdmin
      :show="showEditAdmin"
      @close="toggleModal('edit', false)"
      :admin="selectedAdmin ? selectedAdmin : null"
    />
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import type { Admin } from "~/models/user.model";
import service from "~/service";

const search = ref<string>("");
const admins = ref<Admin[]>([]);

const getAdminlist = async () => {
  await service.user
    .getAdmintList()
    .then((resp: any) => {
      const data = resp.data.data;
      const adminlist: Admin[] = [];
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const a = data[i];
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
      console.error(err);
    })
    .finally(() => {});
};

const deleteAdmin = async (id: number) => {
  // ตรวจสอบค่า id ก่อนที่จะส่งไปยัง API
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

const confirmDeleteAdmin = async (id: number) => {
  // ตรวจสอบค่า id ก่อนที่จะลบ
  if (id === undefined || id === null) {
    Swal.fire("ข้อผิดพลาด", "ไม่พบหมายเลขผู้ดูแลที่ต้องการลบ", "error");
    return;
  }

  // แสดงกล่องยืนยันการลบ
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
      // เรียกใช้ฟังก์ชันลบผู้ดูแล
      await deleteAdmin(id);

      // แสดงข้อความสำเร็จหลังการลบ
      Swal.fire("ลบสำเร็จ!", "ผู้ดูแลถูกลบแล้ว", "success");
    } catch (error) {
      // หากเกิดข้อผิดพลาดระหว่างการลบ
      Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถลบผู้ดูแลได้", "error");
    }
  }
};

const showAddAdmin = ref(false);
const showEditAdmin = ref(false);

const toggleModal = (type: "add" | "edit", state = true) => {
  if (type === "add") {
    showAddAdmin.value = state;
  }
  if (type === "edit") {
    showEditAdmin.value = state;
  }
};
const selectedAdmin = ref<Admin | null>(null);
const selectAdmin = (admin: Admin) => {
  if (admin) {
    selectedAdmin.value = admin; // ตรวจสอบให้มั่นใจว่า selectedAdmin ถูกกำหนด
    toggleModal("edit"); // เปิด modal สำหรับแก้ไข
  }
};

onMounted(async () => {
  await getAdminlist();
});
</script>

<style scoped>
/* เพิ่มสไตล์ตามต้องการ */
</style>
