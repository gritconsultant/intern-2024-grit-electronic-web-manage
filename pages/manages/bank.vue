<template>
  <div class="defaultpages flex flex-col gap-6 p-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between h-[5%] pl-8">
      <h1 class="text-[26px] font-bold text-gray-800">ธนาคาร</h1>
    </div>

    <!-- Main Content -->
    <div class="flex justify-center h-full">
      <div
        class="w-[75%] h-full flex flex-col justify-center rounded-[10px] bg-white shadow-lg p-8"
      >
        <!-- Preview Image Section -->
        <div class="flex justify-center items-center w-full h-[45%] mb-6">
          <div
            class="bg-slate-50 shadow-md w-[380px] h-[380px] rounded-[10px] flex justify-center items-center"
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
              alt="Preview"
              class="w-[380px] h-[380px] rounded-[10px] object-cover"
            />
            <span v-else class="text-gray-500">ไม่มีรูปที่เลือก</span>
          </div>
          <div class="flex flex-col items-end ml-4">
            <div class="flex gap-2 mb-4">
              <button
                v-if="imageUrl"
                @click="clearImage"
                class="px-4 py-2 w-[110px] bg-red-500 text-white rounded-[5px] hover:bg-red-600"
              >
                ลบรูปภาพ
              </button>
              <input
                type="file"
                ref="fileInput"
                @change="onFileChange"
                accept="image/*"
                class="mt-2"
              />
            </div>
          </div>
        </div>

        <!-- QR Code Section -->
        <div class="text-[20px] font-bold text-center mb-6">คิวอาร์โค้ด</div>

        <!-- Bank Information Section -->
        <div class="w-full h-[45%] flex flex-col justify-between items-center">
          <div class="w-[90%] flex flex-col gap-6">
            <div class="flex justify-between items-center gap-6">
              <div class="flex gap-4">
                <span class="text-[18px] font-semibold">ชื่อธนาคาร:</span>
                <div class="w-[230px] text-gray-700">{{ bank.bank_name }}</div>
              </div>
              <select
                v-model="selectedBank"
                @change="onBankChange"
                class="bg-orange-100 rounded-[5px] w-[200px] text-center py-2"
              >
                <option v-for="bank in namebanks" :key="bank" :value="bank">
                  {{ bank }}
                </option>
                <option value="อื่นๆ">อื่นๆ</option>
              </select>
              <div
                v-if="selectedBank === 'อื่นๆ'"
                class="flex flex-col gap-4 absolute right-[80px]"
              >
                <input
                  type="text"
                  v-model="otherBank"
                  placeholder="กรอกชื่อธนาคาร"
                  class="bg-white shadow-md w-[200px] rounded-[5px] px-2"
                />
                <button
                  @click="confirmBank"
                  class="h-[35px] w-[100px] bg-green-500 text-white rounded-[5px] hover:bg-green-600"
                >
                  ยืนยัน
                </button>
              </div>
            </div>

            <!-- Bank Account Number Section -->
            <div class="flex items-center gap-4">
              <span class="w-[25%] text-[18px] font-semibold text-gray-700"
                >เลขบัญชี:</span
              >
              <input
                v-model="bankNumber"
                type="text"
                class="bg-gray-200 shadow-md w-[230px] rounded-[5px] px-2"
              />
            </div>

            <!-- Branch Name Section -->
            <div class="flex items-center gap-4">
              <span class="w-[25%] text-[18px] font-semibold text-gray-700"
                >สาขาธนาคาร:</span
              >
              <input
                v-model="bankNumber"
                type="text"
                class="bg-gray-200 shadow-md w-[230px] rounded-[5px] px-2"
              />
            </div>

            <!-- Account Name Section -->
            <div class="flex items-center gap-4">
              <span class="w-[25%] text-[18px] font-semibold text-gray-700"
                >ชื่อบัญชี:</span
              >
              <input
                v-model="accountName"
                type="text"
                class="bg-gray-200 shadow-md w-[230px] rounded-[5px] px-2"
              />
            </div>
          </div>

          <!-- Save Button -->
          <div class="flex justify-center mt-6">
            <button
              @click="saveData"
              class="p-3 rounded-[5px] font-semibold bg-orange-500 text-white w-[200px] hover:bg-orange-600"
            >
              บันทึกข้อมูล
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import type { BankRes, BankUpdate } from "~/models/order.model";
import service from "~/service";

const route = useRoute();

const bank = ref<BankUpdate>({
  id: 0,
  bank_name: "",
  account_name: "",
  account_number: "",
  description: "",
  image_system_bank: {
    id: 0,
    ref_id: 0,
    type: "",
    description: "",
  },
  is_active: true,
});

