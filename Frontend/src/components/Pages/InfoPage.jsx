import React from "react";

function InfoPage() {
  return (
    <div className="container-fluid bg-black text-white p-5 text-center">
      <h1>Welcome to YouTube Clone!</h1>
      <p>Your go-to platform for effortless video streaming and sharing.</p>
      <hr className="my-4" />

      <div className="row text-start">
        <div className="col-md-6">
          <h3>Key Features</h3>
          <ul>
            <li>
              <strong>Powerful Search:</strong> Easily find videos using our
              advanced search functionality that delivers quick and accurate
              results.
            </li>
            <li>
              <strong>Easy Video Uploads:</strong> Upload your videos seamlessly
              with a user-friendly interface that supports multiple formats.
            </li>
            <li>
              <strong>Like & Save Videos:</strong> Keep track of your favorite
              content by liking and saving videos for easy access later.
            </li>
          </ul>
        </div>

        <div className="col-md-6">
          <h3>Platform Highlights</h3>
          <ul>
            <li>
              <strong>Mobile Friendly:</strong> Enjoy a responsive and smooth
              experience across all devices, whether on mobile, tablet, or
              desktop.
            </li>
            <li>
              <strong>Built with React:</strong> Developed using modern React
              technology, ensuring fast performance and a dynamic user
              experience.
            </li>
            <li>
              <strong>More Features Coming Soon:</strong> We are constantly
              working on exciting updates to enhance your experience. Stay
              tuned!
            </li>
          </ul>
        </div>
      </div>

      <hr className="my-4" />
      <p className="text-muted">
        Thank you for being a part of YouTube Clone. More updates are on the way!
      </p>
    </div>
  );
}

export default InfoPage;
