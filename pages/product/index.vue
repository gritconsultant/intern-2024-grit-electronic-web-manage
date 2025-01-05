<template>
  <div class="p-2 w-full">
    <div class="pages">
      <!-- Header -->
      <div class="flex justify-between gap-2">
        <!-- Search -->
        <div>
          <div
            class="flex justify-center items-center rounded-[100px] h-[40px] bg-white hover:bg-[#765798]/50 w-[60px] absolute cursor-pointer"
          >
            <i class="fa-solid fa-magnifying-glass text-[20px]"></i>
          </div>
          <input
            type="text"
            class="w-[900px] h-[40px] rounded-full pl-[70px] pr-[20px] border-none outline-none bg-white/50 text-white placeholder-white"
            placeholder="พิมชื่อสินค้าที่ต้องการค้นหา"
          />
        </div>
        <div class="flex gap-2">
          <i
            class="fa-solid fa-bell cursor-pointer text-4xl text-[#EAA04B]"
          ></i>
          <div class="w-[150px] h-[40px] rounded-full bg-[#B1737E]">
            <div class="flex gap-2">
              <i
                class="fa-solid fa-user m-1 text-l rounded-full p-2 bg-white"
              ></i>
              <div class="flex flex-col">
                <h1 class="font-bold w-[80px]">john do</h1>
                <p class="text-[10px] flex justify-end">ตำแหน่ง</p>
              </div>
              <i
                class="fa-solid fa-ellipsis-vertical flex justify-center items-center cursor-pointer"
              ></i>
            </div>
          </div>
        </div>
      </div>
      <hr
        class="mt-[30px] mb-[15px] border-[#2B1E28] border-[2px] rounded-full"
      />
      <!-- Body -->
      <div>
        <div class="flex gap-2">
          <!-- selector -->
          <div
            class="flex gap-2 justify-center rounded-full p-2 w-[140px] cursor-pointer drop-shadow-lg text-white bg-[#2B1E28]"
          >
            <i class="fa-solid fa-filter mt-[5px]"></i>
            <div>คอมพิวเตอร์</div>
          </div>
          <!-- addproduct -->
          <div
            class="flex justify-center items-center w-[40px] rounded-full drop-shadow-lg cursor-pointer bg-[#B1737E]"
          >
            <i class="fa-solid fa-plus text-[30px]"></i>
          </div>
        </div>
        <!-- Caedproduct -->
        <div
          class="flex justify-center gap-3 mt-[20px] px-[20px] drop-shadow-lg"
        >
          <div
            class="flex flex-col justify-between w-[200px] h-[270px] rounded-[20px] bg-white"
          >
            <div class="p-1">
              <!-- HeaderCard -->
              <div class="flex justify-between">
                <div class="flex gap-2 px-2">
                  <h1 class="textmain text-[12px] font-bold">ประเภท</h1>
                  <h1 class="textmain text-[12px] font-bold">|</h1>
                  <div
                    class="flex justify-center items-center gap-1 w-[45px] rounded-[10px] text-[#D78D33] bg-[#FFE7CA]"
                  >
                    <i class="fa-solid fa-star text-[12px]"></i>
                    <p
                      class="flex items-center mt-[2px] text-[13px] font-bold h-[10px]"
                    >
                      0
                    </p>
                  </div>
                </div>
                <i
                  class="fa-solid fa-trash-can text-[#EC5B3D] flex items-center text-[12px] mt-[2px] pr-[5px]"
                ></i>
              </div>
              <hr class="my-[3px] mx-[4px] border-[#2B1E28] rounded-full" />
              <!-- Photo -->
              <div class="flex items-center place-content-center h-full">
                <img
                  class="border-black border-[1px] drop-shadow-lg w-[130px] object-cover"
                  src="https://media-cdn.bnn.in.th/425404/asus-tuf-gaming-a16-fa608wv-qt069wf-jaeger-gray-1-square_medium.jpg"
                  alt=""
                />
              </div>
            </div>
            <div
              class="flex flex-col items-center gap-[3px] h-[80px] rounded-[20px] p-1 px-2 bg-[#EAA04B]"
            >
              <h1
                class="text-center h-[20px] textmain font-bold text-[7px] text-wrap truncate"
              >
                โน๊ตบุ๊ค Asus TUF Gaming A16 FA608WV-QT069WF Jaeger Gray
              </h1>
              <div
                class="text-center rounded-[50px] text-[10px] font-bold w-[80px] text-[#EAA04B] bg-[#2B1E28]"
              >
                ยอดคงเหลือ
              </div>
              <div class="pl-3">
                <span class="textmain font-bold text-[22px]">150</span>
                <span
                  class="textmain font-bold text-center text-[7px] text-gray-400"
                >
                  ชิ้น
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import type { Product } from "~/models/product.model";

// const products = ref<Product[]>([
//   {
//     id: 1,
//     name: "AULA",
//     detail:
//       "Wried Mechanical KEYBOARDbgfnfdgdfsbsdfhsdfhfsdhhdsfhdfdfsfhdfdcxzcxzcf ",
//     price: 1000,
//     amount: 0,
//     img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
//   },
//   {
//     id: 2,
//     name: "AULA",
//     detail: "Wried Mechanical KEYBOARD ",
//     price: 2000,
//     amount: 3,
//     img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
//   },
//   {
//     id: 3,
//     name: "AULA",
//     detail: "Wried Mechanical KEYBOARD ",
//     price: 3000,
//     amount: 10,
//     img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
//   },
//   {
//     id: 4,
//     name: "AULA",
//     detail: "Wried Mechanical KEYBOARD ",
//     price: 4000,
//     amount: 20,
//     img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
//   },
//   {
//     id: 1,
//     name: "AULA",
//     detail:
//       "Wried Mechanical KEYBOARDbgfnfdgdfsbsdfhsdfhfsdhhdsfhdfdfsfhdfdcxzcxzcf ",
//     price: 1000,
//     amount: 0,
//     img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
//   },
//   {
//     id: 2,
//     name: "AULA",
//     detail: "Wried Mechanical KEYBOARD ",
//     price: 2000,
//     amount: 3,
//     img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
//   },
//   {
//     id: 3,
//     name: "AULA",
//     detail: "Wried Mechanical KEYBOARD ",
//     price: 3000,
//     amount: 10,
//     img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
//   },
//   {
//     id: 4,
//     name: "AULA",
//     detail: "Wried Mechanical KEYBOARD ",
//     price: 4000,
//     amount: 20,
//     img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
//   },
// ]);
</script>

<style></style>
