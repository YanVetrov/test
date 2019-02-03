<template>

    <Page class="page">
        <ActionBar title="Withdrawal"></ActionBar>
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


                            <TextField borderWidth="1" borderColor="silver" borderRadius="10" v-model="val1" keyboardType="number" width="70%" hint="how much to exchange?"/>

                        </FlexboxLayout>

                    </StackLayout>

                </CardView>
                <FlexboxLayout padding="20" justifyContent="center">
                    <Label fontSize="35" color="#4BCC67" class="fa" :text="'fa-arrow-down'|fonticon"/>
                </FlexboxLayout>
                    <CardView   class="card" elevation="20" radius="10"
                              shadowRadius="1">
                        <StackLayout class="card-layout">
                            <FlexboxLayout>

                                <Label fontSize="25" color="orange" margin="10" class="fa">{{'fa-hand-holding-usd' | fonticon}}</Label>
                                <Label class="h1" text="BTC Address"/>
                            </FlexboxLayout>
                            <FlexboxLayout justifyContent="space-between">
                                <Label class="body" textWrap="true" text="Withdrawal"/>

                                <TextField :text="val2" borderWidth="1" borderColor="silver" borderRadius="10" width="70%" editable="true" hint="input address here"/>
                            </FlexboxLayout>

                        </StackLayout>

                    </CardView>
                <FlexboxLayout padding="10" margin="10" justifyContent="center">
                    <Button v-if="load" @tap="exchange" fontSize="15" fontWeight="bold" borderRadius="10" margin="20" padding="15 50 15 50" background="#4BCC67" color="white" class="fa" text="Continue"/>
                    <ActivityIndicator v-else row="1" #activityIndicator :busy="true" width="70" height="70"
                                       class="activity-indicator"></ActivityIndicator>
                </FlexboxLayout>
            </StackLayout>
        </ScrollView>
    </Page>

</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import exchange from './exchange'
    export default {
        props:['current'],
        data(){
            return{
                val1: '',
                val2: '',
            }
        },
        computed: {
            ...mapGetters('withdrawal', ['load', 'data']),
        },
        methods: {
            ...mapActions('withdrawal', ['create']),
            exchange(){
                this.create({address: this.val2,amount:this.val1})
                    .then(r => r===true ? this.$navigateBack() : alert({
                        title: "Sorry.",
                        message: r,
                        okButtonText: "OK"
                    }))
            },

        },
    }
</script>

<style scoped>
    .page {
        background: white;
    }
</style>