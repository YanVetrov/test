<template>
    <GridLayout class="page page-content home-page-content" rows="160, 80, *">
        <!-- Chart -->
        <StackLayout row="0" class="balance-chart user-picture">
            <Image width="100" height="100" class="user-picture" src="~/assets/images/haski.jpg"/>
            <FlexboxLayout justifyContent="center" flexDirection="column" alignItems="center">
            <Label  fontWeight="bold" :text="user.login"/>
            <Label  color="silver" :text="user.email"/>
            </FlexboxLayout>
        </StackLayout>

        <!-- Balance Summary -->
        <GridLayout row="1" columns="*, *, *" class="balance-summary">
            <StackLayout col="0">
                <Label text="USD" class="title"></Label>
                <Label :text="user.affiliate.balance.usd + ' $'" class="ammount"></Label>
                <Label class="hr-light green" width="35%"></Label>
            </StackLayout>

            <StackLayout col="1">
                <Label text="BTC" class="title"></Label>
                <Label :text="user.affiliate.balance.btc+' ₿'" class="ammount"></Label>
                <Label class="hr-light red" width="25%"></Label>
            </StackLayout>

            <StackLayout col="2">
                <Label text="Link" class="title"></Label>
                <Label :text="'/'+user.affiliate.link+'/'" class="ammount"></Label>
                <Label class="hr-light green" width='15%'></Label>
            </StackLayout>
        </GridLayout>

        <!-- Trnsactions -->

        <StackLayout row="2">

            <CardView v-for="item in data" class="card" elevation="40" radius="2"
                      ios:shadowRadius="1" :key="'cur'+item.currency">
                <StackLayout class="card-layout">
                    <FlexboxLayout justifyContent="space-between">
                            <Label fontWeight="bold" :text="item.type"/>
                            <Label color="green" :text="Number(item.amount) + ' ' +item.currency"/>
                    </FlexboxLayout>
                </StackLayout>

            </CardView>


        </StackLayout>

    </GridLayout>
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
            ...mapGetters('user', ['user']),
            ...mapGetters('transactions', ['load', 'data', 'current_page', 'total_pages']),
        },
        methods: {
            ...mapActions('transactions', ['getList']),
        },
        mounted() {
            this.getList({})
        }
    }
</script>