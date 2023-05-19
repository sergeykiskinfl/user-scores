import { useState, useEffect } from "react";
import "./App.css";
import {
  List,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Divider,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Tooltip,
  Skeleton,
  SkeletonCircle,
  Flex,
} from "@chakra-ui/react";
import { PlusSquareIcon, RepeatIcon } from "@chakra-ui/icons";

import { User } from "./interfaces";
import UserInfo from "./UserInfo";

function App() {
  const [users, setUsers] = useState<User[]>(() => {
    return JSON.parse(localStorage.getItem("Users-score") || "[]");
  });
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchUsers() {
    setLoading(true);

    const response = await fetch(
      "https://random-data-api.com/api/users/random_user?size=3"
    );

    if (response.ok) {
      const json = await response.json();

      const remoteUsers = json.map((user: any) => {
        const { username, avatar, id } = user;

        return {
          id,
          username,
          avatar,
          score: 0,
          group: "none",
        };
      });

      // Задержка для UX
      setTimeout(() => setLoading(false), 500);

      return remoteUsers;
    } else {
      throw new Error(response.statusText);
    }
  }

  async function increaseAmountOfUsers() {
    console.log(`[User-rating]: Amount of users was increased`);
    const newRemoteUsers = await fetchUsers();
    setUsers((prev) => [...prev, ...newRemoteUsers]);
  }

  async function refreshUsers() {
    console.log(`[User-rating]: User list was refreshed`);
    const remoteUsers = await fetchUsers();
    setUsers(remoteUsers);
  }

  useEffect(() => {
    async function initialFetchUsers() {
      const remoteUsers = await fetchUsers();
      setUsers(remoteUsers);
    }
    
    if (users.length === 0) initialFetchUsers();
  });

  // Сохранение пользователей в localStorage для перезагрузки
  useEffect(() => {
    localStorage.setItem("Users-score", JSON.stringify(users));
  }, [users]);

  return (
    <>
      <Card className="card" minW="350px">
        <CardHeader fontSize="xl">
          <Box>
            <Box display="inline" mr={3}>
              Пользователи
            </Box>
            <Tooltip label="Добавить пользователей">
              <IconButton
                aria-label="Increase amount of users"
                icon={<PlusSquareIcon />}
                colorScheme="teal"
                size="sm"
                style={{ borderRadius: "500px" }}
                mr={2}
                onClick={() => increaseAmountOfUsers()}
                data-cy="increase-amount-of-users-btn"
              />
            </Tooltip>
            <Tooltip label="Обновить список пользователей">
              <IconButton
                aria-label="Refresh Users"
                icon={<RepeatIcon />}
                colorScheme="teal"
                size="sm"
                style={{ borderRadius: "500px" }}
                mr={1}
                onClick={() => refreshUsers()}
                data-cy="refresh-users"
              />
            </Tooltip>
          </Box>
          <Divider
            size="xl"
            mt={5}
            style={{ borderWidth: "1px", borderColor: "#000" }}
          />
        </CardHeader>
        <CardBody pt={1}>
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Flex
                textAlign="center"
                gap={3}
                pb={3}
                direction="row"
                key={index}
              >
                <Box>
                  <SkeletonCircle h="10" w="10" />
                </Box>
                <Box>
                  <Skeleton h="40px" w="250px" />
                </Box>
              </Flex>
            ))
          ) : (
            <List data-cy="main-list">
              {users
                .filter((user) => user.group === "none")
                .map((user) => {
                  return (
                    <UserInfo
                      key={user.id}
                      user={user}
                      setUsers={setUsers}
                      setTabIndex={setTabIndex}
                    ></UserInfo>
                  );
                })}
            </List>
          )}
        </CardBody>
      </Card>

      <Card p={3} pt={1} minW="360px">
        <CardHeader fontSize="xl" pl={0}>
          Пользователи с рейтингом
        </CardHeader>
        <Divider mb={2} style={{ borderWidth: "1px", borderColor: "#000" }} />
        <CardBody>
          <Tabs
            size="md"
            variant="enclosed"
            index={tabIndex}
            onChange={(index) => setTabIndex(index)}
          >
            <TabList>
              <Tab>Уважаемые</Tab>
              <Tab>Нарушители</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                {users.filter((user) => user.group === "respectable").length ? (
                  <List data-cy="respectable-list">
                    {users
                      .filter((user) => user.group === "respectable")
                      .map((user) => {
                        return (
                          <UserInfo
                            key={user.id}
                            user={user}
                            setUsers={setUsers}
                            setTabIndex={setTabIndex}
                          ></UserInfo>
                        );
                      })}
                  </List>
                ) : (
                  <Box>Нет пользователей</Box>
                )}
              </TabPanel>
              <TabPanel>
                {users.filter((user) => user.group === "bully").length ? (
                  <List data-cy="bully-list">
                    {users
                      .filter((user) => user.group === "bully")
                      .map((user) => {
                        return (
                          <UserInfo
                            key={user.id}
                            user={user}
                            setUsers={setUsers}
                            setTabIndex={setTabIndex}
                          ></UserInfo>
                        );
                      })}
                  </List>
                ) : (
                  <Box>Нет пользователей</Box>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </>
  );
}

export default App;
