<template>
  <div class="defaultpages p-8 pb-16">
    <div v-if="product.id != 0" class="h-full">
      <div
        class="header mb-8 bg-white h-[10%] flex items-center justify-between pl-[10px] dropshadowbox rounded-lg"
      >
        <h1 class="text-3xl font-bold text-gray-800">
          สินค้า #{{ product.id }}
        </h1>
      </div>

      <div class="flex gap-4 h-[90%]">
        <!-- Product List Section -->
        <div
          class="flex flex-col bg-white dropshadowbox rounded-lg p-4 w-[70%] h-full"
        >
          <div class="flex gap-8 p-6 w-full">
            <div class="product-image flex-none w-80">
              <div
                class="h-80 w-full bg-gray-300 rounded-lg flex items-center justify-center relative"
              >
                <img src="" class="object-cover h-full w-full rounded-lg" />
              </div>
            </div>

            <div
              class="product-info flex flex-col justify-between gap-6 w-full"
            >
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
                  <div class="product-category text-xl font-semibold w-1/2">
                    <label class="block">ประเภท</label>
                    <select
                      class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                      v-model="product.category_id"
                      @change="
                        product.category_id = Number(product.category_id)
                      "
                    >
                      <option value="">กรุณาเลือกประเภท</option>
                      <option value="1">อาหาร</option>
                      <option value="4">เครื่องดื่ม</option>
                      <option value="5">สมุนไพร</option>
                      <option value="6">ผ้าและเครื่องแต่งกาย</option>
                      <option value="7">ของใช้ ของตกแต่ง</option>
                    </select>
                  </div>

                  <div class="product-price text-xl font-semibold w-1/2">
                    <label class="block">ราคา</label>
                    <input
                      type="number"
                      v-model="product.price"
                      placeholder="กรุณากรอกราคา"
                      class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>

                <div class="product-quantity flex items-center gap-4">
                  <label class="text-xl font-semibold">จำนวนสินค้า</label>
                  <div class="flex items-center gap-4">
                    <div
                      class="quantity-display bg-gray-100 p-2  rounded-md w-[40px] flex items-center justify-center"
                    >
                      {{ product.stock }}
                    </div>
                    <div class="flex items-center gap-2">
                      <!-- Add "-" button for decreasing stock -->
                      <button
                        class="bg-orange-500 text-white text-[20px] px-2 py-1  h-[25px] rounded-md flex items-center justify-center"
                        @click="decreaseAmount"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        v-model="inputAmount"
                        placeholder="เพิ่มจำนวนสินค้า"
                        class="w-24 p-1 h-[25px] text-center border border-gray-300 rounded-md input::-webkit-outer-spin-button"
                      />
                      <!-- Add "+" button for increasing stock -->
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
                  <span class="text-lg font-semibold">สถานะสินค้า</span>
                  <label
                    class="relative inline-flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      class="sr-only peer"
                      :checked="product.is_active"
                      @click="
                        confirmStatusChange(product.id, product.is_active)
                      "
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
              class="w-full p-5 mt-2 border border-gray-300 rounded-md"
              rows="6"
              v-model="product.description"
              placeholder="กรุณากรอกรายละเอียดสินค้า"
            ></textarea>
          </div>
          <div class="actions flex justify-end gap-6 mt-4 px-6">
            <button
              class="bg-orange-500 w-24 py-2 text-white rounded-md hover:bg-yellow-500 font-semibold"
              @click="confirmSave"
            >
              บันทึก
            </button>
          </div>
        </div>

        <!-- Customer Reviews -->
        <div
          class="w-[30%] pt-4 px-2 h-full bg-white flex flex-col gap-5 dropshadowbox rounded-lg"
        >
          <h3 class="text-2xl font-semibold text-center flex flex-col gap-2">
            รีวิวจากลูกค้า
            <span class="text-sm text-gray-600"
              >{{ reviewCount }} รีวิว {{ averageRating }} คะแนน</span
            >
          </h3>
          <div class="reviews-container">
            <div
              class="review-item dropshadowboxsub"
              v-for="(review, index) in product.Review"
              :key="index"
            >
              <div class="flex justify-between gap-8">
                <span class="flex items-end truncate w-[60%]"
                  >ชื่อ {{ review.username }}</span
                >
                <div class="flex gap-4 w-[40%]">
                  <div class="flex gap-1">
                    <!-- แสดงดาวตามค่า review.rating -->
                    <span
                      v-for="star in 5"
                      :key="star"
                      :class="{
                        'text-yellow-500': star <= review.rating,
                        'text-gray-400': star > review.rating,
                      }"
                      class="text-[20px]"
                    >
                      <i class="fas fa-star"></i>
                    </span>
                  </div>
                  <div
                    class="text-[15px] font-bold flex items-center pt-[5px] place-content-center"
                  >
                    {{ review.rating }}
                  </div>
                </div>
              </div>
              <div class="h-[80px] text-wrap p-2">{{ review.description }}</div>
            </div>
            <div></div>
          </div>
        </div>
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
  Review: [{ id: 0, username: "", rating: 0, description: "" }],
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
        Review: data.Review
          ? data.Review.map((review: any) => ({
              id: review.id,
              username: review.username || "Anonymous", // ถ้า username ว่าง ให้เป็น Anonymous
              rating: review.rating,
              description: review.description,
            }))
          : [],
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

const reviewCount = computed(() => {
  return product.value.Review ? product.value.Review.length : 0;
});

// Computed property to calculate average rating
const averageRating = computed(() => {
  if (!product.value.Review || product.value.Review.length === 0) return "0";
  const total = product.value.Review.reduce(
    (sum, review) => sum + review.rating,
    0
  );
  return (total / product.value.Review.length).toFixed(1); // Returning 1 decimal place
});

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

const products = ref<Product[]>([]);

// สถานะการแสดงเมนูของสินค้า
const isMenuVisible = ref<Record<number, boolean>>({});

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
.reviews-container {
  display: flex;
  flex-flow: column;
  gap: 8px; /* เทียบเท่า gap-2 */
  padding: 1px 10px; /* เทียบเท่า px-[10px] */
  overflow-y: auto; /* ทำให้ scrollbar ปรากฏเมื่อเนื้อหามากเกิน */
  max-height: 600px; /* กำหนดความสูงสูงสุดที่ container สามารถขยายได้ */
  align-items: flex-start; /* จัดการการจัดตำแหน่งของ flex items ให้เริ่มจากบน */
}

.reviews-container > .review {
  flex-shrink: 0; /* ป้องกันไม่ให้ .review ย่อขนาดเมื่อพื้นที่ไม่พอ */
  flex-grow: 0; /* ป้องกันไม่ให้ .review ขยายขนาดเมื่อพื้นที่มากเกินไป */
  height: auto; /* ปล่อยให้ .review ขยายตามเนื้อหา */
}

.review-item {
  display: flex; /* ทำให้ .review-item สามารถขยายได้ */
  flex-direction: column; /* ให้เนื้อหาภายใน .review-item เป็นแนวตั้ง */
  padding: 16px; /* เทียบเท่า p-4 */
  border-radius: 8px; /* เทียบเท่า rounded-lg */
  width: 100%; /* เทียบเท่า w-full */
  height: 200px;
  background-color: white; /* เทียบเท่า bg-white */
  flex-grow: 0; /* ป้องกันไม่ให้ .review-item ขยายขนาด */
  height: auto; /* ปล่อยให้ .review-item ขยายตามเนื้อหา */
}

input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
