import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  FlatList,
  HStack,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { API } from "../config/api";
import moment from "moment";
import "moment/locale/id";

export default function Home({ navigation }) {
  //Init State
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");

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

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleDone = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      let data;
      for (const todo of todos) {
        if (todo.id === id) {
          data = JSON.stringify({ ...todo, status: !todo.status });
        }
      }

      await API.put(`/todos/${id}`, data, config);

      getTodos();
    } catch (error) {
      showMessage({
        message: error,
        type: "danger",
      });
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
        topDivider
      >
        <ListItem.Content>
          <HStack space={2}>
            <Box flex={7}>
              <ListItem.Title style={{ color: theme.colors.primary[500] }}>
                {item.title}
              </ListItem.Title>
              <ListItem.Subtitle>
                {moment(item.createdAt).format("LLL")}
              </ListItem.Subtitle>
            </Box>
            <Box flex={1} justifyContent="center">
              <TouchableOpacity
                onPress={() => {
                  handleDone(item.id);
                }}
              >
                <FontAwesome5
                  size={23}
                  name={item.status ? "check-circle" : "circle"}
                  style={{ color: theme.colors.primary[500] }}
                  brand
                />
              </TouchableOpacity>
            </Box>
          </HStack>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <Box m={5}>
      <VStack space={3}>
        <Text fontSize="lg" color="primary.500">
          Add New Todo
        </Text>

        <Button
          onPress={() => {
            navigation.navigate("AddTodo", { getTodos });
          }}
        >
          Add Todo
        </Button>
      </VStack>

      <Divider bg="primary.500" my={5} />

      <Text fontSize="lg" color="primary.500" mb={2}>
        Todo List
      </Text>

      <SearchBar
        placeholder="type here..."
        onChangeText={(value) => {
          handleSearch(value);
        }}
        value={search}
        cancelIcon={false}
        platform="android"
        style={{
          color: theme.colors.coolGray[400],
        }}
      />

      <FlatList
        data={todos
          .sort((a, b) => b.id - a.id)
          .filter((item) => {
            if (item.title.toLowerCase().includes(search.toLowerCase())) {
              return item;
            }
          })}
        renderItem={renderTodo}
        refreshing={isLoading}
        onRefresh={getTodos}
        nestedScrollEnabled
        height={300}
      />
    </Box>
  );
}
