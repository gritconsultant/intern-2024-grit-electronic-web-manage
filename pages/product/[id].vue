<template>
  <div class="p-1 w-ful">
    <div
      class="pages flex flex-col gap-2"
      v-for="(data, item) in products"
      :key="item"
    >
      <div class="flex gap-5">
        <!-- photo -->
        <div
          class="grid grid-cols-2 gap-2 rounded-[20px] place-content-center w-[180px] h-[180px] p-2 bg-[#412D3D]/50"
        >
          <img :src="data.img" alt="" class="photodetail" />
          <img :src="data.img" alt="" class="photodetail" />
          <img :src="data.img" alt="" class="photodetail" />
          <img :src="data.img" alt="" class="photodetail" />
        </div>
        <!-- detail -->
        <div class="flex flex-col gap-2 text-white font-blod">
          <h1 class="flex gap-[42px] text-[20px]">
            ชื่อ
            <div
              class="w-[250px] h-[35px] text-[12px] mt-[10px] text-wrap truncate"
            >
              qwertyuiopp[asddddfghjkldn klvsdkhf akdsjf sahlfhk sahfkjhskad
              hkhksdfadfasfsa]
            </div>
          </h1>
          <h2 class="flex gap-[15px]">
            ประเภท
            <div class="w-[250px] text-[12px] pt-[5px] truncate">1</div>
          </h2>
          <h2 class="flex gap-[34px]">
            ราคา
            <div class="w-[250px] text-[12px] pt-[5px] truncate">1</div>
          </h2>
          <div class="flex flex-col gap-1">
            <h3 class="flex gap-[10px]">
              สร้างเมื่อ
              <div class="w-[250px] text-[12px] pt-[5px] truncate">1</div>
            </h3>
            <h3 class="flex gap-[5px]">
              แก้ไขเมื่อ
              <div class="w-[250px] text-[12px] pt-[5px] truncate">1</div>
            </h3>
          </div>
        </div>
        <!-- amount -->
        <div
          class="flex flex-col justify-between gap-2 rounded-[20px] w-[180px] h-[180px] p-2 bg-[#412D3D]"
        >
          <h1 class="text-white font-bol text-center">สินค้าคงเหลือ</h1>
          <span
            class="flex justify-center items-center h-full text-[100px] font-bold pl-2 text-[#EAA04B]"
            >0
            <p class="mt-[60px] text-[10px]">ชิ้น</p></span
          >
        </div>
        <!-- star -->
        <div>
          <div
            class="flex flex-col gap-2 rounded-[20px] w-[350px] h-[180px] p-2 px-4 bg-[#EAA04B]"
          >
            <div class="flex gap-2 font-bold">
              <h1>จำนวนรวม</h1>
              0
            </div>
            <div class="flex flex-col text-[15px] gap-1 font-bold">
              <div class="flex gap-2">
                5
                <div class="bg-[#FFE7CA] h-full pl-2 rounded-full"></div>
              </div>
              <div class="flex gap-2">
                4
                <div class="bg-[#FFE7CA] h-full pl-2 rounded-full"></div>
              </div>
              <div class="flex gap-2">
                3
                <div class="bg-[#FFE7CA] h-full pl-2 rounded-full"></div>
              </div>
              <div class="flex gap-2">
                2
                <div class="bg-[#FFE7CA] h-full pl-2 rounded-full"></div>
              </div>
              <div class="flex gap-2">
                1
                <div class="bg-[#FFE7CA] h-full pl-2 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        <!-- profile -->
        <div class="flex flex-col gap-5">
          <div class="flex">
            <!-- bell -->
            <div class="ml-2">
              <i
                class="fa-solid fa-circle ml-[15px] mt-[4px] absolute p-[2px] text-center text-[6px] text-[#EC5B3D] bg-[#EC5B3D]/50 rounded-full"
              ></i>
              <i
                class="fa-solid fa-bell cursor-pointer text-3xl text-[#EAA04B]"
              ></i>
            </div>
            <div class="pl-[25px]">
              <div
                class="flex justify-center gap-2 h-[40px] w-[40px] rounded-full bg-[#B1737E]"
              >
                <i
                  class="fa-solid fa-user m-1 text-l rounded-full p-2 bg-white"
                ></i>
              </div>
            </div>
          </div>
          <div class="flex flex-col mt-[10px] gap-5 text-white">
            <button class="buttondelete h-[30px] w-[100px]">ซ่อน</button>
            <NuxtLink to="/product/edit/[id]">
              <button class="buttonedit h-[30px] w-[100px]">แก้ไขสินค้า</button>
            </NuxtLink>
          </div>
        </div>
      </div>
      <!-- detail -->
      <div class="h-[230px] p-2 rounded-[20px] bg-[#240E1F]/50">
        <h1 class="pl-2 text-[18px] text-white font-extrabold">
          รายละเอียดสินค้า
        </h1>
        <div class="flex textmain text-[15px] font-bold h-[180px] gap-2 px-2">
          <div class="p-2 w-4/6 h-full roundedmain bg-white">
            {{ data.detail }}
          </div>
          <div class="p-2 text-[13px] py-5 w-2/6 roundedmain bg-white">
            <div class="flex gap-1">
              <div class="flex pt-[7px]">
                <i class="fa-solid fa-circle text-[5px]"></i>
              </div>
              {{ data.Specs }}
            </div>
          </div>
        </div>
      </div>
      <hr class="rounded-[20px] my-2" />
      <!-- cardcomment -->
      <div class="flex justify-center items-center gap-5">
        <div class="flex justify-center items-center gap-2">
          <div
            class="h-[250px] w-[350px] rounded-[7px] rounded-t-[11px] bg-white"
          >
            <header
              class="flex justify-between rounded-[10px] px-2 text-white h-[50px] bg-[#1D89EA]"
            >
              <i
                class="fa-solid fa-comment-dots bg-[#3B414F] p-[3px] rounded-full text-white text-[8px] ml-[326px] mt-[2px] absolute cursor-pointer"
              ></i>

              <i
                class="fa-solid fa-trash-can bg-white text-center p-[3px] rounded-full w-[14px] text-[#EC5B3D] text-[8px] ml-[326px] mt-[34px] absolute cursor-pointer"
              ></i>
              <div class="flex flex-col gap-2 w-full">
                <b class="text-[12px]">John Do</b>
                <u class="text-[10px]">สร้างเมื่อ</u>
              </div>
              <div class="flex flex-col items-center w-full">
                <b>0</b>
                <div
                  class="flex justify-center items-center gap-1 w-[45px] rounded-[10px] text-[#D78D33]"
                >
                  <i class="fa-solid fa-star text-[12px]"></i>
                </div>
              </div>
            </header>
            <!-- photo -->
            <div class="p-2">
              <div class="flex justify-center items-center gap-2">
                <img
                  class="h-[70px] w-[70px] object-cover border-[1px] rounded-[10px] border-black"
                  :src="data.img"
                  alt=""
                />
                <img
                  class="h-[70px] w-[70px] object-cover border-[1px] rounded-[10px] border-black"
                  :src="data.img"
                  alt=""
                />
                <img
                  class="h-[70px] w-[70px] object-cover border-[1px] rounded-[10px] border-black"
                  :src="data.img"
                  alt=""
                />
                <img
                  class="h-[70px] w-[70px] object-cover border-[1px] rounded-[10px] border-black"
                  :src="data.img"
                  alt=""
                />
              </div>
            </div>
            <!-- comment -->
            <div
              class="text-[10px] font-semibold p-2 h-[114px] w-full rounded-[6px] bg-[#1D89EA]/50"
            >
              <div class="h-[102px] w-[335px] truncate text-wrap">
                {{ data.detail }}
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center items-center gap-2">
          <div
            class="h-[250px] w-[350px] rounded-[7px] rounded-t-[11px] bg-white"
          >
            <header
              class="flex justify-between rounded-[10px] px-2 text-white h-[50px] bg-[#1D89EA]"
            >
              <i
                class="fa-solid fa-comment-dots bg-[#3B414F] p-[3px] rounded-full text-white text-[8px] ml-[326px] mt-[2px] absolute cursor-pointer"
              ></i>

              <i
                class="fa-solid fa-trash-can bg-white text-center p-[3px] rounded-full w-[14px] text-[#EC5B3D] text-[8px] ml-[326px] mt-[34px] absolute cursor-pointer"
              ></i>
              <div class="flex flex-col gap-2 w-full">
                <b class="text-[12px]">John Do</b>
                <u class="text-[10px]">สร้างเมื่อ</u>
              </div>
              <div class="flex flex-col items-center w-full">
                <b>0</b>
                <div
                  class="flex justify-center items-center gap-1 w-[45px] rounded-[10px] text-[#D78D33]"
                >
                  <i class="fa-solid fa-star text-[12px]"></i>
                </div>
              </div>
            </header>
            <!-- photo -->
            <div class="p-2">
              <div class="flex justify-center items-center gap-2">
                <img
                  class="h-[70px] w-[70px] object-cover border-[1px] rounded-[10px] border-black"
                  :src="data.img"
                  alt=""
                />
                <img
                  class="h-[70px] w-[70px] object-cover border-[1px] rounded-[10px] border-black"
                  :src="data.img"
                  alt=""
                />
                <img
                  class="h-[70px] w-[70px] object-cover border-[1px] rounded-[10px] border-black"
                  :src="data.img"
                  alt=""
                />
                <img
                  class="h-[70px] w-[70px] object-cover border-[1px] rounded-[10px] border-black"
                  :src="data.img"
                  alt=""
                />
              </div>
            </div>
            <!-- comment -->
            <div
              class="text-[10px] font-semibold p-2 h-[114px] w-full rounded-[6px] bg-[#1D89EA]/50"
            >
              <div class="h-[102px] w-[335px] truncate text-wrap">
                {{ data.detail }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { data } from "autoprefixer";
import type { Product } from "~/models/product.model";

const products = ref<Product[]>([
  {
    id: 1,
    name: "โน๊ตบุ๊ค Asus TUF Gaming A16 FA608WV-QT069WF Jaeger Gray",
    detail:
      "Asus TUF Gaming A16 มีคุณสมบัติที่น่าประทับใจ มาพร้อมโปรเซสเซอร์ AMD Ryzen AI 9 HX 370 และNVIDIA GeForce RTX 40 Series จึงเล่นเกมล่าสุดหรือทำให้เวิร์กโฟลว์ของคุณลื่นไหล ไม่สะดุด",
    Specs:
      " CPU:AMD Ryzen AI 9 HX 370  Graphics:NVIDIA GeForce RTX 4060 Laptop RAM:16GB LPDDR5X SSD:c1TB NVMe PCIe 4.0 ",
    price: 1000,
    amount: 0,
    img: "https://media-cdn.bnn.in.th/425404/asus-tuf-gaming-a16-fa608wv-qt069wf-jaeger-gray-1.jpg",
  },
]);
</script>

<style></style>
