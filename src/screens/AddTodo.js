import React, { useState } from "react";
import { Box, Text, Input, TextArea, VStack, Button } from "native-base";
import { showMessage } from "react-native-flash-message";
import { API } from "../config/api";

export default function AddTodo({ route, navigation }) {
  const { getTodos } = route.params;

  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    status: 0,
  });

  const postTodo = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const data = JSON.stringify(newTodo);

      API.post("/todos", data, config);

      showMessage({
        message: "Successfully added",
        type: "success",
      });
      getTodos();

      setNewTodo({
        title: "",
        description: "",
      });

      navigation.goBack();
    } catch (error) {
      showMessage({
        message: error,
        type: "danger",
      });
    }
  };

  return (
    <Box m={5}>
      <VStack space={3}>
        <Text fontSize="lg" color="primary.500">
          Add New Todo
        </Text>
        <Input
          borderColor="primary.500"
          color="primary.500"
          placeholder="Title"
          value={newTodo.title}
          onChangeText={(value) => {
            setNewTodo((prevState) => ({ ...prevState, title: value }));
          }}
        />
        <TextArea
          borderColor="primary.500"
          color="primary.500"
          placeholder="Description"
          value={newTodo.description}
          onChangeText={(value) => {
            setNewTodo((prevState) => ({ ...prevState, description: value }));
          }}
        />
        <Button onPress={postTodo}>Submit</Button>
      </VStack>
    </Box>
  );
}
