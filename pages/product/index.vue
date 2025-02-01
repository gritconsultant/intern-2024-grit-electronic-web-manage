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
              {{ selectedCategory ? selectedCategory.name : "เลือกหมวดหมู่" }}
            </div>
          </button>

          <!-- Dropdown -->
          <div
            v-if="isDropdownVisible"
            class="absolute mt-2 bg-white rounded-lg shadow-lg border w-48 z-10"
          >
            <ul class="py-2 text-sm text-gray-700">
              <li
                class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                @click="selectCategory(null)"
              >
                All
              </li>
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
            v-for="(product, index) in filteredProducts"
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
            <td class="flex items-center gap-4 px-4 py-2 w-[15%]">
              <button>
                <NuxtLink :to="`/product/${product.id}`">
                  <i
                    class="fa-solid fa-pen-to-square text-orange-400 text-xl"
                  ></i>
                </NuxtLink>
              </button>
              <button>
                <i
                  @click="confirmDeleteProduct(product.id)"
                  class="fa-solid fa-trash text-red-600 text-xl"
                ></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="flex justify-between items-center mt-5">
        <div class="text-sm text-gray-600">
          <!-- แสดงข้อมูลจาก (หน้า) และจำนวนทั้งหมด -->
          แสดง {{ (page - 1) * size + 1 }} ถึง
          {{ Math.min(page * size, filteredProducts.length) }}
          จากทั้งหมด {{ paginate.Total }} รายการ
        </div>
        <div class="flex gap-2">
          <!-- ปุ่มก่อนหน้า -->
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
          >
            ก่อนหน้า
          </button>

          <span class="flex items-center px-2">หน้า {{ currentPage }}</span>

          <!-- ปุ่มถัดไป -->
          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage * size >= paginate.Total"
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
import type { Params } from "~/models/client.model";
import type { Category, Product, ProductRes } from "~/models/product.model";
import service from "~/service";

// สร้างตัวแปรสำหรับหมวดหมู่ที่เลือก

// ตัวแปรควบคุมการแสดง dropdown
const isDropdownVisible = ref(false);

// ฟังก์ชันเปิด/ปิด dropdown
const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};

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

const selectedCategory = ref<Category | null>(null);
const selectCategory = (category: Category | null) => {
  selectedCategory.value = category;
  isDropdownVisible.value = false; // ปิด dropdown
};

const categories = ref<Category[]>([]);

const getCategorylist = async () => {
  await service.product
    .getCategoryList()
    .then((resp: any) => {
      const data = resp.data.data;
      const categoryList: Category[] = [];

      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const c = data[i];
        const category: Category = {
          id: c.id,
          name: c.name,
          is_active: c.is_active,
          imageCategory: c.imageCategory,
        };
        categoryList.push(category);
      }
      categories.value = categoryList;
    })
    .catch((error: any) => {
      console.log("Error loading product list:", error.response || error);
    })
    .finally(() => {});
};

const search = ref<string>("");
const page = ref(1); // ทำให้เป็น ref
const size = ref(6); // ทำให้เป็น ref
const products = ref<Product[]>([]);
const paginate = ref<{ Total: number }>({ Total: 0 });

