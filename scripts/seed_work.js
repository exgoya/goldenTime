const { db } = require('@vercel/postgres');
const {
  gUsers,
  gEngineers,
  gCustomers,
  gCompanys,
  gLocations,
  gIssues,
  gServices,
} = require('../app/lib/placeholder-data-work.js')
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      gUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}


async function seedEngineers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS g_engineers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nick_name VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    duty VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    company_id UUID NOT NULL
  );
`;

    console.log(`Created "g_engineers" table`);

    // Insert data into the "g_engineers" table
    const insertedGEngineer = await Promise.all(
      gEngineers.map(
        (engineer) => client.sql`
        INSERT INTO g_engineers (id,nick_name,name,email,duty,phone,company_id)
        VALUES (${engineer.id}, ${engineer.nickName}, ${engineer.name},${engineer.email},${engineer.duty},${engineer.phone},${engineer.companyId})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedGEngineer.length} engineers`);

    return {
      createTable,
      gEngineers: insertedGEngineer,
    };
  } catch (error) {
    console.error('Error seeding Enginner :', error);
    throw error;
  }
}

async function seedCustomers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS g_customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        duty VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        company_id UUID NOT NULL
      );
    `;

    console.log(`Created "customers" table`);

    // Insert data into the "customers" table
    const insertedCustomers = await Promise.all(
      gCustomers.map(
        (customer) => client.sql`
        INSERT INTO g_customers (id, name, email, duty,phone, company_id )
        VALUES (${customer.id}, ${customer.name}, ${customer.email} ,${customer.duty},${customer.phone}, ${customer.companyId})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedCustomers.length} customers`);

    return {
      createTable,
      gCustomers: insertedCustomers,
    };
  } catch (error) {
    console.error('Error seeding customers:', error);
    throw error;
  }
}

async function seedCompanys(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS g_companys (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NULL
      );
    `;

    console.log(`Created "companys" table`);

    // Insert data into the "customers" table
    const insertedCompanys = await Promise.all(
      gCompanys.map(
        (company) => client.sql`
        INSERT INTO g_companys (id, name,  description)
        VALUES (${company.id}, ${company.name}, ${company.description})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedCompanys.length} companys`);

    return {
      createTable,
      gCompanys: insertedCompanys,
    };
  } catch (error) {
    console.error('Error seeding companys:', error);
    throw error;
  }
}

async function seedLocations(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "locations" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS g_locations (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        detail_Address VARCHAR(255) NOT NULL,
        description TEXT NULL
      );
    `;

    console.log(`Created "companys" table`);

    // Insert data into the "locations" table
    const insertedLocations = await Promise.all(
      gLocations.map(
        (location) => client.sql`
        INSERT INTO g_locations (id, name, address, detail_address, description)
        VALUES (${location.id}, ${location.name}, ${location.address},${location.detailAddress},${location.description})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedLocations.length} locations`);

    return {
      createTable,
      gLocations: insertedLocations,
    };
  } catch (error) {
    console.error('Error seeding locations:', error);
    throw error;
  }
}

async function seedIssues(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "issues" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS g_issues (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        status VARCHAR(255) NOT NULL,
        opened TIMESTAMP NOT NULL,
        modified TIMESTAMP NOT NULL,
        engineer_id UUID NOT NULL,
        customer_id UUID NOT NULL
      );
    `;

    console.log(`Created "issues" table`);

    // Insert data into the "issues" table
    const insertedIssues = await Promise.all(
      gIssues.map(
        (issue) => client.sql`
        INSERT INTO g_issues (id, title, description, status,opened,modified, engineer_id, customer_id )
        VALUES (${issue.id}, ${issue.title}, ${issue.description},${issue.status},${issue.opened},${issue.modified},${issue.engineerId},${issue.customerId})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedIssues.length} issues`);

    return {
      createTable,
      gIssues: insertedIssues,
    };
  } catch (error) {
    console.error('Error seeding issues:', error);
    throw error;
  }
}

async function seedServices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "services" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS g_services (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        engineer_id UUID NOT NULL,
        start_time timestamp DEFAULT CURRENT_TIMESTAMP,
        end_time timestamp   DEFAULT CURRENT_TIMESTAMP,
        type VARCHAR(255) NOT NULL,
        is_online BOOLEAN NOT NULL DEFAULT false,
        comment TEXT NOT NULL,
        issue_id UUID NOT NULL,
        location_id UUID NOT NULL
      );
    `;

    console.log(`Created "services" table`);

    // Insert data into the "services" table
    const insertedServices = await Promise.all(
      gServices.map(
        (service) => client.sql`
        INSERT INTO g_services (engineer_id, start_time, end_time,type,is_online, comment, issue_id, location_id)
        VALUES (${service.engineerId},${service.startTime},${service.endTime},${service.type},${service.isOnline},${service.comment},${service.issueId},${service.locationId})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedServices.length} services`);

    return {
      createTable,
      gServices: insertedServices,
    };
  } catch (error) {
    console.error('Error seeding services:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedEngineers(client);
  await seedCustomers(client);
  await seedCompanys(client);
  await seedLocations(client);
  await seedIssues(client);
  await seedServices(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
