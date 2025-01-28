<template>
  <div class="defaultpages flex flex-col gap-2">
    <div class="flex items-center justify-between h-[5%] pl-[35px]">
      <h1 class="text-[25px] font-bold">รายการสินค้า</h1>
    </div>
    <div class="flex justify-between px-[25px]">
      <div class="flex gap-2 w-[80%]">
        <div class="w-[40%]">
          <!-- <Search v-model="filters.searchTerm" /> -->
        </div>
        <!-- filter category -->
        <div class=" ">
          <div class="relative group h-full">
            <div
              class="flex items-center p-[2px] rounded-full w-[200px] bg-[#EAA04B] h-full"
            >
              <button
                class="bg-[#F68D44] rounded-full flex justify-center items-center pt-[3px] w-[35px] h-full cursor-pointer"
                type="button"
              >
                <i class="fa-solid fa-filter text-[20px]"></i>
              </button>
              <div
                class="flex justify-center items-center font-bold text-[14px] w-[80%] pr-[]"
              ></div>
            </div>
            <!-- Dropdown manu -->
            <div
              class="absolute bg-white rounded-lg border shadow w-44 z-10 hidden group-hover:block"
            >
              <ul class="py-2 text-sm text-gray-700">
                <li class="block px-4 py-2 hover:bg-gray-100"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="pr-[50px]">
        <NuxtLink to="/product/create">
          <div
            class="flex items-center justify-center border-[1px] border-[#FFD652]/50 bg-[#F68D44] text-[20px] font-semibold rounded-[5px] h-full px-3 cursor-pointer dropshadowbutton"
          >
            เพิ่มสินค้า
          </div>
        </NuxtLink>
      </div>
    </div>
    <div class="w-full h-[90%] mt-2 pt-2 bg-white">
      <table class="flex flex-col px-8 gap-2 w-ful">
        <thead class="w-full">
          <tr class="flex gap-2">
            <th class="w-[40%]">สินค้า</th>
            <th class="w-[15%]">ประเภท</th>
            <th class="w-[15%]">ราคา</th>
            <th class="w-[15%]">จำนวน</th>
            <th class="w-[15%]">สถานะสินค้า</th>
            <th class="w-[5%]"></th>
          </tr>
        </thead>
        <tbody class="w-full">
          <tr
            class="flex gap-2 py-2 border-b-[1px]"
            v-for="(product, index) in products"
            :key="index"
          >
            <th
              class="w-[40%] truncate flex gap-2 justify-between border-r-[2px]"
            >
              <div class="w-full flex justify-center">
                <img
                  src=""
                  alt=""
                  class="w-[80px] h-[80px] object-cover border-2 border-black rounded-[5px]"
                />
              </div>
              <div class="w-full flex justify-start">{{ product.name }}</div>
            </th>
            <th class="w-[15%] truncate border-r-[2px]">
              {{ product.category.name }}
            </th>
            <th class="w-[15%] truncate border-r-[2px]">{{ product.price }}</th>
            <th class="w-[15%] truncate border-r-[2px]">{{ product.stock }}</th>
            <th
              class="w-[15%] flex items-center justify-center truncate border-r-[2px]"
            >
              <label class="relative inline-flex items-center cursor-pointer">
                <!-- Checkbox -->
                <input type="checkbox" class="sr-only peer" />
                <!-- Toggle Switch Background -->
                <div
                  class="w-11 h-6 bg-orange-200 peer-focus:outline-none peer-focus:ring-[1px] peer-focus:ring-orange-600/70 rounded-full peer-checked:bg-orange-500 transition-colors"
                ></div>
                <!-- Toggle Knob -->
                <div
                  class="absolute w-5 h-5 bg-orange-400 rounded-full left-[2px] top-[2px] peer-checked:translate-x-5 transition-transform"
                ></div>
              </label>
            </th>
            <th class="w-[5%] flex items-center justify-center">
              <div class="flex flex-col justify-center">
                <button>
                  <i class="fa-solid fa-bars"></i>
                </button>
                <div>
                  <!-- <ul
                    class="absolute bg-white border-[1px] rounded-[20px] border-gray-400 dropshadowbottomsub p-[1px] w-[140px] h-[80px] -translate-x-[90px]"
                  >
                    <li
                      class="h-[50%] hover:bg-slate-300 rounded-t-[19px] flex items-center justify-center"
                    >
                      <NuxtLink to="/product/[id]"> รายะเอียดสินค้า </NuxtLink>
                    </li>
                    <li
                      class="h-[50%] hover:bg-slate-300 rounded-b-[19px] flex items-center justify-center"
                    >
                      ลบสินค้า
                    </li>
                  </ul> -->
                </div>
              </div>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from "~/models/product.model";

import service from "~/service";

// const filters = ref({
//   searchTerm: "", // คำค้นหา
// });

// // สร้างตัวแปรสำหรับหมวดหมู่ที่เลือก
// const selectedCategory = ref<Category>({
//   id: 1,
//   name: "ทั้งหมด",
// });

