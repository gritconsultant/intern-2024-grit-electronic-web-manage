<template>
  <div
    v-if="showCustomerDetail"
    class="w-[800px] p-5 bg-white absolute top-[200px] left-[650px] rounded-lg dropshadowbox"
  >
    <div class="h-[8%] flex justify-center">
      <!-- แสดง Customer ID -->
      <h1 class="text-[28px] font-bold">ลูกค้า #{{ customers.id }}</h1>
      <button
        @click="closeCustomerDetail"
        class="text-gray-500 hover:text-black text-xl p-2 absolute right-1 top-1"
      >
        ✖
      </button>
    </div>
    <!-- Customer Info and Orders -->
    <div class="w-full flex justify-center gap-5 mt-4">
      <div
        class="bg-white h-[45%] w-[80%] p-4 rounded-[5px] dropshadowbottomsub"
      >
        <div class="flex justify-center">
          <div class="border-2 border-black rounded-[5px] px-2 py-[3px]">
            <i class="fa-solid fa-user"></i>
          </div>
        </div>
        <div class="flex flex-col gap-5 mt-8 h-[80%]">
          <div class="flex gap-2">
            <span class="text-[20px] font-semibold">ชื่อ</span>
            <div class="text-[20px] pl-[39px] w-full">
              {{ customers.firstname }} {{ customers.lastname }}
            </div>
          </div>
          <div class="flex gap-2">
            <span class="text-[20px] font-semibold">อีเมล</span>
            <div class="text-[20px] pl-[20px] w-full">
              {{ customers.email }}
            </div>
          </div>
          <div class="flex gap-2">
            <span class="text-[20px] font-semibold">เบอร์</span>
            <div class="text-[20px] pl-[20px] w-full">
              {{ customers.phone }}
            </div>
          </div>
          <div class="flex gap-2 h-full">
            <span class="text-[20px] font-semibold w-[50px]">ที่อยู่</span>
            <div class="text-[20px] pl-[20px] h-full text-wrap w-full">
              บ้านเลขที่ 123 หมู่ที่ 4 ตำบลในเมือง อำเภอเมือง จังหวัดอุบลราชธานี
              34000
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { CustomerRes } from "~/models/user.model";
import service from "~/service";

const route = useRoute();

// State to store customer data
const customers = ref<CustomerRes>({
  id: 0,
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  phone: "",
  password: "", // Avoid showing password
});

const emit = defineEmits(["close", "customerdetails"]);

const props = defineProps({
  customersId: {
    type: Number,
    required: true,
  },
});

// State to control the visibility of the customer detail modal
const showCustomerDetail = ref(true); // Initially false, can be set true when needed

// Function to get customer details by ID
const getCustomerById = async () => {
  const customersId = props.customersId || route.params.id;
  if (!customersId) {
    console.error("ไม่พบ customerId ใน URL");
    return;
  }
  try {
    const response = await service.user.getCustomerById(customersId);
    const data = response.data.data; // Access the nested 'data' object
    if (data) {
      customers.value = {
        id: data.ID || 0, // Map correctly according to the response
        firstname: data.FirstName || "ไม่มีข้อมูล",
        lastname: data.LastName || "ไม่มีข้อมูล",
        username: data.Username || "ไม่มีข้อมูล",
        email: data.Email || "ไม่มีข้อมูล",
        phone: data.Phone || "ไม่มีข้อมูล",
        password: "", // Avoid showing password
      };
      console.log("Customer Data:", customers.value);
      showCustomerDetail.value = true; // Show the customer detail modal
    }
  } catch (error) {
    console.error("ไม่สามารถดึงข้อมูลลูกค้าได้:", error);
  }
};

const closeCustomerDetail = () => {
  showCustomerDetail.value = false;
  emit("close"); // Emit the close event to parent
};

onMounted(() => {
  getCustomerById();
});
</script>

<style scoped>
/* Custom Styles */
</style>
