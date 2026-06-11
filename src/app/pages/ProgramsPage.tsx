import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect, useCallback } from 'react';
import {
  GraduationCap, Building2, Globe, Award, CheckCircle, Sparkles, Rocket,
  Shield, Brain, Star, ChevronDown, ArrowRight, Trophy, Clock,
  X, PlayCircle, Layers, Cpu, Database, Lock, LineChart, Users, Target,
  Hand, Briefcase, Landmark, Zap, TrendingUp, BookOpen, Video,
  BarChart3, Calendar, CheckSquare, DollarSign, Headphones, FileText,
  School, UserCheck, ThumbsUp, MessageCircle, Phone, Mail, MapPin,
  Upload, Search, AlertCircle, CheckSquare as CheckSq, ShieldCheck,
  FileCheck, Eye, Loader2, BadgeCheck, Hash, Share2, Lightbulb,
  Heart, Zap as ZapIcon, ExternalLink,
  ShoppingCart,
  Palette,
  Smartphone,
} from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';

const certificateImageUrl = new URL("../../assets/certificate.jpg", import.meta.url).href;


// ─── BRAND ───────────────────────────────────────────────────────────────────
const BRAND      = '#dc2626';
const BRAND_DARK = '#b91c1c';
const BRAND_LITE = '#ef4444';

const IMGS = {
  hero:           '/assets/program/heromain.png',
  individual:     '/assets/program/choose_your_path/individual.png',
  corporate:      '/assets/program/choose_your_path/cooporate.png',
  government:     '/assets/program/choose_your_path/govern.png',
  ai:             'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
  security:       'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=80',
  training:       'https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?w=600&q=80',
  global:         'https://images.unsplash.com/photo-1621977717126-e29965156a27?w=900&q=80',
  internship:     'https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?w=900&q=80',
  career:         'https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=900&q=80',
  corporateHero:  '/assets/program/B2B/hero.png',
  govHero:        '/assets/program/B2C/hero.png',
  govMeeting:     '/assets/program/B2C/image.png',
  codingClass:    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
  aiTech:         'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
  cloudComputing: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80',
    ios: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&q=80',  // ADD for iOS
  powerbi: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80', // ADD for Power BI
  datascience: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80', // ADD for Data Science
  springboot: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=600&q=80', // ADD for Spring Boot
  oracle: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&q=80', // ADD for Oracle
  webdev: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80', // ADD for Web Dev
  uxui: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&q=80', // ADD for UX/UI
  fullstack: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80', // ADD for Full Stack
  aiengineer: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80', // ADD for AI Engineer
};

const CATEGORIES = [
  { id: 'all',        name: 'All Courses',   icon: Layers,    color: BRAND },
  { id: 'software',   name: 'Software Dev',  icon: Cpu,       color: '#3b82f6' },
  { id: 'ai',         name: 'AI & ML',       icon: Brain,     color: '#8b5cf6' },
  // { id: 'security',   name: 'Cybersecurity', icon: Shield,    color: '#ef4444' },
  { id: 'networking', name: 'Networking',    icon: Database,  color: '#06b6d4' },
  { id: 'pmp',        name: 'PMP',           icon: Trophy,    color: '#f59e0b' },
  // { id: 'mobile',     name: 'Mobile Dev',    icon: Smartphone, color: '#10b981' },  // ← ADD THIS for iOS
];

