<template>
  <div class="defaultpages flex flex-col gap-3 p-6 bg-gray-50">
    <!-- Header Section -->
    <div
      class="flex justify-between items-center bg-white p-5 rounded-lg shadow-md"
    >
      <h1 class="text-2xl font-bold text-gray-800">รายการสินค้า</h1>
      <NuxtLink to="/product/create">
        <button
          class="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow hover:bg-orange-600"
        >
          <i class="fa-solid fa-plus"></i> เพิ่มสินค้า
        </button>
      </NuxtLink>
    </div>

    <!-- Search and Filter Section -->
    <div class="flex justify-between items-center gap-4 mt-2">
      <div class="flex gap-4 flex-1">
        <!-- Search Bar -->
        <div class="relative w-1/2">
          <input
            type="search"
            class="w-full h-10 pl-12 pr-4 rounded-full border border-orange-400 focus:ring-2 focus:ring-orange-500 outline-none text-gray-800"
            placeholder="ค้นหาสินค้า"
            v-model="search"
            @keyup.enter="getProductList"
          />
          <i
            class="fa-solid fa-magnifying-glass absolute left-4 top-2 text-gray-500 text-lg"
          ></i>
        </div>

        <!-- Filter Dropdown -->
        <div class="relative">
          <!-- ปุ่ม Filter -->
          <button
            @click="toggleDropdown"
            class="flex items-center gap-2 w-[210px] px-2 h-10 bg-orange-500 text-white rounded-full shadow hover:bg-orange-600"
            type="button"
          >
            <div class="mt-[2px] pl-[2px]">
              <i class="fa-solid fa-filter"></i>
            </div>
            <div class="flex justify-start w-full">
              {{ selectedCategory.name }}
            </div>
          </button>

          <!-- Dropdown -->
          <div
            v-if="isDropdownVisible"
            class="absolute mt-2 bg-white rounded-lg shadow-lg border w-48 z-10"
          >
            <ul class="py-2 text-sm text-gray-700">
              <li
                v-for="(category, i) in categories"
                :key="i"
                class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                @click="selectCategory(category)"
              >
                {{ category.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Product List -->
    <div
      class="bg-white flex flex-col justify-between h-[90%] rounded-lg p-6 w-full dropshadowbox"
    >
      <table class="w-full text-left h-[90%]">
        <thead class="w-full">
          <tr class="bg-orange-100 rounded-t-lg text-gray-800 flex gap-2">
            <th class="px-4 py-2 w-[25%]">สินค้า</th>
            <th class="px-4 py-2 w-[15%]">ประเภท</th>
            <th class="px-4 py-2 w-[15%]">ราคา</th>
            <th class="px-4 py-2 w-[15%]">จำนวน</th>
            <th class="px-4 py-2 w-[15%]">สถานะสินค้า</th>
            <th class="px-4 py-2 w-[15%]">การจัดการ</th>
          </tr>
        </thead>
        <tbody class="w-full">
          <tr
            v-for="(product, index) in paginatedProduct"
            :key="index"
            class="border-b flex gap-2 hover:bg-gray-50"
          >
            <td class="flex items-center gap-4 px-4 py-2 w-[25%]">
              <img
                src=""
                alt="Product"
                class="w-16 h-16 object-cover rounded-lg border"
              />
              <span class="w-full truncate">{{ product.name }}</span>
            </td>
            <td class="px-4 py-2 w-[15%]">{{ product.category.name }}</td>
            <td class="px-4 py-2 text-orange-500 font-bold w-[15%]">
              ฿{{ product.price }}
            </td>
            <td class="px-4 py-2 w-[15%]">{{ product.stock }}</td>
            <td class="px-4 py-2 w-[15%]">
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="sr-only peer"
                  v-model="product.is_active"
                  :checked="product.is_active"
                  @click="changeProductStatus(product.id)"
                />
                <div
                  class="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-orange-500 transition-colors"
                ></div>
                <div
                  class="absolute w-5 h-5 bg-white rounded-full peer-checked:translate-x-5 transition-transform"
                ></div>
              </label>
            </td>
            <td class="px-4 py-2 w-[15%]">
              <div class="relative">
                <button @click="toggleMenu(product.id)">
                  <i class="fa-solid fa-ellipsis-vertical"></i>
                </button>
                <ul
                  v-if="isMenuVisible[product.id]"
                  class="absolute right-0 bg-white border rounded-lg shadow-lg mt-2"
                >
                  <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <NuxtLink :to="`/product/${product.id}`">
                      รายละเอียดสินค้า
                    </NuxtLink>
                  </li>
                  <li
                    class="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                  >
                    ลบสินค้า
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="flex justify-between items-center mt-5">
        <p class="text-sm text-gray-600">
          สินค้า {{ paginatedProduct.length }} จาก {{ filteredProducts.length }}
        </p>
        <div class="flex gap-2">
          <button
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
            class="px-3 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
          >
            ก่อนหน้า
          </button>
          <button
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
            class="px-3 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Swal from "sweetalert2";
import type {
  Category,
  Product,
  ProductRes,
  ProductUpdate,
} from "~/models/product.model";
import service from "~/service";

// สร้างตัวแปรสำหรับหมวดหมู่ที่เลือก
const selectedCategory = ref<Category>({
  id: 1,
  name: "ทั้งหมด",
});

const categories = ref<Category[]>([
  {
    id: 1,
    name: "ทั้งหมด",
  },
  {
    id: 2,
    name: "อาหาร",
  },
  {
    id: 3,
    name: "เครื่องดื่ม",
  },
  {
    id: 4,
    name: "สมุนไพร",
  },
  {
    id: 5,
    name: "ผ้าและเครื่องดื่ม",
  },
  {
    id: 6,
    name: "ของใช้และของตกแต่ง",
  },
]);

// ตัวแปรควบคุมการแสดง dropdown
const isDropdownVisible = ref(false);

// ฟังก์ชันเปิด/ปิด dropdown
const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};

// ฟังก์ชันเลือกหมวดหมู่
const selectCategory = (category: Category) => {
  selectedCategory.value = category;
  isDropdownVisible.value = false; // ปิด dropdown หลังเลือก
};

const filteredProducts = computed(() => {
  let result = products.value;

  if (search.value) {
    const term = search.value.toLowerCase();
    result = result.filter((product) => {
      return (
        product.name.toLowerCase().includes(term) ||
        product.category.name.toLowerCase().includes(term) ||
        product.price.toString().includes(term)
      );
    });
  }

  if (selectedCategory.value.id !== 1) {
    result = result.filter(
      (product) => product.category.id === selectedCategory.value.id
    );
  }
  result = result.sort((a, b) => (b.is_active ? 1 : 0) - (a.is_active ? 1 : 0));

  console.log("Filtered products:", result); // ดูค่าของ filteredProducts
  return result;
});

const search = ref<string>("");

// Pagination variables
const currentPage = ref(1);
const itemsPerPage = 6; // จำนวนคำสั่งซื้อที่จะแสดงในแต่ละหน้า

// Paginate the filtered orders
const paginatedProduct = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = currentPage.value * itemsPerPage;
  console.log("Paginated products:", filteredProducts.value.slice(start, end));
  return filteredProducts.value.slice(start, end);
});

