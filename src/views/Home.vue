<template>
<div>
  <Header />
  <div class="flex">
    <div class="left">
      <SideNavi :id="id"/>
    </div>
    <div class="right">
      <div class="title">
        <p>ホーム</p>
      </div>
      <Message :shareData="shareData"/>
    </div>
  </div>
</div>
</template>

<script>
import Header from "../components/Header.vue";
import SideNavi from "../components/SideNavi";
import Message from "../components/Message";
import axios from "axios";
export default {
  data(){
    return {
      id:this.$store.state.user_id,
      shareData:"",
      userData:"",
    }
  },
  components: {
    Header,
    SideNavi,
    Message
  },
  methods:{
    async getShare (){
      await axios
        .get('http://127.0.0.1:8000/api/share')
        .then((response) => {
          this.shareData = response.data.data;
        })
    },
    async getUser(){
      await axios
        .get('http://127.0.0.1:8000/api/profile/')
        .then((response) => {
          this.userData = response.data.data;
        })
    }
  },
  created(){
    this.getShare();
    this.getUser();
  }
};
</script>

<style scoped>
.left {
  position: fixed;
  top: 100px;
  left: 0;
  align-items: center;
  width: 22%;
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
