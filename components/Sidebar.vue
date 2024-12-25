<template>
  <div class="">
    <div class="bg-[#F7F1FD] p-[20px] w-[300px] h-full rounded-[20px]">
      <div>
        <NuxtLink to="/">
          <img
            class="object-cover"
            src="https://img2.pic.in.th/pic/logo_manage.png"
            alt=""
          />
        </NuxtLink>
      </div>
      <hr class="hr" />
      <div class="flex flex-col justify-between h-[700px]">
        <!-- menu -->
        <div class="grid grid-cols-1 gap-5 max-sm:hidden">
          <NuxtLink class="buttons w-full" to="/product">
            <div class="flex gap-2 ml-10">
              <i class="fa-solid fa-box-open mt-[6px]"></i>
              <p>สินค้า</p>
            </div>
          </NuxtLink>

          <NuxtLink class="buttons w-full" to="/product/order">
            <div class="flex gap-2 ml-10">
              <i class="fa-solid fa-cart-shopping mt-[3px]"></i>
              <p>คำสั่งซื้อ</p>
            </div>
          </NuxtLink>
          <button class="buttons w-full">
            <div class="flex gap-2 ml-10">
              <i class="fa-solid fa-circle-xmark mt-[3px]"></i>
              <p>คืนสินค้า</p>
            </div>
          </button>
          <button class="buttons w-full">
            <div class="flex gap-2 ml-10">
              <i class="fa-regular fa-comment-dots mt-[6px]"></i>
              <p>รีวิว</p>
            </div>
          </button>
          <button class="buttons w-full">
            <div class="flex gap-2 ml-10">
              <i class="fa-solid fa-square-poll-horizontal mt-[4px]"></i>
              <p>รายงานการขาย</p>
            </div>
          </button>
          <button class="buttons w-full">
            <div class="flex gap-2 ml-10">
              <i class="fa-solid fa-users mt-[5px]"></i>
              <p>รายละเอียด</p>
            </div>
          </button>
        </div>
        <!-- mobile -->
        <!-- <div class="hidden max-sm:block">
          mobile
        </div> -->
        <!-- profile -->
        <div class="flex   gap-2 bg-[#765798] rounded-[50px] h-[60px] p-1">
          <div
            class="flex justify-center items-center bg-white p-[20px] rounded-[50px]"
          >
            <i class="fa-solid fa-user-large text-[#765798]"></i>
          </div>
          <div class="flex flex-col gap w-2/3 px-2 text-white">
            <div class="header w-[140px] truncate">jhon edasdasd wweDo</div>
            <div class="flex justify-end">ตำแหน่ง</div>
          </div>
          <div class="flex items-center justify-end pr-[20px] text-[#452E5E]">
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
