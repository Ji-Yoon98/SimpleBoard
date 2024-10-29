const handleValidation = async (trigger, errors) => {
  const usernameValid = await trigger("username");

  if (!usernameValid) {
    alert(errors.username?.message);
    return;
  }

  const passwordValid = await trigger("password");

  if (!passwordValid) {
    alert(errors.password?.message);
    return;
  }

  const passwordCheckValid = await trigger("passwordCheck");

  if (!passwordCheckValid) {
    alert(errors.passwordCheck?.message);
    return;
  }

  const nameValid = await trigger("name");

  if (!nameValid) {
    alert(errors.name?.message);
    return;
  }

  const emailValid = await trigger("email");

  if (!emailValid) {
    alert(errors.email?.message);
    return;
  }

  const titleVaild = await trigger("title");

  if (!titleVaild) {
    alert(errors.title?.message);
    return;
  }

  const content = await trigger("content");

  if (!content) {
    alert(errors.content?.message);
    return;
  }
};

export default handleValidation;
