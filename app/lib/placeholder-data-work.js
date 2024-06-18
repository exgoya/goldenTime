// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
 
const gUsers = [
  {
    id: '2baf6b80-29bc-436f-9c18-1f1ced21a1c8',
    name: 'tech',
    email: 'tech@sunejsoft.com',
    password: 'ekd9wkd',
  }
];

const gLocations = [
  {
    id : '002aa8d8-0ac3-4f80-a146-eb72bcabad24',
    name : "sunjesoft",
    address : "서울 영등포구 영신로 220",
    detailAddress : "knk 디지털타워 1108호",
    description : "description",
  },  
  {
    id : '0df926f4-9d44-46d4-8e2e-7b34144ef2e8',
    name : "SKT",
    address : "서울 영등포구 영신로 220",
    detailAddress : "knk 디지털타워 1108호",
    description : "description",
  },
]

const gCompanys = [
    {
      id : 'f80b8505-e5e0-4d34-bf3d-8831b6e443d5',
      name : 'sunjesoft',
      description : "blbab",
    },
    {
      id : '2d0ccda4-e916-4589-af5d-f9bc1da34708',
      name : 'SKT C&C',
      description : "",
    }
]

const gEngineers = [
  {
    id : '3d929e13-7976-4d0c-a140-88f0111a5eb8',
    nickName : 'goya',
    name : 'Lee Seonghoon',
    email : 'goya@sunjesoft.com',
    duty : 'senior',
    phone : '010-3333-3333',
    companyId : gCompanys[0].id,
  },
  {
    id : '83ccc930-754f-4b30-9ecf-2ac004915a04',
    nickName : 'Anbo',
    name : 'An bohyun',
    email : 'anbo@sunjesoft.com',
    duty : 'senior',
    phone : '010-3333-3333',
    companyId : gCompanys[0].id,
  },
  {
    id : '5f5dc98b-1bbd-4946-9444-268de4d30f43',
    nickName : 'suamj',
    name : 'Jo sua',
    email : 'suamj@sunjesoft.com',
    duty : 'senior',
    phone : '010-3333-3333',
    companyId : gCompanys[0].id,
  }
]

const gCustomers = [
  {
    id : '7d5e9c50-e025-48e8-b78f-dd1d0aad8b5d',
    name : '김철수',
    email : 'test@test.com',
    duty : 'test',
    phone : '010-3333-3333',
    companyId :gCompanys[1].id,
  },
  {
    id : '8c01d4d5-99da-4dc3-948a-fe8b642f0ba6',
    name : '홍길동',
    email : 'test@test.com',
    duty : '차장',
    phone :'010-0001-0001',
    companyId :gCompanys[1].id,
  },
]
const gIssues = [
  {
    id : 'd6cf39ed-c9e5-4069-bce2-18ac53057647'    ,
    title : "test1",
    description : "test",
    status : "open",
    opened : "2024-06-17 15:30:00",
    modified : "2024-06-17 15:30:00",
    engineerId : gEngineers[0].id  ,
    customerId : gCustomers[0].id,
  },
  {
    id : '1de65517-590f-47e5-88dd-f775dbd4beb0',
    title : "test2",
    description : "test",
    status : "close",
    opened : "2024-06-17 15:30:00",
    modified : "2024-06-17 15:30:00",
    engineerId : gEngineers[0].id  ,
    customerId : gCustomers[0].id,
  },
]

const gServices = [
  {
    engineerId : gEngineers[0].id,
    startTime : '2024-06-17 15:30:00',
    endTime : '2024-06-18 01:30:00',
    type: 'install',
    isOnline : false,
    comment : "what to dooo...",
    issueId : gIssues[0].id,
    locationId : gLocations[0].id,
  },
  {
    engineerId : gEngineers[0].id,
    startTime : '2024-06-17 15:30:00',
    endTime : '2024-06-18 01:30:00',
    type: 'install',
    isOnline : false,
    comment : "what to dooo...",
    issueId : gIssues[0].id,
    locationId : gLocations[0].id,
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
// gLocations
// customers
// engineers
// companys
