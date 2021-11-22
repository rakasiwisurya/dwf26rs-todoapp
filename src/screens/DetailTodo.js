import React, { useEffect, useState } from "react";
import { ScrollView, Box, Text, Button, HStack, VStack } from "native-base";
import { Alert } from "react-native";
import { showMessage } from "react-native-flash-message";
import { API } from "../config/api";
import moment from "moment";
import "moment/locale/id";

export default function DetailTodo({ route, navigation }) {
  moment.locale("id");

  const { id, title, description, createdAt, updatedAt, getTodos } =
    route.params;

  const [detailTodo, setDetailTodo] = useState({
    title: title,
    description: description,
    createdAt: createdAt,
    updatedAt: updatedAt,
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
            // alert("Delete Success");
            showMessage({
              message: "Successfully delete",
              type: "danger",
            });
            getTodos();
            navigation.goBack();
          },
        },
        {
          text: "No",
        },
      ]);
    } catch (error) {
      showMessage({
        message: error,
        type: "danger",
      });
    }
  };

  return (
    <ScrollView m={5}>
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
          <Text color="primary.500" textAlign="justify" mb={3}>
            {detailTodo?.description}
          </Text>
          <HStack space={1}>
            <Text color="coolGray.400" fontSize={10}>
              created at :
            </Text>
            <Text color="coolGray.400" fontSize={10}>
              {moment(detailTodo?.createdAt).format("Do MMMM YYYY, h:mm:ss a")}
            </Text>
          </HStack>
          <HStack space={1}>
            <Text color="coolGray.400" fontSize={10}>
              last update :
            </Text>
            <Text color="coolGray.400" fontSize={10}>
              {moment(detailTodo?.updatedAt).format("Do MMMM YYYY, h:mm:ss a")}
            </Text>
          </HStack>
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
    </ScrollView>
  );
}
