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
            v-model="adminupdatepassword.password"
            type="password"
            id="password"
            minlength="8"
            class="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <!-- ✅ แสดงเฉพาะเมื่อรหัสผ่านไม่ถูกต้อง -->
        <div
          v-if="
            adminupdatepassword.password &&
            (!isPasswordValid || passwordTooShort)
          "
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

        <!-- ✅ แสดงเฉพาะเมื่อรหัสผ่านไม่ตรงกัน -->
        <div v-if="passwordMismatch" class="text-red-500 text-sm mb-4">
          รหัสผ่านไม่ตรงกัน
        </div>

        <!-- ✅ แสดงเตือนกรอกยืนยันรหัสผ่านเมื่อกรอกรหัสผ่านใหม่แล้วไม่กรอกช่องยืนยันรหัสผ่าน -->
        <div
          v-if="adminupdatepassword.password && !confirmPassword"
          class="text-red-500 text-sm mb-4"
        >
          กรุณากรอกยืนยันรหัสผ่าน
        </div>

        <div v-if="isConfirming" class="mb-4">
          <p v-if="admin.name !== adminRes.name">
            <strong>ชื่อ:</strong> {{ admin.name }}
          </p>
          <p v-if="admin.email !== adminRes.email">
            <strong>อีเมล:</strong> {{ admin.email }}
          </p>
          <p
            v-if="
              adminupdatepassword.password &&
              adminupdatepassword.password.trim() !== ''
            "
          >
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
              'bg-blue-500': isFormChanged, // ปุ่มสีฟ้าหากมีการเปลี่ยนแปลง
              'bg-gray-300 cursor-not-allowed': !isFormChanged, // ปุ่มสีเทาและไม่สามารถกดได้ถ้าไม่มีการเปลี่ยนแปลง
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
import type {
  AdminRes,
  AdminUpdate,
  AdminUpdatePassword,
} from "~/models/user.model";
import service from "~/service";

const route = useRoute();

const admin = ref<AdminUpdate>({
  id: 0,
  name: "",
  email: "",
});

const adminupdatepassword = ref<AdminUpdatePassword>({
  id: 0,
  password: "",
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
      Swal.fire("ข้อผิดพลาด", "ไม่พบข้อมูลผู้ดูแล", "error");
    });
};

const updateAdmin = async () => {
  const updatedAdmin = {
    id: admin.value.id,
    name: admin.value.name || adminRes.value.name,
    email: admin.value.email || adminRes.value.email,
  };

  console.log("Updated Admin:", updatedAdmin); // เพิ่มการตรวจสอบค่าที่ส่งไป

  try {
    await service.user.updateAdmin(updatedAdmin.id, updatedAdmin);
  } catch (error: any) {
    console.error("❌ Error Response:", error.response);
    throw error;
  }
};

const updateAdminPassword = async () => {
  if (!adminupdatepassword.value.password) {
    return; // ถ้ารหัสผ่านไม่มีการเปลี่ยนแปลงหรือไม่กรอก ก็ไม่ต้องส่ง
  }

  const updatedPasswordData = {
    id: adminupdatepassword.value.id,
    password: adminupdatepassword.value.password,
  };

  console.log("Updated Password Data:", updatedPasswordData); // เพิ่มการตรวจสอบค่าที่ส่งไป

  try {
    await service.user.updateAdminpassword(
      updatedPasswordData.id,
      updatedPasswordData
    );
  } catch (error: any) {
    console.error("❌ Error Response:", error.response);
    throw error;
  }
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
  const password = adminupdatepassword.value.password || "";
  return (
    /[A-Z]/.test(password) && // มีตัวพิมพ์ใหญ่
    /[a-z]/.test(password) && // มีตัวพิมพ์เล็ก
    /\d/.test(password) // มีตัวเลข
  );
});

