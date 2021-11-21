import React, { useState } from "react";
import { Box, Text, VStack, Input, TextArea, Button } from "native-base";
import { API } from "../config/api";

export default function UpdateTodo({ route, navigation }) {
  const { id, title, description, getDetailTodo, getTodos } = route.params;

  const [todo, setTodo] = useState({
    title: title,
    description: description,
  });

  const updateTodo = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const data = JSON.stringify(todo);

      await API.put(`todos/${id}`, data, config);

      getTodos();
      getDetailTodo();
      alert("Update success");
      navigation.goBack();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Box m={3}>
      <VStack space={3}>
        <Box>
          <Text fontSize="md" color="primary.500">
            Title
          </Text>
          <Input
            borderColor="primary.500"
            color="primary.500"
            placeholder="Title"
            value={todo.title}
            onChangeText={(value) => {
              setTodo((prevState) => ({ ...prevState, title: value }));
            }}
          />
        </Box>
        <Box>
          <Text fontSize="md" color="primary.500">
            Description
          </Text>
          <TextArea
            borderColor="primary.500"
            color="primary.500"
            placeholder="Description"
            value={todo.description}
            onChangeText={(value) => {
              setTodo((prevState) => ({ ...prevState, description: value }));
            }}
          />
        </Box>
        <Button onPress={updateTodo}>Submit</Button>
      </VStack>
    </Box>
  );
}
