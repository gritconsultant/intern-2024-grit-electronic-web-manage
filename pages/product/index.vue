<template>
  <div class="defaultpages">
    <div class="pages">
      <!-- Header -->
      <hr class="hrpages" />
      <!-- Body -->
      <div class="flex gap-2 p-1 h-[100%] w-ful">
        <!-- รายการคำสั่งซื้อ -->
        <div class="p-2 h-full w-[80%] roundedmain bg-[#FFFAE9]">
          <div class="flex justify-between gap-2">
            <h1 class="flex items-center textmain font-bold text-[25px]">
              รายการผลิตภัณฑ์
            </h1>
            <div class="w-[40%]">
              <Search />
            </div>
            <div class="flex gap-2">
              <div class="relative group flex justify-center">
                <div
                  class="flex justify-center items-center w-[40px] h-full rounded-full drop-shadow-lg cursor-pointer bg-[#F68D44]"
                >
                  <i class="fa-solid fa-plus text-[30px]"></i>
                </div>
                <!-- Dropdown manu -->
                <div
                  class="absolute bg-white rounded-lg border shadow w-44 z-10 hidden group-hover:block mr-[220px]"
                >
                  <ul class="py-2 text-sm text-gray-700">
                    <li class="block px-4 py-2 hover:bg-gray-100">
                      <div >
                      เพิ่มสินค้า                      </div>
                    </li>
                    <li class="block px-4 py-2 hover:bg-gray-100">
                      <NuxtLink to="/add/addcategory"
                        >เพิ่มประเภทสินค้า</NuxtLink
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <DropdownCategory />
            </div>
          </div>
          <div class="h-[90%] mt-2">
            <table class="w-full text-[#2B1E28] font-semibold">
              <thead class="border-b-2 border-[#7A4711]">
                <tr class="flex gap-2 w-full">
                  <th class="flex justify-start w-[20%]">หมายเลขสินค้า</th>
                  <th class="w-[20%]">รูปผลิตภัณฑ์</th>
                  <th class="w-[20%]">ชื่อสินค้า</th>
                  <th class="w-[20%]">ประเภท</th>
                  <th class="w-[20%]">ราคา</th>
                  <th class="w-[15%]">จำนวนคงเหลือ</th>
                  <th class="w-[5%]"></th>
                </tr>
              </thead>
              <tbody
                v-for="(products, data) in products.slice(0 - 10)"
                :key="data"
              >
                <tr class="flex gap-2 text- hover:bg-[#F68D44]/50 mt-[11px]">
                  <td class="w-[20%] truncate">{{ products.id }}</td>
                  <td class="w-[20%] text-center truncate flex justify-center">
                    <img
                      :src="products.img"
                      alt=""
                      class="object-cover border-2 border-orange-800/50 w-[30%] h-[99%] place-content-center"
                    />
                  </td>
                  <td class="w-[20%] text-center truncate">
                    {{ products.name }}
                  </td>
                  <td class="w-[20%] text-center truncate">
                    {{ products.categoryId }}
                  </td>
                  <td class="w-[20%] text-center truncate">
                    {{ products.price }}
                  </td>
                  <td
                    class="w-[15%] flex text-center justify-center items-center truncate"
                  >
                    <span v-if="products.amount == 0">
                      <div
                        class="flex justify-center items-center text-[15px] bg-red-600 p-2 text-white w-[150px] h-[35px] rounded-full dropshadowbottomsub"
                      >
                        ผลิตภัณฑ์หมด
                      </div>
                    </span>
                    <span v-else>
                      <div>
                        {{ products.amount }}
                      </div>
                    </span>
                  </td>
                  <td
                    class="w-[5%] text-center truncate flex gap-2 justify-end items-center pr-[5px]"
                  >
                    <div>
                      <i
                        class="fa-solid fa-trash-can text-red-600 hover:text-red-950 hover:translate-x-1 duration-300"
                      ></i>
                    </div>
                    <NuxtLink
                      to=""
                      class="cursor-pointer hover:translate-x-1 duration-300"
                    >
                      <i
                        class="fa-solid fa-pen-to-square text-slate-700 hover:text-black"
                      ></i>
                    </NuxtLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- paginate -->
          <div class="mt-[10px]">
            <Paginate />
          </div>
        </div>
        <div class="flex flex-col gap-2 h-full w-[20%]">
          <!-- ยอดรวมคำสั่งซื้อ -->
          <div
            class="w-full h-[40%] p-2 roundedmain bg-[#FFFAE9] dropshadowbottomsub"
          >
            <h1 class="text-[20px] text-center font-bold">
              จำนวนสินค้าทั้งหมด
            </h1>
            <hr class="hrpages" />
            <div class="flex items-center place-content-center h-[85%]"></div>
          </div>
          <!-- ยอดรวมแต่ละประเภท -->
          <div
            class="w-full h-[60%] p-2 roundedmain bg-[#FFFAE9] dropshadowbottomsub"
          >
            <h1 class="text-[20px] text-center font-bold">
              จำนวนสินค้าแต่ละประเภท
            </h1>
            <hr class="hrpages" />
            <div class="flex items-center place-content-center h-[85%]"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Category, Product } from "~/models/product.model";
