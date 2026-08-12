import api from "./api";

// Initial fallback opportunities for University of Ruhuna FoT
const INITIAL_OPPORTUNITIES = [
  {
    _id: "opp_demo_1",
    title: "AI & Machine Learning Research Assistantship",
    description:
      "Join the Intelligent Systems Research Group at FoT Ruhuna working on NLP for Sri Lankan local languages and computer vision applications in agriculture.",
    category: "Research",
    department: "Department of Information & Communication Technology",
    location: "ICT Advanced Lab & Remote",
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    requirements: ["Python / PyTorch proficiency", "3rd or 4th year FoT student", "Linear algebra background"],
    contactEmail: "dr.perera@fot.ruh.ac.lk",
    applicationUrl: "https://fot.ruh.ac.lk/research/ai-grant",
    tags: ["AI", "Python", "Research", "Deep Learning"],
    status: "Open",
    createdBy: { name: "Dr. K. L. Perera", email: "dr.perera@fot.ruh.ac.lk" },
  },
  {
    _id: "opp_demo_2",
    title: "IoT Smart Agriculture Embedded Systems Internship",
    description:
      "Industrial 6-month internship developing microcontroller-based sensor nodes for real-time soil moisture and environmental monitoring.",
    category: "Internship",
    department: "Department of Biosystems Technology",
    location: "Kamburupitiya Tech Campus & Field Sites",
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    requirements: ["C/C++ Arduino & ESP32 programming", "Basic circuit design", "Biosystems or ET background"],
    contactEmail: "internships@fot.ruh.ac.lk",
    applicationUrl: "https://fot.ruh.ac.lk/careers/iot-intern",
    tags: ["IoT", "Embedded", "Biosystems", "Hardware"],
    status: "Open",
    createdBy: { name: "Dr. K. L. Perera", email: "dr.perera@fot.ruh.ac.lk" },
  },
  {
    _id: "opp_demo_3",
    title: "Cloud Architecture & Kubernetes Workshop",
    description:
      "A 2-day intensive practical workshop conducted by industry DevOps engineers covering Docker containerization, CI/CD pipelines, and AWS deployment.",
    category: "Workshop",
    department: "Department of Information & Communication Technology",
    location: "Auditorium & Virtual Lab",
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    requirements: ["Basic Linux command line knowledge", "Personal laptop with Docker Desktop"],
    contactEmail: "devops-workshop@fot.ruh.ac.lk",
    applicationUrl: "https://fot.ruh.ac.lk/workshops/cloud",
    tags: ["Docker", "Kubernetes", "AWS", "DevOps"],
    status: "Open",
    createdBy: { name: "Faculty Admin", email: "admin@ruh.ac.lk" },
  },
  {
    _id: "opp_demo_4",
    title: "Faculty Undergraduate Technology Innovation Grant",
    description:
      "Seed funding of LKR 150,000 for innovative final year prototype projects in Robotics, Renewable Energy, and Smart Sensors.",
    category: "Scholarship",
    department: "Department of Engineering Technology",
    location: "Faculty Innovation Cell",
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    requirements: ["FoT Undergrad final year project proposal", "Academic supervisor endorsement"],
    contactEmail: "grants@fot.ruh.ac.lk",
    applicationUrl: "https://fot.ruh.ac.lk/grants/innovation-2026",
    tags: ["Grant", "Innovation", "Robotics", "Funding"],
    status: "Open",
    createdBy: { name: "Faculty Admin", email: "admin@ruh.ac.lk" },
  },
];

// Initial fallback barrier reports
const INITIAL_BARRIERS = [
  {
    _id: "bar_demo_1",
    title: "High Performance GPU Server Shortage for ML Lab",
    description:
      "Students working on Deep Learning final year projects are experiencing severe queuing delays on the single shared NVIDIA GPU server.",
    category: "Equipment & Hardware",
    department: "Department of Information & Communication Technology",
    urgency: "High",
    status: "In Review",
    resolutionNotes: "Faculty Board has approved procurement of 2 additional RTX 4090 workstations. Awaiting delivery.",
    reportedBy: { name: "Kasun Silva", email: "tech.student@fot.ruh.ac.lk" },
  },
  {
    _id: "bar_demo_2",
    title: "Unstable Fibre Optic Connection in Engineering Lab 2",
    description:
      "Intermittent packet loss and speed drops during online simulations and hardware telemetry testing in Lab 2.",
    category: "Software & Network Access",
    department: "Department of Engineering Technology",
    urgency: "Critical",
    status: "Pending",
    resolutionNotes: "",
    reportedBy: { name: "Kasun Silva", email: "tech.student@fot.ruh.ac.lk" },
  },
  {
    _id: "bar_demo_3",
    title: "Limited Access to MATLAB & LabVIEW Academic Licenses",
    description:
      "Several workstations in the Signal Processing lab lack active LabVIEW license keys preventing lab exercise completion.",
    category: "Software & Network Access",
    department: "Department of Engineering Technology",
    urgency: "Medium",
    status: "Resolved",
    resolutionNotes: "Network floating license server reconfigured by IT center.",
    reportedBy: { name: "Dr. K. L. Perera", email: "dr.perera@fot.ruh.ac.lk" },
  },
];

