<template>
  <div class="defaultpages flex flex-col gap-8 p-6">
    <!-- Header Section -->
    <div class="w-full flex items-center justify-center h-[10%]">
      <div
        class="flex items-center justify-center h-full w-[100%] rounded-lg bg-white dropshadowbox"
      >
        <h1 class="text-[26px] font-bold text-gray-800 mr-[90 px]">ธนาคาร</h1>
      </div>
    </div>

    <!-- Main Content -->
    <div
      class="flex flex-col justify-center items-center h-[90%] bg-white rounded-lg dropshadowbox"
      v-if="!loading"
    >
      <div class="w-[70%] flex flex-col gap-6 p-6 bg-white rounded-lg">
        <div class="flex gap-8">
          <!-- Left: Preview Image Section -->
          <div class="flex flex-col w-[50%] items-end pr-[90px] gap-6">
            <h2 class="text-xl font-bold mr-[140px]">คิวอาร์โค้ด</h2>
            <div class="flex flex-col gap-2">
              <div
                class="w-[380px] h-[380px] bg-gray-100 flex justify-center items-center rounded-lg shadow-md"
              >
                <img
                  v-if="bank.image && isValidUrl(bank.image)"
                  :src="bank.image"
                  alt="Preview"
                  class="w-full h-full rounded-lg object-cover dropshadowbox"
                />
                <span v-else class="text-gray-500">ไม่มีรูปที่เลือก</span>
              </div>
              <div class="flex flex-col gap-5">
                <!-- Input field placed next to the image -->
                <input
                  type="text"
                  id="image-url"
                  v-model="bank.image"
                  class="mt-4 w-full text-center border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  placeholder="กรุณาใส่ลิ้งรูป"
                />
              </div>
            </div>
          </div>

          <!-- Right: Bank Information -->
          <div class="flex flex-col gap-6 w-[50%]">
            <h2 class="text-xl font-bold flex justify-center mr-[160px]">
              รายละเอียด
            </h2>
            <div class="grid grid-cols-1 pr-[70px] gap-4">
              <!-- Bank Name -->
              <div class="flex flex-col gap-2">
                <label class="text-lg font-semibold">ชื่อธนาคาร</label>
                <div class="flex gap-4">
                  <!-- รายการเลือกธนาคาร -->
                  <select
                    v-model="bank.bank_name"
                    @change="onBankChange"
                    class="w-full p-2 border rounded-md"
                  >
                    <option
                      v-for="bankName in namebanks"
                      :key="bankName"
                      :value="bankName"
                    >
                      {{ bankName }}
                    </option>
                    <option value="อื่นๆ">อื่นๆ</option>
                    <!-- เพิ่มตัวเลือก "อื่นๆ" -->
                  </select>

                  <!-- เมื่อเลือก "อื่นๆ" ให้แสดง input สำหรับกรอกชื่อธนาคาร -->
                  <div v-if="bank.bank_name === 'อื่นๆ'" class="flex gap-2">
                    <input
                      type="text"
                      v-model="otherBank"
                      placeholder="กรอกชื่อธนาคาร"
                      class="p-2 border rounded-md w-[200px]"
                    />
                    <button
                      @click="confirmBank"
                      class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      ยืนยัน
                    </button>
                  </div>
                </div>
              </div>

              <!-- Account Number -->
              <div class="flex flex-col gap-2">
                <label class="text-lg font-semibold">เลขบัญชี</label>
                <input
                  v-model="bank.account_number"
                  type="text"
                  class="p-2 border rounded-md"
                />
              </div>

              <!-- Branch Name -->
              <div class="flex flex-col gap-2">
                <label class="text-lg font-semibold">สาขาธนาคาร</label>
                <input
                  v-model="bank.description"
                  type="text"
                  class="p-2 border rounded-md"
                />
              </div>

              <!-- Account Name -->
              <div class="flex flex-col gap-2">
                <label class="text-lg font-semibold">ชื่อบัญชี</label>
                <input
                  v-model="bank.account_name"
                  type="text"
                  class="p-2 border rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Save Button -->
      <div class="flex justify-end items-end h-[100px] mr-[75px]">
        <button
          @click="saveData"
          class="px-6 py-3 bg-orange-500 text-white rounded-md h-[45%] font-semibold hover:bg-orange-600"
        >
          บันทึกข้อมูล
        </button>
      </div>
    </div>
    <div v-else class="absolute left-[600px] top-[200px]">
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

<script setup lang="ts">
import Swal from "sweetalert2";
import type { BankRes, BankUpdate } from "~/models/order.model";
import service from "~/service";

const route = useRoute();
const loading = ref(false);

