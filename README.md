1. Project Objective and Context
The objective of this project is to design and implement a scalable, full-stack general e-commerce web application. The platform will serve as a versatile online storefront capable of dynamically managing various product categories and brands. The primary goal is to apply modern web development paradigms, focusing on robust state management on the client side, secure RESTful API communication, and efficient database modeling for complex relational data (like users, carts, and orders) within a NoSQL environment.


2. Key Features to be Implemented
•	Dynamic Product Catalog: Users can browse products, view detailed specifications, images, pricing, and availability. Products will be linked to specific categories and brands.
•	Secure User Authentication & Authorization: Implementation of a complete authentication flow (registration, login, password recovery). The system will support distinct user roles (User, Manager, Admin) to restrict access to sensitive operations. 
•	Server-Side Shopping Cart: To ensure data consistency across devices, the shopping cart will be managed and validated on the backend and stored in the database, rather than relying solely on client-side storage. 
•	Order Processing & Profile Management: Users will have personalized profiles to manage multiple shipping addresses, a product wishlist, and view their order history with delivery statuses. 
3. Technology Stack
•	Frontend Environment: React.js initialized via Vite, styled with Tailwind CSS for rapid, responsive UI design. State management will be handled primarily using Redux Toolkit for complex global states (like the cart and user session), supplemented by the Context API for lighter UI states.
•	Backend Environment: Node.js using the Express.js framework to build a robust RESTful API.
•	Database: MongoDB, utilizing Mongoose as the Object Data Modeling (ODM) library to enforce data schemas, relationships, and validation rules at the application layer.
4. System Architecture & Data Model Diagram
The system follows a client-server architecture. The React frontend communicates asynchronously with the Express backend via JSON APIs. The database relies on three core collections connected via document references (ObjectIds):
•	User Collection: Stores credentials, roles, saved addresses, and a wishlist (referencing Product IDs).
•	Product Collection: Stores product metadata, pricing, inventory quantity, ratings, and references to Category/Brand collections.
•	Order Collection: Acts as the central transactional hub, linking the User reference with an array of cartItems (referencing Product IDs and specific quantities), along with shipping details and payment status. 
