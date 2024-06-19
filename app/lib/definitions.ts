// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};
export type Type = {
  id: string;
  name: string;
};


export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type Gcustomer = {
  id: string;
  name: string;
  email: string;
  duty: string;
  phone: string;
  company_id : string;
};

export type GcustomerTable = {
  id: string;
  name: string;
  email: string;
  duty: string;
  phone: string;
  company_id : string;
  company_name : string;
};

export type Service = {
  id: string;
  engineer_id: string;
  issue_id:string;
  customer_id:string;
  location_id:string;
  type_id: string;
  begin_time: string;
  end_time: string;
  diff_time: string;
  is_online: 'true' | 'false';
  comment: string;
  modified: string;
};

export type ServiceTable = {
  id: string;
  engineer_id: string;
  engineer_nick_name: string;
  engineer_duty: string;
  issue_id: string;
  issue_title: string;
  issue_status: string;
  customer_id: string;
  customer_name: string;
  customer_duty: string;
  location_id: string;
  location_name: string;
  type_id: string;
  type_name: string;
  begin_time: string;
  end_time: string;
  is_online: Boolean;
  comment: string;
  modified: string;
};
export type IssueField = {
  id: string;
  title: string;
};


export type issue = {
  id: string;
  title: string;
  description: string;
  status: 'open'|'feedback'|'close';
  opened: string;
  modified: string;
  engineer_id : string;
  customer_id : string;
};

export type issueTable = {
  id: string;
  title: string;
  description: string;
  status: 'open'|'feedback'|'close';
  opened: string;
  modified: string;
  engineer_id : string;
  engineer_nick_name : string;
  engineer_duty : string;
  customer_id : string;
  customer_name : string;
  customer_duty : string;
};


export type EngineerField = {
  id: string;
  nick_name: string;
};

export type Engineer = {
  id: string;
  nick_name: string;
  name: string;
  email: string;
  duty: string;
  phone: string;
  company_id : string;
};

export type EngineerTable = {
  id: string;
  nick_name: string;
  name: string;
  email: string;
  duty: string;
  phone: string;
  company_id : string;
  company_name : string;
};

export type Company = {
  id: string;
  name: string;
  description:string;
}

export type LocationField = {
  id: string;
  name: string;
}

export type Location = {
  id: string;
  name: string;
  address: string;
  detail_address: string;
  description:string;
}

export type Revenue = {
  month: string;
  revenue: number;
};
export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
