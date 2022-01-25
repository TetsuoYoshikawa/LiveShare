<template>
  <div>
    <div class="message" v-for="(shareData,index) in shares" :key="index">
      <div class="flex">
        <img v-if="shareData.image_url === null" src="../assets/profile.png" class="icon-profile">
        <img v-else :src="'https://tetsuoyoshikawa.s3.ap-northeast-3.amazonaws.com/' + shareData.image_url" class="icon-profile">
        <div>
          <h3 v-if="shareData.share.user_id === id" class="profile-name" @click="$router.push({
            path:'/profile',
            })">
            {{shareData.name}}
          </h3>
          <h3 v-else class="profile-name" @click="$router.push({
            path:'/userProfile/'+ shareData.share.user_id,
            params:{id:shareData.share.user_id}})">
            {{shareData.name}}
          </h3>
        </div>
      </div>
      <div class="flex share">
        <p>{{shareData.share.artist}}</p>
        <p>{{shareData.share.area}}</p>
        <p>{{shareData.share.date}}</p>
      </div>
      <p class="text">{{ shareData.share.share}}</p>
      <div class="flex-2">
        <div class="left flex">
          <img class="icon" src="../assets/heart.png" @click="favorite(index)" alt />
          <p class="text">{{ shareData.favorite.length}}</p>
          <img class="icon" src="../assets/cross.png" @click="deleteShare(shareData)" alt  v-if="shareData.share.user_id === $store.state.user_id"/>
          <img class="icon detail" src="../assets/detail.png" alt 
          @click="$router.push({
            path:'/comment/' + shareData.share.id,
            params:{id:shareData.share.id}})"
             />
        </div>
        <div class="right" >
          <div class="want" v-if="shareData.share.tag_id === 3 && shareData.share.user_id !== id">
            <p class="button-2" @click="deleteWant(index)" v-if="isWant(shareData.want)">
              <img class="icon-2" src="../assets/feather.png" />行きたい済
            </p>
            <p class="button" @click="want(index)"  v-else alt>
              <img class="icon-2" src="../assets/feather.png" />行きたい
            </p>
          </div>
        </div> 
      </div>
      <img class="image" :src="'https://tetsuoyoshikawa.s3.ap-northeast-3.amazonaws.com/' + shareData.share.image_url"
      v-if="shareData.share.image_url">
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id:this.$store.state.user_id,
      shares:[],
    };
  },
  methods: {
    favorite(index) {
      if(this.$store.state.auth == true){
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
      }else{
        alert('ログインしてください');
        this.$router.replace('/login');
      }
    },
    deleteShare(shareData) {
      axios
      .delete("https://nameless-everglades-38438.herokuapp.com/api/share/" + shareData.share.id)
      .then((response) => {
          console.log(response);
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: true,
          });
        });
    },
    deleteWant(index){
      if(this.$store.state.auth == true){
        this.shares[index].want.forEach((element) => {
          if(element.user_id == this.$store.state.user_id){
          axios
          .delete('https://nameless-everglades-38438.herokuapp.com/api/want',{
            data:{
              user_id:this.$store.state.user_id,
              share_id:this.shares[index].share.id,
            }
          })
            .then((response) => {
              console.log(response);
              this.$router.go({
                path: this.$router.currentRoute.path,
                force: true,
              })
            })
          }}
        )
      }else{
        alert('ログインしてください');
        this.$router.replace('/login');
      }
    },
    want(index){
      if(this.$store.state.auth == true){
        axios
        .post('https://nameless-everglades-38438.herokuapp.com/api/want',{
          user_id:this.$store.state.user_id,
          share_id:this.shares[index].share.id,
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
      }else{
        alert('ログインしてください');
        this.$router.replace('/login');
      }
    },
    async getShares(){
      let data = [];
      const shares = await axios
        .get('https://nameless-everglades-38438.herokuapp.com/api/share');
      for(let i = 0; i < shares.data.data.length; i++){
        await axios
          .get('https://nameless-everglades-38438.herokuapp.com/api/share/' + shares.data.data[i].id)
          .then((response) => {
            data.push(response.data);
          });
      }
      this.shares = data;
      console.log(this.shares);
    }
  },
  created(){
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
          return result
        }
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
.icon{
  width: 25px;
  height: 25px;
  margin-right: 20px;
  cursor: pointer;
}
.icon-profile {
  width: 50px;
  height: 50px;
  margin-right: 20px;
  background-color: rgb(126, 126, 126);
  border-radius: 100%;
}
.icon-2 {
  width: 25px;
  height: 25px;
  cursor: pointer;
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
.left {
  margin-top: 20px;
}
.detail {
  margin-left: 20px;
}
.right {
  margin-right: 100px;
}
.want {
  margin-left: 70%;
}
.image{
  height:200px;
  width:300px;
  margin-top: 30px;
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
@media screen and (max-width:400px){
  .want {
    margin-left: 80%;
  }
}
</style>
