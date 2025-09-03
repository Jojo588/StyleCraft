import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import {
  MessageCircle,
  Lightbulb,
  Timer,
  Heart,
  Eye,
  Users,
} from "lucide-react";

const DiscussionSection = ({ discussions = [] }) => {
  const [loadCount, setLoadCount] = useState(10);
  const [visibleDiscussions, setVisibleDiscussions] = useState([]);

  const location = useLocation();
  const isRecentDiscussionsPage = location.pathname === '/recent-discussions';

  // initialize visible discussions when discussions change
  useEffect(() => {
    if (isRecentDiscussionsPage) {
      setVisibleDiscussions(discussions.slice(0, loadCount));
    }
  }, [discussions, loadCount, isRecentDiscussionsPage]);

  // helper to choose correct icon
  const getDiscussionIcon = (topic) => {
    if (!topic) return MessageCircle;
    const lowerTopic = topic.toLowerCase();

    if (
      lowerTopic.includes("idea") ||
      lowerTopic.includes("concept") ||
      lowerTopic.includes("innovation") ||
      lowerTopic.includes("creative") ||
      lowerTopic.includes("brainstorm")
    ) {
      return Lightbulb;
    }

    if (
      lowerTopic.includes("time") ||
      lowerTopic.includes("date") ||
      lowerTopic.includes("schedule") ||
      lowerTopic.includes("timeline") ||
      lowerTopic.includes("deadline") ||
      lowerTopic.includes("trend")
    ) {
      return Timer;
    }

    if (
      lowerTopic.includes("dress") ||
      lowerTopic.includes("outfit") ||
      lowerTopic.includes("clothing") ||
      lowerTopic.includes("style") ||
      lowerTopic.includes("design") ||
      lowerTopic.includes("fashion")
    ) {
      return Users;
    }

    return MessageCircle;
  };

  // helper to format "time ago"
  const timeAgo = (dateString) => {
    if (!dateString) return "";
    const now = new Date();
    const created = new Date(dateString);
    const diffInSeconds = Math.floor((now - created) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return created.toLocaleDateString();
  };

  const handleLoadMore = () => {
    setTimeout(() => {
      setLoadCount((prev) => prev + 10); // load 10 more
    }, 500); // Simulated delay
  };

  // Decide which discussions to render
  const discussionsToRender = isRecentDiscussionsPage
    ? visibleDiscussions
    : discussions.slice(-4);

  return (
    <section className={isRecentDiscussionsPage ? 'py-2' : 'py-20'}>
      <div className={isRecentDiscussionsPage ? "" : `container mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className={!isRecentDiscussionsPage ? "space-y-12" : ""}>
          {!isRecentDiscussionsPage && (
            <div className="flex items-center justify-between">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
                Recent Discussions
              </h2>
              <Link to="/recent-discussions">
                <button className="border px-4 py-2 rounded-md hover:bg-yellow-500 hover:text-white duration-300">
                  View All <span className='max-sm:hidden'>Discussions</span>
                </button>
              </Link>
            </div>
          )}

          <div className={isRecentDiscussionsPage ? " space-y-6" : "grid lg:grid-cols-2 gap-8 "}>
            {discussionsToRender.length === 0 ? (
              <div>No discussions available. Start a discussion.</div>
            ) : (
              discussionsToRender.map((discussion, index) => {
                const Icon = getDiscussionIcon(discussion.discussion_topic);
                return (
                  <div
                    key={discussion.id || index}
                    className={`hover:shadow-lg transition-shadow border rounded-lg p-6 ${isRecentDiscussionsPage ? "bg-white" : 'bg-gray-100'} `}
                  >
                    <div className="flex items-center gap-3 mb-4 font-bold justify-between">
                      <span className='flex gap-2 items-center'>
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center bg-gray-200">
                          <Icon className="w-5 h-5 text-primary text-teal-600" />
                        </div>
                        <div className={`${isRecentDiscussionsPage && 'text-xl'} capitalize`}>
                          "{discussion.discussion_topic}"
                        </div>
                      </span>

                      {isRecentDiscussionsPage && (
                        <div className="text-right text-sm text-muted-foreground font-light">
                          <p>{timeAgo(discussion.createdAt) || "just now"}</p>
                        </div>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {isRecentDiscussionsPage
                        ? discussion.message
                        : (discussion.message.length > 90
                          ? discussion.message.substring(0, 90) + "..."
                          : discussion.message)}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className='flex gap-4 max-sm:gap-2'>
                        <span className={isRecentDiscussionsPage ? "text-yellow-600" : undefined}>
                          {!isRecentDiscussionsPage && 'Started by'} @{discussion.author ? discussion.author.split(' ')[0] : 'Anonymous'}
                        </span>

                        {isRecentDiscussionsPage && (
                          <>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{discussion.replies?.length || 0} <span className='max-sm:hidden'>repl{discussion.replies?.length===1?"y":"ies"} •{" "}</span></span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              <span>{discussion.likes || 0}<span className='max-sm:hidden'> like{discussion.likes===1?"":"s"}</span></span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>{discussion.views || 0}<span className='max-sm:hidden'> view{discussion.views===1?"":"s"}</span></span>
                            </div>
                          </>
                        )}
                      </div>
                      {isRecentDiscussionsPage ? (
                        <Link to={`/discussion-detail/${discussion.id}`}>
                          <button className="border px-3 py-2 rounded-md text-sm hover:bg-yellow-600 hover:text-white duration-300">
                            Join <span className='max-sm:hidden'>Discussion</span>
                          </button>
                        </Link>
                      ) : (
                        <span>
                          {discussion.replies?.length || 0} repl{discussion.replies?.length===1?"y":"ies"} •{" "}
                          {timeAgo(discussion.createdAt) || "just now"}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      {/* Load More */}
      {isRecentDiscussionsPage && visibleDiscussions.length < discussions.length && (
        <div className="text-center mt-12">
          <button
            onClick={handleLoadMore}
            className="border px-6 py-3 rounded-md text-lg hover:bg-yellow-600 hover:text-white duration-300">
            Load More Discussions
          </button>
        </div>
      )}
    </section>
  );
};

export default DiscussionSection;
