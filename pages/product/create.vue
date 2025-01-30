<template>
  <div class="defaultpages px-8 py-10">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-gray-800">เพิ่มสินค้า</h1>
    </div>

    <div class="grid gap-8">
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

      <!-- Product Details -->
      <div>
        <label
          for="product-details"
          class="block text-lg font-medium text-gray-700"
          >รายละเอียด</label
        >
        <textarea
          id="product-details"
          rows="4"
          placeholder="ระบุรายละเอียดสินค้า"
          class="w-full mt-2 rounded-lg p-4 border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
          v-model="product.description"
        ></textarea>
      </div>

      <!-- Product Image -->
      <div>
        <h3 class="text-lg font-medium text-gray-700">รูปสินค้า</h3>
        <div
          class="flex items-center justify-center mt-4 rounded-lg border border-dashed border-gray-300 p-6 bg-gray-50"
        >
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
          <div class="ml-8">
            <input
              type="file"
              ref="fileInput"
              @change="onFileChange"
              accept="image/*"
              class="mt-4"
            />
            <button
              v-if="imageUrl"
              @click="clearImage"
              class="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              ลบรูปภาพ
            </button>
          </div>
        </div>
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
</template>

<script setup lang="ts">
import Swal from "sweetalert2"; // SweetAlert2 for popups
import type {
  Category,
  ProductCreate,
  ProductRes,
} from "~/models/product.model";
import service from "~/service";

const product = ref<ProductCreate>({
  name: "",
  price: 0,
  description: "",
  stock: 0,
  category_id: 0,
  is_active: true,
  image_product: "",
});

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

// Submit the product
const confirmSubmit = () => {
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

// Add product to the server
const addProduct = async () => {
  // แปลง category_id เป็นตัวเลข
  product.value.category_id = parseInt(
    product.value.category_id.toString(),
    10
  );

  // ตรวจสอบว่า category_id เป็นตัวเลขที่ถูกต้องหรือไม่
  if (isNaN(product.value.category_id)) {
    Swal.fire({
      title: "ข้อผิดพลาด",
      text: "กรุณาเลือกประเภทสินค้าให้ถูกต้อง",
      icon: "error",
      confirmButtonText: "ตกลง",
    });
    return;
  }

  // แปลง product.price เป็นตัวเลขเพื่อให้แน่ใจว่าเป็น float64
  product.value.price = parseFloat(product.value.price.toString());

  // ตรวจสอบว่าราคาที่แปลงแล้วเป็นตัวเลขที่ถูกต้องหรือไม่
  if (isNaN(product.value.price)) {
    Swal.fire({
      title: "ข้อผิดพลาด",
      text: "กรุณากรอกราคาให้ถูกต้อง",
      icon: "error",
      confirmButtonText: "ตกลง",
    });
    return;
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

// Handle file input change (image)
const imageUrl = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageUrl.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
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
