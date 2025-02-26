<template>
  <div class="defaultpages flex flex-col gap-4 p-6 bg-gray-50">
    <div
      class="flex items-center justify-center h-[10%] bg-white rounded-lg dropshadowbox"
    >
      <h1 class="text-[25px] font-bold">โปรไฟล์</h1>
    </div>
    <div
      v-if="!loading"
      class="bg-white w-full h-[90%] rounded-lg dropshadowbox pt-[100px] flex flex-col gap-2 items-center"
    >
      <div
        class="h-[12%] bg-orange-400 border-orange-200 border-2 flex items-center justify-center w-[80px] rounded-full"
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

        <div class="flex  justify-end">
          <button
            @click="popeditpassword = true"
            class="bg-orange-500 text-white p-2 rounded-md w-[200px]"
          >
            แก้ไขรหัสผ่าน
          </button>
        </div>

        <div class="flex items-center justify-center h-10 mt-[100px]">
          <button
            @click="updateAdmin"
            :disabled="isSaveDisabled"
            class="bg-orange-300 text-white p-2 rounded-md w-[200px] hover:bg-orange-500 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            บันทึกข้อมูล
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

    <div
      v-if="popeditpassword === true"
      class="bg-black/80 fixed inset-0 w-full h-full flex flex-col items-center justify-center pl-10 text-[20px]"
    >
      <div class="bg-white p-10 w-[40%] h-[40%] rounded-lg">
        <div class="flex flex-col gap-2 mb-4">
          <label for="password" class="text-gray-600">รหัสผ่านใหม่</label>
          <input
            v-model="adminupdatepassword.password"
            type="password"
            id="password"
            minlength="8"
            class="p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <!-- ✅ แสดงเฉพาะเมื่อรหัสผ่านไม่ถูกต้อง -->
          <div
            v-if="!isPasswordValid || passwordTooShort"
            class="text-red-500 text-sm"
          >
            รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัว มีตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก
            และตัวเลข
          </div>
        </div>

        <div class="flex flex-col gap-2 mt-5">
          <label for="confirmPassword" class="text-gray-600"
            >ยืนยันรหัสผ่าน</label
          >
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

        <button class="mt-[60px] flex justify-center gap-4 items-center w-full">
          <button
            @click="popeditpassword = false"
            class="bg-gray-500 text-white p-2 rounded-md w-[200px] disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            ปิด
          </button>
          <button
            @click="updatePassword"
            :disabled="isPasswordSaveDisabled"
            class="bg-blue-500 text-white p-2 rounded-md w-[200px] transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            ยืนยันแก้ไขรหัสผ่าน
          </button>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Swal from "sweetalert2";
import type {
  AdminUpdate,
  AdminInfo,
  AdminUpdatePassword,
} from "~/models/user.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";

definePageMeta({
  middleware: "auth",
});

const store = useIndexStore();

const loading = ref(false);

const getinfo = ref<AdminInfo & { password?: string }>({
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
  password: "",
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
});

const adminupdatepassword = ref<AdminUpdatePassword>({
  id: 0,
  password: "",
});

const updateAdmin = async () => {
  const updatedAdmin: any = {
    id: getinfo.value.id,
    name: getinfo.value.name,
    email: getinfo.value.email,
  };

  // ตรวจสอบการเปลี่ยนแปลงของชื่อและอีเมล
  const isUpdated =
    updatedAdmin.name !== initialValues.value.name ||
    updatedAdmin.email !== initialValues.value.email;

  // ถ้าไม่มีการเปลี่ยนแปลง
  if (!isUpdated) {
    Swal.fire("ไม่มีการเปลี่ยนแปลง", "ข้อมูลไม่ถูกปรับปรุง", "info");
    return;
  }

  // ตรวจสอบ ID ผู้ดูแล
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
    console.error("Error Response:", error.response);
    const errorMessage =
      error.response?.data?.message || "ไม่สามารถอัปเดตข้อมูลได้";
    Swal.fire("ข้อผิดพลาด", errorMessage, "error");
  }
};

