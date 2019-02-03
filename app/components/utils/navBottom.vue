<template>

  <FlexboxLayout class="navBottom" alignItems="center" width="100%" height="51" justifyContent="space-around">
    <FlexboxLayout :class="{active:selectedTab==='wallets'}" class="nav" flexDirection="column" alignItems="center"
                   @tap="changeTab('wallets')">
      <Label row="0" :text="'fa-wallet' | fonticon" class="navIcon fa"></Label>
      <Label row="0" text="Wallets" class="navText"></Label>
    </FlexboxLayout>
    <FlexboxLayout :class="{active:selectedTab==='shops'}" class="nav" flexDirection="column" alignItems="center"
                   @tap="changeTab('shops')">
      <Label row="0" :text="'fa-store' | fonticon" class="navIcon fa"></Label>
      <Label row="1" text="Merchants" class="navText"></Label>
    </FlexboxLayout>
    <FlexboxLayout :class="{active:selectedTab==='settings'}" class="nav" flexDirection="column" alignItems="center"
                   @tap="changeTab('settings')">
      <Label row="0" :text="'fa-cog' | fonticon" class="navIcon fa"></Label>
      <Label row="1" text="Settings" class="navText"></Label>
    </FlexboxLayout>


  </FlexboxLayout>
</template>
<script>
import {mapMutations, mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters('app_global', ['selectedTab'])
  },
  methods: {
    ...mapMutations('app_global', {changeTab: 'tab'})
  }
};
</script>

<style>
.navBottom {
  background-color: #f5f5f5;
  border-color: #919191;
  border-top-width: 0.4;
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