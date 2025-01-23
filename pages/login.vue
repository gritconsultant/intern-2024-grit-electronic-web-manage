<template>
  <div
    class="min-h-screen bg-[url('https://static.vecteezy.com/system/resources/previews/042/370/506/non_2x/orange-pastel-gradient-blur-background-vector.jpg')] bg-cover bg-center flex justify-center items-center"
  >
    <form
      class="rounded-2xl drop-shadow-2xl bg-white w-full max-w-[500px] p-6 m-10"
    >
      <!-- Logo -->
      <div class="flex justify-center">
        <img
          src="https://bangkokbrands.com/wp-content/uploads/2023/06/Bangkok-brand-site-logo.png"
          class="w-[190px] sm:w-[230px] md:w-[260px]"
        />
      </div>
      <div class="flex justify-center font-normal text-xl mt-6">
        <h1>เข้าสู่ระบบผู้จัดการ</h1>
      </div>

      <!-- email Input -->
      <div class="text-base mt-10">
        <label for="email"> อีเมล </label>
        <input
          type="text"
          id="email"
          class="inputbox inputboxform"
          required
          placeholder="กรุณาใส่อีเมล"
        />
      </div>

      <!-- Password Input -->
      <div class="text-base mt-6 relative">
        <label for="password"> รหัสผ่าน </label>
        <input
          :type="passwordVisible ? 'text' : 'password'"
          id="password"
          class="inputbox inputboxform"
          required
          placeholder="กรุณาใส่รหัสผ่าน"
        />
        <span
          class="absolute right-4 top-[43px] cursor-pointer"
          @click="togglePasswordVisibility"
        >
          <i :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </span>
      </div>

      <!-- Login Button -->
      <div class="mt-12 flex justify-center">
        <button
          type="submit"
          class="w-full max-w-[300px] h-[45px] bg-[#EE973C] hover:bg-[#FD8C35]/70 rounded-xl text-white text-lg"
          @click="redirectToIndex"
        >
          เข้าสู่ระบบ
        </button>
      </div>

      <!-- Divider -->
      <hr class="border-black/50 my-6" />

      <!-- Register Now -->
      <div class="flex justify-center text-base">
        <p>ไม่มีบัญชีผู้ใช้ ?</p>
        <NuxtLink
          to="/register"
          class="hover:text-[#FD8C35] ml-2 font-normal hover:underline"
        >
          ลงทะเบียน
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useIndexStore } from "~/store/main";

definePageMeta({
  layout: "auth",
});

const passwordVisible = ref(false);
const router = useRouter();
const store = useIndexStore();

// ซ่อนรหัสผ่าน
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const redirectToIndex = () => {
  router.push("/"); // เปลี่ยนไปหน้า index
};
</script>

<style scoped></style>