const updatePassword = async () => {
  // ตรวจสอบว่ารหัสผ่านใหม่ถูกกรอกหรือไม่
  if (
    !adminupdatepassword.value.password ||
    adminupdatepassword.value.password === ""
  ) {
    Swal.fire("ข้อผิดพลาด", "กรุณากรอกรหัสผ่านใหม่", "error");
    return;
  }

  // สร้างข้อมูลที่ต้องการอัปเดต โดยส่งแค่รหัสผ่าน
  const updatedAdmin: any = {
    id: getinfo.value.id,
    password: adminupdatepassword.value.password, // ส่งแค่รหัสผ่าน
  };

  // ตรวจสอบ ID ว่าถูกต้องหรือไม่
  if (isNaN(updatedAdmin.id) || updatedAdmin.id <= 0) {
    Swal.fire("ข้อผิดพลาด", "ID ของผู้ดูแลไม่ถูกต้อง", "error");
    return;
  }

  try {
    await service.user.updateAdminpassword(updatedAdmin.id, updatedAdmin);
    Swal.fire(
      "ข้อมูลผู้ดูแลถูกอัปเดตแล้ว",
      "รหัสผ่านได้รับการแก้ไขสำเร็จ",
      "success"
    ).then(() => {
      // อัปเดตข้อมูลใน state โดยใช้รหัสผ่านใหม่
      getinfo.value.password = adminupdatepassword.value.password;
      // ปิดหน้าต่างแก้ไขรหัสผ่าน
      popeditpassword.value = false;
      // รีโหลดหน้า
      window.location.reload();
    });
  } catch (error: any) {
    console.error("Error Response:", error.response);
    const errorMessage =
      error.response?.data?.message || "ไม่สามารถอัปเดตข้อมูลได้";
    Swal.fire("ข้อผิดพลาด", errorMessage, "error");
  }
};

const submitForm = () => {
  if (adminupdatepassword.value.password) {
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

  // หากข้อมูลถูกต้องแล้ว ก็สามารถทำการส่งข้อมูล
  isConfirming.value = true;
};

const confirmPassword = ref("");

const passwordMismatch = computed(() => {
  return (
    adminupdatepassword.value.password &&
    confirmPassword.value &&
    adminupdatepassword.value.password !== confirmPassword.value
  );
});

const isPasswordValid = computed(() => {
  return (
    /[A-Z]/.test(adminupdatepassword.value.password) &&
    /[a-z]/.test(adminupdatepassword.value.password) &&
    /\d/.test(adminupdatepassword.value.password)
  );
});

const initialValues = ref({
  name: "",
  email: "",
});

const saveInitialValues = () => {
  initialValues.value.name = getinfo.value.name;
  initialValues.value.email = getinfo.value.email;
};

const isSaveDisabled = computed(() => {
  // ✅ ตรวจสอบการเปลี่ยนแปลงของชื่อและอีเมล
  const isNameChanged = getinfo.value.name !== initialValues.value.name;
  const isEmailChanged = getinfo.value.email !== initialValues.value.email;

  // ✅ ถ้ามีการเปลี่ยนแปลงของชื่อหรืออีเมล ให้สามารถบันทึกได้
  if (isNameChanged || isEmailChanged) {
    return false; // กดปุ่มบันทึกได้
  }

  return true; // ถ้าไม่มีการเปลี่ยนแปลงอะไร กดไม่ได้
});

const isPasswordSaveDisabled = computed(() => {
  // ✅ ถ้ารหัสผ่านใหม่ต้องกรอกยืนยันรหัสผ่านด้วย
  if (adminupdatepassword.value.password && !confirmPassword.value) {
    return true;
  }

  // ✅ ถ้ารหัสผ่านใหม่ไม่ตรงกัน ห้ามกดบันทึก
  if (passwordMismatch.value) {
    return true;
  }

  // ✅ ตรวจสอบรหัสผ่านตามเงื่อนไข
  if (passwordTooShort.value || !isPasswordValid.value) {
    return true; // หากรหัสผ่านไม่ถูกต้องหรือสั้นเกินไป
  }

  return false; // ถ้ารหัสผ่านถูกต้องสามารถบันทึกได้
});

const isConfirming = ref(false);

const passwordTooShort = computed(() => {
  return (
    adminupdatepassword.value.password &&
    adminupdatepassword.value.password.length < 8
  );
});

const popeditpassword = ref(false);

onMounted(() => {
  getAdmininfo();
  // เรียก saveInitialValues หลังจากข้อมูลถูกโหลดเสร็จ
  getAdmininfo().then(() => {
    saveInitialValues(); // เก็บค่าเริ่มต้นของชื่อและอีเมล
  });
});
</script>

<style></style>
