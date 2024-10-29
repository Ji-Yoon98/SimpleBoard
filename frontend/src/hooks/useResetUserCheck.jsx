import { useEffect } from 'react';

const useResetUserIdCheck = (username, setIsUserIdChecked) => {
  useEffect(() => {
    setIsUserIdChecked(false); // id input 값이 변경될 때마다 중복확인 상태 리셋
  }, [username, setIsUserIdChecked]);
};

export default useResetUserIdCheck;
