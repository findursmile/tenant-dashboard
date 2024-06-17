import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { Divider } from '../../components/catalyst/divider'

const ECommerce: React.FC = () => {
  return (
    <DefaultLayout>
      <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white pb-1">Home</h1>
      <Divider />
    </DefaultLayout>
  );
};

export default ECommerce;