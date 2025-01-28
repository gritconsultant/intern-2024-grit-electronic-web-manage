<template>
  <div
    class="min-h-screen bg-[url('https://static.vecteezy.com/system/resources/previews/042/370/506/non_2x/orange-pastel-gradient-blur-background-vector.jpg?v=1.1')] bg-cover bg-center flex justify-center items-center"
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
          v-model="logins.email"
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
          v-model="logins.password"
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
          type="button"
          class="w-full max-w-[300px] h-[45px] bg-[#EE973C] hover:bg-[#FD8C35]/70 rounded-xl text-white text-lg"
          @click="login"
        >
          เข้าสู่ระบบ
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { Login } from "~/models/page.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";

const store = useIndexStore();

definePageMeta({
  layout: "auth",
});

const passwordVisible = ref(false);
const router = useRouter();

// ซ่อนรหัสผ่าน
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const logins = ref<Login>({
  email: "",
  password: "",
});

const login = async () => {
  await service.login
    .login(logins.value)
    .then((resp: any) => {
      // เซ็ต Cookie
      console.log(resp.data);
      const reftoken = useStatefulCookie("token");
      reftoken.value = resp.data.token;
      store.$state.token = resp.data.token;

      if (store.$state.token != null) {
        router.push("/");
      }
    })
    .catch((err: any) => {
      console.error(err);
      alert(err.response?.data?.message || "เข้าสู่ระบบล้มเหลว");
    })
    .finally(() => {});
  // tast
};
</script>

<style scoped></style>
