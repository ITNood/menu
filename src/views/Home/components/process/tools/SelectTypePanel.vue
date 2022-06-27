<template>
  <div>
    <el-dialog title="选择流程"
      :visible.sync="dialogVisible"
      width="90%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      append-to-body>

      <!-- 面包屑 / 当前所在位置导航 -->
      <el-row>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item,index) in breadcrumb"
            :key="index">
            <a v-on:click="choiceTypeByNameClick(item,index)">{{ item }}</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>

      <!-- 导航下的分割线 -->
      <el-divider></el-divider>

      <!-- 主面板 -->
      <el-row>
        <!-- 左侧为类型选择区域 -->
        <el-col :span="20">
          <el-row v-if="selectTypes && selectTypes.status && selectTypes.status === 'Active'">
            <el-col :span="4"
              v-for="(element, index) in selectTypes.childNode"
              :key="index"
              :offset="index%4 > 0 ? 2 : 1">
              <el-card :shadow="(element.status && element.status === 'Active')?'hover':'never'">
                <div v-on:click="choiceTypeClick(element)">
                  <div style="padding: 14px;text-align: center; ">
                    <span>{{ element.moduleName }}</span>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>

          <!-- 左下半部分展示已选择的类型信息 -->
          <el-row>

          </el-row>
        </el-col>
        <el-col :span="4">
          <el-col>
            <el-button type="text"
              icon="el-icon-plus"
              @click="createNew">创建一个新的流程</el-button>
          </el-col>
          <el-col>
            <el-button type="text"
              icon="el-icon-star-on"
              @click="selectTemplate">选择模板</el-button>
          </el-col>
          <el-col>
            <el-button type="text"
              icon="el-icon-search"
              @click="selectHistory">使用历史流程</el-button>
          </el-col>
        </el-col>
      </el-row>

      <!-- TODO 测试完成后删除 -->
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('el.messagebox.cancel') }}</el-button>
        <el-button type="primary"
          @click="dialogVisible = false">{{ $t('el.messagebox.confirm') }}</el-button>
      </span>
    </el-dialog>
    <banner ref="selectProcessBanner" />
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/base.css';
import Banner from '../../banner/index.vue';
// 用于选择流程类型和配置相关属性
export default {
  name: 'SelectTypePanel',
  components: { Banner },
  data() {
    return {
      dialogVisible: false,
      bannerVisible: false,
      types: [
        {
          id: 0,
          moduleId: null,
          moduleName: '根',
          parentId: 0,
          status: 'Active',
          configName: null,
          icon: null,
          childNode: [
            {
              id: 1,
              moduleId: null,
              moduleName: '采购',
              parentId: 0,
              status: 'Active',
              configName: null,
              icon: null,
              childNode: [],
            },
            {
              id: 2,
              moduleId: null,
              moduleName: '生产',
              parentId: 0,
              status: 'Active',
              configName: null,
              icon: null,
              childNode: [],
            },
            {
              id: 3,
              moduleId: null,
              moduleName: '仓储',
              parentId: 0,
              status: 'Active',
              configName: null,
              icon: null,
              childNode: [
                {
                  id: 6,
                  moduleId: null,
                  moduleName: '物流-传统仓',
                  parentId: 3,
                  status: 'Active',
                  configName: null,
                  icon: null,
                  childNode: [
                    {
                      id: 15,
                      moduleId: null,
                      moduleName: '入库环节',
                      parentId: 31,
                      status: 'Active',
                      configName: null,
                      icon: null,
                      childNode: [
                        {
                          id: 18,
                          moduleId: null,
                          moduleName: '月台分配',
                          parentId: 311,
                          status: 'Active',
                          configName: null,
                          icon: null,
                          childNode: [
                            {
                              id: 22,
                              moduleId: null,
                              moduleName: '进港时序预测',
                              parentId: 3111,
                              status: 'Disabled',
                              configName: null,
                              icon: null,
                              childNode: [],
                            },
                            {
                              id: 23,
                              moduleId: null,
                              moduleName: '码头分配规划',
                              parentId: 3111,
                              status: 'Disabled',
                              configName: null,
                              icon: null,
                              childNode: [],
                            },
                          ],
                        },
                        {
                          id: 19,
                          moduleId: null,
                          moduleName: '卸货验收',
                          parentId: 311,
                          status: 'Active',
                          configName: null,
                          icon: null,
                          childNode: [
                            {
                              id: 24,
                              moduleId: null,
                              moduleName: '卸货任务指派',
                              parentId: 3112,
                              status: 'Disabled',
                              configName: null,
                              icon: null,
                              childNode: [],
                            },
                            {
                              id: 25,
                              moduleId: null,
                              moduleName: '库存拆分组合',
                              parentId: 3112,
                              status: 'Disabled',
                              configName: null,
                              icon: null,
                              childNode: [],
                            },
                          ],
                        },
                        {
                          id: 20,
                          moduleId: null,
                          moduleName: '库位分配',
                          parentId: 311,
                          status: 'Active',
                          configName: null,
                          icon: null,
                          childNode: [
                            {
                              id: 26,
                              moduleId: null,
                              moduleName: '库位指派规划',
                              parentId: 3113,
                              status: 'Disabled',
                              configName: null,
                              icon: null,
                              childNode: [],
                            },
                            {
                              id: 27,
                              moduleId: null,
                              moduleName: '库位动态调整',
                              parentId: 3113,
                              status: 'Disabled',
                              configName: null,
                              icon: null,
                              childNode: [],
                            },
                          ],
                        },
                        {
                          id: 21,
                          moduleId: null,
                          moduleName: '转运上架',
                          parentId: 311,
                          status: 'Active',
                          configName: null,
                          icon: null,
                          childNode: [
                            {
                              id: 28,
                              moduleId: null,
                              moduleName: '转运时序调度',
                              parentId: 3114,
                              status: 'Disabled',
                              configName: null,
                              icon: null,
                              childNode: [],
                            },
                            {
                              id: 29,
                              moduleId: null,
                              moduleName: '上架任务指派',
                              parentId: 3114,
                              status: 'Disabled',
                              configName: null,
                              icon: null,
                              childNode: [],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: 16,
                      moduleId: null,
                      moduleName: '资源调度',
                      parentId: 31,
                      status: 'Active',
                      configName: null,
                      icon: null,
                      childNode: [
                        {
                          id: 30,
                          moduleId: null,
                          moduleName: '排班规划',
                          parentId: 312,
                          status: 'Active',
                          configName: null,
                          icon: null,
                          childNode: [
                            {
                              id: 34,
                              moduleId: null,
                              moduleName: '周期排班规划',
                              parentId: 3121,
                              status: 'Disabled',
                              configName: null,
                              icon: null,
                              childNode: [],
                            },
                            {
                              id: 35,
                              moduleId: null,
                              moduleName: '班次调整规划',
                              parentId: 3121,
                              status: 'Disabled',
                              configName: null,
                              icon: null,
                              childNode: [],
                            },
                          ],
                        },
                        {
                          id: 31,
                          moduleId: null,
                          moduleName: '岗位调度',
                          parentId: 312,
                          status: 'Active',
                          configName: null,
                          icon: null,
                          childNode: [
                            {
                              id: 36,
                              moduleId: null,
                              moduleName: '岗位班次分配',
                              parentId: 3122,
                              status: 'Disabled',
                              configName: null,
                              icon: null,
                              childNode: [],
                            },
                            {
                              id: 37,
                              moduleId: null,
                              moduleName: '岗位动态调度',
                              parentId: 3122,
                              status: 'Disabled',
                              configName: null,
                              icon: null,
                              childNode: [],
                            },
                          ],
                        },
                        {
                          id: 32,
                          moduleId: null,
                          moduleName: '叉车调度',
                          parentId: 312,
                          status: 'Active',
                          configName: null,
                          icon: null,
                          childNode: [
                            {
                              id: 38,
                              moduleId: null,
                              moduleName: '任务指派调度',
                              parentId: 3123,
                              status: 'Disabled',
                              configName: null,
                              icon: null,
                              childNode: [],
                            },
                            {
                              id: 39,
                              moduleId: null,
                              moduleName: '动态路径规划',
                              parentId: 3123,
                              status: 'Disabled',
                              configName: null,
                              icon: null,
                              childNode: [],
                            },
                          ],
                        },
                        {
                          id: 33,
                          moduleId: null,
                          moduleName: '补货规划',
                          parentId: 312,
                          status: 'Active',
                          configName: null,
                          icon: null,
                          childNode: [
                            {
                              id: 40,
                              moduleId: null,
                              moduleName: '补货数量规划',
                              parentId: 3124,
                              status: 'Disabled',
                              configName: null,
                              icon: null,
                              childNode: [],
                            },
                            {
                              id: 41,
                              moduleId: null,
                              moduleName: '补货波次优化',
                              parentId: 3124,
                              status: 'Disabled',
                              configName: null,
                              icon: null,
                              childNode: [],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: 17,
                      moduleId: null,
                      moduleName: '出库环节',
                      parentId: 31,
                      status: 'Active',
                      configName: null,
                      icon: null,
                      childNode: [
                        {
                          id: 42,
                          moduleId: null,
                          moduleName: '下架分单',
                          parentId: 313,
                          status: 'Active',
                          configName: null,
                          icon: null,
                          childNode: [
                            {
                              id: 46,
                              moduleId: null,
                              moduleName: '下架任务指派',
                              parentId: 3131,
                              status: 'Disabled',
                              configName: null,
                              icon: null,
                              childNode: [],
                            },
                            {
                              id: 47,
                              moduleId: null,
                              moduleName: '平衡分单规划',
                              parentId: 3131,
                              status: 'Disabled',
                              configName: null,
                              icon: null,
                              childNode: [],
                            },
                          ],
                        },
                        {
                          id: 43,
                          moduleId: null,
                          moduleName: '拣货汇单',
                          parentId: 313,
                          status: 'Active',
                          configName: null,
                          icon: null,
                          childNode: [
                            {
                              id: 48,
                              moduleId: null,
                              moduleName: '拣货时序规划',
                              parentId: 3132,
                              status: 'Disabled',
                              configName: null,
                              icon: null,
                              childNode: [],
                            },
                            {
                              id: 49,
                              moduleId: null,
                              moduleName: '拣货路径规划',
                              parentId: 3132,
                              status: 'Disabled',
                              configName: null,
                              icon: null,
                              childNode: [],
                            },
                          ],
                        },
                        {
                          id: 44,
                          moduleId: null,
                          moduleName: '包装码垛',
                          parentId: 313,
                          status: 'Active',
                          configName: null,
                          icon: null,
                          childNode: [
                            {
                              id: 50,
                              moduleId: null,
                              moduleName: '包装箱型推荐',
                              parentId: 3133,
                              status: 'Disabled',
                              configName: null,
                              icon: null,
                              childNode: [],
                            },
                            {
                              id: 51,
                              moduleId: null,
                              moduleName: '拼托混码优化',
                              parentId: 3133,
                              status: 'Active',
                              configName: null,
                              icon: null,
                              childNode: [
                                {
                                  id: 52,
                                  moduleId: null,
                                  moduleName: '',
                                  parentId: 31332,
                                  status: null,
                                  configName: 'SUBFLOW',
                                  icon: null,
                                  childNode: [
                                    {
                                      id: 58,
                                      moduleId: null,
                                      moduleName: null,
                                      parentId: 313321,
                                      status: null,
                                      configName: '订单分组分类',
                                      icon: null,
                                      childNode: [],
                                    },
                                    {
                                      id: 59,
                                      moduleId: null,
                                      moduleName: null,
                                      parentId: 313321,
                                      status: null,
                                      configName: '标准单预组托',
                                      icon: null,
                                      childNode: [],
                                    },
                                    {
                                      id: 60,
                                      moduleId: null,
                                      moduleName: null,
                                      parentId: 313321,
                                      status: null,
                                      configName: '非标单预组托',
                                      icon: null,
                                      childNode: [],
                                    },
                                    {
                                      id: 61,
                                      moduleId: null,
                                      moduleName: null,
                                      parentId: 313321,
                                      status: null,
                                      configName: '单票订单组托',
                                      icon: null,
                                      childNode: [],
                                    },
                                    {
                                      id: 62,
                                      moduleId: null,
                                      moduleName: null,
                                      parentId: 313321,
                                      status: null,
                                      configName: '尾箱订单组托',
                                      icon: null,
                                      childNode: [],
                                    },
                                    {
                                      id: 63,
                                      moduleId: null,
                                      moduleName: null,
                                      parentId: 313321,
                                      status: null,
                                      configName: '混码订单组托',
                                      icon: null,
                                      childNode: [],
                                    },
                                    {
                                      id: 64,
                                      moduleId: null,
                                      moduleName: null,
                                      parentId: 313321,
                                      status: null,
                                      configName: '混码强排学习',
                                      icon: null,
                                      childNode: [],
                                    },
                                  ],
                                },
                                {
                                  id: 53,
                                  moduleId: null,
                                  moduleName: '',
                                  parentId: 31332,
                                  status: null,
                                  configName: 'PROCESS',
                                  icon: null,
                                  childNode: [
                                    {
                                      id: 65,
                                      moduleId: null,
                                      moduleName: null,
                                      parentId: 313322,
                                      status: null,
                                      configName: '订单数据同步',
                                      icon: null,
                                      childNode: [],
                                    },
                                    {
                                      id: 66,
                                      moduleId: null,
                                      moduleName: null,
                                      parentId: 313322,
                                      status: null,
                                      configName: '码垛方案展示',
                                      icon: null,
                                      childNode: [],
                                    },
                                  ],
                                },
                                {
                                  id: 54,
                                  moduleId: null,
                                  moduleName: '',
                                  parentId: 31332,
                                  status: null,
                                  configName: 'OUTPUT',
                                  icon: null,
                                  childNode: [
                                    {
                                      id: 67,
                                      moduleId: null,
                                      moduleName: null,
                                      parentId: 313323,
                                      status: null,
                                      configName: '码垛数据输出',
                                      icon: null,
                                      childNode: [],
                                    },
                                  ],
                                },
                                {
                                  id: 55,
                                  moduleId: null,
                                  moduleName: '',
                                  parentId: 31332,
                                  status: null,
                                  configName: 'DECISION',
                                  icon: null,
                                  childNode: [
                                    {
                                      id: 68,
                                      moduleId: null,
                                      moduleName: null,
                                      parentId: 313324,
                                      status: null,
                                      configName: '超时判断',
                                      icon: null,
                                      childNode: [],
                                    },
                                    {
                                      id: 69,
                                      moduleId: null,
                                      moduleName: null,
                                      parentId: 313324,
                                      status: null,
                                      configName: '待码单量',
                                      icon: null,
                                      childNode: [],
                                    },
                                    {
                                      id: 70,
                                      moduleId: null,
                                      moduleName: null,
                                      parentId: 313324,
                                      status: null,
                                      configName: '标单判断',
                                      icon: null,
                                      childNode: [],
                                    },
                                    {
                                      id: 71,
                                      moduleId: null,
                                      moduleName: null,
                                      parentId: 313324,
                                      status: null,
                                      configName: '尾箱数量',
                                      icon: null,
                                      childNode: [],
                                    },
                                    {
                                      id: 72,
                                      moduleId: null,
                                      moduleName: null,
                                      parentId: 313324,
                                      status: null,
                                      configName: '海关项号',
                                      icon: null,
                                      childNode: [],
                                    },
                                    {
                                      id: 73,
                                      moduleId: null,
                                      moduleName: null,
                                      parentId: 313324,
                                      status: null,
                                      configName: '急单判断',
                                      icon: null,
                                      childNode: [],
                                    },
                                    {
                                      id: 74,
                                      moduleId: null,
                                      moduleName: null,
                                      parentId: 313324,
                                      status: null,
                                      configName: '混码指标',
                                      icon: null,
                                      childNode: [],
                                    },
                                  ],
                                },
                                {
                                  id: 56,
                                  moduleId: null,
                                  moduleName: '',
                                  parentId: 31332,
                                  status: null,
                                  configName: '_Input',
                                  icon: null,
                                  childNode: [],
                                },
                                {
                                  id: 57,
                                  moduleId: null,
                                  moduleName: '',
                                  parentId: 31332,
                                  status: null,
                                  configName: '_Output',
                                  icon: null,
                                  childNode: [],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: 45,
                          moduleId: null,
                          moduleName: '暂存装车',
                          parentId: 313,
                          status: 'Active',
                          configName: null,
                          icon: null,
                          childNode: [
                            {
                              id: 75,
                              moduleId: null,
                              moduleName: '车货动态匹配',
                              parentId: 3134,
                              status: 'Disabled',
                              configName: null,
                              icon: null,
                              childNode: [],
                            },
                            {
                              id: 76,
                              moduleId: null,
                              moduleName: '装车空间优化',
                              parentId: 3134,
                              status: 'Disabled',
                              configName: null,
                              icon: null,
                              childNode: [],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 7,
                  moduleId: null,
                  moduleName: '物流-自动仓',
                  parentId: 3,
                  status: 'Disabled',
                  configName: null,
                  icon: null,
                  childNode: [],
                },
                {
                  id: 8,
                  moduleId: null,
                  moduleName: '物流-综合仓',
                  parentId: 3,
                  status: 'Disabled',
                  configName: null,
                  icon: null,
                  childNode: [],
                },
                {
                  id: 9,
                  moduleId: null,
                  moduleName: '电商-传统仓',
                  parentId: 3,
                  status: 'Disabled',
                  configName: null,
                  icon: null,
                  childNode: [],
                },
                {
                  id: 10,
                  moduleId: null,
                  moduleName: '电商-自动仓',
                  parentId: 3,
                  status: 'Disabled',
                  configName: null,
                  icon: null,
                  childNode: [],
                },
                {
                  id: 11,
                  moduleId: null,
                  moduleName: '电商-综合仓',
                  parentId: 3,
                  status: 'Disabled',
                  configName: null,
                  icon: null,
                  childNode: [],
                },
                {
                  id: 12,
                  moduleId: null,
                  moduleName: '制造-传统仓',
                  parentId: 3,
                  status: 'Disabled',
                  configName: null,
                  icon: null,
                  childNode: [],
                },
                {
                  id: 13,
                  moduleId: null,
                  moduleName: '制造-自动仓',
                  parentId: 3,
                  status: 'Disabled',
                  configName: null,
                  icon: null,
                  childNode: [],
                },
                {
                  id: 14,
                  moduleId: null,
                  moduleName: '制造-综合仓',
                  parentId: 3,
                  status: 'Disabled',
                  configName: null,
                  icon: null,
                  childNode: [],
                },
              ],
            },
            {
              id: 4,
              moduleId: null,
              moduleName: '物流',
              parentId: 0,
              status: 'Active',
              configName: null,
              icon: null,
              childNode: [],
            },
            {
              id: 5,
              moduleId: null,
              moduleName: '销售',
              parentId: 0,
              status: 'Active',
              configName: null,
              icon: null,
              childNode: [],
            },
          ],
        },
      ],
      selectTypes: {},
      breadcrumb: [],
    };
  },
  created() {
    // TODO 需要访问后端地址获取详细信息
    // /menu/finAllMenu
    // this.types = HTTPResponse();

    this.choiceTypeClick(this.types[0]);
  },
  methods: {
    open() {
      this.dialogVisible = !this.dialogVisible;
    },

    choiceTypeClick(element) {
      if (element.status && element.status === 'Active') {
        this.breadcrumb.push(element.moduleName);
        this.selectTypes = element || {};
      }
    },
    choiceTypeByNameClick: function (name, index) {
      // Default SelectTypes Is All Types;
      let selectTypes = this.types[0];
      if (index != 0) {
        for (let sliceElement of [...this.breadcrumb.slice(1, index + 1)]) {
          let findItem = selectTypes.childNode.find(
            (i) => i.moduleName == sliceElement
          );
          if (findItem) {
            selectTypes = findItem;
          } else {
            break;
          }
        }
        this.breadcrumb = this.breadcrumb.slice(0, index);
      } else {
        this.breadcrumb = [];
      }
      this.choiceTypeClick(selectTypes);
    },

    createNew() {
      this.$emit('onClose');
    },
    selectTemplate() {
      this.$refs['selectProcessBanner'].open('template', this.selectTypes.id);
    },
    selectHistory() {
      this.$refs['selectProcessBanner'].open('history', this.selectTypes.id);
    },
  },
};
</script>

<style scoped>
</style>
