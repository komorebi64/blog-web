<template>
  <el-container style="padding-top: 35px; width: 350px">
    <el-row style="width: 350px">
      <i class="el-icon-search"></i> 搜索文章
      <el-divider></el-divider>
      <i class="el-icon-receiving"></i> 分类
      <el-divider></el-divider>
      <i class="el-icon-price-tag"></i> 标签
      <el-divider></el-divider>
      <el-tooltip class="item" effect="dark" content="1 个标签" placement="top">
        <el-link href="/" :underline="false" target="_blank">
          <el-tag>标签一</el-tag>
        </el-link>
      </el-tooltip>
      <el-tag type="success">标签二</el-tag>
      <el-tag type="info">标签三</el-tag>
      <el-tag type="warning">标签四</el-tag>
      <el-tag type="danger">标签五</el-tag>
      <el-divider></el-divider>
      <i class="el-icon-share"></i> 社交按钮
      <el-divider></el-divider>
    </el-row>
  </el-container>
</template>
