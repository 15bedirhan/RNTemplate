import React from "react";
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet
} from "react-native";
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"

import LinearGradient from 'react-native-linear-gradient';

import { Home, CryptoDetail, Transaction } from "../screens"
import { COLORS, FONTS, icons } from "../constants"
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator()

const TabBarCustomButton = ({ children, onPress }) => {
    return (
        <TouchableOpacity style={{
            top: -30, justifyContent: 'center', alignItems: 'center',
            ...styles.shadow
        }}
            onPress={onPress}
        >
            <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={{ width: 70, height: 70, borderRadius: 35 }}>
                {children}
            </LinearGradient>
        </TouchableOpacity>
    )
}
const Tabs = () => {
    return (
        <NavigationContainer>
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: "absolute",
                    backgroundColor: "white",
                    // left: 0,
                    // right: 0,
                    // bottom:0,
                    borderTopColor: "transparent",
                    height: 85
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                            <Image source={icons.home} style={{ width: 30, height: 30, tintColor: focused ? COLORS.primary : "black" }}
                                resizeMode="contain"
                            />
                            <Text style={{ color: focused ? COLORS.primary : "black", ...FONTS.body5 }}>ANA SAYFA</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Portfolio"
                component={CryptoDetail}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                            <Image source={icons.pie_chart} style={{ width: 30, height: 30, tintColor: focused ? COLORS.primary : "black" }}
                                resizeMode="contain"
                            />
                            <Text style={{ color: focused ? COLORS.primary : "black", ...FONTS.body5 }}>PORTFOLYO</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Transaction"
                component={Transaction}
                options={{
                    tabBarIcon: () => (
                        <Image source={icons.transaction} resizeMode="contain"
                            style={{ width: 30, height: 30, tintColor: "white" }}
                        />
                    ),

                    tabBarButton: (props) => (
                        <TabBarCustomButton {...props} />
                    )
                }}
            />
            <Tab.Screen
                name="Prices"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                            <Image source={icons.line_graph} style={{ width: 30, height: 30, tintColor: focused ? COLORS.primary : "black" }}
                                resizeMode="contain"
                            />
                            <Text style={{ color: focused ? COLORS.primary : "black", ...FONTS.body5 }}>FİYATLAR</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                            <Image source={icons.settings} style={{ width: 30, height: 30, tintColor: focused ? COLORS.primary : "black" }}
                                resizeMode="contain"
                            />
                            <Text style={{ color: focused ? COLORS.primary : "black", ...FONTS.body5 }}>AYARLAR</Text>
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    }
})

export default Tabs;