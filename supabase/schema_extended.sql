-- Extended AURA Hotel CMS schema — Supabase / Postgres
-- Enable RLS and create all core tables

create extension if not exists "uuid-ossp";

-- Properties (rooms/villas)
create table if not exists properties (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  name_id text,
  category text not null,
  type text not null,
  description text,
  description_id text,
  short_description text,
  short_description_id text,
  size text,
  capacity integer,
  bed_type text,
  base_price integer not null,
  currency text default 'USD',
  status text not null default 'published' check (status in ('draft','published','archived')),
  featured boolean default false,
  sort_order integer default 0,
  size_sqm integer,
  bed_type_id text,
  view text,
  images text[],
  amenities text[],
  features text[],
  included text[],
  policy text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Experiences
create table if not exists experiences (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  title_id text,
  category text not null,
  description text,
  description_id text,
  short_description text,
  short_description_id text,
  duration text,
  price text,
  image text,
  images text[],
  inclusions text[],
  location text,
  order_index integer default 0,
  status text default 'published' check (status in ('draft','published','archived')),
  featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Offers
create table if not exists offers (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  title_id text,
  subtitle text,
  subtitle_id text,
  description text,
  description_id text,
  image text,
  price text,
  validity text,
  validity_id text,
  inclusions text[],
  inclusions_id text[],
  terms text,
  terms_id text,
  discount integer,
  active boolean default true,
  starts_at date,
  ends_at date,
  sort_order integer default 0,
  status text default 'published' check (status in ('draft','published','archived')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Dining Venues
create table if not exists dining_venues (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  name_id text,
  concept text,
  concept_id text,
  cuisine text,
  cuisine_id text,
  description text,
  description_id text,
  hours text,
  hours_id text,
  image text,
  images text[],
  featured_dishes text[],
  location text,
  status text default 'published' check (status in ('draft','published','archived')),
  featured boolean default false,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Wellness Services
create table if not exists wellness_services (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  name_id text,
  description text,
  description_id text,
  duration text,
  price text,
  image text,
  category text,
  category_id text,
  availability text,
  sort_order integer default 0,
  status text default 'published' check (status in ('draft','published','archived')),
  featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Destinations
create table if not exists destinations (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  title_id text,
  editorial_content text,
  editorial_content_id text,
  image text,
  images text[],
  attractions text[],
  map_location jsonb,
  recommended_experiences uuid[],
  status text default 'published' check (status in ('draft','published','archived')),
  featured boolean default false,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Gallery Items
create table if not exists gallery_items (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  image text not null,
  title text,
  title_id text,
  caption text,
  caption_id text,
  category text,
  alt_text text,
  alt_text_id text,
  sort_order integer default 0,
  featured boolean default false,
  status text default 'published' check (status in ('draft','published','archived')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Testimonials
create table if not exists testimonials (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  guest_name text not null,
  guest_name_id text,
  location text,
  location_id text,
  quote text not null,
  quote_id text,
  role text,
  role_id text,
  image text,
  rating integer check (rating >= 1 and rating <= 5),
  featured boolean default false,
  sort_order integer default 0,
  status text default 'published' check (status in ('draft','published','archived')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- FAQs
create table if not exists faqs (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  question text not null,
  question_id text,
  answer text not null,
  answer_id text,
  category text,
  category_id text,
  sort_order integer default 0,
  active boolean default true,
  status text default 'published' check (status in ('draft','published','archived')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Staff
create table if not exists staff (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  name_id text,
  email text unique not null,
  role text not null,
  department text,
  status text default 'active' check (status in ('active','inactive','on_leave')),
  last_active timestamptz,
  avatar_url text,
  phone text,
  bio text,
  bio_id text,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Amenities
create table if not exists amenities (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  name_id text,
  description text,
  description_id text,
  icon text,
  category text,
  category_id text,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Room Amenities (junction)
create table if not exists property_amenities (
  property_id uuid references properties(id) on delete cascade,
  amenity_id uuid references amenities(id) on delete cascade,
  primary key (property_id, amenity_id)
);

-- Gallery Images (for rooms)
create table if not exists property_images (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid references properties(id) on delete cascade,
  url text not null,
  alt_text text,
  alt_text_id text,
  sort_order integer default 0,
  is_primary boolean default false,
  category text,
  created_at timestamptz default now()
);

-- Housekeeping Tasks
create table if not exists housekeeping_tasks (
  id uuid primary key default uuid_generate_v4(),
  room_id uuid references properties(id) on delete set null,
  status text not null default 'dirty' check (status in ('clean','dirty','cleaning','inspection','ready')),
  assigned_to uuid references staff(id) on delete set null,
  notes text,
  priority text default 'normal' check (priority in ('low','normal','high','urgent')),
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Maintenance Issues
create table if not exists maintenance_issues (
  id uuid primary key default uuid_generate_v4(),
  room_id uuid references properties(id) on delete set null,
  issue text not null,
  priority text not null default 'medium' check (priority in ('low','medium','high','critical')),
  status text not null default 'open' check (status in ('open','in_progress','resolved')),
  assigned_to uuid references staff(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  resolved_at timestamptz
);

-- Guest Requests
create table if not exists guest_requests (
  id uuid primary key default uuid_generate_v4(),
  booking_id uuid references bookings(id) on delete cascade,
  guest_name text not null,
  guest_email text not null,
  request_type text,
  request_text text not null,
  status text default 'pending' check (status in ('pending','in_progress','completed','cancelled')),
  assigned_to uuid references staff(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Payments
create table if not exists payments (
  id uuid primary key default uuid_generate_v4(),
  booking_id uuid references bookings(id) on delete cascade,
  guest_id uuid,
  amount integer not null,
  currency text default 'USD',
  method text,
  status text default 'pending' check (status in ('pending','paid','failed','refunded','partially_refunded')),
  transaction_id text,
  paid_at timestamptz,
  refunded_at timestamptz,
  refund_amount integer,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Reports (generated)
create table if not exists reports (
  id uuid primary key default uuid_generate_v4(),
  type text not null,
  title text not null,
  data jsonb not null,
  generated_by uuid references staff(id),
  generated_at timestamptz default now(),
  period_start date,
  period_end date
);

-- Hotel Settings
create table if not exists hotel_settings (
  id uuid primary key default uuid_generate_v4(),
  key text unique not null,
  value jsonb not null,
  description text,
  updated_by uuid references staff(id),
  updated_at timestamptz default now()
);

-- Translations
create table if not exists translations (
  id uuid primary key default uuid_generate_v4(),
  key text not null,
  locale text not null,
  value text not null,
  context text,
  unique (key, locale)
);

-- Bookings (extended)
create table if not exists bookings (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  stay_slug text not null,
  stay_id uuid references properties(id) on delete set null,
  check_in date not null,
  check_out date not null,
  adults integer not null,
  children integer default 0,
  guest_name text not null,
  guest_email text not null,
  guest_phone text,
  special_request text,
  addons text[],
  addon_ids uuid[],
  nights integer,
  rate integer,
  addons_total integer,
  taxes integer,
  fees integer,
  total integer,
  currency text default 'USD',
  status text default 'pending' check (status in ('pending','confirmed','checked_in','checked_out','cancelled','no_show')),
  payment_status text default 'pending' check (payment_status in ('pending','paid','failed','refunded','partially_refunded')),
  payment_id uuid references payments(id),
  source text,
  source_id text,
  confirmed_at timestamptz,
  checked_in_at timestamptz,
  checked_out_at timestamptz,
  cancelled_at timestamptz,
  cancellation_reason text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Payments table
create table if not exists payments (
  id uuid primary key default uuid_generate_v4(),
  booking_id uuid references bookings(id) on delete cascade,
  guest_id uuid,
  amount integer not null,
  currency text default 'USD',
  method text,
  status text default 'pending' check (status in ('pending','paid','failed','refunded','partially_refunded')),
  transaction_id text,
  provider text,
  paid_at timestamptz,
  refunded_at timestamptz,
  refund_amount integer,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table properties enable row level security;
alter table experiences enable row level security;
alter table offers enable row level security;
alter table dining_venues enable row level security;
alter table wellness_services enable row level security;
alter table destinations enable row level security;
alter table gallery_items enable row level security;
alter table testimonials enable row level security;
alter table faqs enable row level security;
alter table staff enable row level security;
alter table amenities enable row level security;
alter table property_images enable row level security;
alter table housekeeping_tasks enable row level security;
alter table maintenance_issues enable row level security;
alter table guest_requests enable row level security;
alter table payments enable row level security;
alter table bookings enable row level security;
alter table staff enable row level security;
alter table amenities enable row level security;
alter table property_images enable row level security;
alter table hotel_settings enable row level security;
alter table translations enable row level security;
alter table media enable row level security;

-- Public read policies
create policy "public read properties" on properties for select using (status='published');
create policy "public read experiences" on experiences for select using (status='published');
create policy "public read offers" on offers for select using (active=true and status='published');
create policy "public read dining" on dining_venues for select using (status='published');
create policy "public read wellness" on wellness_services for select using (status='published');
create policy "public read destinations" on destinations for select using (status='published');
create policy "public read gallery" on gallery_items for select using (status='published');
create policy "public read testimonials" on testimonials for select using (status='published');
create policy "public read faqs" on faqs for select using (active=true and status='published');
create policy "public read staff" on staff for select using (status='active');
create policy "public read amenities" on amenities for select using (active=true);
create policy "public read property_images" on property_images for select using (true);
create policy "public read media" on media for select using (true);
create policy "public read translations" on translations for select using (true);

-- Admin policies (using service role)
-- Bookings: only service_role can insert/update via server
create policy "service manage bookings" on bookings for all using (auth.role() = 'service_role');
create policy "service manage properties" on properties for all using (auth.role() = 'service_role');
create policy "service manage experiences" on experiences for all using (auth.role() = 'service_role');
create policy "service manage offers" on offers for all using (auth.role() = 'service_role');
create policy "service manage dining" on dining_venues for all using (auth.role() = 'service_role');
create policy "service manage wellness" on wellness_services for all using (auth.role() = 'service_role');
create policy "service manage destinations" on destinations for all using (auth.role() = 'service_role');
create policy "service manage gallery" on gallery_items for all using (auth.role() = 'service_role');
create policy "service manage testimonials" on testimonials for all using (auth.role() = 'service_role');
create policy "service manage faqs" on faqs for all using (auth.role() = 'service_role');
create policy "service manage staff" on staff for all using (auth.role() = 'service_role');
create policy "service manage amenities" on amenities for all using (auth.role() = 'service_role');
create policy "service manage housekeeping" on housekeeping_tasks for all using (auth.role() = 'service_role');
create policy "service manage maintenance" on maintenance_issues for all using (auth.role() = 'service_role');
create policy "service manage guest_requests" on guest_requests for all using (auth.role() = 'service_role');
create policy "service manage payments" on payments for all using (auth.role() = 'service_role');
create policy "service manage staff" on staff for all using (auth.role() = 'service_role');
create policy "service manage settings" on hotel_settings for all using (auth.role() = 'service_role');
create policy "service manage translations" on translations for all using (auth.role() = 'service_role');
create policy "service manage media" on media for all using (auth.role() = 'service_role');
create policy "service manage property_images" on property_images for all using (auth.role() = 'service_role');
create policy "service manage property_amenities" on property_amenities for all using (auth.role() = 'service_role');
create policy "service manage housekeeping" on housekeeping_tasks for all using (auth.role() = 'service_role');
create policy "service manage maintenance" on maintenance_issues for all using (auth.role() = 'service_role');
create policy "service manage guest_requests" on guest_requests for all using (auth.role() = 'service_role');
create policy "service manage payments" on payments for all using (auth.role() = 'service_role');
create policy "service manage reports" on reports for all using (auth.role() = 'service_role');
create policy "service manage staff" on staff for all using (auth.role() = 'service_role');
create policy "service manage settings" on hotel_settings for all using (auth.role() = 'service_role');
create policy "service manage translations" on translations for all using (auth.role() = 'service_role');
create policy "service manage property_amenities" on property_amenities for all using (auth.role() = 'service_role');

-- Indexes
create index if not exists idx_properties_status on properties(status);
create index if not exists idx_properties_slug on properties(slug);
create index if not exists idx_properties_category on properties(category);
create index if not exists idx_experiences_status on experiences(status);
create index if not exists idx_offers_active on offers(active);
create index if not exists idx_bookings_status on bookings(status);
create index if not exists idx_bookings_stay on bookings(stay_slug);
create index if not exists idx_bookings_dates on bookings(check_in, check_out);
create index if not exists idx_bookings_guest on bookings(guest_email);
create index if not exists idx_payments_booking on payments(booking_id);
create index if not exists idx_housekeeping_room on housekeeping_tasks(room_id);
create index if not exists idx_maintenance_room on maintenance_issues(room_id);
create index if not exists idx_guest_requests_booking on guest_requests(booking_id);
create index if not exists idx_payments_booking on payments(booking_id);
create index if not exists idx_staff_status on staff(status);
create index if not exists idx_translations_key on translations(key, locale);

-- Triggers for updated_at
create or replace function update_updated_at_column()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create trigger update_properties_updated_at before update on properties for each row execute function update_updated_at_column();
create trigger update_experiences_updated_at before update on experiences for each row execute function update_updated_at_column();
create trigger update_offers_updated_at before update on offers for each row execute function update_updated_at_column();
create trigger update_dining_updated_at before update on dining_venues for each row execute function update_updated_at_column();
create trigger update_wellness_updated_at before update on wellness_services for each row execute function update_updated_at_column();
create trigger update_destinations_updated_at before update on destinations for each row execute function update_updated_at_column();
create trigger update_gallery_updated_at before update on gallery_items for each row execute function update_updated_at_column();
create trigger update_testimonials_updated_at before update on testimonials for each row execute function update_updated_at_column();
create trigger update_faqs_updated_at before update on faqs for each row execute function update_updated_at_column();
create trigger update_staff_updated_at before update on staff for each row execute function update_updated_at_column();
create trigger update_amenities_updated_at before update on amenities for each row execute function update_updated_at_column();
create trigger update_property_images_updated_at before update on property_images for each row execute function update_updated_at_column();
create trigger update_housekeeping_updated_at before update on housekeeping_tasks for each row execute function update_updated_at_column();
create trigger update_maintenance_updated_at before update on maintenance_issues for each row execute function update_updated_at_column();
create trigger update_guest_requests_updated_at before update on guest_requests for each row execute function update_updated_at_column();
create trigger update_payments_updated_at before update on payments for each row execute function update_updated_at_column();
create trigger update_bookings_updated_at before update on bookings for each row execute function update_updated_at_column();
create trigger update_staff_updated_at before update on staff for each row execute function update_updated_at_column();
create trigger update_amenities_updated_at before update on amenities for each row execute function update_updated_at_column();
create trigger update_property_images_updated_at before update on property_images for each row execute function update_updated_at_column();
create trigger update_housekeeping_updated_at before update on housekeeping_tasks for each row execute function update_updated_at_column();
create trigger update_maintenance_updated_at before update on maintenance_issues for each row execute function update_updated_at_column();
create trigger update_guest_requests_updated_at before update on guest_requests for each row execute function update_updated_at_column();
create trigger update_payments_updated_at before update on payments for each row execute function update_updated_at_column();
create trigger update_bookings_updated_at before update on bookings for each row execute function update_updated_at_column();
create trigger update_staff_updated_at before update on staff for each row execute function update_updated_at_column();
create trigger update_hotel_settings_updated_at before update on hotel_settings for each row execute function update_updated_at_column();
create trigger update_translations_updated_at before update on translations for each row execute function update_updated_at_column();
create trigger update_media_updated_at before update on media for each row execute function update_updated_at_column();

-- Functions for availability checking
create or replace function check_availability(
  p_stay_slug text,
  p_check_in date,
  p_check_out date
) returns table (
  available boolean,
  conflicting_bookings integer
) language plpgsql as $$
declare
  v_stay_id uuid;
  v_count integer;
begin
  select id into v_stay_id from properties where slug = p_stay_slug and status = 'published';
  if v_stay_id is null then
    return query select false, 0;
  end if;
  
  select count(*) into v_count
  from bookings
  where stay_id = v_stay_id
    and status in ('pending', 'confirmed', 'checked_in')
    and check_in < p_check_out
    and check_out > p_check_in;
  
  return query select (v_count = 0), v_count;
end $$;

-- Function to calculate pricing
create or replace function calculate_booking_total(
  p_stay_id uuid,
  p_check_in date,
  p_check_out date,
  p_addon_ids uuid[] default '{}'
) returns table (
  nights integer,
  base_price integer,
  addons_total integer,
  taxes integer,
  fees integer,
  total integer
) language plpgsql as $$
declare
  v_base_price integer;
  v_nights integer;
  v_addons_total integer := 0;
  v_subtotal integer;
  v_taxes integer;
  v_fees integer := 0;
  v_total integer;
begin
  select base_price into v_base_price from properties where id = p_stay_id;
  
  v_nights := p_check_out - p_check_in;
  if v_nights <= 0 then
    v_nights := 1;
  end if;
  
  if array_length(p_addon_ids, 1) > 0 then
    select coalesce(sum(price), 0) into v_addons_total
    from amenities
    where id = any(p_addon_ids);
  end if;
  
  v_subtotal := (v_base_price * v_nights) + v_addons_total;
  v_taxes := round(v_subtotal * 0.11); -- 11% tax
  v_fees := round(v_subtotal * 0.02); -- 2% service fee
  v_total := v_subtotal + v_taxes + v_fees;
  
  return query select v_nights, v_base_price, v_addons_total, v_taxes, v_fees, v_total;
end $$;

