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
import { DeleteIcon,SettingsIcon, ViewIcon, ViewOffIcon, EditIcon,ArrowBackIcon, CheckIcon, CloseIcon, UnlockIcon } from '@chakra-ui/icons'
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

export default function CampusplanErstellen() {
	var url_bild;
	const [campusplan, setCampusplan] = useState([]);
	const [standort, setStandort] = useState([]);
	const [preview, setPreview] = useState(false)
	const [bildLink, setBildLink] = useState([]);
	const [campus, setCampus] = useState([]);
	const [gebaeude, setGebaeude] = useState([]);
	const [planBildLink, setPlanBildLink] = useState([]);
	const [raumBezeichnung, setRaumBezeichnung] = useState([]);
	const [raumName, setRaumName] = useState([]);
	const [mapDaten, setMapDaten] = useState([]);


	const [bearbeiten, setbearbeiten] = useState([]);
	const [isOpen, setIsOpen] = React.useState(false)
	const [button, setButton] = useState([]);
	const cancelRef = React.useRef()
	const newsCollectionRef = collection(db, "CampusPlan");
	const {id} = useParams()
	const history = useHistory()
	const currentDay = new Date;
	useEffect(() => {
		setStandort("Lippstadt")
		setGebaeude("L1");
		}, []);

const onClose = (e) => {
	if(e.target.id =='speichern_button'){
			setbearbeiten(false);
			setIsOpen(false);

	}else if (e.target.id =='rückgängig_button'){
		setBildLink(campusplan.BildLink);
		setbearbeiten(false);
		setIsOpen(false);
	}
	else if (e.target.id =='abbrechen_button'){
		console.log('im in abbrechen')
		setIsOpen(false);

	}
}


const handleChange_Url_Bild = (event) => {
	if(event.target.value == null || event.target.value == "" ){
	setBildLink(campusplan.BildLink)
	}else{
		setBildLink(event.target.value);
	}
}

const handleChange_Lageplan_Url_Bild = (event) => {
	if(event.target.value == null || event.target.value == "" ){
	setPlanBildLink(campusplan.planBildLink)
	}else{
		setPlanBildLink(event.target.value);
	}
}

const doAlertDialog = (button) => {
	setIsOpen(true);
	setButton(button);
}

const handleChange_check = (event) => {
	setRaumBezeichnung(document.getElementById("input_raumBezeichnung").value)
	setRaumName(document.getElementById("input_RaumName").value)
	setStandort(document.getElementById("select_standort").value)
	setMapDaten(document.getElementById("input_mapdaten").value)
	standort == "Lippstadt"	? setGebaeude(document.getElementById("select_LippstadtGebaeude").value) : setGebaeude(document.getElementById("select_HammGebaeude").value)
	setPreview(true)
}

const resetForm = (event) => {
setBildLink("");
setGebaeude('');
setCampus('');
setPlanBildLink('');
setRaumBezeichnung('');
setRaumName('');

document.getElementById("input_raumBezeichnung").value = "";
document.getElementById("input_url_bild").value = "";
document.getElementById("input_RaumName").value = "";
document.getElementById("input_mapdaten").value = "";
document.getElementById("input_lageplan").value = "";
}




const createCampusplanDoc = () =>{
	addDoc(collection(db, "CampusPlan"), {
	BildLink: bildLink,
	Campus: standort,
	Gebaeude: gebaeude,
	Koordinaten: mapDaten,
	PlanBildLink: planBildLink,
	RaumBezeichnung: raumBezeichnung,
	RaumName: raumName,
	}).then((res) =>{
		history.push("/campusplan");
	});
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
          h={'50x'}
          mt={-6}
          mx={-6}
          mb={6}

          pos={'relative'}
					align="center"
			>
			<HStack spacing="24px" alignItems="right">
			{preview ?   null :  <IconButton  id='checkButton' icon={<CheckIcon />} onClick={() => handleChange_check() }/> }
			{preview ?   null :  <IconButton  id='closeButton' icon={<CloseIcon />} onClick={() => resetForm()}/> }
			{preview ?   <IconButton  id='checkButton' onClick={() => createCampusplanDoc() } icon={<UnlockIcon />} /> :  null }
			{preview ?   <IconButton  id='checkButton' icon={<EditIcon />}  onClick={() => setPreview(false) } /> :  null }
				</HStack>
				<HStack mb={7}>
			{preview ? standort :
				<Select id="select_standort" size="md"  defaultValue={"Lippstadt"}>
						<option id="select_lippstadt"value="Lippstadt" onClick={() => setStandort("Lippstadt")}>Lippstadt</option>
						<option id="select_Hamm"value="Hamm"  onClick={() => setStandort("Hamm")} >Hamm</option>
				</Select>
				}

					{standort == "Lippstadt" && !preview  ?
					<Select  id="select_LippstadtGebaeude" size="md">
						<option id="select_L1"value="L1" onChange={() => setGebaeude("L1")}>L1</option>
						<option id="select_L2"value="L2" onChange={() => setGebaeude("L2")}>L2</option>
						<option id="select_L3"value="L3" onChange={() => setGebaeude("L3")}>L3</option>
						<option id="select_L4"value="L4" onChange={() => setGebaeude("L4")} >L4</option>
					</Select>
					: standort == "Hamm" && !preview ?
					<Select  id="select_HammGebaeude" size="md" mb={5}>
						<option id="select_H_1.1"value="H1.1" onChange={() => setGebaeude("H 1.1")} >H 1.1</option>
						<option id="select_H_1.2"value="H1.2" onChange={() => setGebaeude("H 1.2")} >H 1.2</option>
						<option id="select_H_2.1"value="H2.1" onChange={() => setGebaeude("H 2.1")}>H 2.1</option>
						<option id="select_H_4.1-3"value="H4.1-3" onChange={() => setGebaeude("H 4.1-3")} >H 4.1-3</option>
					</Select>
					:null
					}


				</HStack>
				{preview ? standort + " | "  : null}
				{preview ? gebaeude + " | " : null }
				{preview ? raumBezeichnung : < Input id="input_raumBezeichnung" placeholder="Raumbezeichnung(Bsp.: L4.1)" defaultValue={raumBezeichnung}/>}

        </Box>



				<Stack mb={7}>
				 { preview ? null: <Box
          h={'50px'}
					mb={-6}
          mx={-6}
					mt={3}
          pos={'relative'}
					align="right"
					>	< Input name="input_url_bild" id="input_url_bild" placeholder="Neuen Bild Link hier einfügen" defaultValue={bildLink} onChange={handleChange_Url_Bild}/> </Box>}
				</Stack>

					<Box
          h={'210px'}
          bg={'gray.100'}
          mx={-6}
          mb={6}
          pos={'relative'}>
          <Image
            src={
              bildLink
            }
            layout={'fill'}
          />
        </Box>

        <Stack>

          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'} >

					 {preview ? raumName : < Input id="input_RaumName" placeholder="Raumname" defaultValue={raumName} mb={10} />}
          </Heading>
						<Divider orientation="horizontal" />
          <Text color={'gray.500'}>
							{	preview ?  mapDaten :  < Input id="input_mapdaten" placeholder="Map Daten hier einfügen" mb={2} defaultValue={mapDaten}/> }
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
						{	preview ? null : < Input id="input_lageplan"  placeholder="Neuen Lageplan Link hier einfügen" defaultValue={planBildLink} onChange={ handleChange_Lageplan_Url_Bild}/> }

					<Box
          h={'210px'}
          bg={'gray.100'}
          mx={-6}
          mb={6}
					mt={3}
          pos={'relative'}>
          					<Image
            src={
              planBildLink
            }
            layout={'fill'}
          />
        </Box>

          </Text>

        </Stack>
      </Box>
    </Center>
			</div>
    </Layout>
		</>
  )
}