const COURSES = [
  { 
    id: 1, 
    category: 'mobile', 
    title: 'Advanced iOS App Development', 
    level: 'Advanced', 
    duration: '6 months', 
    students: '1,200+', 
    rating: 4.9, 
    description: 'Master Swift programming, Core Data, API integration, memory management, and publish iOS apps to the App Store.',
    objectives: [
      'Learn Swift programming language - Essential iOS Development Skill',
      'Learn how to save and load data on your iOS device',
      'Learn how to fetch data from internal and external JSON files using Web APIs',
      'Integrate with Third-party libraries',
      'Memory management in iOS',
      'Build an application screen with UI or Programming',
      'Learn how to publish iOS apps to the App Store'
    ],
    covers: [
      'Advanced Swift Programming: Generics, closures, functional programming, and protocol-oriented programming',
      'User Interface Design: Creating custom UI elements, animations, and adaptive layouts for diverse iOS devices',
      'Data Management: Using Core Data for complex data relationships, migrations, and optimization',
      'API Integration: Fetching data from internal/external JSON files and integrating third-party libraries via Web APIs',
      'Advanced Features: Implementing location services, push notifications, multimedia (audio/video/camera), and AR/ML integration',
      'Performance Optimization: Memory management, CPU optimization, and profiling techniques for efficient apps',
      'App Store Deployment: Publishing apps, implementing App Store optimization, crash reporting, and analytics integration',
      'Capstone Project: Developing a fully functional iOS app to demonstrate advanced development skills'
    ],
    outcomes: [
      'Apply advanced Swift concepts, including generics, closures, and functional programming techniques',
      'Design and implement sophisticated user interfaces with custom UI elements, animations, and adaptive layouts',
      'Integrate complex APIs and third-party libraries for enhanced app functionality',
      'Optimize app performance through memory management, CPU optimization, and profiling techniques',
      'Implement advanced data management using Core Data, including relationships, migration, and optimization',
      'Incorporate advanced features such as location services, push notifications, multimedia (audio/video/camera), and AR/ML integration'
    ],
    img: IMGS.ios, 
    price: '$1,499', 
    color: '#10b981' 
  },
  
  { 
    id: 2, 
    category: 'ai', 
    title: 'Data Analysis with Power BI', 
    level: 'Intermediate', 
    duration: '3 months', 
    students: '2,100+', 
    rating: 4.8, 
    description: 'Master Power BI for data modeling, transformation, visualization, and DAX calculations to create interactive dashboards.',
    objectives: [
      'Understand the fundamental concepts of Power BI, including data modeling, data transformation, and visualization',
      'Master the process of importing, cleaning, and transforming data from various sources into Power BI',
      'Create interactive and visually appealing reports and dashboards using a range of visualization techniques and best practices',
      'Utilize advanced features of Power BI such as DAX (Data Analysis Expressions) for calculations and measures',
      'Develop proficiency in creating dynamic and visually compelling reports and dashboards to effectively communicate insights to stakeholders',
      'Utilize advanced data modeling techniques in Power BI to establish relationships between datasets, create calculated columns and measures, and optimize data structures for analysis',
      'Apply best practices in data visualization to create intuitive and interactive reports that facilitate exploration and understanding of complex datasets'
    ],
    covers: [
      'Introduction to Power BI: Overview of Power BI Desktop, Cloud, and Mobile, and its role in business intelligence',
      'Data Connectivity: Connecting to data sources like databases, spreadsheets, CSV, XML, and JSON',
      'Data Transformation: Using Power Query to clean, transform, and automate data tasks',
      'Data Visualization: Creating interactive visuals, selecting appropriate charts, and using slicers for dynamic reports',
      'Data Modeling: Building relationships between datasets, creating calculated columns, measures, and calendar tables',
      'DAX Essentials: Performing powerful calculations and analytics using Data Analysis Expressions',
      'Report and Dashboard Creation: Designing professional reports and publishing dashboards',
      'Advanced Features: Working with parameters, R scripts, row-level security, and performance optimization'
    ],
    outcomes: [
      'Understand data and real-world use case',
      'How interactive visuals can be useful for your business',
      'The basic rules for building charts',
      'Connect to nearly ANY data source quickly and easily',
      'How to choose the right chart for every business case',
      'How to create interactive visuals in Power BI',
      'Easily transform data and automate data tasks with Power Query',
      'Understand the importance of Data Modeling for optimization and performance',
      'Create powerful calculations and analytics with DAX',
      'Importance of a Calendar Table',
      'Picking the right visual based on your data',
      'Create interactive reports with slicers',
      'Publishing reports and creating dashboards'
    ],
    img: IMGS.powerbi, 
    price: '$899', 
    color: '#8b5cf6' 
  },
  
  { 
    id: 3, 
    category: 'ai', 
    title: 'Intensive Data Science', 
    level: 'Advanced', 
    duration: '3 months', 
    students: '1,800+', 
    rating: 4.9, 
    description: 'Master Python, Pandas, machine learning, NLP, and time series analysis for real-world data science applications.',
    objectives: [
      'Demonstrate knowledge regarding the basics of the Python programming environment, including fundamental Python programming techniques such as lambdas, reading and manipulating CSV files, and the Numpy library',
      'Apply data manipulation and cleaning techniques using the popular Python Pandas data science library',
      'Visualize the data using Python libraries such as Matplotlib, and Seaborn',
      'Discuss the abstraction of the use of statistical analysis and machine learning in data processing and data analysis',
      'Demonstrate knowledge regarding advanced analytics including data handling, statistical analysis, and predictive modeling',
      'Apply machine learning techniques using the popular Python Pandas, and Sklearn data science library',
      'Acquire practical and hands-on skills in machine learning covering both supervised and unsupervised methods, including text mining and natural language programming',
      'Storytelling about Data'
    ],
    covers: [
      'Introduction to data science, its applications, tasks of a data scientist, and the learning roadmap',
      'Data Science & Python Basics: Learn Python fundamentals and data manipulation for data science',
      'Mathematics for Data Science: Master linear algebra, calculus, and probability for analytical tasks using Python',
      'Statistics for Data Science: Apply descriptive stats, hypothesis testing, and regression analysis in Python',
      'Data Pre-processing with Pandas: Clean, merge, transform, and prepare datasets for analysis',
      'Data Visualization: Create insightful visualizations using Matplotlib, Seaborn, and EDA techniques',
      'Midterm Project: Apply dimensionality reduction techniques like PCA and T-SNE in Python',
      'Data Extraction & Feature Engineering: Extract, transform, and select features for better model performance',
      'Machine Learning Basics I: Understand ML types and explore supervised learning methods',
      'Machine Learning Basics II: Implement ML algorithms with Python in hands-on projects',
      'Natural Language Processing (NLP): Perform text preprocessing, sentiment analysis, and classification with Python, plus social media analytics',
      'Time Series Analysis: Forecast and analyze time series data using ARIMA, SARIMA, and decomposition methods',
      'Model Evaluation & Optimization: Use cross-validation, hyperparameter tuning, and ensemble techniques to improve models',
      'Capstone Project Mentoring: Guidance and support for real-world project development',
      'Capstone Project Execution: Apply analytics in domains such as marketing, risk, operations, and finance',
      'Project Development & Presentation: Finalize and present industry-relevant data science projects'
    ],
    outcomes: [
      'Extract the basic concepts and principles of data science',
      'Describe basic statistical concepts, Python, and Power BI for data visualization',
      'Describe basic principles and techniques of supervised and unsupervised machine learning',
      'Analyze and interpret data using descriptive statistics and hypothesis testing Python and Power BI',
      'Apply supervised and unsupervised machine-learning techniques to real-world data',
      'Develop a curiosity and interest in working with data',
      'Develop a critical and analytical mindset for problem-solving'
    ],
    img: IMGS.datascience, 
    price: '$1,299', 
    color: '#8b5cf6' 
  },
  
  { 
    id: 4, 
    category: 'software', 
    title: 'Java Spring Boot', 
    level: 'Intermediate', 
    duration: '3 months', 
    students: '1,500+', 
    rating: 4.8, 
    description: 'Build robust enterprise applications with Spring Boot, REST APIs, microservices, and Spring Security.',
    objectives: [
      'Understand the Spring Boot Ecosystem: Gain a comprehensive understanding of the Spring Boot framework, its philosophy, and how it simplifies Java application development',
      'Master Data Access: Develop data-driven applications by connecting Spring Boot with databases, creating repositories, and performing CRUD operations with Spring Data JPA',
      'Implement Security: Secure your applications using Spring Security, including user authentication, authorization, and protecting RESTful APIs',
      'Write Effective Tests: Write unit tests and integration tests for Spring Boot applications, ensuring code quality, reliability, and maintainability',
      'Develop RESTful APIs: Design and build RESTful APIs with Spring Boot, manage request/response formats, versioning, and handle exceptions',
      'Explore Microservices: Understand microservices architecture, implement service discovery with Eureka, and create an API Gateway using Spring Cloud',
      'Prepare for Deployment: Package Spring Boot applications as JAR or WAR files, deploy them to popular cloud platforms or containers, and manage environment-specific configurations',
      'Optimize Performance: Apply best practices to optimize the performance of Spring Boot applications, including caching, profiling, and monitoring with Spring Boot Actuator',
      'Troubleshoot and Debug: Learn to troubleshoot and debug common issues in Spring Boot applications, enhancing your problem-solving skills',
      'Capstone Project: Apply your knowledge and skills in a real-world scenario by completing a capstone project, demonstrating your ability to build a complete Spring Boot application',
      'Continued Learning: Develop a strong foundation for further exploration of advanced Spring Boot topics'
    ],
    covers: [
      'Introduction to Spring Boot: Learn the basics of Spring framework, set up your environment, and build your first app',
      'Spring Boot Fundamentals: Understand project structure, configuration, dependencies, and create RESTful services',
      'Spring Boot Data Access: Use Spring Data JPA for repositories, CRUD operations, and database integration',
      'Spring Boot Web Applications: Build web apps with controllers, request handling, and form validation',
      'Spring Boot Security: Configure authentication, authorization, and secure RESTful APIs',
      'Spring Boot Testing: Write unit and integration tests using JUnit and Mockito, with best practices',
      'Spring Boot RESTful APIs: Implement advanced REST concepts, versioning, error handling, and content negotiation',
      'Spring Boot Microservices: Build microservices with Eureka for discovery and Zuul for API Gateway',
      'Spring Boot Deployment: Package applications, deploy to cloud (AWS, Heroku), and use Docker containers',
      'Advanced Topics & Best Practices: Apply monitoring, environment profiles, performance optimization, and troubleshooting',
      'Capstone Project: Building a complete Spring Boot application to demonstrate practical skills'
    ],
    outcomes: [
      'Proficiency in Spring Boot: Develop a strong command of the Spring Boot framework, enabling you to efficiently build Java applications',
      'Data Access Skills: Master data access by connecting your Spring Boot applications to databases, implementing repositories, and performing CRUD operations with Spring Data JPA',
      'Security Expertise: Implement security measures effectively using Spring Security, including user authentication, authorization, and securing RESTful APIs',
      'Effective Testing: Write comprehensive unit tests and integration tests for Spring Boot applications, ensuring code quality and reliability',
      'RESTful API Development: Design, build, and document RESTful APIs, manage different versions, and handle request/response formats and exceptions',
      'Microservices Understanding: Gain a solid grasp of microservices architecture, implement service discovery, and create an API Gateway using Spring Cloud',
      'Deployment Proficiency: Prepare Spring Boot applications for deployment by packaging them as JAR or WAR files, deploying to cloud platforms or containers, and managing environment specific configurations',
      'Performance Optimization: Apply best practices to optimize the performance of Spring Boot applications, including caching, profiling, and monitoring with Spring Boot Actuator',
      'Troubleshooting Skills: Develop the ability to diagnose and resolve common issues that may arise in Spring Boot applications',
      'Capstone Project: Apply your knowledge and skills to create a complete, real-world Spring Boot application',
      'Continued Learning: Establish a foundation for continuous learning in the ever-evolving Spring ecosystem'
    ],
    img: IMGS.springboot, 
    price: '$1,099', 
    color: '#3b82f6' 
  },
  
  { 
    id: 5, 
    category: 'networking', 
    title: 'Oracle Database 19c', 
    level: 'Professional', 
    duration: '3 months', 
    students: '1,400+', 
    rating: 4.7, 
    description: 'Master Oracle database architecture, security, backup/recovery, and performance monitoring for enterprise database administration.',
    objectives: [
      'Describe Oracle Database architecture',
      'Configure the database to support your application',
      'Manage Database security and implement auditing',
      'Implement basic backup and recovery procedures',
      'Move data between database and files',
      'Employ basic monitoring procedures and manage performance'
    ],
    covers: [
      'Introduction to Oracle Database: Learn the Oracle database architecture and core concepts',
      'Accessing an Oracle Database: Use DBCA tools to connect and interact with Oracle databases',
      'Creating Databases with DBCA: Build new Container Databases (CDB) using DBCA',
      'Creating Databases with SQL: Create databases using SQL commands',
      'Starting & Shutting Down Instances: Manage database lifecycle and pluggable databases (PDBs)',
      'Managing Database Instances: Configure initialization parameters and view diagnostic info',
      'Oracle Net Service: Configure and administer Oracle networking services',
      'Configuring Naming Methods: Set up Oracle network naming for database access',
      'Listener Configuration: Create, manage, and connect through database listeners',
      'Shared Server Architecture: Implement and configure shared server mode',
      'Oracle Connection Manager: Set up multiplexing and access control with Connection Manager',
      'Creating PDBs from Seed: Provision new pluggable databases from templates',
      'Advanced PDB Creation: Clone, migrate, and relocate PDBs',
      'Managing PDBs: Rename, configure, and maintain pluggable databases',
      'Database Storage Overview: Understand tablespaces, blocks, and storage allocation',
      'Creating & Managing Tablespaces: Create, modify, and manage temporary and permanent tablespaces',
      'Improving Space Usage: Use compression and space management features',
      'Managing Undo Data: Configure undo tablespaces and temporary undo',
      'User Account Management: Create and manage common/local users with quotas',
      'Privileges & Roles: Grant and configure roles for database users',
      'User Resource Limits: Set up default roles and resource limits for users',
      'Database Auditing: Enable and configure unified auditing for security compliance',
      'Loading & Transporting Data: Import/export data using various methods and tools',
      'External Tables for Data Transport: Use external tables for fast data movement',
      'Automated Maintenance Tasks: Configure maintenance windows and task schedules',
      'Monitoring & Performance Tuning: Understand performance metrics and monitoring tools',
      'SQL Optimization: Analyze queries and optimize execution paths',
      'Final Exam: Test your skills through a practical and theoretical assessment'
    ],
    outcomes: [
      'Create and Administer an Oracle Database',
      'Configure and Administer Oracle Net Services',
      'Create and Administer Pluggable Database',
      'Create and Manage Database Storage',
      'Load and Transport Data',
      'Manage Automated Maintenance Task',
      'Monitor and Tune Database Performance'
    ],
    img: IMGS.oracle, 
    price: '$1,199', 
    color: '#06b6d4' 
  },
  
  { 
    id: 6, 
    category: 'software', 
    title: 'Web Application Development', 
    level: 'Beginner', 
    duration: '3 months', 
    students: '2,800+', 
    rating: 4.8, 
    description: 'Build dynamic websites with HTML, CSS, JavaScript, PHP, and MySQL integration from fundamentals to deployment.',
    objectives: [
      'The fundamentals of programing with C',
      'Teach the fundamental skills and concepts necessary for designing and developing dynamic websites',
      'Provide hands-on experience working on real-world projects to apply what you have learned and build an impressive portfolio of web development projects',
      'Cover basic and advanced topics, including HTML, CSS, JavaScript, server-side scripting, API development, and database integration',
      'Ensure that students gain an understanding of modern standards and best practices for web development'
    ],
    covers: [
      'Programming Fundamentals: Introduction to programming concepts using C',
      'Front-End Development: Designing and structuring websites with HTML, CSS, and JavaScript/jQuery',
      'Back-End Development: Server-side scripting with PHP, including data validation, transformation, and formatting',
      'Database Integration: Interfacing PHP with MySQL, connecting to databases, executing SQL queries, and retrieving datasets',
      'Dynamic Web Pages: Creating interactive and responsive web applications',
      'API Development: Building and integrating APIs for web applications',
      'Capstone Project: Developing a professional-grade dynamic website or web application to demonstrate skills'
    ],
    outcomes: [
      'Basic of programming concept',
      'Design and develop dynamic websites using HTML, CSS, JavaScript / jQuery, and PHP',
      'Analyze, describe, design, & develop client-side web-based solutions',
      'Structure and layout of a website',
      'Use modern standards and best practices for web development',
      'Have an impressive portfolio of web development projects to showcase their skills and knowledge',
      'Be prepared for entry-level positions in web development or further study in the field'
    ],
    img: IMGS.webdev, 
    price: '$799', 
    color: '#3b82f6' 
  },
  
  { 
    id: 7, 
    category: 'pmp', 
    title: 'UX/UI Design', 
    level: 'Beginner', 
    duration: '3 months', 
    students: '1,900+', 
    rating: 4.8, 
    description: 'Learn user-centered design, wireframing, prototyping, and usability testing using Figma and modern design principles.',
    objectives: [
      'Follow the design process: empathize with users, define pain points, ideate solutions, create wireframes and prototypes, test and iterate on designs',
      'Apply foundational UX concepts, like user-centered design, accessibility, and equity-focused design',
      'Understanding the basic of UX research, like planning research studies and usability studies',
      'Apply common layouts for web pages',
      'Master Figma'
    ],
    covers: [
      'Human-Computer Interaction (HCI): Learn how users think and interact through cognitive psychology and UX laws',
      'UI vs. UX & Design Thinking: Understand their differences and apply research-driven design processes',
      'Graphic & Visual Design Basics: Master color theory, typography, layout, and design tools like Figma',
      'UX Research & Usability Testing: Conduct user studies, apply testing methods, and evaluate designs effectively',
      'Wireframing & Prototyping: Create low/high fidelity designs, user flows, and interactive prototypes',
      'UX Writing & Accessibility: Write effective interface text with a focus on inclusivity and accessibility',
      'UI Design Principles: Design for multiple devices using UI components and modern design guidelines',
      'Interaction Design: Add animations, micro-interactions, and motion graphics to elevate user experience',
      'Advanced UX Practices: Improve designs with A/B testing, critiques, and iterative processes',
      'Career Preparation: Build a strong portfolio, explore freelancing, and practice ethical design'
    ],
    outcomes: [
      'Understand the principles and practices of UX and UI design',
      'Apply user research methods and techniques to identify user needs and preferences',
      'Create user personas, scenarios, user journeys and user flows to define user goals and behaviors',
      'Design wireframes, prototypes and mockups to communicate design ideas and test usability',
      'Use design tools Figma to create and present design solutions',
      'Evaluate and iterate on design solutions based on user feedback and testing'
    ],
    img: IMGS.uxui, 
    price: '$899', 
    color: '#f59e0b' 
  },
  
  { 
    id: 8, 
    category: 'pmp', 
    title: 'Project Management Professional (PMP)', 
    level: 'Professional', 
    duration: '3 months', 
    students: '2,400+', 
    rating: 4.9, 
    description: 'Master project management principles, process groups, knowledge areas, and prepare for PMP/CAPM certification.',
    objectives: [
      'Develop a solid foundation in project management principles and terminology',
      'Understand the five project management process groups: initiation, planning, execution, monitoring and controlling, and closing',
      'Gain knowledge of the ten project management knowledge areas, including scope, time, cost, quality, human resources, communication, risk, procurement, integration, and stakeholder management',
      'Familiarize yourself with project management best practices and industry standards',
      'Prepare for the CAPM certification exam by covering the key topics and concepts required for success'
    ],
    covers: [
      'Introduction to Project Management: Process groups, project lifecycle, management relationships, and tailoring approaches',
      'Project Environment: Impact factors, organizational systems, PMO roles, and project hierarchy',
      'Role of the Project Manager: Functions, sphere of influence, PMI triangle, leadership vs management',
      'Integration Management: Seven processes, change management, tailoring, and integration methods',
      'Scope Management: Six processes, WBS, agile/adaptive scope handling, and prototypes',
      'Schedule Management: Six processes, scheduling calculations, agile/adaptive considerations',
      'Cost Management: Four processes, forecasting, earned value, agile/adaptive cost handling',
      'Quality Management: Three processes, quality tools, continuous improvement, adaptive approaches',
      'Resource Management: Six processes, team development, conflict resolution, resource planning',
      'Communication Management: Three processes, communication planning, skills, and methods',
      'Risk Management: Seven processes, risk documents, calculations, and environmental adjustments',
      'Procurement Management: Three processes, contracts, agreements, and source selection',
      'Stakeholder Management: Four processes, stakeholder roles, needs, and benefits',
      'Principles of Agile: Agile vs Waterfall, scaling Agile, Scrum basics, real-world cases'
    ],
    outcomes: [
      'Explain the importance of project management in achieving organizational goals',
      'Understand the role and responsibilities of a project manager and project team members',
      'Apply project management principles to initiate, plan, execute, monitor, control, and close projects effectively',
      'Create project management deliverables such as project charters, work breakdown structures, schedules, budgets, and risk management plans',
      'Identify and analyze project risks and develop appropriate risk response strategies',
      'Effectively communicate and collaborate with project stakeholders',
      'Recognize ethical considerations and professional conduct in project management',
      'Demonstrate readiness to take the CAPM certification exam through a comprehensive understanding of the exam content and practice with sample questions'
    ],
    img: IMGS.corporate, 
    price: '$999', 
    color: '#f59e0b' 
  },
  
  { 
    id: 9, 
    category: 'ai', 
    title: 'AI Engineer', 
    level: 'Advanced', 
    duration: '6 months', 
    students: '1,100+', 
    rating: 4.9, 
    description: 'Comprehensive AI engineering program covering machine learning, deep learning, and production-ready AI systems.',
    objectives: [
      'Master fundamental and advanced AI/ML concepts',
      'Build and deploy production-ready AI models',
      'Understand deep learning architectures and neural networks',
      'Implement computer vision and NLP solutions',
      'Optimize AI models for performance and scalability'
    ],
    covers: [
      'Python for AI: Advanced Python, NumPy, Pandas, Scikit-learn',
      'Machine Learning: Supervised/unsupervised learning, regression, classification, clustering',
      'Deep Learning: Neural networks, TensorFlow, PyTorch, CNN, RNN, LSTM',
      'Computer Vision: Image recognition, object detection, OpenCV',
      'Natural Language Processing: Text processing, sentiment analysis, transformers, BERT',
      'Model Deployment: Flask/FastAPI, Docker, cloud deployment (AWS/Azure/GCP)',
      'MLOps: Model versioning, monitoring, CI/CD for ML',
      'Capstone Project: End-to-end AI solution development'
    ],
    outcomes: [
      'Build and deploy production-ready AI models',
      'Master deep learning frameworks (TensorFlow/PyTorch)',
      'Implement computer vision and NLP solutions',
      'Optimize AI models for real-world applications',
      'Deploy AI models to cloud platforms',
      'Earn industry-recognized AI certification'
    ],
    img: IMGS.aiengineer, 
    price: '$1,699', 
    color: '#8b5cf6' 
  },
  
  { 
    id: 10, 
    category: 'software', 
    title: 'Full-Stack Development', 
    level: 'Intermediate', 
    duration: '4 months', 
    students: '2,200+', 
    rating: 4.8, 
    description: 'Master front-end and back-end development with modern frameworks, databases, and deployment strategies.',
    objectives: [
      'Master modern front-end frameworks (React/Angular/Vue)',
      'Build robust back-end APIs and services',
      'Design and manage databases (SQL and NoSQL)',
      'Deploy full-stack applications to production',
      'Implement authentication and security best practices'
    ],
    covers: [
      'Front-End: HTML5, CSS3, JavaScript, React.js, State management (Redux), Responsive design',
      'Back-End: Node.js, Express.js, RESTful API design, Authentication (JWT, OAuth)',
      'Databases: MongoDB, PostgreSQL, Mongoose, SQL queries, Database design',
      'DevOps: Git, GitHub, Docker, CI/CD pipelines, Cloud deployment (Vercel/Heroku/AWS)',
      'Testing: Unit testing, Integration testing, Jest, React Testing Library',
      'Capstone Project: Build and deploy a complete full-stack application'
    ],
    outcomes: [
      'Build complete full-stack applications from scratch',
      'Implement secure authentication and authorization',
      'Design and optimize database schemas',
      'Deploy applications to production environments',
      'Write clean, maintainable, and tested code',
      'Collaborate effectively using Git workflows'
    ],
    img: IMGS.fullstack, 
    price: '$1,299', 
    color: '#3b82f6' 
  }
];

// Mock certificate database
const CERT_DB = {
  'ADT-2024-001': { name: 'Sopheak Meas', course: 'Advanced Cybersecurity', date: 'March 15, 2024', grade: 'Distinction', id: 'ADT-2024-001', hours: '80 CPD Hours' },
  'ADT-2024-087': { name: 'Dara Khem',    course: 'Full Stack Web Development', date: 'June 22, 2024', grade: 'Merit', id: 'ADT-2024-087', hours: '112 CPD Hours' },
  'ADT-2023-412': { name: 'Leakhena Pov', course: 'AI & Machine Learning', date: 'November 10, 2023', grade: 'Distinction', id: 'ADT-2023-412', hours: '96 CPD Hours' },
  'ADT-2024-205': { name: 'Virak Chan',   course: 'Project Management Professional', date: 'August 5, 2024', grade: 'Pass', id: 'ADT-2024-205', hours: '48 CPD Hours' },
};

// ─── 3D ANIMATION COMPONENTS ────────────────────────────────────────────────────

// Enhanced Reveal with 3D rotation
function Reveal({ children, delay = 0, direction = 'up', className = '', style = {}, rotate = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const dirs = { up: { y: 50, x: 0, rotateX: rotate ? 15 : 0 }, down: { y: -50, x: 0, rotateX: rotate ? -15 : 0 }, left: { y: 0, x: 50, rotateY: rotate ? 15 : 0 }, right: { y: 0, x: -50, rotateY: rotate ? -15 : 0 } };
  const { y, x, rotateX, rotateY } = dirs[direction] || dirs.up;
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y, x, rotateX, rotateY }}
      animate={inView ? { opacity: 1, y: 0, x: 0, rotateX: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className} style={style}>
      {children}
    </motion.div>
  );
}

// 3D Tilt Card on hover
function TiltCard({ children, intensity = 8, className = '', style = {} }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 300, damping: 30 });

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1200, ...style }}
      className={className}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
          x.set((e.clientX - rect.left) / rect.width - 0.5);
          y.set((e.clientY - rect.top) / rect.height - 0.5);
        }
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

