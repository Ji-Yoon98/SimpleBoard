import { useEffect } from "react";

const useResetEmailCheck = (email, setIsEmailChecked) => {
  useEffect(() => {
    setIsEmailChecked(false);
  }, [email, setIsEmailChecked]);
};

export default useResetEmailCheck;
