import { StyleSheet, Text, View, Image, Pressable } from "react-native";


//in this screen the user can view additional information about the app and see detailed instructions on how to use it 
export default function LearnMoreScreen(){
    return(
        <View style={styles.container}>
            <View style={styles.colorContainer}>
                <Pressable onPress={() => {navigation.navigate('Welcome')}} style={styles.LogoImage}>
                        <Image
                            source={require('../assets/Photos/icon.png')}
                            style={{ flex: 1, backgroundColor: "#131722"}}
                            resizeMode="contain"
                        />
                </Pressable> 
                <View style={styles.descriptionContainer}>
                    <View>
                        <Text style={styles.descriptionText}>
                        Welcome! Thank you for using Deltapredict. Please take a moment to review our guide. To make getting started{'\n'}
                        as easy as possible, we have created a brief guide that explains the features of our site.{'\n'}
                        </Text>
                        <Text style={styles.descriptionText}>Let's begin!</Text>
                    </View>
                    <View style={{backgroundColor: "#131722", width: "100%",height: "100%"}}>
                        <Text style={{ alignSelf: 'center',marginTop: 40, textAlign: 'left',fontSize: 20, color: '#C9D6DF'}}>Home screen</Text>
                        <Text style={{alignSelf: 'center',marginTop: 20, textAlign: 'left',fontSize: 20, color: '#C9D6DF'}}>
                        On the home screen you can get real-time information on the most active,losing and{'\n'}
                        winning stocks.There is also a search that leads to the forecast of the stock you choose. But there is a limit{'\n'}
                        to this search, it only has the option of 50 stocks from the S&P 500. And one last thing, there is a menu that we{'\n'}
                        will talk about on the next screen.{'\n'}
                        </Text>
                        <View style={{backgroundColor: "#131722", alignSelf: 'center', marginTop: 30, width: "50%",height: "50%"}}>
                            <Image 
                                source={require('../assets/Photos/LearnMoreHome.jpg')} 
                                style={{ flex: 1, backgroundColor: "#131722"}}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                    <View style={{backgroundColor: "#131722",width: "100%",height: "100%"}}>
                        <Text style={{alignSelf: 'center',marginTop: 20, textAlign: 'left',fontSize: 20, color: '#C9D6DF'}}>Menu</Text>
                        <Text style={{alignSelf: 'center',marginTop: 20, textAlign: 'left',fontSize: 20, color: '#C9D6DF'}}>
                        In the menu we have 9 buttons and one more to exit. The first two buttons are the home button where you return{'\n'}
                        to the home screen, the screen we talked about earlier, the favorites screen is a screen where you can add stocks that{'\n'}
                        you want to follow more closely. All other screens are stocks that are classified by categories.
                        </Text>
                        <View style={{backgroundColor: "#131722", alignSelf: 'center', marginTop: 30, width: "50%",height: "50%"}}>
                            <Image 
                                source={require('../assets/Photos/LearnMoreMenu.jpg')} 
                                style={{ flex: 1, backgroundColor: "#131722"}}
                                resizeMode="contain"
                            />
                        
                        </View>
                    </View>
                    <View style={{backgroundColor: "#131722",width: "100%",height: "100%"}}>
                        <Text style={{alignSelf: 'center',marginTop: 20, textAlign: 'left',fontSize: 20, color: '#C9D6DF'}}>Sector - Healthcare</Text>
                        <Text style={{alignSelf: 'center',marginTop: 20, textAlign: 'left',fontSize: 20, color: '#C9D6DF'}}>
                        In the sector screen you can see all the stocks related only to the selected sector in our example we clicked on the{'\n'}
                        Healthcare sector. where you can see the symbol of the stock, company, current price, volume and percentage of change.{'\n'}
                        </Text>
                        <View style={{backgroundColor: "#131722", alignSelf: 'center', marginTop: 30, width: "50%",height: "50%"}}>
                            <Image 
                                source={require('../assets/Photos/LearnMoreSectorStock.jpg')} 
                                style={{ flex: 1, backgroundColor: "#131722"}}
                                resizeMode="contain"
                            />
                        
                        </View>

                    </View>
                    <View style={{backgroundColor: "#131722",width: "100%",height: "100%"}}>
                        <Text style={{alignSelf: 'center',marginTop: 20, textAlign: 'left',fontSize: 20, color: '#C9D6DF'}}>Sector - Healthcare</Text>
                        <Text style={{alignSelf: 'center',marginTop: 20, textAlign: 'left',fontSize: 20, color: '#C9D6DF'}}>
                        In the sector screen you can see all the stocks related only to the selected sector in our example we clicked on the{'\n'}
                        Healthcare sector. where you can see the symbol of the stock, company, current price, volume and percentage of change.{'\n'}
                        </Text>
                        <View style={{backgroundColor: "#131722", alignSelf: 'center', marginTop: 30, width: "50%",height: "50%"}}>
                            <Image 
                                source={require('../assets/Photos/LearnMoreStockscreen.jpg')} 
                                style={{ flex: 1, backgroundColor: "#131722"}}
                                resizeMode="contain"
                            />
                        
                        </View>

                    </View>
                    
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
        backgroundColor: "#131722"
    },
    descriptionContainer: {
        flex: 1,
        backgroundColor: "#131722"
       
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
        alignSelf: 'center',
        marginTop: 50,
        textAlign: 'left',
        color: '#C9D6DF',
        fontSize: 20,
        flex: 3
    },
});