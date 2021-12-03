
   
<template>
<div>
  <Header />
  <div class="flex">
    <div class="left">
      <SideNavi :id="id"/>
    </div>
    <div class="right">
      <div class="title">
        <p>投稿画面</p>
      </div>
      <div>
        <ShareMessage :id="id"/>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import SideNavi from "../components/SideNavi";
import ShareMessage from "../components/ShareMessage";
import axios from "axios";
export default {
  data() {
    return {
      id:this.$store.state.user_id,
      content: "",
      data: "",
    };
  },
  methods: {
    send() {
      axios
        .post("http://127.0.0.1:8000/api/comment", {
          share_id: this.id,
          user_id: this.$store.state.user.id,
          content: this.content,
        })
        .then((response) => {
          console.log(response);
          this.content = "";
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: true,
          });
        });
    },
  },
  components: {
    Header,
    SideNavi,
    ShareMessage,
  },
};
</script>

<style scoped>
.left {
  position: fixed;
  top: 100px;
  left: 0;
  align-items: center;
  width: 22%;
  height: 100vh;
}
.right {
  position: absolute;
  top: 100px;
  right: 5%;
  width: 70%;
  height: 100vh;
  margin-top: 10px;
}
.flex {
  display: flex;
}
.title {
  border: 1px solid white;
  padding: 15px;
}
.title p {
  font-size: 20px;
  font-weight: bold;
}
</style>
