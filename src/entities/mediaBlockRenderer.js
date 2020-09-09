import React from "react";

import utils from "../Utils/EditorUtils";

const YOUTUBE_PREFIX = "https://www.youtube.com/embed/";
const VIMEO_PREFIX = "https://player.vimeo.com/video/";

const getSrc = ({ src }) => {
  const { isYoutube, getYoutubeSrc, isVimeo, getVimeoSrc } = utils;

  if (isYoutube(src)) {
    const { srcID } = getYoutubeSrc(src);

    return `${YOUTUBE_PREFIX}${srcID}`;
  }
  if (isVimeo(src)) {
    const { srcID } = getVimeoSrc(src);
    return `${VIMEO_PREFIX}${srcID}`;
  }
  return undefined;
};

const mediaBlockRender = (block) => {
  if (block.getType() === "atomic") {
    return {
      component: Media,
      editable: false,
    };
  }
  return null;
};

const Image = (props) => {
  if (!!props.src) {
    return <img src={props.src} />;
  }
  return null;
};

const Video = (props) => {
  if (!!props.src) {
    return <iframe controls src={props.src} />;
  }
  return null;
};

const Media = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src } = entity.getData();
  getSrc(src);
  const type = entity.getType();

  let media;

  if (type === "image") {
    media = <Image src={src} />;
  } else if (type === "VIDEOTYPE") {
    media = <Video src={src} crossorigin="anonymous" />;
  }
  return media;
};

export default mediaBlockRender;
