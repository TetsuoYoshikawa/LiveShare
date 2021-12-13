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
        <div class="profile" v-for="profile in profiles" :key="profile.id">
          <div class="flex">
              <img v-if="profile.image_url === null" src="../assets/profile.png" class="icon-profile">
              <img v-else :src="'https://tetsuoyoshikawa.s3.ap-northeast-3.amazonaws.com/' + profile.image_url" class="icon-profile">
            <h3 class="profile-name">{{ profile.name }}</h3>
          </div>
          <p class="text">{{ profile.content }}</p>
        </div>
        <MyMessage :shareData="shareData"/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import SideNavi from '../components/SideNavi.vue';
import MyMessage from '../components/MyMessage.vue';
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
       .get('https://nameless-everglades-38438.herokuapp.com/api/profile/'+ this.user_id)
       .then((response) => {
         this.profiles = response.data.data;
       })
    },
    async getShare(){
      await axios
        .get('https://nameless-everglades-38438.herokuapp.com/api/share/user/' + this.user_id)
        .then((response) => {
          this.shareData = response.data.data;
        })
    },
    mounted() {
      console.log('Individual mounted start!');
      this.$store.dispatch('follow/checkFollow', {
        auth_user: this.authUser.id,
        post_user:this.postUser.id
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
    MyMessage
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
