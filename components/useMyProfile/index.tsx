import { useEffect, useState } from 'react';
import { getMe } from '../../services/dashboard';
import { parseDataResponse, runError } from '../../configs/http.config';

const useMyProfile: any = () => {
  const [myProfile, setMyProfile] = useState<{
    company: string;
    email: string;
    id: number;
    name: string;
    phone: string;
    status: number;
    packages_id: number | null;
    package: {
      id: number;
      inbound: number;
      outbound: number;
      inbound_rate: number;
      outbound_rate: number;
      is_marketing_messages: number;
    } | null;
  }>({
    company: '',
    email: '',
    id: 0,
    name: '',
    package: null,
    packages_id: null,
    phone: '',
    status: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const loadMe = () => {
    setLoading(true);
    getMe()
      .then((res) => {
        setMyProfile(parseDataResponse(res));
      })
      .catch((err) => {
        runError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    loadMe();
  }, []);
  return {
    myProfile,
    loading,
  };
};

export default useMyProfile;
