<template>
    <Page>
        <ActionBar :title="'History of '+current.name+' wallet'"></ActionBar>
        <ActivityIndicator v-if="!load" #activityIndicator :busy="!load" width="100" height="100"
                           class="activity-indicator"></ActivityIndicator>
        <ScrollView v-else>
        <StackLayout>

            <CardView v-for="item in data" class="card" elevation="20" radius="8"
                      shadowRadius="1" :key="'cur'+item.currency">
                <StackLayout class="card-layout">
                    <FlexboxLayout justifyContent="space-between">
                        <Label fontWeight="bold" :text="item.type"/>
                        <Label color="green" :text="Number(item.amount) + ' ' +item.currency"/>
                    </FlexboxLayout>
                </StackLayout>

            </CardView>


        </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        props:['current'],
        computed: {
            ...mapGetters('wallets', ['wallets']),
            ...mapGetters('transactions', ['load', 'data', 'current_page', 'total_pages']),
        },
        methods: {
            ...mapActions('transactions', ['getList']),
        },
        mounted() {
            this.getList({currency:this.current.symbol.toUpperCase()})
        }
    }
</script>
