import React, { useState, useEffect } from "react";
import DiscussionSection from "../components/DiscussionSection";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Lightbulb, Timer as Trend, Users } from "lucide-react";

export default function LetsTalkFashionPage({discussions, setDiscussions, currentUser}) {
  const navigate = useNavigate();
  const [editingIndex, setEditingIndex] = useState(null);
  const [newDiscussion, setNewDiscussion] = useState({
    author: "",
    discussion_topic: "",
    message: "",
    createdAt: "",
    replies: [],
    likes:"",
    views: ""
  });

  // ✅ load discussions from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("SavedDiscussions");
    if (saved) {
      try {
        setDiscussions(JSON.parse(saved));
      } catch {
        setDiscussions([]);
      }
    }
  }, []);

  // ✅ save discussions whenever they change
  useEffect(() => {
    if (discussions.length > 0) {
      localStorage.setItem("SavedDiscussions", JSON.stringify(discussions));
    }
  }, [discussions]);

  function handleChange(event) {
    setNewDiscussion(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  }

function handleSubmit(event) {
  event.preventDefault();

  const discussionWithTime = {
    ...newDiscussion,
    author: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "Anonymous",
    createdAt: new Date().toISOString(),
    replies: newDiscussion.replies || []
  };

  let updatedDiscussions;

  if (editingIndex !== null) {
    updatedDiscussions = discussions.map((d, i) =>
      i === editingIndex ? discussionWithTime : d
    );
    setEditingIndex(null);
  } else {
    updatedDiscussions = [...discussions, discussionWithTime];
  }

  setDiscussions(updatedDiscussions);
  localStorage.setItem("SavedDiscussions", JSON.stringify(updatedDiscussions));

  // reset form
  setNewDiscussion({
    discussion_topic: "",
    message: "",
    createdAt: "",
    replies: []
  });

  navigate("/lets-talk-fashion");
}


  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-foreground leading-tight">
              Let's Talk <span className="text-primary text-teal-500">Fashion</span>
            </h1>
            <p className="text-xl text-muted-foreground text-gray-600 leading-relaxed">
              Join our community of fashion enthusiasts, share your ideas, get inspired, and connect with like-minded
              creators from around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">Popular Discussion Topics</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer border rounded-lg bg-gray-100">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto bg-gray-200">
                    <Trend className="w-8 h-8 text-primary text-teal-500" />
                  </div>
                  <h3 className="text-xl font-serif font-bold">Latest Trends</h3>
                  <p className="text-muted-foreground">Discuss the hottest fashion trends and seasonal styles.</p>
                </div>
              </div>
              <div className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer border rounded-lg bg-gray-100">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto bg-yellow-100">
                    <Lightbulb className="w-8 h-8 text-accent text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-serif font-bold">Design Tips</h3>
                  <p className="text-muted-foreground">Share and learn professional design techniques and tricks.</p>
                </div>
              </div>
              <div className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer border rounded-lg bg-gray-100">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto bg-gray-200">
                    <Users className="w-8 h-8 text-primary text-teal-500" />
                  </div>
                  <h3 className="text-xl font-serif font-bold">Style Advice</h3>
                  <p className="text-muted-foreground">Get personalized styling advice from the community.</p>
                </div>
              </div>
              <div className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer border rounded-lg bg-gray-100">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto bg-yellow-100">
                    <MessageCircle className="w-8 h-8 text-accent text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-serif font-bold">Show & Tell</h3>
                  <p className="text-muted-foreground">Share your creations and get feedback from peers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Discussions */}
      <DiscussionSection discussions={discussions} currentUser={currentUser} />

      {/* Join Discussion Form */}
      <form onSubmit={handleSubmit} className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto border rounded-lg p-6 bg-gray-100">
            <h3 className="text-2xl font-serif text-center mb-6">Start a New Discussion</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="topic" className="text-sm font-medium">
                  Discussion Topic
                </label>
                <input
                  id="topic"
                  placeholder="What would you like to discuss?"
                  className="w-full border rounded-md px-3 py-2"
                  type="text"
                  name="discussion_topic"
                  value={newDiscussion.discussion_topic}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Your Message
                </label>
                <textarea
                  id="message"
                  placeholder="Share your thoughts, questions, or ideas with the community..."
                  rows="6"
                  className="w-full border rounded-md px-3 py-2"
                  name="message"
                  value={newDiscussion.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-md bg-teal-500 hover:bg-teal-700 duration-300"
              >
                Start Discussion
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