// const categories = ref<Category[]>([
//   {
//     id: 1,
//     name: "ทั้งหมด",
//   },
//   {
//     id: 2,
//     name: "อาหาร",
//   },
//   {
//     id: 3,
//     name: "เครื่องดื่ม",
//   },
//   {
//     id: 4,
//     name: "สมุนไพร",
//   },
//   {
//     id: 5,
//     name: "ผ้าและเครื่องดื่ม",
//   },
//   {
//     id: 6,
//     name: "ของใช้และของตกแต่ง",
//   },
// ]);
// // ฟังก์ชันเลือกหมวดหมู่
// const selectCategory = (category: Category) => {
//   selectedCategory.value = category;
// };

// // const filteredProducts = computed(() => {
// //   let result = products.value;

// //   // ฟิลเตอร์ตามคำค้นหา
// //   if (filters.value.searchTerm) {
// //     const term = filters.value.searchTerm.toLowerCase();
// //     result = result.filter((product) => {
// //       return (
// //         product.name.toLowerCase().includes(term) || // ตรวจสอบชื่อสินค้า
// //         product.categoryId.toString().includes(term) || // ตรวจสอบหมวดหมู่
// //         product.price.toString().includes(term) // ตรวจสอบราคา
// //       );
// //     });
// //   }

// //   // ฟิลเตอร์ตามหมวดหมู่ที่เลือก
// //   if (selectedCategory.value.id !== 1) {
// //     result = result.filter(
// //       (product) => product.categoryId === selectedCategory.value.id // ตรวจสอบหมวดหมู่ที่เลือก
// //     );
// //   }

// //   return result;
// // });

// // สถานะการแสดงเมนูของสินค้า
// const isMenuVisible = ref<Record<number, boolean>>({});

// // ฟังก์ชันสำหรับสลับการแสดงผลของเมนู
// const toggleMenu = (productId: number) => {
//   isMenuVisible.value = {
//     ...isMenuVisible.value,
//     [productId]: !isMenuVisible.value[productId],
//   };
// };

// const changeProductStatus = (productId: number) => {
//   // Find the product by ID
//   const product = products.value.find((product) => product.id === productId);

//   if (product) {
//     // Toggle the status (true becomes false, and false becomes true)
//     const newStatus = !product.status;

//     Swal.fire({
//       title: "ยืนยันการเปลี่ยนสถานะ",
//       text: `คุณต้องการเปลี่ยนสถานะของสินค้าเป็น "${
//         newStatus ? "ใช้งาน" : "ไม่ใช้งาน"
//       }" ใช่หรือไม่?`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "ยืนยัน",
//       cancelButtonText: "ยกเลิก",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         product.status = newStatus; // Update the status
//         toggleMenu(productId); // Close menu if needed
//         Swal.fire(
//           "สำเร็จ!",
//           `สถานะของสินค้าได้ถูกเปลี่ยนเป็น "${
//             newStatus ? "ใช้งาน" : "ไม่ใช้งาน"
//           }" แล้ว`,
//           "success"
//         );
//       }
//     });
//   }
// };

// const deleteProduct = (productId: number) => {
//   Swal.fire({
//     title: "คุณแน่ใจหรือไม่?",
//     text: "คุณต้องการลบสินค้านี้หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้.",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonText: "ยืนยัน",
//     cancelButtonText: "ยกเลิก",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       // ลบสินค้าออกจากรายการ
//       products.value = products.value.filter(
//         (product) => product.id !== productId
//       );

//       Swal.fire("สำเร็จ!", "สินค้าถูกลบออกจากรายการแล้ว.", "success");
//     }
//   });
// };

const products = ref<Product[]>([]);

const getProductList = async () => {
  await service.product
    .getProductList()
    .then((resp: any) => {
      const data = resp.data.data;
      const productlist: Product[] = [];

      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const e = data[i];
        const product: Product = {
          id: e.id,
          name: e.name,
          price: e.price,
          stock: e.stock,
          description: e.description ?? null, // รองรับกรณี description เป็น null
          image: {
            id: e.image?.id,
            ref_id: e.image?.ref_id,
            type: e.image?.type,
            description: e.image?.description,
          }, // ใช้ image ให้ตรงกับ interface
          category: {
            id: e.category?.id,
            name: e.category?.name,
          }, // category ต้องเป็น object
          reviews:
            e.review?.map((r: any) => ({
              id: r.id,
              rating: r.rating,
            })) ?? [], // review ต้องเป็น array
          is_active: e.is_active,
          created_at: e.created_at,
          updated_at: e.updated_at,
        };
        productlist.push(product);
      }
      products.value = productlist;
    })
    .catch((error: any) => {
      console.log("Error loading product list:", error.response || error);
    })
    //  เมื่อโหลดข้อมูลเสร็จให้ทำอะไร
    .finally(() => {
      console.log("Finished loading product list.");
    });
};

onMounted(async () => {
  await getProductList();
});
</script>

<style></style>
