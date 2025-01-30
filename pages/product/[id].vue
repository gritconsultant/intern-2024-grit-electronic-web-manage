<template>
  <div class="defaultpages p-8">
    <div v-if="product.id != 0">
      <div class="header mb-8">
        <h1 class="text-3xl font-bold text-gray-800">
          สินค้า #{{ product.id }}
        </h1>
      </div>

      <!-- Product List Section -->
      <div class="flex flex-wrap gap-8 w-full">
        <div class="flex gap-8 bg-white p-6 rounded-lg shadow-md w-full">
          <div class="product-image flex-none w-80">
            <div
              class="h-80 w-full bg-gray-300 rounded-lg flex items-center justify-center relative"
            >
              <img src="" class="object-cover h-full w-full rounded-lg" />
            </div>
          </div>

          <div class="product-info flex flex-col justify-between gap-6 w-full">
            <div class="product-details flex flex-col gap-6">
              <div class="product-name text-xl font-semibold">
                <label class="block">ชื่อ</label>
                <input
                  type="text"
                  v-model="product.name"
                  placeholder="กรุณากรอกชื่อสินค้า"
                  class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div class="product-type-price flex gap-6 justify-between">
                <div class="product-category w-1/2">
                  <label class="block">ประเภท</label>
                  <select
                    class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                    v-model="product.category_id"
                    @change="product.category_id = Number(product.category_id)"
                  >
                    <option value="">กรุณาเลือกประเภท</option>
                    <option value="3">อาหาร</option>
                    <option value="4">เครื่องดื่ม</option>
                    <option value="5">สมุนไพร</option>
                    <option value="6">ผ้าและเครื่องแต่งกาย</option>
                    <option value="7">ของใช้ ของตกแต่ง</option>
                  </select>
                </div>

                <div class="product-price w-1/2">
                  <label class="block">ราคา</label>
                  <input
                    type="number"
                    v-model="product.price"
                    placeholder="กรุณากรอกราคา"
                    class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              </div>

              <div class="product-quantity flex items-center gap-6">
                <label class="text-xl font-semibold">จำนวนสินค้า</label>
                <div class="flex items-center gap-4">
                  <div
                    class="quantity-display bg-gray-100 p-3 rounded-md w-1/3"
                  >
                    {{ product.stock }}
                  </div>
                  <!-- Add "-" button for decreasing stock -->
                  <button
                    class="bg-orange-500 text-white px-4 py-2 rounded-md"
                    @click="decreaseAmount"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    v-model="inputAmount"
                    placeholder="เพิ่มจำนวนสินค้า"
                    class="w-24 p-3 text-center border border-gray-300 rounded-md"
                  />
                  <!-- Add "+" button for increasing stock -->
                  <button
                    class="bg-orange-500 text-white px-4 py-2 rounded-md"
                    @click="increaseAmount"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div class="product-status flex justify-between items-center">
              <div class="status flex gap-4">
                <span class="text-lg font-semibold">สถานะสินค้า</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    class="sr-only peer"
                    :checked="product.is_active"
                    @click="confirmStatusChange(product.id, product.is_active)"
                  />
                  <div
                    class="w-16 h-8 bg-orange-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-orange-600/70 rounded-full peer-checked:bg-orange-500 transition-colors"
                  ></div>
                  <div
                    class="absolute w-7 h-7 bg-white rounded-full left-0.5 top-0.5 peer-checked:translate-x-8 transition-transform"
                  ></div>
                </label>
              </div>

              <div class="actions flex gap-6">
                <button
                  class="bg-orange-500 w-24 py-2 text-white rounded-md hover:bg-yellow-500 font-semibold"
                  @click="confirmSave"
                >
                  บันทึก
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Description -->
      <div class="product-description mt-12 w-full">
        <h3 class="text-2xl font-semibold">รายละเอียด</h3>
        <textarea
          class="w-full p-5 mt-2 border border-gray-300 rounded-md"
          rows="6"
          v-model="product.description"
          placeholder="กรุณากรอกรายละเอียดสินค้า"
        ></textarea>
      </div>

      <!-- Customer Reviews -->
      <div class="reviews mt-12 w-full">
        <h3 class="text-2xl font-semibold">รีวิวจากลูกค้า</h3>
        <!-- <div class="reviews-content bg-white p-6 mt-4 rounded-md shadow-md">
          <div v-if="reviews.id === 0">ไม่มีรีวิว</div>
          <div v-else>
            <div v-for="(review, index) in reviews" :key="index" class="review">
              <div class="rating">⭐ {{ reviews.rating }} / 5</div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Swal from "sweetalert2";
