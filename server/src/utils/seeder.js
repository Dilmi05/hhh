const User = require("../models/User");
const Opportunity = require("../models/Opportunity");
const BarrierReport = require("../models/BarrierReport");

const seedDatabase = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log("Database already contains data. Skipping initial seeding.");
      return;
    }

    console.log("Seeding initial Faculty of Technology data...");

    // Create Default Users
    const admin = await User.create({
      name: "Faculty Admin",
      email: "admin@ruh.ac.lk",
      password: "Admin@123",
      role: "admin",
      department: "General",
      bio: "Dean & IT System Administrator - Faculty of Technology, University of Ruhuna",
    });

    const lecturer = await User.create({
      name: "Dr. K. L. Perera",
      email: "dr.perera@fot.ruh.ac.lk",
      password: "Lecturer@123",
      role: "provider",
      department: "Department of Information & Communication Technology",
      bio: "Senior Lecturer in Cyber Security and Software Engineering",
    });

    const student = await User.create({
      name: "Kasun Silva",
      email: "tech.student@fot.ruh.ac.lk",
      password: "Student@123",
      role: "student",
      department: "Department of Engineering Technology",
      bio: "3rd Year Undergraduate in Engineering Technology (Robotics)",
    });

    // Create Default Opportunities
    const opportunities = [
      {
        title: "AI & Machine Learning Research Assistantship",
        description:
          "Join the Intelligent Systems Research Group at FoT Ruhuna working on NLP for Sri Lankan local languages and computer vision applications in agriculture.",
        category: "Research",
        department: "Department of Information & Communication Technology",
        location: "ICT Advanced Lab & Remote",
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 days
        requirements: [
          "Python / PyTorch proficiency",
          "3rd or 4th year FoT student",
          "Strong background in linear algebra",
        ],
        contactEmail: "dr.perera@fot.ruh.ac.lk",
        applicationUrl: "https://fot.ruh.ac.lk/research/ai-grant",
        tags: ["AI", "Python", "Research", "Deep Learning"],
        status: "Open",
        createdBy: lecturer._id,
      },
      {
        title: "IoT Smart Agriculture Embedded Systems Internship",
        description:
          "Industrial 6-month internship developing microcontroller-based sensor nodes for real-time soil moisture and environmental monitoring.",
        category: "Internships",
        department: "Department of Biosystems Technology",
        location: "Kamburupitiya Tech Campus & Field Sites",
        deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        requirements: [
          "C/C++ Arduino & ESP32 programming",
          "Basic circuit design",
          "Biosystems or ET background",
        ],
        contactEmail: "internships@fot.ruh.ac.lk",
        applicationUrl: "https://fot.ruh.ac.lk/careers/iot-intern",
        tags: ["IoT", "Embedded", "Biosystems", "Hardware"],
        status: "Open",
        createdBy: lecturer._id,
      },
      {
        title: "Cloud Architecture & Kubernetes Workshop",
        description:
          "A 2-day intensive practical workshop conducted by industry DevOps engineers covering Docker containerization, CI/CD pipelines, and AWS deployment.",
        category: "Workshop",
        department: "Department of Information & Communication Technology",
        location: "Auditorium & Virtual Lab",
        deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        requirements: ["Basic Linux command line knowledge", "Personal laptop with Docker Desktop"],
        contactEmail: "devops-workshop@fot.ruh.ac.lk",
        applicationUrl: "https://fot.ruh.ac.lk/workshops/cloud",
        tags: ["Docker", "Kubernetes", "AWS", "DevOps"],
        status: "Open",
        createdBy: admin._id,
      },
      {
        title: "Faculty Undergraduate Technology Innovation Grant",
        description:
          "Seed funding of LKR 150,000 for innovative final year prototype projects in Robotics, Renewable Energy, and Smart Sensors.",
        category: "Scholarships",
        department: "Department of Engineering Technology",
        location: "Faculty Innovation Cell",
        deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        requirements: [
          "FoT Undergrad final year project proposal",
          "Academic supervisor endorsement",
        ],
        contactEmail: "grants@fot.ruh.ac.lk",
        applicationUrl: "https://fot.ruh.ac.lk/grants/innovation-2026",
        tags: ["Grant", "Innovation", "Robotics", "Funding"],
        status: "Open",
        createdBy: admin._id,
      },
    ];

    await Opportunity.insertMany(opportunities);

    // Create Default Barrier Reports
    const barriers = [
      {
        title: "High Performance GPU Server Shortage for ML Lab",
        description:
          "Students working on Deep Learning final year projects are experiencing severe queuing delays on the single shared NVIDIA GPU server.",
        category: "Equipment & Hardware",
        department: "Department of Information & Communication Technology",
        severity: "High",
        urgency: "High",
        status: "Investigating",
        adminResponse: "Faculty Board has approved procurement of 2 additional RTX 4090 workstations. Awaiting delivery.",
        resolutionNotes: "Faculty Board has approved procurement of 2 additional RTX 4090 workstations. Awaiting delivery.",
        reportedBy: student._id,
      },
      {
        title: "Unstable Fibre Optic Connection in Engineering Lab 2",
        description:
          "Intermittent packet loss and speed drops during online simulations and hardware telemetry testing in Lab 2.",
        category: "Software & Network Access",
        department: "Department of Engineering Technology",
        severity: "High",
        urgency: "Critical",
        status: "Pending",
        resolutionNotes: "",
        reportedBy: student._id,
      },
      {
        title: "Limited Access to MATLAB & LabVIEW Academic Licenses",
        description:
          "Several workstations in the Signal Processing lab lack active LabVIEW license keys preventing lab exercise completion.",
        category: "Software & Network Access",
        department: "Department of Engineering Technology",
        severity: "Medium",
        urgency: "Medium",
        status: "Resolved",
        adminResponse: "Network floating license server reconfigured by IT center on August 5th.",
        resolutionNotes: "Network floating license server reconfigured by IT center on August 5th.",
        reportedBy: lecturer._id,
      },
    ];

    await BarrierReport.insertMany(barriers);

    console.log("Successfully seeded Faculty of Technology initial database!");
  } catch (error) {
    console.error("Seeding error:", error.message);
  }
};

module.exports = seedDatabase;
