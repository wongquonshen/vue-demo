<template>
  <Modal v-model="displayModal" width="1200">
    <Row type="flex" class="modal-main-container">
      <i-col span="24">
        <Row class="modal-title-container">
          <span>Add Revenue Group</span>
        </Row>
        <Row class="modal-form-container">
          <Form ref="ruleForm" :model="ruleFormItem" :rules="ruleFormValidate" label-position="top">
            <FormItem label="Revenue Group Title" prop="title">
              <Row class="modal-title-input">
                <i-col span="22">
                  <Input type="text" v-model="ruleFormItem.title" placeholder="Enter title here" />
                </i-col>
              </Row>
            </FormItem>
            <FormItem prop="condition1">
              <Row>
                <i-col span="22">
                  <i-col span="1">
                    <p>If</p>
                  </i-col>
                  <i-col span="4">
                    <Select v-model="ruleFormItem.condition1" placeholder="Select 1st condition">
                      <Option
                        v-for="item in formOption.condition1Options"
                        :key="item.id"
                        :value="item.text"
                      >{{ item.text }}</Option>
                    </Select>
                  </i-col>
                  <i-col span="6">
                    <p>&nbsp of the below condition are met</p>
                  </i-col>
                </i-col>
              </Row>
            </FormItem>
            <FormItem prop="rule">
              <Row
                v-for="(value, index) in ruleFormItem.rule"
                :key="index"
                class="modal-new-rule-list-container"
              >
                <Row>
                  <i-col span="3" class="modal-rule-condition2-selector">
                    <Select
                      v-model="ruleFormItem.rule[index].condition2"
                      placeholder="Select 2nd condition"
                    >
                      <Option
                        v-for="item in formOption.condition2Options"
                        :key="item.id"
                        :value="item.text"
                      >{{ item.text }}</Option>
                    </Select>
                  </i-col>
                  <i-col span="3" class="modal-rule-condition3-selector">
                    <Select
                      v-model="ruleFormItem.rule[index].condition3"
                      placeholder="Select 3rd condition"
                    >
                      <Option
                        v-for="item in formOption.condition3Options"
                        :key="item.id"
                        :value="item.text"
                      >{{ item.text }}</Option>
                    </Select>
                  </i-col>
                  <i-col span="15">
                    <Row
                      v-for="(valueP, indexP) in ruleFormItem.rule[index].parameters"
                      :key="valueP.id"
                    >
                      <i-col span="15">
                        <Input
                          type="text"
                          v-model="ruleFormItem.rule[index].parameters[indexP].text"
                          placeholder="Insert parameter"
                        />
                      </i-col>
                      <i-col
                        span="4"
                        class="remove-parameter-button-container"
                        v-if="ruleFormItem.rule[index].parameters && ruleFormItem.rule[index].parameters.length > 1"
                      >
                        <Button
                          @click="removeParameter(index, indexP)"
                          class="remove-parameter-button"
                        >Remove rule</Button>
                      </i-col>
                      <i-col span="4" class="add-parameter-button-container">
                        <Button
                          v-if="ruleFormItem.rule[index].parameters.length == (indexP + 1)"
                          @click="addParameter(index)"
                          class="add-parameter-button"
                        >Add rule</Button>
                      </i-col>
                    </Row>
                  </i-col>
                  <i-col span="1" class="add-rule-button-container">
                    <Button
                      @click="removeRule(index)"
                      v-if="ruleFormItem.rule.length === 1"
                      class="remove-rule-button"
                      disabled
                    >
                      <Icon type="ios-remove-circle-outline" size="28" />
                    </Button>
                    <Button
                      @click="removeRule(index)"
                      v-if="ruleFormItem.rule.length !== 1"
                      class="remove-rule-button"
                    >
                      <Icon type="ios-remove-circle-outline" size="28" />
                    </Button>
                  </i-col>
                  <i-col span="1" class="remove-rule-button-container">
                    <Button @click="addRule('ruleFormItem')" class="add-rule-button">
                      <Icon type="ios-add-circle-outline" size="28" />
                    </Button>
                  </i-col>
                </Row>
              </Row>
            </FormItem>
            <FormItem prop="revenue">
              <Row>
                <i-col span="2">
                  <p>then revenue is</p>
                </i-col>
                <i-col span="4">
                  <InputNumber
                    v-model="ruleFormItem.revenue"
                    :formatter="value => `${value}%`"
                    :parser="value => value.replace('%', '')"
                    class="revenue-input"
                  ></InputNumber>
                </i-col>
              </Row>
            </FormItem>
          </Form>
        </Row>
      </i-col>
    </Row>
    <Row slot="footer">
      <i-col span="3">
        <Button @click="submitOnClick" class="confirm-modal-button">Confirm</Button>
      </i-col>
      <i-col span="3" class="close-modal-button-container">
        <Button @click="cancelOnClick" class="close-modal-button">Cancel</Button>
      </i-col>
    </Row>
  </Modal>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      displayModal: false,
      ruleFormItem: {
        title: "",
        condition1: "",
        rule: [
          {
            id: 1,
            condition2: "",
            condition3: "",
            parameters: [{ id: 1, text: "" }]
          }
        ],
        revenue: 0
      },
      formOption: {
        condition1Options: [
          {
            id: 0,
            text: "ALL"
          },
          {
            id: 1,
            text: "ONE"
          },
          {
            id: 2,
            text: "NONE"
          }
        ],
        condition2Options: [
          {
            id: 0,
            text: "aff_sub"
          },
          {
            id: 1,
            text: "aft_main"
          },
          {
            id: 2,
            text: "atf_optional"
          }
        ],
        condition3Options: [
          {
            id: 0,
            text: "is"
          },
          {
            id: 1,
            text: "not"
          },
          {
            id: 2,
            text: "or"
          }
        ]
      },
      ruleFormValidate: {
        title: [
          {
            required: true,
            type: "string",
            message: "There must be a title",
            trigger: "blur"
          }
        ],
        condition1: [
          {
            required: true,
            type: "string",
            message: "Select a condition",
            trigger: "blur"
          }
        ],
        revenue: [
          {
            required: true,
            type: "number",
            message: "Enter Revenue",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: ["ruleModalBus"],
  mounted() {
    this.ruleModalBus.$on("openRuleModal", () => {
      this.displayModal = true;
    });
  },
  methods: {
    ...mapMutations(["setGroup"]),
    submitOnClick() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.setGroup(this.ruleFormItem);
          this.$refs.ruleForm.resetFields();
          this.ruleFormItem.rule = [
            {
              id: 1,
              condition2: "",
              condition3: "",
              parameters: [{ id: 1, text: "" }]
            }
          ];
          this.displayModal = false;
        } else {
          this.$message.error(
            "Please check to make sure all required fields are entered."
          );
        }
      });
    },
    addRule() {
      const counter = this.ruleFormItem.rule.length;

      this.ruleFormItem.rule.push({
        id: counter + 1,
        condition2: "",
        condition3: "",
        parameters: [{ text: "" }]
      });
    },

    removeRule(index) {
      this.ruleFormItem.rule.splice(index, 1);
    },

    addParameter(index) {
      let counter = this.ruleFormItem.rule[index].parameters.length;
      this.ruleFormItem.rule[index].parameters.push({
        id: counter + 1,
        text: ""
      });
    },
    removeParameter(index, indexP) {
      this.ruleFormItem.rule[index].parameters.splice(indexP, 1);
    },
    cancelOnClick() {
      this.$refs.ruleForm.resetFields();
      this.displayModal = false;
    }
  }
};
</script>

