<template>
    <div id="vaptchaContainer" style="width: 300px;height: 167px;margin-top: 15px">
        <div class="vaptcha-init-main">
            <div class="vaptcha-init-loading">
                <a href="/" target="_blank">
                    <img src="https://r.vaptcha.com/public/img/vaptcha-loading.gif"  alt=""/>
                </a>
                <span class="vaptcha-text">Vaptcha启动中...<br/>如果您无法加载验证码请尝试刷新<br/>网络的问题会导致您一直加载</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'click'
            },
            scene: {
                type: String,
                default: '0'
            },
            vpStyle: {
                type: String,
                default: 'dark'
            },
            color: {
                type: String,
                color: '#3C8AFF'
            },
            lang: {
                type: String,
                default: 'zh-CN'
            }
        },
        mounted() {
            this.loadV2Script().then(() => {
                window.vaptcha({
                    vid: '5e11b8d14c6b8b41680b9091', // 验证单元id
                    type: 'embed', // 显示类型 嵌入式
                    scene: 0, // 场景值 默认0
                    container: '#vaptchaContainer', // 容器，可为Element 或者 selector
                    offline_server: 'localhost' //离线模式服务端地址
                }).then(obj => {
                    this.$emit('input', obj);
                    obj.render() //渲染按钮
                })
            })
        },
        methods: {
            loadV2Script() {
                if (typeof window.vaptcha === 'function') { //如果已经加载就直接放回
                    return Promise.resolve()
                } else {
                    return new Promise(resolve => {
                        let script = document.createElement('script');
                        script.src = 'https://v.vaptcha.com/v3.js';
                        script.async = true;
                        script.onload = script.onreadystatechange = function() {
                            if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
                                resolve();
                                script.onload = script.onreadystatechange = null
                            }
                        };
                        document.getElementsByTagName("head")[0].appendChild(script)
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .vaptcha-init-main {
        display: table;
        width: 100%;
        height: 100%;
        background-color: #EEEEEE;
    }

    .vaptcha-init-loading {
        display: table-cell;
        vertical-align: middle;
        text-align: center
    }

    .vaptcha-init-loading>a {
        display: inline-block;
        width: 18px;
        height: 18px;
        border: none;
    }

    .vaptcha-init-loading>a img {
        vertical-align: middle
    }

    .vaptcha-init-loading .vaptcha-text {
        font-family: sans-serif;
        font-size: 12px;
        color: #CCCCCC;
        vertical-align: middle
    }
</style>
