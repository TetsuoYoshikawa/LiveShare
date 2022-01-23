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
          <div class="message">
            <div class="flex">
              <img v-if="shares.image_url === null" src="../assets/profile.png" class="icon-profile">
              <img v-else :src="'https://tetsuoyoshikawa.s3.ap-northeast-3.amazonaws.com/' + shares.image_url" class="icon-profile">
              <h3 class="profile-name" @click="$router.push({
              path:'/userProfile/'+ shares.share.user_id,
              params:{id:shares.share.user_id}})">
              {{shares.name}}
              </h3>
            </div>
            <div class="flex share">
              <p>{{shares.share.artist}}</p>
              <p>{{shares.share.area}}</p>
              <p>{{shares.share.date}}</p>
            </div>
            <p class="text">{{ shares.share.share}}</p>
            <div class="flex-2">
              <div class="left-2 flex">
                <img class="icon" src="../assets/heart.png" @click="favorite(shares)" alt />
                <p class="number"></p>
                <img class="icon" src="../assets/cross.png" @click="deleteShare(shares)" alt  />
              </div>
              <div class="right-2" >
                <div class="want" v-if="shares.share.tag_id === 3">
                  <p class="button-2" @click="deleteWant(shares)" v-if="isWant(shares.want)">
                    <img class="icon-2" src="../assets/feather.png" />行きたい済
                  </p>
                  <p class="button" @click="want(shares)"  v-else alt>
                    <img class="icon-2" src="../assets/feather.png" />行きたい
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="comment-form">
            <div class="comment-title">
              <p>コメント</p> 
            </div>
            <div class="message" v-for="comment in comments" :key="comment.id">
              <div class="flex user">
                <img v-if="comment.user.image_url === null" src="../assets/profile.png" class="icon-profile">
                <img v-else :src="'https://tetsuoyoshikawa.s3.ap-northeast-3.amazonaws.com/' + comment.user.image_url" class="icon-profile">
                <h3 class="profile-name">{{comment.user.name}}</h3>
              </div>
              <div>
                <p class="text">{{comment.content}}</p>
              </div>
            </div>
            <textarea v-model="content" type="text" ></textarea>
            <div @click="send()">
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
import Header from "../components/Header";
import axios from "axios";
export default {
  data() {
    return {
      comments:[],
      shares:[],
      content: "",
      data: "",
      id:this.$store.state.user_id,
    };
  },
  methods: {
    async send() {
      await axios
        .post("https://nameless-everglades-38438.herokuapp.com/api/comment", {
          share_id: this.$route.params.id,
          user_id: this.id,
          content: this.content,
        })
        .then((response) => {
          console.log(response);
          this.$router.replace("/");
        });
    },
    async comment() {
      await axios
        .get("https://nameless-everglades-38438.herokuapp.com/api/comment/" + this.$route.params.id)
        .then((response) => {
          this.comments = response.data.data;
        });
    },
    favorite(index) {
      const result = this.shares[index].favorite.some((value) => {
        return value.user_id == this.$store.state.user_id;
      });
      if(result){
        this.shares[index].favorite.forEach((element) => {
          if(element.user_id == this.$store.state.user_id){
            axios
              .delete("https://nameless-everglades-38438.herokuapp.com/api/favorite", {
                data:{
                  share_id:this.shares[index].share.id,
                  user_id:this.$store.state.user_id,
                }
              })
              .then((response) => {
                console.log(response);
                this.$router.go({
                  path: this.$router.currentRoute.path,
                  force: true,
                });
              });
          }
        });
      }else{
        axios
          .post('https://nameless-everglades-38438.herokuapp.com/api/favorite',{
            share_id:this.shares[index].share.id,
            user_id:this.$store.state.user_id
          })
          .then((response) => {
            console.log(response);
            this.$router.go({
              path: this.$router.currentRoute.path,
              force: true,
            });
          });
      }
    },
    deleteWant(shares){
        axios
        .delete('https://nameless-everglades-38438.herokuapp.com/api/want',{
          data:{
            user_id:this.$store.state.user_id,
            share_id:shares.share.id,
          }
        })
          .then((response) => {
            console.log(response);
            this.$router.go({
              path: this.$router.currentRoute.path,
              force: true,
            })
          })
    },
    want(shares){
      axios
        .post('https://nameless-everglades-38438.herokuapp.com/api/want',{
          user_id:this.$store.state.user_id,
          share_id:shares.share.id,
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
    async getShares() {
      await axios
        .get("https://nameless-everglades-38438.herokuapp.com/api/share/" + this.$route.params.id)
        .then((response) => {
          this.shares = response.data;
        });
    },
  },
  created() {
    this.comment();
    this.getShares();
  },
  computed: {
    isWant() {
        return function(want) {
        console.log(want);
        if (want.length === 0) {
          return false
        } else {
          const result = want.some((want) => {
          return want.user_id === this.id
        }, this)
        return result}
      }
    }
  },
  components: {
    SideNavi,
    Header
  },
};
</script>

<style scoped>
.comment {
  padding-top: 20px;
}
.flex {
  display: flex;
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
.title {
  border: 1px solid white;
  padding: 15px;
}
.title p {
  font-size: 20px;
  font-weight: bold;
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
.right-2 {
  margin-right: 100px;
}
.want {
  margin-left: 70%;
}
.detail {
  margin-left: 20px;
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
.user{
  margin:10px 0;
}
.icon {
  width: 25px;
  height: 25px;
  padding:0 10px;
}
.name{
  font-size: 20px;
  color:white;
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