<style scoped>
.modal-main-container {
  width: 100%;
}
.modal-title-container {
  font-size: 18px;
  font-weight: bold;
}
.modal-form-container {
  width: 100%;
  margin-top: 20px;
}
.modal-title-input {
  width: 100%;
}
.modal-new-rule-list-container {
  border: 1px solid grey;
  padding: 2%;
  background-color: #f5f5f5;
  height: 100%;
}
.modal-rule-condition2-selector,
.modal-rule-condition3-selector {
  margin: 0px 5px;
}
.add-parameter-button-container,
.remove-parameter-button-container,
.add-rule-button-container,
.remove-rule-button-container,
.close-modal-button-container {
  margin-left: 5px;
}
.add-parameter-button {
  color: blue;
  width: 100%;
}
.remove-parameter-button {
  color: red;
  width: 100%;
}
.remove-rule-button,
.add-rule-button {
  width: 100%;
  border: none;
  background-color: #f5f5f5;
}

.remove-rule-button:hover,
.add-rule-button:hover {
  background-color: #f5f5f5;
  color: none;
}
.remove-rule-button:focus,
.add-rule-button:focus {
  box-shadow: none;
}
.revenue-input {
  width: 100%;
}
.confirm-modal-button {
  width: 100%;
  color: white;
  background-color: orange;
}
.close-modal-button {
  width: 100%;
  color: white;
  background-color: grey;
}
</style>
