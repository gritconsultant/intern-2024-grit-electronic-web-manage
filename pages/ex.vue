<template>
  <div>
    <pre>{{ dashboardcategory }}</pre>
  </div>
</template>

<script setup lang="ts">
import type { DashBoardCategory } from '~/models/report.model';
import service from '~/service';

const salesData = {
  อาหาร: 120,
  เครื่องดื่ม: 80,
  สมุนไพร: 150,
  ผ้าและเครื่องดื่ม: 60,
  ของใช้และของตกแต่ง: 90,
};

const dashboardcategory = ref<DashBoardCategory[]>([]);

const gerdashboardcategory = async () => {
  await service.report.getDashBoardCategory()
  .then((resp : any) => {
    const data = resp.data.data;
    console.log(data);

    for (let i = 0; i < data.length; i++){
      const c = data[i];
      const dashboard : DashBoardCategory = {
      category: c.category,
      total_category_sales: c.total_category_sales,
      }
      dashboardcategory.value.push(dashboard);
    }
  })
}


onMounted(async () => {
  await gerdashboardcategory();
});
</script>

<style scoped></style>
