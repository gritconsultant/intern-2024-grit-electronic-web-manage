<template>
  <!-- Profile -->
  <div class="flex justify-center items-center gap-2 pr-[40px]">
    <div class="w-[40px] h-[40px] rounded-full bg-[#F68D44]">
      <div class="flex items-center justify-center gap-2">
        <!-- Dropdown -->
        <div class="relative group flex justify-end">
          <i class="fa-solid fa-user m-1 text-l rounded-full p-2 bg-white"></i>
          <!-- Dropdown menu -->
          <div
            class="absolute bg-white rounded-lg border shadow w-44 hidden group-hover:block z-10 mt-[40px]"
          >
            <ul class="py-2 text-sm text-gray-700">
              <NuxtLink to="/profile">
                <li class="block px-4 py-2 hover:bg-gray-100">โปรไฟล์</li>
              </NuxtLink>
              <!-- ออกจากระบบ -->
              <li
                class="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                @click="logout"
              >
                ออกจากระบบ
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useIndexStore } from "~/store/main";
import { useRouter } from "vue-router";

// ใช้ Pinia store
const store = useIndexStore();
const router = useRouter();

// ฟังก์ชัน logout
const logout = () => {
  // ลบข้อมูลใน store
  store.$state.token = '';
  store.$state.userId = '';

  // ลบคุกกี้จาก sessionStorage หรือ localStorage
  sessionStorage.removeItem("token");
  localStorage.removeItem("token");

  // ลบคุกกี้ที่ชื่อว่า 'token'
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

  // เปลี่ยนเส้นทางไปหน้าล็อกอิน
  router.push("/login");
};
</script>

<style></style>
