<template>
  <div class="defaultpages p-5 ml-5">
    <div class="h-[10%]">
      <div class="bg-slate-500 w-full flex gap-2">
        <h1 class="text-[28px] font-bold">คืนสินค้า #</h1>
        <span class="bg-slate-100 w-[180px]">{{}}</span>
        <div class="flex items-end">
          <div
            class="flex flex-col items-center cursor-pointer"
            v-for="(order, index) in orders"
            :key="index"
          >
            <!-- ส่วนแสดงสถานะ -->
            <div
              class="text-center w-[150px] p-[1px] px-2 border-[1px] rounded-[5px]"
              @click="toggleMenu(order.order_id)"
            >
              {{ order.status }}
            </div>

            <!-- เมนูเลือกสถานะ -->
            <div>
              <ul
                class="absolute bg-white border-[1px] rounded-[20px] border-gray-400 dropshadowbottomsub p-[1px] w-[140px] h-[120px] -translate-x-[70px] z-10"
                v-show="isMenuVisible[order.order_id]"
              >
                <!-- ตรวจสอบว่าไม่ใช่สถานะปัจจุบัน -->
                <li
                  class="h-[25%] hover:bg-slate-300 rounded-t-[19px] flex items-center justify-center"
                  @click="changeStatus(order.order_id, '  รอการตรวจสอบ')"
                  :class="{
                    'bg-gray-200': order.status === '  รอการตรวจสอบ',
                  }"
                  :disabled="order.status === '  รอการตรวจสอบ'"
                >
                  รอการตรวจสอบ
                </li>
                <li
                  class="h-[25%] hover:bg-slate-300 flex items-center justify-center"
                  @click="changeStatus(order.order_id, 'อนุมัติการคืนสินค้า')"
                  :class="{
                    'bg-gray-200': order.status === 'อนุมัติการคืนสินค้า',
                  }"
                  :disabled="order.status === 'อนุมัติการคืนสินค้า'"
                >
                  อนุมัติการคืนสินค้า
                </li>
                <li
                  class="h-[25%] text-[14px] hover:bg-slate-300 flex items-center justify-center"
                  @click="changeStatus(order.order_id, 'การคืนเงินเสร็จสิ้น')"
                  :class="{
                    'bg-gray-200': order.status === 'การคืนเงินเสร็จสิ้น',
                  }"
                  :disabled="order.status === 'การคืนเงินเสร็จสิ้น'"
                >
                  การคืนเงินเสร็จสิ้น
                </li>
                <li
                  class="h-[25%] text-[14px] hover:bg-slate-300 rounded-b-[19px] flex items-center justify-center"
                  @click="
                    changeStatus(order.order_id, 'ไม่อนุมัติการคืนสินค้า')
                  "
                  :class="{
                    'bg-gray-200': order.status === 'ไม่อนุมัติการคืนสินค้า',
                  }"
                  :disabled="order.status === 'ไม่อนุมัติการคืนสินค้า'"
                >
                  ไม่อนุมัติการคืนสินค้า
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-between gap- w-[30%]">
        <h5 class="w-[40%]">หมายเลขคำสั่งซื้อ :</h5>
        <h5 class="w-[60%]">หมายเลขผู้ใช้งาน :</h5>
      </div>
    </div>
    <div class="flex gap-2 w-full h-[85%]">
      <div
        class="flex flex-col gap-2 w-[70%] bg-white dropshadowbottomsub rounded-[5px] p-2"
      >
        <table class="flex flex-col gap-[1px] h-[95%]">
          <thead class="w-full border-b-[2px] border-gray-600 p-2">
            <tr class="flex gap-2 w-full">
              <th class="w-[10%] flex items-center">
                <!-- Checkbox Select All -->
                <div class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="selectAll"
                    class="w-[20px] h-[20-px]"
                    v-model="selectAll"
                    @change="toggleSelectAll"
                  />
                  <label
                    for="selectAll"
                    class="font-semibold text-[12px] cursor-pointer"
                    >เลือกทั้งหมด</label
                  >
                </div>
              </th>
              <th class="w-[30%]">ผลิตภัณฑ์</th>
              <th class="w-[10%]">ราคา</th>
              <th class="w-[10%]">จำนวน</th>
              <th class="w-[10%]">รวม</th>
              <th class="w-[20%]">รายละเอียดคำร้องขอ</th>
            </tr>
          </thead>
          <tbody class="w-full h-[100%] overflow-y-auto">
            <tr
              class="flex gap-2 w-full py-2 h-[10%] hover:bg-[#FFD652]/50"
              v-for="(product, data) in products"
              :key="data"
            >
              <th class="w-[11.3%] flex justify-center items-center">
                <input
                  type="checkbox"
                  class="w-[25px] h-[25px] bg-gray-200 rounded-full checked:bg-green-500 border-2 border-gray-400 checked:border-blue-500 focus:ring-2 focus:ring-purple-500 focus:ring-rounded"
                  v-model="selectedProducts[data]"
                  @change="checkIfAllSelected"
                />
              </th>
              <NuxtLink
                to="/product/[id] "
                class="w-[30%] flex justify-between items-center gap-2 text-black hover:text-orange-600 cursor-pointer"
              >
                <!-- images -->
                <div class="flex justify-center items-center w-full h-full">
                  <img
                    :src="product.img"
                    alt=""
                    class="w-[60px] h-[60px] object-cover place-content-center border-[1px] rounded-[5px]"
                  />
                </div>
                <div
                  class="flex justify-start w-full h-full font-medium text-wrap truncate"
                >
                  {{ product.name }}
                </div>
              </NuxtLink>
              <th class="w-[10.1%] ml-10 text-wrap truncate font-medium">
                ฿{{ product.price }}
              </th>
              <th class="w-[10.12%] text-wrap truncate font-medium">
                {{ product.amount }}
              </th>
              <th class="w-[10.1%] pl-[25px] text-wrap truncate font-medium">
                ฿{{ product.price * product.amount }}
              </th>
              <th class="w-[30%] pl-[25px] text-wrap truncate font-medium"></th>
            </tr>
          </tbody>
        </table>
        <div
          class="flex justify-between h-[5%] border-y-[1px] border-gray-600 font-semibold p-[1px]"
        >
          <span class=" ">รวมทั้งหมด : {{ selectedCount }}</span>
          <div class="w-[38%] flex justify-between">
            <span>จำนวนรวม : {{ totalAmount }} ชิ้น</span>
            <span class="flex w-[50%] pl-[10px]"
              >ราคารวม : {{ totalPrice }} บาท</span
            >
          </div>
        </div>
      </div>
      <div class="w-[30%] px-5 flex flex-col gap-5 items-center 0">
        <!-- หลักฐานการชำระ -->
        <div
          class="flex flex-col gap-5 items-center py-5 w-[90%] h-[60%] bg-white rounded-[5px] dropshadowbottomsub"
        ></div>
        <!-- สถานะคำสั่งซื้อ -->
        <div
          class="flex flex-col gap-2 p-5 w-[90%] h-[30%] bg-white rounded-[5px] dropshadowbottomsub"
        >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from "~/models/product.model";
