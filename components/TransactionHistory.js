import React from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,

} from 'react-native';
import { SIZES, COLORS, FONTS, icons } from '../constants';

const TransactionHistory = ({ customContainerStyle, history }) => {

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity style={{flexDirection:"row",alignItems: 'center',paddingVertical:SIZES.base}}>
                <Image source={icons.transaction}
                style={{width: 30,height: 30,tintColor:COLORS.primary}} />

                <View style={{flex:1,marginLeft:SIZES.radius,}}>
                    <Text style={{...FONTS.h3}}>{item.description}</Text>
                    <Text style={{...FONTS.body4, color:COLORS.gray}}>{item.date}</Text>
                </View>

                <View style={{flexDirection:"row",height: "100%", alignItems: 'center',}}>
                    <Text style={{color:item.type=="B" ? COLORS.green: COLORS.black, ...FONTS.h3}}>{item.amount} {item.currency}</Text>
                    <Image source={icons.right_arrow} 
                    style={{width: 20,height: 20,tintColor:COLORS.gray}} />
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{
            marginTop: SIZES.padding,
            marginHorizontal: SIZES.padding,
            padding: 20,
            borderRadius: SIZES.radius,
            color: COLORS.whites,
            ...customContainerStyle
        }}>
            <Text style={{...FONTS.h2}}>
                İşlem Geçmişi
            </Text>
            <FlatList contentContainerStyle={{marginTop:SIZES.radius}}
            scrollEnabled={false}
            data={history}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={()=>(
                <View style={{width: "100%",height:1,backgroundColor: COLORS.lightGray,}} />                
            )}
            renderItem={renderItem}
            />
        </View>
    )
}

export default TransactionHistory;