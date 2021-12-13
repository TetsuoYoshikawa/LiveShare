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
        <div class="profile" v-for="user in userData" :key="user.id">
          <div class="flex-profile flex">
             <img v-if="user.image_url === null" src="../assets/profile.png" class="profile-img-null">
              <img v-else :src="'https://tetsuoyoshikawa.s3.ap-northeast-3.amazonaws.com/' + user.image_url" class="profile-img">
            <label v-show="!uploadedImage" class="input-item__label">
               画像があればファイルを選択
              <input type="file" @change="onFileChange" accept="image/*"/>
            </label>
            <div class="preview-item">
              <img v-show="uploadedImage" class="preview-item-file" :src="uploadedImage" alt="" />
              <div v-show="uploadedImage" class="preview-item-btn" @click="remove"></div>
            </div>
            <button @click="uploadImage()" class="btn btn-primary">画像変更</button>
          </div>
          <p class="text" v-if="user.content == null">まだプロフィールがありません</p>
          <p class="text">{{ user.content }}</p>
          <div class="form">
            <p>プロフィールの変更はこちらから</p>
            <div class="flex">
              <input class="input" type="text" v-model="content" />
              <button class="edit" @click="edit()">変更する</button>
            </div>
          </div>
        </div>
        <MyMessage />
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import SideNavi from "../components/SideNavi.vue";
import MyMessage from "../components/MyMessage.vue";
import axios from "axios";
export default {
  data() {
    return {
      id:this.$store.state.user_id,
      notProfile:true,
      userData:[],
      content: "",
      data: "",
      file: "",
      title: "",
      uploadedImage: '',
    };
  },
  methods:{
    async getUser(){
      await axios
        .get('https://nameless-everglades-38438.herokuapp.com/api/profile/' + this.id)
        .then((response) => {
          this.userData = response.data.data;
        })
    },
    onFileChange(e) {
      this.file = e.target.files[0];
      const reader = new FileReader();
      (reader.onload = e => {
        this.uploadedImage = e.target.result;
      }),
      reader.readAsDataURL(e.target.files[0]);
    },
    remove() {
      this.uploadedImage = false;
    },
    uploadImage() {
      const formData = new FormData();
      formData.append("image_url", this.file);
      formData.append("id", this.id);
      axios
        .post("https://nameless-everglades-38438.herokuapp.com/api/profile", formData)
        .then(response => {
          console.log(response);
          this.$router.go({
              path: this.$router.currentRoute.path,
              force: true,
            });
        });
    },
    async edit(){
      await axios
        .put('https://nameless-everglades-38438.herokuapp.com/api/profile/user/' + this.id,{
          content:this.content,
          id:this.id,
        })
        .then((response) => {
          console.log(response);
          this.$router.go({
              path: this.$router.currentRoute.path,
              force: true,
            });
        });
    },
    
  },
  created(){
    this.getUser();
  },
  components: {
    Header,
    SideNavi,
    MyMessage,
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
  color:white;
}
.profile {
  padding: 20px;
  border: solid 1px white;
}
.profile-img {
  width: 50px;
  height: 50px;
  background-color: rgb(126, 126, 126);
  border-radius: 100%;
}
.profile-img-null {
  width: 50px;
  height: 50px;
  background-color: rgb(126, 126, 126);
  border-radius: 100%;
}
.profile-name {
  font-size: 24px;
  padding: 10px 20px;
}
.follow {
  padding-top: 15px;
  margin-right: 0%;
}
.text {
  padding: 10px 0;
}
.form {
  padding-top: 20px;
  border-top: 1px solid white;
}
label > input {
  display: none;
}
input[type="file"] {
  opacity: 0;
  visibility: hidden;
  position: absolute;
}
label {
  padding: 10px 20px 10px 20px;
  margin-left:20px;
  line-height: 40px;
  background: #cdcdce;
  color: #fff;
  display: inline-block;
  border-radius: 10px;
  cursor: pointer;
}
label::after {
  content: "+";
  font-size: 1rem;
  color: #fff;
  padding-left: 1rem;
}
.input {
  width: 80%;
  padding: 10px 0 50px 0;
  margin-top: 20px;
  margin-bottom: 15px;
  margin-left: 10px;
  border-radius: 10px;
  border: 1px solid white;
  background-color: #19344e;
  color: white;
}
button {
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
.edit{
  margin:20px 20px;
}
</style>
