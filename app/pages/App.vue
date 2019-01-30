<template>
    <Page>

        <ActionBar title="AZARA" android:flat="true"/>
        <TabView android:tabBackgroundColor="#53ba82"
                 android:tabTextColor="#c4ffdf"
                 android:selectedTabTextColor="#ffffff"
                 androidSelectedTabHighlightColor="#ffffff">
            <TabViewItem title="Transactions">
                <transactions/>

            </TabViewItem>
            <TabViewItem title="Wallets">
                <wallets/>
            </TabViewItem>
            <TabViewItem title="Shops">
                <GridLayout columns="*" rows="*">
                    <Label @tap="$navigateTo(login)" class="message" text="Tab 2 Content" col="0" row="0"/>
                </GridLayout>
            </TabViewItem>
            <TabViewItem title="Options">

                <GridLayout columns="*" rows="*">
                    <Label class="message" text="Tab 3 Content" col="0" row="0"/>
                </GridLayout>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script>
    import transactions from '../components/transactions'
    import wallets from '../components/wallets'

    export default {
        components: {transactions, wallets}
    }
</script>

<style scoped lang="scss">
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


</style>
