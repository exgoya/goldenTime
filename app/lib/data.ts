import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
  Location,
  Company,
  Engineer,
  EngineerTable,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  noStore();
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchFilteredEngineers(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const engineers = await sql<EngineerTable>`
      SELECT
        e.nick_name,
        e.name,
        e.email,
        e.duty,
        e.phone,
        c.id,
        c.name
      FROM g_engineers e
      JOIN g_companys c ON e.company_id = c.id
      WHERE
        e.nick_name ILIKE ${`%${query}%`} OR
        e.name ILIKE ${`%${query}%`} OR
        e.email ILIKE ${`%${query}%`} OR
        e.duty ILIKE ${`%${query}%`} OR
        e.phone ILIKE ${`%${query}%`} OR
        c.name ILIKE ${`%${query}%`}
      ORDER BY e.name
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return engineers.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch engineers.');
  }
}

export async function fetchEngineersPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
      FROM g_engineers e
      JOIN g_companys c ON e.company_id = c.id
      WHERE
        e.nick_name ILIKE ${`%${query}%`} OR
        e.name ILIKE ${`%${query}%`} OR
        e.email ILIKE ${`%${query}%`} OR
        e.duty ILIKE ${`%${query}%`} OR
        e.phone ILIKE ${`%${query}%`} OR
        c.name ILIKE ${`%${query}%`}

  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of engineers.');
  }
}

export async function fetchEngineerById(id: string) {
  noStore();
  try {
    const data = await sql<Engineer>`
      SELECT
        id,
        nick_name,
        name,
        email,
        duty,
        phone,
        company_id
      FROM g_engineers
      WHERE g_engineers.id = ${id};
    `;

    const engineers = data.rows.map((engineer) => ({
      ...engineer,
      // Convert amount from cents to dollars
    }));

    return engineers[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch engineer.');
  }
}

export async function fetchFilteredCompanys(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const companys = await sql<Company>`
      SELECT
        id,
        name,
        description
      FROM g_companys
    WHERE
      g_companys.name ILIKE ${`%${query}%`} OR
      g_companys.description ILIKE ${`%${query}%`}
      ORDER BY g_companys.name DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return companys.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch companys.');
  }
}

export async function fetchCompanysPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM g_companys
    WHERE
      g_companys.name ILIKE ${`%${query}%`} OR
      g_companys.description ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of companys.');
  }
}

export async function fetchCompanysById(id: string) {
  noStore();
  try {
    const data = await sql<Company>`
      SELECT
        id,
        name,
        description
      FROM g_companys
      WHERE id = ${id};
    `;

    const company = data.rows.map((company) => ({
      ...company,
      // Convert amount from cents to dollars
    }));

    return company[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch companys.');
  }
}




export async function fetchFilteredLocations(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const locations = await sql<Location>`
      SELECT
        id,
        name,
        address,
        detail_address,
        description  
      FROM g_locations
      WHERE
        name ILIKE ${`%${query}%`} OR
        address ILIKE ${`%${query}%`} OR
        detail_address ILIKE ${`%${query}%`} OR
        description ILIKE ${`%${query}%`}
      ORDER BY name DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return locations.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchLocationsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM g_locations
    WHERE
      name ILIKE ${`%${query}%`} OR
      address ILIKE ${`%${query}%`} OR
      detail_address ILIKE ${`%${query}%`} OR
      description ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of locations.');
  }
}

export async function fetchLocationsById(id: string) {
  noStore();
  try {
    const data = await sql<Location>`
      SELECT
        id,
        name,
        address,
        detail_address,
        description
      FROM g_locations
      WHERE id = ${id};
    `;

    const location = data.rows.map((location) => ({
      ...location,
      // Convert amount from cents to dollars
      //amount: location.amount / 100,
    }));

    return location[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch location.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  noStore();
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
