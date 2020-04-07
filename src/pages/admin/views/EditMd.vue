<template>
  <el-main>
    <el-row style="margin-block-end: 20px;">
      <el-col :span="12">
        <el-input v-model="editArticle.title"
                  maxlength="30"
                  show-word-limit
                  placeholder="请输入文章标题">
        </el-input>
      </el-col>
      <el-col style="padding-left: 120px" :span="12" :gutter="50">
        <el-button v-if="!isUpdate" type="info" v-on:click="saveDraft()">存为草稿</el-button>
        <el-button v-if="!isUpdate" type="success" v-on:click="submitButton()">提交</el-button>
        <el-button v-if="isUpdate" type="success" v-on:click="updateData()">更新文章</el-button>
      </el-col>
    </el-row>

    <!-- 点击提交按钮后触发 -->
    <el-dialog title="发布文章" :visible.sync="dialogTableVisible" width="500px">
      <div class="form-tag-box">
        <div class="form-entry-label" style="margin-block-end: 1em;">文章头图：</div>

        <el-upload
          :action="common.API_URL + '/admin/uploadImg'"
          name="image-file"
          :limit="1"
          list-type="picture-card"
          :before-upload="uploadProgress"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :multiple="false"
          :with-credentials="true"
          :on-preview="handlePreviewDialog"
          :on-exceed="handleExceed"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>

      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit()" :disabled="uploadStatus">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="imgPreview.name" :visible.sync="imgPreviewDialog" width="60%">
      <img :src="imgPreview.url" alt="" width="100%">
    </el-dialog>
    <mavonEditor ref=md v-model="editArticle.content" @change="editChange" @imgAdd="imgAdd" @imgDel="imgDel"/>

  </el-main>
</template>

<script>
  import axios from 'axios'
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

  export default {
    name: "EditMd",
    components: {
      mavonEditor
    },
    props: {
      id: String
    },
    data() {
      return {
        // 关于文章数据
        title: '',
        text_md: '',
        text_text: '',
        imgUrl: '',

        // 如果有数据则为编辑状态
        editArticle: {
          id: '',
          content: '',
          title: '',
          imgUrl: ''
        },

        // 上传时数据
        uploadImageName: '',
        imgPreview: {
          name: '',
          url: ''
        },

        // 各种组件的隐藏状态
        imgPreviewDialog: false,
        submitStatus: false,
        uploadStatus: false,
        dialogVisible: false,
        dialogTableVisible: false,

        // 是编辑状态
        isUpdate: false
      }
    },
    methods: {
      // 存储草稿
      saveDraft() {
        // 待定

      },
      //提交数据
      submitButton() {
        this.dialogTableVisible = true;
      },
      submit() {
        this.dialogTableVisible = false;
        this.submitStatus = true;

        axios.post("/article", {
          title: this.editArticle.title,
          content: this.editArticle.content,
          imgUrl: this.imgUrl
        })
          .then((resp) => {
            if (resp.data.flag) {
              this.$message.success({
                message: '文章发表成功'
              });
              // todo 转跳文章管理
            } else {
              this.$message.error({
                message: resp.data.message
              });
            }
          })
          .finally(() => {
            this.submitStatus = false;
          })
      },
      updateData() {
        this.dialogTableVisible = false;
        this.submitStatus = true;

        axios.put("/article", this.editArticle)
          .then((resp) => {
            if (resp.data.flag) {
              this.$message.success({
                message: '文章更新成功'
              });
              // todo 转跳文章管理
            } else {
              this.$message.error({
                message: resp.data.message
              });
            }
          })
          .finally(() => {
            this.submitStatus = false;
          })
      },
      handleRemove() {
        // 需要删除对应图片
        axios.delete("/admin/deleteImg/" + this.uploadImageName)
          .then((resp) => {
            if (resp.data.flag) {
              this.$message.success({
                message: '文件删除成功'
              });
            } else {
              this.$message.error({
                message: '文件删除失败？？'
              });
            }
          })
      },
      handleExceed() {
        this.$message.error({
          message: '只能设置一张头图哦。。。'
        });
      },
      handlePreviewDialog(file) {
        this.imgPreviewDialog = true;
        this.imgPreview.name = file.name;
        this.imgPreview.url = file.url;
      },
      // 文件上传中
      uploadProgress() {
        this.uploadStatus = true;
        this.$message({
          message: '上传中，请稍后...'
        });
      },
      // 文件上传成功
      uploadSuccess(response) {
        this.uploadStatus = false;
        if (response.flag) {
          this.$message.success({
            message: '文件上传成功'
          });
          this.uploadImageName = response.data.fileName;
          this.imgUrl = response.data.url;
        } else {
          this.$message.error({
            message: '文件上传时发生错误'
          });
        }

      },
      // 文件上传失败
      uploadError() {
        this.uploadStatus = false;
        this.$message.error('糟糕，图片上传失败了');
      },
      imgAdd(pos, file) {
        this.uploadProgress();
        let formdata = new FormData();
        formdata.append('image-file', file);
        axios({
          url: '/admin/uploadImg',
          method: 'post',
          data: formdata,
          headers: {'Content-Type': 'multipart/form-data'},
        }).then((resp) => {
          console.log(resp)
          if (resp.data.flag) {
            this.$refs.md.$img2Url(pos, resp.data.data.url);
          } else {
            this.$message.error('糟糕，图片上传失败了' + resp.data.message);
          }
        })
      },
      imgDel(filename) {
        // 需要删除对应图片
        axios.delete("/admin/deleteImg/" + filename[0].substring(filename[0].lastIndexOf("/") + 1))
          .then((resp) => {
            if (resp.data.flag) {
              this.$message.success({
                message: '文件删除成功'
              });
            } else {
              this.$message.error({
                message: '文件删除失败？？'
              });
            }
          })
      },
      editChange(value) {
        this.editArticle.content = value;
      },
    },
    mounted() {
      if (this.id !== undefined) {
        this.isUpdate = true
        axios.get("/article/" + this.id)
          .then(resp => {
            console.log(resp)
            if (resp.data.flag) {
              this.editArticle.id = resp.data.data.id;
              this.editArticle.title = resp.data.data.title;
              this.editArticle.content = resp.data.data.content;
              this.editArticle.imgUrl = resp.data.data.imgUrl;
            } else {
              this.$message.error('糟糕，获取文章数据失败了');
            }
          })
      }
    }
  }
</script>

<style scoped>

</style>
