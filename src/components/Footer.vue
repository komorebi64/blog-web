<template>
    <el-footer height="130px">
        ©️2019 Komorebi
        <el-link href="https://github.com/mantoumc" type="info" :underline="false" target="_blank">by Minghao.Zhang</el-link>
        <br />
        <el-link href="http://www.beian.miit.gov.cn/" type="info" :underline="false" target="_blank">蜀ICP备19014487号</el-link>
        <br />
        <span id="cnzz-a"></span>
        <br />
        <p id="cnzz-script"></p>
    </el-footer>
</template>

<script>
export default {
  name: 'Footer',
    mounted(){
        const script = document.createElement('script');
        script.src = 'https://v1.cnzz.com/z_stat.php?id=1277993132&show=pic1';
        script.language = 'JavaScript';
        document.getElementById('cnzz-script').appendChild(script);

        const a = document.createElement('a');
        a.href = 'https://www.cnzz.com/stat/website.php?web_id=1277993132';
        a.text = ' 站长统计';
        a.title = '站长统计';
        a.style = 'font-size:14px;font-weight:500;color:#909399';
        document.getElementById('cnzz-a').appendChild(a);
    },
    watch: {
        '$route'() {
            if (window._czc) {
                let location = window.location;
                let contentUrl = location.pathname + location.hash;
                let refererUrl = '/';
                window._czc.push(['_trackPageview', contentUrl, refererUrl])
            }
        }
    }
}
</script>

<style scoped>
    .el-footer{
        padding: 35px 0;
        line-height: 1.5;
        width: 100%;
        background-color: #f5f6f5;
        text-align: center;
    }
</style>
