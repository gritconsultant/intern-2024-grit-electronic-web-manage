<template>
  <div class="defaultpages p-8 pb-16">
    <div v-if="product.id !== 0" class="h-full">
      <div
        class="header mb-8 bg-white h-[10%] flex items-center justify-between pl-[10px] border-[1px] drop-shadow-lg rounded-lg"
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
            <div class="product-image flex flex-col gap-4 w-80">
              <div
                class="h-60 w-full bg-gray-300 rounded-lg flex items-center justify-center relative"
              >
                <img
                  :src="product.image"
                  class="object-cover h-full w-full rounded-lg"
                />
              </div>
              <input
                type="text"
                id="image-url"
                v-model="product.image"
                placeholder="กรอก URL รูปภาพ"
                class="w-full rounded-lg p-3 pl-3 text-gray-700 dropshadowboxsub"
              />
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
                      v-model="product.category_id"
                      id="product-category" 
                      class="w-full  h-[66%]  border border-gray-300  dropshadowboxabsolut  bg-white   focus:ring-2 focus:ring-orange-500 focus:outline-none dropshadowboxabsolute"
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
                      class="quantity-display bg-gray-100 p-2 rounded-md w-[40px] flex items-center justify-center"
                    >
                      {{ product.stock }}
                    </div>
                    <div class="flex items-center gap-2">
                      <button
                        class="bg-orange-500 text-white text-[20px] px-2 py-1 h-[25px] rounded-md flex items-center justify-center"
                        @click="decreaseAmount"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        v-model="inputAmount"
                        placeholder="เพิ่มจำนวนสินค้า"
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
                  <span class="text-lg font-semibold">แสดงสินค้า</span>
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
          </div>
        </div>
      </div>
    </div>
    <div v-else class="absolute left-[1000px] top-[500px]">
      <svg
        aria-hidden="true"
        class="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Swal from "sweetalert2";
import type {
  Category,
  Product,
  ProductRes,
  ProductUpdate,
} from "~/models/product.model";
import service from "~/service";

import { useIndexStore } from "~/store/main";
import type { Params } from "~/models/client.model";

definePageMeta({
  middleware: "auth",
});

const store = useIndexStore();

const loading = ref(false);
const route = useRoute();

const product = ref<ProductUpdate>({
  id: 0,
  name: "",
  price: 0,
  description: "",
  stock: 0,
  category_id: 0,
  is_active: true,
  image: "",
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
  image: "",
});

const getProductById = async () => {
  loading.value = true;
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
        image: data.image,
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
    })
    .finally(() => {
      loading.value = false;
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
        image: data.image_product,
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
      // Update status locally
      product.value.is_active = newStatus;
      productRes.value.is_active = newStatus; // Ensure productRes is updated too

      // Then update product with the new status
      updateProduct().then(() => {
        // Fetch the updated product info from the server
        getProductById();
        Swal.fire(
          "สำเร็จ!",
          `สถานะของสินค้าได้ถูกเปลี่ยนเป็น "${
            newStatus ? "ใช้งาน" : "ไม่ใช้งาน"
          }" แล้ว`,
          "success"
        );
      });
    }
  });
};

const categories = ref<Category[]>([]);
const search = ref<string>("");
const size = ref(6); // ทำให้เป็น ref
const currentPage = ref(1); // ตั้งค่า currentPage เริ่มต้นที่ 1
const Category = ref();

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

onMounted( async () => {
  // use function
   await getCategorylist();
   await getProductById();
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
