// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
 
const gUsers = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const gEngineers = [
  {
    id : '3d929e13-7976-4d0c-a140-88f0111a5eb8',
    nickname : 'goya',
    name : 'Lee Seonghoon',
    email : 'goya@sunjesoft.com',
    company_id : companys[0].id,
    duty : 'senior'
  },
  {
    id : '83ccc930-754f-4b30-9ecf-2ac004915a04',
    nickname : 'Anbo',
    name : 'An bohyun',
    email : 'goya@sunjesoft.com',
    company_id : companys[0].id,
    duty : 'senior'
  },
  {
    id : '5f5dc98b-1bbd-4946-9444-268de4d30f43',
    nickname : 'suamj',
    name : 'Jo sua',
    email : 'suamj@sunjesoft.com',
    company_id : companys[0].id,
    duty : 'senior'
  }
]

const gCustomers = [
  {
    id : '7d5e9c50-e025-48e8-b78f-dd1d0aad8b5d',
    name : '김희진',
    email : null,
    company_id :companys[2].id,
    duty : '매니저',
    mobile : '010-3333-3333'
  },
  {
    id : '8c01d4d5-99da-4dc3-948a-fe8b642f0ba6',
    name : '이동준',
    email : '',
    company_id :companys[2].id,
    duty : '차장',
    mobile :'010-0001-0001'
  },
]

const gCompanys = [
    {
      id : 'f80b8505-e5e0-4d34-bf3d-8831b6e443d5',
      name : 'sunjesoft',
      spot_id : spots[0].id,
      description : "blbab",
    },
    {
      id : '2d0ccda4-e916-4589-af5d-f9bc1da34708',
      name : 'SKT C&C',
      spot_id : spots[0].id,
      description : "",
    }
]

const gLocations = [
  {
    id : '002aa8d8-0ac3-4f80-a146-eb72bcabad24',
    name : "sunjesoft",
    address : "서울 영등포구 영신로 220",
    detailAddress : "knk 디지털타워 1108호",
    description : "description"
  },  
  {
    id : '0df926f4-9d44-46d4-8e2e-7b34144ef2e8',
    name : "SKT",
    address : "서울 영등포구 영신로 220",
    detailAddress : "knk 디지털타워 1108호",
    description : "description"
  },
]

const gIssues = [
  {
    id : 'd6cf39ed-c9e5-4069-bce2-18ac53057647'    ,
    title : "test1",
    description : "test",
    status : "open",
    dependent_spot_id : spots[0].id
  },
  {
    id : '1de65517-590f-47e5-88dd-f775dbd4beb0',
    title : "test2",
    description : "test",
    status : "open",
    dependent_spot_id : spots[0].id
  },
]

const gServices = [
  {
    enginner_id : enginners[0].id,
    start_time : '2024-06-17 15:30:00',
    end_time : '2024-06-18 01:30:00',
    type: 'install',
    online : false,
    issue_id : issues[0].id,
    spot_id : spots[0].id,
    comment : "what to dooo..."
  },
  {
    enginner_id : enginners[0].id,
    start_time : '2024-06-17 15:30:00',
    end_time : '2024-06-18 01:30:00',
    type: 'install',
    online : false,
    issue_id : issues[0].id,
    spot_id : spots[0].id,
    comment : "what to dooo..."
  },
];

module.exports = {
  gUsers,
  gEngineers,
  gCustomers,
  gCompanys,
  gLocations,
  gIssues,
  gServices
};

// Home - summary dashboards
// services
// issues
// spots
// customers
// engineers
// companys
