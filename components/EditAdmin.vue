<template>
  <div
    v-show="isVisible"
    class="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center"
  >
    <div class="bg-white p-6 rounded-lg w-[400px]">
      <h2 class="text-[20px] font-semibold mb-4">แก้ไขบัญชีผู้ดูแล</h2>

      <form @submit.prevent="handleFormSubmit">
        <!-- Name field -->
        <div class="mb-4">
          <label for="name" class="block text-[15px]">ชื่อ</label>
          <input
            v-model="adminData.name"
            type="text"
            id="name"
            class="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <!-- Email field -->
        <div class="mb-4">
          <label for="email" class="block text-[15px]">อีเมล</label>
          <input
            v-model="adminData.email"
            type="email"
            id="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <!-- Password field (ถ้ามี) -->
        <div class="mb-4">
          <label for="password" class="block text-[15px]"
            >รหัสผ่านใหม่ (ถ้ามี)</label
          >
          <input
            v-model="adminData.password"
            type="password"
            id="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-md"
            :class="{ 'border-red-500': passwordError }"
          />
          <p v-if="passwordError" class="text-red-500 text-sm mt-1">
            รหัสผ่านต้องมีความยาวมากกว่า 8 ตัวอักษร
            <span v-if="adminData.password.length < 8">
              ขาดอีก {{ 8 - adminData.password.length }} ตัว
            </span>
          </p>
        </div>

        <!-- Confirm password field -->
        <div class="mb-4">
          <label for="confirmPassword" class="block text-[15px]"
            >ยืนยันรหัสผ่านใหม่</label
          >
          <input
            v-model="adminData.confirmPassword"
            type="password"
            id="confirmPassword"
            class="w-full px-4 py-2 border border-gray-300 rounded-md"
            :class="{ 'border-red-500': confirmPasswordError }"
          />
          <p v-if="confirmPasswordError" class="text-red-500 text-sm mt-1">
            รหัสผ่านไม่ตรงกัน
          </p>
        </div>

        <div class="flex justify-end gap-3">
          <button type="button" @click="confirmClose" class="btn-cancel">
            ยกเลิก
          </button>
          <button
            type="button"
            @click="showConfirmModal = true"
            class="btn-submit"
          >
            บันทึกการแก้ไข
          </button>
        </div>
      </form>
    </div>

    <!-- Confirm Modal -->
    <div
      v-show="showConfirmModal"
      class="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center"
    >
      <div class="bg-white p-6 rounded-lg w-[400px]">
        <h3 class="text-[18px] font-semibold mb-4">ยืนยันการเปลี่ยนแปลง</h3>
        <p>คุณแน่ใจหรือไม่ว่าต้องการยืนยันการเปลี่ยนแปลงข้อมูล?</p>
        <div class="flex justify-end gap-3 mt-4">
          <button
            type="button"
            @click="showConfirmModal = false"
            class="btn-cancel"
          >
            ยกเลิก
          </button>
          <button type="button" @click="handleConfirmSubmit" class="btn-submit">
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from "vue";
import type { Admin } from "~/models/user.model";

const props = defineProps({
  show: Boolean,
  admin: Object as () => Admin,
});

const emit = defineEmits(["close", "updateAdmin"]);

const adminData = ref({
  ...props.admin,
  password: "",
  confirmPassword: "",
});

const isVisible = ref(props.show);
const passwordError = ref(false);
const confirmPasswordError = ref(false);
const showConfirmModal = ref(false); // ควบคุมการแสดง Modal ยืนยันการเปลี่ยนแปลง
const closeModal = () => {
  emit("close");
};

const handleFormSubmit = () => {
  // ตรวจสอบรหัสผ่าน ถ้ามี
  if (adminData.value.password && adminData.value.password.length < 8) {
    passwordError.value = true;
    return;
  } else {
    passwordError.value = false;
  }

  // ตรวจสอบการยืนยันรหัสผ่าน ถ้ามีการกรอก
  if (
    adminData.value.password &&
    adminData.value.password !== adminData.value.confirmPassword
  ) {
    confirmPasswordError.value = true;
    return;
  } else {
    confirmPasswordError.value = false;
  }

  // เมื่อกดบันทึก จะเปิด modal ยืนยัน
  showConfirmModal.value = true;
};

// เมื่อยืนยันการแก้ไข
const handleConfirmSubmit = () => {
  // ส่งข้อมูลการอัปเดต
  const updatedData: Partial<Admin> = {
    id: adminData.value.id,
    name: adminData.value.name,
    email: adminData.value.email,
  };

  if (adminData.value.password) {
    updatedData.password = adminData.value.password;
  }

  emit("updateAdmin", updatedData);
  closeModal();
  showConfirmModal.value = false; // ปิด modal ยืนยัน
};

const confirmClose = () => {
  if (confirm("คุณต้องการยกเลิกการแก้ไขหรือไม่?")) {
    closeModal();
  }
};

watch(
  () => props.show,
  (newValue) => {
    isVisible.value = newValue;
  }
);
</script>
