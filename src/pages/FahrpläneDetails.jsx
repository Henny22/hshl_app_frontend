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
import ResizeTextarea from "react-textarea-autosize";
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


	const [bearbeiten, setBearbeiten] = useState([]);
	const [isOpen, setIsOpen] = React.useState(false)
	const [campus_transport_type, setCampus_transport_type]= useState([]);
	const [button, setButton] = useState([]);
	const cancelRef = React.useRef()
	const history = useHistory()
	const fahrplanLippstadtBusdocRef = doc(db, "Fahrplan_Bus_Lippstadt", id);
	const fahrplanHammBusdocRef = doc(db, "Fahrplan_Bus_Hamm", id);
	const fahrplanLippstadtZugdocRef = doc(db, "Fahrplan_Zug_Lippstadt", id);
	const fahrplanHammZugdocRef = doc(db, "Fahrplan_Zug_Hamm", id);

	useEffect(() => {
			const getCampusplan = async () => {
			setBearbeiten(false);
				getDoc(fahrplanLippstadtBusdocRef).then((result) =>{
					if (result.exists()) {
					setFahrplan(result.data())
					setCampus_transport_type("Lippstadt_Bus")
					} else {

					}
					})

				getDoc(fahrplanHammBusdocRef).then((result) =>{
					if (result.exists()) {
					setFahrplan(result.data())
					setCampus_transport_type("Hamm_Bus")
					} else {

					}
					})

					getDoc(fahrplanLippstadtZugdocRef).then((result) =>{
					if (result.exists()) {
					setFahrplan(result.data())
					setCampus_transport_type("Lippstadt_Bahn")
					} else {

					}
					})

					getDoc(fahrplanHammZugdocRef).then((result) =>{
					if (result.exists()) {
					setFahrplan(result.data())
					setCampus_transport_type("Hamm_Bahn")
					} else {

					}
					})
			};
			getCampusplan();
		}, []);


