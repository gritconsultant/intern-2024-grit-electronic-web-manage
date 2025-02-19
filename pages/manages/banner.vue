<template>
  <div class="defaultpages flex flex-col gap-4 p-6">
    <!-- Header Section -->
    <div
      class="flex items-center justify-between bg-white rounded-lg dropshadowbox p-5 h-[10%]"
    >
      <h1 class="text-2xl font-bold">แบนเนอร์</h1>

      <button
        @click="popupVisible = true"
        class="px-4 py-2 bg-orange-500 font-semibold rounded-md hover:bg-orange-700 hover:text-white transition"
      >
        เพิ่มรูปแบนเนอร์
      </button>
    </div>

    <!-- Content Section -->
    <div
      class="flex flex-col justify-between bg-white rounded-lg dropshadowbox w-full h-full p-5"
    >
      <!-- Image Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="w-full">
            <tr class="border-b-[2px] pb-[8px] pt-[8px] border-gray-400">
              <th class="px-4 py-2 text-left font-semibold text-gray-900">#</th>
              <th
                class="px-4 py-2 text-left font-semibold w-[80%] text-gray-900"
              >
                รูปภาพ
              </th>
              <th class="px-4 py-2 text-left font-semibold text-gray-900">
                จัดการ
              </th>
            </tr>
          </thead>
          <tbody v-if="!loading">
            <tr
              class="border-b"
              v-for="(banner, index) in banners"
              :key="index"
            >
              <td class="px-4 py-2">{{ banner.id }}</td>
              <td class="px-4 py-2 flex items-center justify-center">
                <img
                  :src="banner.banner"
                  alt="Preview"
                  class="w-[90%] h-[180px] object-cover rounded-md"
                />
              </td>
              <td class="px-4 py-2">
                <button
                  @click="confirmDeleteBanner(banner.id)"
                  class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  ลบ
                </button>
              </td>
            </tr>
          </tbody>
          <div v-else class="absolute left-[750px] top-[300px]">
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
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex justify-between items-center m-5">
        <div class="text-sm text-gray-600">
          <!-- แสดงข้อมูลจาก (หน้า) และจำนวนทั้งหมด -->
          แสดง {{ (currentPage - 1) * size + 1 }} ถึง
          {{ Math.min(currentPage * size, paginate.Total) }}
          จากทั้งหมด {{ paginate.Total }} รายการ
        </div>
        <div class="flex gap-2">
          <!-- ปุ่มก่อนหน้า -->
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
          >
            ก่อนหน้า
          </button>

          <span class="flex items-center px-2">หน้า {{ currentPage }}</span>

          <!-- ปุ่มถัดไป -->
          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage >= Math.ceil(paginate.Total / size)"
            class="px-3 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>

    <!-- Popup Addbanner -->
    <div
      v-if="popupVisible"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="w-[1000px] h-[400px] bg-white p-5 rounded shadow-lg">
        <h3 class="text-lg font-bold flex justify-center mb-2">
          เพิ่มรูปแบนเนอร์
        </h3>
        <div class="w-full h-[80%] flex flex-col gap-4">
          <div class="flex flex-col gap-5">
            <!-- Input field placed next to the image -->
            <input
              type="text"
              ref="fileInput"
              v-model="addbanner.banner"
              accept="image/*"
              class="mt-4 w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
              placeholder="กรุณาใส่ลิ้งรูป"
            />
          </div>
          <div
            class="w-full h-[200px] bg-gray-100 flex justify-center items-center rounded-lg dropshadiwbox"
          >
            <img
              v-if="addbanner.banner"
              :src="addbanner.banner"
              alt="Preview"
              class="w-full h-full rounded-lg object-cover place-content-center dropshadowbox"
            />
            <span v-else class="text-gray-500">
              <p>ไม่มีรูปที่เลือก</p>
              <p>ขนาดรูป</p>
            </span>
          </div>
        </div>
        <div class="flex justify-center">
          <button
            @click="confirmaddbanner"
            class="bg-blue-500 w-[60px] text-white p-2 rounded"
          >
            ยืนยัน
          </button>
          <button
            @click="popupVisible = false"
            class="ml-2 bg-gray-300 w-[60px] p-2 rounded"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import { ref } from "vue";
import {
  type AddBanner,
  type Banner,
  type ParamsBanner,
} from "~/models/report.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";

definePageMeta({
  middleware: "auth",
});

const store = useIndexStore();

const popupVisible = ref(false);

const banners = ref<Banner[]>([]);
const loading = ref(false);

const addbanner = ref<AddBanner>({
  banner: "",
});

const size = ref(3); // ทำให้เป็น ref
const currentPage = ref(1); // ตั้งค่า currentPage เริ่มต้นที่ 1
const paginate = ref<{ Total: number }>({ Total: 0 });

