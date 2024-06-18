'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn, regist } from '@/auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};
const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ date: true, id: true });

const LocationSchema = z.object({
  id: z.string(),
  name: z.string().min(2,{ message: "Must be input Location Name" }),
  address: z.string().min(2,{ message: "Must be input Address" }),
  detail_address: z.string(),
  description: z.string(),
});

export type gState = {
  errors?: {
    name?: string[];
    address?: string[];
    detail_address?: string[];
    description?: string[];
  };
  message?: string | null;
};
const CreateLocation = LocationSchema.omit({ id: true });
const UpdateLocation = LocationSchema.omit({ id: true });

const CompanySchema = z.object({
  id: z.string(),
  name: z.string().min(2,{ message: "Must be input Company Name" }),
  description: z.string(),
});

export type companyState = {
  errors?: {
    name?: string[];
    description?: string[];
  };
  message?: string | null;
};

const CreateCompany = CompanySchema.omit({ id: true });
const UpdateCompany = CompanySchema.omit({ id: true });

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const EngineerSchema = z.object({
  id: z.string(),
  nickName: z.string().min(2,{ message: "Must be input Nick Name" }),
  name: z.string().min(2,{ message: "Must be input Name" }),
  email: z.string().email({ message: "invalid input" }),
  phone: z.string().regex(phoneRegex, 'Invalid Number!'),
  duty: z.string().min(2,{ message: "Must be input Name" }),
  companyId: z.string({ invalid_type_error: 'Please select a company.', }),
  companyName: z.string(),
});

export type engState = {
  errors?: {
    nickName?: string[];
    name?: string[];
    email?: string[];
    phone?: string[];
    duty?: string[];
    companyId?: string[];
    companyName?: string[];
  };
  message?: string | null;
};

const CreateEngineer = EngineerSchema.omit({ id: true });
const UpdateEngineer = EngineerSchema.omit({ id: true });

export async function createEngineer(prevState: engState, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateEngineer.safeParse({
    nickName: formData.get('nickName'),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    duty: formData.get('duty'),
    companyId: formData.get('companyId'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Engineer.',
    };
  }

  // Prepare data for insertion into the database
  const { nickName, name, email, phone, duty,companyId } = validatedFields.data;

  // Insert data into the database
  try {
    await sql`
      INSERT INTO g_Engineers (nick_name,name,email,phone,duty,company_id)
      VALUES (${nickName}, ${name}, ${email}, ${phone},${duty},${companyId})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Engineer.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/engineers');
  redirect('/dashboard/engineers');
}

export async function updateEngineer(
  id: string,
  prevState: engState,
  formData: FormData,
) {
  const validatedFields = UpdateEngineer.safeParse({
    nickName: formData.get('nickName'),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    duty: formData.get('duty'),
    companyId: formData.get('companyId'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Engineer.',
    };
  }

  const { nickName, name, email, phone, duty,companyId } = validatedFields.data;

  try {
    await sql`
      UPDATE g_engineers
      SET nick_name = ${nickName}, name = ${name}, email = ${email},phone=${phone},duty=${duty},company_id=${companyId}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Engineer.' };
  }

  revalidatePath('/dashboard/engineers');
  redirect('/dashboard/engineers');
}

export async function deleteEngineer(id: string) {
  // throw new Error('Failed to Delete Engineer');

  try {
    await sql`DELETE FROM g_engineers WHERE id = ${id}`;
    revalidatePath('/dashboard/engineers');
    return { message: 'Deleted Engineer' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Engineer.' };
  }
}


export async function createCompany(prevState: companyState, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateCompany.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Company.',
    };
  }

  // Prepare data for insertion into the database
  const { name,description  } = validatedFields.data;

  // Insert data into the database
  try {
    await sql`
      INSERT INTO g_companys (name, description)
      VALUES (${name}, ${description})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error)
    return {
      message: 'Database Error: Failed to Create Company.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/companys');
  redirect('/dashboard/companys');
}

export async function updateCompany(
  id: string,
  prevState: companyState,
  formData: FormData,
) {
  const validatedFields = UpdateCompany.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Company.',
    };
  }

  const { name,description  } = validatedFields.data;

  try {
    await sql`
      UPDATE g_companys
      SET name = ${name}, description=${description}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.log(error)
    return { message: 'Database Error: Failed to Update Company.' };
  }

  revalidatePath('/dashboard/companys');
  redirect('/dashboard/companys');
}


export async function createLocation(prevState: gState, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateLocation.safeParse({
    name: formData.get('name'),
    address: formData.get('address'),
    detail_address: formData.get('detail_address'),
    description: formData.get('description'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Location.',
    };
  }

  // Prepare data for insertion into the database
  const { name,address,detail_address,description  } = validatedFields.data;

  // Insert data into the database
  try {
    await sql`
      INSERT INTO g_locations (name, address, detail_address , description)
      VALUES (${name}, ${address}, ${detail_address}, ${description})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/locations');
  redirect('/dashboard/locations');
}

export async function updateLocation(
  id: string,
  prevState: gState,
  formData: FormData,
) {
  const validatedFields = UpdateLocation.safeParse({
    name: formData.get('name'),
    address: formData.get('address'),
    detail_address: formData.get('detail_address'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Location.',
    };
  }

  const { name,address,detail_address,description  } = validatedFields.data;

  try {
    await sql`
      UPDATE g_locations
      SET name = ${name}, address=${address}, detail_address=${detail_address},description=${description}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.log(error)
    return { message: 'Database Error: Failed to Update Location.' };
  }

  revalidatePath('/dashboard/locations');
  redirect('/dashboard/locations');
}

export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  // throw new Error('Failed to Delete Invoice');

  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}

export async function deleteLocation(id: string) {
  // throw new Error('Failed to Delete Invoice');

  try {
    await sql`DELETE FROM g_locations WHERE id = ${id}`;
    revalidatePath('/dashboard/locations');
    return { message: 'Deleted location' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Location.' };
  }
}

export async function deleteCompany(id: string) {
  // throw new Error('Failed to Delete Invoice');

  try {
    await sql`DELETE FROM g_companys WHERE id = ${id}`;
    revalidatePath('/dashboard/companys');
    return { message: 'Deleted company' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete company.' };
  }
}


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}


export async function signUp(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
  await regist('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
