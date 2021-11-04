import {
  Badge,
  chakra,
  Code,
  Heading,
  List,
  ListItem,
  OrderedList,
} from '@chakra-ui/react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { Navbar } from '../components/Navbar'

export default function Campusplan() {
  return (
   <Layout>
      <Navbar />
			<Heading>Campusplan</Heading>
      {/* <Text my={6}>{currentUser?.email}</Text> */}

    </Layout>
  )
}