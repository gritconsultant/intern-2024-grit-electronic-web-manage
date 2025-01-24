<template>
  <div class="w-[300px] h-[500px] bg-white rounded-[20px] absolute z-10 p-2 dropshadowbottomsub">
    <h1 class="text-center text-[15px] text-main mb-4">แจ้งเตือน</h1>

    <!-- Notification List -->
    <div v-if="notifications.length > 0">
      <div v-for="(notification, index) in notifications" :key="index" class="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded">
        <p class="text-sm text-gray-700">{{ notification.message }}</p>
        <button
          class="text-red-500 hover:text-red-700"
          @click="removeNotification(index)"
        >
          ❌
        </button>
      </div>
    </div>

    <!-- No Notifications Message -->
    <p v-else class="text-sm text-gray-500 text-center">ไม่มีการแจ้งเตือน</p>

    <!-- Clear All Button -->
    <div v-if="notifications.length > 0" class="text-center mt-4">
      <button
        class="w-full py-1 bg-gray-500 text-white text-sm rounded-md hover:bg-gray-600"
        @click="clearNotifications"
      >
        ลบทั้งหมด
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

// รับ prop notifications จาก parent component
const props = defineProps({
  notifications: {
    type: Array,
    required: true
  }
});

// ส่ง event ไปยัง parent component เพื่อให้ลบ notification
const emit = defineEmits();

// Remove a Single Notification
const removeNotification = (index: number) => {
  emit("remove-notification", index); // ส่ง event ให้ parent
};

// Clear All Notifications
const clearNotifications = () => {
  emit("clear-notifications"); // ส่ง event ให้ parent
};
</script>

<style scoped>
.dropshadowbottomsub {
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}
.text-main {
  color: #4a90e2;
}
</style>
