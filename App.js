/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { StatusBar, FlatList, StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-get-random-values'

const CosmosClient = require('@azure/cosmos').CosmosClient
const Tab = createBottomTabNavigator();

const endpoint = //get your endpoint securely here
const key = //get your master key securely here
const databaseId = 'ToDoList'
const containerId = 'Items'

const Stack = createStackNavigator();

const client = new CosmosClient({endpoint, key});

const querySpec = {
    query: 'SELECT * from c',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});

function HomeScreen() {
    const [todos, setTodos] = useState();
    useEffect(() => {
        client
            .database(databaseId)
            .container(containerId)
            .items.query(querySpec)
            .fetchAll()
            .then((response) => {
                setTodos(response.resources);
            });
    });
    return (
        <View style={styles.container}>
            <FlatList
                numColumns={1}
                data={ todos }
                renderItem={({ item }) => renderItem(item)}
            />
        </View>
    );
}
function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}

function LogoTitle() {
    return (
        <Image
            style={{width: 50, height: 50}}
            source={{uri: 'https://techcommunity.microsoft.com/t5/image/serverpage/image-id/74230iC3CF45B879F897EE'}}
            resizeMode={'cover'} // cover or contain its upto you view look
        />
    );
}
function renderItem(item) {
    return (
        <TouchableOpacity>
            <View style={{
                height: 70
            }}>
                <ListItem bottomDivider>
                    <Avatar source={{uri: 'https://www.datastax.com/sites/default/files/2020-10/azure%402x.png' }} />
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </View>
        </TouchableOpacity>
    )
}
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        headerTitle: props => <LogoTitle {...props} />,
                        headerRight: () => (
                            <Button
                                onPress={() =>
                                    client
                                        .database(databaseId)
                                        .container(containerId)
                                        .items.create(
                                        {
                                            "id": "2",
                                            "category": "personal",
                                            "name": "groceries",
                                            "description": "...and pick up wine. :)",
                                            "isComplete": false,
                                        }
                                    )
                                }
                                title="Add"
                                color="#00cc00"
                            />
                        ),
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