import type {
  Product,
  ProductRes,
  ProductUpdate,
} from "~/models/product.model";
import service from "~/service";

const route = useRoute();

const product = ref<ProductUpdate>({
  id: 0,
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

const getProductById = async () => {
  await service.product
    .getProductById(route.params.id)
    .then((resp: any) => {
      const data = resp.data.data;
      product.value = {
        id: data.id,
        name: data.name,
        price: data.price,
        description: data.description,
        stock: data.stock,
        category_id: Number(data.category.id), // แปลงเป็นตัวเลข
        is_active: data.is_active,
        image_product: data.Image.description,
      };
    })
    .catch((error: any) => {
      console.error(error.response);
    });
};

const updateProduct = async () => {
  product.value.category_id = Number(product.value.category_id);
  // เพิ่ม inputAmount เข้าไปใน stock
  product.value.stock += inputAmount.value;
  await service.product
    .updateProduct(route.params.id, product.value)
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
    .catch((erorr: any) => {
      console.log(erorr.respontse);
    })
    .finally(() => {});
};

// Methods
const inputAmount = ref<number>(0); // ค่าที่จะเพิ่ม/ลด

const increaseAmount = () => {
  inputAmount.value += 1;
};

const decreaseAmount = () => {
  if (inputAmount.value > 1) {
    inputAmount.value -= 1;
  }
};

const confirmSave = () => {
  Swal.fire({
    title: "คุณแน่ใจหรือไม่?",
    text: "คุณต้องการบันทึกสินค้านี้หรือไม่?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    if (result.isConfirmed) {
      updateProduct().then(() => {
        Swal.fire("สำเร็จ!", "สินค้าของคุณได้ถูกบันทึกแล้ว", "success");
        // รีเซ็ตค่า inputAmount เป็น 0 หลังจากบันทึกสำเร็จ
        inputAmount.value = 0;
      });
    }
  });
};

const confirmDelete = () => {
  Swal.fire({
    title: "คุณแน่ใจหรือไม่?",
    text: "คุณต้องการลบสินค้านี้หรือไม่?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("ลบสำเร็จ!", "สินค้าของคุณได้ถูกลบแล้ว", "success");
    }
  });
};

const products = ref<Product[]>([]);

// สถานะการแสดงเมนูของสินค้า
const isMenuVisible = ref<Record<number, boolean>>({});

// ฟังก์ชันสำหรับสลับการแสดงผลของเมนู
const toggleMenu = (productId: number) => {
  isMenuVisible.value = {
    ...isMenuVisible.value,
    [productId]: !isMenuVisible.value[productId],
  };
};

const confirmStatusChange = (productId: number, currentStatus: boolean) => {
  const newStatus = !currentStatus;

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
      const product = products.value.find(
        (product) => product.id === productId
      );
      if (product) {
        product.is_active = newStatus;
        Swal.fire(
          "สำเร็จ!",
          `สถานะของสินค้าได้ถูกเปลี่ยนเป็น "${
            newStatus ? "ใช้งาน" : "ไม่ใช้งาน"
          }" แล้ว`,
          "success"
        );
      }
    }
  });
};

onMounted(() => {
  // use function
  getProductById();
});

console.log("Updating product:", route.params.id, product.value);
</script>

<style scoped>
/* Add custom styles if needed */
</style>
