<template>
  <div class="defaultpages">
    <h1>Product List</h1>
    <!-- ตรวจสอบว่ามีสินค้าใน products หรือไม่ -->
    <div v-if="products.length">
      <ul>
        <li v-for="(product, index) in products" :key="index">
          <h2>{{ product.name }}</h2>
          <p>Price: {{ product.price }}</p>
          <p>Stock: {{ product.stock }}</p>
          <p>Category: {{ product.category.name }}</p>

          <!-- แสดงรูปภาพ -->
          <img v-if="product.image" :src="product.image.type + '://' + product.image.ref_id" alt="Product image" />

        </li>
      </ul>
    </div>
    <!-- แสดงข้อความถ้าไม่มีสินค้า -->
    <div v-else>
      <p>No products available.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Product } from "~/models/product.model";
import service from "~/service";

// สร้าง state เก็บข้อมูลสินค้า
const products = ref<Product[]>([]);

const getProductList = async () => {
  await service.product
    .getProductList()
    .then((resp: any) => {
      const data = resp.data.data;
      const productlist: Product[] = [];

      console.log(data); // ตรวจสอบข้อมูลที่ได้รับจาก API
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
          },
          category: {
            id: e.category?.id,
            name: e.category?.name,
          },
          reviews: e.review?.map((r: any) => ({
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
      console.log(products.value); // ตรวจสอบข้อมูลใน products หลังจากอัปเดต
    })
    .catch((error: any) => {
      console.log("Error loading product list:", error.response || error);
    })
    .finally(() => {
      console.log("Finished loading product list.");
    });
};

// เรียกใช้ฟังก์ชันเมื่อคอมโพเนนต์โหลด
onMounted(async () => {
  await getProductList();
});
</script>

<style scoped>
.defaultpages {
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 15px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
}

h2 {
  margin: 0;
  font-size: 18px;
}

p {
  margin: 5px 0;
}

img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>
