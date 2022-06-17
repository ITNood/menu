<template>
  <div>
    <el-select @change="langChange" v-model="nowLang" placeholder="请选择语言">
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
      nowLang: localStorage.getItem('lang'),
      options:[
        { value: 'zh_CN', label: '简体中文' },
        { value: 'en_US', label: 'English' }
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

</style>
