"use client";
import React from 'react';
// import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// import Rolling from '../../../public/Rolling.svg';

export default function Page() {
	const router = useRouter();
	const [orderStatus, setOrderStatus] = useState('');

	useEffect(() => {
		const timer = setTimeout(() => {
			let status = getorderstatus();
			console.log(status);
			setOrderStatus(status);
		}, 2000);

		return () => clearTimeout(timer);

	}, []);

	useEffect(() => {
		if (orderStatus !== '') {
			if (orderStatus === 'success')
				router.push('/orderstatus/success');
			if (orderStatus === 'failure')
				router.push('/orderstatus/failure');
			if (orderStatus === 'pending')
				router.push('/orderstatus/pending');
		}
	}, [orderStatus]);

	function getorderstatus() {
		const randomNumber = Math.floor(Math.random() * 3) + 1;
		switch (randomNumber) {
			case 1:
				return 'success';
			case 2:
				return 'failure';
			case 3:
				return 'pending';
			default:
				return 'unknown';
		}
	}
	return (
		<div className="flex flex-row items-center justify-center h-screen">
		  <img src="Rolling.svg" alt="Rolling" />
		 
		</div>
	  );
	}
