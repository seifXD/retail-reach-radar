
-- Insert some sample retailer data for testing
INSERT INTO public.retailers (retailer_id, name, mobile, sales_order_id, project_name, description, last_recharge_date, preferred_collection_method, solde, agent_id, last_call_date) VALUES
('RET001', 'Ahmed Electronics', '+1234567890', 'SO2024001', 'Mobile Top-up Network', 'Active retailer in downtown area', '2024-06-01 10:00:00+00', 'cash', 150.50, null, '2024-06-05 14:30:00+00'),
('RET002', 'Sara Mobile Shop', '+1234567891', 'SO2024002', 'Mobile Top-up Network', 'New retailer with high potential', '2024-06-03 09:15:00+00', 'bank_transfer', 75.25, null, '2024-06-08 11:20:00+00'),
('RET003', 'Tech World Store', '+1234567892', 'SO2024003', 'Digital Services', 'Established retailer with good track record', '2024-05-28 16:45:00+00', 'mobile_money', 200.00, null, '2024-06-09 09:10:00+00'),
('RET004', 'City Electronics', '+1234567893', 'SO2024004', 'Mobile Top-up Network', 'Medium-sized retailer in shopping mall', '2024-06-02 13:20:00+00', 'cash', 95.75, null, '2024-06-07 15:45:00+00'),
('RET005', 'Digital Hub', '+1234567894', 'SO2024005', 'Digital Services', 'Tech-savvy retailer with online presence', '2024-06-04 08:30:00+00', 'bank_transfer', 300.00, null, '2024-06-09 16:00:00+00');
