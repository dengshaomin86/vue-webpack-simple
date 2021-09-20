<template>
  <div>
    <h1>{{ title }}</h1>
    <div>
      <img src="@/assets/images/01.jpeg" />
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      title: "HelloWorld",
    };
  },
};
</script>

<style lang="less" scoped>
h1 {
  color: green;
}
</style>
