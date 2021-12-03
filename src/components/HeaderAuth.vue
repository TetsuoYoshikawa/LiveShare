<template>
  <div class="header header-flex">
    <div class="left" @click="$router.push('/')">
      <h2>Live Share</h2>
    </div>
    <div class="right header-flex">
      <div class="nav-item item-1">
        <a class="btn btn-secondary" @click="$router.push('/register')">会員登録</a>
      </div>
      <div class="nav-item item-2">
        <a class="btn btn-outline-info" @click="$router.push('/login')">ログイン</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  background-color: #19344e;
  position: fixed;
  top: 0;
  padding: 20px;
  z-index: 1;
  width: 100%;
}
.header-flex {
  display: flex;
  justify-content: space-between;
}
.header h2 {
  font-size: 30px;
  font-family: "Courier New", Courier, monospace;
  cursor: pointer;
  color: white;
}
.right {
  margin-right: 20px;
}
.nav-item {
  border: solid 1px #4b90ff;
  border-radius: 10px;
  padding: 10px 20px;
  margin-right: 20px;
  cursor: pointer;
}
.item-1 {
  background-color: #4b90ff;
}
.item-2 {
  background-color: white;
}
.btn-secondary {
  color: white;
}
.btn-outline-info {
  color: #4b90ff;
}
</style>
