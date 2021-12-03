<template>
  <div class="header header-flex">
    <div class="header-left" @click="$router.push('/')">
      <h2>Live Share</h2>
    </div>
    <div class="header-right flex">
      <div class="nav-item item-color">
        <a class="btn btn-secondary" @click="$router.push('/share')">投稿する</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  padding: 20px;
  background-color: #19344e;
  position: fixed;
  z-index: 1;
  width: 100%;
}
.header-flex {
  display: flex;
  justify-content: space-between;
}
.header-left h2 {
  font-size: 30px;
  font-family: "Courier New", Courier, monospace;
  cursor: pointer;
  color: white;
}
.header-right {
  align-items: center;
  padding-right: 30px;
}
.nav-item {
  border: solid 1px #4b90ff;
  border-radius: 10px;
  padding: 10px 20px;
  margin-right: 20px;
  cursor: pointer;
}
.item-color {
  background-color: #4b90ff;
}
.btn-secondary {
  color: white;
}
</style>
