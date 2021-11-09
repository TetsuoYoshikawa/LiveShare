<template>
<div>
  <Header />
  <div class="comment">
    <div class="flex">
      <div class="left">
        <SideNavi :id="id"/>
      </div>
      <div class="right">
        <div class="title">
          <p>コメント</p>
        </div>
        <Message :shareData="shareData" />
        <div class="comment-form">
          <div class="comment-title">
            <p>コメント</p> 
          </div>
          <div class="message" v-for="comment in comments" :key="comment.id">
            <div class="flex">
              <p class="name">{{comment.user.name}}</p>
            </div>
            <div>
              <p class="text">{{comment.content}}</p>
            </div>
          </div>
          <textarea v-model="content" type="text" ></textarea>
          <div @click="send">
            <button>コメント</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import SideNavi from "../components/SideNavi";
import Message from "../components/Message";
import Header from "../components/Header";
import axios from "axios";
export default {
  data() {
    return {
      comments:[],
      shareData:"",
      content: "",
      data: "",
      id:this.$store.state.user_id,
    };
  },
  methods: {
    async send() {
      await axios
        .post("https://127.0.0.1:8000/api/comment", {
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
    async comment() {
      await axios
        .get("http://127.0.0.1:8000/api/comment/" + this.id)
        .then((response) => {
          this.comments = response.data.data;
        });
    },
    async getShares() {
      await axios
        .get("http://127.0.0.1:8000/api/share/" + this.id)
        .then((response) => {
          this.shareData = response.data.data;
          if(this.share.want_id === 3){
            this.want = true;
          }else{
            this.want = false;
          }
        });
    },
  },
  created() {
    this.comment();
    this.getShares();
  },
  components: {
    SideNavi,
    Message,
    Header
  },
};
</script>

<style scoped>
.comment {
  padding-top: 20px;
}
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
.share-message {
  border-bottom: 1px solid white;
}
.comment-title {
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid white;
  border-left: 1px solid white;
  border-right: 1px solid white;
}
.comment-form input {
  width: 95%;
  height: 30px;
  margin-top: 20px;
  margin-bottom: 15px;
  margin-left: 10px;
  border-radius: 10px;
  border: 1px solid white;
  background-color: #15202b;
  color: white;
}
.message {
  padding-top: 10px;
  padding-left: 10px;
  padding-bottom: 10px;
  border-left: 1px solid white;
  border-right: 1px solid white;
  border-bottom: 1px solid white;
}
.comment-form textarea {
  width: 90%;
  height: 120px;
  margin-top: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  padding: 5px 10px;
  border: 1px solid white;
  resize: none;
  font-size: 18px;
}
button {
  width: 100px;
  text-align: center;
  padding: 10px;
  color: #fff;
  background-color: #4b90ff;
  border-radius: 10px;
  display: block;
  margin: 0 0 0 auto;
  cursor: pointer;
}
</style>
