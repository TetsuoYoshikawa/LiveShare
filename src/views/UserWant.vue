<template>
  <div>
    <Header/>
    <div class="want">
      <div class="flex">
        <div class="left">
          <SideNavi :id="id" />
        </div>
        <div class="right">
          <div class="title">
            <p>行きたいしたユーザー
            </p>
          </div>
          <div class="message" >
            <div class="flex">
              <img v-if="shares.image_url === null" src="../assets/profile.png" class="icon-profile">
              <img v-else :src="'https://tetsuoyoshikawa.s3.ap-northeast-3.amazonaws.com/' + shares.image_url" class="icon-profile">
              <h3 class="profile-name" @click="$router.push({
              path:'/userProfile/'+ shares.user_id,
              params:{id:shares.user_id}})">
              {{shares.name}}
              </h3>
            </div>
            <div class="flex share">
              <p>{{shares.share.artist}}</p>
              <p>{{shares.share.area}}</p>
              <p>{{shares.share.date}}</p>
              <p>{{shares.share.date}}</p>
            </div>
            <p class="text">{{ shares.share.share}}</p>
            <div class="flex-2">
              <div class="left-2 flex">
                <img class="icon" src="../assets/heart.png" @click="favorite()" alt />
                <p class="number"></p>
                <img class="icon" src="../assets/cross.png" @click="deleteShare()" alt v-if="path && profile" />
                <img class="icon detail" src="../assets/detail.png"     
                alt @click="$router.push({
                path:'/comment/'+ shares.share.id,
                params:{id:shares.share.id}})" />
              </div>
            </div>
          </div>
          <div class="message" v-for="shareData in shareData" :key="shareData.id" >
            <div class="flex">
              <img src="../assets/logo.png" class="icon-profile">
              <h3 class="profile-name" @click="$router.push({
              path:'/userProfile/'+ shareData.user_id,
              params:{id:shareData.user_id}})">
              {{shareData.user.name}}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import SideNavi from "../components/SideNavi";
import axios from "axios";
export default {
  data() {
    return {
      id:this.$store.state.user_id,
      content: "",
      data: "",
      shareData:[],
      shares:""
    };
  },
  methods: {
    async getUser() {
      await axios
        .get("http://127.0.0.1:8000/api/wants/" + this.$route.params.id)
        .then((response) => {
          this.shareData = response.data.data;
        });
    },
    async getShare() {
      await axios
        .get("http://127.0.0.1:8000/api/share/" + this.$route.params.id)
        .then((response) => {
          this.shares = response.data;
        });
    },
    deleteWant(shareData){
      axios
        .delete('http://127.0.0.1:8000/api/want',{
          data:{
            user_id:this.$store.state.user_id,
            share_id:shareData.share_id,
          }
        })
        .then((response) => {
          console.log(response);
          this.$router.go({
              path: this.$router.currentRoute.path,
              force: true,
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  created() {
    this.getUser();
    this.getShare();
  },
  components: {
    Header,
    SideNavi,
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
.icon-profile {
  width: 50px;
  height: 50px;
  margin-right: 20px;
  background-color: rgb(126, 126, 126);
  border-radius: 100%;
}
.profile-name {
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
  line-height:50px;
  cursor: pointer;
  color: white;
}
.message {
  padding: 20px;
  border-bottom: solid 1px white;
  border-left: solid 1px white;
  border-right: solid 1px white;
}
.flex {
  display: flex;
}
.flex-2 {
  display: flex;
  justify-content: space-between;
}
.icon {
  width: 25px;
  height: 25px;
  margin-right: 20px;
}
.icon-2 {
  width: 25px;
  height: 25px;
}
.profile-name {
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
  cursor: pointer;
  color: white;
}
.share {
  padding: 10px;
}
.share p {
  margin-right: 20px;
  color: #fff;
}
.text {
  margin-top: 10px;
  margin-right: 20px;
}
.left-2 {
  margin-top: 20px;
}
.detail {
  margin-left: 20px;
}
.button {
  width: 120px;
  height: 40px;
  text-align: center;
  color: #fff;
  background-color: #4b90ff;
  border-radius: 10px;
  display: block;
  margin: 20px 0 0 auto;
  cursor: pointer;
}
.button-2 {
  width: 120px;
  height: 40px;
  text-align: center;
  color: #fff;
  background-color: #ff754b;
  border-radius: 10px;
  display: block;
  margin: 20px 0 0 auto;
  cursor: pointer;
}
</style>
