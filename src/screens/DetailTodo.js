import React, { useEffect, useState } from "react";
import { Box, Text, Button, HStack, VStack } from "native-base";
import { Alert } from "react-native";
import { API } from "../config/api";

export default function DetailTodo({ route, navigation }) {
  const { id, title, description, getTodos } = route.params;

  const [detailTodo, setDetailTodo] = useState({
    title: title,
    description: description,
  });

  useEffect(() => {
    getDetailTodo();
  }, []);

  const getDetailTodo = async () => {
    try {
      const response = await API.get(`/todos/${id}`);
      setDetailTodo(response.data.data);
    } catch (error) {
      alert(error);
    }
  };

  const deleteTodo = () => {
    try {
      Alert.alert("Confirmation", "Are you sure?", [
        {
          text: "Yes",
          onPress: async () => {
            await API.delete(`/todos/${id}`);
            alert("Delete Success");
            getTodos();
            navigation.goBack();
          },
        },
        {
          text: "No",
        },
      ]);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Box m={5}>
      <VStack space={3}>
        <Box
          bg="white"
          borderColor="coolGray.200"
          borderWidth={1}
          py={3}
          px={5}
        >
          <Text color="primary.500" fontWeight={700} fontSize="2xl" mb={3}>
            {detailTodo?.title}
          </Text>
          <Text color="primary.500" textAlign="justify">
            {detailTodo?.description}
          </Text>
        </Box>

        <HStack space={2}>
          <Button
            flex={1}
            colorScheme="yellow"
            _text={{ color: "white" }}
            onPress={() => {
              navigation.navigate("UpdateTodo", {
                ...route.params,
                getDetailTodo: getDetailTodo,
              });
            }}
          >
            Edit
          </Button>
          <Button flex={1} colorScheme="red" onPress={deleteTodo}>
            Delete
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
