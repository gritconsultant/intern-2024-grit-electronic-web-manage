<template>
  <div class="defaultpages flex flex-col gap-8 p-6">
    <!-- Header Section -->
    <div
      class="flex items-center justify-center h-[10%] rounded-lg bg-white dropshadowbox"
    >
      <h1 class="text-[26px] font-bold text-gray-800">ธนาคาร</h1>
    </div>

    <!-- Main Content -->
    <div class="flex justify-center h-[70%]">
      <div
        class="w-[90%] flex flex-col gap-6 p-6 bg-white dropshadowbox rounded-lg"
      >
        <div class="grid grid-cols-2 gap-8">
          <!-- Left: Preview Image Section -->
          <div class="flex flex-col items-center gap-6">
            <h2 class="text-xl font-bold">คิวอาร์โค้ด</h2>
            <div class="flex flex-col gap-4">
              <div
                class="w-[380px] h-[380px] bg-gray-100 flex justify-center items-center rounded-lg shadow-md"
              >
                <img
                  v-if="imageUrl"
                  :src="imageUrl"
                  alt="Preview"
                  class="w-full h-full rounded-lg object-cover"
                />
                <span v-else class="text-gray-500">ไม่มีรูปที่เลือก</span>
              </div>
              <div class="flex flex-col gap-5">
                <input
                  type="file"
                  ref="fileInput"
                  @change="onFileChange"
                  accept="image/*"
                />
                <button
                  v-if="imageUrl"
                  @click="clearImage"
                  class="px-4 py-2 w-full bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  ลบรูปภาพ
                </button>
              </div>
            </div>
          </div>

          <!-- Right: Bank Information -->
          <div class="flex flex-col gap-6">
            <h2 class="text-xl font-bold flex justify-center">รายละเอียด</h2>
            <div class="grid grid-cols-1 gap-4">
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

            <!-- Save Button -->
            <div class="flex justify-end items-end h-[100px]">
              <button
                @click="saveData"
                class="px-6 py-3 bg-orange-500 text-white rounded-md h-[50%] font-semibold hover:bg-orange-600"
              >
                บันทึกข้อมูล
              </button>
            </div>
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
  image_system_bank: "",
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
    bank.value = {
      id: data.id,
      bank_name: data.bank_name, // ⬅ ค่า bank_name มาแล้ว
      account_name: data.account_name,
      account_number: data.account_number,
      description: data.description,
      image_system_bank: data.image_system_bank,
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
        image_system_bank: {
          id: 0,
          ref_id: 0,
          type: "",
          description: "",
        },
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
  "",
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

// ตัวแปรสำหรับเก็บธนาคารที่เลือก
const selectedBank = ref<string>();
const qr = ref<string>(
  "https://services-inw-me.lnw.co.th/qr/132/f6d6a5dea610f3bcf11b1db8f0d6ecaa.png?p=lnwshop&h=232584b0b5146183a62d0350400c51b3725714e6&c=https%3A%2F%2Flnwgo.com%2Fqr%2Fs%2F892682%3Fs%3D8a06c9d5"
);

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
