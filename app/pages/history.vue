<template>
    <Page>
        <ActionBar :title="current.name+' wallet'"></ActionBar>
        <ActivityIndicator v-if="!load" #activityIndicator :busy="!load" width="100" height="100"
                           class="activity-indicator"></ActivityIndicator>
        <ScrollView v-else>
            <StackLayout height="100%">

                <FlexboxLayout width="100%"
                               justifyContent="space-around"
                               borderRadius="40 40 0 0">
                    <Button background="green" @tap="$navigateTo(exchange,{transition:{name:'slideTop'},backstackVisible:false,props:{current}})"
                            textAlignment="center"
                            color="white" fontSize="20" fontWeight="bold" width="45%" class="fa">EXCHANGE {{'fa-exchange-alt'|fonticon}}
                    </Button>
                    <Button background="orange" @tap="$navigateTo(withdrawal,{transition:{name:'slideTop'},backstackVisible:false,props:{current}})"
                            v-if="current.name=='Bitcoin'" textAlignment="center" color="white" fontSize="20"
                            fontWeight="bold" width="45%" class="fa">WITHDRAWAL {{'fa-hand-holding-usd'|fonticon}}
                    </Button>
                </FlexboxLayout>

                <ListView class="list-group" for="s in data" height="*" @itemTap="showDescription">
                    <v-template>
                        <GridLayout class="list-group-item" rows="auto, *" columns="45, *, 100">
                            <Label row="0" col="0" :text="type[s.type].icon|fonticon" class="fa in-tx"
                                   v-if="s.side === 'Out'"
                                   rowSpan="2"/>
                            <Label row="0" col="0" :text="type[s.type].icon|fonticon" class="fa out-tx"
                                   v-if="s.side === 'In'"
                                   rowSpan="2"/>
                            <Label row="0" col="1" class="list-group-item-heading fa" fontSize="18">{{type[s.type].name}}</Label>
                            <Label row="1" col="1" :text="s.comment" class="list-group-item-text"/>
                            <Label v-if="s.side === 'In'" row="0" col="2" :text="'+ ' + Number(s.amount).toFixed(4) + ' ' +s.currency"
                                   class="list-group-item-heading right-amount" color="green"/>
                            <Label v-if="s.side === 'Out'" row="0" col="2" :text="'- ' + Number(s.amount).toFixed(4) + ' ' +s.currency"
                                   class="list-group-item-heading right-amount" color="red"/>

                            <Label row="1" col="2" class="list-group-item-text right-amount">{{ s.createdAt | moment("DD.MM.YYYY") }}</Label>
                        </GridLayout>
                    </v-template>
                </ListView>

            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import exchange from './exchange'
    import withdrawal from './withdrawal'


    export default {
        props: ['current'],
        data() {
            return {
                exchange,
                withdrawal,
                type: {
                    paymentIn: {name:'Shop order',icon:'fa-store'},
                    exchangeIn: {name:'Exchange fund',icon:'fa-exchange-alt'},
                    exchangeOut: {name:'Exchange fund',icon:'fa-exchange-alt'},
                    withdrawalOut: {name:'Withdrawal fund',icon:'fa-hand-holding-usd'},
                    partnerProfitIn: {name:'Partnership reward',icon:'fa-handshake-alt'},
                }
            }
        },
        computed: {
            ...mapGetters('wallets', ['wallets']),
            ...mapGetters('transactions', ['load', 'data', 'current_page', 'total_pages']),
        },
        methods: {
            ...mapActions('transactions', ['getList']),
            showDescription(item){
                this.$showModal({template:`<TextView padding="20" editable="false" text="${item.item.comment}" />`})
            }
        },
        mounted() {
            this.getList({currency: this.current.symbol.toUpperCase()})
        }
    }
</script>
<style scoped>
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
