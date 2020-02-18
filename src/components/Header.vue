<template>
    <el-header>
        <el-menu class="el-menu-demo" mode="horizontal" router default-active="/">
            <el-menu-item>
                    <span style="font-size: 20px; ">
                    <el-avatar :size="35" src="/image/avatar.jpg"></el-avatar>
                        Komorebi
                    </span>
            </el-menu-item>
            <el-menu-item index="/">首页</el-menu-item>
            <el-submenu index="2">
                <template slot="title">文章标签</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
            </el-submenu>
            <el-menu-item index="/me">关于我</el-menu-item>
        </el-menu>
    </el-header>
</template>

<style scoped>
    .el-header{
        padding: 0;
    }
</style>
