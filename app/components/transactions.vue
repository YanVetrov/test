<template>
    <StackLayout>
        <!--<SearchBar hint="Search" textFieldBackgroundColor="silver"/>-->

        <ScrollView>


            <StackLayout>




                <FlexboxLayout flexWrap="wrap">
                    <FlexboxLayout v-if="load" class="block list" v-for="s in data" flexDirection="row">
                        <Label class="background" color="#53ba82" :text="s.currency"/>
                        <FlexboxLayout flexDirection="column" width="80%">
                            <Label :text="Number(s.amount)" class="song"/>
                            <Label :text="s.type" class="signer"/>
                        </FlexboxLayout>
                    </FlexboxLayout>

                    <ActivityIndicator row="1" #activityIndicator :busy="!load" width="100" height="100"
                                       class="activity-indicator"></ActivityIndicator>


                </FlexboxLayout>
            </StackLayout>
        </ScrollView>
    </StackLayout>
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
            ...mapGetters('wallets', ['wallets']),
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

<style lang="scss" scoped>
    @import '../../node_modules/nativescript-theme-core/scss/skins/light/index';
    @import '../../node_modules/nativescript-theme-core/scss/index';
    .icon {
        font-family: 'icomoon';
        font-size: 38;
    }

    .block {
        color: black;
        margin: 15;
        width: 230px;
        height: 170vh;
        transition: transform .3s;
    }

    .background {
        background-size: cover;
        background-repeat: no-repeat;
        height: 70%;
    }

    .signer {
        height: 15%;
    }

    .song {
        height: 15%;
    }

    .list {
        width: 100%;
        height: 120px;
        flex-direction: row;
        border-width: 0 0 1 0;
        border-color: black;
    }

    .list .background {
        width: 20%;
        height: 100%;
        margin: 5;
        border-radius: 2;
    }

    .list .signer {
        width: 100%;
        height: 50%;
    }

    .list .song {
        font-weight: bold;
        width: 100%;
        height: 50%;
    }

</style>