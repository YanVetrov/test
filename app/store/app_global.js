export const state = () => ({
  selectedTab: 'wallets'
});
export const getters = {
  selectedTab: state => state.selectedTab
};
export const mutations = {
  tab: (state, tab) => state.selectedTab = tab,
};
export const namespaced=true
export const actions = {
  async changeTab({commit}, tab) {
    commit('tab', tab);
  },
};