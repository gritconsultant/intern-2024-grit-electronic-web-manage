<template>
  <div class="defaultpages flex flex-col gap-4">
    <!-- Header -->
    <div class="flex items-center justify-between h-[5%] pl-[35px]">
      <h1 class="text-[25px] font-bold">รายการบัญชีผู้ดูแล</h1>
    </div>

    <!-- Search and Add Admin -->
    <div class="flex justify-between gap-2 w-[100%] pl-[35px]">
      <div class="w-[30%]">
        <Search v-model="filters.searchTerm" />
      </div>
      <div class="mr-12">
        <div
          @click="toggleModal('add')"
          class="flex items-center justify-center border-[1px] border-[#FFD652]/50 bg-[#F68D44] text-[20px] font-semibold rounded-[5px] h-full px-3 cursor-pointer dropshadowbutton"
        >
          เพิ่มบัญชีผู้ดูแล
        </div>
      </div>
    </div>

    <!-- Table to display admins -->
    <div class="w-full h-[90%] mt-2 pt-2 bg-white">
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
            v-for="admin in filteredAdmins"
            :key="admin.id"
            class="flex gap-2 py-[1px] border-b-[1px]"
          >
            <th class="w-[15%] truncate text-start border-r-[2px]">
              {{ admin.id }}
            </th>
            <th class="w-[15%] truncate border-r-[2px]">{{ admin.name }}</th>
            <th class="w-[30%] truncate border-r-[2px]">{{ admin.email }}</th>
            <th class="w-[38%] flex justify-end gap-5 truncate">
              <i
                @click="editAdmin(admin)"
                class="fa-solid fa-pen-to-square text-[20px] text-orange-400 cursor-pointer"
              ></i>
              <i
                @click="confirmDelete(admin.id)"
                class="fa-solid fa-trash cursor-pointer text-red-600 text-[20px]"
              ></i>
            </th>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Admin Modal -->
    <AddAdmin
      :show="showAddAdmin"
      @close="toggleModal('add', false)"
      @addAdmin="addAdmin"
    />

    <!-- Edit Admin Modal -->
    <EditAdmin
      v-if="selectedAdmin && showEditAdmin"
      :show="showEditAdmin"
      :admin="selectedAdmin"
      @close="toggleModal('edit', false)"
      @updateAdmin="updateAdmin"
    />

    <!-- Delete Confirmation Modal -->
    <ConfirmationModal
      :show="showConfirmDelete"
      title="ยืนยันการลบ"
      message="คุณต้องการลบผู้ใช้นี้ใช่หรือไม่?"
      :confirmButtonText="'ยืนยัน'"
      :cancelButtonText="'ยกเลิก'"
      @confirm="deleteAdmin"
      @update:show="showConfirmDelete = $event"
    />

    <!-- No Admins Message -->
    <div v-if="filteredAdmins.length === 0" class="text-center text-gray-500">
      ไม่พบผู้ดูแลที่ตรงกับคำค้นหา
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { Admin } from "~/models/user.model";

const admins = ref<Admin[]>([
  {
    id: "1",
    name: "Admin One",
    email: "admin1@example.com",
    password: "password1",
  },
  {
    id: "2",
    name: "Admin Two",
    email: "admin2@example.com",
    password: "password2",
  },
  {
    id: "3",
    name: "Admin Three",
    email: "admin3@example.com",
    password: "password3",
  },
]);

const filters = ref({ searchTerm: "" });
const filteredAdmins = computed(() => {
  return admins.value.filter(
    (admin) =>
      admin.name
        .toLowerCase()
        .includes(filters.value.searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(filters.value.searchTerm.toLowerCase())
  );
});

const showAddAdmin = ref(false);
const showEditAdmin = ref(false);
const selectedAdmin = ref<Admin | null>(null);
const showConfirmDelete = ref(false);
const selectedAdminId = ref<string | null>(null);

const toggleModal = (type: "add" | "edit", state = true) => {
  if (type === "add") showAddAdmin.value = state;
  if (type === "edit") {
    showEditAdmin.value = state;
    if (!state) selectedAdmin.value = null;
  }
};

const deleteAdmin = () => {
  if (selectedAdminId.value) {
    admins.value = admins.value.filter(
      (admin) => admin.id !== selectedAdminId.value
    );
    showConfirmDelete.value = false;
    selectedAdminId.value = null;
    alert("ลบผู้ดูแลสำเร็จ");
  } else {
    alert("ไม่พบผู้ดูแลที่ต้องการลบ");
  }
};

const confirmDelete = (id: string) => {
  showConfirmDelete.value = true;
  selectedAdminId.value = id;
};

const editAdmin = (admin: Admin) => {
  selectedAdmin.value = { ...admin };
  toggleModal("edit", true);
};

const addAdmin = (newAdmin: Admin) => {
  const nextId = String(
    Math.max(...admins.value.map((admin) => Number(admin.id)), 0) + 1
  );
  newAdmin.id = nextId;
  admins.value.push({ ...newAdmin });
  toggleModal("add", false);
};

const updateAdmin = (updatedAdmin: Admin) => {
  const index = admins.value.findIndex((admin) => admin.id === updatedAdmin.id);
  if (index !== -1) {
    admins.value[index] = { ...updatedAdmin };
    toggleModal("edit", false);
  }
};
</script>

<style scoped>
/* เพิ่มสไตล์ตามต้องการ */
</style>