const getProductList = async () => {
  const param: Params = {
    page: currentPage.value, // ใช้ .value ในการเข้าถึง currentPage
    size: size.value, // ใช้ .value ในการเข้าถึง size
    search: search.value || "", // ใช้ค่าป้องกันถ้า search เป็น null หรือ undefined
  };

  console.log("Sending param:", param); // ตรวจส
  await service.product
    .getProductList(param)
    .then((resp: any) => {
      const data = resp.data.data;
      paginate.value = resp.data.paginate;
      const productlist: Product[] = [];

      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const e = data[i];
        const product: Product = {
          id: e.id,
          name: e.name,
          price: e.price,
          stock: e.stock,
          description: e.description ?? null, // Handle null or undefined description
          Image: {
            id: e.Image?.id ?? 0, // Default to 0 if Image is null or undefined
            ref_id: e.Image?.ref_id ?? 0, // Default to 0 if ref_id is missing
            type: e.Image?.type ?? "", // Default to empty string if type is missing
            description: e.Image?.description ?? "", // Default to empty string if description is missing
          },
          category: {
            id: e.category?.id ?? 0, // Default to 0 if category is missing
            name: e.category?.name ?? "",
            is_active: e.category?.is_active ?? true,
            imageCategory: e.category?.imageCategory ?? [], // Default to empty string if category name is missing
          },
          Review:
            e.Review?.map((r: any) => ({
              id: r.id,
              rating: r.rating,
            })) ?? [], // Ensure Review is always an array
          is_active: e.is_active,
          created_at: e.created_at,
          updated_at: e.updated_at,
          deleted_at: e.deleted_at,
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
const currentPage = ref(1); // ตั้งค่า currentPage เริ่มต้นที่ 1

// คำนวณจำนวนหน้า

// ฟังก์ชันที่ใช้ในการเปลี่ยนหน้า
const changePage = (page: number) => {
  currentPage.value = page;
  getProductList(); // รีเฟรชข้อมูลเมื่อเปลี่ยนหน้า
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

const deleteProduct = async (id: number) => {
  await service.product
    .deleteProduct(id)
    .then((resp: any) => {
      const data = resp.data;
      console.log(data);
    })
    .catch((erorr: any) => {
      console.log(erorr.respontse);
    })
    .finally(() => {});
};

const confirmDeleteProduct = async (id: number) => {
  // Show the confirmation dialog
  const result = await Swal.fire({
    title: "คุณแน่ใจหรือไม่?", // ข้อความในกล่องยืนยัน
    text: "คุณต้องการลบสินค้านี้หรือไม่?", // ข้อความเสริมในกล่อง
    icon: "warning", // ไอคอนเตือน
    showCancelButton: true, // แสดงปุ่มยกเลิก
    confirmButtonText: "ยืนยัน", // ข้อความปุ่มยืนยัน
    cancelButtonText: "ยกเลิก", // ข้อความปุ่มยกเลิก
  });

  // If the user confirms the deletion
  if (result.isConfirmed) {
    try {
      // Call the deleteCategory function to delete the category
      await deleteProduct(id);

      // Show success message after deletion
      Swal.fire("ลบสำเร็จ!", "สินค้าของคุณได้ถูกลบแล้ว", "success");
    } catch (error) {
      // If an error occurs during deletion, show error message
      Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถลบสินค้านี้ได้", "error");
    }
  }
};

const filteredProducts = computed(() => {
  let activeProducts = products.value.filter(
    (product) => product.is_active === true
  );
  let inactiveProducts = products.value.filter(
    (product) => product.is_active === false
  );

  // ถ้าเลือก "ทั้งหมด" (selectedCategory เป็น null)
  if (selectedCategory.value) {
    activeProducts = activeProducts.filter(
      (product) => product.category.id === selectedCategory.value?.id
    );
    inactiveProducts = inactiveProducts.filter(
      (product) => product.category.id === selectedCategory.value?.id
    );
  }

  // เรียงลำดับสินค้า active ก่อน
  activeProducts = activeProducts.sort((a, b) => (a.is_active ? -1 : 1));
  inactiveProducts = inactiveProducts.sort((a, b) => (a.is_active ? 1 : -1));

  // ใช้ตัวกรองค้นหาสินค้า
  if (search.value) {
    const term = search.value.toLowerCase();
    activeProducts = activeProducts.filter((product) => {
      return (
        product.name.toLowerCase().includes(term) ||
        product.category.name.toLowerCase().includes(term) ||
        product.price.toString().includes(term)
      );
    });
    inactiveProducts = inactiveProducts.filter((product) => {
      return (
        product.name.toLowerCase().includes(term) ||
        product.category.name.toLowerCase().includes(term) ||
        product.price.toString().includes(term)
      );
    });
  }

  // รวมสินค้า active และ inactive และแสดงสินค้า active ก่อน
  const totalProducts = [...activeProducts, ...inactiveProducts];

  // การแบ่งหน้า (pagination)
  const startIndex = (page.value - 1) * size.value;
  const endIndex = Math.min(startIndex + size.value, totalProducts.length);
  const result = totalProducts.slice(startIndex, endIndex);

  return result;
});

watch(
  () => [size.value],
  async () => {
    await getProductList();
  }
);
onMounted(async () => {
  await getProductList();
  await getCategorylist();
});
</script>

<style></style>
