import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
// import { persistCache } from 'apollo-cache-persist';
// import AsyncStorage from '@react-native-community/async-storage';
import {ProductsList} from './src/screens/ProductsList';
import {ProductDetails} from './src/screens/ProductDetails';
import {GRAPHQL_URL} from './src/config';
import {FAVORITE_PRODUCT_FRAGMENT} from "./src/graphql/requests";
import {cache} from "./src/graphql/cache";
import {resolvers} from "./src/graphql/resolvers";
import {HeaderFavoriteProductsCount} from "./src/components/HeaderProductFavoriteCount";
// import { cache } from './graphql/cache';
// import { resolvers } from './graphql/resolvers';
// import { HeaderFavoriteProductsCount } from './compoents/HeaderFavoriteProductsCount';
// import { Loading } from './compoents/Loading';



const Stack = createNativeStackNavigator();



const client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: cache,
    resolvers: resolvers
})

export default function () {


    return (
        <ApolloProvider client={client}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerBackTitleVisible: false,
                        headerTintColor: 'black',
                    }}>
                    <Stack.Screen
                        name={'ProductsList'}
                        component={ProductsList}
                        options={{
                            headerRight: () => <HeaderFavoriteProductsCount />,
                        }}
                    />
                    <Stack.Screen
                        name={'ProductDetails'}
                        component={ProductDetails}
                        options={{
                            headerRight: () => <HeaderFavoriteProductsCount />,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </ApolloProvider>
    );
}
