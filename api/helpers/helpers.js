const CONTENT_TYPE = { "Content-Type": "application/json" };

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (data) => {
        body += data;
      });
      req.on("end", () => {
        resolve(JSON.parse(body));
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getPostData,
  CONTENT_TYPE,
};
