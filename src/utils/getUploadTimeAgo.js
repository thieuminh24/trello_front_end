const getUploadTimeAgo = (uploadDate) => {
  const now = new Date();
  const elapsed = now - new Date(uploadDate); // Tính thời gian trôi qua (milliseconds)

  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} ngày trước`;
  if (hours > 0) return `${hours} giờ trước`;
  if (minutes > 0) return `${minutes} phút trước`;
  return `${seconds} giây trước`;
};

export default getUploadTimeAgo;
