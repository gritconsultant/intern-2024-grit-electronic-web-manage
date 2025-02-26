<template>
  <div class="defaultpages px-8 py-8">
    <div
      class="mb-10 bg-white h-[10%] flex items-center justify-between pl-[10px] border-[1px] drop-shadow-lg rounded-lg"
    >
      <h1 class="text-3xl font-bold text-gray-800">เพิ่มสินค้า</h1>
    </div>

    <div class="bg-slate-400 h-[85%]">
      <!-- Product List Section -->
      <div
        class="flex flex-col bg-white dropshadowbox rounded-lg p-4 w-[100%] h-full"
      >
        <div class="flex gap-8 p-6 w-full">
          <div class="product-image flex flex-col gap-4 w-80">
            <div
              class="h-60 w-full bg-gray-300 rounded-lg flex items-center justify-center relative"
            >
              <img
                v-if="imageUrl"
                :src="imageUrl"
                alt="Preview"
                class="object-cover h-full w-full rounded-lg border-[1px]"
              />
            </div>
            <input
              type="text"
              ref="fileInput"
              @change="onFileChange"
              accept="image/*"
              placeholder="กรอก URL รูปภาพ"
              class="w-full rounded-lg p-3 pl-3 text-gray-700 dropshadowboxsub"
            />
          </div>

          <div class="product-info flex flex-col justify-between gap-6 w-full">
            <div class="product-details flex flex-col gap-6">
              <div class="product-name text-xl font-semibold">
                <label for="product-name" class="block">ชื่อ</label>
                <input
                  type="text"
                  id="product-name"
                  v-model="product.name"
                  placeholder="กรุณากรอกชื่อสินค้า"
                  class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div class="product-type-price flex gap-6 justify-between">
                <div class="product-category text-xl font-semibold w-1/2">
                  <label for="product-category" class="block">ประเภท</label>
                  <select
                    v-model="product.category_id"
                    id="product-category"
                    class="w-full h-[66%] border-gray-500  border  dropshadowboxabsolut  select-left "
                  >
                    <option
                      v-for="(category, index) in categories"
                      :key="index"
                      :value="category.id"
                    >
                      {{ category.name }}
                    </option>
                  </select>
                </div>

                <div class="product-price text-xl font-semibold w-1/2">
                  <label for="product-price" class="block">ราคา</label>
                  <input
                    type="number"
                    v-model="product.price"
                    placeholder="กรุณากรอกราคา"
                    class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                    @input="validateNumber"
                  />
                </div>
              </div>

              <div class="product-quantity flex items-center gap-4">
                <label class="text-xl font-semibold">จำนวนสินค้า</label>
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-2">
                    <button
                      class="bg-orange-500 text-white text-[20px] px-2 py-1 h-[25px] rounded-md flex items-center justify-center"
                      @click="decreaseAmount"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="product-quantity"
                      v-model="product.stock"
                      @input="validateNumber"
                      class="w-10 p-1 h-[25px] text-center border border-gray-300 rounded-md"
                    />
                    <button
                      class="bg-orange-500 text-white px-2 py-1 h-[25px] rounded-md flex items-center justify-center"
                      @click="increaseAmount"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="product-status flex justify-between items-center">
              <div class="status flex gap-4">
                <span for="product-status" class="text-lg font-semibold"
                  >แสดงสินค้า</span
                >
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="product-status"
                    v-model="product.is_active"
                    class="sr-only peer"
                    @change="onStatusChange"
                  />
                  <div
                    class="w-16 h-8 bg-orange-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-orange-600/70 rounded-full peer-checked:bg-orange-500 transition-colors"
                  ></div>
                  <div
                    class="absolute w-7 h-7 bg-white rounded-full left-0.5 top-0.5 peer-checked:translate-x-8 transition-transform"
                  ></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Description -->
        <div class="product-description mt-4 px-6 w-full">
          <h3 class="text-2xl font-semibold">รายละเอียด</h3>
          <textarea
            id="product-details"
            class="w-full p-5 mt-2 border border-gray-300 rounded-md"
            rows="6"
            v-model="product.description"
            placeholder="กรุณากรอกรายละเอียดสินค้า"
          ></textarea>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-center gap-8 mt-8">
          <button
            @click.prevent="confirmCancel"
            class="px-6 py-3 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
          >
            ยกเลิก
          </button>
          <button
            @click="confirmSubmit"
            class="px-6 py-3 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors"
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2"; // SweetAlert2 for popups
import type { Params } from "~/models/client.model";
import type {
  Category,
  Product,
  ProductCreate,
  ProductRes,
} from "~/models/product.model";
import service from "~/service";

