import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const querySpec = {
    query: 'SELECT * from c',
};

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
    if (!todos) {
        return (
            <View>
                <Text>Loading Todos...</Text>
            </View>
        );
    }
    console.log(todos);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
                {todos.map((todo) => {
                    return <Text>{todo.name}</Text>;
                })}
        </View>
    );
}
