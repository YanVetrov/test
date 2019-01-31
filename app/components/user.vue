<template>

    <GridLayout  class="page page-content home-page-content" rows="160, *">

        <StackLayout v-if="load" row="0" class="balance-chart user-picture">
            <Image width="100" height="100" class="user-picture" src="~/assets/images/haski.jpg"/>
            <FlexboxLayout justifyContent="center" flexDirection="column" alignItems="center">
            <Label  fontWeight="bold" :text="user.login"/>
            <Label  color="silver" :text="user.email"/>
            </FlexboxLayout>
        </StackLayout>



        <StackLayout v-if="load" row="1">
            <ScrollView>
            <StackLayout>
            <CardView @tap="$navigateTo(password,{transition:{name:'slideLeft'}})" class="card" elevation="5" radius='15'
                      shadowRadius="1">
                <StackLayout class="card-layout">
                    <FlexboxLayout justifyContent="space-between">
                            <Label fontWeight="bold" text="Change password"/>
                            <Label class="fa" :text="'fa-key' | fonticon"/>
                    </FlexboxLayout>
                </StackLayout>

            </CardView>

            <CardView @tap="$navigateTo(email,{transition:{name:'slideLeft'}})" class="card" elevation="5" radius="15"
                      shadowRadius="1">
                <StackLayout class="card-layout">
                    <FlexboxLayout justifyContent="space-between">
                        <Label fontWeight="bold" text="Change Email"/>
                        <Label class="fa" :text="'fa-envelope' | fonticon"/>
                    </FlexboxLayout>
                </StackLayout>

            </CardView>
            <CardView @tap="$navigateTo(twofa,{transition:{name:'slideLeft'}})" class="card" elevation="5" radius='15'
                      shadowRadius="1">
                <StackLayout class="card-layout">
                    <FlexboxLayout justifyContent="space-between">
                        <Label fontWeight="bold" text="Manage 2fa"/>
                        <Label class="fa" :text="'fa-user-secret' | fonticon"/>
                    </FlexboxLayout>
                </StackLayout>

            </CardView>
            <CardView margin="15" @tap="destroy" class="card" elevation="5" radius="15"
                      shadowRadius="1">
                <StackLayout class="card-layout">
                    <FlexboxLayout justifyContent="space-between">
                        <Label fontWeight="bold" text="Exit"/>
                        <Label class="fa" :text="'fa-sign-out' | fonticon"/>
                    </FlexboxLayout>
                </StackLayout>

            </CardView>

            </StackLayout>
            </ScrollView>

        </StackLayout>
        <ActivityIndicator v-else row="1" #activityIndicator :busy="true" width="70" height="70"
                           class="activity-indicator"></ActivityIndicator>
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
                login,
                email,
                password,
                twofa
            }
        },
        computed: {
            ...mapGetters('user', ['user','load']),
        },
        methods: {
            ...mapActions('user', ['destroySession']),
            destroy() {
                this.destroySession()
                    .then(r =>{
                        if(r===true) {
                            this.$navigateTo(login,{clearHistory:true})
                            localStorage.removeItem('token');
                        }
                        else this.$showModal({template:`<TextView padding="20" editable="false" text="${r}" />`})
                    })
            }
        },

    }
</script>