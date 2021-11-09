<template>
  <div>
    <Header />
    <div class="flex">
      <div class="left">
        <SideNavi :id="id"/>
      </div>
      <div class="right">
        <div class="title">
          <p>プロフィール</p>
        </div>
        <div class="profile" v-for="profile in profiles" :key="profile.name">
          <div class="flex">
            <img src="../assets/logo.png" class="profile-img">
            <h3 class="profile-name">{{ profile.name }}</h3>
            <div class="follow" @click="pushFollow" v-show="!followStatus">
              <button>フォローする</button>
            </div>
            <div class="unfollow" @click="deleteFollow" v-show="followStatus">
              <button>フォローを外す</button>
            </div>
          </div>
          <p class="text">{{ profile.content }}</p>
        </div>
        <Message :shareData="shareData"/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import SideNavi from '../components/SideNavi.vue';
import Message from '../components/Message.vue';
import axios from 'axios';
export default {
  data(){
    return{
      profiles:[],
      shareData:[],
      user_id:this.$route.params.id,
      id:this.$store.state.user_id,
    } 
  },
  methods:{
    getProfiles(){
      axios
       .get('http://127.0.0.1:8000/api/profile/'+ this.user_id)
       .then((response) => {
         this.profiles = response.data.data;
       })
    },
    async getShare(){
      await axios
        .get('http://127.0.0.1:8000/api/share/user/' + this.user_id)
        .then((response) => {
          this.shareData = response.data.data;
        })
    },
    async pushFollow(){
      await axios
      .post('http://127.0.0.1:8000/api/follow',{
        follower_id:this.user_id,
        following:this.id,
      })
      .then((response) => {
        console.log(response);
      });
    },
    async deleteFollow(){
      await axios 
      .post('http://127.0.0.1:8000/api/unfollow',{
        data:{
          follower_id:this.user_id,
          following_id:this.id,
        }
      })
      .then((response) => {
        console.log(response);
      })
    },
  },
  created(){
    this.getProfiles();
    this.getShare();
  },
  components:{
    Header,
    SideNavi,
    Message
  },
}
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
.profile {
  padding: 20px;
  border: solid 1px white;
}
.profile-img {
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 100%;
}
.profile-name {
  font-size: 24px;
  padding: 10px 20px;
  color:white;
}
.text {
  padding: 10px 0;
}
.title {
  border: 1px solid white;
  padding: 15px;
}
.title p {
  font-size: 20px;
  font-weight: bold;
}
.form {
  padding-top: 20px;
}
input {
  width: 80%;
  height: 30px;
  margin-top: 20px;
  margin-bottom: 15px;
  margin-left: 10px;
  border-radius: 10px;
  border: 1px solid white;
  background-color: #15202b;
  color: white;
}
button {
  width: 100px;
  height: 40px;
  text-align: center;
  color: #fff;
  background-color: #4b90ff;
  border-radius: 10px;
  display: block;
  margin: 20px 0 0 auto;
  cursor: pointer;
}
</style>
