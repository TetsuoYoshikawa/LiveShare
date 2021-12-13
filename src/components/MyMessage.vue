<template>
  <div>
    <div>
      <div class="message" v-for="shareData in shareData" :key="shareData.id">
        <div class="flex">
          <img v-if="shareData.user.image_url === null" src="../assets/profile.png" class="icon-profile">
          <img v-else :src="'https://tetsuoyoshikawa.s3.ap-northeast-3.amazonaws.com/' + shareData.user.image_url" class="icon-profile">
          <h3 class="profile-name" @click="$router.push({
          path:'/userProfile/'+ shareData.user_id,
          params:{id:shareData.user_id}})">
          {{shareData.user.name}}
          </h3>
        </div>
        <div class="flex share">
          <p>{{shareData.artist}}</p>
          <p>{{shareData.area}}</p>
          <p>{{shareData.date}}</p>
          <p>{{shareData.date}}</p>
        </div>
        <p class="text">{{ shareData.share}}</p>
        <div class="flex-2">
          <div class="left flex">
            <img class="icon" src="../assets/heart.png" @click="favorite()" alt />
            <p class="text">{{shareData.favorites.length}}</p>
            <img class="icon" src="../assets/cross.png" @click="deleteShare(shareData)" alt  />
            <img class="icon detail" src="../assets/detail.png"     
            alt @click="$router.push({
            path:'/comment/'+ shareData.id,
            params:{id:shareData.id}})" />
            <img class="icon" src="../assets/feather.png" 
            @click="$router.push({
            path:'/userWant/'+ shareData.id,
            params:{id:shareData.id}})"/>
            <p class="text">{{shareData.wants.length}}</p>
          </div>
          <div class="right" >
            <div class="want" v-if="shareData.tag_id === 3">
              <p class="button-2" @click="deleteWant(shareData)" v-if="isWant(shareData.wants)">
                <img class="icon-2" src="../assets/feather.png" />行きたい済
              </p>
              <p class="button" @click="want(shareData)"  v-else alt>
              <img class="icon-2" src="../assets/feather.png" />行きたい
              </p>
            </div>
          </div>
        </div>
        <img class="image" :src="'https://tetsuoyoshikawa.s3.ap-northeast-3.amazonaws.com/' + shareData.image_url"
      v-if="shareData.image_url">
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id:this.$store.state.user_id,
      shareData:""
    };
  },
  methods: {
    favorite(shareData) {
      if (shareData.user_id === this.$store.state.user_id) {
        axios
          .post('https://nameless-everglades-38438.herokuapp.com/api/favorite',{
            share_id:this.shareData.id,
            user_id:this.$store.state.user_id
          })
          .then((response) => {
            console.log(response);
            this.$router.go({
              path: this.$router.currentRoute.path,
              force: true,
            });
          })
      } else {
        axios
          .delete("https://nameless-everglades-38438.herokuapp.com/api/favorite", {
            data:{
              share_id:this.shareData.id,
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
    },
    deleteShare(shareData) {
      axios
      .delete("https://nameless-everglades-38438.herokuapp.com/api/share/" + shareData.id)
      .then((response) => {
          console.log(response);
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: true,
          });
        });
    },
    deleteWant(shareData){
      axios
        .delete('https://nameless-everglades-38438.herokuapp.com/api/want',{
          data:{
            user_id:this.$store.state.user_id,
            share_id:shareData.id,
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
    want(shareData){
      axios
        .post('https://nameless-everglades-38438.herokuapp.com/api/want',{
          user_id:this.$store.state.user_id,
          share_id:shareData.id,
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
        .get("https://nameless-everglades-38438.herokuapp.com/api/share/user/" + this.id)
        .then((response) => {
          this.shareData = response.data;
        });
    },
  },
  created(){
    if(this.$router.name === "home"){
      this.path = false;
    }
    if(this.$router.name === "comment"){
      this.comment = false;
    }
    this.getShares();
  },
  computed: {
    isWant() {
        return function(wants) {
        console.log(wants);
        if (wants.length === 0) {
          return false
        } else {
          const result = wants.some((want) => {
          return want.user_id === this.id
        }, this)
        return result}
      }
    }
  }
};
</script>

<style scoped>
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
.left {
  margin-top: 20px;
}
.detail {
  margin: 0 30px;
}
.image{
  margin-top: 30px;
  width:400px;
  height:500px;
}
.icon-profile {
  width: 50px;
  height: 50px;
  margin-right: 20px;
  background-color: rgb(126, 126, 126);
  border-radius: 100%;
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
