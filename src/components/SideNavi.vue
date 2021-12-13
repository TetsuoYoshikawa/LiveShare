<template>
  <div>
    <div class="left-padding">
      <h2 class="logo">MENU</h2>
      <div class="flex icon-field" @click="$router.push('/')">
        <img class="icon" src="../assets/home.png" />
        <p>ホーム</p>
      </div>
      <div class="flex icon-field" @click="$router.push({
          path:'/profile'})">
        <img class="icon" src="../assets/profile.png" />
        <p>プロフィール</p>
      </div>
      <div class="flex icon-field" @click="$router.push({
          path:'/favorite'})">
        <img class="icon" src="../assets/heart.png" />
        <p>いいね</p>
      </div>
      <div class="flex icon-field" @click="$router.push({
          path:'/want'})">
        <img class="icon" src="../assets/feather.png" />
        <p>行きたい</p>
      </div>
      <div class="flex icon-field" @click="logout">
        <img class="icon" src="../assets/logout.png" />
        <p>ログアウト</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      data: "",
      id:this.$store.state.user_id
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace("/login");
    },
  },
};
</script>


<style scoped>
.left-padding {
  margin: 20px;
  border: solid 1px white;
  background-color: #15202b;
  border-radius: 20px;
  padding: 20px;
}
.logo {
  font-size: 35px;
  font-family: "Courier New", Courier, monospace;
  cursor: pointer;
  color: white;
}
.flex {
  display: flex;
}
.icon-field {
  margin-top: 30px;
  cursor: pointer;
  color: white;
}
.icon-field p {
  font-size: 16px;
  padding-left: 15px;
  padding-top: 5px;
}
.icon {
  width: 25px;
}
@media screen and (max-width: 1000px) {
  .icon-field {
    text-align: center;
  }
  .flex {
    display: block;
  }
  .logo {
    display: none;
  }
  .icon-field p {
    display: none;
  }
  .icon {
    width: 50px;
  }
}
</style>
