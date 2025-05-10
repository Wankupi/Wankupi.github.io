const headers_Leancloud = {
  "content-type": "application/json",
  "x-lc-id": "0fXMSbCD7SIxO3z7u5j1VjkL-gzGzoHsz",
  "x-lc-Key": "eIi8ECHYotfQqPB4AQRI6nfi",
};

export function get_plan() {
  return fetch(
    encodeURI(
      `https://avoscloud.com/1.1/classes/Plan?keys=-objectId,-updatedAt`
    ),
    { headers: headers_Leancloud }
  ).then((res) => res.json());
}
