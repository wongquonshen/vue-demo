const mutations = {
  setGroup(state, payload) {
    state.app.rules.push({ ...payload });
  }
};

export default mutations;
