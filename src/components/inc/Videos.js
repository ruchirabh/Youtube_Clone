import React from "react";
import Brand from "../images/Brand.JPG";

function Video() {
  const vid = [
    {
      url: (
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/vqu4z34wENw?si=UkbMoEW0iZhLZjSv"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ),

      des: "Pathaan Trailer | Shah Rukh Khan | Deepika Padukone | John Abraham | Siddharth A | YRF Spy Universe",
    },
    {
      url: (
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/ugTluz9d3eg?si=vDGb9bHhfxBXgqm_"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ),

      des: "Tomorrow the Battle will be long...So Rest a little at our Bonfire [Medieval Ambient Music]",
    },
    {
      url: (
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/74gx0v5ZJzw"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ),

      des: "Camila Cabello - Havana ( cover by Donald Trump ) USA President Edition.",
    },
    {
      url: (
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/MOKIT_T3m2E"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ),
      des: "Popcorn Monkey Tiger - Psychedelic Maaye | Charan Raj | Sanjith Hegde, Rahul Dit-O | Suri.",
    },
    {
      url: (
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/F5DhsSHObeA"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ),
      des: "Easy Lemon Paneer Recipe | Quick & Tasty || EP-30 | Sweet khara coffee | Sihi Kahi Chandru.",
    },
    {
      url: (
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/IqwIOlhfCak"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ),
      des: "LEO - Badass Lyric | Thalapathy Vijay | Lokesh Kanagaraj | Anirudh Ravichander.",
    },
    {
      url: (
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/k3Z8_hLyF3U"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ),

      des: "Mayavi ~ ಮಾಯಾವಿ | Bhoomi 2024 | Acoustic Cover By Akshay| Kannada Song Covers",
    },
    {
      url: (
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/y64BqTZD3L8"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ),
      des: "India U19 vs Japan U19 | ACC Men's U19 Asia Cup | Match 8| Highlights of the Match.",
    },
    {
      url: (
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/wKHrcZLApxY"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ),

      des: "Phil Salt Hits 103* off 54 Balls | Highlights | West Indies v England | 1st T20I",
    },
    {
      url: (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/y83x7MgzWOA?si=4W4xnobTCOv0tzOi"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      ),

      des: "Ed Sheeran & Justin Bieber - I Don't Care [Official Music Video] Subtract, the new album, out 05.05.2023",
    },
    {
      url: (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/W9xz22ZR83w?si=ZAT4br8v5IWcRIs_"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      ),

      des: "Aaj Ki Baat Live: नरेंद्र ने देवेंद्र को फिर CM बनवाया...फडणवीस 'समंदर' है, लौटकर आया | Maharashtra.",
    },
    {
      url: (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/EsUgsUZzt0I?si=Mow4WQ95sV5ldr_I"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      ),

      des: "Raja Rani | ರಾಜ ರಾಣಿ | Episode 18 | Highlights of the Episode| Colors Kannada ",
    },
  ];

  return (
    <>
      <div
        class="d-flex-FLUID  bg-black justify-content"
        style={{ marginTop: "80px", marginLeft: "80px" }}
      >
        <div class="row">
          {vid.map((item, index) => (
            <div className="col-md-4 py-1 ">
              <div
                class="card bg-dark text-white  border-0 "
                style={{ width: "30rem", height: "" }}
              >
                <div className="card bg-black  text-white   " >
                  <div>{item.url}</div>
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.des}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Video;
