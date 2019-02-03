<template>

  <Page>
    <ActionBar :title="tabName" android:flat="true" />

    <GridLayout rows="*,auto" columns="auto">
      <wallets row="0" v-if="selectedTab === 'wallets'" />
      <shops row="0" v-if="selectedTab === 'shops'" />
      <user row="0" v-if="selectedTab === 'settings'" />
      <navBottom row="1" />
    </GridLayout>

  </Page>

</template>

<script>
import navBottom from '../components/utils/navBottom'
import wallets from '../components/wallets'
import user from '../components/user'
import shops from '../components/shops'
import {mapGetters} from 'vuex'

export default {
  components: {navBottom, wallets, user, shops},
  computed: {
    ...mapGetters('app_global', ['selectedTab']),
    tabName: function () {
      switch (this.selectedTab) {
        default:
          return "Loading...";
        case 'wallets':
          return "Wallets";
        case 'shops':
          return 'Merchants';
        case 'settings':
          return 'Settings';
      }//
    }
  },
}
</script>

<style lang="scss">
ActionBar {
  background-color: #efefef;
  border-color: #b0b0b0;
  border-bottom-width: 1;
  /*color: #666666;*/
}

.message {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
}

.home-page-content {
  padding-top: 15;
  background: white;
}

.home-page-content .balance-chart {
  background-color: #ffffff;
  border-radius: 5;
  margin-left: 15;
  margin-right: 15;
  border-color: #f1f5f8;
  border-width: 1;
}


.home-page-content .balance-chart {
  padding: 7.5;
}

.home-page-content .balance-summary {
  text-align: center;
  vertical-align: middle;
}

.home-page-content .balance-summary StackLayout {
  padding-left: 20;
  padding-right: 20;
}

.home-page-content .balance-summary .title {
  color: #606f7b;
  font-size: 12;
  margin-bottom: 5;
}

.home-page-content .balance-summary .ammount {
  color: #3d4852;
  font-size: 16;
  font-weight: 600;
  margin-bottom: 5;
}

.home-page-content .balance-summary .hr-light {
  height: 3;
}

.home-page-content .balance-summary .hr-light.green {
  background-color: #38c172;
}

.home-page-content .balance-summary .hr-light.red {
  background-color: #e3342f;
}

.home-page-content .expenses-chart {
  padding-left: 15;
  padding-right: 15;
}

.home-page-content .expenses-chart Label {
  font-size: 16;
  text-align: center;
  color: #3d4852;
}

.page {
  background-color: #f1f5f8;
}

.action-bar {
  background-color: #f1f5f8;
  border-width: 1;
  border-color: transparent;
}

.action-bar .action-item {
  color: black;
}

.action-bar .action-bar-title {
  color: #3d4852;
  font-size: 20;
}

.user-picture {
  border-radius: 100;
}
</style>
