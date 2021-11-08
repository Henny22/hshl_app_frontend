import {
  Badge,
  chakra,
  Code,
  Heading,
  List,
  ListItem,
  OrderedList,
 	Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
	HStack,
	 Box,
  Center,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
	Image,
	Divider,
	Input,
	Textarea,
  Flex,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
	  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import React, {useState, useEffect} from 'react'
import { Link, useLocation,useParams, useHistory } from 'react-router-dom'

import { Layout } from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { Navbar } from '../components/Navbar'
import ResizeTextarea from "react-textarea-autosize";
import { db } from "../firebase-config";
import { DeleteIcon,SettingsIcon, ViewIcon, ViewOffIcon, EditIcon,ArrowBackIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
	getDoc,
} from "firebase/firestore";
import { getAuth, deleteUser } from "firebase/auth";


export default function CampusplanDetails() {

	const [campusplan, setCampusplan] = useState([]);
	const [bildURL, setbildURL]= useState([]);
	const [bearbeiten, setbearbeiten] = useState([]);
	const [isOpen, setIsOpen] = React.useState(false)
	const [button, setButton] = useState([]);
	const cancelRef = React.useRef()
	const {id} = useParams()
	const history = useHistory()

useEffect(() => {
	const docRef = doc(db, "CampusPlan", id);
	getDoc(docRef).then((result) =>{

	if (result.exists()) {
	setCampusplan(result.data())

	} else {
  // doc.data() will be undefined in this case
	}
	})
  }, []);





const doAlertDialog = (button) => {
	setIsOpen(true);
	setButton(button);
}



  return (
	<>
   <Layout>
      <Navbar />

			<Heading>	<IconButton icon={<ArrowBackIcon /> } onClick={() => history.goBack()}/> News</Heading>
      {/* <Text my={6}>{currentUser?.email}</Text> */}
		<div>
			 <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={10}
        overflow={'hidden'}>
				 <Box
          h={'50px'}
          mt={-6}
          mx={-6}
          mb={6}

          pos={'relative'}
					align="right"
			>
			<HStack spacing="24px" alignItems="right">
			{bearbeiten ? <IconButton  id='checkButton' icon={<CheckIcon />} onClick={() => doAlertDialog('checkButton')}/>   : null}
			{bearbeiten ? <IconButton  id='closeButton' icon={<CloseIcon />} onClick={() => doAlertDialog('closeButton')}/>   : null}
			<AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}

      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {button == 'checkButton' ? 'Speichern der Änderungen' : 'Löschen der Änderungen'}
            </AlertDialogHeader>

            <AlertDialogBody>
							{button == 'checkButton' ? 'Bist du sicher, dass Sie die News abspeichern wollen? Sie können es nicht mehr Rückgängig machen.' : 'Bist du sicher, dass Sie die Änderungen Rückgängig machen wollen? Sie können es nicht mehr Rückgängig machen.'}

            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} id="abbrechen_button" >
                Abbrechen
              </Button>
              <Button colorScheme={button == 'checkButton' ? "green" : "red"} id={button == 'checkButton' ? 'speichern_button' : 'rückgängig_button'}  ml={3}>
                {button == 'checkButton' ? 'Speichern' : 'Rückgängig'}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
			<Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
								>
						<IconButton  icon={bearbeiten ? null : <SettingsIcon />} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => setbearbeiten(true)}>Bearbeiten</MenuItem>
                <MenuDivider />
								<MenuItem>MenuItem 1</MenuItem>
							<MenuItem>MenuItem 2</MenuItem>
							<MenuItem>MenuItem 3</MenuItem>
                <MenuDivider />

              </MenuList>
            </Menu>
				</HStack>
        </Box>

				<Box
          h={'210px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}>
          <Image
            src={
              campusplan.BildLink
            }
            layout={'fill'}
          />
        </Box>
        <Stack>

          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'} >
             {campusplan.RaumName }
          </Heading>
					<Divider orientation="horizontal" />
          <Text color={'gray.500'}>
					<HStack mb={4} align={'center'} >
					<Button
						type='submit'
						colorScheme='pink'
						size='lg'
						fontSize='md'

						>
						Auf der Karte zeigen
    			</Button>
					</HStack>
					<Image
            src={
              campusplan.BildLink
            }
            layout={'fill'}
          />
          </Text>

        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>

        </Stack>
      </Box>
    </Center>
			</div>
    </Layout>
		</>
  )
}
