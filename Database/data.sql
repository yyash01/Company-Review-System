use MAJOR;

INSERT INTO COMPANY (COMPANY_NAME, CATEGORY, OVERVIEW, FEATURES, COMPANY_WEBSITE, RATING) VALUES
("Marketing Consultancy", "Consultancy", "LMN Consultancy provides consulting services to businesses in various industries. They have a team of experienced consultants who work closely with clients to understand their business needs and provide effective solutions.", "1. Business strategy consulting\n2. Operations consulting\n3. Marketing consulting\n4. IT consulting", "https://www.lmnconsultancy.com", 2);
-- ("LMN Consultancy", "Consultancy", "LMN Consultancy provides consulting services to businesses in various industries. They have a team of experienced consultants who work closely with clients to understand their business needs and provide effective solutions.", "1. Business strategy consulting\n2. Operations consulting\n3. Marketing consulting\n4. IT consulting", "https://www.lmnconsultancy.com", 4),
-- ("GHI Foods", "Food and Beverages", "GHI Foods is a food and beverage company. They specialize in manufacturing and distributing a wide range of food products including snacks, beverages, and packaged foods.", "1. High-quality ingredients\n2. Variety of products\n3. Innovative packaging\n4. Eco-friendly practices", "https://www.ghifoods.com", 3);

--  ('ABC Solutions', 'Key Account management', 'ABC Solutions provides key account management services to clients worldwide.', 'Our services include strategic planning, customer acquisition and retention, and sales training.', 'https://www.abcsolutions.com', 4),
--  ('XYZ Motors', 'Automobiles', 'XYZ Motors is a leading automobile manufacturer, specializing in electric cars.', 'Our cars are designed for performance and efficiency, and are available in a range of models and colors.', 'https://www.xyzmotors.com', 5),
--  ('Acme Inc.', 'Finance', 'Acme Inc. is a financial services firm, providing investment management and advisory services to individuals and institutions.', 'Our team of experts provides personalized solutions to meet the unique needs of each client.', 'https://www.acmeinc.com', 3),
--  ('Global Logistics', 'Transportation', 'Global Logistics is a leading provider of logistics and transportation services, operating in over 50 countries worldwide.', 'Our services include freight forwarding, customs clearance, and supply chain management.', 'https://www.globallogistics.com', 4),
--  ('Innovate IT', 'Technology', 'Innovate IT is a software development company, specializing in web and mobile applications.', 'Our team of developers and designers work closely with clients to create innovative solutions that meet their business needs.', 'https://www.innovateit.com', 4);




 SELECT * FROM company;  

INSERT INTO PRODUCT (PRODUCT_NAME, CATEGORY, COMPANY_ID, PRICE, FEATURES, RATING) VALUES
('Org Chart Pro', 'Key Account management', 22, 299.99, 'Organize your workforce hierarchy and make it visually appealing with Org Chart Pro.', 4),
('Advanced Chart Tool', 'Key Account management', 22, 199.99, 'Create customizable charts and graphs for your business data with ease using Advanced Chart Tool.', 4),
('SUV-1', 'Automobile', 23, 25000, 'This SUV offers ample space and comfort for your family.', 4),
('TruckPro', 'Automobile', 23, 35000, 'Get the job done with our high-performing TruckPro.', 5),
('Data Analyzer', 'Finance', 24, 99.99, 'Analyze your data in seconds with our easy-to-use Data Analyzer.', 3),
('ReportGen', 'Finance', 24, 149.99, 'Create professional reports with our customizable ReportGen tool.', 4),
('OfficePro', 'Consultancy', 27, 299.99, 'Increase your teams productivity with OfficePro.', 5),
('TaskMaster', 'Finance', 24, 149.99, 'Organize your tasks and stay on track with TaskMaster.', 2),
('Electric Scooter', 'Transportation', 25, 599.99, 'Foldable and lightweight', 4),
('Mountain Bike', 'Transportation', 25, 999.99, 'Full suspension and disc brakes', 5),
('Organic Coffee Beans', 'Food and Beverages', 28, 29.99, 'Fair trade and single origin', 4),
('Organic Green Tea', 'Food and Beverages', 28, 19.99, 'Loose leaf and antioxidant-rich', 3),
('Business Strategy Consulting', 'Consultancy', 27, 5000.00, 'Customized to meet business goals', 5),
('IT Consulting', 'Technology', 26, 7500.00, 'Expertise in latest technology trends', 4);

 


