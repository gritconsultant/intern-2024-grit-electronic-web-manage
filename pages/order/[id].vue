<template>
  <div class="defaultpages p-5">
    <div class="h-[10%]">
      <h1 class="text-[28px] font-bold">คำสั่งซื้อ # {{}}</h1>
      <h5 class=" ">หมายเลขผู้ใช้งาน :</h5>
    </div>
    <div class="flex gap-2 w-full h-[85%]">
      <div class="flex flex-col gap-2 w-[70%]">
        <table class="flex flex-col gap-[1px] h-[95%]">
          <thead class="w-full border-y-[1px] border-gray-600">
            <tr class="flex gap-2 w-full">
              <th class="w-[40%]">ผลิตภัณฑ์</th>
              <th class="w-[20%]">ราคา</th>
              <th class="w-[20%]">จำนวน</th>
              <th class="w-[20%]">รวม</th>
            </tr>
          </thead>
          <tbody class="w-full h-[100%] overflow-y-auto">
            <tr
              class="flex gap-2 place-content-center w-full h-[10%] hover:bg-[#FFD652]/50"
              v-for="(product, data) in products"
              :key="data"
            >
              <NuxtLink
                to="/product/[id] "
                class="w-[41%] flex justify-between items-center gap-2 text-black hover:text-orange-600 cursor-pointer"
              >
                <!-- images -->
                <div class="flex justify-center items-center w-full h-full">
                  <img
                    :src="product.img"
                    alt=""
                    class="w-[65px] h-[65px] object-cover place-content-center border-[1px] rounded-[5px]"
                  />
                </div>
                <div
                  class="flex justify-start w-full h-full font-medium text-wrap truncate"
                >
                  {{ product.name }}
                </div>
              </NuxtLink>
              <th class="w-[20%] text-wrap truncate font-medium">
                ฿{{ product.price }}
              </th>
              <th class="w-[20%] text-wrap truncate font-medium">
                {{ product.amount }}
              </th>
              <th class="w-[20%] pl-[25px] text-wrap truncate font-medium">
                ฿{{ product.price * product.amount }}
              </th>
            </tr>
          </tbody>
        </table>
        <div
          class="flex justify-between h-[5%] border-y-[1px] border-gray-600 font-semibold"
        >
          <span class=" ">รวมทั้งหมด</span>
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
        >
          <!-- slip -->
          <img
            class="w-[300px] h-[360px] flex items-center justify-center place-content-center object-fill border-[1px] border-black rounded-[5px]"
            src="https://s359.kapook.com/pagebuilder/ba154685-db18-4ac7-b318-a4a2b15b9d4c.jpg"
            alt=""
          />
          <div class="flex flex-col gap-2 items-center">
            <h3 class="font-semibold">วัน/เวลา</h3>
            <span class=" ">--/--/---- --/--</span>
          </div>
        </div>
        <!-- สถานะคำสั่งซื้อ -->
        <div
          class="flex flex-col gap-2 p-5 w-[90%] h-[30%] bg-white rounded-[5px] dropshadowbottomsub"
        >
          <h3 class="text-[20px] text-center font-bold">สถานะสินค้า</h3>
          <div class="flex flex-col mt-5    ">
            <div class="flex flex-col items-center cursor-pointer" v-for="(order, index) in orders" :key="index">
              <div
                class="text-center   p-[1px] px-2 w-[50%] border-[1px] rounded-[5px] bg-white dropshadowbottomsub "
                @click="toggleMenu(order.order_id)"
              >
                {{ order.status }}
              </div>
              <div>
                <ul
                  class="absolute bg-white border-[1px] rounded-[20px] border-gray-400 dropshadowbottomsub p-[1px] w-[140px] h-[120px] -translate-x-[70px]"
                  v-if="isMenuVisible[order.order_id]"
                >
                  <li
                    class="h-[25%] hover:bg-slate-300 rounded-t-[19px] flex items-center justify-center"
                    @click="changeStatus(order.order_id, 'รอการชำระ')"
                  >
                    รอการชำระ
                  </li>
                  <li
                    class="h-[25%] hover:bg-slate-300 flex items-center justify-center"
                    @click="changeStatus(order.order_id, 'กำลังจัดส่ง')"
                  >
                    กำลังจัดส่ง
                  </li>
                  <li
                    class="h-[25%] text-[14px] hover:bg-slate-300 flex items-center justify-center"
                    @click="changeStatus(order.order_id, 'จัดส่งเรียบร้อย')"
                  >
                    จัดส่งเรียบร้อย
                  </li>
                  <li
                    class="h-[25%] text-[14px] hover:bg-slate-300 rounded-b-[19px] flex items-center justify-center"
                    @click="changeStatus(order.order_id, 'ชำระล้มเหลว')"
                  >
                    ชำระล้มเหลว
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from "~/models/product.model";
import { ref, computed } from "vue";
import { useIndexStore } from "~/store/main";
import type { Order } from "~/models/order.model";

