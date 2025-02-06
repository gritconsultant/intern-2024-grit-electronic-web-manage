<template>
  <div class="defaultpages flex flex-col gap-4 p-6 bg-gray-50">
    <div
      class="flex items-center justify-center h-[10%] bg-white rounded-lg dropshadowbox"
    >
      <h1 class="text-[25px] font-bold">โปรไฟล์</h1>
    </div>
    <div
      v-if="!loading"
      class="bg-white w-full h-[90%] rounded-lg dropshadowbox px-[10px] flex flex-col gap-2 items-center justify-center"
    >
      <div
        class="h-[11%] bg-orange-400 border-orange-200 border-2 flex items-center justify-center w-[80px] rounded-full"
      >
        <i class="fa-solid fa-user-tie text-[50px]"></i>
      </div>
      <div
        @submit.prevent="submitForm"
        class="bg-white w-[60%] p-10 text-xl font-semibold flex flex-col gap-6"
      >
        <div class="flex flex-col gap-2">
          <label class="text-gray-600">ชื่อ</label>
          <input
            v-model="getinfo.name"
            type="text"
            class="p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-gray-600">อีเมล</label>
          <input
            v-model="getinfo.email"
            type="email"
            class="p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="password" class="text-gray-600">รหัสผ่านใหม่</label>
          <input
            v-model="admin.password"
            type="password"
            id="password"
            class="p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="confirmPassword" class="text-gray-600">ยืนยันรหัส</label>
          <input
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            class="p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div v-if="passwordMismatch" class="text-red-500 text-sm mb-4">
          รหัสผ่านไม่ตรงกัน
        </div>
        <div class="flex items-center justify-center">
          <button
            @click="updateAdmin"
            class="bg-orange-300 text-white p-2 rounded-md w-[200px] hover:bg-orange-500 trallansition-"
          >
            แก้ไขข้อมูล
          </button>
        </div>
      </div>
    </div>
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
  </div>
</template>

<script lang="ts" setup>
import Swal from "sweetalert2";
import type { AdminRes, AdminUpdate, AdminInfo } from "~/models/user.model";
import service from "~/service";

const loading = ref(false);

const getinfo = ref<AdminInfo>({
  id: 0,
  name: "",
  email: "",

  role: {
    id: 0,
    name: "",
  },
  is_active: true,
  created_at: 0,
  updated_at: 0,
});

const getAdmininfo = async () => {
  loading.value = true;
  await service.user
    .getAdminInfo()
    .then((resp: any) => {
      const data = resp.data.data;
      console.log(data);

      const admin: AdminInfo = {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role
          ? {
              id: data.role.id,
              name: data.role.name,
            }
          : { id: 0, name: "" }, // กรณี role ไม่มีค่า
        is_active: data.is_active,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };

      getinfo.value = admin;
    })
    .catch((error: any) => {
      console.log(error);
    })
    .finally(() => {
      loading.value = false;
    });
};

const admin = ref<AdminUpdate>({
  id: 0,
  name: "",
  email: "",
  password: "",
  role_id: 0,
  is_active: true,
});

const updateAdmin = async () => {
  const updatedAdmin = {
    id: getinfo.value.id,
    name: getinfo.value.name,
    email: getinfo.value.email,
    role_id: getinfo.value.role.id,
    is_active: getinfo.value.is_active,
    ...(admin.value.password ? { password: admin.value.password } : {}),
  };

  if (isNaN(updatedAdmin.id) || updatedAdmin.id <= 0) {
    Swal.fire("ข้อผิดพลาด", "ID ของผู้ดูแลไม่ถูกต้อง", "error");
    return;
  }

  try {
    await service.user.updateAdmin(updatedAdmin.id, updatedAdmin);
    Swal.fire(
      "ข้อมูลผู้ดูแลถูกอัปเดตแล้ว",
      "ข้อมูลได้รับการแก้ไขสำเร็จ",
      "success"
    ).then(() => {
      window.location.reload(); // รีโหลดหน้าหลังจากกด OK
    });
  } catch (error: any) {
    console.error("❌ Error Response:", error.response);
    const errorMessage =
      error.response?.data?.message || "ไม่สามารถอัปเดตข้อมูลได้";
    Swal.fire("ข้อผิดพลาด", errorMessage, "error");
  }
};

const submitForm = () => {
  if (admin.value.password) {
    // ตรวจสอบรหัสผ่านที่ยืนยัน
    if (passwordMismatch.value) {
      Swal.fire("รหัสผ่านไม่ตรงกัน", "โปรดยืนยันรหัสผ่านให้ถูกต้อง", "error");
      return;
    }

    // ตรวจสอบรหัสผ่านสั้นเกินไป
    if (passwordTooShort.value) {
      Swal.fire(
        "รหัสผ่านสั้นเกินไป",
        "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัว",
        "error"
      );
      return;
    }
  }

  // เปลี่ยนสถานะเป็นการยืนยัน
  isConfirming.value = true;
};

const confirmPassword = ref("");
const passwordMismatch = computed(() => {
  return (
    admin.value.password &&
    confirmPassword.value &&
    admin.value.password !== confirmPassword.value
  );
});

const isConfirming = ref(false);

const passwordTooShort = computed(() => {
  return (
    admin.value.password &&
    admin.value.password.length > 0 &&
    admin.value.password.length < 8
  );
});

onMounted(() => {
  getAdmininfo();
});
</script>

<style></style>
