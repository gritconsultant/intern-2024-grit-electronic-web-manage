<template>
  <div
    v-if="admin.id != 0"
    class="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center"
  >
    <div class="bg-white p-6 rounded-lg w-[400px]">
      <h2 class="text-[20px] font-semibold mb-4">แก้ไขข้อมูลบัญชีผู้ดูแล</h2>

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
            :disabled="passwordMismatch || passwordTooShort"
          >
            ยืนยัน
          </button>
          <button
            v-if="isConfirming"
            type="button"
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
import type { AdminRes, AdminUpdate } from "~/models/user.model";
import service from "~/service";

const route = useRoute();

const admin = ref<AdminUpdate>({
  id: 0,
  name: "",
  email: " ",
  password: "",
  role_id: 0,
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

const getAdminById = async () => {
  const adminId = route.params.id; // ดึงค่า adminId จาก route.params.id
  console.log("Admin ID from route:", adminId); // เพิ่มบรรทัดนี้เพื่อตรวจสอบค่า

  // ตรวจสอบว่า adminId มีค่าหรือไม่
  if (!adminId || typeof adminId !== "string") {
    console.error("Admin ID is missing or invalid");
    return; // หากไม่มี ID หรือ ID ไม่ถูกต้อง
  }

  await service.user
    .getAdminById(adminId)
    .then((resp: any) => {
      const data = resp.data.data;
      admin.value = {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: data.role_id,
        is_active: data.is_active,
      };
    })
    .catch((error: any) => {
      console.error(error.response);
    })
    .finally(() => {});
};

const updateProduct = async () => {
  await service.user
    .updateAdmin(admin.value)
    .then((resp: any) => {
      const data = resp.data;
      if (data) {
        Swal.fire({
          title: "เพิ่มสินค้าสำเร็จ",
          text: "เพิ่มสินค้า",
          icon: "success",
        });
      }

      const temp: AdminRes = {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: data.role_id,
        is_active: data.is_active,
      };
      adminRes.value = temp;
    })
    .catch((erorr: any) => {
      console.log(erorr.respontse);
    })
    .finally(() => {});
};

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
  return admin.value.password.length < 10;
});

// Calculate how many characters are missing for the password to be 10 characters long
const missingChars = computed(() => {
  return Math.max(0, 10 - admin.value.password.length);
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

const closeModal = () => {
  emit("close"); // This will trigger the parent component to close the modal
};

const props = defineProps({
  show: Boolean, // เพื่อควบคุมการแสดงผลของ modal
  admin: Object as PropType<AdminUpdate | null>, // ข้อมูลของ admin ที่จะทำการแก้ไข
});

// Method to handle form submission
const submitForm = () => {
  if (
    !passwordMismatch.value &&
    !passwordTooShort.value &&
    !isConfirming.value
  ) {
    isConfirming.value = true; // เปลี่ยนไปยังสถานะการยืนยัน
  }
};
// Computed property for controlling modal visibility

onMounted(() => {
  const adminId = route.params.id;

  // ตรวจสอบว่า adminId มีค่าหรือไม่
  console.log("adminId:", adminId); // เพิ่มบรรทัดนี้เพื่อตรวจสอบค่า

  if (adminId && typeof adminId === "string") {
    getAdminById(); // เรียกใช้ getAdminById
  } else {
    console.error("Admin ID is missing or invalid"); // ถ้าไม่มีค่าให้แสดงข้อความผิดพลาด
  }
});
</script>

<style scoped>
/* Add custom styles if needed */
</style>
