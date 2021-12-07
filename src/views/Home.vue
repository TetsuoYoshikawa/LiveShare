<template>
  <div>
    <HeaderAuth />
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
import HeaderAuth from "../components/HeaderAuth.vue";
import SideNavi from "../components/SideNavi";
import Message from "../components/Message";
export default {
  data(){
    return {
      id:this.$store.state.user_id,
      shareData:"",
      userData:"",
    }
  },
  components: {
    HeaderAuth,
    SideNavi,
    Message
  },
};
</script>

<style scoped>
.flex {
  display: flex;
}
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
.title {
  border: 1px solid white;
  padding: 15px;
}
.title p {
  font-size: 20px;
  font-weight: bold;
}

</style>
