<template>
    <ScrollView>
        <StackLayout class="home-panel">
            <CardView v-for="item in list" class="card" elevation="20" radius="15"
                      shadowRadius="3"  :key="'id__'+item.name">
                <StackLayout class="card-layout">
                    <Label class="h1" :text="item.name"/>
                    <Label class="body" textWrap="true" :text="'FEE: '+item.fee"/>
                    <Label class="body" textWrap="true" :text="item.domain"/>

                </StackLayout>

            </CardView>
            <Label v-if="list.length<1" class="p-20" textWrap="true"
                   text="Merchants not found, sorry."
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
                login
            }
        },
        computed: {
            ...mapGetters('merchants', ['load', 'list']),
        },
        methods: {
            ...mapActions('merchants', ['getList']),
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