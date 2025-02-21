<template>
  <div class="defaultpages p-6 pl-7" v-if="order">
    <!-- Order Header -->
    <div class="bg-white rounded-lg p-4 flex justify-between border-[1px] drop-shadow-lg">
      <div>
        <h1 class="text-3xl font-semibold text-gray-800">
          คำสั่งซื้อ #{{ order.id }}
        </h1>
        <h5 class="text-lg text-gray-800 mt-2">
          ลูกค้า : {{ order.User.firstname }}
          {{ order.User.lastname }}
        </h5>
      </div>
      <div class="flex justify-center items-center">
        <!-- Order Status Section -->
        <label for=""></label>
        <div class="flex flex-col items-center cursor-pointer">
          <div
            v-if="order.status === 'pending'"
            class="flex gap-2 w-[140px] p-[6px] px-4 border-[1px] rounded-[5px] bg-yellow-50 border-yellow-400 text-center font-medium"
            @click="toggleMenu(order.id)"
          >
            รอการชำระ
            <div class="w-[25px] flex justify-end items-center">
              <i class="fa-solid fa-caret-down text-[15px]"></i>
            </div>
          </div>
          <div
            v-else-if="order.status === 'paid'"
            class="flex gap-2 w-[140px] p-[6px] px-4 border-[1px] rounded-[5px] bg-blue-30 border-blue-400 text-center font-medium"
            @click="toggleMenu(order.id)"
          >
            ชำระเงินแล้ว
            <div class="w-[16px] flex justify-end items-center">
              <i class="fa-solid fa-caret-down text-[15px]"></i>
            </div>
          </div>
          <div
            v-else-if="order.status === 'prepare'"
            class="flex gap-2 w-[140px] p-[6px] px-4 border-[1px] rounded-[5px] bg-slate-50 border-slate-400 text-center font-medium"
            @click="toggleMenu(order.id)"
          >
            เตรียมสินค้า
            <div class="w-[20px] flex justify-end items-center">
              <i class="fa-solid fa-caret-down text-[15px]"></i>
            </div>
          </div>
          <div
            v-else-if="order.status === 'ship'"
            class="flex gap-2 w-[140px] p-[6px] px-4 border-[1px] rounded-[5px] bg-orange-50 border-orange-400 text-center font-medium"
            @click="toggleMenu(order.id)"
          >
            กำลังจัดส่ง
            <div class="w-[25px] flex justify-end items-center">
              <i class="fa-solid fa-caret-down text-[15px]"></i>
            </div>
          </div>
          <div
            v-else-if="order.status === 'success'"
            class="flex gap-2 w-[140px] p-[6px] px-4 border-[1px] rounded-[5px] bg-green-50 border-green-400 text-center font-medium"
            @click="toggleMenu(order.id)"
          >
            <span> จัดส่งเรียบร้อย </span>
            <div class="w-[25px] flex justify-end items-center">
              <i class="fa-solid fa-caret-down text-[15px]"></i>
            </div>
          </div>
          <div
            v-else-if="order.status === 'cancelled'"
            class="flex gap-2 w-[140px] p-[6px] px-4 border-[1px] rounded-[5px] bg-red-50 border-red-600 text-center font-medium"
            @click="toggleMenu(order.id)"
          >
            ยกเลิก
            <div class="w-full flex justify-end items-center">
              <i class="fa-solid fa-caret-down text-[15px]"></i>
            </div>
          </div>
          <div
            v-else
            class="flex gap-2 w-[140px] p-[6px] px-4 border-[1px] rounded-[5px] bg-red-50 border-red-600 text-center font-medium"
            @click="toggleMenu(order.id)"
          >
            ชำระล้มเหลว
            <div class="w-[13px] flex justify-end items-center">
              <i class="fa-solid fa-caret-down text-[15px]"></i>
            </div>
          </div>
          <div class="  ">
            <ul
              class="absolute bg-white border-[1px] rounded-[20px] border-gray-400 shadow-xl py-3 w-[140px] -translate-x-[70px] flex flex-col gap-2 mt-[1px] z-10"
              v-show="isMenuVisible[order.id]"
            >
              <li
                class="h-[25%] hover:bg-slate-300 flex items-center justify-center cursor-pointer"
                @click="changeStatus(order.id, 'prepare')"
                :class="{ 'bg-gray-200': order.status === 'prepare' }"
                v-if="order.status !== 'prepare'"
              >
                เตรียมสินค้า
              </li>
              <li
                class="h-[25%] hover:bg-slate-300 flex items-center justify-center cursor-pointer"
                @click="changeStatus(order.id, 'ship')"
                :class="{ 'bg-gray-200': order.status === 'ship' }"
                v-if="order.status !== 'ship'"
              >
                กำลังจัดส่ง
              </li>
              <li
                class="h-[25%] text-[14px] hover:bg-slate-300 flex items-center justify-center cursor-pointer"
                @click="changeStatus(order.id, 'failed')"
                :class="{ 'bg-gray-200': order.status === 'failed' }"
                v-if="order.status !== 'failed'"
              >
                ชำระล้มเหลว
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="flex gap-8 justify-center w-full h-[82%] mt-8" v-if="!loading">
      <!-- Product Details Section -->
      <div class="w-[70%] bg-white rounded-lg dropshadowbox p-6">
        <h3 class="text-2xl font-semibold text-gray-800 mb-4">ผลิตภัณฑ์</h3>
        <div class="flex flex-col justify-between h-[95%]">
          <table class="w-full h-[85%]">
            <thead class="w-full">
              <tr class="flex gap-10 border-b-2 border-gray-500 pr-[10px]">
                <th class="text-gray-800 text-lg w-[20%] ">รูป</th>
                <th class="text-gray-800 text-lg w-[20%] ">ชื่อ</th>
                <th class="text-gray-800 text-lg w-[20%] ">ราคา</th>
                <th class="text-gray-800 text-lg w-[20%] ">จำนวน</th>
                <th class="text-gray-800 text-lg w-[20%] ">รวม</th>
              </tr>
            </thead>
            <tbody class="flex flex-col h-full w-full mt-2 overflow-y-scroll">
              <tr
                class="w-full text-[15px] font-normal text-gray-800 border-b-[1px]"
                v-for="(product, index) in order.products"
                :key="index"
              >
                <div class="py-2 w-full flex gap-12">
                  <th class="w-[20%] ">
                    <div class="flex justify-center items-center object-cover">
                      <img
                        :src="product.image"
                        alt=""
                        class="w-[100px] h-[80px] rounded-lg place-content-center dropshadowboxabsolute object-cover"
                      />
                    </div>
                  </th>
                  <NuxtLink
                    :to="`/product/${product.product_id}`"
                    class="hover:text-orange-600 cursor-pointer w-[20%] flex justify-center items-center "
                  >
                    <th>
                      {{ product.product_name }}
                    </th>
                  </NuxtLink>
                  <th class="w-[20%] flex justify-center items-center ">
                    {{ product.price }}
                  </th>
                  <th class="w-[20%] flex justify-center items-center ">
                    {{ product.total_product_amount }}
                  </th>
                  <th class="w-[20%] flex justify-center items-center ">
                    {{ product.price * product.total_product_amount }}
                  </th>
                </div>
              </tr>
            </tbody>
          </table>

          <div
            class="mt-6 border-t-2 border-gray-500 pt-2 flex justify-between items-center text-lg text-gray-700"
          >
            <span class="font-bold ">รวมทั้งหมด</span>
            <div class="w-[45%] flex justify-end  gap-[85px]  ">
              <span class="">จำนวนรวม : {{ order.total_amount }} ชิ้น</span>
              <span class="mr-[60px]"
                >ราคารวม : {{ order.total_price }} บาท</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Shipping Information Section -->
      <div class="w-[30%] flex flex-col gap-6 items-center">
        <div class="w-full h-[60%] bg-white rounded-lg dropshadowbox p-6">
          <h3 class="text-2xl font-semibold text-center text-gray-800 mb-10">
            ข้อมูลการจัดส่ง
          </h3>
          <div class="flex flex-col gap-8 px-5">
            <p class="text-[20px] font-medium">
              <span class="mr-[10px]">ชื่อ:</span>
              {{ order.Shipment.firstname }} {{ order.Shipment.lastname }}
            </p>
            <p class="text-[20px] font-medium">
              ที่อยู่: {{ order.Shipment.address }}
              {{ order.Shipment.district }} {{ order.Shipment.sub_district }}
              {{ order.Shipment.province }}
              {{ order.Shipment.zip_code }}
            </p>
            <p class="text-[20px] font-medium">
              เบอร์โทรศัพท์: {{ order.User.phone }}
            </p>
            <div class="text-[20px] font-medium flex justify-between">
              <div class="w-[90%]">
                ติดตามสินค้า:
                <span class="w-full">
                  {{ order.tracking_number }}
                </span>
              </div>
              <div>
                <i
                  class="fa-solid fa-pen-to-square text-orange-500 cursor-pointer"
                  @click="popupVisible = true"
                ></i>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full h-[40%] bg-white rounded-lg dropshadowbox p-6">
          <h3 class="text-2xl font-semibold text-center text-gray-800 mb-10">
            ข้อมูลการการชำระ
          </h3>
          <div
            class="flex flex-col justify-center items-center gap-4 text-[20px]"
          >
            <span class="mr-[10px]">วันเวลาการโอน </span>
            {{ formatDateTime(order.Payment.date) }}
          </div>
        </div>
      </div>
    </div>
    <div v-else class="absolute left-[1000px] top-[550px]">
      <svg
        aria-hidden="true"
        class="w-16 h-16 text-gray-200 animate-spin dark:text-gray-800 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
    <!-- Popup Tracking Number -->
    <div
      v-if="popupVisible"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-5 rounded shadow-lg">
        <h3 class="text-lg font-bold flex justify-center mb-2">กรอกเลขพัสดุ</h3>
        <input
          type="text"
          v-model="trackingNumber"
          class="border p-2 w-full rounded-lg"
          placeholder="ใส่เลขพัสดุ"
        />
        <div class="flex justify-center mt-4">
          <button
            @click="confirmTracking"
            class="bg-blue-500 w-[60px] text-white p-2 rounded" 
          >
            ยืนยัน
          </button>
          <button
            @click="popupVisible = false"
            class="ml-2 bg-gray-300 w-[60px] p-2 rounded"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { OrderRes, UpdateStatusOrder } from "~/models/order.model";