const getbanner = async () => {
  loading.value = true;

  const param: ParamsBanner = {
    page: currentPage.value, // ใช้ .value ในการเข้าถึง currentPage
    size: size.value, // ใช้ .value ในการเข้าถึง size
  };
  await service.report
    .getBanner(param)
    .then((resp: any) => {
      const data = resp.data.data;
      paginate.value = resp.data.paginate; // ตั้งค่าจำนวนทั้งหมดใหม่

      const bannerlist: Banner[] = data.map((b: any) => ({
        id: b.id,
        type: b.type,
        banner: b.banner,
        created_at: b.created_at,
      }));
      banners.value = bannerlist; // Vue จะทำการรีเรนเดอร์ข้อมูลในตารางให้ใหม่อัตโนมัติ
    })
    .catch((error: any) => {
      console.error("Error fetching order data:", error);
    })
    .finally(() => {
      loading.value = false;
    });
};

const adddbanner = async () => {
  await service.report
    .addBanner(addbanner.value)
    .then((resp: any) => {
      console.log(resp.data);
      const data = resp.data;
      const banner: Banner = {
        id: data.id,
        type: data.type,
        banner: data.banner,
        created_at: data.created_at,
      };
      banners.value.push(banner);
    })
    .finally(() => {
      // รีเฟรชข้อมูลหลังจากเพิ่มแบนเนอร์
      getbanner();
    });
};

const deletebanner = async (id: number) => {
  await service.report
    .deleteBanner(id)
    .then((resp: any) => {
      const data = resp.data;
      console.log(data);
    })
    .catch((erorr: any) => {
      console.log(erorr.respontse);
    })
    .finally(() => {
      getbanner();
    });
};

const confirmDeleteBanner = async (id: number) => {
  // Show the confirmation dialog
  const result = await Swal.fire({
    title: "คุณแน่ใจหรือไม่?", // ข้อความในกล่องยืนยัน
    text: "คุณต้องการลบรูปนี้หรือไม่?", // ข้อความเสริมในกล่อง
    icon: "warning", // ไอคอนเตือน
    showCancelButton: true, // แสดงปุ่มยกเลิก
    confirmButtonText: "ยืนยัน", // ข้อความปุ่มยืนยัน
    cancelButtonText: "ยกเลิก", // ข้อความปุ่มยกเลิก
  });

  // If the user confirms the deletion
  if (result.isConfirmed) {
    try {
      // Call the deleteCategory function to delete the category
      await deletebanner(id);

      // Show success message after deletion
      Swal.fire("ลบสำเร็จ!", "รูปนี้ได้ถูกลบแล้ว", "success");

      // รีโหลดข้อมูลใหม่หลังจากการลบแบนเนอร์
      window.location.reload(); // รีเฟรชทั้งหน้า
    } catch (error) {
      // If an error occurs during deletion, show error message
      Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถลบรูปนี้ได้", "error");
    }
  }
};

const confirmaddbanner = async () => {
  const result = await Swal.fire({
    title: "ยืนยันการเพิ่มแบนเนอร์?",
    text: "คุณแน่ใจหรือไม่ว่าต้องการเพิ่มแบนเนอร์นี้?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "ใช่, เพิ่มเลย!",
    cancelButtonText: "ยกเลิก",
  });

  if (result.isConfirmed) {
    try {
      await adddbanner(); // รอให้แบนเนอร์ถูกเพิ่มเสร็จ
      Swal.fire("สำเร็จ!", "แบนเนอร์ถูกเพิ่มเรียบร้อย", "success");
      popupVisible.value = false;

      // รีเซ็ตค่า addbanner หลังจากการเพิ่มสำเร็จ
      addbanner.value = { banner: "" };
      window.location.reload(); // รีเฟรชทั้งหน้า
    } catch (error) {
      // ถ้าเกิดข้อผิดพลาด `Swal.fire` ใน `adddbanner` จะถูกเรียก
    }
  }
};

// ฟังก์ชันที่ใช้ในการเปลี่ยนหน้า
const changePage = (pageNumber: number) => {
  const totalPages = Math.ceil(paginate.value.Total / size.value); // คำนวณจำนวนหน้าทั้งหมด
  if (pageNumber < 1 || pageNumber > totalPages) {
    return; // ถ้าหน้าเกินขอบเขตให้ไม่ทำอะไร
  }

  currentPage.value = pageNumber; // เปลี่ยนหน้า

  // ส่งค่า param สำหรับการเรียกข้อมูลใหม่
  const param: ParamsBanner = {
    page: currentPage.value,
    size: size.value,
  };

  getbanner(); // รีเฟรชข้อมูลเมื่อเปลี่ยนหน้า
};

onMounted(async () => {
  await getbanner();
});
</script>

<style scoped>
/* ทำให้ input type="file" ซ่อน */
input[type="file"] {
  display: none;
}
</style>
