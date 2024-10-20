const handleCheckTypeFile = (type) => {
  let TypeFile;
  if (type.startsWith("image/")) {
    return (TypeFile = "img");
  }
  if (type.startsWith("text/")) {
    return (TypeFile = "txt");
  }
  if (
    type.startsWith(
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )
  ) {
    return (TypeFile = "docx");
  }

  // if (type.startsWith("image/")) return (TypeFile = "img");
};

export default handleCheckTypeFile;
