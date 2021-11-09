
   
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
            <img src="../assets/logo.png" class="profile-img">
            <label>
              <input type="file" name="photo" accept="image/jpeg,image/gif,image/png" @change="confirmImage"/>
              <p>ファイルを選択</p>
            </label>
            <p class="preview-item-name">{{ confirmedImage }}</p>
            <button @click="uploadImage" type="submit" name="commit" class="btn btn-primary">画像変更</button>
          </div>
          <div class="flex">
            <p class="profile-name">{{ user.name }}</p>
            <p class="following follow">フォロー:{{user.name}}</p>
            <p class="follower follow">フォロワー{{user.name}}</p>
          </div>
          <p class="text" v-if="user.content == null">まだプロフィールがありません</p>
          <p class="text">{{ user.content }}</p>
          <div class="form">
            <p>プロフィールの変更はこちらから</p>
            <div class="flex">
              <input class="input" type="text" v-model="content" />
              <button class="edit" @click="edit">変更する</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import SideNavi from "../components/SideNavi.vue";
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
    };
  },
  methods:{
    async getUser(){
      await axios
        .get('http://127.0.0.1:8000/api/profile/' + this.id)
        .then((response) => {
          this.userData = response.data.data;
        })
    },
    confirmImage(event) {
      this.message = "";
      this.file = event.target.files[0];
      if (!this.file.type.match("image.*")) {
        this.message = "画像ファイルを選択して下さい";
        this.confirmedImage = "";
        return;
      }
      this.createImage(this.file);
    },
    uploadImage() {
      let data = new FormData();
      data.append("image_url", this.file);
      axios
        .post("http://127.0.01:8000/api/profile/" + this.id, data)
        .then(response => {
          console.log(response);
          });
    },
    async edit(){
      await axios
        .put('http://127.0.0.1:8000/api/profile/' + this.id,{
          content:this.content,
        })
        .then((response) => {
          console.log(response);
        });
    },
    
  },
  created(){
    this.getUser();
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
}
.follow {
  padding-top: 15px;
  margin-right: 0%;
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
  color:white;
}
.form {
  padding-top: 20px;
  border-top: 1px solid white;
}
input[type="file"] {
  opacity: 0;
  visibility: hidden;
  position: absolute;
}
label {
  padding: 0 20px;
  padding-top: 12px;
  margin: 20px 0 0 20px;
  background: #cdcdce;
  color: #fff;
  display: inline-block;
  border-radius: 10px;
  cursor: pointer;
  cursor: pointer;
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