// Hover card with lift and 3D effect
function HoverCard({ children, className = '', style = {} }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className={className}
      style={{
        borderRadius: 24,
        border: `1px solid ${isHovered ? BRAND + '30' : '#e5e7eb'}`,
        background: '#fff',
        boxShadow: isHovered 
          ? `0 20px 40px -12px rgba(0,0,0,0.15), 0 0 0 1px ${BRAND}10`
          : '0 1px 3px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </motion.div>
  );
}

// Parallax scroll effect
function ParallaxScroll({ children, speed = 0.02, direction = 'up', className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], direction === 'up' ? [60, -60] : [-60, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.4]);
  
  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

// Floating animation for elements
function Floating({ children, delay = 0, amplitude = 10, duration = 3 }) {
  return (
    <motion.div
      animate={{ y: [0, -amplitude, 0, amplitude, 0] }}
      transition={{ duration, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

// 3D Scene with floating cards
function ThreeDCardGrid({ children }) {
  return (
    <div className="relative" style={{ perspective: '1200px' }}>
      <div className="relative transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </div>
  );
}

// Staggered reveal with 3D rotation
function StaggerContainer({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, dark = false }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-5">
      <span className={`block w-7 h-px ${dark ? 'bg-red-500' : 'bg-red-600'}`} />
      <span className={`text-xs font-bold tracking-[0.2em] uppercase ${dark ? 'text-red-400' : 'text-red-600'}`}>{children}</span>
      <span className={`block w-7 h-px ${dark ? 'bg-red-500' : 'bg-red-600'}`} />
    </div>
  );
}

function GradientText({ children }) {
  return <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">{children}</span>;
}

function AnimatedCounter({ value, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let n = 0;
    const step = Math.ceil(value / 60);
    const timer = setInterval(() => {
      n += step;
      if (n >= value) { setCount(value); clearInterval(timer); }
      else setCount(n);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ─── MODALS ───────────────────────────────────────────────────────────────────

const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 14, outline: 'none', background: '#fafafa', boxSizing: 'border-box' };

function CourseModal({ course, onClose, onRegister }) {
  if (!course) return null;
  
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-5 bg-black/80 backdrop-blur-md"
        onClick={onClose}>
        <motion.div 
          initial={{ scale: 0.9, y: 30, rotateX: 20 }} 
          animate={{ scale: 1, y: 0, rotateX: 0 }} 
          exit={{ scale: 0.9, y: 30, rotateX: 20 }}
          onClick={e => e.stopPropagation()}
          className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl relative shadow-2xl">
          
          {/* Hero Image Section with Gradient Overlay */}
          <div className="relative h-80 overflow-hidden">
            <motion.img 
              src={course.img} 
              alt={course.title} 
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
            
            {/* Close Button */}
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg hover:bg-white/30 transition-all z-10">
              <X size={18} className="text-white" />
            </button>
            
            {/* Course Level Badge */}
            <div className="absolute bottom-6 left-6 z-10">
              <div className="flex gap-3 items-center">
                <span className="px-4 py-2 rounded-full text-white text-sm font-bold shadow-lg" style={{ background: course.color }}>
                  {course.level}
                </span>
                {course.credits && (
                  <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-semibold">
                    {course.credits} Credits
                  </span>
                )}
              </div>
            </div>
            
            {/* Course Title Overlay */}
            <div className="absolute bottom-6 right-6 left-auto z-10 max-w-md text-right">
              <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">{course.title}</h2>
              <div className="flex gap-4 justify-end text-white/90 text-sm">
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={14} /> {course.students} enrolled
                </span>
                {course.rating && (
                  <span className="flex items-center gap-1">
                    <Star size={14} fill="#fbbf24" stroke="none" /> {course.rating}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="p-8">
            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FileText size={20} className="text-red-600" />
                Course Overview
              </h3>
              <p className="text-gray-600 leading-relaxed">{course.description || course.fullDesc}</p>
            </div>
            
            {/* Key Information Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {course.duration && (
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                  <Clock size={20} className="text-red-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-500 mb-1">Duration</p>
                  <p className="font-semibold text-gray-900 text-sm">{course.duration}</p>
                </div>
              )}
              {course.credits && (
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                  <Award size={20} className="text-red-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-500 mb-1">Credits</p>
                  <p className="font-semibold text-gray-900 text-sm">{course.credits}</p>
                </div>
              )}
              {course.students && (
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                  <Users size={20} className="text-red-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-500 mb-1">Students</p>
                  <p className="font-semibold text-gray-900 text-sm">{course.students}</p>
                </div>
              )}
              {course.level && (
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                  <TrendingUp size={20} className="text-red-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-500 mb-1">Level</p>
                  <p className="font-semibold text-gray-900 text-sm">{course.level}</p>
                </div>
              )}
            </div>
            
            {/* Prerequisites (if exists) */}
            {course.prerequisites && (
              <div className="mb-8 bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield size={18} className="text-blue-600" />
                  Prerequisites
                </h3>
                <p className="text-gray-700 text-sm">{course.prerequisites}</p>
              </div>
            )}
            
            {/* Learning Objectives (if exists) */}
            {course.objectives && course.objectives.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Target size={20} className="text-red-600" />
                  Learning Objectives
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {course.objectives.map((obj, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl hover:shadow-md transition-all group"
                    >
                      <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-red-600 transition-colors">
                        <CheckCircle size={14} className="text-red-600 group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-sm text-gray-700 leading-relaxed">{obj}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Learning Outcomes */}
            {course.outcomes && course.outcomes.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award size={20} className="text-red-600" />
                  What You'll Learn
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {course.outcomes.map((outcome, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-3 p-3 bg-gradient-to-r from-red-50 to-white rounded-xl border border-red-100 hover:shadow-md transition-all"
                    >
                      <CheckCircle size={16} color={course.color} className="flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 leading-relaxed">{outcome}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Tools & Technologies */}
            {course.tools && course.tools.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Cpu size={20} className="text-red-600" />
                  Tools & Technologies Covered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {course.tools.map((tool, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.03 }}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-red-100 hover:text-red-700 transition-all cursor-default"
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Suitable For / Target Audience */}
            {course.suitableFor && (
              <div className="mb-8 bg-gradient-to-r from-purple-50 to-white rounded-xl p-5 border border-purple-100">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Users size={18} className="text-purple-600" />
                  Target Audience
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">{course.suitableFor}</p>
              </div>
            )}
            
            {/* Course Includes Section */}
            <div className="mb-8 bg-gray-50 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <CheckSquare size={18} className="text-red-600" />
                This Course Includes:
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-red-500" />
                  <span>Certificate of Completion</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-red-500" />
                  <span>Hands-on Projects</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-red-500" />
                  <span>Industry Expert Instructors</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-red-500" />
                  <span>Lifetime Access to Materials</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-red-500" />
                  <span>Career Support & Guidance</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-red-500" />
                  <span>Community Access</span>
                </div>
              </div>
            </div>
            
            {/* CTA Section with 3D Hover Effect */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-red-700 p-8 shadow-xl"
            >
              <div className="absolute inset-0 bg-white/10 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">Ready to Start Your Journey?</h4>
                  <p className="text-red-100">Enroll now and take the first step toward your career goals</p>
                </div>
                <motion.button 
                  onClick={onRegister} 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-xl bg-white text-red-600 font-bold cursor-pointer shadow-lg hover:shadow-2xl transition-all flex items-center gap-2 group">
                  Register Now 
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function RegModal({ show, onClose, course }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [applicationId, setApplicationId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  const formRef = useRef(null);
  const hasSubmitted = useRef(false);

  // Reset form when modal closes
  useEffect(() => {
    if (!show) {
      setIsSubmitting(false);
      setSubmitted(false);
      setError('');
      setApplicationId('');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: ''
      });
      hasSubmitted.current = false;
    }
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async () => {
    // Prevent double submission
    if (hasSubmitted.current || isSubmitting) return;
    
    // Validate required fields
    if (!formData.name.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Please enter your phone number');
      return;
    }

    setError('');
    hasSubmitted.current = true;
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a random application ID
      const newAppId = Math.random().toString(36).substring(2, 10).toUpperCase();
      setApplicationId(newAppId);
      
      console.log('Registration submitted:', { 
        ...formData, 
        course: course?.title,
        applicationId: newAppId,
        timestamp: new Date().toISOString()
      });
      
      setSubmitted(true);
    } catch (error) {
      console.error('Registration error:', error);
      setError('There was an error submitting your registration. Please try again.');
      hasSubmitted.current = false;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-center justify-center p-5 bg-black/80 backdrop-blur-md" 
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, y: 24, rotateX: 15 }} 
          animate={{ scale: 1, y: 0, rotateX: 0 }} 
          exit={{ scale: 0.9, y: 24, rotateX: 15 }}
          onClick={e => e.stopPropagation()} 
          className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-red-50 to-white border-b border-gray-100 flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {submitted ? 'Application Received!' : `Register for ${course?.title || 'Course'}`}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {submitted ? "We'll be in touch soon" : 'Please fill in your details below'}
              </p>
            </div>
            <button 
              onClick={onClose} 
              className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {submitted ? (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                className="text-center"
              >
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  transition={{ type: 'spring', stiffness: 400, delay: 0.1 }}
                  className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5"
                >
                  <CheckCircle size={42} className="text-red-600" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Registration Submitted!
                </h3>
                
                <p className="text-gray-600 mb-2">
                  Thank you, <strong className="text-gray-900">{formData.name}</strong>!
                </p>
                
                <p className="text-sm text-gray-500 mb-5">
                  We've sent a confirmation to <strong>{formData.email}</strong>. Our team will review your application and get back to you within 2-3 business days via email.
                </p>
                
                <div className="bg-red-50 rounded-xl p-4 mb-5">
                  <p className="text-xs text-red-600 font-mono mb-1">
                  Application ID: <strong>{applicationId}</strong>
                  </p>
                  <p className="text-xs text-gray-500">
                  Please keep this for reference
                  </p>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="w-full py-3 rounded-xl bg-red-600 text-white font-semibold cursor-pointer shadow-lg hover:bg-red-700 transition-all"
                >
                  Close
                </motion.button>
              </motion.div>
            ) : (
              <>
                <div className="flex flex-col gap-4">
                  <div>
                    <input 
                      type="text" 
                      name="name"
                      placeholder="Full Name *" 
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${error && !formData.name ? 'border-red-400' : 'border-gray-200'} focus:border-red-400 focus:outline-none transition-colors`}
                    />
                  </div>
                  
                  <div>
                    <input 
                      type="email" 
                      name="email"
                      placeholder="Email Address *" 
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${error && (!formData.email || !formData.email.includes('@')) ? 'border-red-400' : 'border-gray-200'} focus:border-red-400 focus:outline-none transition-colors`}
                    />
                  </div>
                  
                  <div>
                    <input 
                      type="tel" 
                      name="phone"
                      placeholder="Phone Number *" 
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${error && !formData.phone ? 'border-red-400' : 'border-gray-200'} focus:border-red-400 focus:outline-none transition-colors`}
                    />
                  </div>
                  
                  <div>
                    <input 
                      type="text" 
                      name="company"
                      placeholder="Company / Organization (Optional)" 
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-3"
                  >
                    {error}
                  </motion.p>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  className={`w-full mt-6 py-3 rounded-xl bg-red-600 text-white font-semibold cursor-pointer shadow-lg transition-all ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-700'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 size={18} className="animate-spin" />
                      Submitting...
                    </div>
                  ) : (
                    'Complete Registration →'
                  )}
                </motion.button>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── ENHANCED QUOTE MODAL WITH SERVICE SELECTION ─────────────────────────────────
const SERVICES = [
  { id: 'ondemand', name: 'On-Demand Training', icon: Cpu, description: 'Self-paced programs with 24/7 access for continuous upskilling' },
  { id: 'live', name: 'Live Training / Short Courses', icon: Users, description: 'Instructor-led sessions with practical focus' },
  { id: 'group', name: 'Group Training', icon: Target, description: 'Customized programs for entire teams' },
  { id: 'elearning', name: 'Digital E-Learning', icon: Globe, description: 'Structured digital solution for remote training' },
  { id: 'other', name: 'Other (Custom Program)', icon: Sparkles, description: 'Tell us what you\'d like to study' },
];

function QuoteModal({ show, onClose, preselectedService = null }) {
  const [step, setStep] = useState<'select' | 'details'>('select');
  const [selectedService, setSelectedService] = useState<string | null>(preselectedService);
  const [customTopic, setCustomTopic] = useState('');
  const [formData, setFormData] = useState({ name: '', company: '', phone: '', email: '' });

  // Auto-advance to details if preselected service is provided
  useEffect(() => {
    if (preselectedService && show) {
      setSelectedService(preselectedService);
      setStep('details');
    } else if (show && !preselectedService) {
      setStep('select');
      setSelectedService(null);
    }
  }, [preselectedService, show]);

  const handleSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setStep('details');
  };

  const handleSubmit = () => {
    const serviceName = SERVICES.find(s => s.id === selectedService)?.name || selectedService;
    let message = `Quote request submitted!\n\nService: ${serviceName}`;
    if (selectedService === 'other' && customTopic) {
      message += `\nTopic: ${customTopic}`;
    }
    alert(message);
    onClose();
    setTimeout(() => {
      setStep('select');
      setSelectedService(null);
      setCustomTopic('');
      setFormData({ name: '', company: '', phone: '', email: '' });
    }, 300);
  };

  const handleBack = () => {
    setStep('select');
    setSelectedService(null);
    setCustomTopic('');
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-center justify-center p-5 bg-black/80 backdrop-blur-md" onClick={onClose}>
        <motion.div initial={{ scale: 0.9, y: 24, rotateX: 15 }} animate={{ scale: 1, y: 0, rotateX: 0 }} exit={{ scale: 0.9, y: 24, rotateX: 15 }}
          onClick={e => e.stopPropagation()} className="w-full max-w-2xl bg-white rounded-3xl p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><X size={14} /></button>
          
          {step === 'select' ? (
            <>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Get a <GradientText>Quote</GradientText></h3>
              <p className="text-gray-500 mb-6">Select the training service you're interested in</p>
              
              <div className="grid gap-4 mb-6">
                {SERVICES.map(service => {
                  const Icon = service.icon;
                  return (
                    <motion.button
                      key={service.id}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleSelect(service.id)}
                      className="flex items-start gap-4 p-5 text-left rounded-xl border border-gray-200 hover:border-red-300 hover:bg-red-50/30 transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                        <Icon size={24} className="text-red-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 text-lg">{service.name}</div>
                        <p className="text-gray-500 text-sm mt-1">{service.description}</p>
                      </div>
                      <ArrowRight size={20} className="text-gray-400 mt-3 flex-shrink-0" />
                    </motion.button>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Complete <GradientText>Request</GradientText></h3>
              <p className="text-sm text-gray-500 mb-6">
                {selectedService === 'other' 
                  ? "Tell us about your custom training needs" 
                  : `You selected: ${SERVICES.find(s => s.id === selectedService)?.name}`}
              </p>
              
              <div className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <input type="text" placeholder="Your Name *" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={inputStyle} />
                  <input type="text" placeholder="Company / Organization *" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} style={inputStyle} />
                  <input type="tel" placeholder="Phone Number *" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={inputStyle} />
                  <input type="email" placeholder="Email Address *" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={inputStyle} />
                </div>
                
                {selectedService === 'other' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What would you like to study? *</label>
                    <textarea
                      placeholder="Please describe the topics, skills, or technologies you're interested in..."
                      value={customTopic}
                      onChange={e => setCustomTopic(e.target.value)}
                      rows={4}
                      style={{ ...inputStyle, resize: 'vertical' }}
                    />
                  </div>
                )}
                
                <div className="flex gap-3 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBack}
                    className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold cursor-pointer"
                  >
                    ← Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={(selectedService === 'other' && !customTopic.trim()) || !formData.name || !formData.company || !formData.phone || !formData.email}
                    className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold cursor-pointer shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Request
                  </motion.button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function PartnerModal({ show, onClose }) {
  if (!show) return null;
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-center justify-center p-5 bg-black/80 backdrop-blur-md" onClick={onClose}>
        <motion.div initial={{ scale: 0.9, y: 24, rotateX: 15 }} animate={{ scale: 1, y: 0, rotateX: 0 }} exit={{ scale: 0.9, y: 24, rotateX: 15 }}
          onClick={e => e.stopPropagation()} className="w-full max-w-md bg-white rounded-3xl p-8 relative shadow-2xl">
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><X size={14} /></button>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">Request <GradientText>Partnership</GradientText></h3>
          <p className="text-sm text-gray-500 mb-6">Government and university collaboration opportunities</p>
          <div className="flex flex-col gap-3">
            {['Your Name *', 'Organization / Institution *', 'Email Address *', 'Phone Number *'].map(ph => (
              <input key={ph} type="text" placeholder={ph} style={inputStyle} />
            ))}
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => { alert('Partnership request submitted!'); onClose(); }}
              className="py-4 rounded-xl bg-red-600 text-white font-bold cursor-pointer shadow-lg mt-2">Submit Partnership Request</motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── CERTIFICATE CENTER ───────────────────────────────────────────────────────

function CertificateCenter() {
  const [certId, setCertId] = useState('');
  const [status, setStatus] = useState('idle');
  const [cert, setCert] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);

  const handleSearch = useCallback(() => {
    const q = certId.trim().toUpperCase();
    if (!q) return;
    setStatus('loading');
    setCert(null);
    setTimeout(() => {
      if (CERT_DB[q]) {
        setCert(CERT_DB[q]);
        setStatus('found');
      } else {
        setStatus('error');
      }
    }, 1800);
  }, [certId]);

  const handleFile = (file) => {
    if (!file) return;
    setStatus('loading');
    setCert(null);
    setTimeout(() => {
      const keys = Object.keys(CERT_DB);
      const random = keys[Math.floor(Math.random() * keys.length)];
      if (Math.random() > 0.3) {
        setCert(CERT_DB[random]);
        setStatus('found');
      } else {
        setStatus('error');
      }
    }, 2500);
  };

  const demos = Object.keys(CERT_DB);

  return (
    <section className="py-24 bg-gray-950 relative overflow-hidden">
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(220,38,38,0.08) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.4), transparent)',
      }} />

      <div className="max-w-5xl mx-auto px-6 lg:px-10 relative z-10">
        <Reveal className="text-center mb-14">
          <div className="inline-flex items-center gap-2.5 mb-5">
            <span className="block w-7 h-px bg-red-500" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-red-400">Verify Credentials</span>
            <span className="block w-7 h-px bg-red-500" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Certificate{' '}
            <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Center</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Upload your ID or enter your certificate number to verify and retrieve your official credential
          </p>
        </Reveal>

        <div className="flex flex-col gap-8">
          <Reveal delay={0.1}>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 24, padding: 32,
            }}>
              <div className="mb-6">
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600, marginBottom: 8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Certificate ID
                </label>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, position: 'relative', minWidth: '200px' }}>
                    <Hash size={16} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      value={certId}
                      onChange={e => setCertId(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSearch()}
                      placeholder="e.g. ADT-2024-001"
                      style={{
                        width: '100%', padding: '13px 16px 13px 40px',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 12, color: 'white', fontSize: 14,
                        outline: 'none', boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSearch}
                    disabled={status === 'loading'}
                    style={{
                      padding: '13px 20px', background: '#dc2626',
                      borderRadius: 12, border: 'none', color: 'white',
                      fontWeight: 700, fontSize: 14, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 6,
                      opacity: status === 'loading' ? 0.7 : 1,
                      whiteSpace: 'nowrap',
                    }}>
                    {status === 'loading' ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Search size={16} />}
                    Search
                  </motion.button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
              </div>

              <div className="mt-6">
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>
                  Try demo certificate IDs:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {demos.map(id => (
                    <button key={id} onClick={() => { setCertId(id); setStatus('idle'); setCert(null); }}
                      style={{
                        padding: '5px 12px', background: 'rgba(220,38,38,0.1)',
                        border: '1px solid rgba(220,38,38,0.25)',
                        borderRadius: 8, color: '#fca5a5', fontSize: 12, cursor: 'pointer', fontWeight: 600,
                      }}>
                      {id}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>


          <Reveal delay={0.2}>
            <AnimatePresence mode="wait">
              {status === 'idle' && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 24, padding: 48, textAlign: 'center',
                    minHeight: 320, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                  <div style={{
                    width: 80, height: 80, borderRadius: '50%',
                    background: 'rgba(220,38,38,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px',
                    border: '1px solid rgba(220,38,38,0.15)',
                  }}>
                    <ShieldCheck size={36} color="rgba(220,38,38,0.5)" />
                  </div>
                  <h3 style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                    Certificate Verification
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 14, lineHeight: 1.6 }}>
                    Enter your certificate ID or upload your ID document to verify and retrieve your credential
                  </p>
                </motion.div>
              )}

              {status === 'loading' && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 24, padding: 48, textAlign: 'center',
                    minHeight: 320, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                  <div style={{ position: 'relative', width: 80, height: 80, margin: '0 auto 20px' }}>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      style={{
                        position: 'absolute', inset: 0,
                        borderRadius: '50%',
                        border: '3px solid rgba(220,38,38,0.15)',
                        borderTopColor: '#dc2626',
                      }}
                    />
                    <div style={{
                      position: 'absolute', inset: 8,
                      borderRadius: '50%',
                      background: 'rgba(220,38,38,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <ShieldCheck size={24} color="rgba(220,38,38,0.7)" />
                    </div>
                  </div>
                  <h3 style={{ color: 'rgba(255,255,255,0.8)', fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                    Verifying credentials...
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>
                    Scanning our secure certificate registry
                  </p>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div key="error" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  style={{
                    background: 'rgba(239,68,68,0.05)',
                    border: '1px solid rgba(239,68,68,0.2)',
                    borderRadius: 24, padding: 48, textAlign: 'center',
                    minHeight: 320, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                  <div style={{
                    width: 80, height: 80, borderRadius: '50%',
                    background: 'rgba(239,68,68,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px',
                    border: '1px solid rgba(239,68,68,0.3)',
                  }}>
                    <AlertCircle size={36} color="#ef4444" />
                  </div>
                  <h3 style={{ color: '#fca5a5', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
                    Certificate Not Found
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                    We couldn't locate a certificate matching your ID. Please check the number and try again, or contact our support team.
                  </p>
                  <button onClick={() => { setStatus('idle'); setCertId(''); }}
                    style={{
                      padding: '10px 24px', background: 'rgba(239,68,68,0.15)',
                      border: '1px solid rgba(239,68,68,0.35)',
                      borderRadius: 10, color: '#fca5a5', fontWeight: 600, cursor: 'pointer', fontSize: 14,
                    }}>
                    Try Again
                  </button>
                </motion.div>
              )}

              {status === 'found' && cert && (
                <motion.div key="found" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <CertificateCard cert={cert} />
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}

function CertificateCard({ cert }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t); }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: 15 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20, rotateX: visible ? 0 : 15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div style={{
        background: 'white',
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: '0 20px 35px -8px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)',
      }}>
        <div style={{
          background: '#dc2626',
          padding: '12px 20px',
          textAlign: 'center',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(255,255,255,0.15)',
            padding: '3px 12px',
            borderRadius: 50,
          }}>
            <ShieldCheck size={12} color="white" />
            <span style={{ color: 'white', fontSize: 10, fontWeight: 600, letterSpacing: '0.05em' }}>
              VERIFIED CERTIFICATE
            </span>
          </div>
        </div>

        <div style={{ padding: '28px' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 28,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
            <div style={{
              flex: '0 0 auto',
              width: '320px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: '100%',
                height: 'auto',
                background: '#fef2f2',
                borderRadius: 16,
                padding: '28px 20px',
                textAlign: 'center',
                border: '1px solid #fecaca',
              }}>
                <img 
                  src={certificateImageUrl}
                  alt="Certificate Seal" 
                  style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                />
                
                <div style={{
                  fontSize: 10,
                  color: '#6b7280',
                  borderTop: '1px solid #fecaca',
                  paddingTop: 12,
                  marginTop: 10,
                  fontWeight: 500,
                }}>
                  Official Credential
                </div>
              </div>
            </div>

            <div style={{ flex: 1, minWidth: '240px' }}>
              <div style={{ marginBottom: 12 }}>
                <h3 style={{
                  color: '#dc2626',
                  fontSize: 16,
                  fontWeight: 700,
                  margin: 0,
                  marginBottom: 2,
                }}>
                  Certificate of Completion
                </h3>
                <div style={{
                  width: 40,
                  height: 2,
                  background: '#dc2626',
                  borderRadius: 2,
                }} />
              </div>

              <div style={{ marginBottom: 16 }}>
                <p style={{ color: '#6b7280', fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
                  Awarded To
                </p>
                <h4 style={{ color: '#111827', fontSize: 18, fontWeight: 700, margin: 0 }}>
                  {cert.name || 'John Doe'}
                </h4>
              </div>

              <div style={{
                background: '#fef2f2',
                padding: '10px 14px',
                borderRadius: 10,
                marginBottom: 16,
                borderLeft: '3px solid #dc2626',
              }}>
                <p style={{ color: '#6b7280', fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>
                  Successfully completed
                </p>
                <p style={{ color: '#111827', fontSize: 13, fontWeight: 600, margin: 0, lineHeight: 1.3 }}>
                  {cert.course || 'Professional Certification Program'}
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 10,
                marginBottom: 16,
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 3 }}>
                    <Hash size={10} color="#dc2626" />
                    <span style={{ color: '#6b7280', fontSize: 8, fontWeight: 600, textTransform: 'uppercase' }}>
                      Cert ID
                    </span>
                  </div>
                  <p style={{ color: '#111827', fontSize: 10, fontWeight: 500, margin: 0, fontFamily: 'monospace' }}>
                    {cert.id || 'ADT-2024-001'}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 3 }}>
                    <Calendar size={10} color="#dc2626" />
                    <span style={{ color: '#6b7280', fontSize: 8, fontWeight: 600, textTransform: 'uppercase' }}>
                      Issue Date
                    </span>
                  </div>
                  <p style={{ color: '#111827', fontSize: 10, fontWeight: 500, margin: 0 }}>
                    {cert.date || 'Jan 15, 2024'}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 3 }}>
                    <Award size={10} color="#dc2626" />
                    <span style={{ color: '#6b7280', fontSize: 8, fontWeight: 600, textTransform: 'uppercase' }}>
                      Grade
                    </span>
                  </div>
                  <p style={{ color: '#111827', fontSize: 10, fontWeight: 500, margin: 0 }}>
                    {cert.grade || 'Distinction'}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 3 }}>
                    <Clock size={10} color="#dc2626" />
                    <span style={{ color: '#6b7280', fontSize: 8, fontWeight: 600, textTransform: 'uppercase' }}>
                      CPD Hours
                    </span>
                  </div>
                  <p style={{ color: '#111827', fontSize: 10, fontWeight: 500, margin: 0 }}>
                    {cert.hours || '80 Hrs'}
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: 8,
              }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    background: '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: 11,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 5,
                  }}
                  onClick={() => alert('Certificate download initiated (PDF)')}
                >
                  <FileCheck size={12} />
                  Download
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    background: 'white',
                    color: '#dc2626',
                    border: '1px solid #dc2626',
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: 11,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 5,
                  }}
                  onClick={() => alert('Share certificate link copied!')}
                >
                  <Share2 size={12} />
                  Share
                </motion.button>
              </div>
            </div>
          </div>

          <div style={{
            marginTop: 20,
            paddingTop: 12,
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <CheckCircle size={11} color="#22c55e" />
              <span style={{ color: '#6b7280', fontSize: 9 }}>
                Blockchain Verified
              </span>
            </div>
            <div>
              <code style={{
                fontSize: 8,
                color: '#9ca3af',
                background: '#f9fafb',
                padding: '3px 6px',
                borderRadius: 4,
              }}>
                TX: {cert.id?.slice(-8) || 'A1B2C3D4'}...{cert.id?.slice(-4) || '5678'}
              </code>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── HERO WITH 3D BACKGROUND ─────────────────────────────────────────────────

function HeroSection({ onExplore }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [0, 8]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black mt-16relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-16 sm:pt-20 mt-10">
      <motion.div className="absolute inset-0 z-0" style={{ scale: imageScale }}>
        <img src={IMGS.hero} alt="Technology Training" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </motion.div>
      
      {/* Animated tech particles */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-600 rounded-full filter blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500 rounded-full filter blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-red-400 rounded-full filter blur-[80px] animate-pulse delay-500" />
      </div>
      
      <motion.div className="relative z-10 text-center px-6 max-w-4xl mx-auto" style={{ y: heroY, opacity: heroOpacity, rotateX }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Eyebrow dark={true}>Technology Training Programs</Eyebrow>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 40, rotateX: 15 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: 0.45, duration: 0.9 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          Empower Your Future<br />
          <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">with Professional IT</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="text-gray-300 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
          Industry-aligned courses designed for students, professionals, and organizations worldwide
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
          className="flex gap-4 justify-center flex-wrap">
          <motion.button onClick={onExplore} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer shadow-lg shadow-red-900/40 flex items-center gap-2 transition-all">
            Explore Programs <ArrowRight size={18} />
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 text-white font-bold cursor-pointer flex items-center gap-2 transition-all">
            <PlayCircle size={18} /> Watch Overview
          </motion.button>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="flex justify-center gap-8 mt-16 pt-8 border-t border-red-800/30 max-w-lg mx-auto">
          {[
            { value: '12,000+', label: 'Students Trained' },
            { value: '98%', label: 'Satisfaction Rate' },
            { value: '50+', label: 'Expert Instructors' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-red-500 z-10">
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}

// ─── ENHANCED WHO ARE YOU SECTION WITH 3D CARDS ─────────────────────────────

function WhoAreYouSection({ activeTab, setActiveTab }) {
  const audiences = [
    {
      tab: 'individual', badge: 'B2C', icon: GraduationCap, img: IMGS.individual,
      title: 'Individual Students',
      desc: 'Enroll in short courses to gain foundational IT skills and a clear career support pathway.',
      cta: 'Explore Courses',
      color: '#dc2626',
      features: ['Self-paced learning', 'Industry certifications', 'Career coaching', 'Job placement'],
    },
    {
      tab: 'corporate', badge: 'B2B', icon: Building2, img: IMGS.corporate,
      title: 'Corporate Clients',
      desc: 'Customized training programs to close specific team skill gaps and drive business performance.',
      cta: 'Get Enterprise Quote',
      color: '#2563eb',
      features: ['Custom curriculum', 'Team training', 'ROI reporting', 'Dedicated support'],
    },
    {
      tab: 'government', badge: 'B2G', icon: Landmark, img: IMGS.government,
      title: 'Government & Universities',
      desc: 'Strategic partnerships for large-scale training initiatives, MoEYS accreditation, and national capability building.',
      cta: 'Request Partnership',
      color: '#7c3aed',
      features: ['MoEYS accredited', 'Large-scale rollout', 'Policy alignment', 'Research collab'],
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-4">
          <Eyebrow>Choose Your Path</Eyebrow>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Who Are <GradientText>You?</GradientText>
          </h2>
          <p className="text-gray-500 mt-4 max-w-md mx-auto">
            Select your category below to reveal programs tailored to you
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {audiences.map(({ tab, badge, title, desc, cta, icon: Icon, img, features, color }) => {
            const active = activeTab === tab;
            return (
              <TiltCard key={tab} intensity={5}>
                <HoverCard>
                  <motion.div
                    animate={{
                      scale: active ? 1.02 : 1,
                      y: active ? -8 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                    onClick={() => setActiveTab(tab)}
                    whileHover={{ scale: 1.02, y: -4 }}
                    style={{
                      borderRadius: 24,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: active ? `3px solid ${color}` : '2px solid #e5e7eb',
                      boxShadow: active 
                        ? `0 25px 50px -12px ${color}80, 0 4px 16px rgba(0,0,0,0.1)` 
                        : '0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.02)',
                      background: active ? `linear-gradient(135deg, white, ${color}08)` : 'white',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                    }}
                  >
                    <motion.div
                      animate={{ scaleX: active ? 1 : 0 }}
                      style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: 4,
                        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
                        transformOrigin: 'left', zIndex: 10,
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />

                    {!active && (
                      <div style={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        zIndex: 10,
                        background: 'rgba(0,0,0,0.7)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: 30,
                        padding: '6px 14px',
                        fontSize: 11,
                        fontWeight: 700,
                        color: 'white',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      }}>
                        <ArrowRight size={12} />
                        Click to select
                      </div>
                    )}

                    {active && (
                      <div style={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        zIndex: 10,
                        background: color,
                        borderRadius: 30,
                        padding: '6px 14px',
                        fontSize: 11,
                        fontWeight: 700,
                        color: 'white',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        boxShadow: `0 2px 12px ${color}80`,
                      }}>
                        <CheckCircle size={12} />
                        Active • {badge}
                      </div>
                    )}

                    <div className="relative h-56 overflow-hidden">
                      <motion.img
                        animate={{ scale: active ? 1.08 : 1 }}
                        transition={{ duration: 0.5 }}
                        src={img} 
                        alt={title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      
                      <div style={{
                        position: 'absolute',
                        bottom: 16,
                        left: 16,
                        width: 56,
                        height: 56,
                        borderRadius: 16,
                        background: active ? color : 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(12px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                      }}>
                        <Icon size={28} color={active ? 'white' : color} />
                      </div>
                    </div>

                    <div className="p-6">
                      <div style={{
                        display: 'inline-block',
                        background: active ? `${color}15` : '#f3f4f6',
                        color: active ? color : '#6b7280',
                        padding: '4px 12px',
                        borderRadius: 20,
                        fontSize: 11,
                        fontWeight: 700,
                        marginBottom: 12,
                        letterSpacing: '0.05em',
                      }}>
                        {badge}
                      </div>
                      
                      <h3 style={{ 
                        fontSize: 22, 
                        fontWeight: 700, 
                        color: active ? color : '#111827', 
                        marginBottom: 10, 
                        transition: 'color 0.2s' 
                      }}>
                        {title}
                      </h3>
                      
                      <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
                        {desc}
                      </p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                        {features.map(f => (
                          <span key={f} style={{
                            fontSize: 12,
                            fontWeight: 600,
                            padding: '5px 14px',
                            borderRadius: 30,
                            border: `1.5px solid ${active ? color + '40' : '#e5e7eb'}`,
                            background: active ? color + '10' : '#f9fafb',
                            color: active ? color : '#4b5563',
                            transition: 'all 0.2s',
                          }}>
                            {f}
                          </span>
                        ))}
                      </div>

                      <motion.div
                        animate={active ? { x: 0 } : { x: 0 }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: 8,
                          paddingTop: 16,
                          borderTop: `1.5px solid ${active ? color + '30' : '#e5e7eb'}`,
                        }}
                      >
                        <span style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: active ? color : '#9ca3af',
                          transition: 'color 0.2s',
                        }}>
                          {active ? `Selected: ${cta}` : cta}
                        </span>
                        <motion.div
                          animate={active ? { x: 5 } : { x: 0 }}
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 30,
                            background: active ? color : '#f3f4f6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s',
                          }}
                        >
                          <ArrowRight size={16} color={active ? 'white' : '#9ca3af'} />
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                </HoverCard>
              </TiltCard>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div style={{
            marginTop: 32,
            textAlign: 'center',
            padding: '12px 24px',
            background: '#fef2f2',
            borderRadius: 50,
            display: 'inline-block',
            width: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: audiences.find(a => a.tab === activeTab)?.color || '#dc2626',
                animation: 'pulse 1.5s ease-in-out infinite',
              }} />
              <span style={{ color: '#4b5563', fontSize: 13 }}>
                Currently viewing: <strong style={{ color: audiences.find(a => a.tab === activeTab)?.color }}>
                  {activeTab === 'individual' && 'Individual Student Programs'}
                  {activeTab === 'corporate' && 'Corporate Training Solutions'}
                  {activeTab === 'government' && 'Government & University Partnerships'}
                </strong>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>
    </section>
  );
}

// ─── ENHANCED CATEGORY FILTER - NO PARALLAX (FIXED) ─────────────────────────

function CategoryFilter({ selected, onChange }) {
  return (
    <div className="flex gap-2 flex-wrap mb-8">
      {CATEGORIES.map(cat => {
        const Icon = cat.icon;
        const active = selected === cat.id;
        return (
          <motion.button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
              active ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            <Icon size={14} />{cat.name}
          </motion.button>
        );
      })}
    </div>
  );
}

// ─── ENHANCED COURSE CARD WITH 3D EFFECT ─────────────────────────────────────

function CourseCard({ course, index, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <TiltCard intensity={4}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30, rotateX: 10 }}
        animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        className={`bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border ${isHovered ? 'border-red-300 shadow-xl shadow-red-500/10' : 'border-gray-100 shadow-md'}`}>
        <div className="flex flex-col md:flex-row">
          <div className="relative md:w-64 h-48 md:h-auto overflow-hidden">
            <motion.img
              src={course.img}
              alt={course.title}
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
            <div className="absolute top-3 left-3 px-2 py-1 rounded-lg text-white text-xs font-bold" style={{ background: course.color }}>{course.level}</div>
          </div>
          <div className="flex-1 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-1">
                <Star size={14} fill="#f59e0b" stroke="none" />
                <span className="text-sm font-semibold text-gray-900">{course.rating}</span>
              </div>
              <span className="text-gray-400 text-xs">· {course.students} students · {course.duration}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
            <p className="text-gray-500 text-sm mb-3 line-clamp-2">{course.description}</p>
            <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100">
              {/* <span className="text-xl font-bold text-gray-900">{course.price}</span> */}
              <motion.div
                animate={{ x: isHovered ? 5 : 0 }}
                className="flex items-center gap-1 text-sm font-semibold text-red-600">
                View Course <ArrowRight size={14} />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
}

// ─── CAREER BOOST SECTION WITH 3D ────────────────────────────────────────────

function CareerBoostSection({ onRegister }) {
  const benefits = [
    { title: 'Mentorship & Coaching', desc: 'Ongoing support after graduation to guide your career journey.', icon: Users },
    { title: 'Internship Opportunities', desc: 'Gain practical experience fully aligned with your training subject.', icon: Briefcase },
    { title: 'Hands-On Projects', desc: 'Work on real-world projects to build career-ready technical skills.', icon: Target },
    { title: 'Industry Case Studies', desc: 'Learn directly from technical trainers and seasoned industry experts.', icon: TrendingUp },
    { title: 'Soft Skills & Goal Setting', desc: 'Develop essential professional skills alongside technical knowledge.', icon: BookOpen },
    { title: 'Global Opportunities', desc: 'Eligible to participate in overseas partner programs and awards.', icon: Globe },
    { title: 'Official Certification', desc: 'Receive an official certificate upon successful course completion.', icon: Award },
  ];
  
  // Duplicate benefits for seamless looping
  const loopingBenefits = [...benefits, ...benefits, ...benefits];
  
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-12">
          <Eyebrow>Career Support</Eyebrow>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Your Career <GradientText>Boost</GradientText></h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">A complete ecosystem of support to accelerate your professional journey.</p>
        </Reveal>
        
        {/* Horizontal Looping Carousel */}
        <div className="relative overflow-hidden py-8">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: "linear",
              repeatType: "loop"
            }}
            className="flex gap-6 w-max"
            style={{ willChange: "transform" }}
          >
            {loopingBenefits.map((benefit, idx) => (
              <div
                key={`${benefit.title}-${idx}`}
                className="w-72 h-80 flex-shrink-0"
              >
                <TiltCard intensity={3} className="h-full">
                  <HoverCard className="p-6 h-full flex flex-col">
                    <div className="flex flex-col items-center text-center h-full">
                      <div className="w-16 h-16 rounded-xl bg-red-100 flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors">
                        <benefit.icon size={28} className="text-red-600 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-3 text-lg">{benefit.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed flex-1">{benefit.desc}</p>
                      <div className="mt-4 w-12 h-0.5 bg-red-200 rounded-full" />
                    </div>
                  </HoverCard>
                </TiltCard>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Gradient fade effects on sides */}
        <div className="relative -mt-8">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10" />
        </div>
        
        <Reveal className="flex gap-4 justify-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRegister}
            className="px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold cursor-pointer shadow-lg shadow-red-500/30 transition-all"
          >
            Register for New Course <ArrowRight size={16} className="inline ml-1" />
          </motion.button>
        </Reveal>
      </div>
    </section>
  );
}

// ─── INDUSTRY PROGRAMS SECTION ───────────────────────────────────────────────
// ─── INDUSTRY PROGRAMS SECTION ───────────────────────────────────────────────

// ─── INDUSTRY PROGRAMS SECTION ───────────────────────────────────────────────

function IndustryProgramsSection() {
  const programs = [
    { 
      id: 'ai-marketing',
      title: 'AI for Digital Marketing', 
      subtitle: '2 Days | Hands-on Workshop', 
      duration: '2 days',
      features: ['Google Gemini', 'Viral Content', 'CapCut Editing', 'Social Media AI'],
      description: 'Use AI as a "smart friend" to grow your business with Google Gemini and CapCut video editing.',
      fullDesc: 'The goal of this 2-day, hands-on workshop is to show business owners and staff how AI can act as a "smart friend" to grow their business.',
      objectives: [
        'Learn to use AI as a Business Partner: Set up and use Google Gemini to help with business growth',
        'Create Content Faster: Use AI to quickly come up with viral ideas and marketing concepts',
        'Write Better Scripts: Learn how to write 30-second video scripts with a clear start, middle, and end',
        'Master Easy Video Editing: Use CapCut to turn scripts into professional videos with music and voiceovers',
        'Boost Social Media Results: Improve marketing on Facebook and TikTok using AI-generated captions and hashtags'
      ],
      outcomes: [
        'Produce Professional Videos: Create high-quality marketing videos with captions',
        'Adopt New Digital Tools: Successfully use at least three different AI tools',
        'Think Like a Creator: Understand what makes people stop scrolling',
        'Work Efficiently: Use the "learn-apply-produce" method',
        'Launch Content: Be ready to post finished videos directly'
      ],
      suitableFor: 'Business owners, marketing professionals, content creators',
      tools: ['Google Gemini', 'CapCut', 'ChatGPT', 'Canva'],
      img: IMGS.career, 
      icon: TrendingUp,
      color: '#dc2626',
      participants: '150+'
    },
    { 
      id: 'ai-design',
      title: 'AI for Creative & Design', 
      subtitle: '2 Days | Hands-on Workshop', 
      duration: '2 days',
      features: ['Adobe Firefly', 'Branding Kit', 'Canva Magic', 'Generative Fill'],
      description: 'Design professional branding materials without expert design skills using Adobe Firefly.',
      fullDesc: 'The goal of this 16-hour, hands-on training is to help business owners and creators use AI tools to design professional branding materials without needing expert design skills.',
      objectives: [
        'Master Generative Design: Learn how to use Adobe Firefly',
        'Speed Up Creative Work: Use AI tools to automate repetitive tasks',
        'Develop Professional Branding: Create consistent visual branding kit',
        'Enhance Visual Storytelling: Use AI to create unique text effects'
      ],
      outcomes: [
        'Create Custom Brand Assets: Generate unique Hero Images',
        'Design Social Media Suites: Professional layouts for Instagram',
        'Edit Images with AI: Use Generative Fill',
        'Ensure Brand Consistency: Convert designs to multiple formats',
        'Produce a Ready-to-Use Portfolio'
      ],
      suitableFor: 'Graphic designers, brand managers, small business owners',
      tools: ['Adobe Firefly', 'Canva Magic Studio', 'Midjourney', 'Photoshop AI'],
      img: IMGS.internship, 
      icon: Palette,
      color: '#8b5cf6',
      participants: '120+'
    },
    { 
      id: 'ai-operations',
      title: 'AI for Operation & Admin', 
      subtitle: '2 Days | Hands-on Workshop', 
      duration: '2 days',
      features: ['ChatGPT', 'Otter.ai', 'Notion AI', 'SOP Creation'],
      description: 'Handle daily tasks faster and more accurately with ChatGPT and Otter.ai.',
      fullDesc: 'The goal of this 16-hour, hands-on training is to show business owners and office staff how to use AI to handle daily tasks faster and more accurately.',
      objectives: [
        'Modernize Communication: Use ChatGPT for professional emails',
        'Automate Meeting Management: Use Otter.ai to record meetings',
        'Streamline Workflows: Organize projects with Notion AI',
        'Standardize Processes: Create clear SOPs',
        'Improve Efficiency: Reduce administrative workload'
      ],
      outcomes: [
        'Use a Digital Assistant: Set up ChatGPT and Otter.ai',
        'Create Structured Records: Turn transcripts into summaries',
        'Build an Operational Dashboard: Central workspace in Notion',
        'Produce Professional Documentation: Formal SOP manuals',
        'Adopt New Tools: Integrate AI tools into daily work'
      ],
      suitableFor: 'Office administrators, operations managers, executive assistants',
      tools: ['ChatGPT', 'Otter.ai', 'Notion AI', 'Zapier'],
      img: IMGS.global, 
      icon: Database,
      color: '#06b6d4',
      participants: '200+'
    },
    { 
      id: 'cybersecurity',
      title: 'Digital Literacy & Cybersecurity', 
      subtitle: '2 Days | Awareness Course', 
      duration: '2 days',
      features: ['Fake News Detection', 'Phishing Prevention', 'Secure Collaboration', 'Incident Response'],
      description: 'Navigate the digital world safely and professionally with essential cybersecurity skills.',
      fullDesc: 'The primary goal of this course is to equip non-technical professionals with fundamental skills needed to navigate the digital world safely.',
      objectives: [
        'Enhance Information Literacy: Evaluate website credibility',
        'Promote Secure Collaboration: Safe use of cloud tools',
        'Strengthen Cyber Defense: Recognize phishing and malware',
        'Foster Incident Response: Respond to cybersecurity incidents'
      ],
      outcomes: [
        'Evaluate credibility of online information',
        'Identify misinformation and fake news',
        'Use digital communication tools safely',
        'Recognize common cybersecurity threats',
        'Apply essential cybersecurity practices',
        'Protect financial information during transactions',
        'Practice safe browsing habits'
      ],
      suitableFor: 'All staff members, non-technical professionals',
      tools: ['Google Drive', 'Microsoft Teams', 'Password Managers', '2FA Apps'],
      img: IMGS.security, 
      icon: Shield,
      color: '#ef4444',
      participants: '300+'
    },
    { 
      id: 'sales-kaizen',
      title: 'Sales & Kaizen (Soft Skill)', 
      subtitle: '2 Days | Professional Development', 
      duration: '2 days',
      features: ['Sales Process', 'Kaizen Philosophy', '5S Principles', 'PDCA Problem Solving'],
      description: 'Integrate high-performance sales techniques with Japanese continuous improvement philosophy.',
      fullDesc: 'The primary objective is to integrate high-performance sales techniques with Japanese continuous improvement philosophy.',
      objectives: [
        'Standardize Sales Process: Structured workflow from prospecting',
        'Instill Continuous Improvement: Kaizen philosophy mindset',
        'Enhance Operational Efficiency: Identify inefficiencies with 5S',
        'Develop Problem-Solving: Use PDCA and Fishbone Diagrams',
        'Build Customer Loyalty: Persuasive communication'
      ],
      outcomes: [
        'Execute Strategic Sales: Qualify prospects effectively',
        'Improve Revenue Performance: Apply effective closing techniques',
        'Optimize Workplace Organization: Apply 5S concepts',
        'Utilize Analytical Tools: Use PDCA and root cause analysis',
        'Strengthen Professionalism: Build trust-based relationships'
      ],
      suitableFor: 'Sales professionals, team leaders, business owners',
      tools: ['PDCA Framework', '5S Methodology', 'Fishbone Diagram', '5 Why Analysis'],
      img: IMGS.training, 
      icon: ShoppingCart,
      color: '#f59e0b',
      participants: '180+'
    },
  ];
  
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showRegForm, setShowRegForm] = useState(false);
  const [regSubmitted, setRegSubmitted] = useState(false);
  const [regError, setRegError] = useState('');
  const [applicationId, setApplicationId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    programTitle: ''
  });

  // This opens the DETAILS modal first
  const handleProgramClick = (program) => {
    setSelectedProgram(program);
  };

  // This opens the REGISTRATION modal (called from inside details modal)
  const handleRegisterClick = (program) => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      organization: '',
      programTitle: program.title
    });
    setShowRegForm(true);
    setRegSubmitted(false);
    setRegError('');
  };

  const handleRegChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (regError) setRegError('');
  };

  const handleRegSubmit = async () => {
    if (!formData.name.trim()) {
      setRegError('Please enter your full name');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setRegError('Please enter a valid email address');
      return;
    }
    if (!formData.phone.trim()) {
      setRegError('Please enter your phone number');
      return;
    }

    setRegError('');
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const newAppId = Math.random().toString(36).substring(2, 10).toUpperCase();
      setApplicationId(newAppId);
      setRegSubmitted(true);
    } catch (error) {
      setRegError('There was an error submitting your registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-12">
          <Eyebrow>Professional Workshops</Eyebrow>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Industry <GradientText>Programs</GradientText>
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            2-day intensive hands-on training programs designed for business growth
          </p>
        </Reveal>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((prog, i) => (
            <Reveal key={prog.title} delay={i * 0.1}>
              <TiltCard intensity={5}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  // FIXED: This opens DETAILS modal, NOT registration directly
                  onClick={() => handleProgramClick(prog)}
                  className="bg-white rounded-2xl overflow-hidden cursor-pointer group"
                  style={{
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {/* Image Section with Overlay */}
                  <div className="relative h-52 overflow-hidden">
                    <motion.img
                      src={prog.img}
                      alt={prog.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Duration Badge */}
                    <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {prog.duration}
                    </div>
                    
                    {/* Icon */}
                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center">
                      <prog.icon size={22} className="text-red-600" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5">
                    <div className="mb-2">
                      <span className="text-xs text-red-600 font-semibold uppercase tracking-wide">
                        {prog.subtitle}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mt-1 group-hover:text-red-600 transition-colors">
                        {prog.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {prog.description}
                    </p>
                    
                    {/* Features Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {prog.features.slice(0, 3).map(f => (
                        <span key={f} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                          {f}
                        </span>
                      ))}
                      {prog.features.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                          +{prog.features.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    {/* CTA Button */}
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center justify-between pt-3 border-t border-gray-100"
                    >
                      <span className="text-sm font-semibold text-red-600 flex items-center gap-1">
                        View Details
                        <ArrowRight size={14} />
                      </span>
                      <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                        <ExternalLink size={14} className="text-red-600 group-hover:text-white transition-colors" />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* PROGRAM DETAIL MODAL - Shows ALL course details first */}
      {/* PROGRAM DETAIL MODAL - WITH IMAGE */}
<AnimatePresence>
  {selectedProgram && (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-5 bg-black/80 backdrop-blur-md"
      onClick={() => setSelectedProgram(null)}>
      <motion.div 
        initial={{ scale: 0.8, y: 50, rotateX: 25, opacity: 0 }} 
        animate={{ scale: 1, y: 0, rotateX: 0, opacity: 1 }} 
        exit={{ scale: 0.8, y: 50, rotateX: 25, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={e => e.stopPropagation()} 
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl relative shadow-2xl"
      >
        {/* Hero Section WITH IMAGE */}
        <div className="relative h-80 overflow-hidden rounded-t-3xl">
          {/* Background Image */}
          <motion.img
            src={selectedProgram.img}
            alt={selectedProgram.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
          
          {/* Floating badges */}
          <div className="absolute top-6 left-6 flex gap-3 z-10">
            <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-semibold">
              {selectedProgram.duration}
            </span>
            <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-semibold">
              Hands-on Workshop
            </span>
          </div>
          
          {/* Close button */}
          <button 
            onClick={() => setSelectedProgram(null)} 
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-all z-10"
          >
            <X size={18} className="text-white" />
          </button>
          
          {/* Title overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <selectedProgram.icon size={24} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">{selectedProgram.title}</h2>
            </div>
            <div className="flex items-center gap-4 text-white/90 text-sm">
              <span className="flex items-center gap-1"><Clock size={14} /> {selectedProgram.duration}</span>
              <span className="flex items-center gap-1"><Users size={14} /> {selectedProgram.participants || '100+'} participants trained</span>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <div className="w-1 h-6 bg-red-600 rounded-full" />
              Program Overview
            </h3>
            <p className="text-gray-600 leading-relaxed bg-gray-50 p-5 rounded-2xl">
              {selectedProgram.fullDesc || selectedProgram.description}
            </p>
          </div>
          
          {/* What You'll Learn - Features */}
          {selectedProgram.features && selectedProgram.features.length > 0 && (
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                <Target size={20} className="text-red-600" />
                What You'll Learn
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {selectedProgram.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <CheckCircle size={16} className="text-red-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Learning Objectives */}
          {selectedProgram.objectives && selectedProgram.objectives.length > 0 && (
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                <Target size={20} className="text-red-600" />
                Learning Objectives
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {selectedProgram.objectives.map((obj, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <CheckCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{obj}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Key Outcomes */}
          {selectedProgram.outcomes && selectedProgram.outcomes.length > 0 && (
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                <Award size={20} className="text-red-600" />
                Key Outcomes
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {selectedProgram.outcomes.map((out, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gradient-to-r from-red-50 to-white rounded-xl border border-red-100">
                    <Sparkles size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{out}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Tools & Technologies */}
          {selectedProgram.tools && selectedProgram.tools.length > 0 && (
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                <Cpu size={20} className="text-red-600" />
                Tools & Technologies Covered
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedProgram.tools.map((tool, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-sm font-medium border border-red-200">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Target Audience */}
          {selectedProgram.suitableFor && (
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-lg">
                <Users size={20} className="text-red-600" />
                Target Audience
              </h3>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100">
                <p className="text-gray-700 leading-relaxed">{selectedProgram.suitableFor}</p>
              </div>
            </div>
          )}
          
          {/* Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <Clock size={20} className="text-red-600 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Duration</p>
              <p className="font-semibold text-gray-900">{selectedProgram.duration}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <Users size={20} className="text-red-600 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Participants</p>
              <p className="font-semibold text-gray-900">{selectedProgram.participants || '100+'}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <Award size={20} className="text-red-600 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Certification</p>
              <p className="font-semibold text-gray-900">Certificate</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <Calendar size={20} className="text-red-600 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Format</p>
              <p className="font-semibold text-gray-900">In-Person</p>
            </div>
          </div>
          
          {/* Registration CTA */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-red-700 p-8 shadow-xl"
          >
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-2xl font-bold text-white mb-2">Ready to Enroll?</h4>
                <p className="text-red-100">Register now to secure your spot in this workshop</p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRegisterClick(selectedProgram)}
                className="px-8 py-3 rounded-xl bg-white text-red-600 font-bold cursor-pointer shadow-lg hover:shadow-2xl transition-all flex items-center gap-2 group"
              >
                Register Now 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      {/* Registration Modal */}
      <AnimatePresence>
        {showRegForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-5 bg-black/80 backdrop-blur-md"
            onClick={() => { setShowRegForm(false); setRegSubmitted(false); }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 24, rotateX: 15 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.9, y: 24, rotateX: 15 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 bg-gradient-to-r from-red-50 to-white border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {regSubmitted ? 'Registration Submitted!' : `Register for Workshop`}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {regSubmitted ? "We'll be in touch soon" : selectedProgram?.title}
                  </p>
                </div>
                <button onClick={() => { setShowRegForm(false); setRegSubmitted(false); }} className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                  <X size={16} className="text-gray-500" />
                </button>
              </div>
              
              <div className="p-6">
                {regSubmitted ? (
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, delay: 0.1 }} className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle size={42} className="text-red-600" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Submitted!</h3>
                    <p className="text-gray-600 mb-2">Thank you, <strong>{formData.name}</strong>!</p>
                    <p className="text-sm text-gray-500 mb-5">We've sent a confirmation to <strong>{formData.email}</strong>. Our team will contact you within 2 business days.</p>
                    <div className="bg-red-50 rounded-xl p-4 mb-5">
                      <p className="text-xs text-red-600 font-mono mb-1">Application ID: <strong>{applicationId}</strong></p>
                    </div>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setShowRegForm(false); setRegSubmitted(false); }} className="w-full py-3 rounded-xl bg-red-600 text-white font-semibold cursor-pointer">
                      Close
                    </motion.button>
                  </motion.div>
                ) : (
                  <>
                    <div className="flex flex-col gap-4">
                      <input type="text" name="name" placeholder="Full Name *" value={formData.name} onChange={handleRegChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:outline-none" />
                      <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleRegChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:outline-none" />
                      <input type="tel" name="phone" placeholder="Phone Number *" value={formData.phone} onChange={handleRegChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:outline-none" />
                      <input type="text" name="organization" placeholder="Company / Organization" value={formData.organization} onChange={handleRegChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:outline-none" />
                    </div>
                    {regError && <p className="text-red-500 text-sm mt-3">{regError}</p>}
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={isSubmitting} onClick={handleRegSubmit} className={`w-full mt-6 py-3 rounded-xl bg-red-600 text-white font-semibold cursor-pointer shadow-lg transition-all ${isSubmitting ? 'opacity-70' : 'hover:bg-red-700'}`}>
                      {isSubmitting ? <div className="flex items-center justify-center gap-2"><Loader2 size={18} className="animate-spin" /> Submitting...</div> : 'Complete Registration →'}
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── TECHNOLOGY SHOWCASE SECTION - NO MOVEMENT ────────────────────────────────

// function TechnologyShowcase() {
//   const techImages = [
//     { 
//       src: IMGS.aiTech, 
//       title: 'Artificial Intelligence & Data Science', 
//       description: 'AI Engineering, Data Science, and Machine Learning programs', 
//       icon: Brain,
//       courses: ['AI Engineer', 'Intensive Data Science', 'Data Analysis with Power BI']
//     },
//     { 
//       src: IMGS.mobile, 
//       title: 'Mobile & Web Development', 
//       description: 'iOS development, Full-Stack, and Web application development', 
//       icon: Cpu,
//       courses: ['Advanced iOS App Development', 'Full-Stack Development', 'Web Application Development']
//     },
//     { 
//       src: IMGS.springboot, 
//       title: 'Enterprise & Database Solutions', 
//       description: 'Java Spring Boot, Oracle Database, and backend systems', 
//       icon: Database,
//       courses: ['Java Spring Boot', 'Oracle Database 19c']
//     },
//     { 
//       src: IMGS.security, 
//       title: 'Cybersecurity & Digital Literacy', 
//       description: 'Security awareness and digital literacy training', 
//       icon: Shield,
//       courses: ['Digital Literacy & Cybersecurity']
//     },
//     { 
//       src: IMGS.uxui, 
//       title: 'UX/UI Design & Project Management', 
//       description: 'User-centered design and professional project management', 
//       icon: Palette,
//       courses: ['UX/UI Design', 'Project Management Professional (PMP)']
//     },
//   ];

//   return (
//     <section className="py-24 bg-gray-50 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6 lg:px-10">
//         <Reveal className="text-center mb-16">
//           <Eyebrow>Our Program Focus</Eyebrow>
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
//             Course <GradientText>Categories</GradientText>
//           </h2>
//           <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
//             Comprehensive training programs covering modern technologies and professional skills
//           </p>
//         </Reveal>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {techImages.map((tech, index) => (
//             <Reveal key={tech.title} delay={index * 0.15}>
//               <TiltCard intensity={5}>
//                 <HoverCard className="overflow-hidden h-full">
//                   <div className="relative h-48 overflow-hidden">
//                     <img src={tech.src} alt={tech.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
//                     <div className="absolute bottom-0 left-0 right-0 p-5">
//                       <div className="flex items-center gap-2 mb-1">
//                         <tech.icon size={20} className="text-red-400" />
//                         <h3 className="text-xl font-bold text-white">{tech.title}</h3>
//                       </div>
//                       <p className="text-gray-200 text-sm">{tech.description}</p>
//                     </div>
//                   </div>
//                   <div className="p-4 bg-white">
//                     <div className="flex flex-wrap gap-2">
//                       {tech.courses.slice(0, 3).map((course, idx) => (
//                         <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
//                           {course}
//                         </span>
//                       ))}
//                       {tech.courses.length > 3 && (
//                         <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
//                           +{tech.courses.length - 3} more
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </HoverCard>
//               </TiltCard>
//             </Reveal>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
// ─── ENHANCED CORPORATE SECTION WITH 3D ──────────────────────────────────────
function CorporateSection({ onQuote, onServiceSelect }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]  // ← KEY CHANGE: tracks during section view
  });
  
  // Parallax: image moves as you scroll THROUGH the section
  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.1, 1.05]);
  const contentY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 0.85, 0.95]);
  
  const stats = [
    { value: 98, suffix: '%', label: 'Client Satisfaction', icon: ThumbsUp },
    { value: 500, suffix: '+', label: 'Corporate Clients', icon: Building2 },
    { value: 45, suffix: 'min', label: 'Average Response', icon: Clock },
    { value: 100, suffix: '%', label: 'Customizable', icon: Target },
  ];
  
  const services = [
    { id: 'ondemand', title: 'On-Demand Training', desc: 'Self-paced programs with structured content. Access anytime for continuous upskilling.', icon: Cpu, duration: '24/7 Access', students: '10,000+' },
    { id: 'live', title: 'Live Training / Short Courses', desc: 'Instructor-led sessions with practical focus and immediate application.', icon: Users, duration: '2-12 weeks', students: '5,000+' },
    { id: 'group', title: 'Group Training', desc: 'Customized programs for entire teams, tailored to specific organizational objectives.', icon: Target, duration: 'Custom', students: '500+ Teams' },
    { id: 'elearning', title: 'Digital E-Learning', desc: 'Structured digital solution combining video, assessments, and materials for remote training.', icon: Globe, duration: 'Self-paced', students: '25,000+' },
  ];
  
  const testimonials = [
    { quote: 'ADITI Academy transformed our IT department\'s capabilities. The custom training program was exactly what we needed.', author: 'Michael Chen', role: 'CTO, TechCorp', rating: 5 },
    { quote: 'The ROI from their training program was immediate. Our team\'s productivity increased by 40% within 3 months.', author: 'Sarah Johnson', role: 'HR Director, Global Solutions', rating: 5 },
  ];
  const partners = ['Google', 'Microsoft', 'AWS', 'Cisco', 'IBM', 'Deloitte'];
  
  return (
    <div>
      {/* HERO SECTION WITH PARALLAX THAT TRIGGERS DURING SCROLL */}
      <section 
        ref={sectionRef} 
        className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden"
      >
        {/* Parallax Background Image - moves as you scroll within section */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ 
            y: imageY,
            scale: imageScale,
          }}
        >
          <img 
            src={IMGS.corporateHero} 
            alt="Corporate Training" 
            className="w-full h-full object-cover will-change-transform"
            style={{ objectPosition: "center 30%" }}
          />
        </motion.div>
        
        {/* Gradient Overlay with subtle opacity change */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40 z-10"
          style={{ opacity: overlayOpacity }}
        />
        
        {/* Additional overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
        
        {/* Content with slight parallax (moves opposite direction) */}
        <motion.div 
          className="relative z-20 max-w-7xl mx-auto px-6 lg:px-10 text-white w-full"
          style={{ y: contentY }}
        >
          <Reveal>
            <Eyebrow dark={true}>B2B Solutions</Eyebrow>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Enterprise Training<br />
              <span className="text-red-500">Solutions</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mb-8 leading-relaxed">
              Empower your workforce with customized IT training programs designed to close skill gaps and drive business growth.
            </p>
            <div className="flex gap-4 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onQuote}
                className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition-all shadow-lg shadow-red-900/30 cursor-pointer"
              >
                Request Enterprise Quote
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white/10 backdrop-blur border border-white/30 hover:bg-white/20 rounded-xl font-semibold transition-all cursor-pointer"
              >
                <Phone size={16} className="inline mr-2" /> Schedule Call
              </motion.button>
            </div>
          </Reveal>
        </motion.div>
        
        {/* Scroll hint indicator */}
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/60"
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>
      
      {/* Rest of your sections remain the same */}
      <section className="py-16 bg-white border-b relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1} className="text-center">
                <TiltCard intensity={3}>
                  <div className="p-4">
                    <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mx-auto mb-3">
                      <stat.icon size={24} className="text-red-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-12">
            <Eyebrow>Training Solutions</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">What We <GradientText>Provide</GradientText></h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">Click on any service to request a customized quote</p>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <ParallaxScroll key={service.title} direction={i % 2 === 0 ? 'up' : 'down'}>
                  <Reveal delay={i * 0.1}>
                    <TiltCard intensity={5}>
                      <motion.div
                        whileHover={{ y: -4 }}
                        onClick={() => onServiceSelect?.(service.id)}
                        className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl hover:border-red-300 transition-all cursor-pointer group h-full"
                      >
                        <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors">
                          <Icon size={24} className="text-red-600 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                        <p className="text-gray-500 text-sm mb-4">{service.desc}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <span className="text-xs text-gray-400">⏱ {service.duration}</span>
                          <span className="text-xs text-red-600 group-hover:text-red-700 font-medium flex items-center gap-1">
                            Get Quote <ArrowRight size={12} />
                          </span>
                        </div>
                      </motion.div>
                    </TiltCard>
                  </Reveal>
                </ParallaxScroll>
              );
            })}
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-12">
            <Eyebrow>Success Stories</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Trusted by <GradientText>Industry Leaders</GradientText></h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {testimonials.map((t, i) => (
              <Reveal key={t.author} delay={i * 0.15}>
                <TiltCard intensity={3}>
                  <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                    <div className="flex gap-1 mb-4">
                      {[...Array(t.rating)].map((_, j) => <Star key={j} size={16} fill="#f59e0b" stroke="none" />)}
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">"{t.quote}"</p>
                    <div>
                      <p className="font-bold text-gray-900">{t.author}</p>
                      <p className="text-sm text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
          {/* <div className="text-center">
            <p className="text-sm text-gray-400 uppercase tracking-wide mb-6">Trusted Partners</p>
            <div className="flex flex-wrap justify-center gap-8 opacity-70">
              {partners.map(p => <span key={p} className="text-gray-500 font-semibold text-lg">{p}</span>)}
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
}

// =============================================================================
// REDESIGNED GOVERNMENT & UNIVERSITY PARTNERSHIPS SECTION
// Modern, professional, with detailed clickable program cards & registration
// =============================================================================


// Complete GovernmentSection component - FIXED VERSION

function GovernmentSection({ onPartner }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.1, 1.05]);
  const contentY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 0.85, 0.95]);

  const stats = [
    { value: 25, suffix: '+', label: 'Government Partners', icon: Landmark },
    { value: 15, suffix: 'K+', label: 'Civil Servants Trained', icon: Users },
    { value: 12, suffix: '+', label: 'Universities', icon: School },
    { value: 100, suffix: '%', label: 'MoEYS Aligned', icon: Award },
  ];

  // YOUR GOVERNMENT PROGRAMS DATA
  const governmentPrograms = [
    { 
      id: 'ai-marketing',
      title: 'AI for Digital Marketing', 
      desc: 'Use AI as a "smart friend" to grow your business with Google Gemini and CapCut', 
      duration: '2 days', 
      participants: '150+', 
      icon: TrendingUp,
      color: '#dc2626',
      fullDesc: 'The goal of this 2-day, hands-on workshop is to show business owners and staff how AI can act as a "smart friend" to grow their business.',
      objectives: [
        'Learn to use AI as a Business Partner: Set up and use Google Gemini to help with business growth',
        'Create Content Faster: Use AI to quickly come up with viral ideas and marketing concepts',
        'Write Better Scripts: Learn how to write 30-second video scripts with a clear start, middle, and end',
        'Master Easy Video Editing: Use CapCut to turn scripts into professional videos with music and voiceovers',
        'Boost Social Media Results: Improve marketing on Facebook and TikTok using AI-generated captions and hashtags'
      ],
      outcomes: [
        'Produce Professional Videos: Create high-quality marketing videos with captions that people can watch even without sound',
        'Adopt New Digital Tools: Successfully use at least three different AI tools in their daily business work',
        'Think Like a Creator: Understand what makes people stop scrolling and engage with a post',
        'Work Efficiently: Use the "learn-apply-produce" method to create real marketing materials during the class',
        'Launch Content: Be ready to post finished videos directly to Facebook, TikTok, or WhatsApp'
      ],
      suitableFor: 'Business owners, marketing professionals, content creators, social media managers',
      tools: ['Google Gemini', 'CapCut', 'ChatGPT', 'Canva']
    },
    { 
      id: 'ai-design',
      title: 'AI for Creative and Design', 
      desc: 'Use AI tools to design professional branding materials without expert design skills', 
      duration: '2 days', 
      participants: '120+', 
      icon: Palette,
      color: '#8b5cf6',
      fullDesc: 'The goal of this 16-hour, hands-on training is to help business owners and creators use AI tools to design professional branding materials without needing expert design skills.',
      objectives: [
        'Master Generative Design: Learn how to use Adobe Firefly to turn text descriptions into high-quality brand images and mood boards',
        'Speed Up Creative Work: Use AI tools to automate repetitive tasks like changing image backgrounds or resizing posts',
        'Develop Professional Branding: Create a consistent visual branding kit that includes logos, social media posts, and banners',
        'Enhance Visual Storytelling: Use AI to create unique text effects and catchy headlines that make a brand stand out'
      ],
      outcomes: [
        'Create Custom Brand Assets: Generate unique Hero Images and 3D lettering using Adobe Firefly',
        'Design Social Media Suites: Produce professional layouts for Instagram, Facebook, and Stories using Canva Magic Studio',
        'Edit Images with AI: Use Generative Fill to add or remove objects from images easily',
        'Ensure Brand Consistency: Instantly convert a single design into multiple formats while keeping a professional look',
        'Produce a Ready-to-Use Portfolio: Walk away with a library of AI-generated images and a complete set of marketing materials'
      ],
      suitableFor: 'Graphic designers, brand managers, small business owners, content creators',
      tools: ['Adobe Firefly', 'Canva Magic Studio', 'Midjourney', 'Photoshop AI']
    },
    { 
      id: 'ai-operations',
      title: 'AI for Operation and Administrative', 
      desc: 'Use AI to handle daily tasks faster and more accurately with ChatGPT and Otter.ai', 
      duration: '2 days', 
      participants: '200+', 
      icon: Database,
      color: '#06b6d4',
      fullDesc: 'The goal of this 16-hour, hands-on training is to show business owners and office staff how to use AI to handle daily tasks faster and more accurately.',
      objectives: [
        'Modernize Communication: Learn to use ChatGPT to write professional, empathetic, and effective business emails and messages',
        'Automate Meeting Management: Use Otter.ai to record and transcribe meetings so no details are missed',
        'Streamline Workflows: Teach participants to organize projects and tasks using Notion with AI support',
        'Standardize Processes: Help businesses create clear Standard Operating Procedures (SOPs)',
        'Improve Efficiency: Reduce the manual administrative workload to save time in daily operations'
      ],
      outcomes: [
        'Use a Digital Assistant: Successfully set up and use ChatGPT and Otter.ai on both mobile and desktop',
        'Create Structured Records: Turn raw meeting transcripts into professional summaries with key decisions and action items',
        'Build an Operational Dashboard: Create a central workspace in Notion to track projects, timelines, and business growth plans',
        'Produce Professional Documentation: Turn rough notes into formal SOP manuals that any employee can follow',
        'Adopt New Tools: Successfully integrate at least three specific AI tools into their daily work'
      ],
      suitableFor: 'Office administrators, operations managers, executive assistants, business owners',
      tools: ['ChatGPT', 'Otter.ai', 'Notion AI', 'Zapier']
    },
    { 
      id: 'cybersecurity',
      title: 'Digital Literacy and Cybersecurity Awareness', 
      desc: 'Navigate the digital world safely and professionally', 
      duration: '2 days', 
      participants: '300+', 
      icon: Shield,
      color: '#ef4444',
      fullDesc: 'The primary goal of this course is to equip non-technical professionals and small business staff with the fundamental skills needed to navigate the digital world safely and professionally.',
      objectives: [
        'Enhance Information Literacy: Teach participants how to evaluate website credibility and identify misinformation or fake news',
        'Promote Secure Collaboration: Enable the safe use of professional communication and cloud-based collaboration tools',
        'Strengthen Cyber Defense: Provide the knowledge to recognize and mitigate common threats such as phishing, malware, and ransomware',
        'Foster Incident Response: Train individuals on how to respond correctly to basic cybersecurity incidents'
      ],
      outcomes: [
        'Understand key digital literacy concepts and evaluate credibility of online information',
        'Identify misinformation and fake news before sharing information',
        'Use digital communication and collaboration tools safely',
        'Recognize common cybersecurity threats including phishing, malware, ransomware, and social engineering',
        'Apply essential cybersecurity practices including strong passwords and multi-factor authentication',
        'Protect personal and organizational financial information during online transactions',
        'Practice safe browsing and remote work security habits',
        'Respond appropriately to basic cybersecurity incidents'
      ],
      suitableFor: 'All staff members, non-technical professionals, small business teams',
      tools: ['Google Drive', 'Microsoft Teams', 'Password Managers', '2FA Apps']
    },
    { 
      id: 'sales-kaizen',
      title: 'Sales and Kaizen (Soft Skill)', 
      desc: 'Integrate high-performance sales with Japanese continuous improvement philosophy', 
      duration: '2 days', 
      participants: '180+', 
      icon: ShoppingCart,
      color: '#f59e0b',
      fullDesc: 'The primary objective of this 16-hour physical training program is to integrate high-performance sales techniques with the Japanese philosophy of continuous improvement (Kaizen) to drive organizational growth.',
      objectives: [
        'Standardize the Sales Process: Establish a structured and effective sales workflow, from prospecting to after-sales service',
        'Instill a Continuous Improvement Mindset: Introduce Kaizen philosophy to encourage small, consistent improvements',
        'Enhance Operational Efficiency: Teach participants how to identify inefficiencies and reduce operational waste using 5S principles',
        'Develop Problem-Solving Skills: Equip staff with practical tools such as PDCA, 5 Why Analysis, and Fishbone Diagrams',
        'Build Customer Loyalty: Focus on persuasive communication, objection handling, and long-term relationship building'
      ],
      outcomes: [
        'Execute Strategic Sales: Qualify high-potential prospects and deliver structured, persuasive presentations',
        'Improve Revenue Performance: Identify root causes of sales challenges and apply effective closing techniques',
        'Optimize Workplace Organization: Apply 5S concepts and Kaizen processes to improve productivity',
        'Utilize Analytical Tools: Independently use the PDCA cycle and root cause analysis tools',
        'Strengthen Professionalism: Provide consistent after-sales support and build trust-based relationships'
      ],
      suitableFor: 'Sales professionals, team leaders, business owners, customer service staff',
      tools: ['PDCA Framework', '5S Methodology', 'Fishbone Diagram', '5 Why Analysis']
    },
  ];

  const universityPrograms = [
    { title: 'Curriculum Integration', desc: 'Integrate our certified courses into your university programs', icon: BookOpen },
    { title: 'Faculty Development', desc: 'Train your faculty members on the latest technologies', icon: Users },
    { title: 'Student Certification', desc: 'Provide industry-recognized certifications to your students', icon: Award },
    { title: 'Research Collaboration', desc: 'Partner on technology research and innovation projects', icon: Target },
  ];

  // State declarations
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showRegForm, setShowRegForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [regError, setRegError] = useState('');
  const [applicationId, setApplicationId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    programId: '',
    programTitle: ''
  });

  const handleRegisterClick = (program) => {
    setSelectedProgram(program);
    setFormData({
      name: '',
      email: '',
      phone: '',
      organization: '',
      programId: program.id,
      programTitle: program.title
    });
    setShowRegForm(true);
    setSubmitted(false);
    setRegError('');
  };

  const handleRegChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (regError) setRegError('');
  };

  const handleRegSubmit = async () => {
    if (!formData.name.trim()) {
      setRegError('Please enter your full name');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setRegError('Please enter a valid email address');
      return;
    }
    if (!formData.phone.trim()) {
      setRegError('Please enter your phone number');
      return;
    }
    if (!formData.organization.trim()) {
      setRegError('Please enter your organization name');
      return;
    }

    setRegError('');
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const newAppId = Math.random().toString(36).substring(2, 10).toUpperCase();
      setApplicationId(newAppId);
      setSubmitted(true);
    } catch (error) {
      setRegError('There was an error submitting your registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* HERO SECTION */}
      <section ref={sectionRef} className="relative h-[70vh] min-h-[550px] flex items-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: imageY, scale: imageScale }}>
          <img src={IMGS.govHero} alt="Government Partnership" className="w-full h-full object-cover will-change-transform" style={{ objectPosition: "center 30%" }} />
        </motion.div>
        <motion.div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40 z-10" style={{ opacity: overlayOpacity }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
        
        <motion.div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-10 text-white w-full" style={{ y: contentY }}>
          <Reveal>
            <Eyebrow dark={true}>Public Sector & Education</Eyebrow>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Government &<br />
              <span className="text-red-500">University Partnerships</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mb-8 leading-relaxed">
              Driving digital transformation through strategic collaboration and accredited training programs.
            </p>
            <div className="flex gap-4 flex-wrap">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onPartner} className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition-all shadow-lg shadow-red-900/30 cursor-pointer">
                Request Partnership Info
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-3 bg-white/10 backdrop-blur border border-white/30 hover:bg-white/20 rounded-xl font-semibold transition-all cursor-pointer">
                <Mail size={16} className="inline mr-2" /> Contact Government Team
              </motion.button>
            </div>
          </Reveal>
        </motion.div>
        
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/60">
          <ChevronDown size={24} />
        </motion.div>
      </section>
      
      {/* STATS SECTION */}
      <section className="py-16 bg-white border-b relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1} className="text-center">
                <TiltCard intensity={3}>
                  <div className="p-4">
                    <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mx-auto mb-3">
                      <stat.icon size={24} className="text-red-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      
      {/* GOVERNMENT COURSES GRID - FIXED: Click opens details modal, NOT registration */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-12">
            <Eyebrow>Professional Training Programs</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Workforce <GradientText>Development</GradientText></h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">2-day intensive workshops designed for government and public sector employees</p>
          </Reveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {governmentPrograms.map((program, i) => (
              <Reveal key={program.id} delay={i * 0.1}>
                <TiltCard intensity={5}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    // FIXED: This opens the DETAILS modal, NOT registration
                    onClick={() => setSelectedProgram(program)}
                    className="bg-white rounded-2xl overflow-hidden cursor-pointer group h-full flex flex-col"
                    style={{
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                    }}
                  >
                    {/* Card Header with Gradient */}
                    <div className="relative p-5" style={{ background: `linear-gradient(135deg, ${program.color}10, white)` }}>
                      <div className="flex items-start justify-between">
                        <motion.div 
                          className="w-14 h-14 rounded-xl flex items-center justify-center"
                          style={{ background: `${program.color}15` }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <program.icon size={28} style={{ color: program.color }} />
                        </motion.div>
                        <div className="text-right">
                          <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-100 text-red-600">{program.duration}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mt-4 group-hover:text-red-600 transition-colors">{program.title}</h3>
                      <p className="text-gray-500 text-sm mt-1 line-clamp-2">{program.desc}</p>
                    </div>
                    
                    {/* Card Body */}
                    <div className="p-5 pt-0 flex-1">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {program.tools?.slice(0, 3).map(tool => (
                          <span key={tool} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{tool}</span>
                        ))}
                        {program.tools?.length > 3 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            +{program.tools.length - 3} more
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3 pb-2 border-b border-gray-100">
                        <span className="flex items-center gap-1">
                          <Users size={12} /> {program.participants}
                        </span>
                        <span className="flex items-center gap-1">
                          <Target size={12} /> {program.objectives?.length || 0} objectives
                        </span>
                      </div>
                      
                      <p className="text-xs text-gray-400 line-clamp-1 mb-3">
                        👥 {program.suitableFor?.substring(0, 50)}...
                      </p>
                      
                      <motion.div 
                        whileHover={{ x: 5 }} 
                        className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100"
                      >
                        <span className="flex items-center gap-1 text-sm font-semibold" style={{ color: program.color }}>
                          View Course Details <ArrowRight size={14} />
                        </span>
                        <motion.div 
                          whileHover={{ scale: 1.1, x: 3 }}
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ background: `${program.color}10` }}
                        >
                          <ExternalLink size={14} style={{ color: program.color }} />
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      
      {/* UNIVERSITY PARTNERSHIPS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal direction="left">
              <div className="relative">
                <img src={IMGS.govMeeting} alt="University Partnership" className="rounded-2xl shadow-xl w-full" />
                <div className="absolute -bottom-6 -right-6 bg-red-600 text-white p-4 rounded-xl shadow-lg">
                  <School size={32} />
                </div>
              </div>
            </Reveal>
            <Reveal direction="right">
              <div>
                <Eyebrow>University Solutions</Eyebrow>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Academic <GradientText>Partnerships</GradientText></h2>
                <p className="text-gray-600 mb-8">Collaborate with ADITI Academy to bring industry-recognized technology education to your students and faculty.</p>
                <div className="grid gap-4">
                  {universityPrograms.map((program) => (
                    <div key={program.title} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all cursor-pointer hover:bg-red-50 group">
                      <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0 group-hover:bg-red-600 transition-colors">
                        <program.icon size={18} className="text-red-600 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{program.title}</h4>
                        <p className="text-sm text-gray-500">{program.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      
      {/* ACCREDITATION SECTION */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <Reveal>
            <Award size={48} className="text-red-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Officially Accredited by MoEYS</h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">Our programs are fully aligned with the Ministry of Education, Youth and Sport standards</p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onPartner} className="px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-all cursor-pointer">
              Request Accreditation Information
            </motion.button>
          </Reveal>
        </div>
      </section>

      {/* PROGRAM DETAIL MODAL - Shows ALL course details with professional 3D design */}
      <AnimatePresence>
        {selectedProgram && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-5 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProgram(null)}>
            <motion.div 
              initial={{ scale: 0.8, y: 50, rotateX: 25, opacity: 0 }} 
              animate={{ scale: 1, y: 0, rotateX: 0, opacity: 1 }} 
              exit={{ scale: 0.8, y: 50, rotateX: 25, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={e => e.stopPropagation()} 
              className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl relative shadow-2xl"
            >
              {/* Hero Section with Gradient Background */}
              <div 
                className="relative h-72 overflow-hidden rounded-t-3xl"
                style={{ background: `linear-gradient(135deg, ${selectedProgram.color}dd, ${selectedProgram.color}55)` }}
              >
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    className="w-32 h-32 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center"
                  >
                    <selectedProgram.icon size={64} className="text-white" />
                  </motion.div>
                </div>
                
                {/* Floating badges */}
                <div className="absolute top-6 left-6 flex gap-3">
                  <motion.span 
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-semibold"
                  >
                    {selectedProgram.duration}
                  </motion.span>
                  <motion.span 
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-semibold"
                  >
                    Hands-on Workshop
                  </motion.span>
                </div>
                
                {/* Close button */}
                <button 
                  onClick={() => setSelectedProgram(null)} 
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-all z-10"
                >
                  <X size={18} className="text-white" />
                </button>
                
                {/* Title overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <motion.h2 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-3xl font-bold text-white mb-2"
                  >
                    {selectedProgram.title}
                  </motion.h2>
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-4 text-white/90 text-sm"
                  >
                    <span className="flex items-center gap-1"><Users size={14} /> {selectedProgram.participants} participants trained</span>
                    <span className="flex items-center gap-1"><Target size={14} /> {selectedProgram.objectives?.length} learning objectives</span>
                  </motion.div>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-8">
                {/* Program Overview */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mb-8"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="w-1 h-6 bg-red-600 rounded-full" />
                    Program Overview
                  </h3>
                  <p className="text-gray-600 leading-relaxed bg-gray-50 p-5 rounded-2xl border border-gray-100">
                    {selectedProgram.fullDesc}
                  </p>
                </motion.div>
                
                {/* Objectives & Outcomes Grid with 3D cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <motion.div 
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                      <Target size={20} className="text-red-600" />
                      Program Objectives
                    </h3>
                    <ul className="space-y-3">
                      {selectedProgram.objectives?.map((obj, idx) => (
                        <motion.li 
                          key={idx} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9 + idx * 0.05 }}
                          className="flex items-start gap-3 text-sm text-gray-600"
                        >
                          <CheckCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                          <span>{obj}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                      <Award size={20} className="text-red-600" />
                      Learning Outcomes
                    </h3>
                    <ul className="space-y-3">
                      {selectedProgram.outcomes?.map((out, idx) => (
                        <motion.li 
                          key={idx} 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9 + idx * 0.05 }}
                          className="flex items-start gap-3 text-sm text-gray-600"
                        >
                          <Sparkles size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                          <span>{out}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
                
                {/* Tools & Technologies */}
                {selectedProgram.tools && selectedProgram.tools.length > 0 && (
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mb-8"
                  >
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                      <Cpu size={20} className="text-red-600" />
                      Tools & Technologies Covered
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedProgram.tools.map((tool, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 1.1 + idx * 0.05, type: 'spring' }}
                          className="px-4 py-2 bg-gradient-to-r from-red-50 to-red-100 text-red-700 rounded-xl text-sm font-medium border border-red-200 shadow-sm hover:shadow-md transition-all cursor-default"
                          whileHover={{ scale: 1.05, y: -2 }}
                        >
                          {tool}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {/* Target Audience */}
                {selectedProgram.suitableFor && (
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mb-8"
                  >
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-lg">
                      <Users size={20} className="text-red-600" />
                      Target Audience
                    </h3>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100">
                      <p className="text-gray-700 leading-relaxed">
                        {selectedProgram.suitableFor}
                      </p>
                    </div>
                  </motion.div>
                )}
                
                {/* Key Information Grid */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                >
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
                    <Clock size={20} className="text-red-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-500 mb-1">Duration</p>
                    <p className="font-semibold text-gray-900">{selectedProgram.duration}</p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
                    <Users size={20} className="text-red-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-500 mb-1">Participants</p>
                    <p className="font-semibold text-gray-900">{selectedProgram.participants}</p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
                    <Award size={20} className="text-red-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-500 mb-1">Certification</p>
                    <p className="font-semibold text-gray-900">Certificate</p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
                    <Calendar size={20} className="text-red-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-500 mb-1">Format</p>
                    <p className="font-semibold text-gray-900">In-Person</p>
                  </div>
                </motion.div>
                
                {/* Registration CTA - This opens the registration form */}
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.4, type: 'spring' }}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-red-700 p-8 shadow-xl"
                >
                  <div className="absolute inset-0 bg-white/10 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-2">Ready to Enroll Your Team?</h4>
                      <p className="text-red-100">Contact our government partnerships team for group registration</p>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }} 
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRegisterClick(selectedProgram)}
                      className="px-8 py-3 rounded-xl bg-white text-red-600 font-bold cursor-pointer shadow-lg hover:shadow-2xl transition-all flex items-center gap-2 group"
                    >
                      Register Now 
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REGISTRATION MODAL - Separate modal for registration form */}
      <AnimatePresence>
        {showRegForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-5 bg-black/80 backdrop-blur-md"
            onClick={() => { setShowRegForm(false); setSubmitted(false); }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 24, rotateX: 15 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.9, y: 24, rotateX: 15 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 bg-gradient-to-r from-red-50 to-white border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {submitted ? 'Registration Submitted!' : `Register for Workshop`}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {submitted ? "We'll be in touch soon" : selectedProgram?.title}
                  </p>
                </div>
                <button onClick={() => { setShowRegForm(false); setSubmitted(false); }} className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                  <X size={16} className="text-gray-500" />
                </button>
              </div>
              
              <div className="p-6">
                {submitted ? (
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, delay: 0.1 }} className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle size={42} className="text-red-600" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Submitted!</h3>
                    <p className="text-gray-600 mb-2">Thank you, <strong>{formData.name}</strong>!</p>
                    <p className="text-sm text-gray-500 mb-5">We've sent a confirmation to <strong>{formData.email}</strong>. Our team will contact you within 2 business days.</p>
                    <div className="bg-red-50 rounded-xl p-4 mb-5">
                      <p className="text-xs text-red-600 font-mono mb-1">Application ID: <strong>{applicationId}</strong></p>
                    </div>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setShowRegForm(false); setSubmitted(false); }} className="w-full py-3 rounded-xl bg-red-600 text-white font-semibold cursor-pointer">
                      Close
                    </motion.button>
                  </motion.div>
                ) : (
                  <>
                    <div className="flex flex-col gap-4">
                      <input type="text" name="name" placeholder="Full Name *" value={formData.name} onChange={handleRegChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:outline-none transition-all" />
                      <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleRegChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:outline-none transition-all" />
                      <input type="tel" name="phone" placeholder="Phone Number *" value={formData.phone} onChange={handleRegChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:outline-none transition-all" />
                      <input type="text" name="organization" placeholder="Government Agency / Organization *" value={formData.organization} onChange={handleRegChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:outline-none transition-all" />
                    </div>
                    {regError && <p className="text-red-500 text-sm mt-3">{regError}</p>}
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={isSubmitting} onClick={handleRegSubmit} className={`w-full mt-6 py-3 rounded-xl bg-red-600 text-white font-semibold cursor-pointer shadow-lg transition-all ${isSubmitting ? 'opacity-70' : 'hover:bg-red-700'}`}>
                      {isSubmitting ? <div className="flex items-center justify-center gap-2"><Loader2 size={18} className="animate-spin" /> Submitting...</div> : 'Complete Registration →'}
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


// ─── ROOT PAGE ────────────────────────────────────────────────────────────────

export function ProgramsPageEnhanced() {
  const [activeTab, setActiveTab] = useState('individual');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showRegForm, setShowRegForm] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [showPartner, setShowPartner] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | null>(null);
  const coursesRef = useRef(null);

  const filteredCourses = selectedCategory === 'all' ? COURSES : COURSES.filter(c => c.category === selectedCategory);
  const scrollToCourses = () => coursesRef.current?.scrollIntoView({ behavior: 'smooth' });
  
  const handleServiceSelect = (serviceId: string) => {
    setPreselectedService(serviceId);
    setShowQuote(true);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />

      <HeroSection onExplore={scrollToCourses} />
      <WhoAreYouSection activeTab={activeTab} setActiveTab={setActiveTab} />

      <AnimatePresence mode="wait">
        {activeTab === 'individual' && (
          <motion.div
            key="individual"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <section ref={coursesRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="mb-8">
          <Eyebrow>Course Catalog</Eyebrow>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Explore by <GradientText>Category</GradientText></h2>
        </Reveal>
        <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
        <div className="space-y-4">
          {filteredCourses.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} onClick={() => setSelectedCourse(course)} />
          ))}
        </div>
      </div>
    </section>
            
            {/* Technology Showcase added for individual tab */}
            {/* <TechnologyShowcase /> */}
            
                <CareerBoostSection audienceType="individual" onRegister={() => setShowRegForm(true)} />
            
          </motion.div>
        )}

        {activeTab === 'corporate' && (
          <motion.div
            key="corporate"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <CorporateSection onQuote={() => setShowQuote(true)} onServiceSelect={handleServiceSelect} />
          </motion.div>
        )}

        {activeTab === 'government' && (
          <motion.div
            key="government"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <IndustryProgramsSection />
          </motion.div>
        )}
      </AnimatePresence>

      <CertificateCenter />

      <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} onRegister={() => { setSelectedCourse(null); setShowRegForm(true); }} />
      <RegModal show={showRegForm} onClose={() => setShowRegForm(false)} course={selectedCourse} />
      <QuoteModal show={showQuote} onClose={() => { setShowQuote(false); setPreselectedService(null); }} preselectedService={preselectedService} />
      <PartnerModal show={showPartner} onClose={() => setShowPartner(false)} />
      <CTASection />
      <Footer />
    </div>
  );
}

export default ProgramsPageEnhanced;