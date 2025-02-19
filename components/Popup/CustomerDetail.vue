<template>
  <div
    v-if="showCustomerDetail"
    class="w-[600px] p-5 bg-white absolute top-[300px] left-[700px] rounded-lg dropshadowbox"
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
          <div class="flex gap-2 ">
            <span class="text-[18px] font-semibold bg-white w-[10%]">ที่อยู่</span>
            <div class="text-[20px] pl-[23px] w-full">
              {{ customers.shipment.address }}  {{ customers.shipment.sub_district }} {{ customers.shipment.district }} {{ customers.shipment.province }} {{ customers.shipment.zip_code }}
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
  shipment: {
    id: 0,
    firstname: "",
    lastname: "",
    address:"",
    zip_code:0,
    sub_district: "",
    district: "",
    province: "",
  }
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
    console.log(data);
    
    if (data) {
      customers.value = {
        id: data.id || 0, // Map correctly according to the response
        firstname: data.firstname || "ไม่มีข้อมูล",
        lastname: data.lastname || "ไม่มีข้อมูล",
        username: data.username || "ไม่มีข้อมูล",
        email: data.email || "ไม่มีข้อมูล",
        phone: data.phone || "ไม่มีข้อมูล",
        password: "", // Avoid showing password
        shipment: {
          id: data.shipment.id || 0,
          firstname: data.shipment.firstname || "ไม่มีข้อมูล",
          lastname: data.shipment.lastname || "ไม่มีข้อมูล",
          address: data.shipment.address || "ไม่มีข้อมูล",
          zip_code: data.shipment.zip_code || 0,
          sub_district: data.shipment.sub_district || "ไม่มีข้อมูล",
          district: data.shipment.district || "ไม่มีข้อมูล",
          province: data.shipment.province || "ไม่มีข้อมูล",
        }
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
