const mutations = {
  setGroup(state, payload) {
    console.log('here');
    console.log(state);
    state.app.rules = payload;
    console.log(state.rules);
  }
};

export default mutations;
