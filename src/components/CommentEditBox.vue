<template>
    <div class="comment-edit-box">
        <div style="float: left; padding-left: 15px; width: 85%;">
            <el-input
                    type="textarea"
                    placeholder="评论"
                    v-model="commentEdit.content"
                    maxlength="300"
                    :rows="3"
                    @focus="commentEditFocus()"
                    @blur="commentEditBlur()"
                    :disabled="commentEditSubmit"
                    show-word-limit
                    clearable>
            </el-input>
            <el-collapse-transition>
                <div v-show="buttonDisplay" style="float: left;margin-top: 20px;">
                    <span>还能输入 {{300 - commentEdit.content.length}} 个字符  </span>
                    <el-button type="primary" @click="commentSubmit" :loading="commentEditSubmit" plain>提交评论</el-button>
                    <Vaptcha v-on:input="getVaptchaObj" style="transform:translateX(-25px)"/>
                </div>

            </el-collapse-transition>
        </div>


    </div>

</template>

<script>
import axios from "axios";
import Vaptcha from "@/components/Vaptcha";

    export default {
        components:{
            Vaptcha
        },
        props:{
            articleId:{
                type: String,
                default: null
            }
        },
        data(){
            return{
                token: '',
                vaptchaObj: null,
                commentEdit: {
                    content:''
                },
                commentEditSubmit: false,
                buttonDisplay: false
            }
        },
        methods:{
            commentEditFocus(){
                this.buttonDisplay = true;
            },
            commentEditBlur(){
                if (this.commentEdit.content.length === 0){
                    this.buttonDisplay = false;
                }
            },
            dataBuild(){
                return {
                    "articleId": this.articleId,
                    "content": this.commentEdit.content,
                }
            },
            commentSubmit(){
                this.token = this.vaptchaObj.getToken();

                if (this.commentEdit.content.length === 0){
                    this.showMessage("不写点什么吗。。。。");
                    return;
                }
                if (this.token === null || this.token === ''){
                    this.showMessage("请先完成人机验证。");
                    return;
                }
                this.commentEditSubmit = true;

                let data = this.dataBuild();
                axios.post("/comment/" + this.token,data)
                    .then((res)=>{
                        if (res.data.flag){
                            this.showMessage(res.data.message, "success");
                            this.commentEdit.content = '';

                            location.reload();
                        }else{
                            this.showMessage(res.data.message, "error");
                        }
                    })
                    .catch(()=>{
                        this.showMessage("由于神秘的不可抗力导致提交失败了！","error");
                    })
                    .finally(()=>{
                        this.token = '';
                        this.commentEditSubmit = false;
                        this.vaptchaObj.reset();
                    })
            },
            showMessage:function(message, type){
                if (type === 'success'){
                    this.$notify.success({
                        title: '成功',
                        message: message
                    });
                }else if (type === 'error'){
                    this.$notify.error({
                        title: '错误',
                        message: message
                    });
                }else if (type === 'warning'){
                    this.$notify.warning({
                        title: '警告',
                        message: message
                    });
                }else {
                    this.$notify.info({
                        title: '消息',
                        message: message
                    });
                }
            },
            getVaptchaObj(vaptchaObj){
                this.vaptchaObj = vaptchaObj;
            }
        }
    }
</script>


