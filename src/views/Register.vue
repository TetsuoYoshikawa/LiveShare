<template>
  <div>
    <HeaderAuth />
    <div class="register">
      <div class="main">
        <div class="card devise-card">
          <div class="form-wrap">
            <div class="form-group text-center">
              <h2 class="mx-auto">Live Share</h2>
              <p class="text-secondary">友達とライブ情報をシェアしよう！</p>
            </div>
            <div class="form">
              <div class="form-group">
                <input class="form-control" placeholder="メールアドレス" autocomplete="email" type="email" name="email"  v-model="email">
              </div>
              <div class="form-group">
                <input class="form-control" placeholder="ユーザーネーム" type="text" name="name"  v-model="name">
              </div>
              <div class="form-group">
                <input class="form-control" placeholder="パスワード" autocomplete="off" type="password" name="password"  v-model="password">
              </div>
                <button class="btn button" @click="register">登録する</button>
            </div>
            <p class="devise-link">
              アカウントをお持ちですか？
              <a @click="$router.push('/login')">サインインする</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderAuth from "../components/HeaderAuth.vue";
import axios from "axios";
export default {
  data(){
    return {
      name:"",
      email:"",
      password:""
    };
  },
  methods:{
    register(){
      axios
        .post('http://127.0.0.1:8000/api/register',{
          name:this.name,
          email:this.email,
          password:this.password,
        })
        .then((response) =>{
          console.log(response);
          this.$router.push('/login')
        })
        .catch(() => {
          alert("会員登録ができませんでした。お手数ですが再度お試しください");
        });
    }
  },
    components:{
    HeaderAuth,
  }
};
</script>


<style scoped>
.register {
  width:70%;
  margin: 20px auto;
  padding-top: 20px;
  display: block;
  flex: 1;
  text-align: center;
  flex-basis: auto;
  box-sizing: border-box;
  background-color: #dcdfe6;
}
.devise-card {
  border: none;
  width: 70%;
}
.form-wrap {
  max-width: 600px;
  width: 100%;
  margin: 100px auto;
}
.form-group h2 {
  margin: 20px auto;
  font-size: 50px;
  font-family: "Courier New", Courier, monospace;
}
.card {
  background-color: white;
  margin: 0 auto;
  padding:30px;
}
.form-control {
  border: 1px solid #dcdfe6;
  font-size: inherit;
}
input {
  margin: 10px 0;
  padding:10px 150px 10px 5px;
}
.button{
  padding:10px 125px ;
  margin:20px 0;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}
.devise-link {
  text-align: center;
  margin: 16px 0;
  color: black;
}
#wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
footer {
  margin-top: auto;
}
@media screen and (max-width: 768px) {
  .main {
    padding: 75px 0;
  }
  .devise-card {
    background-color: #fafafa;
  }
}
</style>