import { useIndexStore } from "~/store/main";

definePageMeta({
  middleware: "auth",
});

const store = useIndexStore();

const Category = ref();

const product = ref<ProductCreate>({
  name: "",
  price: 0,
  description: "",
  stock: 0,
  category_id: 0,
  is_active: true,
  Image: "",
});

const productRes = ref<ProductRes>({
  id: 0,
  name: "",
  price: 0,
  description: "",
  stock: 0,
  category_id: 0,
  is_active: true,
  image: "",
});

// Submit the product
const confirmSubmit = () => {
  // Check if any required fields are empty
  if (
    !product.value.name ||
    !product.value.price ||
    !product.value.stock ||
    !product.value.category_id ||
    !product.value.is_active ||
    !product.value.description ||
    !product.value.Image
  ) {
    Swal.fire({
      title: "ข้อผิดพลาด",
      text: "กรุณากรอกข้อมูลให้ครบถ้วนก่อนที่จะบันทึกสินค้า",
      icon: "error",
      confirmButtonText: "ตกลง",
    });
    return; // Prevent form submission if validation fails
  }

  // Check if the product name already exists
  const isProductNameExist = products.value.some(
    (existingProduct) => existingProduct.name === product.value.name
  );

  if (isProductNameExist) {
    Swal.fire({
      title: "ข้อผิดพลาด",
      text: "ชื่อสินค้านี้มีในระบบแล้ว กรุณาเลือกชื่อสินค้าใหม่",
      icon: "error",
      confirmButtonText: "ตกลง",
    });
    return; // Prevent form submission if the name exists
  }

  Swal.fire({
    title: "คุณแน่ใจหรือไม่?",
    text: "คุณต้องการบันทึกสินค้านี้หรือไม่?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    if (result.isConfirmed) {
      addProduct(); // Create product
    }
  });
};

const addProduct = async () => {
  // แปลง category_id เป็นตัวเลข
  const categoryId = parseInt(product.value.category_id?.toString() ?? "0", 10);
  product.value.category_id = categoryId;

  if (isNaN(categoryId)) {
    Swal.fire({
      title: "ข้อผิดพลาด",
      text: "กรุณาเลือกประเภทสินค้าให้ถูกต้อง",
      icon: "error",
      confirmButtonText: "ตกลง",
    });
    return;
  }

  // แปลง product.price เป็นตัวเลขเพื่อให้แน่ใจว่าเป็น float64
  const price = parseFloat(product.value.price?.toString() ?? "0");
  product.value.price = price;

  if (isNaN(price)) {
    Swal.fire({
      title: "ข้อผิดพลาด",
      text: "กรุณากรอกราคาให้ถูกต้อง",
      icon: "error",
      confirmButtonText: "ตกลง",
    });
    return;
  }

  // ตรวจสอบและตั้งค่ารูปภาพให้ถูกต้อง
  if (imageUrl.value) {
    product.value.Image = imageUrl.value;
  } else {
    product.value.Image = ""; // หรือสามารถตั้งค่าเป็นค่าว่างถ้ารูปภาพไม่ถูกเลือก
  }

  // ส่งข้อมูล API
  try {
    const resp = await service.product.createProduct(product.value);
    const data = resp.data;

    if (data) {
      Swal.fire({
        title: "สำเร็จ!",
        text: "เพิ่มสินค้าเรียบร้อย",
        icon: "success",
        confirmButtonText: "ตกลง",
      }).then(() => {
        router.push(`/product`);
      });

      productRes.value = { ...data }; // Update product response data
    }
  } catch (err) {
    Swal.fire({
      title: "เกิดข้อผิดพลาด",
      text: "ไม่สามารถเพิ่มสินค้าได้ กรุณาลองใหม่อีกครั้ง",
      icon: "error",
      confirmButtonText: "ตกลง",
    });
  }
};

