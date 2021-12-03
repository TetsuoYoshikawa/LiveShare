<template>
  <div class="share">
    <p>ライブ情報をシェアしよう</p>
    <div class="form-control flex">
      <div class="share-artist flex">
        <input v-model="artist" placeholder="アーティスト名" />
      </div>
      <div class="share-area flex">
        <input v-model="area" placeholder="イベント会場/講演場所" />
      </div>
      <div class="share-date flex">
        <input v-model="date" type="date" value="2021-07-07">
      </div>
      <div class="share-want flex">
        <select class="share-select" v-model="tag_id">
          <option value="" hidden>How Do?</option>
          <option value="1">行ってきました！</option>
          <option value="2">行きます！</option>
          <option value="3">行きませんか？</option>
        </select>
      </div>
    </div>
    <textarea v-model="share"></textarea>
    <div class="flex-2">
      <label v-show="!uploadedImage" class="input-item__label">
        画像があればファイルを選択
        <input type="file" @change="onFileChange" accept="image/*"/>
      </label>
      <div class="preview-item">
        <img v-show="uploadedImage" class="preview-item-file" :src="uploadedImage" alt="" />
        <div v-show="uploadedImage" class="preview-item-btn" @click="remove"></div>
      </div>
      <div class="send" @click="send()">
        <button>シェアする</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      share: "",
      area: "",
      artist: "",
      date: "",
      tag_id: "",
      file:"",
      uploadedImage: '',
    };
  },
  methods: {
    onFileChange(e) {
      this.file = e.target.files[0];
      const reader = new FileReader();
      (reader.onload = e => {
        this.uploadedImage = e.target.result;
      });
      reader.readAsDataURL(e.target.files[0]);
    },
    remove() {
      this.uploadedImage = false;
    },
    send() {
      if(this.file){
        let data = new FormData();
        data.append("user_id", this.$store.state.user_id);
        data.append("share", this.share);
        data.append("area", this.area);
        data.append("artist", this.artist);
        data.append("date", this.date);
        data.append("image_url", this.file);
        data.append("tag_id", this.tag_id);
        axios
          .post("http://127.0.0.1:8000/api/share",data)
          .then((response) => {
            console.log(response);
            alert("シェアしました");
            this.share = "";
            //this.$router.go({
              //path: '/',
              //force: true,
            //})
          })
          .catch(error => {
          console.log(error);
          })
      }else{
        let data = new FormData();
        data.append("user_id", this.$store.state.user_id);
        data.append("share", this.share);
        data.append("area", this.area);
        data.append("artist", this.artist);
        data.append("date", this.date);
        data.append("tag_id", this.tag_id);
        axios
          .post("http://127.0.0.1:8000/api/shares",data)
          .then((response) => {
            console.log(response);
            alert("シェアしました");
            this.share = "";
            //this.$router.go({
              //path: '/',
              //force: true,
            //})
          })
          .catch(error => {
          console.log(error);
          })
      }
    }
  }
}
</script>


<style scoped>
.share {
  margin: 15px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid white;
}
.share p {
  color: white;
}
.flex {
  display: flex;
}
.flex-2 {
  display: flex;
  justify-content: space-between;
}
.share input {
  width: 85%;
  padding: 10px 5px;
  margin: 5px 0;
  margin-right: 20px;
  border-radius: 10px;
  border: 1px solid #dcdfe6;
  font-size: inherit;
}
.share-select {
  display: inline-block;
  cursor: pointer;
  border-radius: 10px;
  font-size: inherit;
}
.share textarea {
  width: 97%;
  height: 120px;
  margin-top: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  padding: 5px 10px;
  border: 1px solid white;
  resize: none;
  font-size: 18px;
}
label > input {
  display: none;
}
.preview-item-file{
  width:400px;
  height:500px;
}
input[type="file"] {
  opacity: 0;
  visibility: hidden;
  position: absolute;
}
label {
  padding: 20px 20px 10px 20px;
  padding-top: 12px;
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
  width: 100px;
  text-align: center;
  padding: 10px;
  color: #fff;
  background-color: #4b90ff;
  border-radius: 10px;
  display: block;
  cursor: pointer;
}
</style>
