<template>
  <div class="defaultpages">
    <div class="flex items-center justify-between h-[5%] my-5 pl-[35px]">
      <h1 class="text-[36px] font-bold text-gray-800">เพิ่มสินค้า</h1>
    </div>
    <div class="mx-[80px] mr-[20%] flex flex-col gap-8 h-full">
      <!-- Product Name -->
      <div class="text-[22px] font-semibold flex gap-10">
        <label for="product-name" class="text-gray-600">ชื่อสินค้า</label>
        <input
          type="text"
          id="product-name"
          class="rounded-[8px] w-[87%] ml-[20px] p-[10px] border-2 border-gray-300 focus:outline-none focus:border-orange-400"
        />
      </div>

      <!-- Product Category, Price, and Status -->
      <div class="flex gap-8">
        <div class="flex gap-[20px] w-[70%]">
          <div class="flex flex-col gap-5 w-[50%]">
            <label
              for="product-category"
              class="text-[22px] font-semibold text-gray-600"
              >ประเภทสินค้า</label
            >
            <label
              for="product-price"
              class="text-[22px] font-semibold text-gray-600"
              >ราคา</label
            >
          </div>
          <div class="flex flex-col gap-6 w-full">
            <select
              id="product-category"
              class="w-[95%] h-[45px] rounded-[8px] p-[10px] border-2 border-gray-300 focus:outline-none focus:border-orange-400"
            >
              <option value="">เลือกประเภท</option>
              <!-- Add options here -->
            </select>
            <input
              type="text"
              id="product-price"
              class="w-[95%] h-[45px] rounded-[8px] p-[10px] border-2 border-gray-300 focus:outline-none focus:border-orange-400"
            />
          </div>
        </div>

        <!-- Product Status and Quantity -->
        <div class="flex gap-[20px] w-[70%]">
          <div class="flex flex-col gap-5 w-[50%]">
            <label
              for="product-status"
              class="text-[22px] font-semibold text-gray-600"
              >สถานะสินค้า</label
            >
            <label
              for="product-quantity"
              class="text-[22px] font-semibold text-gray-600"
              >จำนวน</label
            >
          </div>
          <div class="flex flex-col gap-6 w-full">
            <label class="relative inline-flex items-center cursor-pointer">
              <!-- Checkbox -->
              <input
                type="checkbox"
                id="product-status"
                class="sr-only peer"
                @change="onStatusChange"
              />
              <!-- Toggle Switch Background -->
              <div
                class="w-[30%] h-[40px] bg-orange-200 peer-focus:outline-none peer-focus:ring-[1px] peer-focus:ring-orange-600/70 rounded-full peer-checked:bg-orange-500 transition-colors"
              ></div>
              <!-- Toggle Knob -->
              <div
                class="absolute w-[9%] h-[36px] bg-orange-400 rounded-full left-[2px] top-[2px] peer-checked:translate-x-[82px] transition-transform"
              ></div>
            </label>

            <input
              type="text"
              id="product-quantity"
              class="w-[95%] h-[45px] rounded-[8px] p-[10px] border-2 border-gray-300 focus:outline-none focus:border-orange-400"
            />
          </div>
        </div>
      </div>

      <!-- Product Details -->
      <div class="flex gap-[30px]">
        <h3 class="text-[22px] font-semibold text-gray-600">รายละเอียด</h3>
        <textarea
          class="rounded-[8px] w-[87%] p-[10px] border-2 border-gray-300 focus:outline-none focus:border-orange-400"
          placeholder="ระบุรายละเอียดสินค้า"
        ></textarea>
      </div>

      <!-- Product Image -->
      <div class="flex flex-col gap-5">
        <h3 class="text-[22px] font-semibold">รูปสินค้า</h3>
        <!-- Preview image -->
        <div
          class="flex justify-center items-center w-full h-[90%] bg-slate-50"
        >
          <!-- กรอบแสดงรูป -->
          <div
            class="bg-slate-50 dropshadowbottomsub w-[400px] h-[400px] rounded-[5px] flex justify-center items-center"
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
              alt="Preview"
              class="w-[400px] h-[400px] rounded-[5px] object-cover"
            />
            <span v-else class="text-gray-500">ไม่มีรูปที่เลือก</span>
          </div>
          <!-- Input file -->
          <div class="flex items-end h-full">
            <div class="flex flex-col pl-8">
              <!-- ปุ่มรีเซ็ตรูป -->
              <button
                v-if="imageUrl"
                @click="clearImage"
                class="mb-2 px-4 py-2 w-[100px] bg-red-500 text-white rounded-[5px] hover:bg-red-600"
              >
                ลบรูปภาพ
              </button>
              <input
                type="file"
                ref="fileInput"
                @change="onFileChange"
                accept="image/*"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-center gap-16 mt-8">
        <!-- ปุ่มยกเลิก -->
        <button
          to="/product"
          @click.prevent="confirmCancel"
          class="border-2 p-3 rounded-[8px] bg-red-600 text-white hover:bg-red-700 transition-colors"
        >
          ยกเลิก
        </button>

        <!-- ปุ่มยืนยัน -->
        <button
          @click="confirmSubmit"
          class="border-2 p-3 rounded-[8px] bg-green-600 text-white hover:bg-green-700 transition-colors"
        >
          ยืนยัน
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2"; // เพิ่มการนำเข้า SweetAlert2

