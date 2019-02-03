<template>
  <ScrollView>
    <StackLayout class="home-panel">
      <ListView class="list-group" for="item in data" height="160" @itemTap="goHistoryWallet">
        <v-template>
          <GridLayout class="list-group-item" rows="auto, auto" columns="70, 120,*,*,*">
            <Image row="0" col="0" :src="'~/assets/images/'+item.symbol+'.png'" class="thumb img-circle"
                   rowSpan="2"></Image>
            <Label row="0" col="1" :text="item.name" class="list-group-item-heading" />
            <Label row="1" col="1" :text="item.balance + ' ' + item.symbol" class="list-group-item-text" />
          </GridLayout>

        </v-template>

      </ListView>


      <FlexboxLayout>

      </FlexboxLayout>
      <Label v-if="data.length<1" class="p-20" textWrap="true"
             text="Wallets not found, sorry." />
    </StackLayout>
  </ScrollView>
</template>

<script>
import login from '../pages/login'
import {mapActions, mapGetters} from 'vuex'
import exchange from '../pages/exchange'
import history from '../pages/history'

export default {
  data() {
    return {
      login,
      exchange,
      history
    }
  },
  computed: {
    ...mapGetters('wallets', ['load', 'data']),
  },
  methods: {
    ...mapActions('wallets', ['getList']),
    goHistoryWallet(event) {
      console.log(event);
      this.$navigateTo(this.history, {transition: {name: 'fadeOut'}, props: {current: event.item}})
    }
  },
  created() {
    this.getList({})
  }
}
</script>
<style>

/*.card {*/
  /*background-color: #fff;*/
  /*color: #4d4d4d;*/
  /*margin: 15 15 0;*/
/*}*/

/*.card-layout {*/
  /*padding: 20;*/
/*}*/

/*.card-layout .h1 {*/
  /*margin-bottom: 15;*/
  /*color: black;*/
/*}*/

/*.butt {*/
  /*width: 50%;*/
  /*color: white;*/
/*}*/
</style>