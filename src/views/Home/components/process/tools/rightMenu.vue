<template>
  <div id="collapseList">
    <div v-if="thisElements.length > 0">
      <!-- 标准描述 -->
      <div id="preview" style="height: 60px">
        <!--        <div style="width: 46px;height: 46px;line-height: 46px;font-size:30px" class="bpmn-icon-start-event-none"/>-->
        <label> {{ translations(this.businessObject.$descriptor.ns.localName) }}</label>
      </div>
      <el-form label-width="100px">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="基础信息" name="0">
            <el-form-item label="ID：" prop="id">
              <el-select v-model="selectIndex" size="mini"
                         v-on:change="businessObject = thisElements[selectIndex].businessObject">
                <el-option :value="0" label="暂无数据" v-if="thisElements.length<=0"></el-option>
                <el-option :value="index" :key="index" v-for="(elementsItem,index) in thisElements"
                           :label="elementsItem.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="名称：" prop="name">
              <el-input :value="businessObject.get('name')" size="mini" v-on:input="(a)=>onChangeField(a,['name'])"/>
            </el-form-item>
            <el-form-item label="流程类型：" prop="type" v-if="is(businessObject,'bpmn:Process')">
              <el-select :value="businessObject.get('processType')" v-on:change="(a)=>onChangeField(a,['processType'])"
                         placeholder="选择要更换的模式" size="mini">
                <el-option value="None" :label="translations('None')"></el-option>
                <el-option value="Public" :label="translations('Public')"></el-option>
                <el-option value="Private" :label="translations('Private')"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="组件模式：" prop="type" v-else>
              <el-select value="" v-on:change="(item)=>item.action()" placeholder="选择要更换的模式" size="mini">
                <el-option :key="index" :value="item" v-for="(item,index) in popupMenu">
                  <span :class="item.className"> {{ item.label }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-collapse-item>

          <el-collapse-item title="过程" name="1" v-if="is(businessObject,'bpmn:Task')">
            <el-form-item label="过程内容">
              <el-select :value="businessObject.get('name')" size="mini"
                         allow-create filterable default-first-option
                         v-on:change="(a)=>onChangeField(a,['name'])">
                <el-option v-for="(key,index) in Object.keys(panelTypes.config['PROCESS'] || {})"
                           :key="index" :value="key" :label="key"/>
              </el-select>
            </el-form-item>
            <!--            <el-form :model="form" ref="form" label-width="55px">-->
            <!--              <el-form-item label="名称：" prop="name">-->
            <!--                <el-input size="mini" v-model="form.name"></el-input>-->
            <!--              </el-form-item>-->
            <!--            </el-form>-->
            <!--            <el-table :data="subData" border id="tableForm" @selection-change="selectionChange" ref="tables"-->
            <!--                      style="margin-top:15px">-->
            <!--              <el-table-column type="selection" width="50px"></el-table-column>-->
            <!--              <el-table-column prop="name" label="流程名称">-->
            <!--                <template slot-scope="scope"><a @click="openFlow">{{ scope.row.name }}</a></template>-->
            <!--              </el-table-column>-->
            <!--            </el-table>-->
            <!--            <el-button size="mini" type="primary" class="confirm">确认</el-button>-->
          </el-collapse-item>

          <el-collapse-item title="流转信息" name="2"
                            v-if="is(businessObject,'bpmn:Gateway') || is(businessObject.sourceRef,'bpmn:Gateway')">
            <div v-if="is(businessObject,'bpmn:Gateway')">
              <el-form-item label="数据：">
                <el-select :value="gatewayCondition[1]" size="mini"
                           v-on:change="(a)=>onChangeField(a + gatewayCondition[2] + gatewayCondition[3],['name'])">
                  <el-option v-for="item in (panelTypes.config['PROPS'] || [])" :key="item" :value="item"></el-option>
                  <el-option v-for="item in sharedProps" :key="item" :value="item"></el-option>
                  <el-option v-for="item in customerSharedProps" :key="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="条件：" prop="condition">
                <el-select :value="gatewayCondition[2]" size="mini"
                           v-on:change="(a)=>onChangeField(gatewayCondition[1] + a + gatewayCondition[3],['name'])">
                  <el-option value=">" label="大于"></el-option>
                  <el-option value="<" label="小于"></el-option>
                  <el-option value=">=" label="大于等于"></el-option>
                  <el-option value="<=" label="小于等于"></el-option>
                  <el-option value="=" label="等于"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="阈值：" prop="threshold">
                <el-input-number :value="gatewayCondition[3]" size="mini"
                                 v-on:change="(a)=>onChangeField(gatewayCondition[1] + gatewayCondition[2] + a,['name'])"></el-input-number>
              </el-form-item>
              <el-form-item label="默认流转：" prop="default">
                <el-select :value="businessObject.get('default')" size="mini"
                           v-on:change="(a)=>onChangeField(a,['default'])">
                  <el-option v-for="(item,index) in businessObject.get('outgoing')" :key="index" :value="item"
                             :label="item.name"/>
                </el-select>
              </el-form-item>
              <!--              <el-button icon="el-icon-delete" type="danger" round size="mini" v-if="businessObject.outgoing">对换条件</el-button>-->
            </div>
            <div v-if="is(businessObject.sourceRef,'bpmn:Gateway')">
              <el-form-item label="数据：">
                <el-select :value="businessObject.option" size="mini"
                           v-on:input="(a)=>onChangeField(a ,['option','name'])">
                  <el-option :key="'true'" :value="true" :label="$t('condition.pass')"></el-option>
                  <el-option :key="'false'" :value="false" :label="$t('condition.fail')"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-collapse-item>

          <el-collapse-item title="OUTPUT" name="3" v-if="is(businessObject,'bpmn:IntermediateCatchEvent')">
            <div v-for="(list,index) in lists" :key="index" class="lists">
              <el-input v-model="list.name" size="mini" style="margin-bottom:15px"></el-input>
              <i class="el-icon-circle-close" @click="del(index)"></i>
            </div>
            <el-button icon="el-icon-plus" type="primary" size="mini" @click="addRules">添加</el-button>
          </el-collapse-item>

          <el-collapse-item title="引用信息" name="4" v-if="is(businessObject,'refBpmn:RefServiceTask')">
            <el-form-item label="引用类型：" prop="type">
              <el-select :value="businessObject.get('ref')" v-on:change="(a)=>onChangeField(a,['ref'])" size="mini">
                <el-option :value="item.id" :key="index" :label="item.moduleName"
                           v-for="(item,index) in panelTypes.childNode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="引用流程：" prop="ID">
              <el-input :value="businessObject.get('refId')" disabled size="mini"></el-input>
            </el-form-item>
            <el-row :gutter="2">
              <el-col :span="12">
                <el-button :icon="businessObject.get('refId')?'el-icon-refresh-right':'el-icon-plus'" type="success"
                           round size="mini" @click="toggleFlow">
                  {{ businessObject.get('refId') ? '切换流程' : '选择流程' }}
                </el-button>
              </el-col>
              <el-col :span="12">
                <el-button icon="el-icon-delete" type="danger" round size="mini"
                           v-on:click="()=>onChangeField(null ,['ref'])">清除引用
                </el-button>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="参数列表" name="5">
            <el-row>
              <el-checkbox-group v-model="shareSelect" style="margin-bottom: 20px"
                                 @change="(val)=>onChangeField(val.join(','),['sharedProps'])">
                <div style="margin-left: 20px">
                  <!-- 专属数据 -->
                  <div v-for="(list) in (panelTypes.config['PROPS'] || [])" :key="list" class="lists"
                       style="margin-bottom: 7px">
                    <el-input :value="list" size="mini" style="width: 50%;margin-right: 20px" disabled></el-input>
                    <el-checkbox :label="list" size="mini" style="margin-bottom:15px;"
                                 v-if="is(businessObject,'refBpmn:RefServiceTask')">共享
                    </el-checkbox>
                  </div>
                  <!-- 父级共享至当前的内容 -->
                  <div v-for="(list) in sharedProps" :key="list" class="lists">
                    <el-input :value="list" size="mini" style="width: 50%;margin-right: 20px" disabled></el-input>
                    <el-checkbox :label="list" size="mini" style="margin-bottom:15px;"
                                 v-if="is(businessObject,'refBpmn:RefServiceTask')">共享
                    </el-checkbox>
                  </div>
                  <!-- 页面中自添加的数据 -->
                  <div v-for="(list,index) in customerSharedProps" :key="index" class="lists">
                    <el-input v-model="customerSharedProps[index]" size="mini" style="width: 50%;margin-right: 20px"
                              @input="()=>{onChangeField(customerSharedProps.join(','),['customerSharedProps'],root)}"></el-input>
                    <el-checkbox :label="list" size="mini" style="margin-bottom:15px;"
                                 v-if="is(businessObject,'refBpmn:RefServiceTask')">共享
                    </el-checkbox>
                    <i class="el-icon-circle-close" @click="remove8SplitArray(list)"></i>
                  </div>
                  <div style="margin-top: 10px">
                    <el-button icon="el-icon-plus" type="primary" size="mini"
                               @click="()=>{customerSharedProps.push('newVal'+customerSharedProps.length);onChangeField(customerSharedProps.join(','),['customerSharedProps'],root)}">
                      添加
                    </el-button>
                  </div>
                </div>
              </el-checkbox-group>
            </el-row>
            <el-row :gutter="2">
              <el-col :span="12">
                <el-button type="danger" round size="mini"
                           @click="()=>onChangeField(null,['sharedProps','customerSharedProps'])"
                           icon="el-icon-refresh">
                  刷新配置
                </el-button>
              </el-col>
              <el-col :span="12">
                <el-button type="success" round size="mini" @click="toggleFlow" icon="el-icon-upload">
                  同步配置
                </el-button>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </div>
  </div>
</template>

<script>
import {is as modelIs} from 'bpmn-js/lib/util/ModelUtil';
import {translations as t} from "@/components/bpmn/prefabrication/translate/PrefabricationTranslate";

export default {
  name: 'rightMenu',
  props: {
    bpmn: Object,
    elements: {
      type: Array,
      default: new Array({id: 'N/A'}),
    },
    panelTypes: Object,
  },
  data() {
    return {
      shareSelect: [],
      sharedProps: [],
      customerSharedProps: [],
      selectIndex: 0,
      businessObject: {},
      root: {},
      rootBusinessObject: {},
      thisElements: this.elements,
      popupMenu: {},
      gatewayCondition: [],


      activeNames: ['0'],
      form: {
        name: '',
      },
      subData: [{name: '111'}, {name: '2222'}, {name: '3333'}],
      selectedRow: [],
      disabled: true,
      decisionForm: {
        name: '',
        condition: '',
        threshold: '',
      },
      lists: [{name: ''}],
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
  created() {
  },
  mounted() {
  },
  watch: {
    elements(newValue) {
      this.selectIndex = 0;
      this.flushElements(newValue);
    },
  },
  methods: {
    translations: t,
    is: modelIs,
    flushElements(newValue) {
      // 强制刷新引用来使vue自动随最新数据变更
      this.thisElements = [];
      this.thisElements = newValue ?? [];
      if (newValue.length) {
        this.businessObject = this.thisElements[this.selectIndex].businessObject;
        this.root = this.bpmn.get('canvas').getRootElements()[0];
        this.rootBusinessObject = this.root.businessObject;

        this.shareSelect = (this.businessObject.get('sharedProps') && this.businessObject.get('sharedProps').split(',')) || [];
        this.sharedProps = (this.rootBusinessObject.get('sharedProps') && this.rootBusinessObject.get('sharedProps').split(',')) || []
        this.customerSharedProps = (this.rootBusinessObject.get('customerSharedProps') && this.rootBusinessObject.get('customerSharedProps').split(',')) || [];
        let popupMenuModule = this.bpmn.get('popupMenu');
        this.popupMenu = popupMenuModule._getEntries(
            this.thisElements[this.selectIndex],
            popupMenuModule._getProviders('bpmn-replace')
        );
        this.gatewayCondition = (this.businessObject.name || '')
            .replaceAll(/\s*/g, '')
            .match(/^(.*?)([<>=!]+)(.*?)$/) || ['', '', '<', 0];
      }
    },
    // 字段更新
    onChangeField(event, type, elements) {
      let properties = {};
      type.forEach((i) => properties[i] = (i === 'name' ? (event + '') : event));
      this.bpmn.get('modeling').updateProperties(elements || this.thisElements[this.selectIndex], properties);
      // this.$emit('changeField', this.thisElements[this.selectIndex]);
      this.flushElements(this.elements);
    },
    //折叠
    handleChange(val) {
    },
    //单选
    selectionChange(row) {
      this.selectedRow = row;
      if (row.length > 1) {
        this.$refs.tables.clearSelection();
        this.$refs.tables.toggleRowSelection(row.pop());
      }
    },
    //添加
    addRules() {
      this.lists.push({name: ''});
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
      this.$emit('toggleFlow', this.selectIndex);
    },
    remove8SplitArray(removeItem) {
      this.onChangeField(this.customerSharedProps.filter((v) => v !== removeItem).join(","), ['customerSharedProps'], this.root)
    }
  },
};
</script>

<style scoped lang="less">
#preview {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0px;
  border-bottom: 1px solid wheat;
}
</style>
