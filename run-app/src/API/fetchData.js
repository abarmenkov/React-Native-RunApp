import { serverRoute } from "./route";

export const fetchData = (
  options,
  setIsLoading,
  checked,
  setChecked,
  setErrorMessage,
  showModal,
  hideModal,
  resetForm,
  signIn
) => {
  fetch(serverRoute, options)
    .then((response) => response.json())
    .then((data) => {
      setTimeout(() => {
        setIsLoading(false);
        if (data.success) {
          //console.log(data.accessToken);
          signIn(data.accessToken, checked);
          //setAuthToken(data.accessToken);
        } else {
          //console.log(data.message);
          setErrorMessage(data.message);
          showModal();
          setTimeout(() => hideModal(), 3000);
          //setIsLoading(false);
        }
      }, 2000);

      resetForm();
      setChecked(false);
    })
    .catch((error) => {
      //resetForm();
      console.error(error);
    });
};