const bankRes = ref<BankRes>({
  id: 0,
  bank_name: "",
  account_name: "",
  account_number: "",
  description: "",
  image_system_bank: {
    id: 0,
    ref_id: 0,
    type: "",
    description: "",
  },
  is_active: true,
});

const getBankById = async (id: number) => {
  try {
    const resp = await service.order.getBankById(id);
    const data = resp.data.data;
    const temp: BankUpdate = {
      id: data.id,
      bank_name: data.bank_name,
      account_name: data.account_name,
      account_number: data.account_number,
      description: data.description,
      image_system_bank: {
        id: 0,
        ref_id: 0,
        type: "",
        description: "",
      },
      is_active: data.is_active,
    };
    bank.value = temp;
  } catch (error) {
    console.error("Error fetching bank by ID:", error);
  }
};

// const getBanklist = async () => {
//   await service.order.getBanklist().then((resp: any) => {
//     const data = resp.data.data;
//     console.log(data);
//   });
// };

// ตัวแปรเก็บธนาคารทั้งหมด
const namebanks = ref([
  "ธนาคารกรุงเทพ",
  "ธนาคารไทยพาณิชย์",
  "ธนาคารกสิกรไทย",
  "ธนาคารกรุงไทย",
  "ธนาคารกรุงศรีอยุธยา",
  "ธนาคารทหารไทย",
  "ธนาคารธนชาต",
  "ธนาคารออมสิน",
  "ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร",
  "ธนาคารซีไอเอ็มบีไทย",
  "ธนาคารยูโอบี",
  "ธนาคารแลนด์แอนด์เฮ้าส์",
]);

// ตัวแปรสำหรับเก็บธนาคารที่เลือก
const selectedBank = ref<string>("กสิกรไทย");
const bankNumber = ref<string>("000-0000-0000-0");
const accountName = ref<string>("บริษัทจำกัด");
const qr = ref<string>(
  "https://services-inw-me.lnw.co.th/qr/132/f6d6a5dea610f3bcf11b1db8f0d6ecaa.png?p=lnwshop&h=232584b0b5146183a62d0350400c51b3725714e6&c=https%3A%2F%2Flnwgo.com%2Fqr%2Fs%2F892682%3Fs%3D8a06c9d5"
);

// ตัวแปรสำหรับกรอกชื่อธนาคารในกรณีเลือก "อื่นๆ"
const otherBank = ref<string>("");

// ฟังก์ชันจัดการเมื่อเลือกธนาคาร
const onBankChange = () => {
  if (selectedBank.value !== "อื่นๆ") {
    otherBank.value = ""; // รีเซ็ตค่าเมื่อเลือกธนาคารที่ไม่ใช่ "อื่นๆ"
  }
};

// ฟังก์ชันจัดการเมื่อมีการเลือกไฟล์
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

// ฟังก์ชันลบรูปภาพ
const clearImage = () => {
  imageUrl.value = null;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

// ฟังก์ชันยืนยันธนาคาร
const confirmBank = () => {
  if (otherBank.value) {
    selectedBank.value = otherBank.value; // เปลี่ยนชื่อธนาคารที่เลือกเป็นชื่อที่กรอก
  }
};

// ฟังก์ชันบันทึกข้อมูล
const saveData = () => {
  Swal.fire({
    title: "ยืนยันการบันทึกข้อมูล",
    text: "คุณต้องการบันทึกข้อมูลนี้หรือไม่?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    if (result.isConfirmed) {
      // Process to save the data here
      console.log("ข้อมูลที่บันทึก:", {
        selectedBank: selectedBank.value,
        bankNumber: bankNumber.value,
        accountName: accountName.value,
      });

      Swal.fire("สำเร็จ!", "ข้อมูลถูกบันทึกเรียบร้อย", "success");
    } else {
      Swal.fire("ยกเลิก", "คุณได้ยกเลิกการบันทึกข้อมูล", "info");
    }
  });
};

watch(
  () => route.params.id,
  (newId) => {
    const id = newId ? Number(newId) : 1; // ถ้ามี id ใหม่ใน URL ใช้ค่าใหม่, ไม่งั้นใช้ 1
    getBankById(id); // ส่ง id ไปที่ฟังก์ชัน getBankById
  },
  { immediate: true }
); // ให้ทำงานทันทีเมื่อ mounted

onMounted(() => {
  const id = route.params.id ? Number(route.params.id) : 1; // ถ้าไม่มี id ใน URL ใช้ค่า 1
  getBankById(id); // เรียกฟังก์ชันพร้อมส่ง id
});
</script>

<style scoped></style>
