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
	 AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
Button
} from '@chakra-ui/react'
import React, {useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { db } from "../firebase-config";
import { Navbar } from '../components/Navbar'
import { DeleteIcon,SettingsIcon, ViewIcon, ViewOffIcon, AddIcon } from '@chakra-ui/icons'
import { IconButton } from "@chakra-ui/react"
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
	query,
	where,
} from "firebase/firestore";
import { getAuth, deleteUser } from "firebase/auth";

export default function Campusplan() {

	const [isOpen, setIsOpen] = React.useState(false)
	const [button, setButton] = useState([]);
	const cancelRef = React.useRef()

	const [campusplanLippstadt, setCampusplanLippstadt] = useState([]);
	const [campusplanLippstadtL1, setCampusplanLippstadtL1] = useState([]);
	const [campusplanLippstadtL2, setCampusplanLippstadtL2] = useState([]);
	const [campusplanLippstadtL3, setCampusplanLippstadtL3] = useState([]);
	const [campusplanLippstadtL4, setCampusplanLippstadtL4] = useState([]);



	const [campusplanHamm, setCampusplanHamm] = useState([]);
	const [campusSelected, setcampusSelected] = useState([]);


	useEffect(() => {
			const getCampusplan = async () => {
				setcampusSelected('Lippstadt');


				const campusplanLippstadtL1CollectionQuery = query(collection(db, "CampusPlan"), where("Gebaeude", "==", "L1"));
				const campusplanLippstadtL2CollectionQuery = query(collection(db, "CampusPlan"), where("Gebaeude", "==", "L2"));
				const campusplanLippstadtL3CollectionQuery = query(collection(db, "CampusPlan"), where("Gebaeude", "==", "L3"));
				const campusplanLippstadtL4CollectionQuery = query(collection(db, "CampusPlan"), where("Gebaeude", "==", "L4"));

				const dataLippstadtL1 = await getDocs(campusplanLippstadtL1CollectionQuery);
				const dataLippstadtL2 = await getDocs(campusplanLippstadtL2CollectionQuery);
				const dataLippstadtL3 = await getDocs(campusplanLippstadtL3CollectionQuery);
				const dataLippstadtL4 = await getDocs(campusplanLippstadtL4CollectionQuery);

				setCampusplanLippstadtL1(dataLippstadtL1.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
				setCampusplanLippstadtL2(dataLippstadtL2.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
				setCampusplanLippstadtL3(dataLippstadtL3.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
				setCampusplanLippstadtL4(dataLippstadtL4.docs.map((doc) => ({ ...doc.data(), id: doc.id })));


				const campusplanHammCollectionQuery = query(collection(db, "CampusPlan"), where("Campus", "==", "Hamm"));
				const dataHamm = await getDocs(campusplanHammCollectionQuery);

				setCampusplanHamm(dataHamm.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			};

			getCampusplan();
		}, []);

	const onClose  = async(e, _id ) => {
		const id = _id ;
		console.log(id)
		if(e.target.id =='löschen_button'){
		await db.collection('CampusPlan').doc(id).delete()

		deleteDoc(doc(db, "CampusPlan", id)).then ((res) => {
		window.location.reload(true);
		})

		}
		else if (e.target.id =='abbrechen_button'){
			setIsOpen(false);
		}
	}

	const doAlertDialog = () => {
		setIsOpen(true);
	}

	const deleteCampusplanDoc = () => {

	}




  return (


   <Layout>
		<AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {'Löschen des Campusplans'}
            </AlertDialogHeader>

            <AlertDialogBody>
							{'Bist du sicher, dass Sie diesen Campusplan löschen wollen? Sie können es nicht mehr Rückgängig machen.'}

            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} id="abbrechen_button" onClick={onClose}>
                Abbrechen
              </Button>
              <Button colorScheme={ "red"} id={'löschen_button'} onClick={onClose} ml={3}>
                {'Löschen'}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Navbar />

      {/* <Text my={6}>{currentUser?.email}</Text> */}
		<HStack>
		{campusSelected != "Lippstadt" ?
			<Button
      type='submit'
      colorScheme='pink'
      size='lg'
      fontSize='md'
			onClick={() => setcampusSelected('Lippstadt') }
      >
      Wechseln zu Übersicht Lippstadt
    </Button>

		:
		<Button
      type='submit'
      colorScheme='pink'
      size='lg'
      fontSize='md'
			onClick={() => setcampusSelected('Hamm') }
			>
    	Wechseln zu Übersicht Hamm
    	</Button>
		}
		<Link to={`/campusplan_erstellen`}>
		<IconButton  icon={<AddIcon />} />
		</Link>
		</HStack>
		<div>
		{campusSelected == 'Lippstadt' ?
		<Table variant="simple">
			<Thead>
					<heading>L1</heading>
				<Tr>
					<Th >Gebaeude + Raumbezeichnung</Th>
					<Th >RaumName</Th>
					<Th >Bearbeiten</Th>
				</Tr>
					</Thead>

					<Tbody>
																			{ campusplanLippstadtL1.map (campusplanLippstadt=> (
																							<tr key={campusplanLippstadt.id  }>
																									<td align="left" >{campusplanLippstadt.RaumBezeichnung  }</td>
																									<td align="left">{campusplanLippstadt.RaumName }</td>
																									<td align="left">

																												<HStack  spacing='2'>
																												<IconButton  icon={<ViewOffIcon /> } />
																												<Link to={`/campusplan_details/${campusplanLippstadt.id}`}>
																												<IconButton  icon={<SettingsIcon />} />
																												</Link>
																												<IconButton  icon={<DeleteIcon />} onClick={() => doAlertDialog( campusplanLippstadt.id)}/>
																												</HStack>

																									</td>
																							</tr>
																					))
																			}
						</Tbody>
					</Table>
:
<Table variant="simple">
			<Thead>
				<heading>H 1.1</heading>
				<Tr>
					<Th >Gebaeude + Raumbezeichnung</Th>
					<Th >RaumName</Th>
					<Th >Bearbeiten</Th>
				</Tr>
					</Thead>
						<Tbody>
																			{ campusplanHamm.map (campusplanHamm=> (
																							<tr key={campusplanHamm.id  }>
																									<td align="left" >{campusplanHamm.RaumBezeichnung  }</td>
																									<td align="left">{campusplanHamm.RaumName   }</td>
																									<td align="left">

																												<HStack  spacing='2'>
																												<IconButton  icon={<ViewOffIcon /> } />
																												<Link to={`/campusplan_details/${campusplanHamm.id}`}>
																													<IconButton  icon={<SettingsIcon />} />
																												</Link>
																													<IconButton  icon={<DeleteIcon />} onClick={() => doAlertDialog( campusplanHamm.id)}/>
																												</HStack>

																									</td>
																							</tr>
																					))
																			}
						</Tbody>




					</Table>


					}


					</div>
<div>
		{campusSelected == 'Lippstadt' ?
		<Table variant="simple">
			<Thead>
					<heading>L2</heading>
				<Tr>
					<Th >Gebaeude + Raumbezeichnung</Th>
					<Th >RaumName</Th>
					<Th >Bearbeiten</Th>
				</Tr>
					</Thead>

					<Tbody>
																			{ campusplanLippstadtL2.map (campusplanLippstadtL1=> (
																							<tr key={campusplanLippstadtL1.id  }>
																									<td align="left" >{campusplanLippstadtL1.RaumBezeichnung  }</td>
																									<td align="left">{campusplanLippstadtL1.RaumName   }</td>
																									<td align="left">

																												<HStack  spacing='2'>
																												<IconButton  icon={<ViewOffIcon /> } />
																												<Link to={`/campusplan_details/${campusplanLippstadtL1.id}`}>
																												<IconButton  icon={<SettingsIcon />} />
																												</Link>
																													<IconButton  icon={<DeleteIcon />} onClick={() => doAlertDialog( campusplanLippstadtL1.id)}/>
																												</HStack>

																									</td>
																							</tr>
																					))
																			}
						</Tbody>
					</Table>
:
<Table variant="simple">
			<Thead>
				<heading>H 1.2</heading>
				<Tr>
					<Th >Gebaeude + Raumbezeichnung</Th>
					<Th >RaumName</Th>
					<Th >Bearbeiten</Th>
				</Tr>
					</Thead>
						<Tbody>
																			{ campusplanHamm.map (campusplanHamm=> (
																							<tr key={campusplanHamm.id  }>
																									<td align="left" >{campusplanHamm.RaumBezeichnung  }</td>
																									<td align="left">{campusplanHamm.RaumName   }</td>
																									<td align="left">

																												<HStack  spacing='2'>
																												<IconButton  icon={<ViewOffIcon /> } />
																												<Link to={`/campusplan_details/${campusplanHamm.id}`}>
																												<	IconButton  icon={<SettingsIcon />} />
																												</Link>
																												<IconButton  icon={<DeleteIcon />} onClick={() => doAlertDialog( campusplanHamm.id)}/>
																												</HStack>

																									</td>
																							</tr>
																					))
																			}
						</Tbody>
					</Table>
					}
					</div>

<div>
		{campusSelected == 'Lippstadt' ?
		<Table variant="simple">
			<Thead>
					<heading>L3</heading>
				<Tr>
					<Th >Gebaeude + Raumbezeichnung</Th>
					<Th >RaumName</Th>
					<Th >Bearbeiten</Th>
				</Tr>
					</Thead>

					<Tbody>
																			{ campusplanLippstadtL3.map (campusplanLippstadt=> (
																							<tr key={campusplanLippstadt.id  }>

																									<td align="left" >{campusplanLippstadt.RaumBezeichnung  }</td>
																									<td align="left">{campusplanLippstadt.RaumName }</td>
																									<td align="left">

																												<HStack  spacing='2'>
																												<IconButton  icon={<ViewOffIcon /> } />
																												<Link to={`/campusplan_details/${campusplanLippstadt.id}`}>
																													<IconButton  icon={<SettingsIcon />} />
																												</Link>
																												<IconButton  icon={<DeleteIcon />} onClick={() => doAlertDialog( campusplanLippstadt.id)}/>
																												</HStack>

																									</td>
																							</tr>
																					))
																			}
						</Tbody>
					</Table>
:
<Table variant="simple">
			<Thead>
				<heading>H 2.1</heading>
				<Tr>
					<Th >Gebaeude + Raumbezeichnung</Th>
					<Th >RaumName</Th>
					<Th >Bearbeiten</Th>
				</Tr>
					</Thead>
						<Tbody>
																			{ campusplanHamm.map (campusplanHamm=> (
																							<tr key={campusplanHamm.id  }>
																									<td align="left" >{campusplanHamm.RaumBezeichnung  }</td>
																									<td align="left">{campusplanHamm.RaumName   }</td>
																									<td align="left">

																												<HStack  spacing='2'>
																												<IconButton  icon={<ViewOffIcon /> } />
																												<Link to={`/campusplan_details/${campusplanHamm.id}`}>
																												<IconButton  icon={<SettingsIcon />} />
																												</Link>
																												<IconButton  icon={<DeleteIcon />} onClick={() => doAlertDialog( campusplanHamm.id)}/>
																												</HStack>

																									</td>
																							</tr>
																					))
																			}
						</Tbody>
					</Table>
					}
					</div>

<div>
		{campusSelected == 'Lippstadt' ?
		<Table variant="simple">
			<Thead>
					<heading>L4</heading>
				<Tr>
					<Th >Gebaeude + Raumbezeichnung</Th>
					<Th >RaumName</Th>
					<Th >Bearbeiten</Th>
				</Tr>
					</Thead>

					<Tbody>
																			{ campusplanLippstadtL4.map (campusplanLippstadt=> (
																							<tr key={campusplanLippstadt.id  }>
																									<td align="left" >{campusplanLippstadt.RaumBezeichnung  }</td>
																									<td align="left">{campusplanLippstadt.RaumName   }</td>
																									<td align="left">

																												<HStack  spacing='2'>
																												<IconButton  icon={<ViewOffIcon /> } />
																												<Link to={`/campusplan_details/${campusplanLippstadt.id}`}>
																												<IconButton  icon={<SettingsIcon />} />
																												</Link>
																													<IconButton  icon={<DeleteIcon />} onClick={() => doAlertDialog( campusplanLippstadt.id)}/>
																												</HStack>

																									</td>
																							</tr>
																					))
																			}
						</Tbody>
					</Table>
:

<Table variant="simple">
			<Thead>
				<heading >H 4.1-3</heading>
				<Tr>
					<Th >Gebaeude + Raumbezeichnung</Th>
					<Th >RaumName</Th>
					<Th >Bearbeiten</Th>
				</Tr>
					</Thead>
						<Tbody>
																			{ campusplanHamm.map (campusplanHamm=> (
																							<tr key={campusplanHamm.id  }>
																									<td align="left" >{campusplanHamm.RaumBezeichnung  }</td>
																									<td align="left">{campusplanHamm.RaumName   }</td>
																									<td align="left">

																												<HStack  spacing='2'>
																												<IconButton  icon={<ViewOffIcon /> } />
																												<Link to={`/campusplan_details/${campusplanHamm.id}`}>
																												<IconButton  icon={<SettingsIcon />} />
																												</Link>
																												<IconButton  icon={<DeleteIcon />} onClick={() => doAlertDialog( campusplanHamm.id)}/>
																												</HStack>

																									</td>
																							</tr>
																					))
																			}
						</Tbody>
					</Table>
					}
					</div>

				</Layout>
  )
}
