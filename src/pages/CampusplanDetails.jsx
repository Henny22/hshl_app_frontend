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
	const [lageplan_bildURL, setlageplan_bildURL]= useState([]);
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
	setbildURL(result.data().BildLink)
	setlageplan_bildURL(result.data().PlanBildLink)
	setbearbeiten(false);
	} else {
  // doc.data() will be undefined in this case
	}
	})
  }, []);


const onClose = (e) => {
	if(e.target.id =='speichern_button'){

		campusplan.Gebaeude = "Lippstadt" ? document.getElementById("select_Lippstadt").value : document.getElementById("select_Hamm").value
		campusplan.BildLink = bildURL;
		campusplan.PlanBildLink = lageplan_bildURL;
		campusplan.RaumName =  document.getElementById("input_RaumName").value;
		campusplan.RaumBezeichnung =  document.getElementById("input_RaumBezeichnung").value;

		const docRef = doc(db, "CampusPlan", id);
		updateDoc(docRef, {
		Gebaeude: campusplan.Gebaeude,
		BildLink: campusplan.BildLink,
		PlanBildLink: campusplan.PlanBildLink,
		RaumName: campusplan.RaumName ,
		RaumBezeichnung: 	campusplan.RaumBezeichnung,

		}).then(function () {
			setbearbeiten(false);
			setIsOpen(false);
		}).catch(function (error) {
			console.log(error);
		})

	}else if (e.target.id =='rückgängig_button'){
		setbildURL(campusplan.BildLink)
		setlageplan_bildURL(campusplan.PlanBildLink)
		setbearbeiten(false);
		setIsOpen(false);
	}
	else if (e.target.id =='abbrechen_button'){
		setIsOpen(false);
	}
}


const doAlertDialog = (button) => {
	setIsOpen(true);
	setButton(button);
}

const handleChange_Url_Bild = (event) => {
	if(event.target.value == null || event.target.value == "" ){
	setbildURL(campusplan.BildLink)
	}else{
	setbildURL(event.target.value);
	}
}
const handleChange_Lageplan_Url_Bild = (event) => {
	if(event.target.value == null || event.target.value == "" ){
	setlageplan_bildURL(campusplan.PlanBildLink)
	}else{
	setlageplan_bildURL(event.target.value);
	}
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
				{bearbeiten?
				<Stack mb={7}>
					{campusplan.Campus == "Lippstadt" ?
						<Select id="select_Lippstadt"  size="md" defaultValue={campusplan.Gebaeude} >
						<option id="select_L1"value="L1">L1</option>
						<option id="select_L2"value="L2">L2</option>
						<option id="select_L3"value="L3">L3</option>
						<option id="select_L4"value="L4">L4</option>
					</Select>
					:
						<Select id="select_Hamm" size="md" defaultValue={campusplan.Gebaeude}>
						<option id="select_H_1.1"value="H1.1">H 1.1</option>
						<option id="select_H_1.2"value="H1.2">H 1.2</option>
						<option id="select_H_2.1"value="H2.1">H 2.1</option>
						<option id="select_H_4.1-3"value="H4.1-3">H 4.1-3</option>
						</Select>
					}
					</Stack>
					: null}

				{bearbeiten ? < Input id="input_RaumBezeichnung" defaultValue={campusplan.RaumBezeichnung} mb={10} /> : null}

				{bearbeiten?
				<Box
          h={'50px'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}
					align="right"
					>
					< Input name="input_url_bild" placeholder="Neuen Bild Link hier einfügen" onChange={handleChange_Url_Bild}/> </Box>
					: null}
				<Box
          h={'210px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}>
          <Image h={'210px'} width={'100%'}
            src={
              bildURL
            }
          />
        </Box>
        <Stack>

          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'} >
							{	bearbeiten ? < Input id="input_RaumName" defaultValue={campusplan.RaumName} /> :  campusplan.RaumName }
          </Heading>
					<Divider orientation="horizontal" />
          <Text color={'gray.500'}>
							{	bearbeiten ? < Input id="input_" placeholder="Neue GPS Daten hier einfügen" mb={2}/> :  null }
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
						{	bearbeiten ? < Input id="input_lageplan"  placeholder="Neuen Lageplan Link hier einfügen" mb={3} onChange={ handleChange_Lageplan_Url_Bild}/>: null }

					<Box
          h={'210px'}
          bg={'gray.100'}

          mx={-6}
          mb={6}
          pos={'relative'}>
					<Image height="210px" width={'100%'}
            src={
              lageplan_bildURL
            }
          />
					</Box>
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
