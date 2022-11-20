import { StyleSheet, Text, View, Image, Pressable } from "react-native";



export default function LearnMoreScreen(){




    return(

        <View style={styles.container}>
            <View sstyle={styles.colorContainer}>
                <Pressable onPress={() => {navigation.navigate('Welcome')}} style={styles.LogoImage}>
                        <Image
                            source={require('../assets/Photos/icon.png')}
                            style={{ flex: 1, backgroundColor: "#131722"}}
                            resizeMode="contain"
                        />
                </Pressable>   

                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>
                        Delta predict is a stock market prediction app. 
                        Stock forecasts can be a helpful tool for making investment decisions. They can help you:{'\n'}dentify undervalued and overvalued stocks: when a stock's price is not in line with its fundamentals, it may be undervalued {'\n'}
                        or overvalued. Why buy an overvalued stock when you can buy an undervalued stock for less? This is where stock price targets can be helpful.
                        {'\n'}Make more informed investment decisions: it all comes down to making more informed investment decisions.{'\n'}
                        Stock forecasts can help you do just that. A good stock forecast can help you separate the wheat from the chaff.{'\n'}
                        With so many stocks to choose from, it can be challenging to know which ones are worth investing in.{'\n'}
                        A stock forecast can help you narrow down your options and make more informed investment decisions.
                    </Text>

                </View>

            </View>   
    </View>




    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#131722",
        justifyContent: 'flex-start',
        alignItem: "center",
    },
    colorContainer:{
        backgroundColor: "#131722",
    },
    descriptionContainer: {
        alignItems: "center",
        alignSelf: "center",
    },
    LogoImage: {
        backgroundColor: "#131722",
        justifyContent:"flex-start",
        flexDirection: "row",
        width: 275,
        height: 100 ,
        marginLeft: 23.5, 
        marginTop: 10
    },
    descriptionText: {
        marginTop: 50,
        textAlign: 'left',
        color: '#C9D6DF',
        fontWeight: 'bold',
        fontSize: 15,
        flex: 3
    },
});