<template>
  <Row type="flex" justify="center" align="middle">
    <i-col class="home-main-column">
      <Row class="home-main-title">
        <Row>
          <h1>Hi new project</h1>
        </Row>
        <Row class="home-create-rule-button-container">
          <Button
            size="large"
            shape="circle"
            class="home-create-rule-button"
            @click="createNewOnClick"
          >Create Rule</Button>
        </Row>
      </Row>
    </i-col>
    <RuleModal :rule-modal-bus="ruleModalBus" />
  </Row>
</template>

<script>
import RuleModal from "./ModalView";
import Vue from "vue";
export default {
  components: {
    RuleModal
  },
  data() {
    return {
      ruleModalBus: new Vue()
    };
  },
  methods: {
    createNewOnClick() {
      this.ruleModalBus.$emit("openRuleModal");
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
