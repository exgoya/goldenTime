// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
 
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const engineers = [
  {
    id : 1,
    nickname : 'goya',
    name : 'Lee Seonghoon',
    email : 'goya@sunjesoft.com',
    company_id : companys[0].id,
    duty : 'senior'
  },
  {
    id : 2,
    nickname : 'Anbo',
    name : 'An bohyun',
    email : 'goya@sunjesoft.com',
    company_id : companys[0].id,
    duty : 'senior'
  },
  {
    id : 3,
    nickname : 'suamj',
    name : 'Jo sua',
    email : 'suamj@sunjesoft.com',
    company_id : companys[0].id,
    duty : 'senior'
  }
]

const customers = [
  {
    id : 0,
    name : '김희진',
    email : null,
    company_id :companys[2].id,
    duty : '매니저',
    mobile : '010-3333-3333'
  },
  {
    id : 1,
    name : '이동준',
    email : '',
    company_id :companys[2].id,
    duty : '차장',
    mobile :'010-0001-0001'
  },
]

const companys = [
    {
      id : 0,
      name : 'sunjesoft',
      spot_id : spots[0].id,
      description : "blbab",
    },
    {
      id : 1,
      name : 'SKT C&C',
      spot_id : spots[0].id,
      description : "",
    }
]

const spots = [
  {
    id : 0,
    name : "sunjesoft",
    address : "서울 영등포구 영신로 220",
    detailAddress : "knk 디지털타워 1108호",
    description : "description"
  },  
  {
    id : 1,
    name : "SKT",
    address : "서울 영등포구 영신로 220",
    detailAddress : "knk 디지털타워 1108호",
    description : "description"
  },
]

const issues = [
  {
    id : 0,
    title : "test",
    description : "test",
    status : "open",
    dependent_spot_id : spots[0].id
  },
  {
    id : 1,
    title : "test",
    description : "test",
    status : "open",
    dependent_spot_id : spots[0].id
  },
]

const services = [
  {
    id : 0,
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
  users,
  engineers,
  customers,
  companys,
  spots,
  issues,
  services
};

// Home - summary dashboards
// services
// issues
// spots
// customers
// engineers
// companys
