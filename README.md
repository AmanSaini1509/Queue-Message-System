# Queue-Message-System
A highly scalable, microservices-based Queue Management System built using Node.js, RabbitMQ, MongoDB, and Redis with real-time monitoring and auto-scaling capabilities. This system efficiently handles message queuing, processing, and monitoring to ensure seamless message throughput even under heavy load.

# 📚 Key Features
✅ Microservices Architecture – Separate services for Producer, Consumer, and Monitoring for better scalability and maintainability.
✅ RabbitMQ for Message Queue – Ensures reliable message delivery and load distribution.
✅ MongoDB for Persistent Storage – Stores message metadata and logs for tracking and analysis.
✅ Redis for Caching and Monitoring – Real-time data storage and retrieval for monitoring stats.
✅ Auto-Scaling Workers – Dynamically scales workers based on message throughput to handle 100k+ messages/second.
✅ Real-Time Monitoring Dashboard – Tracks message throughput, worker health, and error handling stats.

# 🎯 System Architecture
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│  Producer    │  -->  │  RabbitMQ    │  -->  │  Consumer    │
└──────────────┘       └──────────────┘       └──────────────┘
         |                    |                       |
         v                    v                       v
  ┌─────────────┐      ┌─────────────┐         ┌─────────────┐
  │  MongoDB    │      │  Redis      │         │  Monitoring │
  └─────────────┘      └─────────────┘         └─────────────┘

  
# 📦 Tech Stack
-> Backend: Node.js, Express.js

-> Queue Broker: RabbitMQ

-> Database: MongoDB

-> Cache/Monitoring: Redis (ioredis)

-> Communication: AMQP Protocol

# 🛠️ Setup and Installation
1. Clone the Repository
   
         git clone https://github.com/AmanSaini1509/Queue-Message-System.git
         cd Queue-Message-System

3. Install Dependencies
   
         //Install dependencies for all microservices
         npm install

4. Configure Environment Variables
         Create a .env file in the services directory and set the following variables:
   
         //RabbitMQ Configuration
         RABBITMQ_URL=amqp://localhost

         //MongoDB Configuration
         MONGO_URI=mongodb://localhost:27017/queue_system

         //Redis Configuration
         REDIS_HOST=127.0.0.1
         REDIS_PORT=6379

         //Other Configuration
         PORT=3000

5. Run RabbitMQ, MongoDB, and Redis
Ensure RabbitMQ, MongoDB, and Redis services are running before starting the application.

         // Start RabbitMQ
         sudo systemctl start rabbitmq-server

         //Start MongoDB
         sudo systemctl start mongod

         //Start Redis
         sudo systemctl start redis

5. Run the Microservices
Run Producer Service
cd producer
node server.js

Run Consumer Service
cd consumer
node server.js

Run Monitoring Service
cd monitoring
node server.js

# 🔥 Usage
Producer API: Send messages to the queue.

Consumer Service: Processes messages from the queue.

Monitoring Service: Displays real-time stats of message throughput and worker health.

Example Request (Producer API)
POST /api/send
Content-Type: application/json

{
  "message": "Hello, World!",
  "priority": "high"
}

# 🧠 Future Enhancements
 Implement WebSockets for real-time notifications.

 Add Dead Letter Queue (DLQ) for failed messages.

 Introduce Rate Limiting for API endpoints.

 Improve Security with TLS and Input Validation.

# 🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.

Create a new branch (feature/new-feature).

Commit your changes.

Push to the branch and create a pull request.

# 📝 License
This project is licensed under the MIT License.

# 📧 Contact
For any questions or collaboration, feel free to reach out!


