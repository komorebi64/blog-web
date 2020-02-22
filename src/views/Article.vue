<template>
  <el-main v-loading="article_loading">
    <PageHeader :title="article.title"/>
    <Markdown :content="article.content"/>
    <el-card shadow="always" body-style="display: inline-block; width: 95%;">
      <CommentListBox :articleId="id"/>
      <el-divider></el-divider>
      <CommentEditBox :articleId="id"/>
    </el-card>
  </el-main>
</template>
<script>
import '../../static/github-markdown.css';
import axios from 'axios';
import showdown from 'showdown';
import Markdown from "@/components/Markdown";
import PageHeader from "@/components/PageHeader";
import CommentListBox from "@/components/CommentListBox";
import CommentEditBox from "@/components/CommentEditBox";

export default {
  name: 'Article',
  components: {
    PageHeader,
    Markdown,
    CommentListBox,
    CommentEditBox
  },
  props:{
    id:String
  },
  data(){
    return{
      article_loading: true,
      article:{
        title:'',
        content:''
      }
    }
  },
  methods:{
    formatMake(text){
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
              html      = converter.makeHtml(text);

      return html.replace(/\\n/gm,"<br/>")
    },
    getArticle(){
      axios.get("/article/" + this.id)
        .then((res)=>{
          if(res.data.flag){
            this.article = res.data.data;
          }else {
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
        }).catch(()=>{
          this.article.content = '# 获取文章失败啦？';
        }).finally(()=>{
          this.article_loading = false;
        })
    },

  },
  mounted(){
    this.getArticle();
  }
}
</script>
