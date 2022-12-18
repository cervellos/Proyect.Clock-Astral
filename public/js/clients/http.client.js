class Http {
  /* GET */
  async get(url, id) {
    try {
      const res = await fetch(url + (id || ""), {
        method: "get",
      });
      const result = await res.json();
      return result;
    } catch (error) {
      console.error("ERROR GET", error);
    }
  }

  /* POST */
  async post(url, data) {
    try {
      const res = await fetch(url, {
        method: "post",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      });

      const result = await res.json();

      return result;
    } catch (error) {
      console.error("ERROR POST", error);
    }
  }

  /* PUT */
  async put(url, id, data) {
    try {
      const res = await fetch(url + id, {
        method: "put",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      });

      const result = await res.json();

      return result;
    } catch (error) {
      console.error("ERROR PUT", error);
    }
  }

  /* DELETE */
  async del(url, id) {
    try {
      const res = await fetch(url + id, {
        method: "delete",
      });
      const result = await res.json();

      return result;
    } catch (error) {
      console.error("ERROR DELETE", error);
    }
  }
}

const http = new Http();
