<template>
  <div class="defaultpages flex flex-col gap-2 p-6 bg-gray-50">
    <!-- Header Section -->
    <div
      class="flex items-center justify-between h-[10%] bg-white pl-[10px] rounded-lg dropshadowbox"
    >
      <h1 class="text-[25px] font-bold">รายการบัญชีลูกค้า</h1>
    </div>

    <!-- Search Section -->
    <div class="flex gap-2 w-[80%]">
      <div class="w-[40%]">
        <!-- Search Bar -->
        <div class="relative w-full">
          <input
            type="search"
            class="w-full h-10 pl-12 pr-4 rounded-full border border-orange-400 focus:ring-2 focus:ring-orange-500 outline-none text-gray-800"
            placeholder="ค้นหาสินค้า"
            v-model="search"
            @keyup.enter="getCustomerlist"
          />
          <i
            class="fa-solid fa-magnifying-glass absolute left-4 top-2 text-gray-500 text-lg"
          ></i>
        </div>
      </div>
    </div>

    <!-- Customer Table Section -->
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
        <tbody class="w-full text-[15px]">
          <tr
            v-for="(customer, index) in customers"
            :key="index"
            class="flex gap-5 py-[2px] border-b-[1px]"
          >
            <th
              class="w-[10%] font-medium truncate flex gap-2 justify-between border-r-[2px]"
            >
              {{ customer.id }}
            </th>
            <th class="w-[15%] font-medium truncate border-r-[2px]">
              {{ customer.firstname }}
            </th>
            <th class="w-[30%] font-medium truncate border-r-[2px]">
              {{ customer.email }}
            </th>
            <th class="w-[15%] font-medium truncate"></th>
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
import type { Customer } from "~/models/user.model";
import service from "~/service";

const search = ref<string>("");
const customers = ref<Customer[]>([]);

const getCustomerlist = async () => {
  await service.user
    .getCustomertList()
    .then((resp: any) => {
      const data = resp.data.data;
      const customerlist: Customer[] = [];
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const c = data[i];
        const customer: Customer = {
          id: c.id,
          firstname: c.firstname,
          lastname: c.lastname,
          username: c.username,
          password: c.password,
          email: c.email,
          phone: c.phone,
          created_at: c.CreatedAt,
          updated_at: c.UpdatedAt,
        };
        customerlist.push(customer);
      }
      customers.value = customerlist;
    })
    .catch((err: any) => {
      console.error(err);
    })
    .finally(() => {});
};

onMounted(async () => {
  await getCustomerlist();
});
</script>

<style scoped>
/* เพิ่มสไตล์ที่ต้องการ */
</style>
