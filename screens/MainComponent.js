import { Text, Image, StyleSheet, Platform, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import logo from '../assets/images/logo.png';
import CampsiteInfoScreen from './CampsiteInfoScreen';
import DirectoryScreen from './DirectoryScreen';
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import ContactScreen from './ContactScreen';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchPartners } from '../features/partners/partnersSlice';
import { fetchCampsites } from '../features/campsites/campsitesSlice';
import { fetchPromotions } from '../features/promotions/promotionsSlice';
import { fetchComments } from '../features/comments/commentsSlice';
import ReservationScreen from './ReservationScreen';
import FavoritesScreen from './FavoritesScreen';


const Drawer = createDrawerNavigator();

const screenOptions = {
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: '#5637DD' }
}

const HomeNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={({ navigation }) => ({
                    title: 'Home',
                    headerLeft: () => (
                        <Icon
                            name='home'
                            type='font-awesome'
                            iconStyle={StyleSheet.stackIcon}
                            onPress={() => navigation.togglerDrawer()}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    )

}

const ContactNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name="Contact"
                component={ContactScreen}
                options={({ navigation }) => ({
                    title: 'Contact Us',
                    headerLeft: () => (
                        <Icon
                            name='address-card'
                            type='font-awesome'
                            iconStyle={StyleSheet.stackIcon}
                            onPress={() => navigation.togglerDrawer()}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    )
};

const ReservationNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name="Reservation"
                component={ReservationScreen}
                options={({ navigation }) => ({
                    title: 'Reservation Search',
                    headerLeft: () => (
                        <Icon
                            name='tree'
                            type='font-awesome'
                            iconStyle={StyleSheet.stackIcon}
                            onPress={() => navigation.togglerDrawer()}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    )
};

const FavoritesNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name="Favorite Campsites"
                component={FavoritesScreen}
                options={({ navigation }) => ({
                    title: 'Favorites',
                    headerLeft: () => (
                        <Icon
                            name='heart'
                            type='font-awesome'
                            iconStyle={StyleSheet.stackIcon}
                            onPress={() => navigation.togglerDrawer()}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    )
};

const DirectoryNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName='Directory'
            screenOptions={ screenOptions }
        >
            <Stack.Screen
                name='Directory'
                component={DirectoryScreen}
                options={({ navigation }) => ({
                    title: 'Campsite Directory',
                    headerLeft: () => (
                        <Icon
                            name='list'
                            type='font-awesome'
                            iconStyle={StyleSheet.stackIcon}
                            onPress={() => navigation.togglerDrawer()}
                        />
                    )
                })}
            />
            <Stack.Screen
                name='CampsiteInfo'
                component={CampsiteInfoScreen}
                options={({ route }) => ({
                    title: route.params.campsite.name
                })}
            />
        </Stack.Navigator>

    );
};

const AboutNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name="About"
                component={AboutScreen}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <Icon
                            name='info-circle'
                            type='font-awesome'
                            iconStyle={StyleSheet.stackIcon}
                            onPress={() => navigation.togglerDrawer()}
                        />
                    )
                })}
            />
        </Stack.Navigator>

    )
}

const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props}>
        <View style={styles.drawerHeader}>
            <View style={{ flex: 1 }}>
                <Image source={logo} style={styles.drawerImage} />
            </View>
            <View style={{ flex: 2 }}>
                <Text style={styles.drawerHeaderText}>NuCamp</Text>
            </View>
        </View>
        <DrawerItemList {...props} labelStyle={{ fontWeight: 'bold' }} />
    </DrawerContentScrollView>
)

const Main = () => {
    const dispatch = useDispatch();

    useEffect (() => {
        dispatch(fetchCampsites());
        dispatch(fetchPromotions());
        dispatch(fetchPartners());
        dispatch(fetchComments());
            }, [dispatch]);
            
    return (
        <View style={{
            flex: 1, paddingTop:
                Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
        }}
        >
            <Drawer.Navigator
                initialRouteName='Home'
                drawerContent={CustomDrawerContent}
                drawerStyle={{ backgroundColor: '#CEC8FF' }}
            >
                <Drawer.Screen
                    name='Home'
                    component={HomeNavigator}
                    options={{
                        title: 'Home',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='home'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name='Directory'
                    component={DirectoryNavigator}
                    options={{
                        title: 'Campsite Directory',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='list'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name='ReserveCampsite'
                    component={ReservationNavigator}
                    options={{
                        title: 'Reseve Campsite',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='tree'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            />
                        )
                    }}
                />
                 <Drawer.Screen
                    name='Favorites'
                    component={FavoritesNavigator}
                    options={{
                        title: 'My Favorites',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='heart'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name='About'
                    component={AboutNavigator}
                    options={{
                        title: 'About',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='info-circle'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name='Contact'
                    component={ContactNavigator}
                    options={{
                        title: 'Contact Us',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='address-card'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            />
                        )
                    }}
                />
            </Drawer.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    drawerHeader: {
        backgroundColor: '#5637DD',
        height: 14,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 60
    },
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    }
})

export default Main;