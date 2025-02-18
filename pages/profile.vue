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
import Swal from "sweetalert2";
import type { AdminUpdate, AdminInfo } from "~/models/user.model";
import service from "~/service";
import { useIndexStore } from "~/store/main"

definePageMeta({
  middleware: "auth",
});

const store = useIndexStore();


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
