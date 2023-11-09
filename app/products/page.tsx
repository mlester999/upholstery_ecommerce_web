'use client';

import { useState, useEffect } from 'react';
import Cart from '@/components/cart/Cart';
import Header from '@/components/header/Header';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useDispatch } from 'react-redux';
import { useCustomerGetUserQuery } from '@/services/authentication';
import { fetchingProducts } from '@/slices/cartSlice';
import { useGetOrdersQuery } from '@/services/crud-order';
import CustomerAccountSettings from '@/components/account-settings/CustomerAccountSettings';
import CustomerProducts from '@/components/customer-products/CustomerProducts';
import { useGetProductsQuery } from '@/services/crud-product';

export default function AccountSettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { data: user, isFetching } = useCustomerGetUserQuery();
  const { data: productsData, isFetching: productsFetching } =
    useGetProductsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!Cookies.get('is_authenticated')) {
      router.push('/');
    }

    dispatch(fetchingProducts());

    setIsLoading(false);

    NProgress.done();

    return () => {
      NProgress.start();
    };
  }, [dispatch]);

  if (isLoading || isFetching || productsFetching) {
    return <div className='flex h-full flex-1 bg-white'></div>;
  }

  return (
    <div className='bg-white h-screen'>
      <Cart />

      <Header>
        <CustomerProducts productsData={productsData} />
      </Header>
    </div>
  );
}
