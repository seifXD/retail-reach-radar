
-- Insert 5 dummy retailers for testing
INSERT INTO public.retailers (
  retailer_id,
  name,
  mobile,
  sales_order_id,
  project_name,
  description,
  last_recharge_date,
  preferred_collection_method,
  solde,
  agent_id,
  last_call_date
) VALUES 
(
  'R001',
  'Ahmed Electronics Store',
  '+1234567890',
  'SO-2024-001',
  'Urban Expansion',
  'Electronics retailer in downtown area',
  '2024-01-15 10:30:00',
  'Bank Transfer',
  1250.75,
  NULL,
  '2024-01-20 14:45:00'
),
(
  'R002',
  'Fatima Mobile Shop',
  '+1234567891',
  'SO-2024-002',
  'Mobile Network',
  'Mobile phone and accessories retailer',
  '2024-01-18 09:15:00',
  'Cash Collection',
  850.50,
  NULL,
  '2024-01-22 11:20:00'
),
(
  'R003',
  'Hassan General Store',
  '+1234567892',
  'SO-2024-003',
  'Rural Coverage',
  'General store serving rural community',
  '2024-01-12 16:00:00',
  'Mobile Money',
  2100.00,
  NULL,
  '2024-01-19 13:30:00'
),
(
  'R004',
  'Layla Tech Hub',
  '+1234567893',
  'SO-2024-004',
  'Tech District',
  'Technology and gadgets specialist',
  '2024-01-20 12:45:00',
  'Bank Transfer',
  675.25,
  NULL,
  '2024-01-23 15:10:00'
),
(
  'R005',
  'Omar Communication Center',
  '+1234567894',
  'SO-2024-005',
  'Business Hub',
  'Communication services and devices',
  '2024-01-14 08:20:00',
  'Cash Collection',
  1800.80,
  NULL,
  '2024-01-21 10:55:00'
);
