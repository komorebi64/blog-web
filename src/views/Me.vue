<template>
  <el-main>
    <div class="about">
      <h1>关于</h1>
      <h2>Komorebi</h2>
      <p>希望成为一名很优秀的程序员</p>
      <h2>关于博主</h2>
      <p>
        职业：学生<br/>
        邮箱：komorebi@956246.cn<br/>
        Tags：善良，不服输<br/>
        简介：喜欢安静,喜欢新鲜的技术,喜欢纯音乐,折腾Ubuntu<br/>
      </p>
      <p>A programmer who subconsciously views himself as an artist<br />
        will enjoy what he does and will do it better</p>
    </div>
    <div class="block" style="padding-top: 30px;">
      <el-divider></el-divider>
      <div style="padding-bottom: 25px;margin-left: 30px;">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>关于我</el-breadcrumb-item>
          <el-breadcrumb-item>关于博客</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-timeline>
        <el-timeline-item timestamp="2020-02-21" placement="top">
          <el-card>
            <p>在一个朋友的建议下，我把前端与后端进行了分离<br/><br/>
              说起来好像很轻松的样子，但是做了之后才知道，有很多东西需要修改</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020-02-05" placement="top">
          <el-card>
            <p>GitHub的OAuth写好后还想接入Google和QQ，但是我的代码该重构一下下了<br/><br/>
              现在写的OAuth并不适合后期的维护，不过还是先弄完后台的文章编辑再来吧</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020-01-30" placement="top">
          <el-card>
            <p>过年期间，没怎么来敲敲<br/><br/>
              今天大概的把用户登录和OAuth完善一下</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020-01-02" placement="top">
          <el-card>
            <h3>技术选型</h3>
            <p>刚开始做的时候是想前后端完全分离使用<br/><br/>
              不过看到其他的博客系统很多都是直接展示的自己感觉这样也好看些</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020-01-02" placement="top">
          <el-card>
            <h3>心血来潮</h3>
            <p>尝试了这么多博客系统，下定决心自己也要 <b>整一个🤨</b><br/><br/>
              并在Github的私有仓库提交了这个博客系统的第一版</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2019-11-25" placement="top">
          <el-card>
            <h3>初识Solo</h3>
            <p>尝试搭建了一款小型的博客系统 <a href="https://solo.b3log.org/">Solo</a></p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2019-10-25" placement="top">
          <el-card>
            <p>注册域名 956246.cn，利用华为云服务器搭建的动态博客。</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018-11-12" placement="top">
          <el-card>
            <p>因 Github Page 加载速度太慢，编写博客不方便，直接删除了 Github 仓库😭</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018-4-12" placement="top">
          <el-card>
            <p>再次注册域名 zmh956246.xyz，利用 Github Page 搭建博客。</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2017-03-12" placement="top">
          <el-card>
            <h3>放弃折腾</h3>
            <p>一年之后，腾讯云学生机服务器到期未续费<br /><br />域名到期未续，域名过期被注销，撒花纪念。</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2017-01" placement="top">
          <el-card>
            <h3>不务正业？</h3>
            <p>因为 “球球大作战” 手机游戏的火爆，去写了QQ机器人插件</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2016-03-12" placement="top">
          <el-card>
            <h3>开始我的博客之旅</h3>
            <p>基于 WordPress 的第一个网站，域名 mantoumc.win。</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </el-main>
</template>

<script>
export default {
  name: 'Me'
}
</script>