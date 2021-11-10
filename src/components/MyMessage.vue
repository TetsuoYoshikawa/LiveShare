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
          <p>{{shareData.share.artist}}</p>
          <p>{{shareData.share.area}}</p>
          <p>{{shareData.share.date}}</p>
          <p>{{shareData.share.date}}</p>
        </div>
        <p class="text">{{ shareData.share.share}}</p>
        <div class="flex">
          <img class="icon" src="../assets/heart.png" @click="favorite(shareData)" />
          <p class="number">{{shareData.favorite.length}}</p>
          <img class="icon" src="../assets/cross.png" @click="deleteShare()" 
          v-if="favorite && comment && userProfile && want"/>
          <img class="icon detail" src="../assets/detail.png"     
           alt @click="$router.push({
          path:'/comment/'+ shareData.id,
          params:{id:shareData.id}})" 
          v-if="comment"/>
           <div>
            <p class="button"  v-if="shareData.want_id === 3">
              <img @click="want" v-if="shareData.want.length === null" class="icon" src="../assets/feather.png"/>行きたい
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
    favorite(shareData) {
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
    favorite(shareData){
      const result = this.shareData.favorite.some((value) => {
        return value.user_id == this.$store.state.user.id;
      });
      if(result){
        this.shareData.favorite.forEach((element) => {
          if(element.user_id == this.$store.state.user.id){
            axios
              .delete('http://127.0.0.1:8000/api/favorite',{
                data:{
                  share_id:this.shareData.id,
                  user_id:this.$store.state.user_id,
                },
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
          .post('http://127.0.0.1:8000/api/favorite',{
            share_id:this.shareData.id,
            user_id:this.$store.state.user_id,
          })
          .then((response) => {
            console.log(response);
            this.$router.go({
              path:this.$router.currentRoute.path,
              force:true,
            });
          });
      }
    },
    deleteShare() {
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
  created(){
    if(this.$router.name === "home"){
      this.path = false;
    }
    if(this.$router.name === "comment"){
      this.comment = false;
    }
  }
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
