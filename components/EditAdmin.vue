<template>
  <div
    class="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center"
  >
    <div class="bg-white p-6 rounded-lg w-[400px]">
      <h2 class="text-[20px] font-semibold mb-4">แก้ไขข้อมูลบัญชีผู้ดูแล</h2>

      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="name" class="block text-[15px]">ชื่อ</label>
          <input
            v-model="admin.name"
            type="text"
            id="name"
            class="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div class="mb-4">
          <label for="email" class="block text-[15px]">อีเมล</label>
          <input
            v-model="admin.email"
            type="email"
            id="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div class="mb-1">
          <label for="password" class="block text-[15px]">รหัสผ่าน</label>
          <input
            v-model="admin.password"
            type="password"
            id="password"
            minlength="8"
            class="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <!-- ✅ แสดงเฉพาะเมื่อรหัสผ่านไม่ถูกต้อง -->
        <div
          v-if="admin.password && (!isPasswordValid || passwordTooShort)"
          class="text-red-500 text-[11px] mb-4"
        >
          รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัว มีตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก
          และตัวเลข
        </div>

        <div class="mb-4">
          <label for="confirmPassword" class="block text-[15px]"
            >ยืนยันรหัสผ่าน</label
          >
          <input
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            class="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div v-if="passwordMismatch" class="text-red-500 text-sm mb-4">
          รหัสผ่านไม่ตรงกัน
        </div>

        <div v-if="isConfirming" class="mb-4">
          <p v-if="admin.name !== adminRes.name">
            <strong>ชื่อ:</strong> {{ admin.name }}
          </p>
          <p v-if="admin.email !== adminRes.email">
            <strong>อีเมล:</strong> {{ admin.email }}
          </p>
          <p v-if="admin.password && admin.password.trim() !== ''">
            <strong>รหัสผ่าน:</strong> **********
          </p>
        </div>

        <div class="flex justify-end gap-2">
          <!-- ปุ่มปิด -->
          <button
            type="button"
            @click="askForConfirmation"
            class="px-4 py-2 bg-gray-300 rounded-md"
          >
            ปิด
          </button>

          <!-- ปุ่มบันทึก -->
          <button
            v-if="!isConfirming"
            type="submit"
            :class="{
              'bg-blue-500': isFormChanged, // สีฟ้าหากมีการเปลี่ยนแปลง
              'bg-gray-300 cursor-not-allowed': !isFormChanged, // สีเทาและไม่สามารถกดได้ถ้าไม่มีการเปลี่ยนแปลง
            }"
            class="px-4 py-2 text-white rounded-md"
            :disabled="!isFormChanged"
          >
            บันทึก
          </button>

          <!-- ปุ่มยืนยัน -->
          <button
            v-if="isConfirming"
            type="button"
            class="px-4 py-2 bg-green-500 text-white rounded-md"
            @click="updateAdmin"
          >
            ยืนยัน
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import { ref, computed, onMounted } from "vue";
import type { AdminRes, AdminUpdate } from "~/models/user.model";
import service from "~/service";

const route = useRoute();

const admin = ref<AdminUpdate>({
  id: 0,
  name: "",
  email: "",
  password: "",
  role_id: 0,
  is_active: true,
});

const adminRes = ref<AdminRes>({
  id: 0,
  name: "",
  email: "",
  password: "",
  role_id: 0,
  is_active: true,
});

const emit = defineEmits(["close", "editadmin"]);

const props = defineProps({
  adminId: {
    type: Number,
    required: true,
  },
});

const getadminById = async () => {
  const adminId = Number(props.adminId || route.params.id);
  if (isNaN(adminId) || adminId <= 0) {
    console.error("Error: Invalid admin ID", adminId);
    Swal.fire("ข้อผิดพลาด", "ID ของผู้ดูแลไม่ถูกต้อง", "error");
    return;
  }

  await service.user
    .getAdminById(adminId)
    .then((resp: any) => {
      admin.value = resp.data.data;
      adminRes.value = { ...resp.data.data };
    })
    .catch((err: any) => {
      console.log(err.response);
    });
};

