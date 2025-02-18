import { verify } from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  // ตรวจสอบว่า token มีหรือไม่
  const refToken = useStatefulCookie(`token`);
  
  // ถ้าไม่มี token ให้ไปที่หน้า login
  if (!refToken.value) {
    return navigateTo(`/login`);
  }

  // ถ้ามี token เช็คสถานะการเข้าสู่ระบบ
  try {
    await verify(); // เช็คการยืนยันตัวตนจากฟังก์ชัน verify()
  } catch (error) {
    // ถ้าเกิดข้อผิดพลาดจากการตรวจสอบ (เช่น token หมดอายุ) ให้ไปที่หน้า login
    return navigateTo(`/login`);
  }
});

// export default defineNuxtRouteMiddleware(async(to, from) => {
//     // เช็คหน้า ถ้า refresh แล้ว = หน้าเดิม
//     if (to.fullPath === from.fullPath){
//         return await verify()
//     }
//     const refToken = useStatefulCookie(token)
//     if (!refToken.value){
//         return navigateTo(/login)
//     }
// }) แก้ตรงไหน