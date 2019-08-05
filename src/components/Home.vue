<template>
  <Row type="flex" justify="center" align="middle">
    <i-col class="home-main-column">
      <Row class="home-main-title">
        <Row>
          <h1>Welcome to Revenue Group</h1>
        </Row>
        <Row class="home-create-rule-button-container">
          <Button
            size="large"
            shape="circle"
            class="home-create-rule-button"
            @click="createNewOnClick"
          >Create Rule</Button>
        </Row>
        <Row>
          <Table border :columns="groupColumns" :data="rules"></Table>
        </Row>
      </Row>
    </i-col>
    <RuleModal :rule-modal-bus="ruleModalBus" @close-modal="hideFormModal" />
  </Row>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import RuleModal from "./ModalView";
import Vue from "vue";
export default {
  components: {
    RuleModal
  },
  data() {
    return {
      ruleModalBus: new Vue(),
      rules: [],
      groupColumns: [
        {
          title: "Title",
          key: "title",
          width: 780
        },
        {
          title: "Condition 1",
          key: "condition1",
          width: 300,
          render: (h, params) => {
            let row = params.row;
            return h("p", row.condition1);
          }
        },
        {
          title: "No. of rules",
          key: "rule",
          width: 200,
          render: (h, params) => {
            let row = params.row;
            return h("p", row.rule.length);
          }
        },
        {
          title: "Revenue (%)",
          key: "revenue",
          width: 200,
          render: (h, params) => {
            let row = params.row;
            return h("p", row.revenue);
          }
        },
        {
          title: "Action",
          width: 245,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            let row = params.row;

            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      let selected = params.index;
                      this.setSelected(selected);
                      this.ruleModalBus.$emit("viewRuleModal");
                    }
                  }
                },
                "View"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.deleteGroup(params.index);
                    }
                  }
                },
                "Delete"
              )
            ]);
          }
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["getGroup"])
  },
  methods: {
    ...mapMutations(["deleteGroup", "setSelected"]),
    createNewOnClick() {
      //open new modal
      this.ruleModalBus.$emit("openRuleModal");
    },
    retrieveData() {
      this.rules = this.getGroup;
    },
    hideFormModal() {
      this.retrieveData();
    }
  }
};
</script>

<style scoped>
.home-main-column {
  height: 100vh;
  width: 90%;
  text-align: center;
}
.home-main-title {
  top: 30%;
}
.home-create-rule-button-container {
  margin: 20px;
}
.home-create-rule-button {
  background-color: #512da8;
  color: white;
}
.home-create-rule-button:hover {
  color: #512da8;
  background-color: white;
  border-color: #512da8;
}
</style>
