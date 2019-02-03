<template>

    <Page class="page">
        <ActionBar title="Exchange"></ActionBar>
        <ScrollView>
            <StackLayout padding="20">
                <CardView  class="card" elevation="20" radius="10"
                          shadowRadius="1">
                    <StackLayout class="card-layout">
                        <FlexboxLayout>

                            <Label fontSize="25" color="orange" margin="10" class="fa">{{'fa-wallet' | fonticon}}</Label>
                            <Label class="h1" :text="current.name"/>
                        </FlexboxLayout>
                        <FlexboxLayout justifyContent="space-between">
                            <Label class="body" textWrap="true" :text="current.balance + ' ' + current.symbol"/>


                                <TextField borderWidth="1" borderColor="silver" borderRadius="10" @textChange="val2=correctBuy()" v-model="val1" keyboardType="number" width="70%" hint="how much to exchange?"/>

                        </FlexboxLayout>

                    </StackLayout>

                </CardView>
                <FlexboxLayout padding="20" justifyContent="center">
                <Label fontSize="35" color="#4BCC67" class="fa" :text="'fa-arrow-down'|fonticon"/>
                </FlexboxLayout>
                <FlexboxLayout justifyContent="space-around" alignItems="center" v-for="item in data" :key="item._id" v-if="item.name!==current.name">
                    <Label color="black" @tap="$navigateTo(exchange,{transition:{name:'fade'},props:{current:item}})" class="fa" :text="'fa-arrow-left'|fonticon"/>
                <CardView width="85%" margin="15"  class="card" elevation="20" radius="10"
                           shadowRadius="1">
                    <StackLayout class="card-layout">
                        <FlexboxLayout>

                            <Label fontSize="25" color="orange" margin="10" class="fa">{{'fa-wallet' | fonticon}}</Label>
                            <Label class="h1" :text="item.name"/>
                        </FlexboxLayout>
                        <FlexboxLayout justifyContent="space-between">
                            <Label class="body" textWrap="true" :text="item.balance + ' ' +item.symbol"/>

                                <TextField :text="val2" borderWidth="1" borderColor="silver" borderRadius="10" width="70%" editable="false" hint="output money"/>
                        </FlexboxLayout>

                    </StackLayout>

                </CardView>
                    <Label color="black" @tap="$navigateTo(exchange,{transition:{name:'fade'},backstackVisible:false,props:{current:item}})" class="fa" :text="'fa-arrow-right'|fonticon"/>
                </FlexboxLayout>
                <FlexboxLayout padding="10" margin="10" justifyContent="center">
                    <Button v-if="exLoad" @tap="exchange" fontSize="15" fontWeight="bold" borderRadius="10" margin="20" padding="15 50 15 50" background="#4BCC67" color="white" class="fa" text="Continue"/>
                    <ActivityIndicator v-else row="1" #activityIndicator :busy="true" width="70" height="70"
                                       class="activity-indicator"></ActivityIndicator>
                </FlexboxLayout>
            </StackLayout>
        </ScrollView>
    </Page>

</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import {BigNumber} from 'bignumber.js';
    import exchange from './exchange'
    export default {
        props:['current'],
        data(){
            return{
                val1: '',
                val2: '',
                exchange
            }
        },
        computed: {
            ...mapGetters('wallets', ['load', 'data']),
            ...mapGetters('fee', ['fee', 'rate']),
            ...mapGetters('exchange', {exLoad:'load'}),
        },
        methods: {
            ...mapActions('wallets', ['getList']),
            ...mapActions('fee', ['getRate', 'getFee']),
            ...mapActions('exchange', ['create']),
            exchange(){

                this.create({fromCurrency: this.current.symbol.toUpperCase(), toCurrency: this.current.symbol=='btc'?'USD':"BTC",amount:this.val1})
                    .then(r => r===true ? this.$navigateBack() : this.$showModal({template:`<TextView padding="20" editable="false" text="${r}" />`}))
            },
            correctBuy() {
                let out = BigNumber(this.val1);
                let amount = BigNumber(this.fee.exchangeAmount);
                let coef = BigNumber(this.fee.exchangePercent)
                    .dividedBy(100);
                if (this.current.name === 'Bitcoin') {
                    out = out.multipliedBy(this.rate.buy);
                    out = out
                        .minus(out.multipliedBy(coef)
                            .minus(amount));
                } else {
                    out = out
                        .minus(out.multipliedBy(coef))
                        .minus(amount)
                        .dividedBy(this.rate.sell)
                }
                return isNaN(out) ? 0 : out;
            },
        },
        created() {
            this.getFee();
            this.getRate();
        }
    }
</script>

<style scoped>
    .page {
        background: white;
    }
</style>