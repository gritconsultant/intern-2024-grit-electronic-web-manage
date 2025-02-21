<template>
  <div
    class="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center"
    v-if="showCustomerDetail"
  >
    <div class="bg-white rounded-lg w-[400px]">
      <button
        @click="closeCustomerDetail"
        class="text-gray-500 hover:text-red-600 text-xl flex justify-end w-[400px] p-1 absolute"
      >
        <i class="fa-solid fa-circle-xmark"></i>
      </button>
      <div class="p-6">
        <h2 class="text-[20px] font-semibold mb-4">
          ข้อมูลบัญชีลูกค้า
        </h2>
        <form action="">
          <div class="mb-4">
            <label for="name" class="block text-[15px]">ชื่อ</label>
            <div class="text-[20px] pl-[20px] w-full py-1 border-b-[1px] border-gray-500 ">
              {{ customers.firstname }} {{ customers.lastname }}
            </div>
          </div>
          <div class="mb-4">
            <label for="name" class="block text-[15px]">อีเมล</label>
            <div class="text-[20px] pl-[20px] w-full border-b-[1px] border-gray-500">
              {{ customers.email }}
            </div>
          </div>
          <div class="mb-4">
            <label for="name" class="block text-[15px]">เบอร์โทรศัพท์</label>
            <div class="text-[20px] pl-[20px] w-full border-b-[1px] border-gray-500">
              {{ customers.phone }}
            </div>
          </div>
          <div class="mb-4">
            <label for="name" class="block text-[15px]">ที่อยู่</label>
            <div class="text-[20px] pl-[20px] w-full">
              {{ customers.shipment.address }}
              {{ customers.shipment.sub_district }}
              {{ customers.shipment.district }}
              {{ customers.shipment.province }}
              {{ customers.shipment.zip_code }}
            </div>
          </div>
          <div class="flex justify-end">
            <button
            type="button"
            class="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            แก้ไขรหัสผ่าน
          </button>
          </div>
        </form>
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
    address: "",
    zip_code: 0,
    sub_district: "",
    district: "",
    province: "",
  },
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
          id: data.shipment.id,
          firstname: data.shipment.firstname ,
          lastname: data.shipment.lastname ,
          address: data.shipment.address  || "ไม่มีข้อมูล" ,
          zip_code: data.shipment.zip_code ,
          sub_district: data.shipment.sub_district ,
          district: data.shipment.district ,
          province: data.shipment.province ,
        },
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
