import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    Image,
    FlatList
} from 'react-native';
import { PriceAlert, TransactionHistory } from '../components';
import { COLORS, dummyData, FONTS, icons, images, SIZES } from '../constants';

const Home = ({ navigation }) => {

    const [trending, setTrending] = React.useState(dummyData.trendingCurrencies)
    const [transactionHistory, setTransactionHistory] = React.useState(dummyData.transactionHistory)

    function renderHeader() {

        const renderItem = ({ item, index }) => (
            <TouchableOpacity style={{
                width: 180, padding: SIZES.padding, marginLeft: index == 0 ? SIZES.padding : 0, marginRight: SIZES.radius,
                borderRadius: 10, backgroundColor: COLORS.white,
            }}
                onPress={() => navigation.navigate("Portfolio", { currency: item })}
            >
                <View style={{ flexDirection: "row" }}>
                    <View>
                        <Image source={item.image} resizeMode="cover" style={{
                            marginTop: 5, width: 25, height: 25,
                        }} />
                    </View>

                    <View style={{ marginLeft: SIZES.base }}>
                        <Text style={{ ...FONTS.h2 }}>{item.currency}</Text>
                        <Text style={{ color: COLORS.gray, ...FONTS.h3 }}>{item.code}</Text>
                    </View>
                </View>

                <View style={{ marginTop: SIZES.radius }}>
                    <Text style={{ ...FONTS.h2 }}>{item.amount} </Text>
                    <Text style={{ color: item.type == "I" ? COLORS.green : COLORS.red, ...FONTS.h3 }}>{item.changes} </Text>
                </View>
            </TouchableOpacity>
        )

        return (
            <View style={{
                width: "100%",
                height: 290,
                ...styles.shadow
            }} >
                <ImageBackground
                    source={images.banner}
                    resizeMode="cover"
                    style={{
                        flex: 1,
                        alignItems: 'center',
                    }}
                >

                    <View style={{
                        marginTop: SIZES.padding,
                        width: "100%",
                        alignItems: 'flex-end',
                        paddingHorizontal: SIZES.padding
                    }}>
                        <TouchableOpacity style={{ width: 35, height: 35, justifyContent: 'center', alignItems: 'center', }}>
                            <Image source={icons.notification_white}
                                resizeMode="contain"
                                style={{ flex: 1 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                        <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Bakiye</Text>
                        <Text style={{
                            marginTop: SIZES.base, color: COLORS.white,
                            ...FONTS.h1
                        }}>tl {dummyData.portfolio.balance}</Text>
                        <Text style={{ color: COLORS.white, ...FONTS.body5 }}>{dummyData.portfolio.changes} son 24 saat</Text>
                    </View>

                    <View style={{ position: "absolute", bottom: "-30%", }}>
                        <Text style={{ marginLeft: SIZES.padding, color: COLORS.white, ...FONTS.h2 }}>
                            Trendler
                        </Text>
                        <FlatList
                            contentContainerStyle={{ marginTop: SIZES.base }}
                            data={trending}
                            renderItem={renderItem}
                            keyExtractor={item => item.id.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false} />
                    </View>

                </ImageBackground>
            </View>
        )
    }

    function renderAlert() {
        return (
            <PriceAlert />
        )
    }
    function renderNotice() {
        return (
            <View style={{
                marginTop: SIZES.padding,
                marginHorizontal: SIZES.padding,
                padding: 20,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.secondary,
                ...styles.shadow
            }}>
                <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Yatırım Güvenliği </Text>
                <Text style={{ marginTop: SIZES.base, color: COLORS.white, ...FONTS.body4, lineHeight: 18 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </Text>

                <TouchableOpacity style={{
                    marginTop: SIZES.base
                }}>
                    <Text style={{ textDecorationLine: "underline", color: COLORS.green, ...FONTS.h3 }}>Daha Fazla</Text>
                </TouchableOpacity>
            </View>
        )
    }
    function renderTransactionHistory() {
        return (
            <TransactionHistory customContainerStyle={{ ...styles.shadow }}
                history={transactionHistory} />
        )

    }
    return (
        <ScrollView>
            <View style={{ flex: 1, paddingBottom: 130 }}>
                {renderHeader()}
                {renderAlert()}
                {renderNotice()}
                {renderTransactionHistory()}
            </View>
        </ScrollView>
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

export default Home;