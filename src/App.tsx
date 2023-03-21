import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './index.css'

interface Item {
  _id: number
  age: string
  firstName: string
  lastName: string
  phoneNumber: string
}

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([])
  const [update, setupdate] = useState(false)
  const ApiUrl = 'https://blue-journalist-bbrpv.ineuron.app:4000/user/'

  useEffect(() => {
    getCall()
  }, [])

  const getCall = () => {
    axios({
      url: 'https://blue-journalist-bbrpv.ineuron.app:4000/users',
      method: 'GET'
    })
      .then(response => {
        setItems(response.data.data)
      })
      .catch(error => {})
  }

  const [tempData, settempData] = useState<Item>({
    _id: 0,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    age: ''
  })

  const addUsers = (type: string, url: string, endpoint: string) => {
    const id = tempData._id ? `/${tempData._id}` : ''
    const fullUrl = type === 'PATCH' ? `${url}${id}` : `${url}${endpoint}`

    if (
      tempData.firstName !== '' &&
      tempData.lastName !== '' &&
      tempData.phoneNumber !== '' &&
      tempData.age !== ''
    ) {
      if (formValidation(tempData)) {
        axios({
          url: fullUrl,
          method: type,
          data: tempData
        })
          .then(response => {
            alert(response.data.message)
            getCall()
            settempData({
              _id: 0,
              firstName: '',
              lastName: '',
              phoneNumber: '',
              age: ''
            })
          })
          .catch(error => {
            console.log(error.data.message)
          })
      } else {
        alert('Please fill all the required fields with valid data ...')
      }
    } else {
      alert('Please fill all the required fields ...')
    }
  }

  const formValidation = (data: any) => {
    const namePattern = /^[a-zA-Z\s]+$/
    const phonePattern = /^\d{10}$/
    return (
      namePattern.test(data.firstName) &&
      namePattern.test(data.lastName) &&
      data.age > 0 &&
      phonePattern.test(data.phoneNumber)
    )
  }

  const updateItem = (itemId: any) => {
    console.log(itemId)
    if (itemId !== '') {
      axios({
        url: `https://blue-journalist-bbrpv.ineuron.app:4000/user/${itemId}`,
        method: 'GET'
      })
        .then(response => {
          if (response.data.message) {
            settempData({
              ...tempData,
              _id: response.data.data._id,
              firstName: response.data.data.firstName,
              lastName: response.data.data.lastName,
              phoneNumber: response.data.data.phoneNumber,
              age: response.data.data.age
            })
            setupdate(true)
          } else {
            console.log('something went wrong...')
          }
        })
        .catch(error => {
          console.log(error.message)
        })
    } else {
      alert('ItemId is missing, Please try again later..')
    }
  }

  const deleteItem = (itemId: any) => {
    if (itemId !== '') {
      axios({
        url: `https://blue-journalist-bbrpv.ineuron.app:4000/user/${itemId}`,
        method: 'DELETE'
      })
        .then(response => {
          if (response.data.message) {
            alert(response.data.message)
            getCall()
          } else {
            console.log('something went wrong...')
          }
        })
        .catch(error => {
          console.log(error.message)
        })
    } else {
      alert('ItemId is missing, Please try again later..')
    }
  }

  return (
    <div className='bg-gray-200 p-10'>
      <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md space-y-8'>
          <div>
            <img
              className='mx-auto h-12 w-auto'
              src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
              alt='Sumit'
            />
            <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
              CRUD OPERATION'S
            </h2>
          </div>
          <input type='hidden' name='remember' value='true' />
          <div className='-space-y-px rounded-md shadow-sm'>
            <div>
              <label className='sr-only'>FirstName</label>
              <input
                id='text'
                name='firstname'
                type='text'
                required
                className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                placeholder='FirstName'
                value={tempData.firstName}
                onChange={e =>
                  settempData({ ...tempData, firstName: e.target.value })
                }
              />
            </div>
            <div>
              <label className='sr-only'>Last Name</label>
              <input
                id='lastname'
                name='text'
                type='text'
                required
                className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 my-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                placeholder='LastName'
                value={tempData.lastName}
                onChange={e =>
                  settempData({ ...tempData, lastName: e.target.value })
                }
              />
            </div>
            <div>
              <label className='sr-only'>Phone Number</label>
              <input
                id='Phone Number'
                name='text'
                type='text'
                required
                maxLength={10}
                className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 my-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                placeholder='Phone Number'
                value={tempData.phoneNumber}
                onChange={e =>
                  settempData({ ...tempData, phoneNumber: e.target.value })
                }
              />
            </div>
            <div>
              <label className='sr-only'>Age</label>
              <input
                id='Age'
                name='text'
                maxLength={2}
                type='text'
                required
                className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                placeholder='Age'
                value={tempData.age}
                onChange={e =>
                  settempData({ ...tempData, age: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            {update ? (
              <button
                className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                onClick={() => addUsers('PATCH', ApiUrl, 'user/')}
              >
                Update User
              </button>
            ) : (
              <button
                className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                onClick={() => addUsers('POST', ApiUrl, '/create')}
              >
                Add User
              </button>
            )}
          </div>
        </div>
      </div>
      <table className='table-auto'>
        <thead>
          <tr className='col'>
            <th className='px-4 py-2 border border-slate-300 ...'>FirstName</th>
            <th className='px-4 py-2 border border-slate-300 ...'>LastName</th>
            <th className='px-4 py-2 border border-slate-300 ...'>Age</th>
            <th className='px-4 py-2 border border-slate-300 ...'>
              Phone Number
            </th>
            <th className='px-4 py-2 border border-slate-300 ...'>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <React.Fragment key={item._id}>
              <tr>
                <td className='border border-slate-300 ... px-4 py-2'>
                  {item.firstName}
                </td>
                <td className='border border-slate-300 ... px-4 py-2'>
                  {item.lastName}
                </td>
                <td className='border border-slate-300 ... px-4 py-2'>
                  {item.age}
                </td>
                <td className='border border-slate-300 ... px-4 py-2'>
                  {item.phoneNumber}
                </td>
                <td className='border border-slate-300 ... px-4 py-2'>
                  <button
                    className='bg-blue-500 text-white px-2 py-1 rounded'
                    onClick={() => updateItem(item._id)}
                  >
                    Edit
                  </button>
                  <button
                    className='bg-red-500 text-white px-2 py-1 rounded ml-2'
                    onClick={() => deleteItem(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
