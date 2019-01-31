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


                                <TextField @textChange="val2=correctBuy()" v-model="val1" keyboardType="number" width="70%" hint="how much to exchange?"/>

                        </FlexboxLayout>

                    </StackLayout>

                </CardView>
                <FlexboxLayout padding="20" justifyContent="center">
                <Label fontSize="35" color="#4BCC67" class="fa" :text="'fa-arrow-down'|fonticon"/>
                </FlexboxLayout>
                <CardView v-for="item in data" :key="item._id" v-if="item.name!==current.name" class="card" elevation="40" radius="10"
                           ios:shadowRadius="3">
                    <StackLayout class="card-layout">
                        <FlexboxLayout>

                            <Label fontSize="25" color="orange" margin="10" class="fa">{{'fa-wallet' | fonticon}}</Label>
                            <Label class="h1" :text="item.name"/>
                        </FlexboxLayout>
                        <FlexboxLayout justifyContent="space-between">
                            <Label class="body" textWrap="true" :text="item.balance + ' ' +item.symbol"/>

                                <TextField :text="val2" width="70%" editable="false" hint="output money"/>
                        </FlexboxLayout>

                    </StackLayout>

                </CardView>
                <FlexboxLayout padding="20" justifyContent="center">
                    <Button fontSize="20" fontWeight="bold" borderRadius="10" margin="20" padding="15 50 15 50" background="#4BCC67" color="white" class="fa" text="Continue"/>
                </FlexboxLayout>
            </StackLayout>
        </ScrollView>
    </Page>

</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import {BigNumber} from 'bignumber.js';
    export default {
        name: "exchange",
        props:['current'],
        data(){
            return{
                val1: '',
                val2: '',
            }
        },
        computed: {
            ...mapGetters('wallets', ['load', 'data']),
            ...mapGetters('fee', ['fee', 'rate']),
        },
        methods: {
            ...mapActions('wallets', ['getList']),
            ...mapActions('fee', ['getRate', 'getFee']),
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