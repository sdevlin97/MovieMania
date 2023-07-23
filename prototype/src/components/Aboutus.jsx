import React, { Component } from "react";

class Aboutus extends Component {
  render() {
    return (
      <div className="text-center py-20 px-10 text-justify text-white bg-black">
        <h3 className="tracking-[.50em] font-bold text-center text-[30px]">
          About Our Site
        </h3>
        <p className="text-[30px]">
          <span className="underline  text-cyan-500 underline-offset-8">
            Introducing MovieMania, a website that brings the theater experience
            to your lap!
          </span>{" "}
          Discover your ideal film by selecting tags that match your
          preferences, from genres and moods to actors and themes. MovieMania
          then works its magic, generating a curated list of similar movies,{" "}
          <span className="underline text-cyan-500 underline-offset-8">
            ensuring you never miss a blockbuster hit or hidden gem again and
            saving you time!
          </span>
        </p>
      </div>
    );
  }
}

export default Aboutus;
