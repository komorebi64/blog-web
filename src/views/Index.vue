<template>
  <el-container style="margin-right: 30px;" v-loading="page_loading" element-loading-text="拼命加载中">
    <el-main style="padding-right: 0; ">
      <!--文章简介-->
      <el-row class="articleOverview" v-for="(article) in articleList" :key="article.id">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <img :src="article.imgUrl" class="image" alt="" @click="goArticlePage(article.id)">
          <div style="padding: 14px;">
            <h3 @click="goArticlePage(article.id)">{{article.title}}</h3>
            {{article.abstractText.substring(0,100)}} .....
            <el-divider></el-divider>
            <div class="bottom clearfix">
              <time class="time">发表时间：<i class="el-icon-time"></i> {{utils.timeFormatConversion(article.updated)}}</time>
              <el-button type="text" class="button">
                <el-link :underline="false" v-on:click="goArticlePage(article.id)">查看<i class="el-icon-view el-icon--right"></i> </el-link>
              </el-button>
            </div>
          </div>
        </el-card>
      </el-row>
      <!--分页按钮-->
      <el-pagination
              background
              v-show="page_hide"
              @current-change="handleCurrentChange"
              :page-size="pagination.pageSize"
              :current-page="pagination.currentPage"
              layout="prev, pager, next"
              :total="pagination.total">
      </el-pagination>
    </el-main>
    <!--侧边栏-->
    <el-container style="padding-top: 35px; width: 350px">
      <el-row style="width: 350px">
        <i class="el-icon-search"></i> 搜索文章<el-divider></el-divider>
        <i class="el-icon-receiving"></i> 分类<el-divider></el-divider>
        <i class="el-icon-price-tag"></i> 标签<el-divider></el-divider>
        <el-tooltip class="item" effect="dark" content="1 个标签" placement="top">
          <el-link href="/" :underline="false" target="_blank"><el-tag>标签一</el-tag></el-link>
        </el-tooltip>
        <el-tag type="success">标签二</el-tag>
        <el-tag type="info">标签三</el-tag>
        <el-tag type="warning">标签四</el-tag>
        <el-tag type="danger">标签五</el-tag>
        <el-divider></el-divider>
        <i class="el-icon-share"></i> 社交按钮<el-divider></el-divider>
      </el-row>
    </el-container>
  </el-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Index',
  data(){
    return{
      page_loading:true,
      // 分页按钮隐藏
      page_hide:false,
      pagination: {//分页相关属性
        currentPage: 1,
        pageSize:3,
        total:0,
        queryString:'',
      },
      articleList:[]
    }
  },
  methods:{
    //分页查询
    findPage() {
      axios.get("/article"+
              "?currentPage="+this.pagination.currentPage +
              "&pageSize=" + this.pagination.pageSize +
              "&queryString=" + this.pagination.queryString)
              .then((resp)=>{
                this.pagination.total = resp.data.data.total;
                this.articleList = resp.data.data.rows;
              })
              .catch(()=>{
                // 数据加载失败
                this.$router.push("error")
              }).finally(()=>{
                this.page_loading = false;
              });
      this.paginationHide();
    },
    // 切换页码
    handleCurrentChange(currentPage){
      this.pagination.currentPage = currentPage;
      this.findPage();
    },
    // 分页按钮是否隐藏
    paginationHide(){
      if (this.pagination.currentPage <= this.pageSize) {
        this.page_hide = true;
      }
    },
    goArticlePage(articleId){
      this.$router.push({
        // 参数（查询信息）
        name: "article",
        params: {
          id: articleId
        }
      });
    }
  },
  mounted(){
    this.findPage();
  }
}
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .button {
    padding: 0;
    float: right;
  }
  .image {
    height: auto;
    width: 100%;
    display: block;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .articleOverview{
    margin: 25px auto;
    width: 95%;
  }
</style>
