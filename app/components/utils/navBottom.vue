<template>
  <GridLayout class="navBottom" height="50" width="100%" row="3" rows="auto"
              columns="auto,auto,auto">
    <GridLayout :class="{active:selectedTab==='wallets'}" @tap="changeTab('wallets')" rows="*,auto"
                cols="auto" class="nav" col="0" row="0" width="33.33%">
      <Label row="0" :text="'fa-wallet' | fonticon" class="navIcon fa"></Label>
      <Label row="1" text="Wallets" class="navText"></Label>
    </GridLayout>
    <GridLayout :class="selectedTab==='shops' ? 'active' : ''" @tap="changeTab('shops')" rows="*,auto"
                cols="auto" class="nav" col="1" row="0" width="33.33%">
      <Label row="0" :text="'fa-store' | fonticon" class="navIcon fa"></Label>
      <Label row="1" text="Merchants" class="navText"></Label>
    </GridLayout>

    <GridLayout :class="selectedTab==='settings' ? 'active' : ''" @tap="changeTab('settings')" rows="*,auto"
                cols="auto" class="nav" col="2" row="0" width="33.33%">
      <Label row="0" :text="'fa-cog' | fonticon" class="navIcon fa"></Label>
      <Label row="1" text="Settings" class="navText"></Label>
    </GridLayout>

  </GridLayout>
</template>
<script>
import {mapMutations, mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters('app_global', ['selectedTab'])
  },
  methods: {
    ...mapMutations('app_global', {changeTab:'tab'})
  }
};
</script>

<style>
.navBottom {
  background-color: #f5f5f5;
  border-color: #919191;
  border-top-width: 0.4;
}

.nav {
  height: 100%;
  width: 100%;
}

.navIcon {
  horizontal-align: center;
  vertical-align: center;
  font-size: 24;
  height: 25;
  color: #666666;
}

.navText {
  margin-bottom: 2;
  font-size: 12;
  /* color: #c43776; */
  color: #666666;
  horizontal-align: center;
}

.nav.active .navIcon {
  color: #2148ff;
}

.nav.active .navText {
  color: #2148ff;
}
</style>