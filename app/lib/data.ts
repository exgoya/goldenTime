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
  Gcustomer,
  GcustomerTable,
  issueTable,
  issue,
  EngineerField
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchCompanys() {
  try {
    const data = await sql<Company>`
      SELECT
        id,
        name
      FROM g_companys
      ORDER BY name ASC
    `;

    const companys = data.rows;
    return companys;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}


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

export async function fetchFilteredIssues(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const issues = await sql<issueTable>`
      SELECT
        i.id,
        i.title,
        i.description,
        i.status,
        i.opened,
        i.modified,
        e.id as engineer_id,
        e.nick_name as engineer_nick_name,
        e.duty as engineer_duty,
        c.id as customer_id,
        c.duty as customer_name,
        c.duty as customer_duty
      FROM g_issues i
      LEFT JOIN g_customers c ON i.customer_id = c.id
      LEFT JOIN g_engineers e ON i.engineer_id = e.id
      WHERE
        i.title ILIKE ${`%${query}%`} OR
        i.description ILIKE ${`%${query}%`} OR
        i.status ILIKE ${`%${query}%`} OR
        e.nick_name ILIKE ${`%${query}%`} OR
        e.duty ILIKE ${`%${query}%`} OR
        c.name ILIKE ${`%${query}%`} OR
        c.duty ILIKE ${`%${query}%`} 
      ORDER BY i.modified desc
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    console.log(issues.rows)
    return issues.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch issues.');
  }
}

export async function fetchIssuesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
      FROM g_issues i
      LEFT JOIN g_customers c ON i.customer_id = c.id
      LEFT JOIN g_engineers e ON i.engineer_id = e.id
      WHERE
        i.title ILIKE ${`%${query}%`} OR
        i.description ILIKE ${`%${query}%`} OR
        i.status ILIKE ${`%${query}%`} OR
        e.nick_name ILIKE ${`%${query}%`} OR
        e.duty ILIKE ${`%${query}%`} OR
        c.name ILIKE ${`%${query}%`} OR
        c.duty ILIKE ${`%${query}%`} 
 `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of issue.');
  }
}

export async function fetchIssueById(id: string) {
  noStore();
  try {
    const data = await sql<issue>`
      SELECT
        id,
        title,
        description,
        status,
        opened,
        modified,
        engineer_id,
        customer_id
      FROM g_issues
      WHERE id = ${id};
    `;

    const issues = data.rows.map((issue) => ({
      ...issue,
      // Convert amount from cents to dollars
    }));

    console.log(issues)
    return issues[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch issue.');
  }
}


export async function gfetchFilteredCustomers(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const customers = await sql<GcustomerTable>`
      SELECT
        e.id,
        e.name,
        e.email,
        e.duty,
        e.phone,
        e.company_id,
        c.name as company_name
      FROM g_customers e
      JOIN g_companys c ON e.company_id = c.id
      WHERE
        e.name ILIKE ${`%${query}%`} OR
        e.email ILIKE ${`%${query}%`} OR
        e.duty ILIKE ${`%${query}%`} OR
        e.phone ILIKE ${`%${query}%`} OR
        c.name ILIKE ${`%${query}%`}
      ORDER BY e.name
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return customers.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customers.');
  }
}

export async function fetchCustomersPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
      FROM g_customers e
      JOIN g_companys c ON e.company_id = c.id
      WHERE
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
    throw new Error('Failed to fetch total number of customer.');
  }
}

export async function fetchCustomerById(id: string) {
  noStore();
  try {
    const data = await sql<Gcustomer>`
      SELECT
        id,
        name,
        email,
        duty,
        phone,
        company_id
      FROM g_customers
      WHERE id = ${id};
    `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      // Convert amount from cents to dollars
    }));

    return customers[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch engineer.');
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
        e.id,
        e.nick_name,
        e.name,
        e.email,
        e.duty,
        e.phone,
        e.company_id,
        c.name as company_name
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
      FROM g_customers
      ORDER BY name ASC
    `;

    return data.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}


export async function fetchEngineers() {
  try {
    const data = await sql<EngineerField>`
      SELECT
        id,
        nick_name
      FROM g_engineers
      ORDER BY nick_name ASC
    `;

    return data.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all engineers.');
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
