const YOUTUBEMATCH_URL = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
const VIMEOMATCH_URL = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;

export default {
  isYoutube: (url: string) => YOUTUBEMATCH_URL.test(url),
  isVimeo: (url: string) => VIMEOMATCH_URL.test(url),
  getYoutubeSrc: (url: string) => {
    let id = "";
    if (url.match(YOUTUBEMATCH_URL!) != null) {
      id = url && url.match(YOUTUBEMATCH_URL)![1];
    }


    else if (url.match(YOUTUBEMATCH_URL!) === null) {
      return console.log('UNDEFFINED')
    }
    return {
      srcID: id,
      srcType: "youtube",
      url,
    };
  },
  getVimeoSrc: (url: string) => {
    const id = url.match(VIMEOMATCH_URL)![3];
    return {
      srcID: id,
      srcType: "vimeo",
      url,
    };
  },
};