const bank = ref<BankUpdate>({
  id: 0,
  bank_name: "",
  account_name: "",
  account_number: "",
  description: "",
  image: "",
  is_active: true,
});

const bankRes = ref<BankRes>({
  id: 0,
  bank_name: "",
  account_name: "",
  account_number: "",
  description: "",
  image: "",
  is_active: true,
});

const getBankById = async (id: number) => {
  loading.value = true;
  try {
    const resp = await service.order.getBankById(id);
    const data = resp.data.data;
    bank.value = {
      id: data.id,
      bank_name: data.bank_name, // ⬅ ค่า bank_name มาแล้ว
      account_name: data.account_name,
      account_number: data.account_number,
      description: data.description,
      image: data.image,
      is_active: data.is_active,
    };
    // เพิ่มธนาคารที่ไม่ได้อยู่ใน namebanks
    if (data.bank_name && !namebanks.value.includes(data.bank_name)) {
      namebanks.value.push(data.bank_name); // เพิ่มชื่อธนาคารที่ไม่ได้อยู่ใน namebanks
    }

    // กรณีที่เลือกธนาคารที่ไม่ใช่ "อื่นๆ" ให้ reset ค่า "otherBank"
    if (data.bank_name !== "อื่นๆ") {
      otherBank.value = "";
    }
  } catch (error) {
    console.error("Error fetching bank by ID:", error);
  } finally {
    loading.value = false;
  }
};

const updateBank = async () => {
  await service.order
    .updateBank(route.params.id, bank.value)
    .then((resp: any) => {
      const data = resp.data;
      const temp: BankRes = {
        id: data.id,
        bank_name: data.bank_name,
        account_name: data.account_name,
        account_number: data.account_number,
        description: data.description,
        image: data.Image,
        is_active: data.is_active,
      };
      bankRes.value = temp;
    })
    .catch((error: any) => {
      console.error("Error updating bank:", error);
    })
    .finally(() => {});
};

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

const otherBank = ref<string>("");

// ฟังก์ชัน onBankChange
const onBankChange = () => {
  if (bank.value.bank_name !== "อื่นๆ") {
    otherBank.value = ""; // รีเซ็ตค่าเมื่อเลือกธนาคารที่ไม่ใช่ "อื่นๆ"
  }
  // ไม่มีการตั้งค่า bank_name เป็น "อื่นๆ" ที่นี่อีกแล้ว
};

// เมื่อเลือก 'อื่นๆ' ให้แสดงอินพุต
const confirmBank = () => {
  if (otherBank.value.trim()) {
    // เพิ่มชื่อธนาคารที่กรอกลงใน namebanks ถ้ายังไม่มีในรายการ
    if (!namebanks.value.includes(otherBank.value)) {
      namebanks.value.push(otherBank.value);
    }
    bank.value.bank_name = otherBank.value; // อัปเดตค่า bank_name เป็นชื่อที่กรอก
    console.log("Updated bank_name:", bank.value.bank_name); // ตรวจสอบการอัปเดตค่า
  } else {
    Swal.fire(
      "กรุณากรอกชื่อธนาคาร",
      "ชื่อธนาคารไม่สามารถเป็นค่าว่าง",
      "warning"
    );
  }
};

const isValidUrl = (url: string) => {
  const regex = /^(http|https):\/\/[^ "]+$/;
  return regex.test(url);
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

// ฟังก์ชันบันทึกข้อมูล
const saveData = () => {
  Swal.fire({
    title: "ยืนยันการบันทึกข้อมูล",
    text: "คุณต้องการบันทึกข้อมูลนี้หรือไม่?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await updateBank(); // เรียกใช้ฟังก์ชันอัปเดตข้อมูล
        Swal.fire("สำเร็จ!", "ข้อมูลถูกบันทึกเรียบร้อย", "success");
      } catch (error) {
        console.error("Error saving bank data:", error);
        Swal.fire("เกิดข้อผิดพลาด", "ไม่สามารถบันทึกข้อมูลได้", "error");
      }
    } else {
      Swal.fire("ยกเลิก", "คุณได้ยกเลิกการบันทึกข้อมูล", "info");
    }
  });
};

watch(
  () => bank.value.bank_name,
  (newValue) => {
    otherBank.value = newValue === "อื่นๆ" ? otherBank.value : ""; // กรณีเลือก "อื่นๆ" ต้องคงค่าที่กรอกไว้
    console.log("bank.bank_name changed:", newValue);
  }
);

onMounted(() => {
  const id = route.params.id ? Number(route.params.id) : 1; // ถ้าไม่มี id ใน URL ใช้ค่า 1
  getBankById(id); // เรียกฟังก์ชันพร้อมส่ง id
});
</script>

<style scoped></style>
