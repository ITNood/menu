<template>
  <el-dialog
      title="选择流程"
      :visible.sync="dialogVisible"
      width="90%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :before-close="handleClose" append-to-body>

    <select-language/>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item,index) in breadcrumb" :key="index">
          <span v-on:click="choiceTypeByNameClick(item,index)">{{ item }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-divider></el-divider>

    <el-row>
      <el-col :span="20">
        <el-row v-if="selectTypes && selectTypes.Status && selectTypes.Status === 'Active'">
          <el-col :span="4" v-for="(name, index) in Object.keys(selectTypes['Elements'])" :key="index"
                  :offset="index%4 > 0 ? 2 : 1">
            <transition name="el-fade-in">
              <el-card
                  :shadow="(selectTypes['Elements'][name]['Status'] && selectTypes['Elements'][name]['Status'] === 'Active')?'hover':'never'">
                <div v-on:click="choiceTypeClick(name,selectTypes['Elements'][name])">
                  <el-image
                      :src="'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'">
                    <div slot="placeholder" class="image-slot">
                      {{ $t('el.select.loading') }}<span class="dot">...</span>
                    </div>
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <div style="padding: 14px;text-align: center; ">
                    <span>{{ name }}</span>
                    <span
                        v-if="selectTypes['Elements'][name]['Status'] && selectTypes['Elements'][name]['Status'] === 'Active'">( 可用 )</span>
                    <span v-else>( 不可用 )</span>
                  </div>
                </div>
              </el-card>
            </transition>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        选择面板
      </el-col>
    </el-row>

    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">{{$t('el.messagebox.cancel')}}</el-button>
    <el-button type="primary" @click="dialogVisible = false">{{$t('el.messagebox.confirm')}}</el-button>
  </span>
  </el-dialog>
</template>

<script>
import 'element-ui/lib/theme-chalk/base.css';
import SelectLanguage from "@/i18n/SelectLanguage";
// 用于选择流程类型和配置相关属性
export default {

  name: "SelectTypePanel",
  components: {SelectLanguage},
  props: {
    'visible': Boolean
  },
  watch: {
    'visible'(newValue) {
      this.dialogVisible = newValue;
    }
  },
  data() {
    return {
      dialogVisible: false,
      types: {
        "Status": "Active",
        "Elements": {
          "采购": {
            "Status": "Disabled",
            "Elements": {}
          },
          "生产": {
            "Status": "Disabled",
            "Elements": {}
          },
          "仓储": {
            "Status": "Active",
            "Elements": {
              "物流-传统仓": {
                "Status": "Active",
                "Elements": {
                  "入库环节": {
                    "Status": "Active",
                    "Elements": {
                      "月台分配": {
                        "Status": "Active",
                        "Elements": {
                          "进港时序预测": {
                            "Status": "Disabled",
                            "Config": {}
                          },
                          "码头分配规划": {
                            "Status": "Disabled",
                            "Config": {}
                          }
                        }
                      },
                      "卸货验收": {
                        "Status": "Active",
                        "Elements": {
                          "卸货任务指派": {
                            "Status": "Disabled",
                            "Config": {}
                          },
                          "库存拆分组合": {
                            "Status": "Disabled",
                            "Config": {}
                          }
                        }
                      },
                      "库位分配": {
                        "Status": "Active",
                        "Elements": {
                          "库位指派规划": {
                            "Status": "Disabled",
                            "Config": {}
                          },
                          "库位动态调整": {
                            "Status": "Disabled",
                            "Config": {}
                          }
                        }
                      },
                      "转运上架": {
                        "Status": "Active",
                        "Elements": {
                          "转运时序调度": {
                            "Status": "Disabled",
                            "Config": {}
                          },
                          "上架任务指派": {
                            "Status": "Disabled",
                            "Config": {}
                          }
                        }
                      }
                    }
                  },
                  "资源调度": {
                    "Status": "Active",
                    "Elements": {
                      "排班规划": {
                        "Status": "Active",
                        "Elements": {
                          "周期排班规划": {
                            "Status": "Disabled",
                            "Config": {}
                          },
                          "班次调整规划": {
                            "Status": "Disabled",
                            "Config": {}
                          }
                        }
                      },
                      "岗位调度": {
                        "Status": "Active",
                        "Elements": {
                          "岗位班次分配": {
                            "Status": "Disabled",
                            "Config": {}
                          },
                          "岗位动态调度": {
                            "Status": "Disabled",
                            "Config": {}
                          }
                        }
                      },
                      "叉车调度": {
                        "Status": "Active",
                        "Elements": {
                          "任务指派调度": {
                            "Status": "Disabled",
                            "Config": {}
                          },
                          "动态路径规划": {
                            "Status": "Disabled",
                            "Config": {}
                          }
                        }
                      },
                      "补货规划": {
                        "Status": "Active",
                        "Elements": {
                          "补货数量规划": {
                            "Status": "Disabled",
                            "Config": {}
                          },
                          "补货波次优化": {
                            "Status": "Disabled",
                            "Config": {}
                          }
                        }
                      }
                    }
                  },
                  "出库环节": {
                    "Status": "Active",
                    "Elements": {
                      "下架分单": {
                        "Status": "Active",
                        "Elements": {
                          "下架任务指派": {
                            "Status": "Disabled",
                            "Config": {}
                          },
                          "平衡分单规划": {
                            "Status": "Disabled",
                            "Config": {}
                          }
                        }
                      },
                      "拣货汇单": {
                        "Status": "Active",
                        "Elements": {
                          "拣货时序规划": {
                            "Status": "Disabled",
                            "Config": {}
                          },
                          "拣货路径规划": {
                            "Status": "Disabled",
                            "Config": {}
                          }
                        }
                      },
                      "包装码垛": {
                        "Status": "Active",
                        "Elements": {
                          "包装箱型推荐": {
                            "Status": "Disabled",
                            "Config": {}
                          },
                          "拼托混码优化": {
                            "Status": "Active",
                            "Config": {
                              "SUBFLOW": {
                                "订单分组分类": {},
                                "标准单预组托": {},
                                "非标单预组托": {},
                                "单票订单组托": {},
                                "尾箱订单组托": {},
                                "混码订单组托": {},
                                "混码强排学习": {}
                              },
                              "PROCESS": {
                                "订单数据同步": {},
                                "码垛方案展示": {}
                              },
                              "OUTPUT": {
                                "码垛数据输出": {}
                              },
                              "DECISION": {
                                "超时判断": {},
                                "待码单量": {},
                                "标单判断": {},
                                "尾箱数量": {},
                                "海关项号": {},
                                "急单判断": {},
                                "混码指标": {}
                              },
                              "_Input": {},
                              "_Output": {}
                            }
                          }
                        }
                      },
                      "暂存装车": {
                        "Status": "Active",
                        "Elements": {
                          "车货动态匹配": {
                            "Status": "Disabled",
                            "Config": {}
                          },
                          "装车空间优化": {
                            "Status": "Disabled",
                            "Config": {}
                          }
                        }
                      }
                    }
                  }
                }
              },
              "物流-自动仓": {
                "Status": "Disabled",
                "Elements": {}
              },
              "物流-综合仓": {
                "Status": "Disabled",
                "Elements": {}
              },
              "电商-传统仓": {
                "Status": "Disabled",
                "Elements": {}
              },
              "电商-自动仓": {
                "Status": "Disabled",
                "Elements": {}
              },
              "电商-综合仓": {
                "Status": "Disabled",
                "Elements": {}
              },
              "制造-传统仓": {
                "Status": "Disabled",
                "Elements": {}
              },
              "制造-自动仓": {
                "Status": "Disabled",
                "Elements": {}
              },
              "制造-综合仓": {
                "Status": "Disabled",
                "Elements": {}
              }
            }
          },
          "物流": {
            "Status": "Disabled",
            "Elements": {}
          },
          "销售": {
            "Status": "Disabled",
            "Elements": {}
          }
        }
      },
      selectTypes: {},
      breadcrumb: ['开始']
    }
  },
  created() {
    this.dialogVisible = this.visible;
    this.selectTypes = this.types
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            this.$emit("onClose")
          }).catch(_ => {
      });
    },
    choiceTypeClick(name, element) {
      if (element['Status'] && element['Status'] === 'Active') {
        this.breadcrumb.push(name)
        this.selectTypes = element || {}
      }
    },
    choiceTypeByNameClick(name, index) {
      let selectTypes = this.types;
      if (index != 0) {
        this.breadcrumb = this.breadcrumb.slice(0, index);

        for (let sliceElement of [...this.breadcrumb.slice(1), name]) {
          selectTypes = selectTypes.Elements[sliceElement]
        }
        this.choiceTypeClick(name, selectTypes)
      } else {
        this.breadcrumb = ['开始'];
        this.selectTypes = this.types;
      }
    },
  }
}
</script>

<style scoped>

</style>
