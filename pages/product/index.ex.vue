<template>
  <div class="flex gap-5 w-full text-black/70">
    <div
      class="bg-[#765798]/60 px-5 py-3 w-3/4 rounded-[20px] flex flex-col gap-5"
    >
      <!-- search -->
      <div class="flex justify-between gap-5">
        <div
          @keyup.enter="listproduct"
          class="bg-white p-2 w-full rounded-[50px] flex gap-5"
        >
          <i class="fa-solid fa-magnifying-glass mt-[14px] pl-2"></i>
          <input
            class="w-full h-[40px]"
            type="search"
            key="name"
            placeholder="ค้นหารายการสินค้าที่ต้องการ"
            v-model="search"
          />
        </div>
        <!-- selector -->
        <div class="bg-[#765798] rounded-[50px] flex gap-[2px] p-2 text-white">
          <i class="fa-solid fa-filter mt-[15px]"></i>
          <select name="" id="" class="bg-[#765798]">
            <option value="\">ทั้งหมด</option>
          </select>
        </div>
        <!-- warn -->
        <div class="flex items-center">
          <i class="fa-solid fa-bell text-yellow-400"></i>
        </div>
      </div>
      <div class="p-2 flex justify-end pr-[10px]">
        <NuxtLink to="/product/create" class="buttonproducts"> เพิ่มสินค้า </NuxtLink>
      </div>
      <!-- product -->
      <div v-if="!loading">
        <div
          class="flex w-full p-5 gap-2 rounded-[20px] bg-white"
          v-for="(item, index) in product.data"
          :key="index"
        >
          <div class="bg-slate-400 w-[200px] flex place-content-center">
            <img
              class="photo"
              src="https://media-cdn.bnn.in.th/400910/acer-aspire-a15-41m-r3du-gray-1-square_medium.jpg"
              alt=""
            />
          </div>
          <!-- detail -->
          <div
            class="bg-slate-500 w-full p-2 flex text-center gap-3 text-xs font-sans text-black"
          >
            <div class="bg-white w-[100px] flex flex-col justify-between">
              <div class="grid gap-2">
                <h1 class="font-extrabold">ชื่อสินค้า</h1>
                <span>{{ item.name }}</span>
              </div>
              <div class="grid gap-2">
                <h1 class="font-extrabold">ประเภทสินค้า</h1>
                <span>{{ item.category.name }}</span>
              </div>
            </div>
            <div class="bg-white w-[100px] grid">
              <h1 class="font-extrabold">ยอดคงเหลือสินค้า</h1>
              <span>{{ item.stock }}</span>
            </div>
            <div class="bg-white w-[100px] grid">
              <h1 class="font-extrabold">ราคา</h1>
              <span>฿{{ item.price }}</span>
            </div>
            <div class="bg-white w-[100px] grid">
              <h1 class="font-extrabold">ยอดขายรวม</h1>
              <span>฿</span>
            </div>
            <div class="bg-white w-[100px] grid">
              <h1 class="font-extrabold">ขายไปแล้ว</h1>
              <span>฿</span>
            </div>
          </div>

          <div
            class="bg-slate-300 w-[200px] pl-2 flex flex-col justify-center items-center gap-2"
          >
            <button
              class="bg-white text-black p-[10px] rounded-[20px] text-center text-sm w-[100px] drop-shadow-lg"
            >
              ซ่อนสินค้า
            </button>
            <button
              class="bg-white text-black p-[10px] rounded-[20px] text-center text-sm w-[100px] drop-shadow-lg"
            >
              แก้ไข
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <div
  class="float-right inline-block h-96 w-96 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
  role="status">
  <span
    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >Loading...</span
  >
</div>
      </div>
    </div>

    <div
      v-if="!loading"
      class="w-1/4 mr-2 flex flex-col gap-5 bg-[#F7F1FD] rounded-[20px]"
    >
      <div class="justify-between">
        <div>
          แสดง {{ (product.paginate.Page - 1) * product.paginate.Size + 1 }} ถึง
          {{ product.paginate.Page * product.paginate.Size }} จากทั้งหมด
          {{ product.paginate.Total }}
        </div>
        <div>
          <div v-for="(item1, index1) in getPages()" :key="index1">
            <button @click="changepage(index1 + 1)">{{ index1 + 1 }}</button>
          </div>
        </div>
      </div>
      <select name="" id="" v-model="size">
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
    <!-- <div v-for="(item, index) in product.data" :key="index">
      <div>{{ item.id }}</div>
      <div>{{ item.name }}</div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import type { Params } from "~/models/client.model";
import type { Listproduct } from "~/models/product.model";
import service from "~/service";

const loading = ref(false);
const page = ref<number>(1);
const size = ref<number>(3);
const search = ref<string>("");
const product = ref<Listproduct>({
  status: {
    code: 0,
    message: "",
  },
  data: [],
  paginate: {
    Page: 0,
    Size: 0,
    Total: 0,
  },
});

const changepage = (pages: number) => {
  console.log(pages);

  page.value = pages;
  listproduct();
};

const getPages = () => {
  const size = product.value.paginate.Size || 1; // ป้องกันตัวหารเป็น 0
  const total = product.value.paginate.Total || 0;

  const pagesCount = Math.ceil(total / size);
  return Array.from({ length: pagesCount }); // สร้าง array ตามจำนวนหน้า
};

watch(
  () => [size.value],
  async () => {
    await listproduct();
  }
);

const listproduct = async () => {
  loading.value = true;
  const param: Params = {
    page: page.value,
    size: size.value,
    search: search.value,
  };
  await service.product
    .getProductList(param)
    .then((resp: any) => {
      console.log(resp);
      product.value.data = resp.data.data;
      product.value.paginate = resp.data.paginate;
    })
    .catch((err: any) => {
      console.error(err);
    })
    .finally(() => {
      loading.value = false;
    });
};

onMounted(async () => {
  await listproduct();
});
</script>

<style></style>