const categories = ref<Category[]>([]);
const getCategorylist = async () => {
  const param: Params = {
    page: currentPage.value, // ใช้ .value ในการเข้าถึง currentPage
    size: size.value, // ใช้ .value ในการเข้าถึง size
    search: search.value || "", // ใช้ค่าป้องกันถ้า search เป็น null หรือ undefined
    category: Category.value,
  };

  await service.product
    .getCategoryList(param)
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
          image: c.image,
          TotalProduct: c.TotalProduct,
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
const size = ref(6); // ทำให้เป็น ref
const products = ref<Product[]>([]);
const currentPage = ref(1); // ตั้งค่า currentPage เริ่มต้นที่ 1

const getProductList = async () => {
  const param: Params = {
    page: currentPage.value, // ใช้ .value ในการเข้าถึง currentPage
    size: size.value, // ใช้ .value ในการเข้าถึง size
    search: search.value || "", // ใช้ค่าป้องกันถ้า search เป็น null หรือ undefined
    category: Category.value ?? undefined,
  };

  console.log("Sending param:", param); // ตรวจสอบการส่งพารามิเตอร์
  await service.product
    .getProductList(param)
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
          image: e.description ?? null, // Handle null or undefined description
          category: {
            id: e.category?.id ?? 0, // Default to 0 if category is missing
            name: e.category?.name ?? "",
            is_active: e.category?.is_active ?? true,
            image: e.category?.image ?? [], // Default to empty string if category name is missing
            TotalProduct: e.category?.TotalProduct ?? 0, // Default to 0 if category name is missing
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
    .finally(() => {
      console.log("Finished loading product list.");
    });
};

// Handle file input change (image)
const imageUrl = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

// Handle file input change (image)
const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageUrl.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  } else {
    imageUrl.value = target.value; // อัปเดตกับ URL ที่ใส่ใน input text
  }
};

const router = useRouter();

// Confirm cancellation
const confirmCancel = () => {
  Swal.fire({
    title: "คุณแน่ใจหรือไม่?",
    text: "คุณต้องการยกเลิกการเพิ่มสินค้านี้หรือไม่?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    if (result.isConfirmed) {
      router.push("/product");
    }
  });
};

// Handle product status change
const onStatusChange = () => {
  const newStatus = product.value.is_active ? "ใช้งาน" : "ไม่ใช้งาน";

  Swal.fire({
    title: "คุณแน่ใจหรือไม่?",
    text: `คุณต้องการเปลี่ยนสถานะเป็น "${newStatus}" หรือไม่?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    if (!result.isConfirmed) {
      product.value.is_active = !product.value.is_active; // Reset status if canceled
    } else {
      Swal.fire(
        "สำเร็จ!",
        `สถานะสินค้าได้ถูกเปลี่ยนเป็น "${newStatus}"`,
        "success"
      );
    }
  });
};

const inputAmount = ref<number>(0); // ค่าที่จะเพิ่ม/ลด

const increaseAmount = () => {
  product.value.stock += 1; // Directly modify product.stock
};

const decreaseAmount = () => {
  if (product.value.stock > 0) {
    // Ensure stock doesn't go below 0
    product.value.stock -= 1;
  }
};

const validateNumber = () => {
  // กรองให้เหลือแค่ตัวเลขแล้วแปลงกลับเป็น float
  product.value.stock = parseFloat(
    product.value.stock.toString().replace(/[^0-9.]/g, "")
  );
  product.value.price = parseFloat(
    product.value.price.toString().replace(/[^0-9.]/g, "")
  );
};

onMounted(async () => {
  await getCategorylist();
  await getProductList();
});
</script>

<style scoped>
button,
input,
textarea {
  transition: all 0.3s ease-in-out;
}

input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* เพิ่ม CSS นี้ในไฟล์ .css ของคุณ */
.select-left {
  text-align: left !important;        /* ทำให้ข้อความใน select อยู่ซ้ายสุด */
  direction: ltr !important;          /* ตั้งค่าทิศทางข้อความ */
  padding-left: 10px !important;      /* เพิ่มช่องว่างซ้าย */     /* สำหรับเบราว์เซอร์อื่นๆ */
}

.select-left option {
  text-align: left !important;        /* ทำให้ข้อความใน option อยู่ซ้ายสุด */
}
</style>
