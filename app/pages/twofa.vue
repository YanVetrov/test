<template>
    <Page>
        <FlexboxLayout class="page" v-if="!active">
            <StackLayout class="form">
                <Image class="logo" width="200" height="200" :src="otp.image"></Image>

                <StackLayout class="input-field">
                    <TextField editable="false" v-model="otp.secret" textAlign="center"  class="input" hint="New email" keyboardType="email" autocorrect="false"
                               autocapitalizationType="none"></TextField>
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>


                <StackLayout class="input-field">
                    <TextField v-model="code" #password class="input" hint="input your code" keyboardType="email" ></TextField>
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>

                <Button v-if="load" text="Confirm OTP" @tap="confirm" class="btn btn-primary m-t-20"></Button>
                <ActivityIndicator v-else row="1" #activityIndicator :busy="!load" width="70" height="70"
                                   class="activity-indicator"></ActivityIndicator>
            </StackLayout>



        </FlexboxLayout>
        <FlexboxLayout class="page" v-else>
            <StackLayout class="form">


                <Button v-if="load" text="Delete OTP" @tap="remove" class="btn btn-primary m-t-20"></Button>
                <ActivityIndicator v-else row="1" #activityIndicator :busy="!load" width="70" height="70"
                                   class="activity-indicator"></ActivityIndicator>
            </StackLayout>



        </FlexboxLayout>
    </Page>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import main from './App'
    import reg from './reg'

    export default {
        data() {
            return {
                main,
                reg,
                otp:{},
                code:'',
                active:false,
            }
        },
        computed: {
            ...mapGetters('user', ['user', 'load'])
        },
        methods: {
            ...mapActions('user', ['changeEmail','otpCreate','otpConfirm','otpDelete']),
            confirm() {

                    this.otpConfirm({code:this.code})
                        .then(r => r===true ? this.$navigateBack() : this.$showModal({template:`<TextView padding="20" editable="false" text="${r}" />`}))

            },
            remove() {

                this.otpDelete()
                    .then(r => r===true ? this.$navigateBack() : this.$showModal({template:`<TextView padding="20" editable="false" text="${r}" />`}))

            }
        },
        created(){
            this.active=this.user.secure2fa.active
            console.log(this.active)
            !this.active&&this.otpCreate().then(r=>this.otp=r);
        }

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