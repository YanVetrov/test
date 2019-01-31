<template>
    <Page>
        <ActionBar title="Registration" android:flat="true"/>
        <FlexboxLayout class="page">
            <StackLayout class="form">
                <!--<Image class="logo"></Image>-->
                <Label class="header" :text="'Sign up to Azara'"></Label>

                <StackLayout class="input-field">
                    <TextField v-model="login" class="input" hint="Login" keyboardType="email" autocorrect="false"
                               autocapitalizationType="none"></TextField>
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>
                <StackLayout class="input-field">
                    <TextField v-model="email" class="input" hint="Email" keyboardType="email" autocorrect="false"
                               autocapitalizationType="none"></TextField>
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>

                <StackLayout class="input-field">
                    <TextField v-model="password" #password class="input" hint="Password" secure="true"></TextField>
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>
                <StackLayout class="input-field">
                    <TextField v-model="repeat" #password class="input" hint="Repeat password"
                               secure="true"></TextField>
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>


                <Button v-if="load" text="Sign up" @tap="sign" class="btn btn-primary m-t-20"></Button>
                <ActivityIndicator v-else row="1" #activityIndicator :busy="!load" width="70" height="70"
                                   class="activity-indicator"></ActivityIndicator>
            </StackLayout>

            <Label @tap="$navigateTo(main)" class="login-label sign-up-label">
                <FormattedString>
                    <Span :text="'Back to Login'"></Span>
                </FormattedString>
            </Label>
        </FlexboxLayout>
    </Page>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import main from './login'

    export default {
        name: "login",
        data() {
            return {
                main,
                login: '',
                password: '',
                email: '',
                repeat: '',
            }
        },
        computed: {
            ...mapGetters('user', ['user', 'load'])
        },
        methods: {
            ...mapActions('user', {enter: 'reg', check: 'check'}),
            sign() {
                this.enter({login: this.login, password: this.password, email: this.email})
                    .then(r => r === true ?
                        this.$navigateTo(main,
                            {
                                props: {fromReg: {login: this.login, password: this.password}},
                                clearHistory: true
                            })
                        :
                        this.$showModal({template: `<TextView padding="20" editable="false" text="${r}" />`})
                    )
            }
        },

    }
</script>

<style scoped>
    .page {
        align-items: center;
        flex-direction: column;
        background: #fff;

    }

    .form {
        margin-left: 30;
        margin-right: 30;
        flex-grow: 2;
        vertical-align: middle;
    }

    .logo {
        margin-bottom: 12;
        height: 90;
        font-weight: bold;
    }

    .header {
        horizontal-align: center;
        font-size: 25;
        font-weight: 600;
        margin-bottom: 70;
        text-align: center;
        color: #3dcb50;
    }

    .input-field {
        margin-bottom: 25;
    }

    .input {
        font-size: 18;
        placeholder-color: #A8A8A8;
    }

    .btn-primary {
        height: 50;
        margin: 30 5 15 5;
        background-color: #3dcb50;
        border-radius: 5;
        font-size: 20;
        font-weight: 600;
    }

    .login-label {
        horizontal-align: center;
        color: #A8A8A8;
        font-size: 16;
    }

    .sign-up-label {
        margin-bottom: 20;
    }

    .bold {
        color: #d6dbd9;
    }

</style>