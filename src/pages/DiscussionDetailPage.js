import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  MessageCircle,
  Heart,
  Eye,
  ArrowLeft,
  Send,
  ThumbsUp,
  Reply,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export default function DiscussionDetailPage({ discussions = [], setDiscussions, currentUser}) {
  const { id } = useParams();
  const discussion = discussions.find((d) => String(d.id) === id);

  const [replyText, setReplyText] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);

  // For top-level replies under discussion
  const [visibleReplies, setVisibleReplies] = useState([]);
  const [replyLoadCount, setReplyLoadCount] = useState(7);

  // For nested replies under each reply
  const [nestedReplyLoadCounts, setNestedReplyLoadCounts] = useState({});

  // ✅ Track views in localStorage
  useEffect(() => {
    if (discussion) {
      const viewedDiscussions = JSON.parse(localStorage.getItem("viewedDiscussions")) || [];
      if (!viewedDiscussions.includes(discussion.id)) {
        setDiscussions((prev) =>
          prev.map((d) =>
            String(d.id) === id ? { ...d, views: (d.views || 0) + 1 } : d
          )
        );
        localStorage.setItem(
          "viewedDiscussions",
          JSON.stringify([...viewedDiscussions, discussion.id])
        );
      }
    }
  }, [id, discussion, setDiscussions]);

  // ✅ Update visible replies when loadCount changes
  useEffect(() => {
    if (discussion?.replies) {
      setVisibleReplies(discussion.replies.slice(0, replyLoadCount));
    }
  }, [discussion, replyLoadCount]);

  if (!discussion) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Discussion not found</h2>
        <Link to="/recent-discussions" className="text-blue-600 underline">
          Back to Discussions
        </Link>
      </div>
    );
  }

  // ✅ Submit new reply (either main or nested)
