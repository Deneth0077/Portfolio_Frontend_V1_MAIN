import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { ArrowLeft, ExternalLink, Github, Code2, Star } from "lucide-react";

const ProjectView = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProject = async () => {
      await axios
        .get(`https://backend-folio-ten.vercel.app/api/v1/project/get/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setTitle(res.data.project.title);
          setDescription(res.data.project.description);
          setStack(res.data.project.stack);
          setDeployed(res.data.project.deployed);
          setTechnologies(res.data.project.technologies);
          setGitRepoLink(res.data.project.gitRepoLink);
          setProjectLink(res.data.project.projectLink);
          setProjectBanner(
            res.data.project.projectBanner && res.data.project.projectBanner.url
          );
          setProjectBannerPreview(
            res.data.project.projectBanner && res.data.project.projectBanner.url
          );
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    getProject();
  }, [id]);

  const descriptionList = description.split(". ");
  const technologiesList = technologies.split(", ");

  const handleReturnToPortfolio = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#030014] px-[2%] sm:px-0 relative overflow-hidden">
      {/* Background animations */}
      <div className="fixed inset-0">
        <div className="absolute -inset-[10px] opacity-20">
          <div className="absolute top-0 bg-purple-500 rounded-full -left-4 w-72 md:w-96 h-72 md:h-96 mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-0 bg-blue-500 rounded-full -right-4 w-72 md:w-96 h-72 md:h-96 mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute bg-pink-500 rounded-full -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>

      <div className="relative">
        <div className="px-4 py-8 mx-auto max-w-7xl md:px-6 md:py-16">
          {/* Back Button */}
          <div className="flex items-center mb-8 space-x-2 md:space-x-4 md:mb-12 animate-fadeIn">
            <button
              onClick={handleReturnToPortfolio}
              className="group inline-flex items-center space-x-1.5 md:space-x-2 px-3 md:px-5 py-2 md:py-2.5 bg-white/5 backdrop-blur-xl rounded-xl text-white/90 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 transition-transform md:w-5 md:h-5 group-hover:-translate-x-1" />
              <span>Back</span>
            </button>
          </div>

          {/* Project Details */}
          <div className="grid gap-8 lg:grid-cols-2 md:gap-16">
            <div className="space-y-6 md:space-y-10 animate-slideInLeft">
              {/* Project Title */}
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-3xl font-bold leading-tight text-transparent md:text-6xl bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text">
                  {title}
                </h1>
                <div className="relative w-16 h-1 md:w-24">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-sm" />
                </div>
              </div>

              {/* Project Description */}
              <div className="prose prose-invert max-w-none">
                {descriptionList.map((item, index) => (
                  <p
                    key={index}
                    className="text-base leading-relaxed md:text-lg text-gray-300/90"
                  >
                    {item}
                  </p>
                ))}
              </div>

              {/* Technologies Used */}
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-lg md:text-xl font-semibold text-white/90 flex items-center gap-2 md:gap-3">
                  <Code2 className="w-4 h-4 text-blue-400 md:w-5 md:h-5" />
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {technologiesList.map((tech, index) => (
                    <div
                      key={index}
                      className="px-3 py-1 text-sm text-blue-300 bg-blue-500/10 rounded-full md:text-base"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack */}
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-lg md:text-xl font-semibold text-white/90">
                  Stack
                </h3>
                <p className="text-gray-300/90">{stack}</p>
              </div>

              {/* Deployed */}
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-lg md:text-xl font-semibold text-white/90">
                  Deployed
                </h3>
                <p className="text-gray-300/90">{deployed}</p>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3 md:gap-4">
                <a
                  href={gitRepoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:from-blue-600/20 hover:to-purple-600/20 text-blue-300 rounded-xl transition-all duration-300 border border-blue-500/20 hover:border-blue-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
                >
                  <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-blue-600/10 to-purple-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                  <Github className="relative w-4 h-4 transition-transform md:w-5 md:h-5 group-hover:rotate-12" />
                  <span className="relative font-medium">GitHub</span>
                </a>

                <a
                  href={projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 hover:from-purple-600/20 hover:to-pink-600/20 text-purple-300 rounded-xl transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
                >
                  <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-purple-600/10 to-pink-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                  <ExternalLink className="relative w-4 h-4 transition-transform md:w-5 md:h-5 group-hover:rotate-12" />
                  <span className="relative font-medium">Live Demo</span>
                </a>
              </div>
            </div>

            {/* Project Banner */}
            <div className="space-y-6 md:space-y-10 animate-slideInRight">
              <div className="relative overflow-hidden border shadow-2xl rounded-2xl border-white/10 group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={projectBannerPreview || "/avatarHolder.jpg"}
                  alt={title}
                  className="object-cover w-full transition-transform duration-700 transform will-change-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 transition-colors duration-300 border-2 border-white/0 group-hover:border-white/10 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
