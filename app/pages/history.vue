<template>
  <Page>
    <ActionBar :title="current.name+' wallet'"></ActionBar>
    <ActivityIndicator v-if="!load" #activityIndicator :busy="!load" width="100" height="100"
                       class="activity-indicator"></ActivityIndicator>
    <StackLayout v-else>

      <FlexboxLayout padding="30" margin="40" width="100%"
                     background="linear-gradient(to bottom, #4BCC67,#4BCC67)" justifyContent="space-around"
                     borderRadius="40 40 0 0">
        <Label @tap="$navigateTo(exchange,{transition:{name:'slideTop'},props:{current}})" textAlignment="center"
               color="white" fontSize="14" fontWeight="bold" width="45%" class="fa">EXCHANGE
          {{'fa-exchange-alt'|fonticon}}</Label>
        <Label textAlignment="center" color="white" fontSize="16" fontWeight="bold" width="10%" text="|" />
        <Label textAlignment="center" color="white" fontSize="16" fontWeight="bold" width="45%" class="fa">WITHDRAWAL
          {{'fa-hand-holding-usd'|fonticon}}</Label>
      </FlexboxLayout>

      <ListView class="list-group" for="s in data" height="*" @itemTap="">
        <v-template>
          <GridLayout class="list-group-item" rows="auto, *" columns="30, *, 90">
            <Label row="0" col="0" :text="'fa-level-up' | fonticon" class="fa in-tx" v-if="s.side === 'Out'"
                   rowSpan="2" />
            <Label row="0" col="0" :text="'fa-level-down' | fonticon" class="fa out-tx" v-if="s.side === 'In'"
                   rowSpan="2" />
            <Label row="0" col="1" :text="s.type" class="list-group-item-heading" />
            <Label row="1" col="1" :text="s.comment" class="list-group-item-text" />
            <Label v-if="s.side === 'In'" row="0" col="2" :text="'+ ' + Number(s.amount).toFixed(4)"
                   class="list-group-item-heading right-amount" color="green"/>
            <Label v-if="s.side === 'Out'" row="0" col="2" :text="'- ' + Number(s.amount).toFixed(4)"
                   class="list-group-item-heading right-amount" color="red"/>

            <Label row="1" col="2" :text="s.currency" class="list-group-item-text right-amount" />
          </GridLayout>
        </v-template>
      </ListView>
    </StackLayout>

  </Page>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import exchange from './exchange'

export default {
  props: ['current'],
  data() {
    return {
      exchange
    }
  },
  computed: {
    ...mapGetters('wallets', ['wallets']),
    ...mapGetters('transactions', ['load', 'data', 'current_page', 'total_pages']),
  },
  methods: {
    ...mapActions('transactions', ['getList']),
  },
  mounted() {
    this.getList({currency: this.current.symbol.toUpperCase()})
  }
}
</script>
<style>
.in-tx {
  font-size: 26;
  horizontal-align: center;
  vertical-align: center;
  color: red;
}

.out-tx {
  font-size: 26;
  horizontal-align: center;
  vertical-align: center;
  color: green;
}

.right-amount {
  horizontal-align: right;

}

</style>
