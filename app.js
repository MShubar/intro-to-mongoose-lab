const prompt = require('prompt-sync')()
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const Crm = require('./models/Crm')

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Connected to MongoDB')
  await runQueries()

  await mongoose.disconnect()
  console.log('Disconnected from MongoDB')
  process.exit()
}

const runQueries = async () => {
  console.log('Queries running.')
  console.log(`Welcome to the CRM`)
  await promptUser()
}

const promptUser = async () => {
  const selection = prompt(`What would you like to do?
  1. Create a customer
  2. View all customers
  3. Update a customer
  4. Delete a customer
  5. Quit
  Number of action to run: `)

  if (selection === '1') await createCrm()
  else if (selection === '2') await viewCrm()
  else if (selection === '3') await updateCrm()
  else if (selection === '4') await deleteCrm()
  else if (selection === '5') {
    console.log('exiting...')
  } else {
    console.log(`Incorrect selection, please try again`)
    await promptUser()
  }
}

const createCrm = async () => {
  const name = prompt('Enter the customer name: ')
  const age = prompt('Enter the customer age: ')

  const crm = await Crm.create({ name, age })
  console.log('Customer created:', crm)
  await promptUser()
}

const viewCrm = async () => {
  const crm = await Crm.find({})
  console.log('All customers:')
  crm.forEach((customer) => {
    console.log(
      `ID: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`
    )
  })
  await promptUser()
}

const updateCrm = async () => {
  const name = prompt('Enter the customer name to update: ')
  const age = prompt('Enter the new age for the customer: ')

  const crm = await Crm.findByIdAndDelete(id)
  console.log('Customer updated:', crm)
  await promptUser()
}

const deleteCrm = async () => {
  const id = prompt('Enter the customer ID to delete: ')

  const crm = await Crm.findByIdAndDelete(id)
  console.log('Customer deleted:', crm)
  await promptUser()
}

connect()
