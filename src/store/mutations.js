const mutations = {
  setGroup(state, payload) {
    state.app.rules.push({ ...payload });
  },
  deleteGroup(state, payload) {
    state.app.rules.splice(payload, 1);
  }
};

export default mutations;
