<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold text-center text-gray-700 mb-6">
        Reset Your Password
      </h2>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-600"
            >Email Address</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div class="mb-4">
          <label
            for="newPassword"
            class="block text-sm font-medium text-gray-600"
            >New Password</label
          >
          <input
            type="password"
            id="newPassword"
            v-model="newPassword"
            class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your new password"
            required
          />
        </div>

        <div class="mb-6">
          <label
            for="confirmPassword"
            class="block text-sm font-medium text-gray-600"
            >Confirm Password</label
          >
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm your new password"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Reset Password
        </button>
      </form>

      <p v-if="message" class="mt-4 text-center text-sm text-gray-600">
        {{ message }}
      </p>

      <!-- Optional password requirement hint -->
      <p class="text-sm text-gray-500 mt-2">
        Password must be at least 8 characters long and contain a mix of
        uppercase, lowercase, and numbers.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const message = ref("");

// Password validation regex
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

const handleSubmit = () => {
  if (newPassword.value !== confirmPassword.value) {
    message.value = "Passwords do not match!";
    return;
  }

  if (!passwordRegex.test(newPassword.value)) {
    message.value =
      "Password must be at least 8 characters long and contain a mix of letters and numbers!";
    return;
  }

  // Simulate password reset process (can replace with an API call)
  message.value = "Your password has been successfully reset!";

  // Redirect to another page (e.g., home or login page) after success
  setTimeout(() => {
    router.push("/"); // Or replace with the path you want to redirect to
  }, 2000); // 2 seconds delay to let the user see the success message
};
</script>

<style scoped>
/* Optional custom styles */
</style>