function handleSubmit(event) {
  event.preventDefault();
  if (!replyText.trim()) return;

  const newReply = {
    id: uuidv4(),
    author: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "Anonymous",
    content: replyText,
    timeAgo: "just now",
    likes: 0,
    createdAt: new Date().toISOString(),
    children: [],
  };

  setDiscussions((prevDiscussions) =>
    prevDiscussions.map((d) => {
      if (String(d.id) !== id) return d;

      if (activeReplyId === null) {
        // ✅ Newest top-level reply goes first
        return { ...d, replies: [newReply, ...(d.replies || [])] };
      } else {
        // ✅ Newest nested reply goes first
        return {
          ...d,
          replies: d.replies.map((r) =>
            r.id === activeReplyId
              ? { ...r, children: [newReply, ...(r.children || [])] }
              : r
          ),
        };
      }
    })
  );
  setReplyText("");
  setActiveReplyId(null);
}

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

  // ✅ Toggle like on main discussion (FIXED)
  function handleDiscussionLike() {
    const currentUserId = "currentUser"; // Replace with actual logged-in user id

    setDiscussions((prevDiscussions) =>
      prevDiscussions.map((d) => {
        if (String(d.id) !== id) return d;

        const alreadyLiked = d.likedBy?.includes(currentUserId);

        return {
          ...d,
          likes: alreadyLiked ? d.likes - 1 : (d.likes || 0) + 1,
          likedBy: alreadyLiked
            ? d.likedBy.filter((u) => u !== currentUserId)
            : [...(d.likedBy || []), currentUserId],
        };
      })
    );
  }

  // ✅ Toggle like on a reply
  function handleReplyLike(replyId) {
    const currentUserId = "currentUser";
    setDiscussions((prevDiscussions) =>
      prevDiscussions.map((d) =>
        String(d.id) === id
          ? {
              ...d,
              replies: d.replies.map((r) => {
                if (r.id === replyId) {
                  const likedBy = r.likedBy || [];
                  const hasLiked = likedBy.includes(currentUserId);

                  return {
                    ...r,
                    likes: hasLiked ? r.likes - 1 : (r.likes || 0) + 1,
                    likedBy: hasLiked
                      ? likedBy.filter((u) => u !== currentUserId)
                      : [...likedBy, currentUserId],
                  };
                }
                return r;
              }),
            }
          : d
      )
    );
  }

  // Load more replies
  const handleLoadMore = () => {
    setTimeout(() => setReplyLoadCount((prev) => prev + 7), 500);
  };

  const handleLoadMoreNested = (replyId) => {
    setTimeout(() => {
      setNestedReplyLoadCounts((prev) => ({
        ...prev,
        [replyId]: (prev[replyId] || 4) + 4,
      }));
    }, 500);
  };
  return (
    <div className="min-h-screen bg-background mt-12">
      {/* Breadcrumb */}
      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link to="/recent-discussions">
              <button className="flex items-center gap-2 text-sm px-3 py-2 rounded-md hover:bg-muted hover:text-teal-500 duration-300">
                <ArrowLeft className="w-4 h-4" />
                Back to Discussions
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Discussion */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="border rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-2 capitalize">{discussion.discussion_topic}</h2>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="text-yellow-600 font-bold">{discussion.author || "@EcoFashionista"}</span>
              <span>
                {discussion.createdAt
                  ? new Date(discussion.createdAt).toLocaleString()
                  : "Just now"}
              </span>
            </div>
            <p className="text-foreground leading-relaxed mb-6">{discussion.message}</p>
            <div className="flex items-center justify-between border-t border-border pt-4">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>
                    {discussion.replies?.length || 0} repl
                    {discussion.replies?.length === 1 ? "y" : "ies"}
                  </span>
                </div>
                <button
                  onClick={handleDiscussionLike}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
                    discussion.likedBy?.includes("currentUser") && "text-red-500"
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  <span>
                    {discussion.likes || 0} like{discussion.likes === 1 ? "" : "s"}
                  </span>
                </button>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>
                    {discussion.views || 0} view{discussion.views === 1 ? "" : "s"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Replies */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">
              Replies ({discussion.replies?.length || 0})
            </h2>

            {/* Reply Form */}
            <form onSubmit={handleSubmit} className="border rounded-lg p-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center font-semibold text-white">
                  You
                </div>
                <div className="flex-1 space-y-4">
                  <textarea
                    placeholder="Share your thoughts on this discussion..."
                    className="w-full min-h-[100px] resize-none border rounded-md p-2"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    required
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-primary px-4 py-2 rounded-md flex items-center gap-2 text-teal-500 border-gray-500"
                    >
                      <Send className="w-4 h-4" />
                      Post Reply
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Existing Replies */}
            {visibleReplies.length > 0 ? (
              visibleReplies.map((reply) => {
                const nestedCount = nestedReplyLoadCounts[reply.id] || 4;
                const visibleChildren = reply.children?.slice(0, nestedCount) || [];

                return (
                  <div key={reply.id} className="border rounded-lg p-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-semibold text-primary">
                        {reply.avatar || reply.author?.[0] || "U"}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-foreground">
                            {reply.author? reply.author.split(' ')[0]  : "@User"}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {reply.createdAt ? timeAgo(reply.createdAt) : "just now"}
                          </span>
                        </div>
                        <p className="text-foreground leading-relaxed mb-4">
                          {reply.content}
                        </p>

                        {/* Reply Actions */}
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleReplyLike(reply.id)}
                            className="flex items-center gap-2 text-sm"
                          >
                            <ThumbsUp
                              className={`w-4 h-4 ${
                                reply.likedBy?.includes("currentUser")
                                  ? "text-blue-500"
                                  : "text-gray-500"
                              }`}
                            />
                            {reply.likes || 0}
                          </button>
                          <button
                            onClick={() => setActiveReplyId(reply.id)}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Reply className="w-4 h-4" /> Reply
                          </button>
                        </div>

                        {/* Nested reply form */}
                        {activeReplyId === reply.id && (
                          <form
                            onSubmit={handleSubmit}
                            className="mt-4 border rounded-lg p-4"
                          >
                            <textarea
                              className="w-full resize-none border rounded-md p-2"
                              placeholder="Write your reply..."
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              required
                            />
                            <div className="flex gap-2 mt-2">
                              <button
                                type="submit"
                                className="bg-primary px-4 py-2 rounded-md text-yellow-600 flex items-center gap-2"
                              >
                                <Send className="w-4 h-4" /> Reply
                              </button>
                              <button
                                type="button"
                                onClick={() => setActiveReplyId(null)}
                                className="px-4 py-2 border rounded-md"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        )}

                        {/* Nested replies */}
                        <div className="max-h-72 overflow-auto">
                        {visibleChildren.length > 0 && (
                          <div className="ml-10 mt-4 space-y-4">
                            {visibleChildren.map((child) => (
                              <div key={child.id} className="border rounded-lg p-4 bg-gray-100">
                                <p className="font-medium">{child.author}</p>
                                <p>{child.content}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {visibleChildren.length < (reply.children?.length || 0) && (
                          <div className="text-center mt-2">
                            <button
                              onClick={() => handleLoadMoreNested(reply.id)}
                              className="border px-4 py-2 rounded-md text-sm hover:bg-yellow-600 hover:text-white duration-300"
                            >
                              Load more replies
                            </button>
                          </div>
                        )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-muted-foreground">No replies yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Load More */}
      {visibleReplies.length < (discussion.replies?.length || 0) && (
        <div className="text-center mt-12">
          <button
            onClick={handleLoadMore}
            className="border capitalize mb-5 px-6 py-3 rounded-md text-lg hover:bg-yellow-600 hover:text-white duration-300"
          >
            Load more replies
          </button>
        </div>
      )}
    </div>
  );
}
