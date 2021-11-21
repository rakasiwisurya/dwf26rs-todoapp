import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  FlatList,
  Input,
  Text,
  TextArea,
  useTheme,
  VStack,
} from "native-base";
import { Keyboard } from "react-native";
import { ListItem } from "react-native-elements";
import { API } from "../config/api";
import moment from "moment";
import "moment/locale/id";

export default function Home({ navigation }) {
  //Init State
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
  });

  // Create LifeCycle
  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    setIsLoading(true);

    try {
      const response = await API.get("/todos");
      setTodos(response.data.data);
      setIsLoading(false);
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  };

  const postTodo = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const data = JSON.stringify(newTodo);

      API.post("/todos", data, config);

      Keyboard.dismiss();
      alert("Todo successfully added");
      getTodos();

      setNewTodo({
        title: "",
        description: "",
      });
    } catch (error) {
      alert(error);
    }
  };

  const theme = useTheme();

  // Create Component List
  const renderTodo = ({ item }) => {
    moment.locale("id");

    return (
      <ListItem
        onPress={() => {
          navigation.navigate("DetailTodo", { ...item, getTodos: getTodos });
        }}
        key={`todos-${item.id}`}
        bottomDivider
      >
        <ListItem.Content>
          <ListItem.Title style={{ color: theme.colors.primary[500] }}>
            {item.title}
          </ListItem.Title>
          <ListItem.Subtitle>
            {moment(item.createdAt).format("LLLL")}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <Box p={5}>
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

      <Divider bg="primary.500" my={5} />

      <Text fontSize="lg" color="primary.500" mb={2}>
        Todo List
      </Text>

      <FlatList
        data={todos.sort((a, b) => b.id - a.id)}
        renderItem={renderTodo}
        refreshing={isLoading}
        onRefresh={getTodos}
        nestedScrollEnabled
        height={220}
      />
    </Box>
  );
}
