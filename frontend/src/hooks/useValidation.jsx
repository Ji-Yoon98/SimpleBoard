import { useCallback } from "react";
import Validation from "util/Validation";

const useValidation = (trigger, errors, getValues) => {
  const handleValidation = useCallback(async () => {
    return await Validation(trigger, errors, getValues);
  }, [trigger, errors, getValues]);

  return { handleValidation };
};

export default useValidation;
