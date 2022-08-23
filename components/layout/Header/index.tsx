/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { LayoutProps } from '../../../models'
import Link from 'next/link'
import style from './Header.module.css'
import img from '../../../src/constants/img'
import icon from '../../../src/constants/icon'
import Image from 'next/image'
import { Container } from '@mui/system'
export function HeaderLayout({ children }: LayoutProps) {
	return (
		<>
			<header className={style.header}>
				<Container>
					<div className={style.headerWrap}>
						<div className={style.headerLeft}>
							<Link href="/">
								<div className={style.headerLogo}>
									<Image src={img.beautyX} alt="" />
								</div>
							</Link>
							<div className={style.headerSearch}>
								<>
									<input
										placeholder="Tìm kiếm dịch vụ, sản phẩm, combo, doanh nghiệp ..."
										type="text"
										readOnly
									/>
									<div className={style.headerSearchImg}>
										<Image className={style.img} src={icon.searchPurple} alt="" />
									</div>
								</>
								<div className={style.headerSearchBot}>
									<Link href="#">
										<a className={style.headerSearchBotItem}>Gần bạn</a>
									</Link>
									<Link href="#">
										<a className={style.headerSearchBotItem}>Spa</a>
									</Link>
									<Link href="#">
										<a className={style.headerSearchBotItem}>Salon</a>
									</Link>
									<Link href="#">
										<a className={style.headerSearchBotItem}>Nail</a>
									</Link>
									<Link href="#">
										<a className={style.headerSearchBotItem}>Clinic</a>
									</Link>
									<Link href="#">
										<a className={style.headerSearchBotItem}>Massage</a>
									</Link>
									<Link href="#">
										<a className={style.headerSearchBotItem}>Thẩm mỹ viện</a>
									</Link>
									<Link href="#">
										<a className={style.headerSearchBotItem}>Nha khoa</a>
									</Link>
								</div>
							</div>
						</div>

						<div className={style.headerRight}>
							<div className={style.partner}>
								<Link href="/">
									<span className={style.partnerText}>Kênh người bán</span>
								</Link>
							</div>
							<div className={style.headerSignUp}>
								<Link href="/">
									<a>Đăng ký</a>
								</Link>
							</div>
							<div className={style.headerSignIn}>
								<Link href="/">
									<a>Đăng Nhập</a>
								</Link>
							</div>
							<div className={style.headerLanguage}>
								<Link href="/">
									<>
										<Image src={icon.languagePurple} alt="" />
										<a>VN</a>
									</>
								</Link>
							</div>
							<div className={style.headerCart}>
								<Link href="/">
									<Image src={icon.ShoppingCartSimple} alt="" />
								</Link>
							</div>
						</div>
					</div>
				</Container>
			</header>
			<div>{children}</div>
		</>
	)
}