import Swal from "sweetalert2";
import type { Order } from "~/models/order.model";

// Product data
const products = ref<Product[]>([
  // cate 1
  {
    id: 1,
    name: "มะขาม 4 รส",
    detail: "มะขาม 4 รส มะขามคลุก (บ้านมะขาม) โดยบริษัทสวนผึ้ง จำกัด",
    price: 62,
    amount: 10,
    img: "https://th-test-11.slatic.net/p/2b0d5f80a00b77d2c6490b09a053a1c0.png",
    categoryId: 1,
    status: true,
  },
  {
    id: 2,
    name: "มะขามคลุกบ๊วย 4 รส",
    detail: "มะขามแกะเปลือก ปรุงรสด้วย นำ้ตาล พริก เกลือ และผงบ๊วย",
    price: 62,
    amount: 13,
    img: "https://halal.co.th/storages/products/343928.png",
    categoryId: 1,
    status: true,
  },
  {
    id: 3,
    name: "เลมอนอบแห้ง รสน้ำผึ้ง",
    detail: "เลมอนอบแห้ง ผสมด้วย ผงน้ำผึ้ง",
    price: 59,
    amount: 10,
    img: "https://halal.co.th/storages/products/390694.jpg",
    categoryId: 1,
    status: true,
  },
  {
    id: 4,
    name: "เผือกกรอบไส้เสาวรส",
    detail: "บริษัท สวนผึ้งหวาน จำกัด เผือกกรอบไส้เสาวรส",
    price: 58,
    amount: 20,
    img: "https://halal.co.th/storages/products/680694.jpg",
    categoryId: 1,
    status: true,
  },

  // cate 2
  {
    id: 5,
    name: "เครื่องดื่มรังนกสำเร็จรูป",
    detail: "ดอกบัวคู่ เครื่องดื่มรังนกสำเร็จรูป สูตรดั้งเดิม",
    price: 150,
    amount: 5,
    img: "https://halal.co.th/storages/products/679578.jpg",
    categoryId: 2,
    status: true,
  },
  {
    id: 6,
    name: "เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง",
    detail: "กิฟฟารีน วีทกราส (เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง) (ตรากิฟฟารีน)",
    price: 150,
    amount: 3,
    img: "https://halal.co.th/storages/products/p135225.jpg",
    categoryId: 2,
    status: true,
  },
  {
    id: 7,
    name: "เครื่องดื่มน้ำองุ่นขาว",
    detail:
      "กลูต้า เคอร์คิวมา มินต์ ซี เครื่องดื่มน้ำองุ่นขาว ผสมกลูต้าไธโอนและขมิ้น",
    price: 40,
    amount: 3,
    img: "https://farmfoodsmart.com/upload/products/1634/637982414838759739.png",
    categoryId: 2,
    status: true,
  },
  {
    id: 8,
    name: "เครื่องดื่มสมุนไพรตรีผลา",
    detail: "ชีววิถี เครื่องดื่มสมุนไพรตรีผลา สูตรเข้มข้น รสธรรมชาติ",
    price: 155,
    amount: 3,
    img: "https://obs-ect.line-scdn.net/r/ect/ect/image_1695790690327236876b5788947t124fdd52",
    categoryId: 2,
    status: true,
  },

  // cate 3
  {
    id: 9,
    name: "ครีมบำรุงผิวน้ำนมข้าว",
    detail:
      "	ผลิตภัณฑ์จากข้าวระยะน้ำนม ช่วยถนอมผิวให้เนียนนุ่ม กระชับ ไม่เกิดความระคายเคือง ด้วยคุณค่าจากธรรมชาติอย่างแท้จริง มีวิตามิน E ช่วยบำรุงผิว มีกลิ่นหอม พร้อมผิวนุ่มชุ่มชื่น",
    price: 350,
    amount: 5,
    img: "https://cx.lnwfile.com/_/cx/_resize/250/333/ua/fr/ep.jpg",
    categoryId: 3,
    status: true,
  },
  {
    id: 10,
    name: "ครีมบำรุงผิว น้ำนมข้าวไรซ์เบอร์รี่",
    detail:
      "ผลิตภัณฑ์บำรุงผิวกาย ด้วยคุณค่าสารสกัดจากข้าวไรซ์เบอร์รี่ Antocyanin ช่วยบำรุงผิวพรรณอย่างล้ำลึก ปรับสีผิวให้สม่ำเสมอ ทำให้ผิวแลดูอ่อนเยาว์ และยืดหยุ่นอย่างเป็นธรรมชาติ มี Vitamin E ช่วยคืนความสมดุลให้กับผิว ทำให้ผิวเนียนนุ่มชุ่มชื้น ไม่แห้งกร้าน มีส่วนช่วยทำให้ผิวดูอ่อนโยนน่าสัมผัส พร้อมกลิ่นหอมจากธรรมชาติ ",
    price: 250,
    amount: 3,
    img: "https://cx.lnwfile.com/_/cx/_raw/me/be/uu.jpg",
    categoryId: 3,
    status: true,
  },
  {
    id: 11,
    name: "พิมเสนน้ำ",
    detail:
      "พกพาสะดวก ให้กลิ่นหอม สดชื่น ดมแก้วิงเวียนศีรษะ เมารถ ใช้นวดบรรเทาปวด เมื่อยล้าจากการทำกิจกรรม",
    price: 40,
    amount: 3,
    img: "https://cx.lnwfile.com/_/cx/_raw/vk/e5/12.jpg",
    categoryId: 3,
    status: true,
  },
  {
    id: 12,
    name: "น้ำยาล้างจานกลิ่นตะไคร้หอม",
    detail:
      "น้ำยาล้างจานกลิ่นตะไคร้หอมและยูคาลิปตัส ขนาด 1,000 มล. (Lemon Grass & Eucalyptus Dishwashing Liquid)",
    price: 155,
    amount: 3,
    img: "https://cx.lnwfile.com/_/cx/_raw/h6/kd/qy.jpg",
    categoryId: 3,
    status: true,
  },

  // cate 4
  {
    id: 13,
    name: "เสื้อยืด I Love PATPAT ",
    detail: "	เสื้อยืด I Love PATPAT จากลายพระหัตถ์ (Upcycling T-shirt) - สีขาว",
    price: 200,
    amount: 10,
    img: "https://cx.lnwfile.com/_/cx/_raw/63/ue/5l.jpg",
    categoryId: 4,
    status: true,
  },
  {
    id: 14,
    name: "เสื้อโปโลภัทรพัฒน์ สีแดง",
    detail:
      "เสื้อโปโลภัทรพัฒน์ สีแดง มีทั้งของผู้ชาย และผู้หญิง ผลิตจากผ้า cotton 100% สวมใส่สบาย",
    price: 450,
    amount: 5,
    img: "https://th.kmsupergifts.com/uploads/202339877/ice-silk-polo-shirt0b6dde9e-b771-4ae5-bad2-886041fd6d81.jpg",
    categoryId: 4,
    status: true,
  },
  {
    id: 15,
    name: "กระเป๋าผ้าพิมพ์ลาย",
    detail: "กระเป๋าผ้าสะพายข้าง พิมพ์ลาย ทนทาน น้ำหนักเบา",
    price: 300,
    amount: 8,
    img: "https://image.makewebcdn.com/makeweb/m_1200x600/7zapn1NU1/Fabric%20Bag/21-Pentagram%20music%20bag.jpg",
    categoryId: 4,
    status: true,
  },
  {
    id: 16,
    name: "กระเป๋าเป้ลายสก็อตใหญ่",
    detail:
      "ผลิตภัณฑ์งานหัตถกรรมต่างๆ ถือเป็นภูมิปัญญาของมนุษย์ที่สร้างสรรค์มาจากรุ่นสู่รุ่น บ่งบอกถึงพื้นฐานรากเหง้าของชุมชน",
    price: 550,
    amount: 12,
    img: "https://cx.lnwfile.com/_/cx/_raw/te/ql/5d.png",
    categoryId: 4,
    status: true,
  },

  // cate 5
  {
    id: 17,
    name: "โคมไฟไม้ไผ่",
    detail: "โคมไฟทำจากไม้ไผ่แท้ ให้แสงอบอุ่น เหมาะสำหรับตกแต่งบ้าน",
    price: 600,
    amount: 4,
    img: "https://www.xsxlightfactory.com/uploads/Bamboo-desk-lamp-China.jpg",
    categoryId: 5,
    status: true,
  },
  {
    id: 18,
    name: "พวงกุญแจช้างอัมพร",
    detail: "พวงกุญแจ สามารถนำไปเป็นของฝาก ใช้ห้อยกระเป๋า ห้อยกุญแจรถ",
    price: 100,
    amount: 6,
    img: "https://cx.lnwfile.com/_/cx/_raw/08/dn/3a.png",
    categoryId: 5,
    status: true,
  },
  {
    id: 19,
    name: "กล่องฝาพับลายดอกไม้",
    detail: "	กล่องอเนกประสงค์ สินค้าหัตถกรรมจากกลุ่มชุมชน",
    price: 400,
    amount: 3,
    img: "https://cx.lnwfile.com/_/cx/_raw/nw/am/qk.jpg",
    categoryId: 5,
    status: true,
  },
  {
    id: 20,
    name: "ครอบครัวไก่ เผ่าอาข่า",
    detail: "ตุ๊กตาครอบครัวไก่ ใช้วางตกแต่งบ้าน ร้านค้า ร้านอาหาร",
    price: 275,
    amount: 2,
    img: "https://cx.lnwfile.com/_/cx/_raw/f4/12/hf.png",
    categoryId: 5,
    status: true,
  },
]);

