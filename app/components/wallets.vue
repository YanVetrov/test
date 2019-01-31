<template>
    <ScrollView>
        <StackLayout class="home-panel">
            <CardView v-for="item in data" :key="'n1'+item.name" class="card" elevation="40" radius="10"
                      ios:shadowRadius="3">
                <StackLayout class="card-layout">
                    <Label class="h1" :text="item.name=='Bitcoin'?'₿ ' +item.name:'$ '+item.name"/>
                    <Label class="body" textWrap="true" :text="item.balance + ' ' + item.symbol"/>
                    <Label fontSize="25" color="black" class="fa">{{'fa-wallet' | fonticon}}</Label>
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

    export default {
        data() {
            return {
                msg: 'Hello World!',
                login
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
        color:white;
    }
</style>