const onClose = (e) => {
	if(e.target.id =='speichern_button'){
			fahrplan.id = document.getElementById("input_id").value
			fahrplan.TagTyp = document.getElementById("input_TagTyp").value
			fahrplan.Haltestelle_Abfahrt_Name = document.getElementById("input_Haltestelle_Abfahrt_Name").value
			fahrplan.Haltestelle_Ankunft_Name = document.getElementById("input_Haltestelle_Ankunft_Name").value
			fahrplan.Uhrzeit_Einfahrt = document.getElementById("input_Uhrzeit_Einfahrt").value

			if(campus_transport_type == "Lippstadt_Bus"){
				fahrplan.Buslinie = document.getElementById("input_buslinie").value
				fahrplan.Uhrzeit_Ankunft = document.getElementById("input_Uhrzeit_Ankunft").value
				
				updateDoc(fahrplanLippstadtBusdocRef, {							
					Buslinie: fahrplan.Buslinie , 
					Haltestelle_Abfahrt_Name: fahrplan.Haltestelle_Abfahrt_Name , 
					Haltestelle_Ankunft_Name: fahrplan.Haltestelle_Ankunft_Name, 
					TagTyp: fahrplan.TagTyp, 
					Uhrzeit_Ankunft: fahrplan.Uhrzeit_Ankunft, 
					Uhrzeit_Einfahrt: 	fahrplan.Uhrzeit_Einfahrt, 
					id: fahrplan.id, 
				}).then(function () {
					setBearbeiten(false);
					setIsOpen(false);
				}).catch(function (error) {
					console.log(error);
				})

			} else if(campus_transport_type == "Lippstadt_Bahn"){
				fahrplan.Gleis = document.getElementById("input_Gleis").value
				fahrplan.Haltestellen = document.getElementById("textarea_haltestellens").value
				fahrplan.Zug  = document.getElementById("input_Zug").value

 
				updateDoc(fahrplanLippstadtZugdocRef, {							
					Gleis : fahrplan.Gleis ,
					Haltestelle_Abfahrt_Name: fahrplan.Haltestelle_Abfahrt_Name,
					Haltestelle_Ankunft_Name: fahrplan.Haltestelle_Ankunft_Name,
					Haltestellen : fahrplan.Haltestellen,
					TagTyp : fahrplan.TagTyp,
					Uhrzeit_Einfahrt : fahrplan.Uhrzeit_Einfahrt,
					Zug : fahrplan.Zug,
					id : fahrplan.id,
				}).then(function () {
					setBearbeiten(false);
					setIsOpen(false);
				}).catch(function (error) {
					console.log(error);
				})

			}else if(campus_transport_type == "Hamm_Bus"){
				fahrplan.Buslinie = document.getElementById("input_buslinie").value
				fahrplan.Uhrzeit_Ankunft = document.getElementById("input_Uhrzeit_Ankunft").value
				
				updateDoc(fahrplanHammBusdocRef, {							
					Buslinie: fahrplan.Buslinie , 
					Haltestelle_Abfahrt_Name: fahrplan.Haltestelle_Abfahrt_Name , 
					Haltestelle_Ankunft_Name: fahrplan.Haltestelle_Ankunft_Name, 
					TagTyp: fahrplan.TagTyp, 
					Uhrzeit_Ankunft: fahrplan.Uhrzeit_Ankunft, 
					Uhrzeit_Einfahrt: 	fahrplan.Uhrzeit_Einfahrt, 
					id: fahrplan.id, 
				}).then(function () {
					setBearbeiten(false);
					setIsOpen(false);
				}).catch(function (error) {
					console.log(error);
				})

			}else if(campus_transport_type == "Hamm_Bahn"){
				fahrplan.Gleis = document.getElementById("input_Gleis").value
				fahrplan.Haltestellen = document.getElementById("textarea_haltestellen").value
				fahrplan.Zug  = document.getElementById("input_Zug").value

				updateDoc(fahrplanHammZugdocRef, {							
					Gleis : fahrplan.Gleis ,
					Haltestelle_Abfahrt_Name: fahrplan.Haltestelle_Abfahrt_Name,
					Haltestelle_Ankunft_Name: fahrplan.Haltestelle_Ankunft_Name,
					Haltestellen : fahrplan.Haltestellen,
					TagTyp : fahrplan.TagTyp,
					Uhrzeit_Einfahrt : fahrplan.Uhrzeit_Einfahrt,
					Zug : fahrplan.Zug,
					id : fahrplan.id,
				}).then(function () {
					setBearbeiten(false);
					setIsOpen(false);
				}).catch(function (error) {
					console.log(error);
				})
			}
			

	}else if (e.target.id =='rückgängig_button'){
		setIsOpen(false);
		setBearbeiten(false);
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
                <MenuItem onClick={() => setBearbeiten(true)} >Bearbeiten</MenuItem>
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

					{fahrplan.Zug  == null   ?  "ID: " : "ID: "  }
					{bearbeiten ? <input id="input_id" defaultValue={fahrplan.id}></input> : fahrplan.id }
          </Heading>

          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'} >
					{fahrplan.Zug  == null ?  "Bus: " : "Zug: "  }
					{fahrplan.Zug  == null && bearbeiten == false ?  fahrplan.Buslinie : null  }
					{fahrplan.Zug  != null && bearbeiten == false ?   fahrplan.Zug  : null}



					{fahrplan.Zug  == null && bearbeiten == true  ?  <input id="input_buslinie" defaultValue={fahrplan.Buslinie}></input> : null  }
					{fahrplan.Zug  != null && bearbeiten == true  ?  <input id="input_Zug" defaultValue={fahrplan.Zug}></input> : null  }


          </Heading>
					<Divider orientation="horizontal" />
          <Text color={'gray.500'}>
          </Text>

				<Text color={'gray.500'}>
				{fahrplan.Zug  == null ?  "Tag:  " : "Tag: "  }
				{bearbeiten ?  <input id="input_TagTyp" defaultValue={fahrplan.TagTyp}></input> : fahrplan.TagTyp}
				</Text>

				<Text color={'gray.500'}>
				{fahrplan.Zug  == null ?  null : "Gleis: "  }
				{fahrplan.Zug  != null && bearbeiten == false  ? fahrplan.Gleis  : null}
				{fahrplan.Zug  != null && bearbeiten == true ? <input id="input_Gleis" defaultValue={fahrplan.Gleis}></input> : null }
				</Text>

				<Text color={'gray.500'}>
				{fahrplan.Zug  == null ?  "Haltestelle Abfahrt: " : "Haltestelle Abfahrt: "  }
				{bearbeiten ?<input id="input_Haltestelle_Abfahrt_Name" defaultValue={fahrplan.Haltestelle_Abfahrt_Name}></input> : fahrplan.Haltestelle_Abfahrt_Name   }

				</Text>

				<Text color={'gray.500'}>
				{fahrplan.Zug  == null ?  "Haltestelle Ankunft: " : "Haltestelle Ankunft: " }
				{bearbeiten ? <input id="input_Haltestelle_Ankunft_Name" defaultValue={fahrplan.Haltestelle_Ankunft_Name}></input> : fahrplan.Haltestelle_Ankunft_Name   }
				</Text>

				<Text color={'gray.500'}>
				{fahrplan.Zug  == null ?  null : "Haltestellen: "  }
				{fahrplan.Zug  != null && bearbeiten == false  ? fahrplan.Haltestellen  : null}
				{fahrplan.Zug  != null && bearbeiten == true ? < Textarea id="textarea_haltestellen" defaultValue={fahrplan.Haltestellen} as={ResizeTextarea}/> : null }



				</Text>

				<Text color={'gray.500'}>
				{fahrplan.Zug  == null ?  "Uhrzeit Einfahrt: " : "Uhrzeit Einfahrt: "  }
				{bearbeiten ? <input id="input_Uhrzeit_Einfahrt" defaultValue={fahrplan.Uhrzeit_Einfahrt}></input> : fahrplan.Uhrzeit_Einfahrt }

				</Text>

				<Text color={'gray.500'}>
				{fahrplan.Zug  == null ?  "Haltestelle Ankunft: " : null  }
				{fahrplan.Zug  == null && bearbeiten == false  ? fahrplan.Uhrzeit_Ankunft  :  null}
				{fahrplan.Zug  == null && bearbeiten == true ?  <input id="input_Uhrzeit_Ankunft" defaultValue={fahrplan.Uhrzeit_Ankunft}></input> : null  }
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
