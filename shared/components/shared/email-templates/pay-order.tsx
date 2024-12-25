import * as React from 'react';

interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = ({ orderId, totalAmount, paymentUrl }) => (
  <div>
    <h1>Order #{orderId}</h1>

    <p>
      Placing an order for the amount {totalAmount} $. Go to <a href={paymentUrl}>link</a> for placing an order.
    </p>
  </div>
);
