import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
    Animated
} from 'react-native';
import { COLORS, dummyData, SIZES, FONTS, icons } from '../constants';
import { CurrencyLabel, HeaderBar, PriceAlert, TextButton } from '../components';
import { VictoryScatter, VictoryLine, VictoryChart, VictoryAxis } from 'victory-native';
import { VictoryCustomTheme } from '../styles';

const CryptoDetail = ({ navigation, route }) => {

    const scrollX = new Animated.Value(0);
    const numberOfCharts = [1, 2, 3]
    const [selectedCurrency, setSelectedCurrency] = React.useState(null);
    const [chartOptions, setchartOptions] = React.useState(dummyData.chartOptions);
    const [selectedOption, setselectedOption] = React.useState(chartOptions[0]);


    React.useEffect(() => {
        const { currency } = route.params ?? [];

        if (currency) {
            setSelectedCurrency(currency);
            console.log("curr", currency);
        }
        else setSelectedCurrency(dummyData.trendingCurrencies[1])
    }, [route.params])

    function optionOnClickHandler(option) {
        setselectedOption(option)

    }

    function renderDot() {
        const dotPosition = Animated.divide(scrollX, SIZES.width)
        return (
            <View style={{
                height: 30,
                marginTop: 15
            }}>
                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', }}>
                    {numberOfCharts.map((item, index) => {
                        const opacity = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: "clamp"
                        })

                        const dotSize = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
                            extrapolate: "clamp"
                        })

                        const color = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [COLORS.gray, COLORS.primary, COLORS.gray],
                            extrapolate: "clamp"
                        })
                        return (
                            <Animated.View key={`dot-${index}`}
                                opacity={opacity}
                                style={{
                                    borderRadius: SIZES.radius,
                                    marginHorizontal: 6,
                                    width: dotSize,
                                    height: dotSize,
                                    backgroundColor: color,
                                }}
                            ></Animated.View>
                        )
                    })}
                </View>
            </View>
        )
    }
    function renderChart() {
        return (
            <View style={{
                marginTop: SIZES.padding,
                marginHorizontal: SIZES.radius,
                alignItems: 'center',
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
                ...styles.shadow
            }}>
                <View style={{
                    flexDirection: "row",
                    marginTop: SIZES.padding,
                    paddingHorizontal: SIZES.padding
                }}>
                    <View style={{ flex: 1 }}>
                        <CurrencyLabel icon={selectedCurrency?.image}
                            currency={selectedCurrency?.currency}
                            code={selectedCurrency?.code}
                        />
                    </View>
                    <View>
                        <Text style={{ ...FONTS.h3 }}>{selectedCurrency?.amount}</Text>
                        <Text style={{ color: selectedCurrency?.type == "I" ? COLORS.green : COLORS.red, ...FONTS.body3 }}>{selectedCurrency?.changes}</Text>
                    </View>
                </View>

                <Animated.ScrollView
                    horizontal
                    pagingEnabled
                    scrollEventThrottle={16}
                    snapToAlignment="center"
                    snapToInterval={SIZES.width - 40}
                    decelerationRate={0}
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event([{
                        nativeEvent: {
                            contentOffset: { x: scrollX }
                        }
                    }], { useNativeDriver: false })}
                >
                    {numberOfCharts.map((item, index) => (
                        <View key={`chart-${index}`}
                            style={{
                                marginLeft: index == 0 ? SIZES.base : 0
                            }}
                        >
                            <View
                                style={{ marginTop: -25 }}>
                                <VictoryChart
                                    theme={VictoryCustomTheme}
                                    height={220}
                                    width={SIZES.width - 40}>
                                    <VictoryLine
                                        style={{
                                            data: {
                                                stroke: COLORS.secondary
                                            },
                                            parent: {
                                                border: "1px solid #ccc"
                                            },
                                        }}
                                        data={selectedCurrency?.chartData}
                                        categories={{
                                            x: ["15 DK", "30 DK", "45 DK", "60 DK"],
                                            y: ["15", "30", "45", "60"]
                                        }}
                                    />

                                    <VictoryScatter
                                        data={selectedCurrency?.chartData}
                                        size={7}
                                        style={{
                                            data: {
                                                fill: COLORS.secondary
                                            }
                                        }}
                                    />
                                    <VictoryAxis
                                        style={{
                                            grid: {
                                                stroke: "transparent"
                                            }
                                        }}
                                    />
                                    <VictoryAxis
                                        dependentAxis
                                        style={{
                                            axis: {
                                                stroke: "transparent"
                                            },
                                            grid: {
                                                stroke: "grey"
                                            }
                                        }}
                                    />

                                </VictoryChart>
                            </View>
                        </View>
                    ))}
                </Animated.ScrollView>


                <View style={{
                    width: "100%",
                    paddingHorizontal: SIZES.padding,
                    flexDirection: "row",
                    justifyContent: 'space-between',
                }}>
                    {chartOptions.map((item) => (
                        <TextButton key={`option-${item.id}`}
                            label={item.label}
                            customContainerStyle={{
                                height: 30,
                                width: 60,
                                borderRadius: 15,
                                backgroundColor: selectedOption.id == item.id ? COLORS.primary : COLORS.lightGray,
                            }}
                            customLabelStyle={{
                                color: selectedOption.id == item.id ? COLORS.white : COLORS.gray, ...FONTS.body5
                            }}
                            onPress={() => optionOnClickHandler(item)}
                        />

                    ))}

                </View>

                {renderDot()}

            </View >
        )
    }
    function renderBuy() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.radius,
                    padding: SIZES.radius,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.white, ...styles.shadow
                }}
            >
                <View style={{
                    flexDirection: "row", alignItems: 'center', marginBottom: SIZES.radius,
                }}>

                    <View style={{ flex: 1, }}>
                        <CurrencyLabel icon={selectedCurrency?.image} currency={`${selectedCurrency?.currency} Wallet`}
                            code={selectedCurrency?.code} />
                    </View>


                    <View style={{ flexDirection: "row", alignItems: 'center', }}>
                        <View style={{ marginRight: SIZES.base }}>
                            <Text style={{
                                ...FONTS.h3
                            }}>{selectedCurrency?.wallet.value} tl</Text>
                            <Text style={{
                                textAlign: "right", color: COLORS.gray, ...FONTS.body4
                            }}>{selectedCurrency?.wallet.crypto} {selectedCurrency?.code}</Text>
                        </View>
                        <Image source={icons.right_arrow}
                            resizeMode="cover"
                            style={{ width: 20, height: 20, tintColor: COLORS.gray }}
                        />
                    </View>
                </View>

                <TextButton label={"Satın Al"}
                    onPress={() => navigation.navigate("Transaction", { currency: selectedCurrency })}
                />

            </View>
        )

    }
    function renderAbout(params) {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.radius,
                    padding: SIZES.radius,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.white,
                    ...styles.shadow
                }}>
                <Text style={{ ...FONTS.h3 }}>{selectedCurrency?.currency} hakkında</Text>
                <Text style={{
                    marginTop: SIZES.base,
                    ...FONTS.body3
                }}>{selectedCurrency?.description}</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.lightGray1,
        }}>
            <HeaderBar right />
            <ScrollView>
                <View style={{ flex: 1, paddingBottom: 130 }}>
                    {renderChart()}
                    {renderBuy()}
                    {renderAbout()}
                    <PriceAlert
                        customContainerStyle={{ marginTop: SIZES.padding, marginHorizontal: SIZES.radius, }} />
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

export default CryptoDetail;