import Addproduct from "../add/addproduct.vue";
import { PopupAddproduct } from "#build/components";

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
    categoryId: "อาหาร",
  },
  {
    id: 2,
    name: "มะขามคลุกบ๊วย 4 รส",
    detail: "มะขามแกะเปลือก ปรุงรสด้วย นำ้ตาล พริก เกลือ และผงบ๊วย",
    price: 62,
    amount: 13,
    img: "https://halal.co.th/storages/products/343928.png",
    categoryId: "อาหาร",
  },
  {
    id: 3,
    name: "เลมอนอบแห้ง รสน้ำผึ้ง",
    detail: "เลมอนอบแห้ง ผสมด้วย ผงน้ำผึ้ง",
    price: 59,
    amount: 10,
    img: "https://halal.co.th/storages/products/390694.jpg",
    categoryId: "อาหาร",
  },
  {
    id: 4,
    name: "เผือกกรอบไส้เสาวรส",
    detail: "บริษัท สวนผึ้งหวาน จำกัด เผือกกรอบไส้เสาวรส",
    price: 58,
    amount: 20,
    img: "https://halal.co.th/storages/products/680694.jpg",
    categoryId: "อาหาร",
  },

  // cate 2
  {
    id: 5,
    name: "เครื่องดื่มรังนกสำเร็จรูป",
    detail: "ดอกบัวคู่ เครื่องดื่มรังนกสำเร็จรูป สูตรดั้งเดิม",
    price: 150,
    amount: 5,
    img: "https://halal.co.th/storages/products/679578.jpg",
    categoryId: "เครื่องดื่ม",
  },
  {
    id: 6,
    name: "เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง",
    detail: "กิฟฟารีน วีทกราส (เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง) (ตรากิฟฟารีน)",
    price: 150,
    amount: 3,
    img: "https://halal.co.th/storages/products/p135225.jpg",
    categoryId: "เครื่องดื่ม",
  },
  {
    id: 7,
    name: "เครื่องดื่มน้ำองุ่นขาว",
    detail:
      "กลูต้า เคอร์คิวมา มินต์ ซี เครื่องดื่มน้ำองุ่นขาว ผสมกลูต้าไธโอนและขมิ้น",
    price: 40,
    amount: 3,
    img: "https://farmfoodsmart.com/upload/products/1634/637982414838759739.png",
    categoryId: "เครื่องดื่ม",
  },
  {
    id: 8,
    name: "เครื่องดื่มสมุนไพรตรีผลา",
    detail: "ชีววิถี เครื่องดื่มสมุนไพรตรีผลา สูตรเข้มข้น รสธรรมชาติ",
    price: 155,
    amount: 3,
    img: "https://obs-ect.line-scdn.net/r/ect/ect/image_1695790690327236876b5788947t124fdd52",
    categoryId: "เครื่องดื่ม",
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
    categoryId: "สมุนไพร",
  },
  {
    id: 10,
    name: "ครีมบำรุงผิว น้ำนมข้าวไรซ์เบอร์รี่",
    detail:
      "ผลิตภัณฑ์บำรุงผิวกาย ด้วยคุณค่าสารสกัดจากข้าวไรซ์เบอร์รี่ Antocyanin ช่วยบำรุงผิวพรรณอย่างล้ำลึก ปรับสีผิวให้สม่ำเสมอ ทำให้ผิวแลดูอ่อนเยาว์ และยืดหยุ่นอย่างเป็นธรรมชาติ มี Vitamin E ช่วยคืนความสมดุลให้กับผิว ทำให้ผิวเนียนนุ่มชุ่มชื้น ไม่แห้งกร้าน มีส่วนช่วยทำให้ผิวดูอ่อนโยนน่าสัมผัส พร้อมกลิ่นหอมจากธรรมชาติ ",
    price: 250,
    amount: 3,
    img: "https://cx.lnwfile.com/_/cx/_raw/me/be/uu.jpg",
    categoryId: "สมุนไพร",
  },
  {
    id: 11,
    name: "พิมเสนน้ำ",
    detail:
      "พกพาสะดวก ให้กลิ่นหอม สดชื่น ดมแก้วิงเวียนศีรษะ เมารถ ใช้นวดบรรเทาปวด เมื่อยล้าจากการทำกิจกรรม",
    price: 40,
    amount: 3,
    img: "https://cx.lnwfile.com/_/cx/_raw/vk/e5/12.jpg",
    categoryId: "สมุนไพร",
  },
  {
    id: 12,
    name: "น้ำยาล้างจานกลิ่นตะไคร้หอม",
    detail:
      "น้ำยาล้างจานกลิ่นตะไคร้หอมและยูคาลิปตัส ขนาด 1,000 มล. (Lemon Grass & Eucalyptus Dishwashing Liquid)",
    price: 155,
    amount: 3,
    img: "https://cx.lnwfile.com/_/cx/_raw/h6/kd/qy.jpg",
    categoryId: "สมุนไพร",
  },

  // cate 4
  {
    id: 13,
    name: "เสื้อยืด I Love PATPAT ",
    detail: "	เสื้อยืด I Love PATPAT จากลายพระหัตถ์ (Upcycling T-shirt) - สีขาว",
    price: 200,
    amount: 10,
    img: "https://cx.lnwfile.com/_/cx/_raw/63/ue/5l.jpg",
    categoryId: "ผ้าและเครื่องแต่งกาย",
  },
  {
    id: 14,
    name: "เสื้อโปโลภัทรพัฒน์ สีแดง",
    detail:
      "เสื้อโปโลภัทรพัฒน์ สีแดง มีทั้งของผู้ชาย และผู้หญิง ผลิตจากผ้า cotton 100% สวมใส่สบาย",
    price: 450,
    amount: 5,
    img: "https://cx.lnwfile.com/_/cx/_raw/hj/c0/ii.png",
    categoryId: "ผ้าและเครื่องแต่งกาย",
  },
  {
    id: 15,
    name: "กระเป๋าผ้าพิมพ์ลาย",
    detail: "กระเป๋าผ้าสะพายข้าง พิมพ์ลาย ทนทาน น้ำหนักเบา",
    price: 300,
    amount: 8,
    img: "https://image.makewebcdn.com/makeweb/m_1200x600/7zapn1NU1/Fabric%20Bag/21-Pentagram%20music%20bag.jpg",
    categoryId: "ผ้าและเครื่องแต่งกาย",
  },
  {
    id: 16,
    name: "กระเป๋าเป้ลายสก็อตใหญ่",
    detail:
      "ผลิตภัณฑ์งานหัตถกรรมต่างๆ ถือเป็นภูมิปัญญาของมนุษย์ที่สร้างสรรค์มาจากรุ่นสู่รุ่น บ่งบอกถึงพื้นฐานรากเหง้าของชุมชน",
    price: 550,
    amount: 12,
    img: "https://cx.lnwfile.com/_/cx/_raw/te/ql/5d.png",
    categoryId: "ผ้าและเครื่องแต่งกาย",
  },

  // cate 5
  {
    id: 17,
    name: "โคมไฟไม้ไผ่",
    detail: "โคมไฟทำจากไม้ไผ่แท้ ให้แสงอบอุ่น เหมาะสำหรับตกแต่งบ้าน",
    price: 600,
    amount: 4,
    img: "https://www.xsxlightfactory.com/uploads/Bamboo-desk-lamp-China.jpg",
    categoryId: "ของใช้และของตกแต่ง",
  },
  {
    id: 18,
    name: "พวงกุญแจช้างอัมพร",
    detail: "พวงกุญแจ สามารถนำไปเป็นของฝาก ใช้ห้อยกระเป๋า ห้อยกุญแจรถ",
    price: 100,
    amount: 6,
    img: "https://cx.lnwfile.com/_/cx/_raw/08/dn/3a.png",
    categoryId: "ของใช้และของตกแต่ง",
  },
  {
    id: 19,
    name: "กล่องฝาพับลายดอกไม้",
    detail: "	กล่องอเนกประสงค์ สินค้าหัตถกรรมจากกลุ่มชุมชน",
    price: 400,
    amount: 3,
    img: "https://cx.lnwfile.com/_/cx/_raw/nw/am/qk.jpg",
    categoryId: "ของใช้และของตกแต่ง",
  },
  {
    id: 20,
    name: "ครอบครัวไก่ เผ่าอาข่า",
    detail: "ตุ๊กตาครอบครัวไก่ ใช้วางตกแต่งบ้าน ร้านค้า ร้านอาหาร",
    price: 275,
    amount: 0,
    img: "https://cx.lnwfile.com/_/cx/_raw/f4/12/hf.png",
    categoryId: "ของใช้และของตกแต่ง",
  },
]);
</script>

<style></style>
