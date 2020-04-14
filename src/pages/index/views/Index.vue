<template>

  <el-container style="width:100%" v-loading="page_loading" element-loading-text="拼命加载中">
    <el-row type="flex" class="row-bg" justify="center" style="width:100%">
      <el-col :xs="24" :sm="16" :md="16" :lg="16">
        <!--当前搜索提示-->
        <transition name="el-zoom-in-top">
          <el-row class="articleOverview" v-show="searchPrompt">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">搜索条件</el-breadcrumb-item>
              <el-breadcrumb-item>包含 '{{pagination.queryString}}'</el-breadcrumb-item>
              <!--<el-breadcrumb-item>标签 '{{}}'</el-breadcrumb-item>-->
            </el-breadcrumb>
          </el-row>
        </transition>
        <!--文章简介-->
        <el-row class="articleOverview" v-for="(article) in articleList" :key="article.id">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <img :src="article.imgUrl" class="image" alt="" @click="goArticlePage(article.id)">
            <div style="padding: 14px;">
              <h3 @click="goArticlePage(article.id)">{{article.title}}</h3>
              {{article.abstractText.substring(0,100)}} .....
              <el-divider></el-divider>
              <div class="bottom clearfix">
                <time class="time">发表时间：<i class="el-icon-time"></i> {{utils.timeFormatConversion(article.updated)}}
                </time>
                <el-button type="text" class="button">
                  <el-link :underline="false" v-on:click="goArticlePage(article.id)">查看<i
                    class="el-icon-view el-icon--right"></i></el-link>
                </el-button>
              </div>
            </div>
          </el-card>
        </el-row>
        <!--没有文章-->
        <el-row class="articleOverview" v-if="articleList.length <= 0">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <div style="padding: 14px;">
              <h3>很抱歉，没有找到与“{{pagination.queryString}}”相关的文章。</h3>
              <li>请检查您的输入是否正确</li>
              <li>如有任何意见或建议，请及时反馈给我</li>
            </div>
          </el-card>
        </el-row>
        <!--分页按钮-->
        <el-row class="articleOverview">
          <el-pagination
            background
            v-show="page_show"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="pagination.pageSize"
            :current-page.sync="$store.state.currentPage"
            :page-sizes="[5, 10, 20, 30]"
            layout="sizes, prev, pager, next"
            :total="pagination.total">
          </el-pagination>
        </el-row>
      </el-col>
      <!--侧边栏-->
      <el-col :xs="0" :sm="6" :md="5" :lg="4" style="padding-top: 35px;padding-right: 30px">
        <el-input
          placeholder="搜索文章"
          prefix-icon="el-icon-search"
          @change="findPage"
          @keyup.enter.native="findPage"
          @input="$store.commit('setPaginationQueryString', pagination.queryString)"
          v-model="pagination.queryString"
          maxlength="20"
          clearable></el-input>
        <el-divider></el-divider>
        <i class="el-icon-receiving"></i> 分类
        <el-divider></el-divider>
        <i class="el-icon-price-tag"></i> 标签
        <el-divider></el-divider>

        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col>
            <el-tag effect="plain">标签一</el-tag>
          </el-col>
          <el-col>
            <el-tag type="success">标签二</el-tag>
          </el-col>
          <el-col>
            <el-tag type="success">标签三</el-tag>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <i class="el-icon-share"></i> 社交按钮
        <el-divider></el-divider>
      </el-col>
    </el-row>
  </el-container>

</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Index',
    data() {
      return {
        page_loading: true,
        // 分页按钮显示
        page_show: true,
        pagination: {//分页相关属性
          pageSize: 5,
          total: 0,
          queryString: '',
        },
        searchPrompt: false,
        articleList: []
      }
    },
    methods: {
      //分页查询
      findPage() {
        axios.get("/article" +
          "?currentPage=" + this.$store.state.currentPage +
          "&pageSize=" + this.pagination.pageSize +
          "&queryString=" + this.pagination.queryString)
          .then((resp) => {
            this.pagination.total = resp.data.size;
            this.articleList = resp.data.data;
            this.paginationShow();
            this.searchPromptShow();
          })
          .catch(() => {
            // 数据加载失败
            this.$router.push({
              // 参数（查询信息）
              name: "error",
              params: {
                msg: '获取数据失败'
              }
            });
          }).finally(() => {
          this.page_loading = false;
        });
      },
      // 切换页码
      handleCurrentChange(currentPage) {
        this.$store.commit('setUserRole', currentPage)
        this.findPage();
      },
      handleSizeChange(pageSize) {
        this.pagination.pageSize = pageSize;
        this.findPage();
      },
      // 分页按钮是否显示
      paginationShow() {
        this.page_show = this.pagination.total > this.pagination.pageSize;
      },
      // 分页按钮是否显示
      searchPromptShow() {
        this.searchPrompt = this.$store.state.paginationQuery !== ''
      },
      goArticlePage(articleId) {
        this.$router.push({
          // 参数（查询信息）
          name: "article",
          params: {
            id: articleId.toString()
          }
        });
      }
    },
    mounted() {
      if (this.$store.state.paginationQuery !== undefined) {
        this.pagination.queryString = this.$store.state.paginationQuery;
      }
      document.title = "Komorebi个人小站";
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

  .articleOverview {
    margin: 25px auto;
    width: 95%;
  }
</style>