// ใช้ ref เพื่อเก็บ URL ของรูปภาพ
const imageUrl = ref<string | null>(null);

// ใช้ ref สำหรับ input file
const fileInput = ref<HTMLInputElement | null>(null);

// ฟังก์ชันจัดการเมื่อมีการเลือกไฟล์
const onFileChange = (event: Event) => {
  // ตรวจสอบว่า target เป็น HTMLInputElement
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0]; // รับไฟล์ที่เลือก (ตรวจสอบว่า files ไม่ใช่ null)

  if (file) {
    const reader = new FileReader();

    // อ่านไฟล์และแปลงเป็น Data URL
    reader.onload = (e) => {
      imageUrl.value = e.target?.result as string; // แปลงผลลัพธ์เป็น string
    };

    reader.readAsDataURL(file); // อ่านไฟล์
  }
};

// ฟังก์ชันลบรูปภาพ
const clearImage = () => {
  imageUrl.value = null; // รีเซ็ต URL ของรูปภาพ

  // รีเซ็ต input file
  if (fileInput.value) {
    fileInput.value.value = ""; // รีเซ็ตค่า value ของ input
  }
};

const router = useRouter();

// ฟังก์ชันยืนยันการยกเลิก
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
      // หากผู้ใช้กดยืนยัน ให้ทำการเปลี่ยนเส้นทางไปที่หน้า product
      router.push("/product"); // ใช้ Vue Router เพื่อเปลี่ยนเส้นทาง
    }
  });
};

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
      // หากผู้ใช้กดยืนยัน ให้ดำเนินการบันทึกข้อมูล
      Swal.fire("สำเร็จ!", "สินค้าของคุณได้ถูกบันทึกแล้ว", "success").then(
        () => {
          router.push("/product"); // เปลี่ยนเส้นทางไปที่หน้า product โดยไม่โหลดหน้าใหม่
        }
      );
    }
  });
};

const onStatusChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const newStatus = target.checked ? "ใช้งาน" : "ไม่ใช้งาน";

  Swal.fire({
    title: "คุณแน่ใจหรือไม่?",
    text: `คุณต้องการเปลี่ยนสถานะเป็น "${newStatus}" หรือไม่?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        "สำเร็จ!",
        `สถานะสินค้าได้ถูกเปลี่ยนเป็น "${newStatus}" แล้ว`,
        "success"
      );
    } else {
      // หากผู้ใช้ยกเลิก ให้รีเซ็ตสถานะกลับไปเป็นเดิม
      target.checked = !target.checked;
    }
  });
};
</script>

<style scoped>
/* Optional Custom Styles */
</style>
