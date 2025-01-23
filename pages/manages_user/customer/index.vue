<template>
  <div class="defaultpages flex flex-col gap-2">
    <div class="flex items-center justify-between h-[10%] pl-[35px]">
      <h1 class="text-[25px] font-bold">รายการบัญชีลูกค้า</h1>
    </div>
    <div class="flex gap-2 w-[80%] pl-[35px]">
      <div class="w-[40%]">
        <!-- ใช้ v-model เพื่อเชื่อมต่อกับ searchTerm -->
        <Search v-model="filters.searchTerm" />
      </div>
    </div>
    <div class="w-full h-[90%] mt-5 pt-2 bg-white dropshadowtop">
      <table class="flex flex-col px-8 gap-2 w-full">
        <thead class="w-full border-b-[2px] border-gray-400 pb-2 pt-3">
          <tr class="flex gap-5">
            <th class="w-[10%] text-start">หมายเลขผู้ใช้งาน</th>
            <th class="w-[15%]">ชื่อ</th>
            <th class="w-[30%]">อีเมล</th>
            <th class="w-[15%]">จำนวนคำสั่งซื้อ</th>
            <th class="w-[25%]"></th>
          </tr>
        </thead>
        <tbody class="w-full text-[15px]  ">
          <tr v-for="(customer, index) in filteredCustomers" :key="index" class="flex gap-5 py-[2px] border-b-[1px] ">
            <th class="w-[10%] font-medium truncate flex gap-2 justify-between border-r-[2px]">
              {{ customer.id }}
            </th>
            <th class="w-[15%] font-medium truncate border-r-[2px]">{{ customer.name }}</th>
            <th class="w-[30%] font-medium truncate border-r-[2px]">{{ customer.email }}</th>
            <th class="w-[15%] font-medium truncate ">{{ customer.orders }}</th>
            <th class="w-[25%] font-medium flex justify-end truncate">
              <NuxtLink :to="'/manages_user/customer/' + customer.id">
                <i class="fa-regular fa-eye text-[20px]"></i>
              </NuxtLink>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">

const customers = ref([
  { id: '1', name: 'Customer One', email: 'customer1@example.com', orders: 5 },
  { id: '2', name: 'Customer Two', email: 'customer2@example.com', orders: 3 },
  { id: '3', name: 'Customer Three', email: 'customer3@example.com', orders: 2 },
]);

const filters = ref({
  searchTerm: '', // ค่าที่จะใช้ใน v-model
});

const filteredCustomers = ref(customers.value);

// ฟังก์ชันที่ใช้กรองข้อมูลลูกค้าตาม searchTerm
watch(() => filters.value.searchTerm, (newSearchTerm) => {
  filteredCustomers.value = customers.value.filter(customer =>
    customer.name.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(newSearchTerm.toLowerCase())
  );
});
</script>

<style scoped>
/* เพิ่มสไตล์ที่ต้องการ */
</style>
