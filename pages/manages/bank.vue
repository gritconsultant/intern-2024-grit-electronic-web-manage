<template>
  <div class="defaultpages flex flex-col gap-3 p-3">
    <div class="flex items-center justify-between h-[5%] pl-[35px]">
      <h1 class="text-[25px] font-bold">ธนาคาร</h1>
    </div>
    <div class="flex justify-center h-full">
      <div
        class="w-[70%] h-full flex flex-col justify-center rounded-[5px] bg-white dropshadowbox p-5"
      >
        <!-- Preview image -->
        <div class="flex justify-center items-center w-full h-[50%] mt-5">
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
          <div class="flex items-end h-full">
            <div class="flex flex-col pl-8">
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
        <div class="text-[20px] font-bold mt-3 flex justify-center pr-[330px]">
          คิวอาร์โค้ด
        </div>
        <div
          class="w-full h-[45%] p-8 px-[100px] flex flex-col justify-between items-center"
        >
          <div class="flex flex-col gap-5 w-[70%] h-[70%] mr-[80px]">
            <div class="flex flex-col gap-2">
              <div class="flex gap-3">
                <span class="text-[20px] font-bold">ชื่อธนาคาร:</span>
                <div class="flex items-end">{{ selectedBank }}</div>
              </div>
              <select
                v-model="selectedBank"
                @change="onBankChange"
                class="bg-orange-200 rounded-[5px] w-[400px] text-center"
              >
                <option v-for="bank in banks" :key="bank" :value="bank">
                  {{ bank }}
                </option>
                <option value="อื่นๆ">อื่นๆ</option>
              </select>
              <div v-if="selectedBank === 'อื่นๆ'" class="flex gap-2">
                <input
                  type="text"
                  v-model="otherBank"
                  placeholder="กรอกชื่อธนาคาร"
                  class="bg-white dropshadowbottomsub w-[350px] rounded-[5px] px-2"
                />
                <button
                  @click="confirmBank"
                  class="h-[30px] w-[100px] bg-green-500 text-white rounded-[5px] hover:bg-green-600"
                >
                  ยืนยัน
                </button>
              </div>
            </div>

            <!-- Dynamically show Bank Number label based on selected bank -->
            <div class="flex h-[30px] gap-2">
              <span class="w-[25%] bg-slate-50 text-[20px] font-bold"
                >หมายเลขธนาคาร</span
              >
              <!-- Bind dynamic bank number -->
              <input
                v-model="bankNumber"
                type="text"
                class="bg-gray-200 dropshadowbottomsub w-[230px] rounded-[5px] px-2"
              />
            </div>
            <div class="flex h-[30px] gap-2">
              <span class="w-[25%] text-[20px] font-bold">ชื่อบัญชี</span>
              <!-- Bind dynamic account name -->
              <input
                v-model="accountName"
                type="text"
                class="bg-gray-200 dropshadowbottomsub w-[230px] rounded-[5px] px-2"
              />
            </div>
          </div>
          <div class="flex justify-center w-[300px] mr-[305px]">
            <button
              @click="saveData"
              class="p-2 rounded-[5px] font-semibold bg-orange-500 w-[200px]"
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

// ตัวแปรเก็บธนาคารทั้งหมด
const banks = ref([
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
</script>

<style scoped></style>
