import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import axios from "axios";
import {
  MessageCircle,
  UserCircle2,
  Loader2,
  AlertCircle,
  Send,
  ImagePlus,
  X,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const Comment = memo(({ comment, formatDate, index }) => (
  <div className="px-4 pt-4 pb-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group hover:shadow-lg hover:-translate-y-0.5">
    <div className="flex items-start gap-3 ">
      {comment.profileImage ? (
        <img
          src={comment.profileImage}
          alt={`${comment.userName}'s profile`}
          className="object-cover w-10 h-10 border-2 rounded-full border-indigo-500/30"
          loading="lazy"
        />
      ) : (
        <div className="p-2 text-indigo-400 transition-colors rounded-full bg-indigo-500/20 group-hover:bg-indigo-500/30">
          <UserCircle2 className="w-5 h-5" />
        </div>
      )}
      <div className="flex-grow min-w-0">
        <div className="flex items-center justify-between gap-4 mb-2">
          <h4 className="font-medium text-white truncate">
            {comment.userName}
          </h4>
          <span className="text-xs text-gray-400 whitespace-nowrap">
            {formatDate(comment.createdAt)}
          </span>
        </div>
        <p className="relative text-sm leading-relaxed text-gray-300 break-words bottom-2">
          {comment.content}
        </p>
      </div>
    </div>
  </div>
));

const CommentForm = memo(({ onSubmit, isSubmitting, error }) => {
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) return;
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleTextareaChange = useCallback((e) => {
    setNewComment(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!newComment.trim() || !userName.trim()) return;

      onSubmit({ newComment, userName, imageFile });
      setNewComment("");
      setImagePreview(null);
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (textareaRef.current) textareaRef.current.style.height = "auto";
    },
    [newComment, userName, imageFile, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2" data-aos="fade-up" data-aos-duration="1000">
        <label className="block text-sm font-medium text-white">
          Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name"
          className="w-full p-3 text-white placeholder-gray-400 transition-all border rounded-xl bg-white/5 border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          required
        />
      </div>

      <div className="space-y-2" data-aos="fade-up" data-aos-duration="1200">
        <label className="block text-sm font-medium text-white">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          ref={textareaRef}
          value={newComment}
          onChange={handleTextareaChange}
          placeholder="Write your message here..."
          className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none min-h-[120px]"
          required
        />
      </div>

      <div className="space-y-2" data-aos="fade-up" data-aos-duration="1400">
        <label className="block text-sm font-medium text-white">
          Profile Photo <span className="text-gray-400">(optional)</span>
        </label>
        <div className="flex items-center gap-4 p-4 border bg-white/5 border-white/10 rounded-xl">
          {imagePreview ? (
            <div className="flex items-center gap-4">
              <img
                src={imagePreview}
                alt="Profile preview"
                className="object-cover w-16 h-16 border-2 rounded-full border-indigo-500/50"
              />
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null);
                  setImageFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="flex items-center gap-2 px-4 py-2 text-red-400 transition-all rounded-full bg-red-500/20 hover:bg-red-500/30 group"
              >
                <X className="w-4 h-4" />
                <span>Remove Photo</span>
              </button>
            </div>
          ) : (
            <div className="w-full">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center w-full gap-2 px-4 py-3 text-indigo-400 transition-all border border-dashed rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 border-indigo-500/50 hover:border-indigo-500 group"
              >
                <ImagePlus className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>Choose Profile Photo</span>
              </button>
              <p className="mt-2 text-sm text-center text-gray-400">
                Max file size: 5MB
              </p>
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        data-aos="fade-up"
        data-aos-duration="1000"
        className="relative w-full h-12 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl font-medium text-white overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
      >
        <div className="absolute inset-0 transition-transform duration-300 translate-y-12 bg-white/20 group-hover:translate-y-0" />
        <div className="relative flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Posting...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Post Comment</span>
            </>
          )}
        </div>
      </button>
    </form>
  );
});

const Komentar = () => {
  const [comments, setComments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      once: false,
      duration: 1000,
    });

    // Fetch comments from the API
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/message/getall",
        { withCredentials: true }
      );
      setComments(response.data.messages);
    } catch (error) {
      setError("Failed to fetch comments. Please try again.");
      console.error("Error fetching comments: ", error);
    }
  };

  const handleCommentSubmit = useCallback(
    async ({ newComment, userName, imageFile }) => {
      setError("");
      setIsSubmitting(true);

      try {
        const formData = new FormData();
        formData.append("senderName", userName);
        formData.append("subject", "Comment");
        formData.append("message", newComment);
        if (imageFile) formData.append("profileImage", imageFile);

        await axios.post(
          "http://localhost:4000/api/v1/message/send",
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        // Refresh comments after posting
        await fetchComments();
      } catch (error) {
        setError("Failed to post comment. Please try again.");
        console.error("Error adding comment: ", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  const formatDate = useCallback((timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  }, []);

  return (
    <div
      className="w-full overflow-hidden shadow-xl bg-gradient-to-b from-white/10 to-white/5 rounded-2xl backdrop-blur-xl"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div
        className="p-6 border-b border-white/10"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/20">
            <MessageCircle className="w-6 h-6 text-indigo-400" />
          </div>
          <h3 className="text-xl font-semibold text-white">
            Comments{" "}
            <span className="text-indigo-400">({comments.length})</span>
          </h3>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {error && (
          <div
            className="flex items-center gap-2 p-4 text-red-400 border bg-red-500/10 border-red-500/20 rounded-xl"
            data-aos="fade-in"
          >
            <AlertCircle className="flex-shrink-0 w-5 h-5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div>
          <CommentForm
            onSubmit={handleCommentSubmit}
            isSubmitting={isSubmitting}
            error={error}
          />
        </div>

        <div
          className="space-y-4 h-[300px] overflow-y-auto custom-scrollbar"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {comments.length === 0 ? (
            <div className="py-8 text-center" data-aos="fade-in">
              <UserCircle2 className="w-12 h-12 mx-auto mb-3 text-indigo-400 opacity-50" />
              <p className="text-gray-400">
                No comments yet. Start the conversation!
              </p>
            </div>
          ) : (
            comments.map((comment, index) => (
              <Comment
                key={comment._id}
                comment={comment}
                formatDate={formatDate}
                index={index}
              />
            ))
          )}
        </div>
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.5);
          border-radius: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.7);
        }
      `}</style>
    </div>
  );
};

export default Komentar;
