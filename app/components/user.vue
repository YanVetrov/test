<template>

    <GridLayout class="page page-content home-page-content" rows="100, *">

        <FlexboxLayout alignItems="center" justifyContent="center" v-if="load" row="0" class="balance-chart user-picture">
        <Label class="h1" text="Settings"/>

        </FlexboxLayout>


        <ListView row="1" for="item in arr" @itemTap="navigate">
            <v-template>
                <StackLayout class="card-layout">
                    <FlexboxLayout justifyContent="space-between">
                        <Label fontWeight="bold" :text="item.name"/>
                        <Label class="fa" :text="item.icon | fonticon"/>
                    </FlexboxLayout>
                </StackLayout>
            </v-template>

        </ListView>
        <!--<StackLayout v-if="load" row="1">-->
        <!--<ScrollView>-->
        <!--<StackLayout>-->
        <!--<CardView @tap="$navigateTo(password,{transition:{name:'slideLeft'}})" class="card" elevation="5" radius='15'-->
        <!--shadowRadius="1">-->
        <!--<StackLayout class="card-layout">-->
        <!--<FlexboxLayout justifyContent="space-between">-->
        <!--<Label fontWeight="bold" text="Change password"/>-->
        <!--<Label class="fa" :text="'fa-key' | fonticon"/>-->
        <!--</FlexboxLayout>-->
        <!--</StackLayout>-->

        <!--</CardView>-->

        <!--<CardView @tap="$navigateTo(email,{transition:{name:'slideLeft'}})" class="card" elevation="5" radius="15"-->
        <!--shadowRadius="1">-->
        <!--<StackLayout class="card-layout">-->
        <!--<FlexboxLayout justifyContent="space-between">-->
        <!--<Label fontWeight="bold" text="Change Email"/>-->
        <!--<Label class="fa" :text="'fa-envelope' | fonticon"/>-->
        <!--</FlexboxLayout>-->
        <!--</StackLayout>-->

        <!--</CardView>-->
        <!--<CardView @tap="$navigateTo(twofa,{transition:{name:'slideLeft'}})" class="card" elevation="5" radius='15'-->
        <!--shadowRadius="1">-->
        <!--<StackLayout class="card-layout">-->
        <!--<FlexboxLayout justifyContent="space-between">-->
        <!--<Label fontWeight="bold" text="Manage 2fa"/>-->
        <!--<Label class="fa" :text="'fa-user-secret' | fonticon"/>-->
        <!--</FlexboxLayout>-->
        <!--</StackLayout>-->

        <!--</CardView>-->
        <!--<CardView margin="15" @tap="destroy" class="card" elevation="5" radius="15"-->
        <!--shadowRadius="1">-->
        <!--<StackLayout class="card-layout">-->
        <!--<FlexboxLayout justifyContent="space-between">-->
        <!--<Label fontWeight="bold" text="Exit"/>-->
        <!--<Label class="fa" :text="'fa-sign-out' | fonticon"/>-->
        <!--</FlexboxLayout>-->
        <!--</StackLayout>-->

        <!--</CardView>-->

        <!--</StackLayout>-->
        <!--</ScrollView>-->

        <!--</StackLayout>-->
    </GridLayout>

</template>
<script>
    import login from '../pages/login'
    import password from '../pages/password'
    import email from '../pages/email'
    import twofa from '../pages/twofa'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        data() {
            return {
                arr: [
                    {route: email, name: 'Change email', icon: 'fa-envelope'},
                    {route: password, name: 'Change password', icon: 'fa-key'},
                    {route: twofa, name: 'Manage 2-factor secure', icon: 'fa-user-secret'},
                    {name: 'Exit', icon: 'fa-sign-out'}]

            }
        },
        computed: {
            ...mapGetters('user', ['user', 'load']),
        },
        methods: {
            ...mapActions('user', ['destroySession']),
            navigate(e) {
                console.log(e)
                if (e.item.name === 'Exit') return this.destroy();
                else return this.$navigateTo(e.item.route, {transition: {name: 'slideLeft'}})
            },
            destroy() {
                this.destroySession()
                    .then(r => {
                        if (r === true) {
                            this.$navigateTo(login, {clearHistory: true})
                            localStorage.removeItem('token');
                        }
                        else this.$showModal({template: `<TextView padding="20" editable="false" text="${r}" />`})
                    })
            }
        },

    }
</script>