const getStoredOpportunities = () => {
  const stored = localStorage.getItem("local_opportunities");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      // fallback
    }
  }
  localStorage.setItem("local_opportunities", JSON.stringify(INITIAL_OPPORTUNITIES));
  return INITIAL_OPPORTUNITIES;
};

const getStoredBarriers = () => {
  const stored = localStorage.getItem("local_barriers");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      // fallback
    }
  }
  localStorage.setItem("local_barriers", JSON.stringify(INITIAL_BARRIERS));
  return INITIAL_BARRIERS;
};

export const dataService = {
  // Opportunities
  async getOpportunities(filters = {}) {
    try {
      let query = "?";
      if (filters.keyword) query += `keyword=${encodeURIComponent(filters.keyword)}&`;
      if (filters.category && filters.category !== "All") query += `category=${encodeURIComponent(filters.category)}&`;
      if (filters.department && filters.department !== "All") query += `department=${encodeURIComponent(filters.department)}&`;

      const { data } = await api.get(`/opportunities${query}`);
      if (Array.isArray(data) && data.length > 0) {
        localStorage.setItem("local_opportunities", JSON.stringify(data));
        return data;
      }
    } catch (err) {
      console.warn("Backend API unavailable, using local data service fallback:", err.message);
    }

    // Local filter fallback
    let list = getStoredOpportunities();
    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      list = list.filter(
        (o) =>
          o.title.toLowerCase().includes(kw) ||
          o.description.toLowerCase().includes(kw) ||
          (o.tags && o.tags.some((t) => t.toLowerCase().includes(kw)))
      );
    }
    if (filters.category && filters.category !== "All") {
      list = list.filter((o) => o.category === filters.category);
    }
    if (filters.department && filters.department !== "All") {
      list = list.filter((o) => o.department === filters.department);
    }
    return list;
  },

  async getOpportunityById(id) {
    try {
      const { data } = await api.get(`/opportunities/${id}`);
      if (data) return data;
    } catch (err) {
      console.warn("Backend API unavailable for ID:", err.message);
    }
    const list = getStoredOpportunities();
    return list.find((o) => o._id === id) || list[0];
  },

  async createOpportunity(oppData) {
    try {
      const { data } = await api.post("/opportunities", oppData);
      if (data) {
        const list = getStoredOpportunities();
        localStorage.setItem("local_opportunities", JSON.stringify([data, ...list]));
        return data;
      }
    } catch (err) {
      console.warn("API save error, persisting to local storage:", err.message);
    }

    const newOpp = {
      _id: `opp_local_${Date.now()}`,
      ...oppData,
      status: "Open",
      createdAt: new Date().toISOString(),
      createdBy: { name: "Faculty Member", email: oppData.contactEmail },
    };
    const list = getStoredOpportunities();
    const updated = [newOpp, ...list];
    localStorage.setItem("local_opportunities", JSON.stringify(updated));
    return newOpp;
  },

  async updateOpportunity(id, updateData) {
    try {
      const { data } = await api.put(`/opportunities/${id}`, updateData);
      if (data) {
        const list = getStoredOpportunities();
        const updated = list.map((o) => (o._id === id ? data : o));
        localStorage.setItem("local_opportunities", JSON.stringify(updated));
        return data;
      }
    } catch (err) {
      console.warn("API update failed, updating local state:", err.message);
    }

    const list = getStoredOpportunities();
    const updated = list.map((o) => (o._id === id ? { ...o, ...updateData } : o));
    localStorage.setItem("local_opportunities", JSON.stringify(updated));
    return updated.find((o) => o._id === id);
  },

  async deleteOpportunity(id) {
    try {
      await api.delete(`/opportunities/${id}`);
    } catch (err) {
      console.warn("API delete failed, removing locally:", err.message);
    }
    const list = getStoredOpportunities();
    const updated = list.filter((o) => o._id !== id);
    localStorage.setItem("local_opportunities", JSON.stringify(updated));
    return true;
  },

  // Barriers
  async getBarriers(filters = {}) {
    try {
      let query = "?";
      if (filters.status && filters.status !== "All") query += `status=${encodeURIComponent(filters.status)}&`;
      if (filters.category && filters.category !== "All") query += `category=${encodeURIComponent(filters.category)}&`;

      const { data } = await api.get(`/barriers${query}`);
      if (Array.isArray(data) && data.length > 0) {
        localStorage.setItem("local_barriers", JSON.stringify(data));
        return data;
      }
    } catch (err) {
      console.warn("Backend API unavailable, using local barrier fallback:", err.message);
    }

    let list = getStoredBarriers();
    if (filters.status && filters.status !== "All") {
      list = list.filter((b) => b.status === filters.status);
    }
    if (filters.category && filters.category !== "All") {
      list = list.filter((b) => b.category === filters.category);
    }
    return list;
  },

  async createBarrier(barrierData) {
    try {
      const { data } = await api.post("/barriers", barrierData);
      if (data) {
        const list = getStoredBarriers();
        localStorage.setItem("local_barriers", JSON.stringify([data, ...list]));
        return data;
      }
    } catch (err) {
      console.warn("API barrier error, saving locally:", err.message);
    }

    const newBar = {
      _id: `bar_local_${Date.now()}`,
      ...barrierData,
      status: "Pending",
      resolutionNotes: "",
      createdAt: new Date().toISOString(),
      reportedBy: { name: "Student", email: "student@fot.ruh.ac.lk" },
    };
    const list = getStoredBarriers();
    const updated = [newBar, ...list];
    localStorage.setItem("local_barriers", JSON.stringify(updated));
    return newBar;
  },

  async updateBarrierStatus(id, updateData) {
    try {
      const { data } = await api.put(`/barriers/${id}`, updateData);
      if (data) {
        const list = getStoredBarriers();
        const updated = list.map((b) => (b._id === id ? data : b));
        localStorage.setItem("local_barriers", JSON.stringify(updated));
        return data;
      }
    } catch (err) {
      console.warn("API status update error, saving locally:", err.message);
    }

    const list = getStoredBarriers();
    const updated = list.map((b) => (b._id === id ? { ...b, ...updateData } : b));
    localStorage.setItem("local_barriers", JSON.stringify(updated));
    return updated.find((b) => b._id === id);
  },

  async deleteBarrier(id) {
    try {
      await api.delete(`/barriers/${id}`);
    } catch (err) {
      console.warn("API delete barrier error:", err.message);
    }
    const list = getStoredBarriers();
    const updated = list.filter((b) => b._id !== id);
    localStorage.setItem("local_barriers", JSON.stringify(updated));
    return true;
  },

  // Analytics Overview
  async getAnalytics() {
    try {
      const { data } = await api.get("/barriers/analytics/overview");
      if (data && data.summary) return data;
    } catch (err) {
      console.warn("API analytics error, compiling local metrics:", err.message);
    }

    const opps = getStoredOpportunities();
    const bars = getStoredBarriers();

    const categoryMap = {};
    bars.forEach((b) => {
      categoryMap[b.category] = (categoryMap[b.category] || 0) + 1;
    });

    const urgencyMap = {};
    bars.forEach((b) => {
      urgencyMap[b.urgency] = (urgencyMap[b.urgency] || 0) + 1;
    });

    const deptMap = {};
    opps.forEach((o) => {
      deptMap[o.department] = (deptMap[o.department] || 0) + 1;
    });

    return {
      summary: {
        totalUsers: 14,
        totalOpportunities: opps.length,
        openOpportunities: opps.filter((o) => o.status === "Open").length,
        totalBarriers: bars.length,
        pendingBarriers: bars.filter((b) => b.status === "Pending").length,
        inReviewBarriers: bars.filter((b) => b.status === "In Review").length,
        resolvedBarriers: bars.filter((b) => b.status === "Resolved").length,
      },
      categoryStats: Object.keys(categoryMap).map((k) => ({ _id: k, count: categoryMap[k] })),
      urgencyStats: Object.keys(urgencyMap).map((k) => ({ _id: k, count: urgencyMap[k] })),
      oppDepartmentStats: Object.keys(deptMap).map((k) => ({ _id: k, count: deptMap[k] })),
    };
  },
};