const updateAdmin = async () => {
  if (!isFormChanged.value) {
    Swal.fire("ไม่มีการเปลี่ยนแปลง", "ไม่พบข้อมูลที่ต้องการอัปเดต", "info");
    return;
  }
  const updatedAdmin = {
    id: admin.value.id,
    name: admin.value.name || adminRes.value.name,
    email: admin.value.email || adminRes.value.email,
    role_id: admin.value.role_id ?? adminRes.value.role_id,
    is_active: admin.value.is_active ?? adminRes.value.is_active,
    password:
      admin.value.password && admin.value.password.trim() !== ""
        ? admin.value.password
        : undefined, // ถ้าไม่ได้กรอกรหัสใหม่ก็ไม่ส่งค่า password
  };

  console.log("🔍 updatedAdmin:", updatedAdmin); // ตรวจสอบค่าก่อนส่ง API

  if (isNaN(updatedAdmin.id) || updatedAdmin.id <= 0) {
    Swal.fire("ข้อผิดพลาด", "ID ของผู้ดูแลไม่ถูกต้อง", "error");
    return;
  }

  try {
    await service.user.updateAdmin(updatedAdmin.id, updatedAdmin);
    Swal.fire(
      "ข้อมูลผู้ดูแลถูกอัปเดตแล้ว",
      "ข้อมูลผู้ดูแลได้รับการแก้ไขสำเร็จ",
      "success"
    ).then(() => {
      window.location.reload();
    });
  } catch (error: any) {
    console.error(" Error Response:", error.response);
    const errorMessage =
      error.response?.data?.message || "ไม่สามารถอัปเดตข้อมูลผู้ดูแลได้";
    Swal.fire("ข้อผิดพลาด", errorMessage, "error");
  }
  emit("close");
};

const askForConfirmation = () => {
  // ตรวจสอบหากมีข้อผิดพลาดเรื่องรหัสผ่าน
  if (passwordMismatch.value) {
    Swal.fire("รหัสผ่านไม่ตรงกัน", "โปรดยืนยันรหัสผ่านให้ถูกต้อง", "error");
    return;
  }

  // ถ้าอยู่ในโหมดการยืนยันแล้วให้ปิด
  if (isConfirming.value) {
    isConfirming.value = false;
  } else {
    // ถามผู้ใช้ก่อนปิด
    if (
      confirm("คุณแน่ใจหรือไม่ว่าต้องการปิด? ข้อมูลที่ยังไม่ได้บันทึกจะหายไป")
    ) {
      emit("close");
    }
  }
};

const isPasswordValid = computed(() => {
  const password = admin.value.password || "";
  return (
    /[A-Z]/.test(password) && // มีตัวพิมพ์ใหญ่
    /[a-z]/.test(password) && // มีตัวพิมพ์เล็ก
    /\d/.test(password)
  ); // มีตัวเลข
});

const submitForm = () => {
  if (admin.value.password) {
    if (!isPasswordValid.value) {
      Swal.fire(
        "รหัสผ่านไม่ปลอดภัย",
        "รหัสผ่านต้องมีตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก และตัวเลข",
        "error"
      );
      return;
    }

    if (passwordMismatch.value) {
      Swal.fire("รหัสผ่านไม่ตรงกัน", "โปรดยืนยันรหัสผ่านให้ถูกต้อง", "error");
      return;
    }

    if (passwordTooShort.value) {
      Swal.fire(
        "รหัสผ่านสั้นเกินไป",
        "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัว",
        "error"
      );
      return;
    }
  }

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

const passwordTooShort = computed(() => {
  return admin.value.password && admin.value.password.length < 8;
});


const isConfirming = ref(false);

const isFormChanged = computed(() => {
  console.log("isFormChanged", {
    nameChanged: admin.value.name !== adminRes.value.name,
    emailChanged: admin.value.email !== adminRes.value.email,
    passwordChanged: admin.value.password !== adminRes.value.password,
    confirmPasswordChanged:
      confirmPassword.value && confirmPassword.value !== admin.value.password,
    roleChanged: admin.value.role_id !== adminRes.value.role_id,
    isActiveChanged: admin.value.is_active !== adminRes.value.is_active,
  });

  return (
    admin.value.name !== adminRes.value.name ||
    admin.value.email !== adminRes.value.email ||
    admin.value.password !== adminRes.value.password ||
    (confirmPassword.value && confirmPassword.value !== admin.value.password) ||
    admin.value.role_id !== adminRes.value.role_id ||
    admin.value.is_active !== adminRes.value.is_active
  );
});

onMounted(() => {
  getadminById();
});
</script>
