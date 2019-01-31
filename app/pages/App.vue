<template>

    <Page>

        <ActionBar title="AZARA" android:flat="true"/>
        <TabView tabBackgroundColor="#53ba82"
                 tabTextColor="#c4ffdf"
                 tabTextFontSize="24"
                 android:selectedTabTextColor="#ffffff"
                 androidSelectedTabHighlightColor="#ffffff">

            <TabViewItem class="fa" fontSize="20" :title="'fa-wallet' | fonticon">
                <wallets/>
            </TabViewItem>
            <TabViewItem class="fa" fontSize="20" :title="'fa-shopping-cart' | fonticon">
                <shops/>
            </TabViewItem>
            <TabViewItem class="fa" fontSize="20" :title="'fa-user' | fonticon">

                <user/>
            </TabViewItem>
        </TabView>
    </Page>

</template>

<script>
    import transactions from '../components/transactions'
    import wallets from '../components/wallets'
    import user from '../components/user'
    import shops from '../components/shops'

    export default {
        components: {transactions, wallets,user,shops}
    }
</script>

<style lang="scss">
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
    .home-page-content {
        padding-top: 15;
        background:white;
    }

    .home-page-content .balance-chart {
        background-color: #ffffff;
        border-radius: 5;
        margin-left: 15;
        margin-right: 15;
        border-color: #f1f5f8;
        border-width: 1;
    }


    .home-page-content .balance-chart {
        padding: 7.5;
    }

    .home-page-content .balance-summary {
        text-align: center;
        vertical-align: middle;
    }

    .home-page-content .balance-summary StackLayout {
        padding-left: 20;
        padding-right: 20;
    }

    .home-page-content .balance-summary .title {
        color: #606f7b;
        font-size: 12;
        margin-bottom: 5;
    }

    .home-page-content .balance-summary .ammount {
        color: #3d4852;
        font-size: 16;
        font-weight: 600;
        margin-bottom: 5;
    }

    .home-page-content .balance-summary .hr-light {
        height: 3;
    }

    .home-page-content .balance-summary .hr-light.green {
        background-color: #38c172;
    }

    .home-page-content .balance-summary .hr-light.red {
        background-color: #e3342f;
    }

    .home-page-content .expenses-chart {
        padding-left: 15;
        padding-right: 15;
    }

    .home-page-content .expenses-chart Label {
        font-size: 16;
        text-align: center;
        color: #3d4852;
    }
    .page {
        background-color: #f1f5f8;
    }

    .action-bar {
        background-color: #f1f5f8;
        border-width: 1;
        border-color: transparent;
    }

    .action-bar .action-item {
        color: black;
    }

    .action-bar .action-bar-title {
        color: #3d4852;
        font-size: 20;
    }
    .user-picture{
        border-radius:100;
    }
</style>