INSERT INTO COMPANY_REVIEW(AUTHOR, TITLE, CR_RATING, CREATION_DATE, COMPANYID, ANSWER_1, ANSWER_2, ANSWER_3, ANSWER_4) VALUES
(2, 'Great experience with ABC Solutions', 4, '2023-02-25 08:30:00', 30, 'The strategic planning provided by ABC Solutions was excellent and helped us to increase our revenue.', 'I wish ABC Solutions had more expertise in our specific industry, but they were still able to provide valuable insights.', 'We used their sales training program and found it to be very effective.', 'Overall, very satisfied with their services.'),
 (3, 'Amazing Electric Cars', 5, '2023-01-03 13:10:00', 23, 'I recently purchased an electric car from XYZ Motors and I am extremely satisfied with my purchase.', 'Nice', 'The car has great performance and is very efficient.', 'I cannot think of any feedback for improvement.'),
 (12, 'Satisfactory Experience', 3, '2022-12-10 11:20:00', 27, 'LMN Consultancy provided some useful marketing strategies for my business.', 'I found their consulting services to be a bit overpriced for what they offered.', 'I used their IT consulting services to improve my company website.', 'Overall, it was a satisfactory experience.'),
 (5, 'Great consulting services', 5, '2022-12-01 10:30:00', 27, 'The consultants at LMN Consultancy were extremely knowledgeable and provided great insights for our business strategy. They were also very responsive and easy to work with.', 'I have no complaints about their services.', 'We used LMN Consultancy for business strategy consulting and were very impressed with their approach and expertise.', 'No feedback to improve - they were fantastic!'),
 (6, 'Quality food products', 4, '2022-11-15 14:00:00', 28, 'GHI Foods has a great selection of high-quality food products. I particularly love their variety of snacks and beverages.', 'Their prices can be a bit high compared to other food brands.', 'I have used their products for snacking at work and at home, and have always been happy with the quality and taste.', 'Lower prices on some of their products would be appreciated.'),
 (8, 'Efficient transportation services', 4, '2022-10-20 09:45:00', 25, 'Global Logistics provided excellent transportation services for our business needs. Their staff were professional and efficient, and our shipments arrived on time and in good condition.', 'Their prices can be a bit high compared to other logistics providers.', 'We used Global Logistics for freight forwarding and were very satisfied with their services.', 'Lower prices on some of their services would be appreciated.'),
 (9, 'Innovative software solutions', 5, '2022-09-05 16:20:00', 26, 'Innovate IT created a custom mobile app for our business that has greatly improved our operations. Their team was very creative and listened to our needs and feedback throughout the development process.', 'No complaints about their services.', 'We used Innovate IT for mobile app development and were impressed with their ability to create a unique solution that met our needs.', 'No feedback to improve - they did an excellent job!');
 




select * from company_review;


INSERT INTO PRODUCT_REVIEW(AUTHOR, TITLE, PR_RATING, CREATION_DATE, PRODUCTID, ANSWER_1, ANSWER_2, ANSWER_3, ANSWER_4) VALUES
(2, 'Great Product', 5, '2022-12-01 10:00:00', 26, 'The org chart feature is very useful in visualizing our company hierarchy.', 'None', 'Customizable charts and graphs help us in analyzing our business data more efficiently.', 'None'),
(12, 'Could be better', 3, '2022-12-05 14:30:00', 15, 'The space and comfort offered by the SUV-1 is great.', 'The price could be lower for a mid-range SUV.', 'The hands-free liftgate and rearview camera are very helpful features for daily use.', 'None'),
(6, 'Perfect for the job', 5, '2022-11-28 16:45:00', 16, 'The TruckPro performs exceptionally well in transporting heavy loads.', 'None', 'The towing capacity and durable build are essential features for our business.', 'None'),
(3, 'Excellent tool', 4, '2022-12-10 09:15:00', 17, 'The Data Analyzer helps us to analyze large amounts of data quickly.', 'The UI could be more user-friendly.', 'The filter and sort functions are very helpful in organizing the data.', 'None'),
(5, 'Satisfied with the purchase', 4, '2022-11-30 11:20:00', 18, 'ReportGen helped us to create professional reports easily and efficiently.', 'None', 'Customizable report templates and graphs make our reports more presentable.', 'None'),
(6, 'Great for team collaboration', 5, '2022-12-08 13:45:00', 19, 'OfficePro has improved our team productivity significantly.', 'None', 'The real-time collaboration feature makes it easier for us to work on projects together.', 'None'),
(5, 'Not what I expected', 2, '2022-12-04 17:00:00', 20, 'TaskMaster has a lot of features, but it is difficult to navigate and use efficiently.', 'The interface could be more user-friendly.', 'The reminder feature helps me to stay on track with my tasks.', 'None'),
(8, 'Easy to use', 4, '2022-12-07 08:30:00', 21, 'The electric scooter is very easy to fold and store.', 'None', 'The lightweight design makes it convenient to carry around.', 'None'),
(9, 'Great bike', 5, '2022-12-03 12:00:00', 22, 'The mountain bike has great suspension and brakes.', 'None', 'The bike is very durable and can withstand tough terrain.', 'None'),
(10, 'Delicious coffee', 4, '2022-12-09 10:30:00', 23, 'The organic coffee beans have a great flavor and aroma.', 'None', 'The fair trade certification makes us feel good about our purchase.', 'None'),
(11, 'High-quality tea', 3, '2022-12-06 15:00:00', 24, 'The organic green tea has a unique taste and is very healthy.', 'The price could be lower for a tea product.', 'The loose leaf format allows us to control the strength of the tea.', 'None');

SELECT * FROM PRODUCT_REVIEW;


INSERT INTO USER VALUES
(1,"Admin","abc123");

select * from user;