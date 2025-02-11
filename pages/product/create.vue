<template>
  <div class="defaultpages px-8 py-10">
    <div
      class="flex items-center justify-between mb-4 bg-white p-4 dropshadowbox rounded-lg"
    >
      <h1 class="text-3xl font-bold text-gray-800">เพิ่มสินค้า</h1>
    </div>

    <div class="grid gap-4">
      <!-- Product Name -->
      <div>
        <label
          for="product-name"
          class="block text-lg font-medium text-gray-700"
          >ชื่อสินค้า</label
        >
        <input
          type="text"
          id="product-name"
          placeholder="กรอกชื่อสินค้า"
          class="w-full mt-2 rounded-lg p-4 border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
          v-model="product.name"
        />
      </div>

      <!-- Product Category, Price, and Status -->
      <div class="grid grid-cols-2 gap-8">
        <!-- Left Column -->
        <div>
          <label
            for="product-category"
            class="block text-lg font-medium text-gray-700"
            >ประเภทสินค้า</label
          >
          <select
            v-model="product.category_id"
            id="product-category"
            class="w-full mt-2 rounded-lg p-4 pr-5 border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
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
        <div>
          <label
            for="product-price"
            class="block text-lg font-medium text-gray-700"
            >ราคา</label
          >
          <input
            type="number"
            id="product-price"
            placeholder="กรอกราคา"
            class="w-full mt-2 rounded-lg p-4 border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            v-model="product.price"
          />
        </div>
      </div>

      <!-- Product Status and Quantity -->
      <div class="grid grid-cols-2 gap-8">
        <div>
          <label
            for="product-status"
            class="block text-lg font-medium text-gray-700"
            >สถานะสินค้า</label
          >
          <label class="relative inline-flex items-center mt-2">
            <input
              type="checkbox"
              id="product-status"
              v-model="product.is_active"
              class="sr-only peer"
              @change="onStatusChange"
            />
            <div
              class="w-14 h-8 bg-gray-200 rounded-full peer peer-checked:bg-orange-500 transition-colors"
            ></div>
            <div
              class="absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md peer-checked:translate-x-6 transition-transform"
            ></div>
          </label>
        </div>
        <div>
          <label
            for="product-quantity"
            class="block text-lg font-medium text-gray-700"
            >จำนวน</label
          >
          <input
            type="number"
            id="product-quantity"
            placeholder="กรอกจำนวน"
            class="w-full mt-2 rounded-lg p-4 border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            v-model="product.stock"
          />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-8">
        <!-- Product Image -->
        <div>
          <h3 class="text-lg font-medium text-gray-700">รูปสินค้า</h3>
          <div
            class="flex flex-col items-center justify-center mt-4 rounded-lg border border-dashed border-gray-300 p-6 bg-gray-50"
          >
            <!-- กล่องแสดงรูป -->
            <div
              class="w-48 h-48 flex items-center justify-center rounded-lg shadow-md bg-white"
            >
              <img
                v-if="imageUrl"
                :src="imageUrl"
                alt="Preview"
                class="w-full h-full object-cover rounded-lg"
              />
              <span v-else class="text-gray-500">ไม่มีรูปที่เลือก</span>
            </div>
            <!-- ปุ่ม Input -->
            <input
              type="text"
              ref="fileInput"
              @change="onFileChange"
              accept="image/*"
              class="mt-4 w-[50%] text-center border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
              placeholder="กรุณาใส่ลิ้งรูปสินค้า"
            />
          </div>
        </div>
        <!-- Product Details -->
        <div class="">
          <label
            for="product-details"
            class="block text-lg font-medium text-gray-700 mb-2"
            >รายละเอียด</label
          >
          <textarea
            id="product-details"
            rows="4"
            placeholder="ระบุรายละเอียดสินค้า"
            class="w-full h-[87%] mt-2 rounded-lg p-4 border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            v-model="product.description"
          ></textarea>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-center gap-8 mt-2">
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
    !product.value.category_id
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

// Clear image
const clearImage = () => {
  imageUrl.value = null;
  if (fileInput.value) {
    fileInput.value.value = "";
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

onMounted(async () => {
  await getCategorylist();
  await getProductList();
});
</script>

<style scoped>
button,
input,
select,
textarea {
  transition: all 0.3s ease-in-out;
}
</style>
