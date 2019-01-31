<template>
    <ScrollView>
        <StackLayout class="home-panel">
            <CardView v-for="item in data" :key="'n1'+item.name" class="card" elevation="40" radius="10"
                      ios:shadowRadius="3">
                <StackLayout class="card-layout">
                    <FlexboxLayout>

                        <Label fontSize="25" color="orange" margin="10" class="fa">{{'fa-wallet' | fonticon}}</Label>
                        <Label class="h1" :text="item.name"/>
                    </FlexboxLayout>
                    <FlexboxLayout justifyContent="space-between">
                        <Label class="body" textWrap="true" :text="item.balance + ' ' + item.symbol"/>

                        <FlexboxLayout>
                            <Label @tap="$navigateTo(exchange,{transition:{name:'slideTop'},props:{current:item}})" fontSize="30" color="#34A5EE" marginRight="25" class="fa">{{'fa-exchange-alt' | fonticon}}</Label>
                            <Label fontSize="30" color="#4BCC67" marginRight="25" class="fa">{{'fa-arrow-down' | fonticon}}</Label>
                            <Label @tap="$navigateTo(history,{transition:{name:'fadeOut'},props:{current:item}})" fontSize="30" color="silver" marginRight="25" class="fa">{{'fa-history' | fonticon}}</Label>
                        </FlexboxLayout>
                    </FlexboxLayout>

                </StackLayout>

            </CardView>
            <Label v-if="data.length<1" class="p-20" textWrap="true"
                   text="Wallets not found, sorry."
            />
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
                msg: 'Hello World!',
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
        },
        created() {
            this.getList({})
        }
    }
</script>
<style>

    .card {
        background-color: #fff;
        color: #4d4d4d;
        margin: 15 15 0;
    }

    .card-layout {
        padding: 20;
    }

    .card-layout .h1 {
        margin-bottom: 15;
        color: black;
    }

    .butt {
        width: 50%;
        color: white;
    }
</style>