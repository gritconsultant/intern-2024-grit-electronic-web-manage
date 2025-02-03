<template>
  <div
    v-if="admin.id && admin.id !== 0"
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

        <div class="mb-4">
          <label for="password" class="block text-[15px]">รหัสผ่าน</label>
          <input
            v-model="admin.password"
            type="password"
            id="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div class="mb-4">
          <label for="confirmPassword" class="block text-[15px]">ยืนยันรหัสผ่าน</label>
          <input
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            class="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div v-if="passwordMismatch" class="text-red-500 text-sm mb-4">
          รหัสผ่านไม่ตรงกัน
        </div>

        <div v-if="isConfirming" class="mb-4">
          <p><strong>ชื่อ:</strong> {{ admin.name }}</p>
          <p><strong>อีเมล:</strong> {{ admin.email }}</p>
          <p><strong>รหัสผ่าน:</strong> **********</p>
        </div>

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
            class="px-4 py-2 bg-green-500 text-white rounded-md"
            @click="updateAdmin"
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
import { ref, computed, watch } from "vue";
import type { AdminUpdate } from "~/models/user.model";
import service from "~/service";

const admin = ref<AdminUpdate>({
  id: 0,
  name: "",
  email: "",
  password: "",
  role_id: 0,
  is_active: true,
  created_at: Date.now(),
  updated_at: Date.now(),
});

const confirmPassword = ref("");
const passwordMismatch = computed(() => admin.value.password !== confirmPassword.value);
const passwordTooShort = computed(() => admin.value.password.length < 10);
const missingChars = computed(() => Math.max(0, 10 - admin.value.password.length));
const isConfirming = ref(false);




// Watch for changes on `admin` to trigger an update
watch(
  () => admin.value.id,
  (newVal) => {
    if (newVal) {
      // trigger any side effects when admin.id changes
    }
  }
);

// Method to update admin data
const updateAdmin = async () => {
  if (passwordMismatch.value || passwordTooShort.value) {
    Swal.fire("ข้อผิดพลาด", "กรุณาตรวจสอบข้อมูลให้ครบถ้วน", "error");
    return;
  }

  await service.user
    .updateAdmin(admin.value)
    .then((resp: any) => {
      Swal.fire(
        "ข้อมูลผู้ดูแลถูกอัปเดตแล้ว",
        "ข้อมูลผู้ดูแลได้รับการแก้ไขสำเร็จ",
        "success"
      );
      emit("close");  // ปิด modal หลังการอัปเดตสำเร็จ
    })
    .catch((error: any) => {
      Swal.fire("ข้อผิดพลาด", "ไม่สามารถอัปเดตข้อมูลผู้ดูแลได้", "error");
      console.error(error.response);
    });
};

// Method to ask for confirmation before closing
const askForConfirmation = () => {
  if (isConfirming.value) {
    // ถ้ากำลังอยู่ในโหมดยืนยันการแก้ไข
    isConfirming.value = false;
  } else {
    if (
      confirm("คุณแน่ใจหรือไม่ว่าต้องการปิด? ข้อมูลที่ยังไม่ได้บันทึกจะหายไป")
    ) {
      emit("close");  // ส่ง event ไปให้ parent component
    }
  }
};

// Method to handle form submission
const submitForm = () => {
  if (passwordMismatch.value) {
    Swal.fire("รหัสผ่านไม่ตรงกัน", "โปรดยืนยันรหัสผ่านให้ถูกต้อง", "error");
    return;
  }

  if (passwordTooShort.value) {
    Swal.fire(
      "รหัสผ่านสั้นเกินไป",
      `รหัสผ่านต้องมีความยาวอย่างน้อย ${missingChars.value} ตัว`,
      "error"
    );
    return;
  }

  isConfirming.value = true;  // เปิดโหมดยืนยันการแก้ไข
};

// Emit close event to parent
const emit = defineEmits(["close"]);
</script>
