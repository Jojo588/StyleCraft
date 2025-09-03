import React, { useEffect, useState } from "react";
import { Heart, Eye, Download } from "lucide-react";

export default function GalleryPage() {
  const [galleryReactions, setGalleryReactions] = useState({
    imageViews: [],
    imageLikes: [],
  });
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const PEXELS_API_KEY = "VHOZqY0O98u5w5Jb9IjuynfLmaEBUVzjdGe4MiUsFLVpNtjIPUyfZ3wy";

  // ✅ Format each photo with stored views
const formatItem = (item) => {
  const viewKey = `views_${item.id}`;
  const likeKey = `likes_${item.id}`;

  const savedViews = localStorage.getItem(viewKey);
  const savedLikes = localStorage.getItem(likeKey);

  let likesData = savedLikes ? JSON.parse(savedLikes) : { likes: 0, likedBy: [] };

  return {
    id: item.id,
    img: item.src.medium,
    title: item.alt || "Kente Fashion",
    desc: "Beautiful Kente fashion design",
    views: savedViews ? parseInt(savedViews) : 0,
    likes: likesData.likes,
    likedBy: likesData.likedBy,
    download: item.src.original,
  };
};




// ✅ Toggle like on a specific image
const handleImageLike = (id) => {
  const key = `likes_${id}`;
  const currentUserId = "currentUser"; // later replace with real user id

  // Get saved likes from localStorage
  let savedData = localStorage.getItem(key);
  savedData = savedData ? JSON.parse(savedData) : { likes: 0, likedBy: [] };

  const alreadyLiked = savedData.likedBy.includes(currentUserId);

  const updatedData = {
    likes: alreadyLiked ? savedData.likes - 1 : savedData.likes + 1,
    likedBy: alreadyLiked
      ? savedData.likedBy.filter((u) => u !== currentUserId)
      : [...savedData.likedBy, currentUserId],
  };

  // Save back to localStorage
  localStorage.setItem(key, JSON.stringify(updatedData));

  // Update state so UI refreshes
  setGalleryReactions((prev) => ({
    ...prev,
    imageViews: prev.imageViews.map((img) =>
      img.id === id
        ? { ...img, likes: updatedData.likes, likedBy: updatedData.likedBy }
        : img
    ),
  }));
};




  useEffect(() => {
    const fetchImages = async () => {
      try {
        const query =
          category === "all" ? "kente fashion" : `kente ${category}`;

        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${query}&per_page=12&page=${page}`,
          {
            headers: {
              Authorization: PEXELS_API_KEY,
            },
          }
        );

        const data = await response.json();

        if (data.photos) {
          setGalleryReactions((prev) => ({
            ...prev,
            imageViews:
              page === 1
                ? data.photos.map(formatItem)
                : [...prev.imageViews, ...data.photos.map(formatItem)],
          }));
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [category, page]);

  // ✅ Increment views when an image is clicked

  // ////////////////////// OLD /////////////////////////
  const handleImageView = (id) => {
    const key = `views_${id}`;
    const savedViews = localStorage.getItem(key);
    let newViews = savedViews ? parseInt(savedViews) : 0;
    newViews += 1;
    localStorage.setItem(key, newViews);

    // Update state so UI refreshes
    setGalleryReactions((prev) => ({
      ...prev,
      imageViews: prev.imageViews.map((img) =>
        img.id === id ? { ...img, views: newViews } : img
      ),
    }));
  };







  
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
              Kente <span className="text-teal-500">Gallery</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Explore stunning Kente dress designs and get inspired by African
              fashion.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* <div className="flex flex-wrap items-center justify-between gap-4"> */}
            <div className="flex flex-wrap gap-2">
              {["all", "casual", "formal", "traditional", "modern"].map(
                (item) => (
                  <span
                    key={item}
                    onClick={() => {
                      setCategory(item);
                      setPage(1);
                    }}
                    className={`px-3 py-1 rounded-full cursor-pointer text-sm ${
                      category === item
                        ? "bg-teal-500 text-white"
                        : "border hover:bg-teal-500 hover:text-white"
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </span>
                )
              )}
            </div>
            {/* <button className="flex items-center px-3 py-1 border rounded-lg text-sm hover:bg-yellow-600 hover:text-white duration-300">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div> */}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {galleryReactions.imageViews.length === 0 ? (
            <p className="text-center text-gray-500">No images found.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {galleryReactions.imageViews.map((item) => (
                <div
                  key={item.id}
                  className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white cursor-pointer"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif font-bold text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{item.desc}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {item.views}
                        </span>
                        <span
                          onClick={() => handleImageLike(item.id)}
                          className="flex items-center gap-1 cursor-pointer">
                          <Heart className={`w-4 h-4 ${item.likedBy?.includes("currentUser") ? "text-red-500" : ""}`} />
                          {item.likes}
                        </span>
                      </div>
                      <a
                        href={item.download}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleImageView(item.id)} // 👈 increment views
                        className="p-2 border rounded-lg hover:bg-yellow-600 duration-300"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Load More */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-6 py-3 border rounded-lg text-lg hover:bg-yellow-600 duration-300"
          >
            Load More Designs
          </button>
        </div>
      </section>
    </div>
  );
}








// import React, { useEffect, useState } from 'react'

// const GalleryPage = () => {
//   const [data, setData] = useState([])

// useEffect(
//   ()=>{
// async function getData() {
//     const PEXELS_API_KEY = "VHOZqY0O98u5w5Jb9IjuynfLmaEBUVzjdGe4MiUsFLVpNtjIPUyfZ3wy"; 

//   try{
//     const res = await fetch (`https://api.pexels.com/v1/search?query=kente fashion&per_page=12&page=data.photos.map(formatItem)`);
//      {
//             headers: {
//               Authorization: PEXELS_API_KEY,
//             }
//           }
//     const data = await res.json();
//     setData(data);
//   }
//   catch(error){
//     console.error("Error fetching data:", error);
//   }
  
// }  
//   getData();
  
//   },[]);






//   return (
//     <div className='mt-20'>
//     <div className='text-5xl'>{data}</div>
//     <div className='text-5xl'>GalleryPage</div>
//     <div className='text-5xl'>GalleryPage</div>
//     <div className='text-5xl'>GalleryPage</div>
//     <div className='text-5xl'>GalleryPage</div>
//     </div>

//   )
// }

// export default GalleryPage