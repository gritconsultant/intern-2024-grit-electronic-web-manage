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
            v-model="newAdmin.name"
            type="text"
            id="name"
            class="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <!-- Email field -->
        <div class="mb-4">
          <label for="email" class="block text-[15px]">อีเมล</label>
          <input
            v-model="newAdmin.email"
            type="email"
            id="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <!-- Password field -->
        <div class="mb-4">
          <label for="password" class="block text-[15px]">รหัสผ่าน</label>
          <input
            v-model="newAdmin.password"
            type="password"
            id="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
          <!-- Password length validation -->
          <div v-if="passwordTooShort" class="text-red-500 text-sm mt-2">
            รหัสผ่านต้องมีความยาวอย่างน้อย 10 ตัว
            <span v-if="missingChars > 0">
              (ขาดอีก {{ missingChars }} ตัว)</span
            >
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
          <p><strong>ชื่อ:</strong> {{ newAdmin.name }}</p>
          <p><strong>อีเมล:</strong> {{ newAdmin.email }}</p>
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
            :disabled="passwordMismatch || passwordTooShort"
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
import { v4 as uuidv4 } from "uuid"; // เพิ่มการใช้งาน uuid เพื่อสร้าง id ที่ไม่ซ้ำ

// Props to control modal visibility
const props = defineProps({
  show: Boolean, // To control modal visibility
});

// Emits for communication
const emit = defineEmits(["close", "addAdmin"]);

// Admin data model
const newAdmin = ref({
  name: "",
  email: "",
  password: "",
});

// Confirm password model
const confirmPassword = ref("");

// Check if passwords match
const passwordMismatch = computed(() => {
  return newAdmin.value.password !== confirmPassword.value;
});

// Check if password is long enough
const passwordTooShort = computed(() => {
  return newAdmin.value.password.length < 10;
});

// Calculate how many characters are missing for the password to be 10 characters long
const missingChars = computed(() => {
  return Math.max(0, 10 - newAdmin.value.password.length);
});

// Track if the form is in the confirmation state
const isConfirming = ref(false);

// Method to close the modal with confirmation
const askForConfirmation = () => {
  if (
    confirm("คุณแน่ใจหรือไม่ว่าต้องการปิด? ข้อมูลที่ยังไม่ได้บันทึกจะหายไป")
  ) {
    closeModal();
  }
};

// Method to close the modal
const closeModal = () => {
  emit("close");
  resetForm();
};

// Reset the form fields
const resetForm = () => {
  newAdmin.value = { name: "", email: "", password: "" };
  confirmPassword.value = "";
  isConfirming.value = false;
};

// Method to handle form submission
const submitForm = () => {
  if (!passwordMismatch.value && !passwordTooShort.value) {
    isConfirming.value = true; // Switch to confirmation view
  }
};

// Method to add admin after confirmation
const addAdmin = () => {
  const newAdminWithId = { ...newAdmin.value, id: uuidv4() }; // สร้าง id ใหม่ให้ผู้ดูแล
  emit("addAdmin", newAdminWithId); // ส่งข้อมูลผู้ดูแลที่มี id กลับไปยัง parent
  resetForm(); // รีเซ็ตฟอร์ม
};

// Computed property for controlling modal visibility
const isVisible = computed(() => props.show);
</script>

<style scoped>
/* Styles for modal */
</style>
