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
	Select,
} from '@chakra-ui/react'
import React, {useState, useEffect} from 'react'
import { Link, useLocation,useParams, useHistory } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { Navbar } from '../components/Navbar'
import { db } from "../firebase-config";
import { DeleteIcon,SettingsIcon, ViewIcon, ViewOffIcon, EditIcon,ArrowBackIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
	query,
	where,
	getDoc,
} from "firebase/firestore";

export default function FahrpläneDetails() {
	const [fahrplan, setFahrplan] = useState([]);
	const {id} = useParams()
	const [bildURL, setbildURL]= useState([]);
	const [lageplan_bildURL, setlageplan_bildURL]= useState([]);
	const [bearbeiten, setbearbeiten] = useState([]);
	const [isOpen, setIsOpen] = React.useState(false)
	const [button, setButton] = useState([]);
	const cancelRef = React.useRef()
	const history = useHistory()

	useEffect(() => {
			const getCampusplan = async () => {
				const fahrplanLippstadtBusdocRef = doc(db, "Fahrplan_Bus_Lippstadt", id);
				const fahrplanHammBusdocRef = doc(db, "Fahrplan_Bus_Hamm", id);
				const fahrplanLippstadtZugdocRef = doc(db, "Fahrplan_Zug_Lippstadt", id);
				const fahrplanHammZugdocRef = doc(db, "Fahrplan_Zug_Hamm", id);

				getDoc(fahrplanLippstadtBusdocRef).then((result) =>{
					if (result.exists()) {
					setFahrplan(result.data())
					} else {

					}
					})

				getDoc(fahrplanHammBusdocRef).then((result) =>{
					if (result.exists()) {
					setFahrplan(result.data())
					} else {

					}
					})

					getDoc(fahrplanLippstadtZugdocRef).then((result) =>{
					if (result.exists()) {
					setFahrplan(result.data())
					} else {

					}
					})

					getDoc(fahrplanHammZugdocRef).then((result) =>{
					if (result.exists()) {
					setFahrplan(result.data())
					} else {

					}
					})


			};
			getCampusplan();
		}, []);


const onClose = (e) => {
	if(e.target.id =='speichern_button'){

			setIsOpen(false);


	}else if (e.target.id =='rückgängig_button'){

	}
	else if (e.target.id =='abbrechen_button'){
		setIsOpen(false);
	}
}


const doAlertDialog = (button) => {
	setIsOpen(true);
	setButton(button);
}

  return (
   <Layout>
      <Navbar />
			<Heading><IconButton icon={<ArrowBackIcon /> } onClick={() => history.goBack()}/> Fahrplan Bus & Bahn</Heading>
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
        onClose={onClose}
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
              <Button ref={cancelRef} id="abbrechen_button" onClick={onClose}>
                Abbrechen
              </Button>
              <Button colorScheme={button == 'checkButton' ? "green" : "red"} id={button == 'checkButton' ? 'speichern_button' : 'rückgängig_button'} onClick={onClose} ml={3}>
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
								<MenuItem>Unveröffentlichen</MenuItem>
								<MenuItem>Veröffentlichen</MenuItem>
                <MenuDivider />

              </MenuList>
            </Menu>
				</HStack>
        </Box>




        <Stack>
					<Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'} >
					{fahrplan.Zug  == null ?  "ID: " : "ID: "  }
					{fahrplan.Zug  == null ?  fahrplan.id : fahrplan.id  }
          </Heading>

          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'} >
					{fahrplan.Zug  == null ?  "Bus: " : "Zug: "  }
					{fahrplan.Zug  == null ?  fahrplan.Buslinie: fahrplan.Zug  }
          </Heading>
					<Divider orientation="horizontal" />
          <Text color={'gray.500'}>
          </Text>

				<Text color={'gray.500'}>
				{fahrplan.Zug  == null ?  "Tag:  " : "Tag: "  }
				{fahrplan.Zug  == null ?  fahrplan.TagTyp : fahrplan.TagTyp  }
				</Text>

				<Text color={'gray.500'}>
				{fahrplan.Zug  == null ?  null : "Gleis: "  }
				{fahrplan.Zug  == null ?  null : fahrplan.Gleis  }
				</Text>

				<Text color={'gray.500'}>
				{fahrplan.Zug  == null ?  "Haltestelle Abfahrt: " : "Haltestelle Abfahrt: "  }
				{fahrplan.Zug  == null ?  fahrplan.Haltestelle_Abfahrt_Name : fahrplan.Haltestelle_Abfahrt_Name  }
				</Text>

				<Text color={'gray.500'}>
				{fahrplan.Zug  == null ?  "Haltestelle Ankunft: " : "Haltestelle Ankunft: "  }
				{fahrplan.Zug  == null ?  fahrplan.Haltestelle_Ankunft_Name : fahrplan.Haltestelle_Ankunft_Name  }
				</Text>

				<Text color={'gray.500'}>
				{fahrplan.Zug  == null ?  null : "Haltestellen: "  }
				{fahrplan.Zug  == null ?  null : fahrplan.Haltestellen  }
				</Text>

				<Text color={'gray.500'}>
				{fahrplan.Zug  == null ?  "Uhrzeit Einfahrt: " : "Uhrzeit Einfahrt: "  }
				{fahrplan.Zug  == null ?  fahrplan.Uhrzeit_Einfahrt : fahrplan.Uhrzeit_Einfahrt  }
				</Text>

				<Text color={'gray.500'}>
				{fahrplan.Zug  == null ?  "Haltestelle Ankunft: " : null  }
				{fahrplan.Zug  == null ?  fahrplan.Uhrzeit_Ankunft : null  }
				</Text>



        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>

        </Stack>
      </Box>
    </Center>
			</div>
    </Layout>
  )
}
