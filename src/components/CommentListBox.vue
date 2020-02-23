<template>
    <div class="comment-list-box" v-if="commentList.length > 0">
        <div v-for="(comment) in commentList" :key="comment.id" class="text item">
            <div style="float: left">
                <el-avatar :src="comment.thumbnailUrl"></el-avatar>
            </div>
            <div style="float: left; padding-left: 25px; transform:translateY(-15px)">
                <pre>{{comment.name}}</pre>
                <pre>{{comment.content}}</pre>
            </div>
            <div style="float: right; padding-right: 15px">
                <i class="el-icon-time"></i> {{utils.timeFormatConversion(comment.created)}}
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        props:{
            articleId:{
                type: String,
                default: null
            }
        },
        data(){
            return{
                commentList: {}
            }
        },
        methods:{
            getCommentList(){
                axios.get("/comment/" + this.articleId)
                    .then((res)=>{
                        if(res.data.flag){
                            this.commentList = res.data.data;
                        }
                    })
            }
        },
        mounted(){
            this.getCommentList();
        }
    }
</script>


