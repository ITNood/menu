<template>
  <div>
    <el-select @change="langChange" v-model="nowLang" placeholder="请选择语言" size="mini">
      <el-option v-for="item in options"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "SelectLanguage",
  data () {
    return {
      nowLang: this.$i18n.locale,
      options:[
        { value: 'zh-CN', label: '简体中文' },
        { value: 'en-US', label: 'English' }
      ]
    }
  },
  methods: {
    //语言切换
    langChange(e){
      localStorage.setItem('lang',e);
      this.$i18n.locale = e;
      window.location.reload()
    }
  }
}
</script>

<style scoped>
.el-select{
  width: 60%;
}
</style>