// คำนวณจำนวนรวมของสินค้าที่เลือก
const totalAmount = computed(() => {
  return products.value
    .filter((_, index) => selectedProducts.value[index]) // Filter selected products
    .reduce((sum, product) => sum + product.amount, 0);
});

// คำนวณราคารวมของสินค้าที่เลือก
const totalPrice = computed(() => {
  return products.value
    .filter((_, index) => selectedProducts.value[index]) // Filter selected products
    .reduce((sum, product) => sum + product.price * product.amount, 0);
});

const selectAll = ref(false);

const selectedProducts = ref(Array(products.value.length).fill(false)); // สถานะเริ่มต้นของแต่ละสินค้าเป็น false

// ฟังก์ชันตรวจสอบว่าเลือกทั้งหมดหรือไม่
const checkIfAllSelected = () => {
  selectAll.value = selectedProducts.value.every((selected) => selected);
};

// ฟังก์ชันนับจำนวนที่เลือก
const selectedCount = computed(() => {
  return selectedProducts.value.filter((selected) => selected).length;
});

// ฟังก์ชันเลือกทั้งหมด
const toggleSelectAll = () => {
  const newSelectAllState = selectAll.value;
  selectedProducts.value = Array(products.value.length).fill(newSelectAllState);
};

const isMenuVisible = ref<Record<number, boolean>>({}); // Store visibility state per order

