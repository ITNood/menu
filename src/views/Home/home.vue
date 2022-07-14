<template>
  <el-tabs tab-position="left" v-model="tabIndex" editable @edit="handleTabsEdit" @tab-click="handleClick">
    <el-tab-pane v-for="(item) in tabsList" :ref="'base'+item.key"
                 :key="item.key" :name="item.key" :label="item.title" >
      <bpmn @createNewBpmn="createNewBpmn" :ref="'bpmn'+item.key" @cleanCreate="handleTabsRemove(item.key)"/>
    </el-tab-pane>

  </el-tabs>
</template>

<script>
import Bpmn from './components/process/bpmn.vue';

export default {
  components: {Bpmn},
  data() {
    return {
      tabsList: [
        {
          title: '主流程',
          key: '1',
        }
      ],
      tabIndex: '1',
      tabIndexHistory: [null, '1'],
      tabMaxIndex: 1,
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {
    createNewBpmn(selectType, xml, id) {
      let title = null;
      if (selectType.moduleName) {
        title = selectType.moduleName + '流程'
      }
      this.handleTabsAdd(title);
      this.$nextTick(() => {
        let newBpmn = this.$refs['bpmn' + this.tabIndex][0];
        // 处理新页面内容
        newBpmn.newTabInit(selectType, xml, id)
      })
    },
    handleClick({name},) {
      if (name != this.tabIndexHistory[1]) {
        this.tabIndexHistory[0] = this.tabIndexHistory[1]
        this.tabIndexHistory[1] = name
      }
    },
    handleTabsAdd(title) {
      let newTabKey = ++this.tabMaxIndex + '';
      this.tabsList.push({
        title: title ?? ('New Tab' + newTabKey),
        key: newTabKey
      });
      this.tabIndex = newTabKey;
      this.handleClick({name: newTabKey})
    },
    handleTabsRemove(selectKey) {
      let tabs = this.tabsList;
      let activeKey = this.tabIndex;
      let activeAreRemove = (activeKey === selectKey)
      let removeIndex = null;
      tabs.forEach((tab, index) => {
        if (tab.key === selectKey) {
          if (activeAreRemove) {
            let nextTab = this.tabIndexHistory[0]
            if(selectKey == nextTab){
              nextTab = (tabs[index + 1] || tabs[index - 1]).key
            }
            if (nextTab) {
              this.tabIndex = nextTab;
              removeIndex = index;
            }
          }else{
            removeIndex = index;
          }
        }
      });
      if (removeIndex) {
        tabs.splice(removeIndex, 1)
      }
    },
    handleTabsEdit(selectKey, action) {
      if (action === 'add') {
        this.handleTabsAdd();
      }
      if (action === 'remove') {
        this.handleTabsRemove(selectKey)
      }
    }
  }
}

</script>

<style scoped>
</style>
