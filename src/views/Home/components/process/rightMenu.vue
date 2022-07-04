<template>
  <div id="collapseList">
    <div v-if="thisElements.length > 0">

      {{ bpmn.get("popupMenu").get }}
      <!--      <el-row>-->
      <!--        <el-col :span="8">-->
      <!--          <div style="width: 46px;height: 46px;line-height: 46px;font-size:30px" class="bpmn-icon-start-event-none"/>-->
      <!--        </el-col>-->
      <!--        <el-col :span="16">-->
      <!--          <label> {{ this.$t('bpmn["' + businessObject.$descriptor.ns.localName + '"]') }}</label>-->
      <!--        </el-col>-->
      <!--      </el-row>-->
      <el-form :model="basicsForm"
        ref="basicsForm"
        label-width="100px">
        <el-collapse v-model="activeNames"
          @change="handleChange">
          <el-collapse-item title="基础信息"
            name="0">
            <el-form-item label="ID："
              prop="id">
              <el-select v-model="selectIndex"
                v-on:change="businessObject = thisElements[selectIndex].businessObject"
                size="mini">
                <el-option :value="0"
                  label="暂无数据"
                  v-if="thisElements.length<=0"></el-option>
                <el-option :value="index"
                  :key="index"
                  v-for="(elementsItem,index) in thisElements"
                  :label="elementsItem.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="名称："
              prop="name">
              <el-input :value="businessObject.get('name')"
                size="mini"
                v-on:input="(a)=>onChangeField(a,['name'])" />
            </el-form-item>
            <el-form-item label="组件模式："
              prop="type">
              <el-select value=""
                v-on:change="(item)=>item.action()"
                placeholder="选择要更换的模式"
                size="mini">
                <el-option :key="index"
                  :value="item"
                  v-for="(item,index) in popupMenu"><span :class="item.className"> {{
                    item.label
                  }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-collapse-item>

          <el-collapse-item title="SUB FLOW"
            name="1">
            <el-form :model="form"
              ref="form"
              label-width="55px">
              <el-form-item label="名称："
                prop="name">
                <el-input size="mini"
                  v-model="form.name"></el-input>
              </el-form-item>
            </el-form>
            <el-table :data="subData"
              border
              id="tableForm"
              @selection-change="selectionChange"
              ref="tables"
              style="margin-top:15px">
              <el-table-column type="selection"
                width="50px"></el-table-column>
              <el-table-column prop="name"
                label="流程名称">
                <template slot-scope="scope">
                  <a @click="openFlow">{{ scope.row.name }}</a>
                </template>
              </el-table-column>
            </el-table>
            <el-button size="mini"
              type="primary"
              class="confirm">确认</el-button>
          </el-collapse-item>

          <el-collapse-item title="流转信息"
            name="a">
            <div v-if="is(businessObject,'bpmn:Gateway')">
              <el-form-item label="数据：">
                <el-select :value="gatewayCondition[1]"
                  size="mini"
                  v-on:input="(a)=>onChangeField(a + gatewayCondition[2] + gatewayCondition[3],['name'])">
                  <el-option v-for="item in items"
                    :key="item"
                    :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="条件："
                prop="condition">
                <el-select :value="gatewayCondition[2]"
                  size="mini"
                  v-on:input="(a)=>onChangeField(gatewayCondition[1] + a + gatewayCondition[3],['name'])">
                  <el-option value=">"
                    label="大于"></el-option>
                  <el-option value="<"
                    label="小于"></el-option>
                  <el-option value=">="
                    label="大于等于"></el-option>
                  <el-option value="<="
                    label="小于等于"></el-option>
                  <el-option value="="
                    label="等于"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="阈值："
                prop="threshold">
                <el-input-number :value="gatewayCondition[3]"
                  size="mini"
                  v-on:change="(a)=>onChangeField(gatewayCondition[1] + gatewayCondition[2] + a,['name'])"></el-input-number>
              </el-form-item>
              <!--              <el-button icon="el-icon-delete" type="danger" round size="mini" v-if="businessObject.outgoing">对换条件</el-button>-->
            </div>
            <div v-if="is(businessObject.sourceRef,'bpmn:Gateway')">
              <el-form-item label="数据：">
                <el-select :value="businessObject.name"
                  size="mini"
                  v-on:input="(a)=>onChangeField(a ,['name'])">
                  <el-option :key="true"
                    value="true"
                    :label="$t('condition.pass')"></el-option>
                  <el-option :key="false"
                    value="false"
                    :label="$t('condition.fail')"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-collapse-item>

          <el-collapse-item title="Decision"
            name="2"
            v-if="is(businessObject,'bpmn:Gateway')">
            <el-form :model="decisionForm"
              ref="decisionForm"
              label-width="55px">
            </el-form>
            <el-button size="mini"
              type="primary"
              class="confirm">确认</el-button>
          </el-collapse-item>

          <el-collapse-item title="OUTPUT"
            name="3">
            <div v-for="(list,index) in lists"
              :key="index"
              class="lists">
              <el-input v-model="list.name"
                size="mini"
                style="margin-bottom:15px"></el-input>
              <i class="el-icon-circle-close"
                @click="del(index)"></i>
            </div>
            <el-button icon="el-icon-plus"
              type="primary"
              size="mini"
              @click="addRules">添加</el-button>
          </el-collapse-item>

          <el-collapse-item title="引用信息"
            name="4"
            v-if="is(businessObject,'refBpmn:RefServiceTask')">
            <el-form-item label="引用类型："
              prop="type">
              <el-select :value="thisElements[selectIndex].index"
                size="mini">
                <el-option :value="item.id"
                  :key="index"
                  :label="item.moduleName"
                  v-for="(item,index) in panelTypes.childNode"
                  disabled></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="引用流程："
              prop="ID">
              <el-input :value="businessObject.get('ref')?businessObject.get('ref'):'暂无'"
                disabled
                size="mini"></el-input>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-button icon="el-icon-refresh-right"
                  type="success"
                  round
                  size="mini"
                  @click="toggleFlow">切换流程
                </el-button>
              </el-col>
              <el-col :span="12">
                <el-button icon="el-icon-delete"
                  type="danger"
                  round
                  size="mini"
                  v-on:click="()=>onChangeField(null ,['ref'])">清除引用</el-button>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-form>
      <!----查看流程---->
      <el-dialog title="提示"
        :visible.sync="isshow"
        width="50%">
        <span>这是一段信息</span>
        <span slot="footer"
          class="dialog-footer">
          <el-button @click="isshow = false">取 消</el-button>
          <el-button type="primary"
            @click="isshow = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { is as modelIs } from 'bpmn-js/lib/util/ModelUtil';

export default {
  name: 'rightMenu',
  props: {
    bpmn: Object,
    elements: {
      type: Array,
      default: new Array({ id: 'N/A' }),
    },
    panelTypes: Object,
  },
  data() {
    return {
      selectIndex: 0,
      businessObject: {},
      thisElements: this.elements,
      popupMenu: {},
      gatewayCondition: [],

      activeNames: ['0'],
      form: {
        name: '',
      },
      subData: [{ name: '111' }, { name: '2222' }, { name: '3333' }],
      selectedRow: [],
      disabled: true,
      isshow: false,
      decisionForm: {
        name: '',
        condition: '',
        threshold: '',
      },
      items: [],
      lists: [{ name: '' }],
      quoteForm: {
        type: '',
        ID: '55555d5s',
        name: 'dadfafds',
      },
      basicsForm: {
        id: '',
        name: '',
        type: '',
      },
    };
  },
  created() {},
  mounted() {},
  watch: {
    elements(newValue) {
      this.selectIndex = 0;
      this.flushElements(newValue);
    },
  },
  methods: {
    is: modelIs,
    flushElements(newValue) {
      // 强制刷新引用来使vue自动随最新数据变更
      this.thisElements = newValue ?? [];
      if (newValue.length) {
        this.businessObject =
          this.thisElements[this.selectIndex].businessObject;
        let popupMenuModule = this.bpmn.get('popupMenu');
        this.popupMenu = popupMenuModule._getEntries(
          this.thisElements[this.selectIndex],
          popupMenuModule._getProviders('bpmn-replace')
        );
        this.gatewayCondition = (this.businessObject.name ?? '')
          .replaceAll(/\s*/g, '')
          .match(/^(.*?)([<>=!]+)(.*?)$/) ?? ['', '', '<', ''];
      }
    },
    // 字段更新
    onChangeField(event, type) {
      let properties = {};
      type.forEach((i) => (properties[type] = event));
      this.bpmn
        .get('modeling')
        .updateProperties(this.thisElements[this.selectIndex], properties);
      this.$emit('changeField', this.thisElements[this.selectIndex]);
      this.flushElements(this.elements);
    },

    //折叠
    handleChange(val) {
      console.log(val);
    },
    //单选
    selectionChange(row) {
      this.selectedRow = row;
      if (row.length > 1) {
        this.$refs.tables.clearSelection();
        this.$refs.tables.toggleRowSelection(row.pop());
      }
    },
    //查看流程
    openFlow() {
      this.isshow = !this.isshow;
    },
    //添加
    addRules() {
      this.lists.push({ name: '' });
    },
    //删除
    del(index) {
      if (this.lists.length > 1) {
        const list = [...this.lists];
        list.splice(index, 1);
        this.lists = [...list];
      } else {
        this.$message.warning('给我留点，不能再删了！');
        return;
      }
    },
    //切换
    toggleFlow() {
      this.$emit('toggleFlow');
    },
  },
};
</script>

<style scoped lang="less">
</style>
