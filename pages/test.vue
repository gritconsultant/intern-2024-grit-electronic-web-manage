<template>
  <div>
    fvcx
  </div>
</template>

<script lang="ts" setup>
import type { Params } from "~/models/order.model";
import type { Order } from '~/models/order.model';
import service from '~/service';

const search = ref<string>("");
const size = ref(8); // ทำให้เป็น ref
const currentPage = ref(1); // ตั้งค่า currentPage เริ่มต้นที่ 1
const orders = ref<Order[]>([]);
const paginate = ref<{ Total: number }>({ Total: 0 });


const getOrderList = async () => {
  const param: Params = {
    page: currentPage.value, // ใช้ .value ในการเข้าถึง currentPage
    size: size.value, // ใช้ .value ในการเข้าถึง size
    search: search.value || "", // ใช้ค่าป้องกันถ้า search เป็น null หรือ undefined
  };

  console.log("Sending param:", param); // ตรวจสอบค่า param ที่ส่งไป

  await service.order
    .getOrderlist(param)
    .then((resp: any) => {
      const data = resp.data.data;
      paginate.value = resp.data.paginate; // ตั้งค่าจำนวนทั้งหมดใหม่

      const orderlist: Order[] = [];

      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const r = data[i];
        const order: Order = {
          id: r.id,
          user_id: r.user_id,
          username: r.username,
          status: r.status,
          total_amount: r.total_amount,
          total_price: r.total_price,
          firstname: r.firstname,
          lastname: r.lastname,
          created_at: r.created_at,
          updated_at: r.updated_at,
          shipment_id: r.shipment_id,
          shipment_firstname: r.shipment_firstname,
          shipment_lastname: r.shipment_lastname,
          shipment_address: r.shipment_address,
          shipment_sub_district: r.shipment_sub_district,
          shipment_district: r.shipment_district,
          shipment_province: r.shipment_province,
          shipment_zip_code: r.shipment_zip_code,
        };
        orderlist.push(order);
      }
      orders.value = orderlist; // Assign the populated order list to orders
    })
    .catch((error: any) => {
      console.error("Error fetching order data:", error);
    })
    .finally(() => {
    });
};

const logsadmin =ref<LogsAdmin>

onMounted(async () => {
  await getOrderList();
});

</script>

<style>

</style>