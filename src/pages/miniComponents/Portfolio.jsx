import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Globe,
  Layout,
  Cpu,
  Code,
  Package,
  ExternalLink,
  Github,
  Code2,
  Layers,
  Star,
  ChevronRight,
} from "lucide-react";
import Swal from "sweetalert2";
import { Tabs, Tab, AppBar, Box, Typography } from "@mui/material";
import Certificate from "../../components/ui/Certificate"; // Import Certificate component
import TechStackIcon from "../../components/ui/TechStackIcon"; // Import TechStackIcon component
import PropTypes from "prop-types"; // Import PropTypes
import MyApps from "./MyApps";

// Define a11yProps function
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

// Define TabPanel component
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const TECH_ICONS = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  default: Package,
};

const techStacks = [
  { icon: "angular.svg", language: "Angular" },
  { icon: "java-svgrepo-com.svg", language: "JAVA" },
  { icon: "spring-boot.svg", language: "Spring-boot" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "mongodb-svgrepo-com.svg", language: "MongoDB" },
  { icon: "vercel.svg", language: "Vercel" },
  // { icon: "bootstrap.svg", language: "Bootstrap" },
];

const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];

  return (
    <div className="group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 cursor-default">
      <div className="absolute inset-0 transition-all duration-500 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10" />
      <div className="relative flex items-center gap-1.5 md:gap-2">
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
        <span className="text-xs font-medium transition-colors md:text-sm text-blue-300/90 group-hover:text-blue-200">
          {tech}
        </span>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [value, setValue] = useState(0);

  useEffect(() => {
    const getMyProjects = async () => {
      const { data } = await axios.get(
        "https://backend-folio-ten.vercel.app/api/v1/project/getall",
        { withCredentials: true }
      );
      setProjects(data.projects);
      console.log(data.projects);
    };
    getMyProjects();
  }, []);

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 15) {
      return words.slice(0, 15).join(" ") + "...";
    }
    return description;
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden"
      id="Portfolio"
    >
      <div
        className="pb-10 text-center"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span
            style={{
              color: "#6366f1",
              backgroundImage:
                "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Portfolio Showcase
          </span>
        </h2>
        <p className="max-w-2xl mx-auto mt-2 text-sm text-slate-400 md:text-base">
          Explore my journey through projects, certifications, and technical
          expertise. Each section represents a milestone in my continuous
          learning path.
        </p>
      </div>

      {/* Tabs Section */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "transparent",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "20px",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
            backdropFilter: "blur(10px)",
            zIndex: 0,
          },
        }}
        className="md:px-4"
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          variant="fullWidth"
          sx={{
            minHeight: "70px",
            "& .MuiTab-root": {
              fontSize: { xs: "0.9rem", md: "1rem" },
              fontWeight: "600",
              color: "#94a3b8",
              textTransform: "none",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              padding: "20px 0",
              zIndex: 1,
              margin: "8px",
              borderRadius: "12px",
              "&:hover": {
                color: "#ffffff",
                backgroundColor: "rgba(139, 92, 246, 0.1)",
                transform: "translateY(-2px)",
              },
              "&.Mui-selected": {
                color: "#fff",
                background:
                  "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
              },
            },
            "& .MuiTabs-indicator": {
              height: 0,
            },
            "& .MuiTabs-flexContainer": {
              gap: "8px",
            },
          }}
        >
          <Tab label="Projects" {...a11yProps(0)} />
          <Tab label="Certificates" {...a11yProps(1)} />
          <Tab label="Tech Stack" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      {/* Tab Panels */}
      <TabPanel value={value} index={0}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link to={`/project/${project._id}`} key={project._id}>
              <Card className="overflow-hidden transition-shadow duration-300 border shadow-lg hover:shadow-xl bg-white/5 backdrop-blur-xl border-white/10 hover:border-white/20">
                <img
                  src={project.projectBanner?.url}
                  alt={project.title}
                  className="object-cover w-full h-48"
                />
                <div className="p-6">
                  <h2 className="mb-2 text-2xl font-bold text-white/90">
                    {project.title}
                  </h2>
                  <p className="mb-4 text-gray-300/90">
                    {expandedDescriptions[project._id]
                      ? project.description
                      : truncateDescription(project.description)}
                  </p>
                  {project.description.split(" ").length > 30 && (
                    <Button
                      variant="link"
                      className="p-0 text-blue-400 hover:text-blue-300"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleDescription(project._id);
                      }}
                    >
                      {expandedDescriptions[project._id]
                        ? "See Less"
                        : "See More"}
                    </Button>
                  )}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.TechStack?.map((tech, index) => (
                      <TechBadge key={index} tech={tech} />
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </TabPanel>

      <TabPanel value={value} index={1}>
        {/* Certificates Section */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate, index) => (
            <div
              key={index}
              className="overflow-hidden transition-shadow duration-300 border shadow-lg hover:shadow-xl bg-white/5 backdrop-blur-xl border-white/10 hover:border-white/20"
            >
              <img
                src={certificate.Img}
                alt={certificate.name}
                className="object-cover w-full h-48"
              />
              <div className="p-6">
                <h2 className="mb-2 text-2xl font-bold text-white/90">
                  {certificate.name}
                </h2>
                {/* Add more details if needed */}
              </div>
            </div>
          ))}
        </div>

        <MyApps />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {techStacks.map((stack, index) => (
            <TechStackIcon
              key={index}
              TechStackIcon={stack.icon}
              Language={stack.language}
            />
          ))}
        </div>
      </TabPanel>
    </div>
  );
};

export default Portfolio;
