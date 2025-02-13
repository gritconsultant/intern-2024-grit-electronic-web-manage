<template>
  <div class="defaultpages p-6">
    <!-- Order Header -->
    <div class="bg-white rounded-xl p-4 flex flex-col dropshadowbox">
      <h1 class="text-3xl font-semibold text-gray-800">
        คำสั่งซื้อ #{{ order.id }}
      </h1>
      <h5 class="text-lg text-gray-600 mt-2">
        ลูกค้า : {{ order.User.id }} {{ order.User.firstname }}
        {{ order.User.lastname }}
      </h5>
    </div>

    <div class="flex gap-8 justify-center w-full h-[80%] mt-8">
      <!-- Product Details Section -->
      <div class="w-[70%] bg-white rounded-xl dropshadowbox p-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">ผลิตภัณฑ์</h3>
        <div class="flex flex-col justify-between h-[95%]">
          <table class="w-full h-[90%]">
            <thead class="w-full">
              <tr class="flex gap-12 border-b-2 border-gray-300">
                <th class="text-gray-600 text-sm w-[20%]">รูป</th>
                <th class="text-gray-600 text-sm w-[20%]">ชื่อ</th>
                <th class="text-gray-600 text-sm w-[20%]">ราคา</th>
                <th class="text-gray-600 text-sm w-[20%]">จำนวน</th>
              </tr>
            </thead>
            <tbody class="flex flex-col h-full w-full mt-2 overflow-y-scroll">
              <tr
                class="w-full text-sm font-normal text-gray-600"
                v-for="(product, index) in order.products"
                :key="index"
              >
                <div class="py-2 w-full flex gap-12">
                  <th class="w-[20%]">
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
                    class="hover:text-orange-600 cursor-pointer w-[20%] flex justify-center items-center"
                  >
                    <th>
                      {{ product.product_name }}
                    </th>
                  </NuxtLink>
                  <th class="w-[20%] flex justify-center items-center">
                    {{ product.price }}
                  </th>
                  <th class="w-[20%] flex justify-center items-center">
                    {{ product.total_product_amount }}
                  </th>
                </div>
              </tr>
            </tbody>
          </table>

          <div
            class="mt-6 border-t-2 border-gray-300 pt-2 flex justify-between items-center text-sm text-gray-700"
          >
            <span>รวมทั้งหมด</span>
            <div class="w-[45%] flex gap-[160px]">
              <span class="ml-[20px]"
                >ราคารวม : {{ order.total_price }} บาท</span
              >
              <span class="">จำนวนรวม : {{ order.total_amount }} ชิ้น</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Shipping Information Section -->
      <div class="w-[30%] flex flex-col gap-6 items-center">
        <div class="w-full bg-white rounded-xl dropshadowbox p-6">
          <h3 class="text-xl font-semibold text-center text-gray-800 mb-6">
            ข้อมูลการจัดส่ง
          </h3>
          <div class="flex flex-col gap-2">
            <p class="text-sm text-gray-700  ">
            <span class="mr-[10px]">ชื่อ:</span> {{ order.Shipment.firstname }} {{ order.Shipment.lastname }}
          </p>
          <p class="text-sm text-gray-700">
            ที่อยู่: {{ order.Shipment.address }} {{ order.Shipment.district }}
            {{ order.Shipment.sub_district }} {{ order.Shipment.province }}
            {{ order.Shipment.zip_code }} 
          </p>
          <p class="text-sm text-gray-700">
            เบอร์โทรศัพท์: {{ order.User.phone }}
          </p>
          </div>
        </div>

        <!-- Order Status Section -->
        <div class="w-full bg-white rounded-xl dropshadowbox p-6">
          <h3 class="text-xl font-semibold text-center text-gray-800 mb-5">
            สถานะคำสั่งซื้อ
          </h3>
          <div class="flex flex-col items-center cursor-pointer">
            <div
              v-if="order.status === 'pending'"
              class="w-[120px] p-[6px] px-4 border-[1px] rounded-[5px] bg-yellow-50 border-yellow-400 text-center font-medium"
              @click="toggleMenu(order.id)"
            >
              รอการชำระ
            </div>
            <div
              v-else-if="order.status === 'prepare'"
              class="w-[120px] p-[6px] px-4 border-[1px] rounded-[5px] bg-orange-50 border-orange-400 text-center font-medium"
              @click="toggleMenu(order.id)"
            >
              เตรียมสินค้า
            </div>
            <div
              v-else-if="order.status === 'ship'"
              class="w-[120px] p-[6px] px-4 border-[1px] rounded-[5px] bg-green-50 border-green-400 text-center font-medium"
              @click="toggleMenu(order.id)"
            >
              กำลังจัดส่ง
            </div>
            <div
              v-else-if="order.status === 'success'"
              class="w-[120px] p-[6px] px-4 border-[1px] rounded-[5px] bg-green-50 border-green-400 text-center font-medium"
              @click="toggleMenu(order.id)"
            >
              จัดส่งเรียบร้อย
            </div>
            <div
              v-else-if="order.status === 'cancelled'"
              class="w-[120px] p-[6px] px-4 border-[1px] rounded-[5px] bg-green-50 border-green-400 text-center font-medium"
              @click="toggleMenu(order.id)"
            >
              ยกเลิก
            </div>
            <div
              v-else
              class="w-[120px] p-[6px] px-4 border-[1px] rounded-[5px] bg-red-50 border-red-600 text-center font-medium"
              @click="toggleMenu(order.id)"
            >
              ชำระล้มเหลว
            </div>
            <div>
              <ul
                class="absolute bg-white border-[1px] rounded-[20px] border-gray-400 shadow-xl py-3 w-[140px] -translate-x-[70px] flex flex-col gap-2 mt-[1px]"
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
    </div>
      <!-- Popup Tracking Number -->
      <div
            v-if="popupVisible"
            class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <div class="bg-white p-5 rounded shadow-lg">
              <h3 class="text-lg font-bold">กรอกเลขพัสดุ</h3>
              <input
                type="text"
                v-model="trackingNumber"
                class="border p-2 w-full"
                placeholder="ใส่เลขพัสดุ"
              />
              <div class="flex justify-end mt-4">
                <button
                  @click="confirmTracking"
                  class="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  ยืนยัน
                </button>
                <button
                  @click="popupVisible = false"
                  class="ml-2 bg-gray-300 px-4 py-2 rounded"
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

const route = useRoute();

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
    .finally(() => {});
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

    if (currentOrder) { // ตรวจสอบว่า currentOrder ไม่เป็น null หรือ undefined
      console.log('Selected order for tracking:', currentOrder); // ตรวจสอบค่าของ order

      if (currentOrder.id === selectedOrderId.value) {
        currentOrder.tracking_number = trackingNumber.value.trim(); // ใช้ .value ในการเข้าถึง order
        currentOrder.status = "ship";

        await updatestatus(selectedOrderId.value, currentOrder);
        Swal.fire("สำเร็จ!", "บันทึกเลขพัสดุและเปลี่ยนสถานะเรียบร้อย", "success");
      }
    } else {
      Swal.fire("ไม่พบข้อมูลคำสั่งซื้อ", "กรุณาลองใหม่อีกครั้ง", "error");
    }
  }

  popupVisible.value = false;
  trackingNumber.value = ""; // Reset tracking number
};



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