// Toggle the visibility of the menu for a specific order
const toggleMenu = (orderId: number) => {
  // Toggle the menu visibility, close all other menus before opening the new one
  isMenuVisible.value = {
    ...Object.fromEntries(
      Object.keys(isMenuVisible.value).map((key) => [key, false])
    ), // Close all menus
    [orderId]: !isMenuVisible.value[orderId], // Toggle current order's menu
  };
};

const changeStatus = (orderId: number, status: string) => {
  // Find the order by ID
  const order = orders.find((order) => order.order_id === orderId);

  if (order) {
    // Check if the new status is different from the current one
    if (order.status === status) {
      Swal.fire("ไม่สามารถเปลี่ยนสถานะ", "สถานะนี้ได้ถูกตั้งไว้แล้ว", "info");
      return; // Stop execution if the status is the same
    }

    Swal.fire({
      title: "ยืนยันการเปลี่ยนสถานะ",
      text: `คุณต้องการเปลี่ยนสถานะเป็น "${status}" ใช่หรือไม่?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        order.status = status; // Update status
        toggleMenu(orderId); // Close menu
        Swal.fire("สำเร็จ!", `สถานะถูกเปลี่ยนเป็น "${status}" แล้ว`, "success");
      }
    });
  }
};

const orders = <Order[]>[
  {
    order_id: 12346,
    customer: {
      user_id: 102,
      username: "jane_smith",
      email: "jane_smith@example.com",
    },
    total_amount: 500,
    currency: "USD",
    status: "รอการตรวจสอบ",
    created_at: "2024-12-18T09:00:00Z",
    payment_status: "unpaid",
    items: [
      {
        product_id: 203,
        product_name: "Smartwatch Y",
        quantity: 2,
        price: 250,
      },
    ],
  },
];
</script>

<style></style>
