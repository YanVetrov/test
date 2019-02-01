<template>
  <Page>
    <ActionBar :title="'History of '+current.name+' wallet'"></ActionBar>
    <ActivityIndicator v-if="!load" #activityIndicator :busy="!load" width="100" height="100"
                       class="activity-indicator"></ActivityIndicator>

    <ListView v-else class="list-group" for="s in data" height="*" @itemTap="">
      <v-template>
        <GridLayout class="list-group-item" rows="auto, *" columns="50, *, 90">
          <Image row="0" col="0" :src="'~/assets/images/level-up.svg'" class="thumb img-circle"
                 rowSpan="2"></Image>
          <Label row="0" col="1" :text="s.type" class="list-group-item-heading" />
          <Label row="1" col="1" :text="s.comment" class="list-group-item-text" />
          <Label v-if="s.side === 'In'" row="0" col="2" :text="'+ ' + Number(s.amount)" class="list-group-item-heading" />
          <Label v-if="s.side === 'Out'" row="0" col="2" :text="'- ' + Number(s.amount)" class="list-group-item-heading" />

          <Label row="1" col="2" :text="s.currency" class="list-group-item-text" />
        </GridLayout>
      </v-template>
    </ListView>

  </Page>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  props: ['current'],
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