// Calculate total pages
const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage);
});

// Change the current page
const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page; // Updates the current page
  }
};

watch([search, selectedCategory], () => {
  currentPage.value = 1; // รีเซ็ตหน้าเมื่อมีการค้นหาหรือเลือกหมวดหมู่ใหม่
});

// สถานะการแสดงเมนูของสินค้า
const isMenuVisible = ref<Record<number, boolean>>({});

// ฟังก์ชันสำหรับสลับการแสดงผลของเมนู
const toggleMenu = (productId: number) => {
  isMenuVisible.value = {
    ...isMenuVisible.value,
    [productId]: !isMenuVisible.value[productId],
  };
};

const changeProductStatus = (productId: number) => {
  // Find the product by ID
  const product = products.value.find((product) => product.id === productId);

  if (product) {
    // Toggle the status (true becomes false, and false becomes true)
    const newStatus = !product.is_active;

    Swal.fire({
      title: "ยืนยันการเปลี่ยนสถานะ",
      text: `คุณต้องการเปลี่ยนสถานะของสินค้าเป็น "${
        newStatus ? "ใช้งาน" : "ไม่ใช้งาน"
      }" ใช่หรือไม่?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        // Only update the status if confirmed
        product.is_active = newStatus; // อัปเดตสถานะในข้อมูลท้องถิ่น

        updateProduct(product.id, product)
          .then(() => {
            Swal.fire(
              "สำเร็จ!",
              `สถานะของสินค้าได้ถูกเปลี่ยนเป็น "${
                newStatus ? "ใช้งาน" : "ไม่ใช้งาน"
              }" แล้ว`,
              "success"
            );
          })
          .catch((error: any) => {
            console.error("Error in changeProductStatus:", error);
            Swal.fire(
              "เกิดข้อผิดพลาด!",
              "ไม่สามารถเปลี่ยนสถานะสินค้าได้",
              "error"
            );
          });
      } else {
        // Reset the status to the previous value if canceled
        product.is_active = !newStatus;
      }
    });
  }
};

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

const productRes = ref<ProductRes>({
  id: 0,
  name: "",
  price: 0,
  description: "",
  stock: 0,
  category_id: 0,
  is_active: true,
  image_product: "",
});

const updateProduct = async (productId: number, product: any) => {
  await service.product
    .updateProduct(productId, product)
    .then((resp: any) => {
      const data = resp.data;
      if (data) {
        Swal.fire({
          title: "เพิ่มสินค้าสำเร็จ",
          text: "เพิ่มสินค้า",
          icon: "success",
        });
      }

      const temp: ProductRes = {
        id: data.id,
        name: data.name,
        price: data.price,
        description: data.description,
        stock: data.stock,
        category_id: data.category,
        is_active: data.is_active,
        image_product: data.image_product,
      };
      productRes.value = temp;
    })
    .catch((error: any) => {
      console.log(error.response);
      Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถอัปเดตสินค้าได้", "error");
    })
    .finally(() => {});
};

onMounted(async () => {
  await getProductList();
});
</script>

<style></style>
