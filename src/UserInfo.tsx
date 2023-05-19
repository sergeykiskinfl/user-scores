import React, { memo } from "react";
import { User } from "./interfaces";
import {
  ListItem,
  Avatar,
  Box,
  IconButton,
  Button,
  Text,
  Divider,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Portal,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon, DeleteIcon } from "@chakra-ui/icons";

interface UserInfoProps {
  user: User;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
}

// Информация о пользователе
export function UserInfo({
  user: { id, username, avatar, score, group },
  setUsers,
  setTabIndex,
}: UserInfoProps): JSX.Element {
  
  // Хук для модалки
  const { isOpen, onOpen, onClose } = useDisclosure();

  const changeRating = (newScore: number, newGroup: string, keep = true) => {
    setUsers((prev: User[]) => {
      const tempArr = [...prev];

      const indexOfUser = tempArr.findIndex((user) => user.id === id);

      tempArr.splice(indexOfUser, 1, {
        id,
        username,
        avatar,
        score: newScore,
        group:
          group === "none" ? newGroup : newScore == 0 && !keep ? "none" : group,
      });

      return tempArr;
    });
  };

  const increaseRating = () => {
    if (group === "none") setTabIndex(0);
    const newScore = score + 1;
    changeRating(newScore, "respectable");
    console.log(`[User-rating]: User increased rating for ${username}`);

    if (newScore >= 5) onOpen();
  };

  const decreaseRating = () => {
    if (group === "none") setTabIndex(1);
    const newScore = score - 1;
    changeRating(newScore, "bully");
    console.log(`[User-rating]: User lowered rating for ${username}`);

    if (newScore <= -5) onOpen();
  };

  let modalText: string | null = null;
  let increaseBtnDisabled = false;
  let decreaseBtnDisabled = false;

  if (score === 0) {
    if (group === "respectable") decreaseBtnDisabled = true;
    if (group === "bully") increaseBtnDisabled = true;
  }

  if (score >= 5) {
    modalText = `Нужно вознаградить ${username}. Сделать это?`;
    increaseBtnDisabled = true;
  } else if (score <= -5) {
    modalText = `Пора забанить ${username}. Сделать это?`;
    decreaseBtnDisabled = true;
  }

  const handleBtnModal = () => {
    const newScore = 0;
    changeRating(newScore, "none", false);
    console.log(`[User-rating]: User returned ${username} to the main list`);
    onClose();
  };

  return (
    <>
      <ListItem key={id} className="list__item" data-cy={`list-item-${id}`}>
        <Avatar name={username} src={avatar} mr={2} />
        <Box data-cy={`username-${id}`}>{username}</Box>
        <Flex ml={2}>
          <IconButton
            aria-label="Increase rating"
            icon={<AddIcon />}
            colorScheme="teal"
            size="sm"
            style={{ borderRadius: "500px" }}
            mr={1}
            onClick={() => increaseRating()}
            isDisabled={increaseBtnDisabled}
            data-cy={`increase-rating-btn-${id}`}
          />
          {group !== "none" ? (
            <Text data-cy={`score-${id}`} fontSize="lg">
              {score}
            </Text>
          ) : null}
          <IconButton
            aria-label="Decrease rating"
            icon={<MinusIcon />}
            colorScheme="teal"
            size="sm"
            style={{ borderRadius: "500px" }}
            ml={1}
            onClick={() => decreaseRating()}
            isDisabled={decreaseBtnDisabled}
            data-cy={`deacrease-rating-btn-${id}`}
          />
          {group !== "none" && score === 0 ? (
            <IconButton
              aria-label="Return user"
              icon={<DeleteIcon />}
              colorScheme="red"
              size="sm"
              style={{ borderRadius: "500px" }}
              ml={1}
              onClick={() => handleBtnModal()}
              data-cy={`return-user-btn-${id}`}
            />
          ) : null}
        </Flex>
      </ListItem>
      <Divider />
      <Portal>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Информация</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box data-cy={`modal-text-${id}`}>{modalText}</Box>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="teal"
                onClick={() => handleBtnModal()}
                data-cy={`modal-confirm-btn-${id}`}
              >
                Да
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Portal>
    </>
  );
}

export default memo(UserInfo);
