export const errorCheck = (type, value) => {
  // eslint-disable-next-line default-case
  switch (type) {
    case "firstName":
      if (!/^[a-z ,.'-]+$/i.test(value)) {
        return "Inavlid format, use only letters";
      }

      break;

    case "lastName":
      if (!/^[a-z ,.'-]+$/i.test(value)) {
        return "Inavlid format, use only letters";
      }

      break;

    case "email":
      if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
          value
        )
      ) {
        return "Invalid e-mail format";
      }

      break;

    case "password":
    case "password2":
      if (value.length < 8) {
        return "Write 8 characters at least";
      } else {
        
        if (!/[\d()+-]/g.test(value)) {
          return "Make sure you use letters and numbers";
        }
      }

      break;
  }
};
