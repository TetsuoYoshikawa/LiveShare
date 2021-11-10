<template>
   <div>
    <div>
      <div class="message" v-for="shareData in shareData" :key="shareData.id">
        <div class="flex">
          <img src="../assets/logo.png" class="icon">
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
        <div class="flex">
          <img class="icon" src="../assets/heart.png" @click="fav(index)" alt />
          <p class="number"></p>
          <img class="icon" src="../assets/cross.png" @click="del(index)" alt v-if="path && profile" />
          <img class="icon detail" src="../assets/detail.png"     
           alt @click="$router.push({
          path:'/comment/'+ shareData.id,
          params:{id:shareData.id}})" />
          <div>
            <p class="button"  v-if="shareData.want_id === 3">
              <img @click="want" v-if="shareData.want.length == null" class="icon" src="../assets/feather.png"/>行きたい
              <img @click="want" 
              v-else class="icon" src="../assets/feather.png" />行きたい済
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    shareData:{
      "id":Number,
      "share":String,
      "artist":String,
      "area":String,
      "date":Date,
      "image_url":String,
      "want_id":Number,
      "user_id":Number,
    },
  },
  data() {
    return {
      path: true,
      profile: true,
      want:true,
    };
  },
  methods: {
    fav(shareData) {
      if (shareData.favorite.length === null) {
        axios
          .post('http://127.0.0.1:8000/api/favorite',{
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
          .delete("http://127.0.0.1:8000/api/favorite", {
            share_id:this.shareData.id,
            user_id:this.$store.state.user_id,
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
    del() {
      axios
      .delete("http://127.0.0.1:8000/api/share/" + this.shareData.id)
      .then((response) => {
          console.log(response);
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: true,
          });
        });
    },
    want(){
      if(shareData.want.length === null){
        axios
        .post('http://127.0.0.1:8000/api/want',{
          user_id:this.$store.state.user_id,
          share_id:this.shareData.id
        })
        .then((response) => {
          console.log(response);
          this.$router.go({
              path: this.$router.currentRoute.path,
              force: true,
          })
        })
        .catch((error) => {
          console.log(error);
          alert('行きたいができませんでした');
        })
      }else{
        axios
        .delete('http://127.0.0.1:8000/api/want',{
          data:{
            user_id:this.$store.state.user_id,
            share_id:this.shareData.id
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
      }
    }
  },
};
</script>

<style scoped>
.flex {
  display: flex;
}
.icon {
  width: 25px;
  height: 25px;
}
.detail {
  margin-left: 50px;
}
.message {
  padding: 20px;
  border-bottom: solid 1px white;
  border-left: solid 1px white;
  border-right: solid 1px white;
}
.profile-name {
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
  cursor: pointer;
  color:white;
}
.share {
  padding: 10px;
}
.share p{
  margin-right: 20px;
  color: #fff;
}
.text {
  margin-top: 10px;
}
.number {
  margin-left: 10px;
  margin-right: 10px;
}
.button {
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
