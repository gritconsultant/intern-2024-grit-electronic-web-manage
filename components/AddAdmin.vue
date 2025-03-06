<template>
  <div
    v-if="isVisible"
    class="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center"
  >
    <div class="bg-white p-6 rounded-lg w-[400px]">
      <h2 class="text-[20px] font-semibold mb-4">เพิ่มบัญชีผู้ดูแล</h2>

      <form @submit.prevent="submitForm">
        <!-- Name field -->
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

        <!-- Email field -->
        <!-- Email field -->
        <div class="mb-4">
          <label for="email" class="block text-[15px]">อีเมล</label>
          <input
            v-model="admin.email"
            type="email"
            id="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
            @input="validateEmail"
          />
          <!-- Error message -->
          <div v-if="emailError" class="text-red-500 text-sm mt-2">
            {{ emailErrorMessage }}
          </div>
        </div>

        <!-- Password field -->
        <div class="mb-4">
          <label for="password" class="block text-[15px]">รหัสผ่าน</label>
          <input
            v-model="admin.password"
            type="password"
            id="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
          <!-- Password length validation -->
          <div v-if="passwordTooShort" class="text-red-500 text-sm mt-2">
            รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัว
            <span v-if="missingChars > 0"></span>
          </div>
        </div>

        <!-- Confirm Password field -->
        <div class="mb-4">
          <label for="confirmPassword" class="block text-[15px]"
            >ยืนยันรหัสผ่าน</label
          >
          <input
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            class="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <!-- Password Mismatch Warning -->
        <div v-if="passwordMismatch" class="text-red-500 text-sm mb-4">
          รหัสผ่านไม่ตรงกัน
        </div>

        <!-- Display Admin Details before Confirm -->
        <div v-if="isConfirming" class="mb-4">
          <p><strong>ชื่อ:</strong> {{ admin.name }}</p>
          <p><strong>อีเมล:</strong> {{ admin.email }}</p>
          <p><strong>รหัสผ่าน:</strong> **********</p>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-2">
          <button
            type="button"
            @click="askForConfirmation"
            class="px-4 py-2 bg-gray-300 rounded-md"
          >
            ปิด
          </button>
          <button
            v-if="!isConfirming"
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-md"
            :disabled="passwordMismatch || passwordTooShort || emailError"
          >
            ยืนยัน
          </button>
          <button
            v-if="isConfirming"
            type="button"
            @click="addAdmin"
            class="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            เพิ่ม
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import type { AdminCreate, AdminRes } from "~/models/user.model";
import service from "~/service";

const admin = ref<AdminCreate>({
  name: "",
  email: " ",
  password: "",
  role_id: 1,
  is_active: true,
});

const adminRes = ref<AdminRes>({
  id: 0,
  name: "",
  email: " ",
  password: "",
  role_id: 0,
  is_active: true,
});

const addAdmin = async () => {
  await service.user
    .createAdmin(admin.value)
    .then((resp: any) => {
      console.log(resp.data);
      const data = resp.data;
      if (data) {
        Swal.fire({
          title: "เพิ่มผู้ดูแลสำเร็จ",
          text: "เพิ่มผู้ดูแล",
          icon: "success",
        }).then(() => {
          window.location.reload();
          emit("close"); // ปิดฟอร์มหลังจากแสดงสำเร็จ
        });
      }

      const admin: AdminRes = {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: data.role_id,
        is_active: data.is_active,
      };
      adminRes.value = admin;
    })
    .catch((err: any) => {
      if (err.response?.data?.message === "admin already exists") {
        Swal.fire({
          title: "ข้อผิดพลาด",
          text: "ชื่อนี้มีอยู่แล้ว กรุณาใช้ชื่ออื่น",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      } else {
        console.error(err);
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถเพิ่มผู้ดูแลได้",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      }
    })
    .finally(() => {});
};

// Props to control modal visibility
const props = defineProps({
  show: Boolean, // To control modal visibility
});

// Emits for communication
const emit = defineEmits(["close", "addAdmin"]);

// Confirm password model
const confirmPassword = ref("");

// Check if passwords match
const passwordMismatch = computed(() => {
  return admin.value.password !== confirmPassword.value;
});

// Check if password is long enough
const passwordTooShort = computed(() => {
  return admin.value.password.length < 8;
});

// Calculate how many characters are missing for the password to be 10 characters long
const missingChars = computed(() => {
  return Math.max(0, 10 - admin.value.password.length);
});

// Track if the form is in the confirmation state
const isConfirming = ref(false);

// Method to close the modal with confirmation
const askForConfirmation = () => {
  Swal.fire({
    title: "คุณแน่ใจหรือไม่?",
    text: "ข้อมูลที่ยังไม่ได้บันทึกจะหายไป",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "ใช่, ปิดฟอร์ม",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    if (result.isConfirmed) {
      closeModal();
    }
    window.location.reload();
  });
};

// Method to close the modal
const closeModal = () => {
  emit("close");
};

// Method to handle form submission
const submitForm = () => {
  if (!passwordMismatch.value && !passwordTooShort.value) {
    isConfirming.value = true; // Switch to confirmation view
  }
};

// Computed property for controlling modal visibility
const isVisible = computed(() => props.show);

const emailError = ref(false);
const emailErrorMessage = ref("");

const validateEmail = () => {
  const email = admin.value.email.trim();
  const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  if (!emailPattern.test(email)) {
    emailError.value = true;
    emailErrorMessage.value = "กรุณาใช้ @gmail.com เท่านั้น";
  } else {
    emailError.value = false;
    emailErrorMessage.value = "";
  }
};

</script>

<style scoped>
/* Styles for modal */
</style>