import Swal from "sweetalert2";
import service from "~/service";

import { useIndexStore } from "~/store/main";

definePageMeta({
  middleware: "auth",
});

const store = useIndexStore();

const route = useRoute();
const loading = ref(false);

const order = ref<OrderRes>({
  id: 0,
  User: {
    id: 0,
    firstname: "",
    lastname: "",
    phone: "",
  },
  products: [
    {
      product_id: 0,
      product_name: "",
      price: 0,
      total_product_amount: 0,
      image: "",
    },
  ],
  Payment: {
    id: 0,
    price: 0,
    bank_name: "",
    account_name: "",
    account_number: "",
    status: "",
    date: "",
  },
  SystemBank: {
    id: 0,
    bank_name: "",
    account_name: "",
    account_number: "",
    description: "",
    image: "",
  },
  Shipment: {
    id: 0,
    firstname: "",
    lastname: "",
    address: "",
    zip_code: "",
    sub_district: "",
    district: "",
    province: "",
  },
  total_amount: 0,
  total_price: 0,
  tracking_number: "",
  status: "",
  created_at: 0,
  updated_at: 0,
});

const getOrderById = async () => {
  loading.value = true;
  await service.order
    .getOrderById(route.params.id)
    .then((resp: any) => {
      const data = resp.data.data;

      console.log(data);

      const orders: OrderRes = {
        id: data.id ?? 0, // ใช้ `data.id` หรือค่า 0 ถ้าไม่มี
        User: {
          id: data.User?.id ?? 0, // เปลี่ยนจาก `data.user` เป็น `data.User`
          firstname: data.User?.firstname ?? "",
          lastname: data.User?.lastname ?? "",
          phone: data.User?.phone ?? "",
        },
        products: Array.isArray(data.products)
          ? data.products.map((product: any) => ({
              product_id: product.product_id ?? 0,
              product_name: product.product_name ?? "",
              price: product.price ?? 0,
              total_product_amount: product.total_product_amount ?? 0,
              image: product.image ?? "",
            }))
          : [
              {
                product_id: 0,
                product_name: "",
                price: 0,
                total_product_amount: 0,
                image: "",
              },
            ],
        Payment: {
          id: data.Payment?.id ?? 0, // เปลี่ยนจาก `data.payment` เป็น `data.Payment`
          price: data.Payment?.price ?? 0,
          bank_name: data.Payment?.bank_name ?? "",
          account_name: data.Payment?.account_name ?? "",
          account_number: data.Payment?.account_number ?? "",
          status: data.Payment?.status ?? "",
          date: data.Payment?.date ?? "",
        },
        SystemBank: {
          id: data.SystemBank?.id ?? 0, // เปลี่ยนจาก `data.system_bank` เป็น `data.SystemBank`
          bank_name: data.SystemBank?.bank_name ?? "",
          account_name: data.SystemBank?.account_name ?? "",
          account_number: data.SystemBank?.account_number ?? "",
          description: data.SystemBank?.description ?? "",
          image: data.SystemBank?.image ?? "",
        },
        Shipment: {
          id: data.Shipment?.id ?? 0, // เปลี่ยนจาก `data.shipment` เป็น `data.Shipment`
          firstname: data.Shipment?.firstname ?? "",
          lastname: data.Shipment?.lastname ?? "",
          address: data.Shipment?.address ?? "",
          zip_code: data.Shipment?.zip_code ?? "",
          sub_district: data.Shipment?.sub_district ?? "",
          district: data.Shipment?.district ?? "",
          province: data.Shipment?.province ?? "",
        },
        total_amount: data.total_amount ?? 0,
        total_price: data.total_price ?? 0,
        tracking_number: data.tracking_number ?? "",
        status: data.status ?? "",
        created_at: data.created_at ?? 0,
        updated_at: data.updated_at ?? 0,
      };
      order.value = orders;
    })
    .catch((error: any) => {
      console.log(error.response);
    })
    .finally(() => {
      loading.value = false;
    });
};

