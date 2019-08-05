const mutations = {
  setGroup(state, payload) {
    state.app.rules.push({ ...payload });
  },
  setSelected(state, payload) {
    state.app.selected = payload;
  },
  deleteGroup(state, payload) {
    state.app.rules.splice(payload, 1);
  },
  setSelectedGroup(state, payload) {
    state.app.rules[payload.selected] = payload.rules;
  }
};

export default mutations;
