'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import SellerDashboard from '@/components/seller-dashboard/SellerDashboard';
import { useCustomerGetUserQuery } from '@/services/authentication';
import SellerDashboardMain from '@/components/seller-dashboard/SellerDashboardMain';
import SellerShopsMain from '@/components/seller-dashboard/SellerShopsMain';

const SellerMyShopsPage = () => {
  const { data: user, isError } = useCustomerGetUserQuery();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAuthenticatedCookie = Cookies.get('is_authenticated');

    if (!isAuthenticatedCookie) {
      router.push('/');
    }

    if (user && isAuthenticatedCookie) {
      router.push('/');
    }
    setIsLoading(false);

    NProgress.done();

    return () => {
      NProgress.start();
    };
  }, []);

  if (isLoading) {
    return <div className='flex h-full flex-1 bg-white'></div>;
  }

  return (
    <SellerDashboard>
      <SellerShopsMain />
    </SellerDashboard>
  );
};

export default SellerMyShopsPage;