const status = ref<UpdateStatusOrder>({
  id: 0,
  status: "",
  tracking_number: "",
});

const isMenuVisible = ref<Record<number, boolean>>({}); // Store visibility state per order
const popupVisible = ref(false);
const trackingNumber = ref("");
const selectedOrderId = ref<number | null>(null);

// Toggle the visibility of the menu for a specific order
const toggleMenu = (orderId: number) => {
  isMenuVisible.value = {
    ...Object.fromEntries(
      Object.keys(isMenuVisible.value).map((key) => [key, false])
    ),
    [orderId]: !isMenuVisible.value[orderId],
  };

  if (!isMenuVisible.value[orderId]) {
    // Reset tracking number and selected order id when closing the menu
    trackingNumber.value = "";
    selectedOrderId.value = null;
  }
};

const changeStatus = async (orderId: number, status: string) => {
  const currentOrder = order.value; // เข้าถึงค่าของ order จาก ref
  if (!currentOrder) return; // ถ้า order เป็น null ให้ return ออก

  if (currentOrder.id !== orderId) return;

  if (currentOrder.status === status) {
    Swal.fire("ไม่สามารถเปลี่ยนสถานะ", "สถานะนี้ได้ถูกตั้งไว้แล้ว", "info");
    return;
  }

  if (status === "ship") {
    selectedOrderId.value = orderId;
    popupVisible.value = true;
    return;
  }

  const result = await Swal.fire({
    title: "ยืนยันการเปลี่ยนสถานะ",
    text: `คุณต้องการเปลี่ยนสถานะเป็น "${status}" ใช่หรือไม่?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  });

  if (result.isConfirmed) {
    currentOrder.status = status;
    await updatestatus(orderId, currentOrder);
    Swal.fire("สำเร็จ!", "เปลี่ยนสถานะเรียบร้อย", "success");
  }
};

const confirmTracking = async () => {
  if (!trackingNumber.value.trim()) {
    Swal.fire("กรุณาใส่เลขพัสดุ", "", "warning");
    return;
  }

  if (selectedOrderId.value !== null) {
    const currentOrder = order.value; // ใช้ตัวแปรที่ชัดเจนเพื่อเข้าถึง order

    if (currentOrder) {
      // ตรวจสอบว่า currentOrder ไม่เป็น null หรือ undefined
      console.log("Selected order for tracking:", currentOrder); // ตรวจสอบค่าของ order

      if (currentOrder.id === selectedOrderId.value) {
        currentOrder.tracking_number = trackingNumber.value.trim(); // ใช้ .value ในการเข้าถึง order
        currentOrder.status = "ship";

        await updatestatus(selectedOrderId.value, currentOrder);
        Swal.fire(
          "สำเร็จ!",
          "บันทึกเลขพัสดุและเปลี่ยนสถานะเรียบร้อย",
          "success"
        );
      }
    } else {
      Swal.fire("ไม่พบข้อมูลคำสั่งซื้อ", "กรุณาลองใหม่อีกครั้ง", "error");
    }
  }

  popupVisible.value = false;
  trackingNumber.value = ""; // Reset tracking number
};

const formatDateTime = (dateInput: string | number) => {
  let date: Date;

  if (typeof dateInput === "string") {
    date = new Date(dateInput); // ถ้าเป็น ISO string
  } else {
    date = new Date(dateInput * 1000); // ถ้าเป็น Unix timestamp
  }

  if (isNaN(date.getTime())) return "ไม่มีข้อมูล"; // ตรวจสอบค่า

  return (
    date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }) +
    ` เวลา ${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")} น.`
  );
};

// ตัวอย่างการใช้งาน
console.log(formatDateTime("2025-02-13T12:37")); // 13 กุมภาพันธ์ 2025 เวลา 12:37 น.

const updatestatus = async (orderId: number, order: any) => {
  await service.order
    .updateStatusOrder(orderId, order)
    .then((resp: any) => {
      const data = resp.data;

      const orderstatus: UpdateStatusOrder = {
        id: data.id,
        status: data.status,
        tracking_number: data.tracking_number,
      };
      status.value = orderstatus;
    })
    .catch((error: any) => {
      console.log(error.response);
      Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถอัปเดตคำสั่งซื้อได้", "error");
    });
};

onMounted(() => {
  getOrderById();
});
</script>

<style></style>
