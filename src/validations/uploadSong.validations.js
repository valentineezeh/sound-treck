import isEmpty from "is-empty";

const validateUploadSong = data => {
  const errors = {};
  if (data.title === "" || !data.title || data.title.trim().length === 0) {
    errors.title = "This field is required.";
  }
  if (
    data.musicUrl === "" ||
    !data.musicUrl ||
    data.musicUrl.trim().length === 0
  ) {
    errors.musicUrl = "This field is required.";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateUploadSong;

// title: string
// role: id (required)
// creator: id (required)
// musicUrl: string (required)
// coverArtUrl: string (optional)
