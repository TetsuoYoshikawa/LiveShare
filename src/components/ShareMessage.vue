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
        <select class="share-select" v-model="want_id">
          <option value="" hidden>How Do?</option>
          <option value="1">行ってきました！</option>
          <option value="2">行きます！</option>
          <option value="3">行きませんか？</option>
        </select>
      </div>
    </div>
    <textarea v-model="share"></textarea>
    <label >
      <input type="file"  @change="confirmImage" name="photo" accept="image/jpeg,image/gif,image/png" />
      <p>画像があればファイルを選択</p>
    </label>
    <div @click="send">
      <button>シェアする</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      share: "",
      area:"",
      artist:"",
      date:"",
      image_url:"",
      want_id:"",
    };
  },
  methods: {
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
    send() {
      let data = new FormData();
      data.append("user_id", this.$store.state.user.id);
      data.append("share", this.share);
      data.append("area", this.area);
      data.append("artist", this.artist);
      data.append("date", this.date);
      data.append("image_url", this.file);
      data.append("want_id", this.want_id);
      axios
        .post("http://127.0.01:8000/api/share", data)
        .then((response) => {
            console.log(response);
            alert("シェアしました");
            this.share = "";
            this.$router.go({
              path: this.$router.currentRoute.path,
              force: true,
            })
        })
        .catch(error => {
          console.log(error);
        })
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
input[type="file"] {
  opacity: 0;
  visibility: hidden;
  position: absolute;
}
label {
  padding: 20px 20px 10px 20px;
  padding-top: 12px;
  margin: 20px 0 0 20px;
  background: #cdcdce;
  color: #fff;
  display: inline-block;
  border-radius: 10px;
  cursor: pointer;
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