const store = useIndexStore();

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

// Update the status of the order
const changeStatus = (orderId: number, status: string) => {
  const order = orders.find((order) => order.order_id === orderId);
  if (order) {
    order.status = status; // Change the status of the order
    toggleMenu(orderId); // Close the dropdown menu after selection
  }
};

const orders = <Order[]>[
  {
    order_id: 12345,
    customer: {
      user_id: 101,
      username: "john_doe",
      email: "john_doe@example.com",
    },
    total_amount: 1250,
    currency: "USD",
    status: "delivered",
    created_at: "2024-12-15T08:30:00Z",
    payment_status: "paid",
    items: [
      {
        product_id: 201,
        product_name: "Smartphone X Pro",
        quantity: 1,
        price: 1000,
      },
      {
        product_id: 202,
        product_name: "Wireless Headphones",
        quantity: 1,
        price: 250,
      },
    ],
  },
];

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
  },
  {
    id: 2,
    name: "มะขามคลุกบ๊วย 4 รส",
    detail: "มะขามแกะเปลือก ปรุงรสด้วย นำ้ตาล พริก เกลือ และผงบ๊วย",
    price: 62,
    amount: 13,
    img: "https://halal.co.th/storages/products/343928.png",
    categoryId: 1,
  },
  {
    id: 3,
    name: "เลมอนอบแห้ง รสน้ำผึ้ง",
    detail: "เลมอนอบแห้ง ผสมด้วย ผงน้ำผึ้ง",
    price: 59,
    amount: 10,
    img: "https://halal.co.th/storages/products/390694.jpg",
    categoryId: 1,
  },
  {
    id: 4,
    name: "เผือกกรอบไส้เสาวรส",
    detail: "บริษัท สวนผึ้งหวาน จำกัด เผือกกรอบไส้เสาวรส",
    price: 58,
    amount: 20,
    img: "https://halal.co.th/storages/products/680694.jpg",
    categoryId: 1,
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
  },
  {
    id: 6,
    name: "เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง",
    detail: "กิฟฟารีน วีทกราส (เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง) (ตรากิฟฟารีน)",
    price: 150,
    amount: 3,
    img: "https://halal.co.th/storages/products/p135225.jpg",
    categoryId: 2,
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
  },
  {
    id: 8,
    name: "เครื่องดื่มสมุนไพรตรีผลา",
    detail: "ชีววิถี เครื่องดื่มสมุนไพรตรีผลา สูตรเข้มข้น รสธรรมชาติ",
    price: 155,
    amount: 3,
    img: "https://obs-ect.line-scdn.net/r/ect/ect/image_1695790690327236876b5788947t124fdd52",
    categoryId: 2,
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
  },
  {
    id: 15,
    name: "กระเป๋าผ้าพิมพ์ลาย",
    detail: "กระเป๋าผ้าสะพายข้าง พิมพ์ลาย ทนทาน น้ำหนักเบา",
    price: 300,
    amount: 8,
    img: "https://image.makewebcdn.com/makeweb/m_1200x600/7zapn1NU1/Fabric%20Bag/21-Pentagram%20music%20bag.jpg",
    categoryId: 4,
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
  },
  {
    id: 18,
    name: "พวงกุญแจช้างอัมพร",
    detail: "พวงกุญแจ สามารถนำไปเป็นของฝาก ใช้ห้อยกระเป๋า ห้อยกุญแจรถ",
    price: 100,
    amount: 6,
    img: "https://cx.lnwfile.com/_/cx/_raw/08/dn/3a.png",
    categoryId: 5,
  },
  {
    id: 19,
    name: "กล่องฝาพับลายดอกไม้",
    detail: "	กล่องอเนกประสงค์ สินค้าหัตถกรรมจากกลุ่มชุมชน",
    price: 400,
    amount: 3,
    img: "https://cx.lnwfile.com/_/cx/_raw/nw/am/qk.jpg",
    categoryId: 5,
  },
  {
    id: 20,
    name: "ครอบครัวไก่ เผ่าอาข่า",
    detail: "ตุ๊กตาครอบครัวไก่ ใช้วางตกแต่งบ้าน ร้านค้า ร้านอาหาร",
    price: 275,
    amount: 2,
    img: "https://cx.lnwfile.com/_/cx/_raw/f4/12/hf.png",
    categoryId: 5,
  },
]);

// คำนวณจำนวนรวม
const totalAmount = computed(() => {
  return products.value.reduce((sum, product) => sum + product.amount, 0);
});

// คำนวณราคารวม
const totalPrice = computed(() => {
  return products.value.reduce(
    (sum, product) => sum + product.price * product.amount,
    0
  );
});
</script>

<style></style>
