<template>
  <div>
    <HeaderAuth />
    <div class="login">
      <div class="main">
        <div class="card devise-card">
          <div class="form-wrap">
            <div class="form-group text-center">
              <h2 class="mx-auto">Live Share</h2>
              <p class="text-secondary">友達とライブ情報をシェアしよう！</p>
            </div>
            <div class="form">
              <div class="form-group">
                <input class="form-control" placeholder="メールアドレス"  type="email" v-model="email">
              </div>
              <div class="form-group">
                <input class="form-control" placeholder="パスワード"  type="password" v-model="password">
              </div>
              <div class="actions">
                <button @click="login" class="btn">ログインする</button>
              </div>
            </div>
            <p class="devise-link">
              アカウントをお持ちですか？  
              <a @click="$route.push('/register')">サインインする</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderAuth from '../components/HeaderAuth.vue';
export default {
  data() {
    return {
      email:"",
      password:""
    };
  },
  components:{
    HeaderAuth
  },
  methods:{
    login(){
      this.$store.dispatch("login",{
        email:this.email,
        password:this.password
      });
    }
  }
}
</script>

<style scoped>
.login {
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
.card {
  background-color: white;
  margin: 0 auto;
  padding:30px;
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
.form-control {
  border: 1px solid #dcdfe6;
  font-size: inherit;
}
input {
  margin: 10px 0;
  padding:10px 150px 10px 5px;
}
button{
  padding:10px 125px ;
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
@media screen and (max-width: 768px) {
  .main {
    padding: 75px 0;
  }
  .devise-card {
    background-color: #fafafa;
  }
}
</style>
