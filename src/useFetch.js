import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "secret-key":
          "$2b$10$6EJmnPE5i2hVJdX/UR/rRe.mwWL416ML/DgiIeS4QUVCNtQLp7NG.",
        versioning: false,
      },
    })
      .then((res) => {
        if (!res.ok) {
          console.log("Can't load that api!");
        }
        return res.json();
      })
      .then((apiData) => {
        setData(apiData);
        setIsPending(false);
      });
  }, [url]);
  return { data, isPending };
};

export default useFetch;