const submitPasswordForm = () => {
  // ตรวจสอบเงื่อนไขที่คุณตั้งไว้สำหรับรหัสผ่าน
  if (passwordMismatch.value) {
    Swal.fire("รหัสผ่านไม่ตรงกัน", "โปรดยืนยันรหัสผ่านให้ถูกต้อง", "error");
    return false; // ถ้ามีความไม่ตรงกันของรหัสผ่าน
  }

  if (passwordTooShort.value) {
    Swal.fire(
      "รหัสผ่านสั้นเกินไป",
      "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัว",
      "error"
    );
    return false; // ถ้ารหัสผ่านสั้นเกินไป
  }

  // หากเงื่อนไขทั้งหมดผ่าน ก็ให้ return true
  return true;
};

const submitForm = async () => {
  // ตรวจสอบหากไม่มีการเปลี่ยนแปลงอะไรเลย
  if (!isFormChanged.value) {
    Swal.fire("ไม่มีการเปลี่ยนแปลง", "กรุณาทำการเปลี่ยนแปลงข้อมูลก่อน", "info");
    return;
  }

  // ตรวจสอบว่าหากมีการกรอกรหัสผ่านใหม่ แต่ไม่ได้กรอกยืนยันรหัสผ่าน
  if (adminupdatepassword.value.password && !confirmPassword.value) {
    Swal.fire(
      "กรุณากรอกยืนยันรหัสผ่าน",
      "กรุณากรอกยืนยันรหัสผ่านก่อนบันทึก",
      "warning"
    );
    return;
  }

  // ตรวจสอบความถูกต้องของรหัสผ่าน
  if (isPasswordChanged.value && !submitPasswordForm()) {
    return; // หาก submitPasswordForm() ส่ง false กลับมา จะหยุดการทำงานที่นี่
  }

  try {
    // ถ้ามีการเปลี่ยนแปลงข้อมูลส่วนตัว (ชื่อและอีเมล)
    if (isProfileChanged.value) {
      await updateAdmin(); // อัปเดตชื่อและอีเมล
    }

    // ถ้ามีการเปลี่ยนแปลงรหัสผ่าน
    if (isPasswordChanged.value) {
      // ตรวจสอบให้แน่ใจว่าได้ตั้งค่ารหัสผ่านใน adminupdatepassword
      adminupdatepassword.value.id = admin.value.id; // ตั้งค่า ID ให้ถูกต้อง
      await updateAdminPassword(); // อัปเดตรหัสผ่าน
    }

    Swal.fire(
      "ข้อมูลถูกอัปเดตแล้ว",
      "ข้อมูลทั้งหมดได้รับการแก้ไขสำเร็จ",
      "success"
    ).then(() => {
      window.location.reload();
    });
  } catch (error: any) {
    console.error("❌ Error Response:", error);

    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "ไม่สามารถอัปเดตข้อมูลได้";

    Swal.fire("ข้อผิดพลาด", errorMessage, "error");
  }
};

const confirmPassword = ref("");

const passwordMismatch = computed(() => {
  // ตรวจสอบการไม่ตรงกันของรหัสผ่าน
  return (
    adminupdatepassword.value.password &&
    confirmPassword.value &&
    adminupdatepassword.value.password !== confirmPassword.value
  );
});

const passwordTooShort = computed(() => {
  return (
    adminupdatepassword.value.password &&
    adminupdatepassword.value.password.length < 8
  );
});

const isConfirming = ref(false);

const isProfileChanged = computed(() => {
  return (
    admin.value.name !== adminRes.value.name ||
    admin.value.email !== adminRes.value.email
  );
});

const isPasswordChanged = computed(() => {
  return (
    adminupdatepassword.value.password !== adminRes.value.password ||
    confirmPassword.value !== adminupdatepassword.value.password
  );
});

const isFormChanged = computed(() => {
  const profileChanged =
    String(admin.value.name).trim() !== String(adminRes.value.name).trim() ||
    String(admin.value.email).trim() !== String(adminRes.value.email).trim();

  const passwordChanged =
    String(adminupdatepassword.value.password).trim() !== "" &&
    (String(adminupdatepassword.value.password) !==
      String(adminRes.value.password) ||
      String(confirmPassword.value).trim() !==
        String(adminupdatepassword.value.password));

  return profileChanged || passwordChanged;
});

onMounted(() => {
  getadminById();
});
</script>
