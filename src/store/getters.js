const getters = {
  getGroup(state) {
    return state.app.rules;
  },
  getSelected(state) {
    return state.app.selected;
  }
};
export default getters;
