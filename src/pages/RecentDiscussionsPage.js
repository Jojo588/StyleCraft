import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import DiscussionSection from "../components/DiscussionSection";

export default function RecentDiscussionsPage({ discussions, setDiscussions }) {
  // ✅ Load discussions from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("SavedDiscussions");
    if (saved) {
      try {
        let parsed = JSON.parse(saved);

        // ✅ ensure every discussion has an id
        parsed = parsed.map(d => (d.id ? d : { ...d, id: uuidv4() }));

        setDiscussions(parsed);
      } catch {
        setDiscussions([]);
      }
    }
  }, [setDiscussions]);

  // ✅ Persist changes back to localStorage
  useEffect(() => {
    localStorage.setItem("SavedDiscussions", JSON.stringify(discussions));
  }, [discussions]);

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="py-12 mt-6 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/lets-talk-fashion">
              <button className="flex items-center gap-2 text-sm px-3 py-2 rounded-md hover:bg-muted hover:text-teal-500 duration-300">
                <ArrowLeft className="w-4 h-4" />
                Back to Let's Talk Fashion
              </button>
            </Link>
          </div>
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground">
              Recent <span className="text-primary text-teal-500">Discussions</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-gray-600 leading-relaxed">
              Stay up to date with the latest conversations in our fashion
              community
            </p>
          </div>
        </div>
      </section>

      {/* Discussions List */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <DiscussionSection discussions={discussions} />
        </div>
      </section>
    </div>
  );
}
