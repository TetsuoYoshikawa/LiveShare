<template>
  <div>
    <div class="left-padding">
      <img class="logo" src="../assets/logo.png" />
      <div class="flex icon-field" @click="$router.push('/')">
        <img class="icon" src="../assets/home.png" />
        <p>ホーム</p>
      </div>
      <div class="flex icon-field" @click="$router.push({
          path:'/profile/'+ id,
          params:{id:id}})">
        <img class="icon" src="../assets/profile.png" />
        <p>プロフィール</p>
      </div>
      <div class="flex icon-field" @click="$router.push({
          path:'/favorite/'+ id,
          params:{id:id}})">
        <img class="icon" src="../assets/heart.png" />
        <p>いいねを見る</p>
      </div>
      <div class="flex icon-field" @click="$router.push({
          path:'/want/'+ id,
          params:{id:id}})">
        <img class="icon" src="../assets/feather.png" />
        <p>行きたいを見る</p>
      </div>
      <div class="flex icon-field" @click="logout">
        <img class="icon" src="../assets/logout.png" />
        <p>ログアウト</p>
      </div>
    </div>
  </div>
</template>

<script>
import router from 'vue-router';
export default {
  data() {
    return {
      content: "",
      data: "",
      id:this.$store.state.user_id
    };
  },
  props: {
    userData:{
      "id":Number,
      "name":String,
      "email":String,
      "content":String,
      "image_url":String,
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      router.replace("/login");
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
.flex {
  display: flex;
}
.logo {
  width: 100px;
}
.icon-field {
  margin-top: 30px;
  cursor: pointer;
  color: white;
}
.icon {
  width: 25px;
}
.icon-field p {
  font-size: 16px;
  padding-left: 15px;
  padding-top: 5px;
}
</style>
