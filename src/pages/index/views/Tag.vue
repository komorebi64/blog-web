<template>
  <el-main>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :xs="24" :sm="20" :md="18" :lg="16">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>标签</span>
            <span style="float: right;" type="text">共 {{$store.state.tagsList.length}}  个</span>
          </div>

            <el-button v-for="tag in $store.state.tagsList" :key="tag.id"
              :disabled="id === tag.id.toString()"
              plain size="small"
              @click="switchTab(tag.id)">
              {{ tag.tagTitle }}  {{ tag.articleCount}}
            </el-button>

        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
  // import axios from 'axios'

  export default {
    name: "Tag",
    props: {
      id: String
    },
    methods: {
      switchTab(tagId){
        this.$router.push({
          // 参数（查询信息）
          name: "tagParam",
          params: {
            id: tagId.toString()
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
