import React from "react";

function YouTubeCard({ video }) {
  const { url, title, description } = video; // Destructure video object for cleaner code

  return (
    <div className="youtube-card">
      <div className="youtube-card-thumbnail">
        <iframe
          width="100%"
          height="200" // Adjust height as needed for video aspect ratio
          src={url}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="no-referrer"
          allowFullScreen
        ></iframe>
      </div>
      <div className="youtube-card-info">
        <h3 className="youtube-card-title">{title}</h3>
        <p className="youtube-card-description">{description}</p>
      </div>
    </div>
  );
}

function VideoList({ videos }) {
  return (
    <div className="video-list">
      {videos.map((video, index) => (
        <YouTubeCard key={index} video={video} />
      ))}
    </div>
  );
}

export default VideoList;