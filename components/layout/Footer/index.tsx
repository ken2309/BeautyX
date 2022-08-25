import { Container } from '@mui/system'
import * as React from 'react'
import useTrans from '../../../context/hooks/useTrans'
import style from './Footer.module.css'
export interface IFooterProps {}

export default function Footer(props: IFooterProps) {
	const trans = useTrans()
	const data_footer = [
		{
			id: 1,
			title: `${trans.footer.customer_support}`,
			items: [
				{
					id: 11,
					title: `${trans.footer.consultation_call_center}: 0899310908`,
					type: 'NUMBER',
					url: '0899310908',
				},
				{
					id: 12,
					title: `${trans.footer.customer_care_call_center} : 0899855223`,
					type: 'NUMBER',
					url: '0899855223',
				},
				{
					id: 13,
					title: 'sales@myspa.vn',
					type: 'EMAIL',
					url: 'sales@myspa.vn',
				},
				{
					id: 14,
					title: 'support@myspa.vn',
					type: 'EMAIL',
					url: 'support@myspa.vn',
				},
				{
					id: 15,
					title: `${trans.footer.privacy_policy}`,
					type: 'URL',
					url: '/',
				},
				{
					id: 16,
					title: `${trans.footer.return_and_refund}`,
					type: 'URL',
					url: '/',
				},
				{
					id: 17,
					title: `${trans.footer.protect_the_interests_of_customers}`,
					type: 'URL',
					url: '/',
				},
			],
		},
		{
			id: 2,
			title: `${trans.footer.myspa_company}`,
			items: [
				{
					id: 20,
					title: `${trans.footer.operating_regulations}`,
					type: 'URL',
					url: '/',
				},
				{
					id: 21,
					title: `${trans.footer.general_rules}`,
					type: 'URL',
					url: '/',
				},
				{
					id: 22,
					title: `${trans.footer.commodity_trading_regulations}`,
					type: 'URL',
					url: '/',
				},
				{
					id: 23,
					title: `${trans.footer.payment_process}`,
					type: 'URL',
					url: '/',
				},
				{
					id: 24,
					title: `${trans.footer.secure_transaction}`,
					type: 'URL',
					url: '/',
				},
				{
					id: 26,
					title: `${trans.footer.responsibility}`,
					type: 'URL',
					url: '/',
				},
				{
					id: 27,
					title: `${trans.footer.terms_and_commitments}`,
					type: 'URL',
					url: '/',
				},
			],
		},
	]
	return (
		<footer className={style.footer}>
			<Container>
				<div className={style.footerContent}>
					<div className={style.footerLeft}>
						{data_footer.map((item, index) => (
							<div className={style.footerLeftWrap}>
								<div className={style.footerLeftTitle}>{item.title}</div>
								<ul className={style.footerLeftList}>
									{item.items.map((a: any, i: number) => (
										<li key={i} className={style.footerLeftListItem}>
											{a.title}
										</li>
									))}
									<li className={style.footerLeftListItem}></li>
								</ul>
							</div>
						))}
					</div>
				</div>
				<div className={style.footerRight}></div>
			</Container>
		</footer>
	)
}
