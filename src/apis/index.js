export default async (...params) => {
  return await fetch(...params)
  .then((resp) => {
    // if (resp.status === 401) {
    //   window.history.replaceState({}, 'test', '/');
    //   throw { msg: 'Unauthorized!' };
    // }
    return resp;
  });
};
