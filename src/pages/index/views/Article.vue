<template>
  <el-container v-loading="article_loading" class="main">
      <el-col :xs="24" :sm="20" :md="18" :lg="16" class="row-bg">
        <PageHeader :title="article.title"/>
        <Markdown :content="article.content"/>
        <el-card class="comment-box" shadow="always" body-style="display: inline-block;width: 95%;">
          <CommentListBox :articleId="id"/>
          <el-divider></el-divider>
          <CommentEditBox :articleId="id"/>
        </el-card>
      </el-col>

  </el-container>
</template>
<script>
  import '../../../../static/github-markdown.css';
  import axios from 'axios';
  import showdown from 'showdown';
  import Markdown from "@/pages/index/components/Markdown";
  import PageHeader from "@/pages/index/components/PageHeader";
  import CommentListBox from "@/pages/index/components/CommentListBox";
  import CommentEditBox from "@/pages/index/components/CommentEditBox";

  export default {
    name: 'Article',
    components: {
      PageHeader,
      Markdown,
      CommentListBox,
      CommentEditBox
    },
    props: {
      id: String
    },
    data() {
      return {
        article_loading: true,
        article: {
          title: '',
          content: ''
        }
      }
    },
    methods: {
      formatMake(text) {
        const classMap = {
          code: 'html'
        };

        const bindings = Object.keys(classMap)
          .map(key => ({
            type: 'output',
            regex: new RegExp(`<${key}(.*)>`, 'g'),
            replace: `<${key} class="${classMap[key]}" $1>`
          }));

        let converter = new showdown.Converter({extensions: [...bindings]}),
          html = converter.makeHtml(text);

        return html.replace(/\\n/gm, "<br/>")
      },
      getArticle() {
        axios.get("/article/" + this.id)
          .then((res) => {
            if (res.data.flag) {
              this.article = res.data.data;
            } else {
              this.$router.push({
                // 参数（查询信息）
                name: "error",
                params: {
                  msg: res.data.message
                }
              });
              return;
            }
            this.article.content = this.formatMake(this.article.content);
            document.title = this.article.title + "_Komorebi个人小站";
          }).catch(() => {
          this.article.content = '# 获取文章失败啦？';
        }).finally(() => {
          this.article_loading = false;
        })
      },
    },
    mounted() {
      this.getArticle();
    }
  }
</script>

<style scoped>
  .main {
    width: 100%;
    margin-top: 20px;
  }

  .comment-box {
    margin-bottom: 50px;
  }

  .row-bg {
    margin: 0 auto;
  }
</style>
