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

<style scoped>

</style>