import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    ScrollView,

} from 'react-native';
import { CurrencyLabel, HeaderBar, TextButton, TransactionHistory } from '../components';
import { COLORS, dummyData, FONTS, SIZES } from '../constants';

const Transaction = ({ route }) => {
    const [selectedCurrency, setSelectedCurrency] = React.useState(null)
    React.useEffect(() => {

        const { currency } = route.params ?? [];

        if (currency) {
            setSelectedCurrency(currency);
            console.log("curr", currency);
        }
        else setSelectedCurrency(dummyData.trendingCurrencies[1])
    })

    function renderTrade() {
        return (
            <View style={{
                marginTop: SIZES.padding,
                marginHorizontal: SIZES.padding,
                padding: SIZES.padding,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white, ...styles.shadow
            }}>
                <CurrencyLabel icon={selectedCurrency?.image}
                    currency={selectedCurrency?.currency}
                    code={selectedCurrency?.code} />

                <View style={{
                    marginTop: SIZES.padding,
                    marginBottom: SIZES.padding * 1.5,
                    alignItems: 'center', justifyContent: 'center',
                }}>
                    <Text style={{
                        ...FONTS.h3
                    }}
                    >
                        {selectedCurrency?.wallet.crypto} {selectedCurrency?.code}
                    </Text>
                    <Text
                        style={{
                            color: COLORS.gray, ...FONTS.body4s
                        }}>{selectedCurrency?.wallet.value} tl</Text>
                </View>

                <TextButton
                    label={"Alım Satım"}
                />
            </View>
        )
    }

    function renderTransctionHistory() {
        return (
            <TransactionHistory
                customContainerStyle={{
                    ...styles.shadow
                }}
                history={selectedCurrency?.transactionHistory}
            />
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderBar right={false} />

            <ScrollView>
                <View style={{
                    flex: 1,
                    paddingBottom: 130,
                }}>
                    {renderTrade()}
                    {renderTransctionHistory()}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    }
})

export default Transaction;