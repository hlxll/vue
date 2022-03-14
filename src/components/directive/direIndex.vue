<template>
  <!-- v-memo在3.2以上版本，v-memo="[valueA, valueB]"，valueA和valueB相同，就会对他自己和所有子节点跳过更新。
  虚拟DOM的创建也会跳过，空数组和v-once一样，场景很少，v-for长列表可以使用-->
  <div v-memo="[]"></div>
</template>