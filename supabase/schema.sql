-- Create companies table
create table public.companies (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.companies enable row level security;

-- Create users_to_companies junction table for managing company memberships
create table public.users_to_companies (
    user_id uuid references auth.users(id) on delete cascade,
    company_id uuid references public.companies(id) on delete cascade,
    role text not null check (role in ('owner', 'admin', 'member')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    primary key (user_id, company_id)
);

-- Enable Row Level Security (RLS)
alter table public.users_to_companies enable row level security;

-- Create RLS policies
create policy "Users can view their own companies"
    on companies for select
    using (
        id in (
            select company_id 
            from users_to_companies 
            where user_id = auth.uid()
        )
    );

create policy "Company owners can update their companies"
    on companies for update
    using (
        id in (
            select company_id 
            from users_to_companies 
            where user_id = auth.uid() 
            and role = 'owner'
        )
    );

create policy "Users can view their own memberships"
    on users_to_companies for select
    using (user_id = auth.uid());

-- Create function to automatically create company membership on registration
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.users_to_companies (user_id, company_id, role)
    select 
        new.id,
        companies.id,
        'owner'
    from public.companies
    where companies.name = (new.raw_user_meta_data->>'company_name')::text
    and companies.created_at >= now() - interval '5 minutes';
    
    return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user registration
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user(); 